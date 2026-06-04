"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCMSStore } from "@/lib/store";
import { blockRegistry } from "@/lib/blockRegistry";
import type { Block } from "@/types/blocks";

interface BlockListItemProps {
  block: Block;
  index: number;
  total: number;
}

export default function BlockListItem({ block, index, total }: BlockListItemProps) {
  const selectedId = useCMSStore((s) => s.selectedId);
  const selectBlock = useCMSStore((s) => s.selectBlock);
  const moveBlock = useCMSStore((s) => s.moveBlock);
  const duplicateBlock = useCMSStore((s) => s.duplicateBlock);
  const removeBlock = useCMSStore((s) => s.removeBlock);

  // dnd-kit sortable wiring. `listeners`/`attributes` go on the drag handle
  // only, so the rest of the row keeps its normal click behaviour.
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isSelected = selectedId === block.id;
  const label = blockRegistry[block.type].label;

  // Stop row-selection firing when a control button is clicked.
  const stop =
    (fn: () => void) =>
    (e: React.MouseEvent) => {
      e.stopPropagation();
      fn();
    };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => selectBlock(block.id)}
      className={`flex cursor-pointer items-center gap-2 rounded-md border px-2 py-2 transition-colors ${
        isSelected
          ? "border-brand bg-brand-light dark:bg-brand/10"
          : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
      }`}
    >
      {/* Drag handle — only this grabs the drag */}
      <button
        type="button"
        title="Drag to reorder"
        aria-label="Drag to reorder"
        onClick={(e) => e.stopPropagation()}
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none px-1 text-slate-300 hover:text-slate-500 active:cursor-grabbing dark:text-slate-600 dark:hover:text-slate-400"
      >
        ⠿
      </button>

      <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </span>

      <div className="flex items-center gap-0.5 text-slate-400 dark:text-slate-500">
        <button
          title="Move up"
          disabled={index === 0}
          onClick={stop(() => moveBlock(block.id, "up"))}
          className="rounded px-1.5 py-0.5 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-700"
        >
          ↑
        </button>
        <button
          title="Move down"
          disabled={index === total - 1}
          onClick={stop(() => moveBlock(block.id, "down"))}
          className="rounded px-1.5 py-0.5 hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-700"
        >
          ↓
        </button>
        <button
          title="Duplicate"
          onClick={stop(() => duplicateBlock(block.id))}
          className="rounded px-1.5 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          ⧉
        </button>
        <button
          title="Delete"
          onClick={stop(() => removeBlock(block.id))}
          className="rounded px-1.5 py-0.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
