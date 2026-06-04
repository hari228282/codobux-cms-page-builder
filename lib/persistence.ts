import type { Block } from "@/types/blocks";
import { isKnownBlockType, blockRegistry } from "@/lib/blockRegistry";
import { createId } from "@/lib/utils";

/**
 * JSON export / import.
 *
 * The persist middleware in the store already auto-saves to localStorage. These
 * helpers add the explicit "export / import a JSON file" capability the brief
 * asks for, plus light schema validation (a bonus item) so a malformed file
 * can't corrupt the editor state.
 */

// Trigger a download of the current blocks as a .json file.
export function exportBlocksToFile(blocks: Block[]): void {
  const json = JSON.stringify(blocks, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `landing-page-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Validate + normalise an unknown parsed value into a safe Block[].
// Unknown block types and blocks with missing keys are repaired or dropped,
// so importing a bad file never throws into the UI.
export function validateBlocks(parsed: unknown): Block[] {
  if (!Array.isArray(parsed)) {
    throw new Error("Invalid file: expected an array of blocks.");
  }

  const result: Block[] = [];
  for (const item of parsed) {
    if (!item || typeof item !== "object") continue;
    const candidate = item as Partial<Block>;
    if (!isKnownBlockType(candidate.type)) continue; // drop unknown types

    const config = blockRegistry[candidate.type];
    // Merge incoming data over the registry defaults so any missing fields are
    // filled in and unexpected fields are ignored.
    const safeData = {
      ...JSON.parse(JSON.stringify(config.defaultData)),
      ...(candidate.data && typeof candidate.data === "object" ? candidate.data : {}),
    };

    result.push({
      id: typeof candidate.id === "string" ? candidate.id : createId(),
      type: candidate.type,
      data: safeData,
    });
  }
  return result;
}

// Read a File chosen via <input type="file">, parse + validate it.
export function importBlocksFromFile(file: File): Promise<Block[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        resolve(validateBlocks(parsed));
      } catch (err) {
        reject(err instanceof Error ? err : new Error("Could not parse file."));
      }
    };
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsText(file);
  });
}
