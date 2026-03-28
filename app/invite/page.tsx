"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { AudioPlayer } from "@/components/ui/audio-player";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  MapPin,
  Navigation,
  Moon,
  Heart,
  Sparkles,
  Calendar,
  Clock,
  Star,
  Flower2,
} from "lucide-react";

// Utility function for seeded random (to avoid hydration mismatch)
function createSeededRandom(seed: number) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

/* ============================================================
   ENHANCED FLOATING ELEMENTS SYSTEM
   ============================================================ */
function FloatingElements() {
  const [elements, setElements] = useState<
    Array<{
      id: number;
      type: "sparkle" | "flower" | "star" | "orb" | "petal";
      x: number;
      y: number;
      size: number;
      duration: number;
      delay: number;
      pathOffset: number;
      rotation: number;
      opacity: number;
      color: string;
    }>
  >([]);

  useEffect(() => {
    const rng = createSeededRandom(12345);
    const colors = [
      "rgba(248, 245, 238, ",
      "rgba(179, 156, 125, ",
      "rgba(251, 191, 36, ",
      "rgba(255, 255, 255, ",
    ];

    const newElements = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      type: ["sparkle", "flower", "star", "orb", "petal"][
        Math.floor(rng() * 5)
      ] as "sparkle" | "flower" | "star" | "orb" | "petal",
      x: rng() * 100,
      y: rng() * 100,
      size: rng() * 4 + 1,
      duration: rng() * 15 + 10,
      delay: rng() * 15,
      pathOffset: rng() * 100 - 50,
      rotation: rng() * 360,
      opacity: rng() * 0.5 + 0.2,
      color: colors[Math.floor(rng() * colors.length)],
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
          }}
          animate={{
            y: [0, -150 - el.pathOffset, 0],
            x: [
              0,
              Math.sin(el.id * 0.5) * (30 + el.pathOffset * 0.5),
              Math.cos(el.id * 0.3) * (20 + el.pathOffset * 0.3),
              0,
            ],
            rotate: [0, el.rotation, -el.rotation * 0.5, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0, el.opacity, el.opacity * 0.5, 0],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {el.type === "sparkle" && (
            <div
              className="rounded-full"
              style={{
                width: el.size * 3,
                height: el.size * 3,
                background: `radial-gradient(circle, ${el.color}0.6) 0%, ${el.color}0) 70%)`,
                boxShadow: `0 0 ${el.size * 3}px ${el.color}0.4)`,
              }}
            />
          )}
          {el.type === "flower" && <></>}
          {el.type === "star" && (
            <Star
              className="text-gold/40"
              size={el.size * 4}
              fill="currentColor"
              style={{
                filter: `drop-shadow(0 0 ${el.size}px rgba(248, 245, 238, 0.8))`,
              }}
            />
          )}
          {el.type === "orb" && (
            <div
              className="rounded-full"
              style={{
                width: el.size * 3,
                height: el.size * 3,
                background: `radial-gradient(circle, ${el.color}0.6) 0%, ${el.color}0) 70%)`,
                boxShadow: `0 0 ${el.size * 3}px ${el.color}0.4)`,
              }}
            />
          )}
          {el.type === "petal" && (
            <div
              className="rounded-full"
              style={{
                width: el.size * 2,
                height: el.size * 4,
                background: `linear-gradient(to bottom, ${el.color}0.5), ${el.color}0))`,
                transform: `rotate(${el.rotation}deg)`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   FLOATING MARIGOLD PETALS
   ============================================================ */
function FloatingPetals() {
  const [petals, setPetals] = useState<
    Array<{
      id: number;
      x: number;
      delay: number;
      duration: number;
      size: number;
      swayAmount: number;
    }>
  >([]);

  useEffect(() => {
    const rng = createSeededRandom(54321);
    const newPetals = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: rng() * 100,
      delay: rng() * 20,
      duration: rng() * 10 + 15,
      size: rng() * 8 + 6,
      swayAmount: rng() * 100 + 50,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            bottom: -30,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [
              0,
              Math.sin(petal.id) * petal.swayAmount,
              -Math.sin(petal.id * 1.5) * petal.swayAmount * 0.5,
              Math.sin(petal.id * 0.7) * petal.swayAmount * 0.3,
              0,
            ],
            rotate: [0, 45, -30, 60, -15, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="rounded-full opacity-60"
            style={{
              width: petal.size,
              height: petal.size * 1.5,
              background: `linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)`,
              boxShadow: `0 0 ${petal.size / 2}px rgba(245, 158, 11, 0.4)`,
              transform: `rotate(${petal.id * 15}deg)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   FLOATING STARS FIELD
   ============================================================ */
function StarField() {
  const [stars, setStars] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      duration: number;
      delay: number;
      twinkle: boolean;
    }>
  >([]);

  useEffect(() => {
    const rng = createSeededRandom(98765);
    const newStars = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: rng() * 100,
      y: rng() * 100,
      size: rng() * 3 + 1,
      duration: rng() * 3 + 2,
      delay: rng() * 5,
      twinkle: rng() > 0.5,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-moonlight"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 2}px rgba(248, 245, 238, 0.6)`,
          }}
          animate={
            star.twinkle
              ? {
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.3, 1],
                }
              : {}
          }
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   FLOATING LANTERNS WITH RANDOM MOTION
   ============================================================ */
function FloatingLanterns() {
  const [lanterns, setLanterns] = useState<
    Array<{
      id: number;
      x: number;
      delay: number;
      duration: number;
      size: number;
      swayPath: number[];
    }>
  >([]);

  useEffect(() => {
    const rng = createSeededRandom(11111);
    const newLanterns = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 10 + rng() * 80,
      delay: rng() * 10,
      duration: 25 + rng() * 15,
      size: 0.8 + rng() * 0.4,
      swayPath: [
        0,
        (rng() - 0.5) * 100,
        (rng() - 0.5) * 80,
        (rng() - 0.5) * 60,
        0,
      ],
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLanterns(newLanterns);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {lanterns.map((lantern) => (
        <motion.div
          key={lantern.id}
          className="absolute"
          style={{
            left: `${lantern.x}%`,
            bottom: -100,
          }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: lantern.swayPath,
            rotate: [0, 8, -5, 10, -3, 0],
          }}
          transition={{
            duration: lantern.duration,
            delay: lantern.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            className="relative"
            style={{ transform: `scale(${lantern.size})` }}
            animate={{
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-10 h-14 bg-gradient-to-b from-amber-300/90 to-orange-500/70 rounded-lg shadow-[0_0_40px_rgba(251,191,36,0.6)] border border-amber-200/60">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent rounded-lg" />
              <motion.div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-t from-orange-400/80 to-amber-200/40 rounded"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 border-2 border-amber-700/40 rounded-t-full" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   FLOATING HEARTS
   ============================================================ */
function FloatingHearts() {
  const [hearts, setHearts] = useState<
    Array<{
      id: number;
      x: number;
      delay: number;
      duration: number;
      size: number;
    }>
  >([]);

  useEffect(() => {
    const rng = createSeededRandom(22222);
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: rng() * 100,
      delay: rng() * 15,
      duration: 12 + rng() * 8,
      size: 0.6 + rng() * 0.6,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: -50,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(heart.id) * 60, -Math.sin(heart.id * 2) * 40, 0],
            scale: [0, heart.size, heart.size * 0.8, 0],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart className="text-gold/40" fill="currentColor" size={24} />
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   BOHO DECORATION OVERLAYS
   ============================================================ */
function BohoDecor() {
  return (
    <div className="absolute top-0 inset-x-0 w-full pointer-events-none z-0 flex flex-col items-center opacity-45">
      {/* Top Border Arch */}

      {/* Hanging Decorations */}
      <div className="absolute top-0 inset-x-0 w-full flex justify-between px-4 md:px-20">
        <img
          src="/invite/Shape_.png"
          alt=""
          className="w-32 md:w-56 h-auto origin-top"
          style={{ willChange: "transform" }}
        />
        <img
          src="/invite/Shape_2.png"
          alt=""
          className="w-32 md:w-56 h-auto origin-top"
          style={{ transform: "", willChange: "transform" }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   ENVELOPE LOADING SCREEN 
   ============================================================ */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    };

    checkMobile();

    // Preload the hero image during the loading screen
    const img = new window.Image();
    img.src = "/ashmlu.jpg";

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 2000);
    const t3 = setTimeout(() => setStage(3), 3500);
    const t4 = setTimeout(() => onComplete(), 4500);

    const startTime = Date.now();
    const handleInteraction = () => {
      // If the browser throttled our timeouts (stuck) and enough time passed,
      // or if the user interacts, jump to the end.
      if (Date.now() - startTime > 4500) {
        setStage(3);
        setTimeout(() => onComplete(), 500);
        window.removeEventListener("scroll", handleInteraction);
        window.removeEventListener("touchstart", handleInteraction);
        window.removeEventListener("click", handleInteraction);
      }
    };

    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("click", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#08111D]"
      animate={{
        opacity: stage === 3 ? 0 : 1,
        pointerEvents: stage === 3 ? "none" : "auto",
      }}
      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className="relative w-[360px] h-[260px] md:w-[600px] md:h-[400px]"
        style={{ perspective: "1500px" }}
      >
        <div className="absolute inset-0 bg-[#E8E2D2] rounded-md shadow-2xl overflow-hidden texture-paper" />

        <motion.div
          className="absolute left-4 right-4 bottom-4 bg-[#F8F5EE] rounded shadow-inner flex flex-col items-center justify-center p-6 text-center border-2 border-gold/40 texture-lace"
          initial={{ top: "15px", y: 0 }}
          animate={{
            y: stage >= 2 ? (isMobile ? -160 : -220) : 0,
            scale: stage >= 3 ? 1.1 : 1,
            opacity: stage === 3 ? 0 : 1,
          }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="bg-[#F8F5EE]/95 backdrop-blur-sm p-4 w-full h-full flex flex-col items-center justify-center rounded">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#2A4B7C] text-xs md:text-base font-serif tracking-[0.2em] mb-4 uppercase"
            >
              The Wedding Of
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-3xl md:text-5xl font-serif text-[#1B365D] font-bold tracking-widest"
            >
              ASLAM
            </motion.h2>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring", bounce: 0.5 }}
              className="text-gold font-script text-3xl md:text-4xl my-2 drop-shadow-sm"
            >
              &amp;
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-3xl md:text-5xl font-serif text-[#1B365D] font-bold tracking-widest"
            >
              ASHMILA
            </motion.h2>
          </div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none drop-shadow-2xl">
          <div
            className="absolute inset-0 bg-[#F8F5EE] rounded-b-md texture-paper"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 45%)" }}
          />
          <div
            className="absolute inset-0 bg-[#E8E2D2] rounded-l-md texture-paper"
            style={{ clipPath: "polygon(0 0, 0 100%, 50% 50%)" }}
          />
          <div
            className="absolute inset-0 bg-[#E8E2D2] rounded-r-md texture-paper"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" }}
          />
        </div>

        <motion.div
          className="absolute inset-0 origin-top z-10"
          initial={{ rotateX: 0 }}
          animate={{
            rotateX: stage >= 1 ? -180 : 0,
            zIndex: stage >= 2 ? -10 : 10,
          }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 bg-[#F8F5EE] rounded-t-md drop-shadow-2xl texture-paper"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 55%)",
              backfaceVisibility: "hidden",
            }}
          />
          <div
            className="absolute inset-0 bg-[#E8E2D2] rounded-t-md texture-paper z-0"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 55%)",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          />

          <motion.div
            className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gold-light to-gold-dark rounded-full flex items-center justify-center shadow-lg border-2 border-gold/50 z-20 text-[#08111D] font-script text-3xl md:text-4xl shadow-[inset_0_0_15px_rgba(0,0,0,0.3)]"
            style={{ backfaceVisibility: "hidden" }}
            animate={{ opacity: stage >= 1 ? 0 : 1 }}
          >
            A
            <span className="text-xl md:text-2xl opacity-80 mx-0.5">&amp;</span>
            A
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   COUNTDOWN TIMER
   ============================================================ */
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const target = new Date("2026-04-06T18:00:00+05:30").getTime();

    const calc = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        isReached: diff === 0,
      };
    };

    let timer: ReturnType<typeof setInterval>;

    const updateTime = () => {
      const { days, hours, minutes, isReached } = calc();
      setTimeLeft({ days, hours, minutes });
      if (isReached && timer) {
        clearInterval(timer);
      }
    };

    updateTime();
    timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-12">
      {units.map((item, idx) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: idx * 0.15,
            duration: 0.8,
            type: "spring",
            bounce: 0.4,
          }}
          className="text-center"
        >
          <div className="relative w-20 h-20 md:w-28 md:h-28">
            <motion.div
              className="absolute inset-0 rounded-full border border-gold/40"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(179, 156, 125, 0.2)",
                  "0 0 40px rgba(179, 156, 125, 0.4)",
                  "0 0 20px rgba(179, 156, 125, 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute inset-0 rounded-full bg-royal/60 backdrop-blur-md flex items-center justify-center shadow-moon border border-gold/20">
              <span className="text-3xl md:text-5xl font-serif text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] font-light">
                {String(item.value).padStart(2, "0")}
              </span>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            className="text-[10px] md:text-xs text-[#6C593E]/60 uppercase tracking-[0.3em] font-body mt-3"
          >
            {item.label}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   EVENT CARD
   ============================================================ */
interface EventCardProps {
  title: string;
  subtitle?: string;
  emoji: string;
  date: string;
  venue: string;
  time: string;
  index: number;
}

function EventCard({
  title,
  subtitle,
  emoji,
  date,
  venue,
  time,
  index,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1,
        delay: index * 0.2,
        ease: "easeOut",
      }}
      className="flex flex-col items-center justify-start text-center w-full mx-auto py-4 h-full"
    >
      {/* Top Section with fixed heights for alignment */}
      <div className="flex flex-col items-center justify-center w-full min-h-[180px] md:min-h-[200px] mb-6">
        {emoji ? (
          <motion.span
            className="text-4xl md:text-5xl mb-4 block drop-shadow-md"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            {emoji}
          </motion.span>
        ) : (
          <div className="h-[40px] md:h-[48px] mb-4" />
        )}

        <h3 className="text-4xl md:text-5xl lg:text-5xl font-serif text-[#F8F5EE] tracking-widest leading-tight drop-shadow-md">
          {title}
        </h3>

        {subtitle ? (
          <p className="font-script text-[#A88B5C] mt-6 text-3xl md:text-4xl drop-shadow-sm opacity-90">
            {subtitle}
          </p>
        ) : (
          <div className="h-[36px] md:h-[40px] mt-6" />
        )}
      </div>

      <div className="flex flex-col items-center space-y-5 font-body tracking-widest flex-grow justify-start">
        <div className="flex items-center justify-center gap-3">
          <Calendar className="w-4 h-4 text-[#A88B5C]" />
          <p className="text-[#F8F5EE] uppercase text-xs tracking-[0.2em] font-light">
            {date}
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <MapPin className="w-4 h-4 text-[#A88B5C] shrink-0" />
          <p className="text-[#F8F5EE] uppercase text-xs tracking-[0.2em] font-light text-center leading-relaxed">
            {venue}
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Clock className="w-4 h-4 text-[#A88B5C]" />
          <p className="text-[#F8F5EE] uppercase text-xs tracking-[0.2em] font-light">
            {time}
          </p>
        </div>
      </div>

      <div className="flex justify-center w-full mt-auto pt-10 pb-8">
        <motion.a
          href={
            index === 0
              ? "https://maps.app.goo.gl/bpbi1zKhA1PiFgCK8"
              : "https://maps.app.goo.gl/SbWcm32MBzXKHUpK6"
          }
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center gap-3 text-xs text-[#F8F5EE] hover:text-white transition-all font-body uppercase tracking-[0.3em] border border-[#A88B5C]/40 rounded-full px-8 py-3.5 hover:bg-[#A88B5C]/10 backdrop-blur-sm group hover:border-[#A88B5C]"
        >
          <Navigation className="w-3.5 h-3.5 text-[#A88B5C] group-hover:animate-pulse" />
          Navigate to {index === 0 ? "Venue" : "Residence"}
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ============================================================
   INFO CARD
   ============================================================ */
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function InfoCard({ icon, title, description, index }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      className="text-center p-6 md:p-8 rounded-xl bg-[#0D1B2E] backdrop-blur-md border border-gold/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-gold/50 hover:shadow-[0_0_30px_rgba(192,154,83,0.2)] transition-all duration-500 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#1B365D]/50 pointer-events-none" />
      <img
        src="/mandala-pattern.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.1] mix-blend-screen pointer-events-none"
      />

      <motion.div
        className="absolute inset-0 rounded-xl border border-gold/0 group-hover:border-gold/30"
        animate={{
          boxShadow: [
            "inset 0 0 0px rgba(179,156,125,0)",
            "inset 0 0 20px rgba(179,156,125,0.1)",
            "inset 0 0 0px rgba(179,156,125,0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10">
        <motion.div
          className="w-14 h-14 mx-auto mb-5 rounded-full bg-moonlight/10 flex items-center justify-center text-gold border border-gold/30 group-hover:bg-gold group-hover:text-midnight transition-colors duration-500 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-serif text-[#F8F5EE] mb-3 tracking-wide drop-shadow-sm">
          {title}
        </h3>
        <p className="text-sm text-[#E8E2D2] leading-relaxed font-body">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* ============================================================
   SECTION DIVIDER — Ornate
   ============================================================ */
function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="flex items-center justify-center py-4"
    >
      <span
        className="h-px w-24 md:w-32"
        style={{
          background: `linear-gradient(90deg, transparent, var(--color-gold))`,
        }}
      />
      <motion.div
        className="mx-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* <Sparkles className="w-5 h-5 text-gold" /> */}
      </motion.div>
      <span
        className="h-px w-24 md:w-32"
        style={{
          background: `linear-gradient(90deg, var(--color-gold), transparent)`,
        }}
      />
    </motion.div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const events: EventCardProps[] = [
    {
      title: "",
      subtitle: "Reception",
      emoji: "",
      date: "Sunday, April 12th 2026",
      venue: "Poroppad,\nThrikkaripur",
      time: "7:30 PM Onwards",
      index: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-midnight text-[#6C593E] overflow-x-hidden selection:bg-gold/20 relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/invite/Background.png"
          alt=""
          className="w-full h-full object-cover opacity-5"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Multiple Floating Elements */}
      <FloatingElements />
      <StarField />
      <FloatingPetals />
      <FloatingLanterns />
      <FloatingHearts />

      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <AudioPlayer />

      {!isLoading && (
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc="/ashmlu.jpg"
          bgImageSrc="/invite/Background.png"
          names={["ASLAM", "ASHMILA"]}
          date="APR 11 . 2026"
        >
          {/* INVITATION MESSAGE */}
          <section className="py-24 md:py-36 bg-royal relative overflow-hidden texture-lace-cutout">
            <BohoDecor />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight/80 pointer-events-none z-0" />

            {/* Background elements */}

            <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <Moon
                    className="w-10 h-10 text-gold mx-auto mb-6"
                    strokeWidth={1}
                  />
                </motion.div>
                <motion.h2
                  className="text-4xl md:text-5xl font-serif text-[#8A7454] tracking-widest mb-4"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Nikah
                </motion.h2>
                <p className="text-[#8A7454] text-xs md:text-sm tracking-[0.3em] uppercase font-body leading-loose mb-2">
                  Under the blessings of Allah (SWT)
                </p>
                <p className="text-[#8A7454] text-xs md:text-sm tracking-[0.3em] uppercase font-body leading-loose">
                  and our beloved parents
                </p>
              </motion.div>

              <SectionDivider />

              <div className="w-full flex flex-col items-center my-16 md:my-24 font-script">
                {/* Names Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center gap-2 md:gap-12 w-full"
                >
                  <h3 className="text-4xl md:text-7xl lg:text-[5.5rem] text-[#A88B5C] drop-shadow-md leading-tight text-center flex-1">
                    Mohammed Aslam
                  </h3>

                  <span className="text-3xl md:text-6xl lg:text-7xl text-[#8A7454] opacity-70 shrink-0 px-1 md:px-0">
                    weds
                  </span>

                  <h3 className="text-4xl md:text-7xl lg:text-[5.5rem] text-[#A88B5C] drop-shadow-md leading-tight text-center flex-1">
                    Ashmila Parveen
                  </h3>
                </motion.div>

                {/* Parents Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start justify-center gap-2 md:gap-12 w-full mt-8 md:mt-12 font-body uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#6C593E] text-[8px] md:text-xs lg:text-sm leading-loose"
                >
                  <div className="text-center flex-1 flex flex-col items-center">
                    <div className="w-12 md:w-24 h-px bg-gradient-to-r from-transparent via-[#C09A53] to-transparent opacity-60 mb-4 md:mb-6" />
                    <p className="max-w-[160px] md:max-w-[280px] px-1 md:px-4">
                      S/o Mohammed Ashraf K <br /> & Naseeba S
                    </p>
                  </div>
                  <div className="w-[50px] md:w-[150px] lg:w-[180px] shrink-0" />{" "}
                  {/* Spacer for 'weds' width estimation */}
                  <div className="text-center flex-1 flex flex-col items-center">
                    <div className="w-12 md:w-24 h-px bg-gradient-to-r from-transparent via-[#C09A53] to-transparent opacity-60 mb-4 md:mb-6" />
                    <p className="max-w-[160px] md:max-w-[280px] px-1 md:px-4">
                      D/o Aboobacker P <br /> & Maimoona
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="bg-[#0D1B2E] text-white p-10 md:p-14 rounded-xl border border-gold/30 shadow-royal backdrop-blur-sm relative overflow-hidden"
              >
                <img
                  src="/mughal-floral.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-[0.1] mix-blend-screen pointer-events-none"
                />
                <h2 className="text-3xl md:text-4xl font-serif text-gold-shimmer tracking-widest mb-6">
                  WARMLY INVITE YOU
                </h2>
                <p className="text-[#F8F5EE]/70 text-sm md:text-base font-body tracking-wider leading-relaxed relative z-10">
                  To join us in celebrating the holy matrimony and{" "}
                  <br className="hidden md:block" />
                  blessing the beginning of our new life together.
                </p>

                <motion.div
                  className="mt-8 flex justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <Heart className="w-8 h-8 text-gold/60" fill="currentColor" />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* EVENTS SECTION */}
          <section className="py-24 md:py-40 bg-[#08111D] border-y-2 border-gold/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-96 h-96 bg-royal/20 rounded-full blur-[120px]"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 15, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[120px]"
              animate={{
                x: [0, -30, 0],
                y: [0, -50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 18, repeat: Infinity }}
            />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16 md:mb-24"
              >
                <SectionDivider />
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 max-w-5xl mx-auto">
                {events.map((event) => (
                  <EventCard key={event.title} {...event} />
                ))}
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#A88B5C]/30 to-transparent my-16 max-w-2xl mx-auto" />

              <div className="flex justify-center w-full pb-10">
                <CountdownTimer />
              </div>
            </div>
          </section>

          {/* Floating Location Button Removed Since We Have Two Locations */}

          {/* COUNTDOWN SECTION */}

          {/* Footer */}
          <footer className="bg-[#08111D] text-[#F8F5EE] py-12 text-center border-t border-[#8A7454]/20 relative overflow-hidden">
            <div className="absolute bottom-0 inset-x-0 w-full pointer-events-none z-0 flex justify-center opacity-60">
              <img
                src="/invite/Shape.png"
                alt=""
                className="w-[800px] h-auto translate-y-1/2 opacity-5"
                style={{ willChange: "transform" }}
              />
            </div>

            <motion.a
              className="text-[#F8F5EE]/60 text-xs hover:text-[#F8F5EE] transition-colors tracking-[0.3em] uppercase font-body inline-flex items-center gap-2 relative z-10"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4" />
              Include us in your prayers
            </motion.a>
          </footer>
        </ScrollExpandMedia>
      )}
    </div>
  );
}
