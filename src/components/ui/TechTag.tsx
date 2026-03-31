interface TechTagProps {
  name: string;
}

export default function TechTag({ name }: TechTagProps) {
  return (
    <span className="inline-block px-2.5 py-1 text-xs font-medium bg-tag-bg text-tag-text rounded-md">
      {name}
    </span>
  );
}
