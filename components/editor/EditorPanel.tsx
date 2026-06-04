"use client";

import { useRef } from "react";
import { useCMSStore } from "@/lib/store";
import {
  exportBlocksToFile,
  importBlocksFromFile,
} from "@/lib/persistence";
import AddBlockMenu from "@/components/editor/AddBlockMenu";
import BlockList from "@/components/editor/BlockList";
import BlockEditor from "@/components/editor/BlockEditor";
import Button from "@/components/ui/Button";

/**
 * Left panel of the CMS. Top section manages the list of blocks (add / reorder /
 * persistence actions); the lower section edits the selected block.
 */
export default function EditorPanel() {
  const blocks = useCMSStore((s) => s.blocks);
  const setBlocks = useCMSStore((s) => s.setBlocks);
  const clearAll = useCMSStore((s) => s.clearAll);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importBlocksFromFile(file);
      setBlocks(imported);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not import file.");
    } finally {
      // Reset so the same file can be selected again later.
      e.target.value = "";
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="border-b border-slate-200 p-4 dark:border-slate-700">
        <AddBlockMenu />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() => exportBlocksToFile(blocks)}
            disabled={blocks.length === 0}
          >
            Export JSON
          </Button>
          <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
            Import JSON
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (confirm("Clear all blocks? This cannot be undone.")) clearAll();
            }}
            disabled={blocks.length === 0}
          >
            Reset
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </div>

      {/* Block list */}
      <div className="border-b border-slate-200 p-4 dark:border-slate-700">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Page Blocks
        </h2>
        <BlockList />
      </div>

      {/* Selected block editor */}
      <div className="flex-1 overflow-y-auto">
        <BlockEditor />
      </div>
    </div>
  );
}
