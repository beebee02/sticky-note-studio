import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const NOTE_COLORS = {
  sky: "bg-note-sky",
  mint: "bg-note-mint",
  lavender: "bg-note-lavender",
  ice: "bg-note-ice",
  violet: "bg-note-violet",
  pink: "bg-note-pink",
  white: "bg-note-white",
} as const;

export type NoteColor = keyof typeof NOTE_COLORS;

/** Observe when an element first scrolls into view. */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

interface StickyNoteProps {
  color?: NoteColor;
  /** resting rotation in degrees */
  rotation?: number;
  /** entrance animation delay in seconds */
  delay?: number;
  /** drop in from the top when it first scrolls into view */
  entrance?: boolean;
  tape?: boolean | "top" | "left" | "right";
  pin?: boolean;
  /** folded bottom-right corner */
  fold?: boolean;
  pad?: string;
  className?: string;
  children: ReactNode;
}

export function StickyNote({
  color = "yellow",
  rotation = 0,
  delay = 0,
  entrance = true,
  tape = false,
  pin = false,
  fold = false,
  pad = "p-5",
  className,
  children,
}: StickyNoteProps) {
  const [ref, inView] = useInView<HTMLDivElement>(0.1);
  const shown = !entrance || inView;

  return (
    <div
      ref={ref}
      style={
        {
          "--note-rot": `${rotation}deg`,
          animationDelay: entrance ? `${delay}s` : undefined,
        } as CSSProperties
      }
      className={cn(
        "group relative transition-[scale,translate] duration-300",
        "hover:z-10 hover:-translate-y-1 hover:scale-[1.04]",
        shown ? "animate-drop-in" : "opacity-0",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-full rounded-sm text-ink shadow-(--shadow-note)",
          NOTE_COLORS[color],
          "bg-linear-to-b from-transparent to-ink/5",
          pad,
          shown && "group-hover:animate-note-wiggle",
        )}
      >
        {pin && <Pushpin />}
        {tape && <Tape side={typeof tape === "string" ? tape : "top"} />}
        {fold && (
          <span
            aria-hidden
            className="absolute right-0 bottom-0 size-7 bg-ink/10 [clip-path:polygon(100%_0,100%_100%,0_100%)]"
          />
        )}
        {children}
      </div>
    </div>
  );
}

export function Tape({
  side = "top",
  className,
}: {
  side?: "top" | "left" | "right";
  className?: string;
}) {
  const sideClasses = {
    top: "-top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3",
    left: "top-8 -left-3 h-20 w-7 rotate-[8deg]",
    right: "top-10 -right-3 h-20 w-7 -rotate-[6deg]",
  } as const;

  return (
    <span
      aria-hidden
      className={cn("absolute bg-tape shadow-sm", sideClasses[side], className)}
    />
  );
}

export function Pushpin({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("absolute -top-2.5 left-1/2 z-10 -translate-x-1/2", className)}
    >
      <span className="relative block size-5 rounded-full bg-marker-pink shadow-md ring-2 ring-marker-pink/40">
        <span className="absolute top-1 left-1 size-1.5 rounded-full bg-note-white/70" />
      </span>
    </span>
  );
}
