import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import {
  CalendarPlus,
  Clock,
  MapPin,
  Navigation,
  Heart,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

import { Aurora } from "@/components/Aurora";
import { Countdown } from "@/components/Countdown";
import { ParticlesCanvas } from "@/components/ParticlesCanvas";
import { AudioPlayer } from "@/components/AudioPlayer";
import { TimelineSection } from "@/components/TimelineSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adnan & Maheen — Wedding Invitation | 24 & 25 Dec 2026" },
      {
        name: "description",
        content:
          "In loving memory of Late Mohammed Ramzan Haji Noor Mohammed Khokar & Hajjan Kherunissa. You are cordially invited to celebrate the Nikah and Walima of Adnan Khokar and Maheen Tanwar on 24th & 25th December 2026 in Jogeshwari West, Mumbai.",
      },
      { property: "og:title", content: "Adnan & Maheen — Wedding Invitation | 24 & 25 Dec 2026" },
      {
        property: "og:description",
        content:
          "In loving memory of Late Mohammed Ramzan Haji Noor Mohammed Khokar & Hajjan Kherunissa. Nikah on 24 Dec at The Grand FM Banquet Hall & Walima on 25 Dec at Kohinoor Marriage Lawn, Jogeshwari West, Mumbai.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:image:secure_url", content: "/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Adnan & Maheen Wedding Invitation" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Adnan & Maheen — Wedding Invitation | 24 & 25 Dec 2026" },
      {
        name: "twitter:description",
        content:
          "In loving memory of Late Mohammed Ramzan Haji Noor Mohammed Khokar & Hajjan Kherunissa. Nikah: 24th Dec · Walima: 25th Dec, Jogeshwari West, Mumbai.",
      },
      { name: "twitter:image", content: "/og-image.png" },
    ],
  }),
  component: Invitation,
});

const NIKAH_DATE = new Date("2026-12-24T20:30:00+05:30");
const WALIMA_DATE = new Date("2026-12-25T20:30:00+05:30");

const NIKAH_VENUE = {
  title: "Nikah Ceremony",
  dateFormatted: "Thursday, 24 December 2026",
  timing: "After Eshah Namaz",
  name: "The Grand FM Banquet Hall",
  address: "The Grand FM Banquet Hall, Jogeshwari West, Mumbai, Maharashtra",
  mapsUrl: "https://share.google/uWeduatuvT8MF0Mt3",
  note: "Valet parking and convenient entrance available at Jogeshwari West.",
};

