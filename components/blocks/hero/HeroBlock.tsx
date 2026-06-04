import type { HeroData } from "@/types/blocks";

// Presentational only: receives data, renders markup. No state, no store access.
// This keeps preview rendering cleanly separated from editing logic.
export default function HeroBlock({ data }: { data: HeroData }) {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white px-8 py-20 text-center">
      <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        {data.title || "Your headline goes here"}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
        {data.subtitle || "A supporting subtitle that explains your offer."}
      </p>
      {data.buttonText ? (
        <button className="mt-8 rounded-md bg-brand px-6 py-3 font-medium text-white transition-colors hover:bg-brand-dark">
          {data.buttonText}
        </button>
      ) : null}
    </section>
  );
}
