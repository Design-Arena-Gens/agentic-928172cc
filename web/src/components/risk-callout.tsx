type RiskCalloutProps = {
  title: string;
  items: string[];
};

export const RiskCallout = ({ title, items }: RiskCalloutProps) => {
  return (
    <aside className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-sm text-amber-800 shadow-sm">
      <h3 className="mb-2 text-base font-semibold text-amber-900">{title}</h3>
      <ul className="list-disc space-y-1 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
};
