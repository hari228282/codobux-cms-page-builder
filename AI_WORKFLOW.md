# AI Workflow

The assessment allows AI tools and asks me to explain how I used them. So this
file explains, in simple words, how I used AI while building this project.

I used AI as a helper to work faster. But I made the main decisions myself, and
I read and understood every file before using it.

---

## Tools I Used

| Tool | What I used it for |
| --- | --- |
| Claude (AI assistant) | Planning the structure, writing the code faster, fixing errors, and writing the documentation. |

---

## How I Used AI (step by step)

*1. First I planned the app, then I asked AI to help build it.*
Before writing code, I decided the important things myself:
- Use the *Next.js App Router*.
- Use *Zustand* to manage the state (the page data).
- Use a *block registry* as the main idea, so adding a new block type is easy
  and only needs a change in one file.

I picked these because they match what the task is asking for: reusable
components, easy to grow, and clean code structure.

*2. I used AI to write the repeating code, then I reviewed it.*
Things like the small UI inputs, the block components, and the store functions
have a lot of similar code. I used AI to write this faster, and then I read each
file to make sure I understood it and the code was clean.

*3. I checked the code instead of just trusting it.*
I ran the project with npm run dev and built it with npm run build to make
sure everything works and there are no errors. When something broke, I fixed it.

---

## Some Prompts I Used

These are the kind of messages I sent to the AI while building.

*Planning the project:*
> "I have a task to build a small CMS-like Next.js app where users can add, edit,
> reorder and remove content blocks with a live preview. Give me a good plan and
> the best way to structure it so adding new block types is easy."

*Building the code:*
> "Generate the full starter code for this. Use the Next.js App Router, Zustand
> for state, and a block registry so each block type is defined in one place."

*Adding extra features:*
> "Add drag-and-drop reordering for the blocks, and a dark mode toggle. Make
> sure they fit the existing structure."

*Understanding the code:*
> "Explain the store file and the block registry file to me in simple language
> so I can explain them in my interview."

---

## What I Decided Myself (not AI)

- Choosing *Zustand* and the *block registry* as the main design.
- Choosing which extra features to add (drag-and-drop and dark mode) and which
  to skip, so the main app stays simple and stable.
- Reading and understanding every file before submitting it.

---

## Extra Features I Added

- *Drag-and-drop reordering* — I can drag a block to change its order. The
  up/down arrow buttons still work too, which is good for keyboard users.
- *Dark mode* — a button in the top bar switches between light and dark. It
  remembers my choice and also follows the system setting the first time.

---

## In Short

I used AI to move faster, but I understand how the whole app works — the state
management, the block registry, the live preview, and the saving to
localStorage. I can explain and change any part of it myself.