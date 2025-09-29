export default function EmptyState({
  message = "No results",
}: {
  message?: string;
}) {
  return (
    <div className="p-8 text-center text-slate-600">
      <p className="text-lg font-semibold">{message}</p>
      <p className="mt-2 text-sm">Try adjusting your filters or search.</p>
    </div>
  );
}
