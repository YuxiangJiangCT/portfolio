const styleMap: Record<string, string> = {
  Production: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Internship: 'bg-blue-50 text-blue-700 border-blue-200',
  'System Design': 'bg-violet-50 text-violet-700 border-violet-200',
  Research: 'bg-amber-50 text-amber-700 border-amber-200',
  'Cornell Tech': 'bg-red-50 text-red-700 border-red-200',
  'Co-founder CTO': 'bg-indigo-50 text-indigo-700 border-indigo-200',
};

interface StatusBadgeProps {
  label: string;
}

export default function StatusBadge({ label }: StatusBadgeProps) {
  const style = styleMap[label] ?? 'bg-gray-50 text-gray-700 border-gray-200';
  return (
    <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ${style}`}>
      {label}
    </span>
  );
}
