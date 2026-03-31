const colorMap = {
  green: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200/60',
    text: 'text-emerald-700',
    bar: 'bg-emerald-500',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200/60',
    text: 'text-blue-700',
    bar: 'bg-blue-500',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200/60',
    text: 'text-amber-700',
    bar: 'bg-amber-500',
  },
  rose: {
    bg: 'bg-rose-50',
    border: 'border-rose-200/60',
    text: 'text-rose-700',
    bar: 'bg-rose-500',
  },
} as const;

interface MetricCardProps {
  label: string;
  value: string;
  color: keyof typeof colorMap;
}

export default function MetricCard({ label, value, color }: MetricCardProps) {
  const c = colorMap[color];
  return (
    <div className={`relative overflow-hidden rounded-xl border ${c.border} ${c.bg} px-4 py-4`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${c.bar}`} />
      <div className={`text-2xl font-bold tracking-tight ${c.text}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-1 font-medium">{label}</div>
    </div>
  );
}
