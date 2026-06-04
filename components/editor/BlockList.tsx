"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useCMSStore } from "@/lib/store";
import BlockListItem from "@/components/editor/BlockListItem";

/**
 * The ordered list of page blocks.
 *
 * Reordering works two ways, both routed through the store:
 *  - drag-and-drop (dnd-kit) → reorderBlocks(from, to)
 *  - the ↑ / ↓ buttons on each row → moveBlock(id, dir)  (kept as an
 *    accessible / non-pointer fallback)
 */
export default function BlockList() {
  const blocks = useCMSStore((s) => s.blocks);
  const reorderBlocks = useCMSStore((s) => s.reorderBlocks);

  // Require a small drag distance so clicks-to-select still work cleanly.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = blocks.findIndex((b) => b.id === active.id);
    const to = blocks.findIndex((b) => b.id === over.id);
    if (from !== -1 && to !== -1) reorderBlocks(from, to);
  };

  if (blocks.length === 0) {
    return (
      <p className="px-1 py-4 text-center text-sm text-slate-400 dark:text-slate-500">
        No blocks yet. Add one above to start building your page.
      </p>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={blocks.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {blocks.map((block, index) => (
            <BlockListItem
              key={block.id}
              block={block}
              index={index}
              total={blocks.length}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

// Re-exported so other code could reuse the same move semantics if needed.
export { arrayMove };
