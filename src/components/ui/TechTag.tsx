interface TechTagProps {
  name: string;
}

export default function TechTag({ name }: TechTagProps) {
  return (
    <span className="inline-block px-2 py-0.5 text-[12px] font-medium text-gray-500 bg-gray-50 border border-gray-150 rounded">
      {name}
    </span>
  );
}
