"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Browsers block autoplay — we must wait for user interaction
    const playAudio = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          // Remove all listeners once audio starts
          document.removeEventListener("click", playAudio);
          document.removeEventListener("touchstart", playAudio);
          window.removeEventListener("scroll", playAudio);
        })
        .catch(() => {
          // ignore
        });
    };

    document.addEventListener("click", playAudio);
    document.addEventListener("touchstart", playAudio);
    window.addEventListener("scroll", playAudio);

    return () => {
      document.removeEventListener("click", playAudio);
      document.removeEventListener("touchstart", playAudio);
      window.removeEventListener("scroll", playAudio);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/wedding-nasheed.mp3" loop preload="auto" />
      <button
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-[100] w-12 h-12 bg-[#08111D]/80 backdrop-blur-md rounded-full flex items-center justify-center border border-[#A88B5C]/40 shadow-lg text-[#F8F5EE] hover:scale-110 hover:bg-[#A88B5C]/20 transition-all duration-300"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </>
  );
}
