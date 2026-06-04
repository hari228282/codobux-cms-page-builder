import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </span>
      ) : null}
      <input
        className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 ${className}`}
        {...props}
      />
    </label>
  );
}
