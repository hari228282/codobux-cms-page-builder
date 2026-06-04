"use client";

import { useCMSStore } from "@/lib/store";
import { blockRegistry } from "@/lib/blockRegistry";
import FieldRenderer from "@/components/editor/FieldRenderer";
import type { BlockData } from "@/types/blocks";

/**
 * Shows the settings form for whichever block is currently selected.
 * It reads the field schema from the registry and renders one FieldRenderer
 * per field — so it never needs block-specific code.
 */
export default function BlockEditor() {
  const selectedId = useCMSStore((s) => s.selectedId);
  const block = useCMSStore((s) =>
    s.blocks.find((b) => b.id === s.selectedId)
  );
  const updateBlock = useCMSStore((s) => s.updateBlock);

  if (!selectedId || !block) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-400 dark:text-slate-500">
        Select a block to edit its content.
      </div>
    );
  }

  const config = blockRegistry[block.type];
  // Index into the data generically; each block's concrete shape is enforced
  // at the registry/renderer boundary, so a generic record view is safe here.
  const data = block.data as unknown as Record<string, unknown>;

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {config.label} Settings
      </h3>
      {config.fields.map((field) => (
        <FieldRenderer
          key={field.key}
          field={field}
          value={data[field.key]}
          // Each change patches just the one key on this block's data.
          onChange={(value) =>
            updateBlock(block.id, { [field.key]: value } as Partial<BlockData>)
          }
        />
      ))}
    </div>
  );
}
