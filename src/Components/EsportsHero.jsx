import { useEffect, useRef, useState, useCallback } from "react";

/* ==================================================
   CONFIGURABLE CONTENT
   ================================================== */
const eventInfo = {
  eyebrow: "Last Night Scholars (LNS) presents",
  title: ["Esports", "Carnival", "2026"],
  subtitle: "Where champions rise, rivals collide, and the arena comes alive.",
  description:
    "An electrifying celebration of competitive gaming, bringing players, teams, and gaming enthusiasts together for an unforgettable esports experience.",
  date: "Coming soon",
  location: "JNU Campus",
  primaryButton: "Join the Carnival",
  secondaryButton: "Explore Events",
};

const ACCENT = "#00adee";

/* ==================================================
   SEEDED RANDOM (deterministic particle field)
   ================================================== */
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PARTICLE_COUNT = 46;
const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
  const rand = mulberry32(i * 9973 + 17);
  return {
    id: i,
    left: rand() * 100,
    top: rand() * 100,
    size: 1 + rand() * 2.4,
    opacity: 0.15 + rand() * 0.45,
    duration: 10 + rand() * 16,
    delay: -rand() * 20,
    drift: (rand() - 0.5) * 40,
    blur: rand() > 0.75,
    priority: i < 22, // shown on mobile too
  };
});

/* ==================================================
   BACKGROUND: grid + glow + vignette + particles + scanline
   ================================================== */
function HeroBackground({ reducedMotion }) {
  const gridRef = useRef(null);
  const raf = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    target.current.x = nx;
    target.current.y = ny;
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer) return;

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.045;
      current.current.y += (target.current.y - current.current.y) * 0.045;

      const rotY = current.current.x * 3; // deg
      const rotX = current.current.y * -2; // deg
      const tx = current.current.x * 10; // px
      const ty = current.current.y * 8; // px

      if (gridRef.current) {
        gridRef.current.style.transform = `perspective(900px) rotateX(${
          58 + rotX
        }deg) rotateZ(${rotY * 0.4}deg) translate3d(${tx}px, ${ty}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [onMouseMove, reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 38%, #06131C 0%, #030B12 45%, #02060A 100%)",
        }}
      />

      {/* atmospheric glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 32% 42%, rgba(0,173,238,0.16), transparent 45%),
                       radial-gradient(circle at 78% 20%, rgba(0,173,238,0.06), transparent 40%)`,
        }}
      />

      {/* perspective grid floor */}
      <div
        className="absolute left-0 right-0 bottom-[-15%] h-[85%]"
        style={{ transformStyle: "preserve-3d", transformOrigin: "50% 100%" }}
      >
        <div
          ref={gridRef}
          className="absolute inset-0"
          style={{
            transform: "perspective(900px) rotateX(58deg)",
            transformOrigin: "50% 100%",
            backgroundImage: `
              linear-gradient(rgba(0,173,238,0.16) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,173,238,0.16) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 20%, black 15%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 20%, black 15%, transparent 75%)",
          }}
        />
      </div>

      {/* faint upper grid layer for depth beyond the horizon */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,173,238,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,173,238,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 55%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 55%)",
        }}
      />

      {/* particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className={`absolute rounded-full ${
              p.priority ? "" : "hidden md:block"
            }`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: ACCENT,
              opacity: p.opacity,
              filter: p.blur ? "blur(1px)" : "none",
              boxShadow: `0 0 ${p.size * 3}px rgba(0,173,238,0.7)`,
              animation: reducedMotion
                ? "none"
                : `particleDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
              "--drift": `${p.drift}px`,
            }}
          />
        ))}
      </div>

      {/* scanline */}
      {!reducedMotion && (
        <div
          className="absolute inset-x-0 h-[3px] opacity-[0.35]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,173,238,0.95), transparent)",
            boxShadow: "0 0 16px 2px rgba(0,173,238,0.6)",
            animation: "scanline 9s linear infinite",
          }}
        />
      )}

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,10,0.4) 0%, transparent 20%, transparent 70%, rgba(2,6,10,0.85) 100%)",
        }}
      />
    </div>
  );
}

/* ==================================================
   HERO CONTENT
   ================================================== */
