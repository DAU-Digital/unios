import { Panels } from "@/components/Panels";

// Building blocks of a deck page, shared by the /2050 slides. They mirror the
// helpers of the AI-native page so both pages look and move the same.

export const pad = (n: number) => String(n).padStart(2, "0");

export const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

// Splits a heading into words so they can rise in one after another.
export function Words({ text, from = 0 }: { text: string; from?: number }) {
  return text.split(" ").map((w, i) => (
    <span key={i}>
      {i > 0 && " "}
      <span className="w" style={{ "--w": from + i } as React.CSSProperties}>
        {w}
      </span>
    </span>
  ));
}

export type Head = { label: string; title: string; lead?: string };

export function SectionHead({ label, title, lead, dark }: Head & { dark?: boolean }) {
  return (
    <div className={`border-t-2 pt-5 ${dark ? "border-white" : "border-ink"}`} data-reveal>
      <p className={`label ${dark ? "!text-white/60" : ""}`}>{label}</p>
      <div className="mt-4 grid gap-6 lg:grid-cols-4 lg:gap-x-6">
        <h2 className="d2 lg:col-span-2">
          <Words text={title} />
        </h2>
        {lead && <p className={`lead lg:col-span-2 lg:pt-2 ${dark ? "!text-white/70" : ""}`}>{lead}</p>}
      </div>
    </div>
  );
}

// One screen of the deck. The fixed header sits over its top padding.
export function Slide({ id, title, className = "", children }: { id: string; title: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} data-slide data-title={title} aria-label={title} className={`slide ${className}`}>
      {children}
    </section>
  );
}

// A section head over its details; details that need more than one screen
// are split into panels that scroll sideways.
export function Section({
  id,
  head,
  panels,
  deck,
  dark,
  className = "",
  mullions,
}: {
  id: string;
  head: Head;
  panels: React.ReactNode[];
  deck: { prev: string; next: string };
  dark?: boolean;
  className?: string;
  mullions?: boolean;
}) {
  return (
    <Slide id={id} title={head.title} className={className}>
      <Container className={`slide-body ${mullions ? "mullions" : ""}`}>
        <Panels head={<SectionHead {...head} dark={dark} />} panels={panels} prev={deck.prev} next={deck.next} />
      </Container>
    </Slide>
  );
}
