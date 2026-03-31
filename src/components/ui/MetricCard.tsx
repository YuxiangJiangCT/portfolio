const colorMap = {
  green: 'text-accent-green bg-emerald-50 border-emerald-200',
  blue: 'text-accent bg-blue-50 border-blue-200',
  amber: 'text-accent-amber bg-amber-50 border-amber-200',
  rose: 'text-accent-rose bg-rose-50 border-rose-200',
} as const;

interface MetricCardProps {
  label: string;
  value: string;
  color: keyof typeof colorMap;
}

export default function MetricCard({ label, value, color }: MetricCardProps) {
  return (
    <div className={`rounded-lg border px-4 py-3 ${colorMap[color]}`}>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm text-text-secondary mt-0.5">{label}</div>
    </div>
  );
}
