import type { FeaturesData } from "@/types/blocks";

export default function FeaturesBlock({ data }: { data: FeaturesData }) {
  const cards = data.cards ?? [];

  return (
    <section className="px-8 py-16">
      <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
        {data.sectionTitle || "Section Title"}
      </h2>
      <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.length > 0 ? (
          cards.map((card, i) => (
            <div
              key={i}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {card.title || "Feature title"}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {card.description || "Feature description."}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-sm text-slate-400">
            No feature cards yet — add some in the editor.
          </p>
        )}
      </div>
    </section>
  );
}