const WALIMA_VENUE = {
  title: "Walima Reception",
  dateFormatted: "Friday, 25 December 2026",
  timing: "After Isha Prayer (08:30 PM onwards)",
  name: "Kohinoor Marriage Lawn",
  address: "Kohinoor Marriage Lawn, Jogeshwari West, Mumbai, Maharashtra",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kohinoor+Marriage+Lawn+Jogeshwari+West+Mumbai",
  note: "Spacious open lawn setting with guest amenities in Jogeshwari West.",
};

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function generateIcs(event: "nikah" | "walima") {
  const isNikah = event === "nikah";
  const start = isNikah ? NIKAH_DATE : WALIMA_DATE;
  const end = new Date(start.getTime() + 4 * 3600000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const title = isNikah
    ? "Nikah Ceremony: Adnan & Maheen"
    : "Walima Reception: Adnan & Maheen";
  const venue = isNikah ? NIKAH_VENUE.address : WALIMA_VENUE.address;
  const desc = isNikah
    ? "With joyous hearts, Khokar & Tanwar families invite you to the Nikah Ceremony of Adnan & Maheen at The Grand FM Banquet Hall, Jogeshwari West, Mumbai (After Eshah Namaz)."
    : "Khokar & Tanwar families cordially invite you to the Walima Banquet of Adnan & Maheen at Kohinoor Marriage Lawn, Jogeshwari West, Mumbai.";

  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `LOCATION:${venue}`,
    `DESCRIPTION:${desc}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24"
    >
      {/* Background Image with Deep Velvet Emerald Veil */}
      <img
        src="https://media.invitestory.in/emerald-nikah/images/hero-bg.jpg"
        alt=""
        aria-hidden
        width={1024}
        height={1536}
        className="absolute inset-0 h-full w-full object-cover scale-105"
      />
      <Aurora className="mix-blend-screen opacity-85" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />

      {/* Floating Velvet Roses & Floral Accents */}
      <img
        src="https://media.invitestory.in/emerald-nikah/images/roses.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="float-slow pointer-events-none absolute -left-12 -top-6 w-52 opacity-95 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] sm:w-72"
      />
      <img
        src="https://media.invitestory.in/emerald-nikah/images/daisies.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="float-slow pointer-events-none absolute -bottom-8 -right-10 w-44 opacity-90 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] sm:w-60"
      />

      <motion.div style={{ y, opacity: fade }} className="relative z-10 w-full max-w-lg">
        {/* Royal Bismillah Arch Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Ornate Gold Arch Crest SVG */}
          <div className="mx-auto flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <svg
              className="h-6 w-6 text-gold drop-shadow-[0_0_8px_rgba(229,193,120,0.6)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M12 2L14.5 8.5L21 9.5L16 14L17.5 20.5L12 17L6.5 20.5L8 14L3 9.5L9.5 8.5L12 2Z"
                fill="currentColor"
                fillOpacity="0.3"
              />
            </svg>
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <p className="mt-3 font-arabic text-2xl sm:text-4xl leading-loose text-gold-bright drop-shadow-[0_2px_15px_rgba(247,230,184,0.5)]">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </p>
          <p className="font-arabic text-lg sm:text-2xl leading-relaxed text-gold mt-0.5 drop-shadow-md">
            بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="mx-auto mt-2 max-w-xs text-[0.68rem] font-light leading-relaxed tracking-wider text-cream/80">
            “May Allah bless you both, shower His blessings upon you, and unite you together in goodness.”
          </p>
        </motion.div>

        {/* In Loving Memory Tribute Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-md rounded-2xl border border-gold/40 bg-gradient-to-b from-[#0a2e22]/90 to-[#072219]/95 px-5 py-3.5 text-center shadow-[0_15px_40px_rgba(0,0,0,0.7)] backdrop-blur-md"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-gold-soft" />
            <p className="text-[0.62rem] sm:text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-gold-bright">
              In Loving Memory Of
            </p>
            <Sparkles className="h-3.5 w-3.5 text-gold-soft" />
          </div>
          <p className="mt-1 font-display text-sm sm:text-base font-bold italic text-cream">
            Late Mohammed Ramzan Haji Noor Mohammed Khokar
          </p>
          <p className="font-display text-xs sm:text-sm font-medium text-gold-soft">
            &amp; Hajjan Kherunissa
          </p>
          <div className="mx-auto my-1.5 h-[1px] w-20 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-cream/70 font-medium">
            Khokar Family
          </p>
        </motion.div>

        {/* Imperial Royal Invitation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-7 group"
        >
          {/* Card Outer Glow & Background */}
          <div className="relative rounded-[2rem] border-2 border-gold/60 bg-[#faf5eb] p-6 sm:p-10 text-center shadow-[0_35px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(229,193,120,0.25)] overflow-hidden">
            {/* Inner Double Hairline Gold Frame */}
            <div className="pointer-events-none absolute inset-2.5 sm:inset-3.5 rounded-[1.4rem] border border-[#c49a45]/50" />
            <div className="pointer-events-none absolute inset-3.5 sm:inset-4.5 rounded-[1.2rem] border border-dashed border-[#c49a45]/30" />

            {/* Corner Ornamental Rosettes */}
            <div className="pointer-events-none absolute top-4 left-4 text-[#c49a45]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
              </svg>
            </div>
            <div className="pointer-events-none absolute top-4 right-4 text-[#c49a45]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
              </svg>
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 text-[#c49a45]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
              </svg>
            </div>
            <div className="pointer-events-none absolute bottom-4 right-4 text-[#c49a45]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
              </svg>
            </div>

            {/* Content Inside Imperial Card */}
            <div className="relative z-10 py-2">
              <p className="font-display text-[0.68rem] uppercase tracking-[0.45em] font-semibold text-[#8c6721]">
                Together with their families
              </p>

              {/* Groom - With Royal Font */}
              <div className="mt-4 sm:mt-6">
                <h1 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide uppercase leading-[1.05] text-[#1a382d] drop-shadow-sm">
                  Adnan
                  <br />
                  <span className="font-royal text-2xl sm:text-3xl md:text-4xl font-semibold tracking-normal text-[#234b3d]">
                    Khokar
                  </span>
                </h1>
                <p className="mt-1.5 font-script text-xl sm:text-2xl text-[#8a2435]">
                  Son of Mrs. Aziza &amp; Mr. Abdul Aziz Ramzan Khokar (Fogo)
                </p>
              </div>

              {/* Royal Medallion Divider */}
              <div className="my-5 sm:my-6 flex items-center justify-center">
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#b88c3a] to-transparent" />
                <div className="mx-3 grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-[#b88c3a] bg-gradient-to-b from-[#faf5eb] to-[#eedcba] shadow-md">
                  <span className="font-script text-xl sm:text-2xl text-[#1a382d] font-bold">&amp;</span>
                </div>
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#b88c3a] to-transparent" />
              </div>

              {/* Bride - With Royal Font */}
              <div>
                <h2 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide uppercase leading-[1.05] text-[#1a382d] drop-shadow-sm">
                  Maheen
                  <br />
                  <span className="font-royal text-2xl sm:text-3xl md:text-4xl font-semibold tracking-normal text-[#234b3d]">
                    Tanwar
                  </span>
                </h2>
                <p className="mt-1.5 font-script text-xl sm:text-2xl text-[#8a2435]">
                  Daughter of Mrs. Sajida &amp; Mr. Iftekhar Naeem Maqbool Tanwar
                </p>
              </div>

              {/* Formal Invitation Text */}
              <div className="mt-6 pt-5 border-t border-[#c49a45]/30">
                <p className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-[#1a382d]/90">
                  Cordially invite you to celebrate their
                </p>
                <p className="mt-1 font-display text-lg sm:text-xl font-bold italic text-[#8c6721]">
                  Nikah Ceremony &amp; Walima Banquet
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Date Stamp Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-7 flex flex-col items-center justify-center text-center"
        >
          <div className="gold-badge px-6 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md border border-gold/60">
            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] font-semibold text-gold-bright">
              24th &amp; 25th December 2026
            </p>
          </div>
          <p className="mt-2.5 text-[0.68rem] uppercase tracking-[0.3em] font-medium text-cream/70">
            Jogeshwari West · Mumbai
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function QuranicVerse() {
  return (
    <section className="relative mx-auto max-w-lg px-6 py-12 text-center">
      <Reveal>
        <div className="glass-tile p-7 sm:p-9 relative overflow-hidden border border-gold/40">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10" />
          <Sparkles className="mx-auto h-5 w-5 text-gold mb-3" />
          <p className="font-arabic text-xl sm:text-3xl leading-loose text-gold-bright drop-shadow-[0_2px_12px_rgba(247,230,184,0.4)]">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <div className="gold-rule mx-auto my-5 w-28" />
          <p className="font-display text-sm sm:text-base italic leading-relaxed text-cream/90">
            “And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.”
          </p>
          <p className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] font-semibold text-gold">
            Surah Ar-Rum · 30:21
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Couple() {
  const people = [
    {
      img: "https://media.invitestory.in/emerald-nikah/images/groom.jpg",
      name: "Adnan Khokar",
      role: "The Groom",
      note: "Son of Mrs. Aziza & Mr. Abdul Aziz Ramzan Khokar (Fogo). Embarking on this sacred milestone with deep love, honor, and faith.",
    },
    {
      img: "https://media.invitestory.in/emerald-nikah/images/bride.jpg",
      name: "Maheen Tanwar",
      role: "The Bride",
      note: "Daughter of Mrs. Sajida & Mr. Iftekhar Naeem Maqbool Tanwar. Radiant with grace, gentleness, and prayers for their joyous future.",
    },
  ];

  return (
    <section className="relative mx-auto max-w-lg px-6 py-16">
      <Reveal>
        <p className="text-center text-[0.65rem] uppercase tracking-[0.45em] text-gold font-medium">
          Two Souls, One Sacred Journey
        </p>
        <h2 className="mt-2 text-center font-display text-4xl italic text-gradient-gold sm:text-5xl">
          The Bride &amp; Groom
        </h2>
        <div className="gold-rule mx-auto mt-4 w-32" />
      </Reveal>

      <div className="mt-14 space-y-16">
        {people.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.15}>
            <div className="flex flex-col items-center text-center">
              {/* Royal Mehrab Arch Frame */}
              <div className="relative group">
                <div className="absolute -inset-5 rounded-full bg-gold/20 blur-2xl transition-all duration-500 group-hover:bg-gold/30" />
                <div className="relative overflow-hidden rounded-[48%_52%_50%_50%/50%_48%_52%_50%] border-2 border-gold p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(229,193,120,0.3)] transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={p.img}
                    alt={`${p.role}, ${p.name}`}
                    loading="lazy"
                    width={896}
                    height={1152}
                    className="h-60 w-60 sm:h-64 sm:w-64 rounded-[46%_54%_50%_50%/50%_46%_54%_50%] object-cover"
                  />
                </div>
              </div>

              <div className="gold-badge mt-6 px-5 py-1 shadow-md">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-gold-bright font-semibold">
                  {p.role}
                </p>
              </div>

              <h3 className="mt-3 font-display text-3xl sm:text-4xl italic font-semibold text-cream">
                {p.name}
              </h3>
              <p className="mt-3 max-w-sm text-xs sm:text-sm leading-relaxed text-cream/75">
                {p.note}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CountdownSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20">
      <img
        src="https://media.invitestory.in/emerald-nikah/images/mandala.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-15 spin-very-slow"
      />
      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <p className="text-[0.65rem] uppercase tracking-[0.45em] text-gold font-medium">
            Counting Every Sacred Moment
          </p>
          <h2 className="mt-2 font-display text-4xl italic text-gradient-gold sm:text-5xl">
            Until We Say Qubool
          </h2>
          <div className="gold-rule mx-auto mt-4 w-32" />
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <Countdown target={NIKAH_DATE.getTime()} />
        </Reveal>
      </div>
    </section>
  );
}

function VenueCard({
  eventKey,
  venue,
}: {
  eventKey: "nikah" | "walima";
  venue: typeof NIKAH_VENUE;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(venue.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="glass-tile p-7 sm:p-9 text-center relative overflow-hidden border border-gold/40">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold/10 via-transparent to-transparent" />

      <span className="gold-badge px-4 py-1 text-[0.65rem] uppercase tracking-[0.35em] font-semibold text-gold-bright">
        {venue.title}
      </span>

      <p className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-cream">
        {venue.dateFormatted}
      </p>

      <p className="mt-2 flex items-center justify-center gap-2 text-sm text-gold-soft">
        <Clock className="h-4 w-4 shrink-0 text-gold" />
        <span>{venue.timing}</span>
      </p>

      <div className="gold-rule my-5" />

      <div className="space-y-1.5">
        <p className="font-display text-2xl sm:text-3xl font-semibold text-cream">
          {venue.name}
        </p>
        <p className="flex items-start justify-center gap-2 text-xs sm:text-sm leading-relaxed text-cream/80 max-w-xs mx-auto">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <span>{venue.address}</span>
        </p>
        <p className="mt-1 text-[0.72rem] text-cream/60 italic">{venue.note}</p>
      </div>

      <div className="mt-7 flex flex-col sm:flex-row gap-3">
        <motion.a
          href={venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
          whileTap={{ scale: 0.96 }}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-[#1a382d] shadow-[var(--shadow-lux)] transition-transform hover:scale-102"
          style={{ background: "var(--gradient-gold)" }}
        >
          <Navigation className="h-4 w-4" />
          Open in Maps
        </motion.a>

        <motion.a
          href={generateIcs(eventKey)}
          download={`adnan-maheen-${eventKey}.ics`}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-gold/15 px-4 py-3.5 text-xs sm:text-sm font-medium tracking-wide text-gold-bright hover:bg-gold/25 transition-all"
        >
          <CalendarPlus className="h-4 w-4" />
          Calendar
        </motion.a>

        <motion.button
          type="button"
          onClick={handleCopy}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-emerald-rich/60 px-4 py-3.5 text-xs sm:text-sm font-medium tracking-wide text-cream/90 hover:bg-gold/20 transition-all"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

function Details() {
  return (
    <section id="venue" className="relative mx-auto max-w-lg px-6 py-16">
      <Reveal>
        <p className="text-center text-[0.65rem] uppercase tracking-[0.45em] text-gold font-medium">
          Where &amp; When
        </p>
        <h2 className="mt-2 text-center font-display text-4xl italic text-gradient-gold sm:text-5xl">
          Venues &amp; Dates
        </h2>
        <div className="gold-rule mx-auto mt-4 w-32" />
        <p className="mt-3 text-center text-xs text-cream/70">
          Both celebrations are graciously hosted in Jogeshwari West, Mumbai.
        </p>
      </Reveal>

      {/* Nikah Card */}
      <Reveal delay={0.1} className="mt-10">
        <VenueCard eventKey="nikah" venue={NIKAH_VENUE} />
      </Reveal>

      {/* Walima Card */}
      <Reveal delay={0.2} className="mt-8">
        <VenueCard eventKey="walima" venue={WALIMA_VENUE} />
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pb-20 pt-20">
      <Aurora className="opacity-75" />
      <img
        src="https://media.invitestory.in/emerald-nikah/images/mandala.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -bottom-24 left-1/2 w-[160%] -translate-x-1/2 opacity-[0.14] spin-very-slow"
      />
      <img
        src="https://media.invitestory.in/emerald-nikah/images/roses.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="float-slow pointer-events-none absolute -right-14 top-4 w-40 opacity-80"
      />
      <div className="relative mx-auto max-w-md text-center">
        <img
          src="https://media.invitestory.in/emerald-nikah/images/divider.png"
          alt=""
          aria-hidden
          loading="lazy"
          width={1024}
          height={512}
          className="mx-auto w-48 opacity-80"
        />
        <Reveal className="mt-6">
          <p className="font-display text-2xl sm:text-3xl italic leading-relaxed text-cream/90">
            “May He unite your hearts in goodness, strengthen you with patience, and grant you harmony, prosperity, and everlasting happiness.”
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 font-script text-4xl text-gradient-gold">Adnan &amp; Maheen</p>
          <p className="mt-2 text-[0.62rem] uppercase tracking-[0.4em] text-cream/60">
            We await your precious duas &amp; presence
          </p>
        </Reveal>

        <div className="gold-rule mx-auto mt-10 w-24" />

        <p className="mt-6 inline-flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.3em] text-cream/50">
          In loving memory of Late Mohammed Ramzan Haji Noor Mohammed Khokar &amp; Hajjan Kherunissa
        </p>

        <p className="mt-2 text-[0.62rem] uppercase tracking-[0.25em] text-gold-soft/80">
          With best compliments from Khokar &amp; Tanwar Families
        </p>

        <div>
          <a
            href="https://www.instagram.com/invitestory.in/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-[0.62rem] uppercase tracking-[0.35em] text-gold-soft/80 transition-colors hover:text-gold"
          >
            Follow @invitestory.in on Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

function Invitation() {
  return (
    <main className="min-h-screen bg-emerald-deep relative selection:bg-gold selection:text-ink">
      <ParticlesCanvas />
      <AudioPlayer />

      <Hero />
      <QuranicVerse />
      <Couple />
      <CountdownSection />
      <TimelineSection />
      <Details />
      <Footer />
    </main>
  );
}
