import { createFileRoute } from "@tanstack/react-router";
import { StickyNote, Tape, type NoteColor } from "@/components/portfolio/sticky-note";
import {
  DoodleArrow,
  DoodleStar,
  DoodleScribble,
  StickerWow,
  EmojiSticker,
} from "@/components/portfolio/stickers";
import { SurpriseLayer, DoNotPress, surprise } from "@/components/portfolio/surprise";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bhanu Teja — Sticky Note Portfolio" },
      {
        name: "description",
        content:
          "Bhanu Teja's portfolio, pinned to a midnight corkboard: projects, skills, memes and one big red button you should not press.",
      },
      { property: "og:title", content: "Bhanu Teja — Sticky Note Portfolio" },
      {
        property: "og:description",
        content: "A portfolio made of sticky notes, tape and questionable decisions. Chaos included.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const MARQUEE_ITEMS = [
  "TypeScript",
  "React",
  "Tailwind",
  "Node.js",
  "Sticky Notes",
  "PostgreSQL",
  "TanStack",
  "Excessive Animations",
  "Git",
  "Vibes",
];

const PROJECTS: {
  emoji: string;
  title: string;
  desc: string;
  tags: string[];
  color: NoteColor;
  rotation: number;
  popup: { emoji: string; text: string };
}[] = [
  {
    emoji: "🎯",
    title: "Project Serotonin",
    desc: "A habit tracker that celebrates way too hard. Streaks, confetti, and a mascot that guilt-trips you.",
    tags: ["React", "Framer Motion", "Local Storage"],
    color: "sky",
    rotation: -2,
    popup: { emoji: "🥳", text: "The confetti budget has been exceeded. Ask me for a live demo instead!" },
  },
  {
    emoji: "🧠",
    title: "BrainDump",
    desc: "A second brain that forgets absolutely nothing — unlike me. Search, tags, and late-night rants included.",
    tags: ["Next.js", "PostgreSQL", "Full-text Search"],
    color: "mint",
    rotation: 1.5,
    popup: { emoji: "🔐", text: "It remembered that you hovered on this project. Powerful? Creepy? Both." },
  },
  {
    emoji: "🎨",
    title: "Pixel Playground",
    desc: "CSS art experiments that got wildly out of hand. Zero images, 100% divs, questionable life choices.",
    tags: ["CSS", "SVG", "Too Much Time"],
    color: "lavender",
    rotation: -1,
    popup: { emoji: "🖼️", text: "60 frames per second of pure vibes. The divs go brrr." },
  },
  {
    emoji: "🤖",
    title: "Standup Bot",
    desc: "Kills the daily standup with kindness. Collects updates async, roasts blockers gently.",
    tags: ["Node.js", "Webhooks", "Workplace Peace"],
    color: "pink",
    rotation: 2,
    popup: { emoji: "🤖", text: "Beep boop. It finally said what everyone in the standup was thinking." },
  },
];

const SKILL_GROUPS: {
  title: string;
  color: NoteColor;
  rotation: number;
  skills: { name: string; pct: number }[];
}[] = [
  {
    title: "Frontend Sorcery",
    color: "sky",
    rotation: -1.5,
    skills: [
      { name: "React / TypeScript", pct: 95 },
      { name: "Tailwind CSS", pct: 92 },
      { name: "Making UIs weird (good weird)", pct: 100 },
    ],
  },
  {
    title: "Backend Things",
    color: "violet",
    rotation: 1,
    skills: [
      { name: "Node.js / APIs", pct: 85 },
      { name: "PostgreSQL", pct: 80 },
      { name: "Breaking prod (once, never again)", pct: 20 },
    ],
  },
  {
    title: "Soft Skills",
    color: "mint",
    rotation: -0.5,
    skills: [
      { name: "Explaining tech to humans", pct: 90 },
      { name: "Meetings → emails", pct: 88 },
      { name: "Naming things", pct: 40 },
    ],
  },
];

const TESTIMONIALS: { quote: string; author: string; color: NoteColor; rotation: number }[] = [
  {
    quote: "“He turned our boring dashboard into a place I voluntarily visit.”",
    author: "— an actual teammate",
    color: "ice",
    rotation: -2,
  },
  {
    quote: "“10/10, would merge his PRs again.”",
    author: "— senior dev, possibly bribed",
    color: "lavender",
    rotation: 1.5,
  },
  {
    quote: "“He put sticky notes everywhere. I love it here.”",
    author: "— HR, probably",
    color: "pink",
    rotation: -1,
  },
];

function SectionHeader({ title, kicker }: { title: string; kicker: string }) {
  return (
    <div className="mb-12 flex flex-col items-center gap-4 text-center">
      <StickyNote color="ice" rotation={-1.5} pin={false} tape="top" entrance pad="px-8 py-3">
        <p className="font-note text-sm tracking-widest text-ink/60 uppercase">{kicker}</p>
        <h2 className="font-marker text-3xl text-ink sm:text-4xl">{title}</h2>
      </StickyNote>
    </div>
  );
}

