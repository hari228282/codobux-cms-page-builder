# Codobux CMS — Block-Based Landing Page Builder

A small CMS-style application built with *Next.js (App Router)* where users
assemble a landing page from reusable content blocks and see a *live preview*
update instantly as they edit. State is persisted to the browser, and pages can
be exported / imported as JSON.

---

## Features

- *Dynamic block management* — add, edit, reorder, duplicate, and remove blocks.
- *Instant live preview* — edits reflect immediately, with no page refresh.
- *Four block types* — Hero, Features (with repeatable feature cards),
  Testimonial, and Call-to-Action.
- *Schema-driven blocks* — block types are defined in a single registry, so a
  new block type can be added in one place.
- *Drag-and-drop reordering* — reorder blocks by dragging (powered by
  dnd-kit), with the ↑ / ↓ buttons kept as an accessible fallback.
- *Dark mode* — toggle in the header; the choice persists and respects the
  OS preference on first load.
- *Persistence* — auto-saves to localStorage, plus explicit JSON
  export / import with validation.
- *Responsive editor* — side-by-side editor/preview on desktop, with a panel
  toggle on small screens.

---

## Getting Started

Requirements: *Node.js 18.18+* (Node 20+ recommended).

bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open the app
# http://localhost:3000


Other scripts:

bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint the project


---

## How to Use It

1. Click *Add Block* and choose a block type.
2. Select a block in the *Page Blocks* list to edit its content on the left;
   the *live preview* on the right updates as you type.
3. Use the row controls to *move ↑ / ↓, **duplicate ⧉, or **delete ✕* a block.
4. Your page auto-saves to the browser. Use *Export JSON* to download it and
   *Import JSON* to load it back (or move it between machines).

---

## Project Structure

The codebase deliberately separates each concern the brief calls out — UI
components, block rendering, state, editor handling, utilities, and preview.


app/
  layout.tsx              Root layout + global styles
  page.tsx                Two-panel shell (editor | preview) + hydration guard
  globals.css             Tailwind layers + font + base styles

components/
  editor/                 LEFT PANEL — everything for editing
    EditorPanel.tsx         Toolbar (add / import / export / reset) + list + editor
    AddBlockMenu.tsx        "Add block" dropdown (lists every registered type)
    BlockList.tsx           Ordered list of blocks on the page
    BlockListItem.tsx       One row: select + reorder / duplicate / delete controls
    BlockEditor.tsx         Renders the form for the selected block
    FieldRenderer.tsx       Renders a single field (text / textarea / repeatable list)
  preview/                RIGHT PANEL — read-only rendering
    PreviewPanel.tsx        Live preview; subscribes to the store
    BlockRenderer.tsx       Looks up a block's renderer from the registry
  blocks/                 One folder per block type (presentational renderers)
    hero/ features/ testimonials/ cta/
  ui/                     Small reusable primitives (Button, Input, Textarea)

lib/
  blockRegistry.tsx       ★ Single source of truth for all block types
  store.ts                Zustand store + all block operations + persistence
  persistence.ts          JSON export / import + schema validation
  utils.ts                id generation, deep clone

types/
  blocks.ts               Block, BlockData, and field-schema types


---

## Architecture: the Block Registry

The most important design decision is the *block registry*
(lib/blockRegistry.tsx). Every block type is described in exactly one place:

ts
hero: {
  label: "Hero",
  defaultData: { title, subtitle, buttonText },
  fields: [ /* schema the editor reads to build its form */ ],
  Renderer: HeroBlock, /* component the preview uses */
}


Because both the *editor* and the *preview* read from this registry,
neither contains block-specific if / switch logic:

- The editor builds its form by iterating over fields.
- The preview renders a block by looking up its Renderer.

*Adding a new block type* therefore means: write a renderer component and add
one entry to the registry. Nothing else needs to change. This is what makes the
app scalable and satisfies the "support adding new block types easily"
requirement.

---

## State Management Overview

State lives in a single *Zustand* store (lib/store.ts).

*Why Zustand over Context / Redux Toolkit?*

- *Instant preview, no prop-drilling* — the preview simply subscribes to
  blocks; any edit re-renders it immediately.
- *Centralised, auditable updates* — every mutation (add, update, remove,
  duplicate, move, import, reset) is a named action in one file, so the update
  flow is easy to reason about and extend.
- *Less boilerplate than Redux Toolkit* for a task of this size, which keeps
  the code clean — a stated evaluation goal.

*Shape of the store:*


blocks: Block[]          // the page content (the source of truth)
selectedId: string|null  // which block the editor is focused on

addBlock, updateBlock, removeBlock, duplicateBlock, moveBlock
selectBlock
setBlocks, clearAll      // bulk ops used by import / reset


*Persistence* uses Zustand's persist middleware to auto-save blocks to
localStorage (key: codobux-cms-storage). On the page, a small "mounted"
guard delays rendering until after the first client mount, which avoids a
server/client hydration mismatch since localStorage is client-only.

---

## Tech Stack

- *Next.js 15* (App Router) + *React 19*
- *TypeScript* (strict)
- *Zustand 5* for state + persistence
- *Tailwind CSS 3* for styling (class-based dark mode)
- *dnd-kit* for accessible drag-and-drop reordering

---

## Possible Extensions

The architecture is set up to grow:

- *New block types* — add a renderer + one registry entry.
- *Undo/redo* — wrap the store with a history middleware.
- *New field types* — add a case to FieldRenderer (e.g. image URL, select).