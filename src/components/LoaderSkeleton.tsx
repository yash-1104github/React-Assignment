export default function LoaderSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mx-auto">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse p-4 bg-white rounded shadow-sm">
          <div className="h-40 bg-slate-200 rounded mb-3" />
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}
