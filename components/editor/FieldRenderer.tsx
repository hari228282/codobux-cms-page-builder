"use client";

import type { FieldDef } from "@/types/blocks";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

/**
 * Renders a single editor field based purely on its schema (FieldDef).
 *
 * This component is what lets the editor stay generic: it does not know about
 * "hero" or "features" — it only knows how to render a text field, a textarea,
 * or a repeatable list of sub-fields. New field types would be added here once.
 */

interface FieldRendererProps {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
}

export default function FieldRenderer({ field, value, onChange }: FieldRendererProps) {
  if (field.type === "text") {
    return (
      <Input
        label={field.label}
        placeholder={field.placeholder}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <Textarea
        label={field.label}
        placeholder={field.placeholder}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (field.type === "list") {
    const items = (Array.isArray(value) ? value : []) as Record<string, unknown>[];
    const itemFields = field.itemFields ?? [];

    const updateItem = (index: number, key: string, newValue: unknown) => {
      const next = items.map((item, i) =>
        i === index ? { ...item, [key]: newValue } : item
      );
      onChange(next);
    };

    const addItem = () => {
      // Build a blank item from the item's field keys.
      const blank: Record<string, unknown> = {};
      itemFields.forEach((f) => (blank[f.key] = ""));
      onChange([...items, blank]);
    };

    const removeItem = (index: number) => {
      onChange(items.filter((_, i) => i !== index));
    };

    return (
      <div>
        <span className="mb-2 block text-xs font-medium text-slate-500 dark:text-slate-400">
          {field.label}
        </span>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  {field.itemLabel ?? "Item"} {index + 1}
                </span>
                <Button variant="danger" onClick={() => removeItem(index)}>
                  Remove
                </Button>
              </div>
              <div className="space-y-2">
                {itemFields.map((subField) => (
                  <FieldRenderer
                    key={subField.key}
                    field={subField}
                    value={item[subField.key]}
                    onChange={(v) => updateItem(index, subField.key, v)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button variant="secondary" className="mt-3 w-full" onClick={addItem}>
          + Add {field.itemLabel ?? "Item"}
        </Button>
      </div>
    );
  }

  return null;
}
