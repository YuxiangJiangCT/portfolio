interface TechTagProps {
  name: string;
}

export default function TechTag({ name }: TechTagProps) {
  return (
    <span className="inline-block px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
      {name}
    </span>
  );
}
