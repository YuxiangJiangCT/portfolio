const styleMap: Record<string, string> = {
  Production: 'text-emerald-700 bg-emerald-50',
  Internship: 'text-sky-700 bg-sky-50',
  'System Design': 'text-violet-700 bg-violet-50',
  Research: 'text-amber-700 bg-amber-50',
  'Cornell Tech': 'text-red-700 bg-red-50',
  'Co-founder CTO': 'text-indigo-700 bg-indigo-50',
};

interface StatusBadgeProps {
  label: string;
}

export default function StatusBadge({ label }: StatusBadgeProps) {
  const style = styleMap[label] ?? 'text-gray-600 bg-gray-50';
  return (
    <span className={`inline-block px-2 py-0.5 text-[11px] font-semibold rounded ${style}`}>
      {label}
    </span>
  );
}
