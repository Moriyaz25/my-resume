import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-canvas text-center">
      <div className="clay p-10 max-w-sm">
        <h1 className="font-display text-3xl font-semibold text-ink mb-3">
          404
        </h1>
        <p className="font-body text-ink/65 mb-6">
          This page doesn't exist — maybe it got refactored away.
        </p>
        <Link href="/" className="clay-button inline-flex">
          Back to home
        </Link>
      </div>
    </main>
  );
}
