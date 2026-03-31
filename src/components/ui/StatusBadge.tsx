const styleMap: Record<string, string> = {
  Production: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  Internship: 'bg-sky-50 text-sky-700 border-sky-200/80',
  'System Design': 'bg-violet-50 text-violet-700 border-violet-200/80',
  Research: 'bg-amber-50 text-amber-700 border-amber-200/80',
  'Cornell Tech': 'bg-red-50 text-red-700 border-red-200/80',
  'Co-founder CTO': 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
};

interface StatusBadgeProps {
  label: string;
}

export default function StatusBadge({ label }: StatusBadgeProps) {
  const style = styleMap[label] ?? 'bg-gray-50 text-gray-600 border-gray-200/80';
  return (
    <span className={`inline-block px-2 py-0.5 text-[11px] font-semibold rounded-md border ${style}`}>
      {label}
    </span>
  );
}
