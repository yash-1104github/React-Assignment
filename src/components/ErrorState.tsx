export default function ErrorState({ message }: { message?: string }) {
  return (
    <div className="p-8 text-center text-red-600">
      <p className="text-lg font-semibold">Error</p>
      <p className="mt-2 text-sm">
        {message ?? "Something went wrong while loading data."}
      </p>
    </div>
  );
}
