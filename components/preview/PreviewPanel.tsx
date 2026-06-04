"use client";

import { useCMSStore } from "@/lib/store";
import BlockRenderer from "@/components/preview/BlockRenderer";

/**
 * The live preview. It subscribes to `blocks` in the store, so any edit in the
 * left panel re-renders the affected block here instantly — no refresh, no
 * manual sync. This is the payoff of keeping all state in one store.
 */
export default function PreviewPanel() {
  const blocks = useCMSStore((s) => s.blocks);

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-slate-950">
      {blocks.length === 0 ? (
        <div className="flex h-full items-center justify-center p-8 text-center text-sm text-slate-400 dark:text-slate-500">
          Your live preview will appear here as you add blocks.
        </div>
      ) : (
        blocks.map((block) => <BlockRenderer key={block.id} block={block} />)
      )}
    </div>
  );
}
