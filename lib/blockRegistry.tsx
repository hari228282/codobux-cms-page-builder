import type { ComponentType } from "react";
import type {
  BlockType,
  BlockData,
  FieldDef,
  HeroData,
  FeaturesData,
  TestimonialsData,
  CTAData,
} from "@/types/blocks";

import HeroBlock from "@/components/blocks/hero/HeroBlock";
import FeaturesBlock from "@/components/blocks/features/FeaturesBlock";
import TestimonialsBlock from "@/components/blocks/testimonials/TestimonialsBlock";
import CTABlock from "@/components/blocks/cta/CTABlock";

/**
 * THE BLOCK REGISTRY  ← the architectural heart of this app.
 *
 * Every block type is described in exactly one place. Each entry declares:
 *   - label / description : shown in the "Add block" menu
 *   - defaultData         : the content a freshly added block starts with
 *   - fields              : a schema that the editor reads to auto-build its form
 *   - Renderer            : the component the preview uses to display the block
 *
 * Because the editor and preview both read from this registry, NEITHER of them
 * contains block-specific `if`/`switch` logic. Adding a fifth block type means
 * adding one entry here (plus its renderer component) — and the rest of the app
 * picks it up automatically. That is what satisfies the brief's requirement to
 * "support adding new block types easily."
 */

// Each block renderer is authored against its own data shape (e.g. HeroData),
// but the registry stores them all in one map. We type the stored renderer
// against the BlockData union and cast each entry at registration; the concrete
// data shape is guaranteed by the matching `defaultData`, so this stays safe.
type BlockRenderer = ComponentType<{ data: BlockData }>;

export interface BlockConfig<T extends BlockData = BlockData> {
  type: BlockType;
  label: string;
  description: string;
  defaultData: T;
  fields: FieldDef[];
  Renderer: BlockRenderer;
}

export const blockRegistry: Record<BlockType, BlockConfig> = {
  hero: {
    type: "hero",
    label: "Hero",
    description: "Large headline section with a call-to-action button.",
    defaultData: {
      title: "Build landing pages in minutes",
      subtitle: "A flexible, block-based editor with instant live preview.",
      buttonText: "Get Started",
    } satisfies HeroData,
    fields: [
      { key: "title", label: "Title", type: "text", placeholder: "Headline" },
      { key: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Supporting text" },
      { key: "buttonText", label: "Button Text", type: "text", placeholder: "e.g. Get Started" },
    ],
    Renderer: HeroBlock as BlockRenderer,
  },

  features: {
    type: "features",
    label: "Features",
    description: "A titled grid of feature cards.",
    defaultData: {
      sectionTitle: "Why choose us",
      cards: [
        { title: "Fast", description: "Instant live preview as you type." },
        { title: "Flexible", description: "Reorder and reuse content blocks." },
      ],
    } satisfies FeaturesData,
    fields: [
      { key: "sectionTitle", label: "Section Title", type: "text", placeholder: "Section heading" },
      {
        key: "cards",
        label: "Feature Cards",
        type: "list",
        itemLabel: "Feature",
        itemFields: [
          { key: "title", label: "Title", type: "text", placeholder: "Feature title" },
          { key: "description", label: "Description", type: "textarea", placeholder: "Feature description" },
        ],
      },
    ],
    Renderer: FeaturesBlock as BlockRenderer,
  },

  testimonials: {
    type: "testimonials",
    label: "Testimonial",
    description: "A customer quote with an author name.",
    defaultData: {
      quote: "This tool completely changed how we ship pages.",
      author: "Jane Doe, Product Lead",
    } satisfies TestimonialsData,
    fields: [
      { key: "quote", label: "Quote", type: "textarea", placeholder: "Customer quote" },
      { key: "author", label: "Author Name", type: "text", placeholder: "e.g. Jane Doe" },
    ],
    Renderer: TestimonialsBlock as BlockRenderer,
  },

  cta: {
    type: "cta",
    label: "Call to Action",
    description: "A bold closing section with a button.",
    defaultData: {
      heading: "Ready to get started?",
      buttonText: "Sign Up Free",
    } satisfies CTAData,
    fields: [
      { key: "heading", label: "Heading", type: "text", placeholder: "Closing heading" },
      { key: "buttonText", label: "Button Text", type: "text", placeholder: "e.g. Sign Up" },
    ],
    Renderer: CTABlock as BlockRenderer,
  },
};

// Convenience: an ordered list of registry entries for menus, etc.
export const blockConfigList: BlockConfig[] = Object.values(blockRegistry);

// Type guard used when importing untrusted JSON.
export function isKnownBlockType(value: unknown): value is BlockType {
  return typeof value === "string" && value in blockRegistry;
}
