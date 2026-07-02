"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaSrc: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  names?: string[]; // Custom prop for Aslam & Ashmila
}

const ScrollExpandMedia = ({
  mediaSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
  names,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // useScroll for post-expansion native scroll animations
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "start start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  useEffect(() => {
    const updateScrollProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const heroTravelDistance = Math.max(window.innerHeight * 0.85, 220);
      const nextProgress = Math.min(
        Math.max((0 - rect.top) / heroTravelDistance, 0),
        1,
      );

      setScrollProgress(nextProgress);
      setShowContent(nextProgress >= 0.35);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // We calculate target dimensions to match the image's original aspect ratio (1375x768 => ~1.79)
  const imgRatio = 1375 / 768;
  const winW = typeof window !== "undefined" ? window.innerWidth : 1000;
  const winH = typeof window !== "undefined" ? window.innerHeight : 1000;

  // padding so it stays framed
  const maxW = isMobileState ? winW * 0.92 : winW * 0.9;
  const maxH = isMobileState ? winH * 0.8 : winH * 0.85;

  let targetW = maxW;
  let targetH = targetW / imgRatio;

  if (targetH > maxH) {
    targetH = maxH;
    targetW = targetH * imgRatio;
  }

  const initialW = 300;
  const initialH = isMobileState ? 330 : 400;

  const mediaWidth = initialW + scrollProgress * (targetW - initialW);
  const mediaHeight = initialH + scrollProgress * (targetH - initialH);
  const textTranslateX = scrollProgress * (isMobileState ? 100 : 150);

  const firstWord = names ? names[0] : title ? title.split(" ")[0] : "";
  const restOfTitle = names
    ? names[1]
    : title
      ? title.split(" ").slice(1).join(" ")
      : "";

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden bg-midnight w-full"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          {/* Background Layer */}
          <motion.div
            className="absolute inset-0 z-0 h-full w-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            {/* Base lace texture layer */}
            <div className="absolute inset-0 texture-lace opacity-40 pointer-events-none" />

            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-center scale-[1.05] opacity-10"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight/20 via-transparent to-midnight/60" />
          </motion.div>

          {/* Interactive Content Container */}
          <div className="w-full flex flex-col items-center justify-start relative z-10 w-screen max-w-none">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative max-w-none">
              {/* Expanding Media Frame */}
              <div
                className="absolute z-0 top-[33%] md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none shadow-[0_0_50px_rgba(108,89,62,0.3)] border-[3px] border-gold/60"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  borderRadius: "12px",
                  borderWidth: "3px",
                }}
              >
                {/* Expandable Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={mediaSrc}
                    alt={title || "Wedding Photo"}
                    fill
                    className="transition-none object-cover"
                    style={{ borderRadius: "10px" }}
                  />

                  {/* Dark overlay that fades out as you expand */}
                  <motion.div
                    className="absolute inset-0 bg-moonlight/60 transition-none"
                    style={{ borderRadius: "10px" }}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0.8 - scrollProgress * 0.4 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Subtle lace texture over the expanded media */}
                  <div
                    className="absolute inset-0 texture-paper opacity-30 pointer-events-none"
                    style={{ borderRadius: "10px" }}
                  />
                </div>

                {/* Subtitle / Date */}
                <div className="flex flex-col items-center text-center relative z-10 -mt-[4.5rem] md:-mt-24 transition-none w-full">
                  {/* date moved */}
                  {scrollToExpand && scrollProgress < 0.1 && (
                    <motion.p
                      className="text-gold/60 font-body text-xs tracking-[0.3em] uppercase absolute top-20 text-center w-full"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1 - scrollProgress * 10,
                        y: [0, 5, 0],
                      }}
                      transition={{
                        opacity: { duration: 0.2 },
                        y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                      }}
                    >
                      {scrollToExpand}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Bismillah — above image on mobile, inside text overlay on desktop */}
              <motion.p
                className="absolute top-[2%] left-0 right-0 text-center md:hidden text-sm font-serif tracking-[0.2em] text-[#6C593E] drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 - scrollProgress * 2 }}
              >
                بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
              </motion.p>

              {/* Foreground Typography Container */}
              <div
                className={`absolute left-0 right-0 bottom-26 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center text-center gap-0 md:gap-4 w-full z-10 transition-none flex-col ${
                  textBlend ? "md:mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <motion.p
                  className="mb-6 md:mb-12 hidden md:block text-sm md:text-xl font-serif tracking-[0.2em] text-[#6C593E] drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 - scrollProgress * 2 }}
                >
                  بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
                </motion.p>
                <div className="relative inline-block w-full">
                  <motion.h2
                    className="text-7xl md:text-9xl lg:text-[10rem] font-serif tracking-normal drop-shadow-[0_4px_12px_rgba(20,10,0,0.4)] leading-none relative z-10"
                    initial={{ color: "#b36800ff" }}
                    animate={{
                      color: [
                        "#b07f14ff",
                        "#b97413ff",
                        "#f6ac00db",
                        "#b46000ff",
                      ], // Lighter beige/gold shades
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      transform: `translateX(-${textTranslateX}vw)`,
                    }}
                  >
                    {firstWord}
                  </motion.h2>
                </div>

                <motion.div
                  className="my-3 md:my-5 flex items-center justify-center gap-4 w-full"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 - scrollProgress * 2 }}
                >
                  <span className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-[#3B2F1F]" />
                  <span className="text-4xl md:text-6xl font-script drop-shadow-[0_4px_16px_rgba(20,10,0,0.9)] text-[#3B2F1F]">
                    weds
                  </span>
                  <span className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-[#3B2F1F]" />
                </motion.div>

                <div className="relative inline-block w-full">
                  <motion.h2
                    className="text-7xl md:text-9xl lg:text-[10rem] font-serif tracking-normal drop-shadow-[0_4px_12px_rgba(2,10,0,0.4)] leading-none relative z-10"
                    initial={{ color: "#E8DCC4" }}
                    animate={{
                      color: [
                        "#b46000ff",
                        "#f6ac00db",
                        "#b97413ff",
                        "#b07f14ff",
                      ], // Lighter beige/gold shades
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                    style={{
                      transform: `translateX(${textTranslateX}vw)`,
                    }}
                  >
                    {restOfTitle}
                  </motion.h2>
                </div>

                {date && (
                  <motion.p
                    className="mt-6 md:mt-10 text-sm md:text-lg font-serif tracking-[0.4em] text-[#6C593E] drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] uppercase z-10"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 - scrollProgress * 2 }}
                  >
                    {date}
                  </motion.p>
                )}
              </div>

              {/* Scroll indicator arrow */}
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
                initial={{ opacity: 1 }}
                animate={{
                  opacity: scrollProgress > 0.02 ? 0 : 1,
                  y: [0, 8, 0],
                }}
                transition={{
                  opacity: { duration: 0.3 },
                  y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6C593E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.div>
            </div>

            {/* Floating Navbar — appears after content is revealed */}
            {showContent && (
              <motion.div
                className="fixed top-0 left-0 right-0 z-50 bg-[#08111D]/90 border-b border-gold/20 py-3 px-6 flex items-center justify-center gap-3"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  willChange: "transform, opacity",
                  WebkitBackdropFilter: "blur(12px)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span className="text-lg md:text-xl font-serif text-white tracking-[0.15em]">
                  {firstWord}
                </span>
                <span className="text-lg md:text-xl font-script text-gold">
                  &amp;
                </span>
                <span className="text-lg md:text-xl font-serif text-white tracking-[0.15em]">
                  {restOfTitle}
                </span>
              </motion.div>
            )}

            {/* Content Revealed After Scrolling */}
            <motion.div
              ref={contentRef}
              className={`w-full max-w-none m-0 p-0 transition-all duration-700 relative z-20 ${showContent && isMobileState ? "-mt-[45vh]" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
              style={
                showContent
                  ? { opacity: contentOpacity, y: contentY }
                  : undefined
              }
            >
              <div
                className={
                  showContent ? "pointer-events-auto" : "pointer-events-none"
                }
              >
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
