import { blockRegistry } from "@/lib/blockRegistry";
import type { Block } from "@/types/blocks";

/**
 * Given a block, render it using the component registered for its type.
 * This is the entire "dynamic CMS rendering" mechanism — a registry lookup,
 * no switch statement. Unknown types fail safe by rendering nothing.
 */
export default function BlockRenderer({ block }: { block: Block }) {
  const config = blockRegistry[block.type];
  if (!config) return null;

  const Renderer = config.Renderer;
  return <Renderer data={block.data} />;
}
