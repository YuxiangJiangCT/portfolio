interface TechTagProps {
  name: string;
}

export default function TechTag({ name }: TechTagProps) {
  return (
    <span className="inline-block px-2.5 py-1 text-[11px] font-medium text-gray-600 bg-gray-100 border border-gray-200/60 rounded-md">
      {name}
    </span>
  );
}
