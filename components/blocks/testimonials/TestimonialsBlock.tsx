import type { TestimonialsData } from "@/types/blocks";

export default function TestimonialsBlock({ data }: { data: TestimonialsData }) {
  return (
    <section className="bg-slate-50 px-8 py-16">
      <figure className="mx-auto max-w-2xl text-center">
        <blockquote className="text-xl font-medium leading-relaxed text-slate-800">
          &ldquo;{data.quote || "A glowing quote from a happy customer."}&rdquo;
        </blockquote>
        <figcaption className="mt-4 text-sm font-semibold text-slate-500">
          — {data.author || "Customer Name"}
        </figcaption>
      </figure>
    </section>
  );
}
