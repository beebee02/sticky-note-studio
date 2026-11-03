import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { NOTE_COLORS, Tape, type NoteColor } from "./sticky-note";

export interface PopupMsg {
  emoji: string;
  text: string;
}

type SurpriseEvent = { kind: "popup"; popup: PopupMsg } | { kind: "chaos" };

const listeners = new Set<(e: SurpriseEvent) => void>();
function emit(e: SurpriseEvent) {
  listeners.forEach((l) => l(e));
}

/** Fire surprises from anywhere: surprise.popup(...) or surprise.chaos() */
export const surprise = {
  popup: (popup: PopupMsg) => emit({ kind: "popup", popup }),
  chaos: () => emit({ kind: "chaos" }),
};

const MEMES: PopupMsg[] = [
  { emoji: "☕", text: "This meeting could've been an email. This popup could've been a sticky note. Yet here we are." },
  { emoji: "🕵️", text: "Requirements changed again? Say it isn't so." },
  { emoji: "📊", text: "Excel: where dreams (and VLOOKUPs) go to die." },
  { emoji: "🚀", text: "It works on my machine ¯\\_(ツ)_/¯" },
  { emoji: "🧃", text: "Hydration check! Drink water. Ship features." },
  { emoji: "🤝", text: "Stakeholder: 'Just a tiny change.' It is never tiny." },
  { emoji: "😂", text: "You scrolled this far? Honestly, hire me already." },
  { emoji: "📎", text: "Attachment: my sense of humor. (2 MB, might crash your Outlook.)" },
  { emoji: "🛌", text: "Still here? Respect. The sticky notes work in shifts." },
];

const CORNERS = [
  "bottom-6 left-6",
  "bottom-6 right-6",
  "top-24 left-6",
  "top-24 right-6",
] as const;

const RAIN_COLORS: NoteColor[] = ["yellow", "pink", "blue", "green", "orange", "purple"];
const CONFETTI_COLORS = [
  "bg-marker-red",
  "bg-note-yellow",
  "bg-note-blue",
  "bg-note-green",
  "bg-note-purple",
  "bg-note-orange",
];

export function SurpriseLayer() {
  const [popup, setPopup] = useState<{ popup: PopupMsg; corner: string; key: number } | null>(null);
  const [rainKey, setRainKey] = useState(0);
  const [confettiKey, setConfettiKey] = useState(0);
  const dismissTimer = useRef<number | undefined>(undefined);

  const showPopup = useCallback((p: PopupMsg) => {
    setPopup({ popup: p, corner: CORNERS[Math.floor(Math.random() * CORNERS.length)], key: Date.now() });
  }, []);

  useEffect(() => {
    const onEvent = (e: SurpriseEvent) => {
      if (e.kind === "popup") {
        showPopup(e.popup);
      }
      if (e.kind === "chaos") {
        setRainKey((k) => k + 1);
        setConfettiKey((k) => k + 1);
        showPopup(MEMES[Math.floor(Math.random() * MEMES.length)]);
      }
    };
    listeners.add(onEvent);
    return () => {
      listeners.delete(onEvent);
    };
  }, [showPopup]);

  // Surprise meme popups while the visitor idles.
  useEffect(() => {
    let timer: number;
    let idx = 0;
    const shuffled = [...MEMES].sort(() => Math.random() - 0.5);
    const schedule = () => {
      timer = window.setTimeout(() => {
        showPopup(shuffled[idx % shuffled.length]);
        idx += 1;
        schedule();
      }, 14000 + Math.random() * 9000);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [showPopup]);

  // Auto-dismiss popups.
  useEffect(() => {
    if (!popup) return;
    window.clearTimeout(dismissTimer.current);
    dismissTimer.current = window.setTimeout(() => setPopup(null), 7000);
    return () => window.clearTimeout(dismissTimer.current);
  }, [popup]);

  return (
    <>
      {popup && (
        <MemePopup key={popup.key} popup={popup.popup} corner={popup.corner} onClose={() => setPopup(null)} />
      )}
      {rainKey > 0 && <StickyRain key={rainKey} />}
      {confettiKey > 0 && <Confetti key={confettiKey} />}
    </>
  );
}

function MemePopup({
  popup,
  corner,
  onClose,
}: {
  popup: PopupMsg;
  corner: string;
  onClose: () => void;
}) {
  return (
    <div role="status" className={cn("fixed z-50 w-72 max-w-[calc(100vw-3rem)] animate-pop-in", corner)}>
      <div className="relative rotate-2 rounded-sm bg-note-white p-4 pr-9 text-ink shadow-(--shadow-popup)">
        <Tape className="-top-3.5 h-6 w-20 -rotate-6" />
        <button
          onClick={onClose}
          aria-label="Dismiss"
          className="absolute top-2 right-2 grid size-7 place-items-center rounded-full font-marker text-ink/50 transition hover:bg-ink/10 hover:text-ink"
        >
          ✕
        </button>
        <p className="text-4xl leading-none">{popup.emoji}</p>
        <p className="mt-2 font-note text-base leading-snug">{popup.text}</p>
      </div>
    </div>
  );
}

/** A shower of falling sticky notes. */
function StickyRain() {
  const notes = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: Math.random() * 96,
        delay: Math.random() * 1.2,
        duration: 2.4 + Math.random() * 1.6,
        color: RAIN_COLORS[i % RAIN_COLORS.length],
        size: 44 + Math.random() * 44,
        lines: 2 + Math.floor(Math.random() * 3),
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {notes.map((n, i) => (
        <div
          key={i}
          className={cn("absolute -top-28 animate-fall rounded-sm p-2 shadow-md", NOTE_COLORS[n.color])}
          style={
            {
              left: `${n.left}%`,
              width: n.size,
              height: n.size,
              animationDelay: `${n.delay}s`,
              animationDuration: `${n.duration}s`,
            } as CSSProperties
          }
        >
          <div className="space-y-1.5">
            {Array.from({ length: n.lines }).map((_, j) => (
              <div
                key={j}
                className="h-1 rounded bg-ink/20"
                style={{ width: `${58 + ((i + j) % 3) * 14}%` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Emoji-free CSS confetti burst. */
function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 44 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2 + Math.random() * 1.5,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        w: 6 + Math.random() * 5,
        h: 10 + Math.random() * 8,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((p, i) => (
        <div
          key={i}
          className={cn("absolute -top-6 animate-fall", p.color)}
          style={
            {
              left: `${p.left}%`,
              width: p.w,
              height: p.h,
              borderRadius: 2,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

const PRESS_LABELS = [
  "DO NOT PRESS ⛔",
  "I SAID DON'T 🙄",
  "SERIOUSLY? 😑",
  "OK FINE, CHAOS 🎉",
  "YOU MONSTER 💀",
  "AGAIN? 🫠",
];

/** The forbidden button. Pressing it is a mistake. */
export function DoNotPress() {
  const [presses, setPresses] = useState(0);

  return (
    <button
      onClick={() => {
        surprise.chaos();
        setPresses((p) => Math.min(p + 1, PRESS_LABELS.length - 1));
      }}
      className="relative -rotate-3 cursor-pointer rounded-sm bg-marker-red px-5 py-3 font-marker text-lg text-note-white shadow-(--shadow-note) transition duration-200 hover:rotate-0 hover:scale-105"
    >
      <span
        aria-hidden
        className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-2 bg-tape"
      />
      {PRESS_LABELS[presses]}
    </button>
  );
}
