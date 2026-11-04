import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Hand-drawn curvy arrow, colored via currentColor. */
export function DoodleArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 70" fill="none" aria-hidden className={className}>
      <path
        d="M8 12 C 40 4, 82 10, 100 42"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M84 36 L 102 45 L 97 26"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hand-drawn star doodle. */
export function DoodleStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" aria-hidden className={className}>
      <path
        d="M30 4 L36 22 L55 23 L40 35 L46 54 L30 42 L14 54 L20 35 L5 23 L24 22 Z"
        fill="var(--color-note-mint)"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Loopy scribble circle, like circling something important. */
export function DoodleScribble({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" fill="none" aria-hidden className={className}>
      <path
        d="M50 8 C 80 2, 96 18, 90 32 C 84 50, 50 58, 28 50 C 8 43, 6 24, 22 14 C 34 6, 60 6, 72 14"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Comic-book "WOW!" burst sticker. */
export function StickerWow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={className}>
      <polygon
        points="60,2 74,26 102,18 96,46 118,60 96,74 102,102 74,94 60,118 46,94 18,102 24,74 2,60 24,46 18,18 46,26"
        fill="var(--color-marker-pink)"
        stroke="var(--color-ink)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <text
        x="60"
        y="70"
        textAnchor="middle"
        fontFamily="'Permanent Marker', cursive"
        fontSize="26"
        fill="var(--color-note-white)"
      >
        WOW!
      </text>
    </svg>
  );
}

/** Floating emoji sticker. */
export function EmojiSticker({
  emoji,
  className,
  rotation = 0,
  slow = false,
}: {
  emoji: string;
  className?: string;
  rotation?: number;
  slow?: boolean;
}) {
  return (
    <span
      aria-hidden
      style={{ "--float-rot": `${rotation}deg` } as CSSProperties}
      className={cn(
        "pointer-events-none select-none text-4xl drop-shadow-md",
        slow ? "animate-float-slow" : "animate-float",
        className,
      )}
    >
      {emoji}
    </span>
  );
}
