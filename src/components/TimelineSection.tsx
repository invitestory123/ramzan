import { motion } from "motion/react";
import { Sparkles, ScrollText, UtensilsCrossed, Moon, HeartHandshake, Calendar } from "lucide-react";
import { useState } from "react";

interface TimelineEvent {
  time: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Sparkles;
}

interface DayProgram {
  dayLabel: string;
  date: string;
  venue: string;
  events: TimelineEvent[];
}

const CELEBRATIONS: DayProgram[] = [
  {
    dayLabel: "Nikah Ceremony",
    date: "Thursday, 24 December 2026",
    venue: "The Grand FM Banquet Hall · Jogeshwari West",
    events: [
      {
        time: "After Isha (08:00 PM)",
        title: "Baraat & Grand Welcome",
        subtitle: "Istiqbal",
        description:
          "Welcoming the groom's procession with fragrant rose water, traditional greetings, and warm hospitality.",
        icon: Sparkles,
      },
      {
        time: "08:45 PM",
        title: "The Sacred Nikah Ceremony",
        subtitle: "Ijab-e-Qubool",
        description:
          "Solemnisation of marriage according to the blessed Sunnah, recitation of Quranic verses, and sacred vows.",
        icon: ScrollText,
      },
      {
        time: "09:30 PM",
        title: "Royal Nikah Feast",
        subtitle: "Dastarkhwan",
        description:
          "A sumptuous celebratory banquet served in honor of the newlyweds, shared with family and revered guests.",
        icon: UtensilsCrossed,
      },
      {
        time: "11:00 PM",
        title: "Rukhsati & Blessings",
        subtitle: "Duas & Farewell",
        description:
          "Heartfelt prayers and emotional blessings as the bride embarks on her new journey with love and grace.",
        icon: Moon,
      },
    ],
  },
  {
    dayLabel: "Walima Banquet",
    date: "Friday, 25 December 2026",
    venue: "Kohinoor Marriage Lawn · Jogeshwari West",
    events: [
      {
        time: "After Isha (08:00 PM)",
        title: "Walima Reception",
        subtitle: "Khush Aamdeed",
        description:
          "An auspicious evening welcoming dear relatives, respected elders, and cherished friends to celebrate the union.",
        icon: HeartHandshake,
      },
      {
        time: "08:45 PM",
        title: "Felicitations & Photo Sessions",
        subtitle: "Mubarakbaad",
        description:
          "Shower your warmest congratulations and heartfelt duas upon the newlyweds on stage.",
        icon: Sparkles,
      },
      {
        time: "09:15 PM",
        title: "Grand Walima Dastarkhwan",
        subtitle: "Dinner Feast",
        description:
          "An exquisite dinner feast prepared with authentic culinary delights to commemorate this joyous Sunnah.",
        icon: UtensilsCrossed,
      },
      {
        time: "11:30 PM",
        title: "Closing Duas & Best Wishes",
        subtitle: "Duas for Barkat",
        description:
          "Concluding two unforgettable nights with prayers for mutual love, endless happiness, and lifelong barakah.",
        icon: Moon,
      },
    ],
  },
];

export function TimelineSection() {
  const [activeDay, setActiveDay] = useState<number>(0);

  return (
    <section id="itinerary" className="relative mx-auto max-w-lg px-6 py-20">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gold/5 blur-[90px]" />

      <div className="relative text-center">
        <p className="font-royal text-[0.68rem] uppercase tracking-[0.45em] text-gold font-medium">
          Order of Celebrations
        </p>
        <h2 className="mt-2 font-royal text-3xl sm:text-4xl uppercase tracking-wider text-gradient-gold">
          Wedding Itinerary
        </h2>
        <div className="gold-rule mx-auto mt-4 w-32" />
        <p className="mx-auto mt-3 max-w-xs text-xs text-cream/70">
          We request your gracious presence and heartfelt prayers as each chapter of our celebration unfolds.
        </p>
      </div>

      {/* Day Tabs */}
      <div className="mt-8 flex justify-center gap-3">
        {CELEBRATIONS.map((day, idx) => {
          const isActive = activeDay === idx;
          return (
            <button
              key={day.dayLabel}
              type="button"
              onClick={() => setActiveDay(idx)}
              className={`group flex items-center gap-2 rounded-full px-5 py-2.5 font-royal text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-gold via-gold-soft to-gold text-ink shadow-[0_0_20px_rgba(229,193,120,0.4)]"
                  : "border border-gold/40 bg-emerald-rich/60 text-cream/80 hover:border-gold hover:text-gold-bright"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>{day.dayLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Active Day Header Banner */}
      <motion.div
        key={`header-${activeDay}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 rounded-2xl border border-gold/30 bg-emerald-rich/40 p-4 text-center backdrop-blur-md"
      >
        <p className="font-royal text-lg sm:text-xl font-bold uppercase tracking-wide text-gold-bright">
          {CELEBRATIONS[activeDay].date}
        </p>
        <p className="mt-1 text-xs text-cream/70 font-display">
          {CELEBRATIONS[activeDay].venue}
        </p>
      </motion.div>

      {/* Itinerary Milestones */}
      <motion.div
        key={`events-${activeDay}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mt-10 pl-4 sm:pl-8"
      >
        {/* Continuous vertical glowing gold line */}
        <div className="absolute left-[27px] sm:left-[43px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-gold via-gold/50 to-gold/10" />

        <div className="space-y-8">
          {CELEBRATIONS[activeDay].events.map((event, idx) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-start gap-4 sm:gap-6 group"
              >
                {/* Milestone Node */}
                <div className="relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-gold bg-emerald-deep shadow-[0_0_15px_rgba(230,195,110,0.35)] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
                </div>

                {/* Event Card */}
                <div className="glass-tile-interactive flex-1 p-5 sm:p-6 border border-gold/35">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="gold-badge px-3 py-0.5 text-[0.68rem] font-semibold tracking-wider uppercase text-gold-bright">
                      {event.time}
                    </span>
                    <span className="font-script text-lg text-rose sm:text-xl font-medium">
                      {event.subtitle}
                    </span>
                  </div>

                  <h3 className="mt-2 font-royal text-xl sm:text-2xl font-bold uppercase tracking-wide text-cream group-hover:text-gold-soft transition-colors">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-cream/75">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

export default TimelineSection;
