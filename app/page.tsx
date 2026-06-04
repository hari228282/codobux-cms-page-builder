"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/lib/useTheme";
import EditorPanel from "@/components/editor/EditorPanel";
import PreviewPanel from "@/components/preview/PreviewPanel";

export default function Home() {
  const { isDark, toggle } = useTheme();
  // `mounted` guards against a hydration mismatch: the persisted blocks live in
  // localStorage, which only exists on the client. We render the real UI only
  // after the first client-side mount so server and client markup agree.
  const [mounted, setMounted] = useState(false);
  // On small screens we can't fit both panels, so toggle between them.
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center text-lg text-slate-400">
        Loading editor…
      </div>
    );
  }

  const toggleBtn = (view: "editor" | "preview", label: string) => (
    <button
      onClick={() => setMobileView(view)}
      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
        mobileView === view
          ? "bg-white text-slate-800 shadow-sm dark:bg-slate-700 dark:text-slate-100"
          : "text-slate-500 dark:text-slate-400"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <div className="flex items-baseline">
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">codobux</span>
          <span className="text-lg font-bold text-brand">.</span>
          <span className="hidden lg:block ml-3 text-sm text-slate-400 dark:text-slate-500">Page Builder</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile-only panel switch */}
          <div className="flex gap-1 rounded-md bg-slate-100 p-0.5 dark:bg-slate-800 lg:hidden">
            {toggleBtn("editor", "Editor")}
            {toggleBtn("preview", "Preview")}
          </div>
          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle dark mode"
            className="rounded-md border border-slate-200 px-2.5 py-1.5 text-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Body: left editor + right live preview */}
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`w-full overflow-y-auto border-r border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900 lg:block lg:w-[380px] lg:shrink-0 ${
            mobileView === "editor" ? "block" : "hidden"
          }`}
        >
          <EditorPanel />
        </aside>
        <main
          className={`flex-1 ${mobileView === "preview" ? "block" : "hidden"} lg:block`}
        >
          <PreviewPanel />
        </main>
      </div>
    </div>
  );
}
