import { RankedInsight, formatCurrency, formatMultiple, formatPercent } from "@/lib/stocks";

type StockCardProps = {
  stock: RankedInsight;
  rank: number;
};

const convictionStyles: Record<RankedInsight["convictionLabel"], string> = {
  High: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Speculative: "bg-rose-100 text-rose-700 border-rose-200",
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
      {title}
    </h4>
    <div className="space-y-1">{children}</div>
  </div>
);

const MetricRow = ({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) => (
  <div className="flex items-baseline justify-between text-sm text-slate-600">
    <span className="font-medium text-slate-500">{label}</span>
    <div className="text-right">
      <span className="font-semibold text-slate-800">{value}</span>
      {helper ? <p className="text-xs text-slate-500">{helper}</p> : null}
    </div>
  </div>
);

export const StockCard = ({ stock, rank }: StockCardProps) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/90 text-lg font-semibold text-white">
              {rank}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-slate-900">
                  {stock.ticker}
                </h3>
                <span className="rounded-full border border-slate-200 px-2 py-0.5 text-xs font-semibold uppercase text-slate-500">
                  {stock.sector ?? "N/A"}
                </span>
              </div>
              <p className="text-sm text-slate-500">{stock.companyName}</p>
            </div>
          </div>
        </div>
        <div
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${convictionStyles[stock.convictionLabel]}`}
        >
          {stock.convictionLabel} Conviction
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Section title="Forecast">
          <MetricRow
            label="Projected 3m Return"
            value={formatPercent(stock.projectedThreeMonthReturn)}
            helper="Blended from analyst targets + momentum"
          />
          <MetricRow
            label="Analyst Upside"
            value={formatPercent(stock.targetUpside)}
            helper="Consensus 12m price objective"
          />
          <MetricRow
            label="Momentum Bias"
            value={formatPercent(stock.momentumScore)}
            helper="Weighted 3/6/12 month performance"
          />
        </Section>

        <Section title="Quality & Valuation">
          <MetricRow
            label="Revenue Growth"
            value={formatPercent(stock.revenueGrowth)}
          />
          <MetricRow label="Profit Margins" value={formatPercent(stock.profitMargins)} />
          <MetricRow label="Forward P/E" value={formatMultiple(stock.forwardPE)} />
          <MetricRow label="Beta" value={stock.beta?.toFixed(2) ?? "—"} />
        </Section>

        <Section title="Snapshot">
          <MetricRow label="Last Price" value={`$${stock.price.toFixed(2)}`} />
          <MetricRow label="Market Cap" value={formatCurrency(stock.marketCap)} />
          <MetricRow
            label="50D vs Price"
            value={formatPercent(stock.fiftyDayGap)}
            helper="Positive = strength vs trend"
          />
          <MetricRow
            label="200D vs Price"
            value={formatPercent(stock.twoHundredDayGap)}
          />
        </Section>
      </div>
    </article>
  );
};
