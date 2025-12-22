export default function ProductCardSkeletonList({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-border-sub h-[260px] animate-pulse rounded-md" />
      ))}
    </div>
  );
}
