import { RankedInsight, formatCurrency, formatMultiple, formatPercent } from "@/lib/stocks";

type OpportunitiesTableProps = {
  stocks: RankedInsight[];
};

export const OpportunitiesTable = ({ stocks }: OpportunitiesTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs uppercase text-slate-500">
            <th className="px-4 py-3 font-semibold">Rank</th>
            <th className="px-4 py-3 font-semibold">Ticker</th>
            <th className="px-4 py-3 font-semibold">Company</th>
            <th className="px-4 py-3 font-semibold">Projected 3m</th>
            <th className="px-4 py-3 font-semibold">Analyst Upside</th>
            <th className="px-4 py-3 font-semibold">3m Momentum</th>
            <th className="px-4 py-3 font-semibold">Revenue Growth</th>
            <th className="px-4 py-3 font-semibold">Forward P/E</th>
            <th className="px-4 py-3 font-semibold">Market Cap</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {stocks.map((stock, index) => (
            <tr key={stock.ticker} className="text-slate-600">
              <td className="px-4 py-3 font-semibold text-slate-500">{index + 1}</td>
              <td className="px-4 py-3 font-semibold text-slate-900">{stock.ticker}</td>
              <td className="px-4 py-3">{stock.companyName}</td>
              <td className="px-4 py-3 font-semibold text-slate-900">
                {formatPercent(stock.projectedThreeMonthReturn)}
              </td>
              <td className={`px-4 py-3 ${stock.targetUpside && stock.targetUpside > 0 ? "text-emerald-600 font-semibold" : "text-slate-500"}`}>
                {formatPercent(stock.targetUpside)}
              </td>
              <td className="px-4 py-3">{formatPercent(stock.threeMonthChange)}</td>
              <td className="px-4 py-3">{formatPercent(stock.revenueGrowth)}</td>
              <td className="px-4 py-3">{formatMultiple(stock.forwardPE)}</td>
              <td className="px-4 py-3">{formatCurrency(stock.marketCap)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
