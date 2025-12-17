"use client";

export default function SearchState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mt-5">
      <p className="text-lg">{title}</p>
      {description && <p className="mt-2">{description}</p>}
    </div>
  );
}
