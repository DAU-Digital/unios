"use client";

// Opens the book view (Book.tsx listens for "dau:book"). Shown only on wide
// landscape screens: two pages side by side need the room.
export function BookButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      data-book-open-button
      onClick={() => window.dispatchEvent(new Event("dau:book"))}
      className="hidden h-8 items-center gap-2 border border-brand px-3 text-[0.8125rem] font-semibold text-brand transition-colors hover:bg-brand hover:text-white lg:landscape:inline-flex"
    >
      {/* An open book: two pages meeting at the spine. */}
      <svg aria-hidden viewBox="0 0 16 12" className="h-3 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 2.5C6.5 1.3 4.5 1 1 1v9.5c3.5 0 5.5.3 7 1.5 1.5-1.2 3.5-1.5 7-1.5V1c-3.5 0-5.5.3-7 1.5Zm0 0V12" />
      </svg>
      {label}
    </button>
  );
}
