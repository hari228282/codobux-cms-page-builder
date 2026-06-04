import type { CTAData } from "@/types/blocks";

export default function CTABlock({ data }: { data: CTAData }) {
  return (
    <section className="bg-slate-900 px-8 py-16 text-center">
      <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white">
        {data.heading || "Ready to get started?"}
      </h2>
      {data.buttonText ? (
        <button className="mt-6 rounded-md bg-brand px-6 py-3 font-medium text-white transition-colors hover:bg-brand-dark">
          {data.buttonText}
        </button>
      ) : null}
    </section>
  );
}
