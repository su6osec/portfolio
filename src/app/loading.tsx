import { CardSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-content px-4 pb-24 pt-32 sm:px-6 lg:px-8" aria-busy="true" aria-label="Loading">
      <div className="h-10 w-48 animate-pulse rounded-2xl bg-border-dark/80" />
      <div className="mt-6 h-4 max-w-xl animate-pulse rounded-full bg-border-dark/70" />
      <div className="mt-3 h-4 max-w-lg animate-pulse rounded-full bg-border-dark/60" />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
