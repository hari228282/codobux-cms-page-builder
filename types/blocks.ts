/**
 * Central type definitions for the CMS.
 *
 * A "Block" is one content section on the landing page. Every block has a
 * stable `id`, a `type` (which maps to an entry in the block registry), and a
 * `data` object holding the editable content for that block.
 *
 * The editor and the preview never hardcode block-specific logic — they read
 * everything they need from the registry (see lib/blockRegistry.tsx). That is
 * what makes "adding a new block type" a one-file change.
 */

// The four block types required by the assessment.
export type BlockType = "hero" | "features" | "testimonials" | "cta";

// ---- Per-block content shapes ----

export interface HeroData {
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface FeatureCard {
  title: string;
  description: string;
}

export interface FeaturesData {
  sectionTitle: string;
  cards: FeatureCard[];
}

export interface TestimonialsData {
  quote: string;
  author: string;
}

export interface CTAData {
  heading: string;
  buttonText: string;
}

// A union of all possible block content shapes.
export type BlockData = HeroData | FeaturesData | TestimonialsData | CTAData;

// A single content block instance living in application state.
export interface Block {
  id: string;
  type: BlockType;
  data: BlockData;
}

// ---- Field schema (drives the editor forms automatically) ----

// The kinds of inputs the editor knows how to render.
export type FieldType = "text" | "textarea" | "list";

export interface FieldDef {
  // The key inside the block's `data` object this field maps to.
  key: string;
  // Human-readable label shown in the editor.
  label: string;
  // Which input control to render.
  type: FieldType;
  placeholder?: string;
  // Only for `type: "list"` — describes the fields of each item in the list,
  // e.g. a feature card has a title and a description.
  itemFields?: FieldDef[];
  // Singular noun for list items, e.g. "Feature" -> "Add Feature".
  itemLabel?: string;
}
