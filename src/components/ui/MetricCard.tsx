const colorMap = {
  green: 'text-emerald-600',
  blue: 'text-blue-600',
  amber: 'text-amber-600',
  rose: 'text-rose-600',
} as const;

interface MetricCardProps {
  label: string;
  value: string;
  color: keyof typeof colorMap;
}

export default function MetricCard({ label, value, color }: MetricCardProps) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className={`text-[18px] font-bold tabular-nums ${colorMap[color]}`}>{value}</span>
      <span className="text-[13px] text-gray-400">{label}</span>
    </div>
  );
}
