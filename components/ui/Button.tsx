import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600",
  ghost: "bg-transparent text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
  danger: "bg-transparent text-red-500 hover:bg-red-50",
};

export default function Button({
  variant = "secondary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}
