import { useEffect, useRef } from "react";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    // Immediately attempt playback on open
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Autoplay policy prevented immediate play, will resume on first touch/interaction
        });
      }
    };

    playAudio();

    // In case browser requires a user gesture, start on first tap/click/scroll
    const handleGesture = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("scroll", handleGesture);
      window.removeEventListener("pointerdown", handleGesture);
    };

    window.addEventListener("click", handleGesture, { once: true });
    window.addEventListener("touchstart", handleGesture, { once: true });
    window.addEventListener("scroll", handleGesture, { once: true });
    window.addEventListener("pointerdown", handleGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("scroll", handleGesture);
      window.removeEventListener("pointerdown", handleGesture);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Play button removed as requested
  return null;
}

export default AudioPlayer;
