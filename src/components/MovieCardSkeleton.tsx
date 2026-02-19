const MovieCardSkeleton = () => (
  <div className="flex-shrink-0 w-[140px] md:w-[180px]">
    <div className="rounded overflow-hidden bg-card">
      <div className="aspect-[2/3] skeleton-pulse" />
    </div>
  </div>
);

export const MovieRowSkeleton = () => (
  <div className="mb-8 px-4 md:px-12">
    <div className="h-6 w-40 skeleton-pulse mb-3" />
    <div className="flex gap-2 overflow-hidden">
      {Array.from({ length: 7 }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default MovieCardSkeleton;
