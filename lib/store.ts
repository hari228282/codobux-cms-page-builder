import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Block, BlockType, BlockData } from "@/types/blocks";
import { blockRegistry } from "@/lib/blockRegistry";
import { createId, deepClone } from "@/lib/utils";

/**
 * Application state lives in a single Zustand store.
 *
 * Why Zustand (vs Context / Redux Toolkit)?
 *  - The live preview simply subscribes to `blocks`; any edit re-renders it
 *    instantly with no prop-drilling and no page refresh.
 *  - All block mutations are colocated as named actions below, so the update
 *    logic is in one auditable place (clean, scalable update patterns).
 *  - The `persist` middleware gives us localStorage saving for free, satisfying
 *    the persistence requirement without extra wiring.
 */

interface CMSState {
  blocks: Block[];
  selectedId: string | null;

  // --- Block operations (the core "Dynamic Block Management" requirement) ---
  addBlock: (type: BlockType) => void;
  updateBlock: (id: string, patch: Partial<BlockData>) => void;
  removeBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  moveBlock: (id: string, direction: "up" | "down") => void;
  // Move a block from one index to another (used by drag-and-drop).
  reorderBlocks: (fromIndex: number, toIndex: number) => void;

  // --- Selection (which block the editor is focused on) ---
  selectBlock: (id: string | null) => void;

  // --- Bulk operations (used by JSON import / reset) ---
  setBlocks: (blocks: Block[]) => void;
  clearAll: () => void;
}

export const useCMSStore = create<CMSState>()(
  persist(
    (set, get) => ({
      blocks: [],
      selectedId: null,

      addBlock: (type) => {
        const config = blockRegistry[type];
        const newBlock: Block = {
          id: createId(),
          type,
          // Clone so each block owns its own data (no shared references).
          data: deepClone(config.defaultData),
        };
        set((state) => ({
          blocks: [...state.blocks, newBlock],
          selectedId: newBlock.id, // focus the editor on the new block
        }));
      },

      updateBlock: (id, patch) => {
        set((state) => ({
          blocks: state.blocks.map((block) =>
            block.id === id
              ? { ...block, data: { ...block.data, ...patch } as BlockData }
              : block
          ),
        }));
      },

      removeBlock: (id) => {
        set((state) => ({
          blocks: state.blocks.filter((block) => block.id !== id),
          selectedId: state.selectedId === id ? null : state.selectedId,
        }));
      },

      duplicateBlock: (id) => {
        set((state) => {
          const index = state.blocks.findIndex((b) => b.id === id);
          if (index === -1) return state;
          const original = state.blocks[index];
          const copy: Block = {
            id: createId(),
            type: original.type,
            data: deepClone(original.data),
          };
          const next = [...state.blocks];
          next.splice(index + 1, 0, copy); // insert right after the original
          return { blocks: next, selectedId: copy.id };
        });
      },

      moveBlock: (id, direction) => {
        set((state) => {
          const index = state.blocks.findIndex((b) => b.id === id);
          if (index === -1) return state;
          const target = direction === "up" ? index - 1 : index + 1;
          if (target < 0 || target >= state.blocks.length) return state;
          const next = [...state.blocks];
          // Swap the two blocks.
          [next[index], next[target]] = [next[target], next[index]];
          return { blocks: next };
        });
      },

      reorderBlocks: (fromIndex, toIndex) => {
        set((state) => {
          if (
            fromIndex === toIndex ||
            fromIndex < 0 ||
            toIndex < 0 ||
            fromIndex >= state.blocks.length ||
            toIndex >= state.blocks.length
          ) {
            return state;
          }
          const next = [...state.blocks];
          // Pull the dragged block out, then re-insert it at the drop index.
          const [moved] = next.splice(fromIndex, 1);
          next.splice(toIndex, 0, moved);
          return { blocks: next };
        });
      },

      selectBlock: (id) => set({ selectedId: id }),

      setBlocks: (blocks) => set({ blocks, selectedId: null }),

      clearAll: () => set({ blocks: [], selectedId: null }),
    }),
    {
      name: "codobux-cms-storage", // localStorage key
      // Only persist the page content — not transient UI state like selection.
      partialize: (state) => ({ blocks: state.blocks }),
    }
  )
);
