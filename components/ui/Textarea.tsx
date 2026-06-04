import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({ label, className = "", ...props }: TextareaProps) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </span>
      ) : null}
      <textarea
        rows={3}
        className={`w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 ${className}`}
        {...props}
      />
    </label>
  );
}
