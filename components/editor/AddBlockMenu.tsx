"use client";

import { useState } from "react";
import { useCMSStore } from "@/lib/store";
import { blockConfigList } from "@/lib/blockRegistry";
import Button from "@/components/ui/Button";

/**
 * "Add block" menu. It lists every entry in the registry automatically, so a
 * newly registered block type appears here with zero changes to this file.
 */
export default function AddBlockMenu() {
  const [open, setOpen] = useState(false);
  const addBlock = useCMSStore((s) => s.addBlock);

  return (
    <div className="relative">
      <Button
        variant="primary"
        className="w-full"
        onClick={() => setOpen((v) => !v)}
      >
        + Add Block
      </Button>

      {open ? (
        <>
          {/* click-away overlay */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
            {blockConfigList.map((config) => (
              <button
                key={config.type}
                onClick={() => {
                  addBlock(config.type);
                  setOpen(false);
                }}
                className="block w-full px-3 py-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <span className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  {config.label}
                </span>
                <span className="block text-xs text-slate-400 dark:text-slate-500">
                  {config.description}
                </span>
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