function Index() {
  return (
    <div className="cork-board relative min-h-screen overflow-hidden">
      <SurpriseLayer />

      {/* Floating desk clutter */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
        <EmojiSticker emoji="🚀" className="absolute top-[16%] left-[6%] text-5xl opacity-80" rotation={-10} />
        <EmojiSticker emoji="🧃" className="absolute top-[62%] left-[3%] text-4xl opacity-70" rotation={8} slow />
        <EmojiSticker emoji="📌" className="absolute top-[30%] right-[5%] text-4xl opacity-80" rotation={14} slow />
        <EmojiSticker emoji="✏️" className="absolute top-[78%] right-[8%] text-5xl opacity-70" rotation={-6} />
        <EmojiSticker emoji="💿" className="absolute top-[46%] left-[10%] text-3xl opacity-50" rotation={20} slow />
      </div>

      {/* ============ HERO ============ */}
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-5 py-24 lg:flex-row lg:gap-16">
        <div className="relative flex max-w-xl flex-col items-start gap-7">
          <StickyNote color="sky" rotation={-2} delay={0.05} tape="top" pad="px-5 py-2">
            <p className="font-note text-sm tracking-widest text-ink/70 uppercase">Available for hire ✦ will work for snacks</p>
          </StickyNote>

          <h1 className="font-marker text-5xl leading-[1.05] text-note-white drop-shadow-lg sm:text-6xl lg:text-7xl">
            HEY! I'M
            <span className="relative mx-2 inline-block text-note-sky">
              BHANU
              <DoodleScribble className="absolute -inset-x-3 -bottom-4 h-6 w-[calc(100%+1.5rem)] text-marker-pink" />
            </span>
            TEJA
          </h1>

          <StickyNote color="mint" rotation={1.5} delay={0.25} pad="p-5" className="max-w-md">
            <p className="font-note text-xl leading-snug text-ink">
              I build <span className="font-marker text-marker-pink">delightfully weird</span> things for the web — then
              blame the cache when they break.
            </p>
          </StickyNote>

          <div className="flex flex-wrap items-center gap-5">
            <DoNotPress />
            <StickyNote color="white" rotation={3} delay={0.45} pin pad="px-4 py-2">
              <p className="font-hand text-xl text-ink">scroll down, chaos below ↓</p>
            </StickyNote>
          </div>

          <DoodleArrow className="ml-10 h-14 w-24 rotate-12 text-note-sky" />
        </div>

        {/* Polaroid avatar */}
        <div className="relative">
          <StickyNote color="white" rotation={4} delay={0.3} tape="top" pad="p-3 pb-5" entrance>
            <img
              src="/avatar.png"
              alt="Cartoon portrait of Bhanu Teja"
              className="w-56 rounded-sm sm:w-72"
              width={288}
              height={288}
            />
            <p className="mt-3 text-center font-hand text-2xl text-ink">me, but cartoon ✨</p>
          </StickyNote>
          <StickerWow className="absolute -top-8 -left-10 w-24 animate-sway sm:w-28" />
          <DoodleStar className="absolute -right-10 -bottom-6 w-14 animate-wiggle text-note-white" />
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <section aria-label="Skills marquee" className="relative -rotate-1 border-y-4 border-ink/80 bg-note-ice py-3">
        <div className="flex w-max animate-marquee gap-8">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-8" aria-hidden={copy === 1}>
              {MARQUEE_ITEMS.map((item) => (
                <span key={item} className="flex items-center gap-8 font-marker text-xl whitespace-nowrap text-ink">
                  {item} <span className="text-marker-pink">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="relative mx-auto max-w-6xl px-5 py-24">
        <SectionHeader kicker="File under: humans" title="ABOUT ME" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <StickyNote color="lavender" rotation={-2} delay={0.05} tape="left" pad="p-6">
            <h3 className="font-marker text-2xl text-ink">The short version</h3>
            <p className="mt-3 font-note text-lg leading-relaxed text-ink/90">
              Developer who believes interfaces should feel like playgrounds, not paperwork. If a hover state doesn't
              spark joy, I redesign it at 2am.
            </p>
          </StickyNote>

          <StickyNote color="mint" rotation={1.5} delay={0.15} pin pad="p-6" fold>
            <h3 className="font-marker text-2xl text-ink">Fun facts</h3>
            <ul className="mt-3 space-y-2 font-note text-lg text-ink/90">
              <li>☕ Debugs best with chai, not coffee (fight me)</li>
              <li>🌙 Most creative after everyone logs off</li>
              <li>🧦 Owns more sticky notes than socks</li>
              <li>🏆 Once won a hackathon with a button that did nothing</li>
            </ul>
          </StickyNote>

          <StickyNote color="violet" rotation={-1} delay={0.25} tape="right" pad="p-6" className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-marker text-2xl text-ink">Currently</h3>
            <p className="mt-3 font-note text-lg leading-relaxed text-ink/90">
              Building things people actually enjoy clicking, learning one framework per month (per week if
              caffeinated), and rewriting my portfolio instead of sleeping. You're looking at result #47.
            </p>
          </StickyNote>
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section className="relative mx-auto max-w-6xl px-5 py-24">
        <SectionHeader kicker="Proof of chaos" title="PROJECTS" />

        <div className="grid gap-9 sm:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <StickyNote key={p.title} color={p.color} rotation={p.rotation} delay={i * 0.08} pad="p-6" fold={i % 2 === 1}>
              <div className="flex items-start justify-between gap-3">
                <span className="text-4xl" aria-hidden>
                  {p.emoji}
                </span>
                <span aria-hidden className="font-marker text-4xl text-ink/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-2 font-marker text-2xl text-ink">{p.title}</h3>
              <p className="mt-2 font-note text-lg leading-snug text-ink/90">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-ink/10 px-3 py-1 font-note text-sm text-ink">
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => surprise.popup(p.popup)}
                className="mt-5 cursor-pointer rounded-sm bg-ink px-4 py-2 font-marker text-sm text-note-white shadow transition hover:scale-105 hover:bg-marker-pink"
              >
                open project →
              </button>
            </StickyNote>
          ))}
        </div>

        <p className="mt-10 text-center font-hand text-2xl text-note-white/80">
          (the buttons don't open the projects — the projects open you)
        </p>
      </section>

      {/* ============ SKILLS ============ */}
      <section className="relative mx-auto max-w-6xl px-5 py-24">
        <SectionHeader kicker="Bars of questionable accuracy" title="SKILL METER" />

        <div className="grid gap-9 md:grid-cols-3">
          {SKILL_GROUPS.map((g, gi) => (
            <StickyNote key={g.title} color={g.color} rotation={g.rotation} delay={gi * 0.1} pin={gi === 1} pad="p-6">
              <h3 className="font-marker text-xl text-ink">{g.title}</h3>
              <div className="mt-5 space-y-4">
                {g.skills.map((s, si) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between font-note text-base text-ink/90">
                      <span>{s.name}</span>
                      <span className="font-marker text-sm">{s.pct}%</span>
                    </div>
                    <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-ink/10">
                      <div
                        className="h-full animate-grow rounded-full bg-ink"
                        style={{ width: `${s.pct}%`, animationDelay: `${gi * 0.2 + si * 0.15}s` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </StickyNote>
          ))}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative mx-auto max-w-6xl px-5 py-24">
        <SectionHeader kicker="Word on the desk" title="TESTIMONIALS*" />

        <div className="grid gap-9 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <StickyNote key={t.author} color={t.color} rotation={t.rotation} delay={i * 0.1} tape={i === 1 ? "top" : false} pad="p-6">
              <p className="font-note text-xl leading-snug text-ink">{t.quote}</p>
              <p className="mt-4 font-hand text-2xl text-ink/70">{t.author}</p>
            </StickyNote>
          ))}
        </div>

        <p className="mt-8 text-center font-note text-sm text-note-white/60">*compiled from memory. memory may be biased.</p>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="relative mx-auto max-w-3xl px-5 py-24">
        <SectionHeader kicker="Slide into my inbox" title="LET'S BUILD SOMETHING" />

        <StickyNote color="pink" rotation={-1.5} tape="top" pad="p-8" className="text-center">
          <p className="font-note text-xl leading-relaxed text-ink">
            Got a project, a role, or an unhinged idea? Perfect — those are my favorite. Drop a line and I'll reply
            faster than my builds compile.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@bhanuteja.dev"
              className="rounded-sm bg-ink px-6 py-3 font-marker text-lg text-note-white shadow-(--shadow-note) transition hover:-rotate-2 hover:scale-105 hover:bg-marker-pink"
            >
              📮 email me
            </a>
            <button
              onClick={() => {
                navigator.clipboard?.writeText("hello@bhanuteja.dev").catch(() => {});
                surprise.popup({ emoji: "📋", text: "Copied! Now actually send the email. I believe in you." });
              }}
              className="cursor-pointer rounded-sm bg-note-white px-6 py-3 font-marker text-lg text-ink shadow-(--shadow-note) transition hover:rotate-2 hover:scale-105"
            >
              copy email
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {(
              [
                ["LinkedIn", "🔗 My profile photo hasn't changed since 2019. Consistency!"],
                ["GitHub", "🐙 Contribution graph goes brrr, mostly at midnight."],
                ["Twitter", "🐦 Tech takes, build logs and an unhealthy meme ratio."],
              ] as const
            ).map(([label, msg]) => (
              <button
                key={label}
                onClick={() => surprise.popup({ emoji: label === "GitHub" ? "🐙" : label === "LinkedIn" ? "🔗" : "🐦", text: msg })}
                className="cursor-pointer rounded-sm border-2 border-ink/60 px-4 py-2 font-note text-base text-ink transition hover:bg-ink/10"
              >
                {label}
              </button>
            ))}
          </div>
        </StickyNote>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative border-t-4 border-ink/80 bg-note-white/95 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 text-center">
          <DoodleStar className="w-10 text-marker-pink" />
          <p className="font-marker text-lg text-ink">Made with sticky notes, tape & questionable life choices.</p>
          <p className="font-note text-sm text-ink/60">© 2026 Bhanu Teja — no notes were harmed in the making of this site.</p>
          <Tape className="!top-auto -bottom-3 h-5 w-16" />
        </div>
      </footer>
    </div>
  );
}
