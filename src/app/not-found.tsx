import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-content flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-heading text-3xl font-semibold text-ink-light dark:text-ink-dark">Page not found</h1>
      <p className="mt-3 max-w-md text-body text-muted-light dark:text-muted-dark">
        The page you are looking for does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hoverLight dark:hover:bg-accent-hoverDark"
      >
        Back home
      </Link>
    </div>
  );
}
