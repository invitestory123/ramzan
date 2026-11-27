import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    // Attempt auto-play on first user interaction anywhere on the page
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked by browser policy until button click
          });
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    window.addEventListener("scroll", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-5 z-40 flex items-center gap-1.5">
      <motion.button
        type="button"
        onClick={togglePlay}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.04 }}
        aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
        className="group relative flex items-center gap-2.5 rounded-full border border-gold/50 bg-emerald-deep/90 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all hover:border-gold hover:shadow-[0_0_25px_rgba(230,195,110,0.4)]"
      >
        <span className="relative flex h-3.5 w-3.5 items-center justify-center">
          {isPlaying ? (
            <span className="flex items-end gap-[2px] h-3.5">
              <span
                className="w-[3px] bg-gold rounded-full animate-[pulse_0.8s_ease-in-out_infinite]"
                style={{ height: "70%" }}
              />
              <span
                className="w-[3px] bg-gold rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s]"
                style={{ height: "100%" }}
              />
              <span
                className="w-[3px] bg-gold rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s]"
                style={{ height: "50%" }}
              />
            </span>
          ) : (
            <Music className="h-3.5 w-3.5 text-gold/80 group-hover:text-gold" />
          )}
        </span>

        <span className="font-royal text-[0.68rem] font-semibold tracking-widest text-cream uppercase">
          {isPlaying ? "Music On" : "Play Music"}
        </span>
      </motion.button>

      <AnimatePresence>
        {isPlaying && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            type="button"
            onClick={toggleMute}
            whileTap={{ scale: 0.92 }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-emerald-deep/90 text-gold shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:border-gold hover:text-gold-soft"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AudioPlayer;