function HeroContent({ mounted }) {
  const stage = (i) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0px)" : "translateY(14px)",
    transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
  });

  return (
    <div className="relative z-10 flex min-h-screen w-full items-center">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12 lg:px-20">
        <div className="max-w-xl md:max-w-2xl text-center mx-auto">
          {/* eyebrow */}
          <div
            style={stage(0)}
            className="mb-5 flex items-center justify-center gap-3"
          >
            <span
              className="h-px w-8"
              style={{
                background: `linear-gradient(90deg, transparent, ${ACCENT})`,
              }}
            />
            <span
              className="text-[11px] tracking-[0.25em] font-medium"
              style={{
                color: "#8fd9f5",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {eventInfo.eyebrow.toUpperCase()}
            </span>
          </div>

          {/* heading */}
          <h1
            style={{
              ...stage(1),
              fontFamily: "'Orbitron', sans-serif",
              lineHeight: 0.98,
              letterSpacing: "0.01em",
            }}
            className="font-bold text-[13vw] sm:text-6xl md:text-7xl lg:text-[5.2rem]"
          >
            {eventInfo.title.map((line, idx) => (
              <span
                key={line}
                className="block"
                style={{
                  color:
                    idx === eventInfo.title.length - 1 ? undefined : "#f2fbff",
                  background:
                    idx === eventInfo.title.length - 1
                      ? "linear-gradient(90deg, #ffffff 0%, #bfefff 45%, #00adee 100%)"
                      : "none",
                  WebkitBackgroundClip:
                    idx === eventInfo.title.length - 1 ? "text" : undefined,
                  backgroundClip:
                    idx === eventInfo.title.length - 1 ? "text" : undefined,
                  WebkitTextFillColor:
                    idx === eventInfo.title.length - 1
                      ? "transparent"
                      : undefined,
                  textShadow:
                    "0 0 12px rgba(0,173,238,0.35), 0 0 40px rgba(0,173,238,0.18)",
                }}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* subtitle */}
          <p
            style={{ ...stage(2), fontFamily: "'Space Grotesk', sans-serif" }}
            className="mt-6 text-base md:text-lg text-[#cfeaf6]/90 font-medium"
          >
            {eventInfo.subtitle}
          </p>

          {/* description */}
          <p
            style={{ ...stage(3), fontFamily: "'Space Grotesk', sans-serif" }}
            className="mt-3 text-sm md:text-base text-[#8ba7b4] leading-relaxed"
          >
            {eventInfo.description}
          </p>

          {/* date / location */}
          <div
            style={{ ...stage(3), fontFamily: "'Space Grotesk', sans-serif" }}
            className="mt-5 inline-flex items-center gap-2 text-xs tracking-wide text-[#6fa9c2] mx-auto"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: ACCENT,
                boxShadow: "0 0 8px rgba(0,173,238,0.9)",
              }}
            />
            <span>{eventInfo.date}</span>
            <span className="opacity-40">/</span>
            <span>{eventInfo.location}</span>
          </div>

          {/* buttons */}
          <div
            style={stage(4)}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              type="button"
              className="group relative w-full sm:w-auto px-8 py-3.5 rounded-md font-semibold text-sm tracking-wide text-[#02060A] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                background: "linear-gradient(135deg, #5fe2ff, #00adee)",
                boxShadow: "0 0 18px rgba(0,173,238,0.35)",
                fontFamily: "'Space Grotesk', sans-serif",
                outlineColor: ACCENT,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 32px rgba(0,173,238,0.6)";
                e.currentTarget.style.transform =
                  "translateY(-2px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 18px rgba(0,173,238,0.35)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              {eventInfo.primaryButton}
            </button>

            <button
              type="button"
              className="w-full sm:w-auto px-8 py-3.5 rounded-md font-semibold text-sm tracking-wide text-[#dff4ff] border transition-all duration-300 backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                borderColor: "rgba(0,173,238,0.35)",
                background: "rgba(6,19,28,0.4)",
                fontFamily: "'Space Grotesk', sans-serif",
                outlineColor: ACCENT,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,173,238,0.8)";
                e.currentTarget.style.background = "rgba(0,173,238,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,173,238,0.35)";
                e.currentTarget.style.background = "rgba(6,19,28,0.4)";
              }}
            >
              {eventInfo.secondaryButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================================================
   MAIN COMPONENT
   ================================================== */
export default function EsportsHero() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800&family=Space+Grotesk:wght@400;500;600&display=swap";
    document.head.appendChild(link);

    const t = setTimeout(() => setMounted(true), 60);

    return () => {
      mq.removeEventListener?.("change", handler);
      clearTimeout(t);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#02060A" }}
    >
      <style>{`
        @keyframes particleDrift {
          0%   { transform: translate(0, 0); opacity: var(--base-opacity, 1); }
          50%  { transform: translate(var(--drift), -18px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes scanline {
          0%   { top: -5%; }
          100% { top: 105%; }
        }
        ::selection {
          background: rgba(0,173,238,0.35);
        }
      `}</style>

      <HeroBackground reducedMotion={reducedMotion} />
      <HeroContent mounted={mounted} />
    </div>
  );
}
