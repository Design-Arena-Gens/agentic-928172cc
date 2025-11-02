import { OpportunitiesTable } from "@/components/opportunities-table";
import { RiskCallout } from "@/components/risk-callout";
import { StockCard } from "@/components/stock-card";
import { getRankedInsights, getTopIdeas } from "@/lib/stocks";

const formatUpdatedAt = (timestamp?: string) => {
  if (!timestamp) return "Unknown";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
};

export default function Home() {
  const ranked = getRankedInsights();
  const ideas = getTopIdeas(3);
  const updatedAt = formatUpdatedAt(ranked.at(0)?.fetchedAt);

  const top10 = ranked.slice(0, 10);
  const qualifiedCount = ranked.filter((stock) => stock.meetsTarget).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-16 text-slate-900 sm:px-10">
      <div className="mx-auto max-w-6xl space-y-12">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">
                Equity Outlook · 3 Month Horizon
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                Research-backed ideas targeting ≥10% upside
              </h1>
            </div>
            <div className="rounded-full border border-emerald-200/40 bg-emerald-50/10 px-4 py-2 text-xs text-emerald-100">
              Data refreshed {updatedAt}
            </div>
          </div>
          <p className="max-w-4xl text-sm text-slate-200 sm:text-base">
            Quantitative screen scoring large-cap U.S. equities on blended momentum, analyst
            outlook, and operating quality. We surface the top candidates most likely to deliver a
            10%+ price appreciation over the next three months based on these factors. Use this as a
            starting point for deeper diligence.
          </p>
        </header>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Top conviction ideas</h2>
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              {qualifiedCount} stocks exceed the ≥10% target threshold
            </span>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {ideas.map((stock, index) => (
              <StockCard key={stock.ticker} stock={stock} rank={index + 1} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6 rounded-3xl border border-slate-200/30 bg-white/90 p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900">How the model scores candidates</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Momentum (40%)
                </h3>
                <p className="text-sm text-slate-600">
                  Weighted 3/6/12 month returns with bias toward the most recent quarter. Candidates
                  must demonstrate positive momentum skew without being excessively extended over
                  the 50-day moving average.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Analyst positioning (35%)
                </h3>
                <p className="text-sm text-slate-600">
                  Incorporates consensus price targets and ratings. Analyst-implied upside drives the
                  base case, then tempered by valuation multiples versus growth outlook.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Growth & profitability (20%)
                </h3>
                <p className="text-sm text-slate-600">
                  Prioritises accelerating revenue trends and durable margins. Companies with both
                  metrics in the top quartile gain a quality premium.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Risk moderation (5%)
                </h3>
                <p className="text-sm text-slate-600">
                  Penalises names with outsized beta (&gt;1.6) or stretched forward multiples (&gt;35×),
                  helping surface ideas with more balanced downside profiles.
                </p>
              </div>
            </div>
          </div>
          <RiskCallout
            title="Use this research responsibly"
            items={[
              "Past performance and analyst estimates do not guarantee future returns.",
              "Macro shocks, earnings surprises, or policy changes can invalidate the thesis quickly.",
              "Size positions appropriately and pair this with qualitative due diligence.",
            ]}
          />
        </section>

        <section className="space-y-4 rounded-3xl border border-slate-200/30 bg-white/95 p-8 shadow-md">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Broader opportunity set</h2>
              <p className="text-sm text-slate-600">
                Ranked list of the strongest 10 ideas, useful for building a watchlist or hedged
                basket. Scores reflect projected three-month return potential.
              </p>
            </div>
          </div>
          <OpportunitiesTable stocks={top10} />
        </section>

        <footer className="pb-4 text-center text-xs text-slate-400">
          Generated automatically from market data (Yahoo Finance via yfinance). Updated daily. This
          is educational analysis and not investment advice.
        </footer>
      </div>
    </div>
  );
}
