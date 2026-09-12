import { useState, useEffect, useMemo } from "react";

/* ==================================================
   CONFIGURABLE CONTENT
   ================================================== */
const countdownConfig = {
  // Set your registration deadline here (local time)
  targetDate: "2026-10-02T00:00:00",
  heading: "Registration Closes In",
  subtitle: "Register early — the first 500 squads get exclusive drip.",
  note: "Don't miss your shot. Once the clock hits zero, registration for Esports Carnival 2026 locks — secure your squad's spot with Last Night Scholars (LNS) before it's gone.",
};

const ACCENT = "#00adee";

function getTimeLeft(target) {
  const diff = +new Date(target) - +new Date();
  const clamp = (n) => Math.max(n, 0);
  return {
    total: diff,
    days: clamp(Math.floor(diff / (1000 * 60 * 60 * 24))),
    hours: clamp(Math.floor((diff / (1000 * 60 * 60)) % 24)),
    minutes: clamp(Math.floor((diff / (1000 * 60)) % 60)),
    seconds: clamp(Math.floor((diff / 1000) % 60)),
  };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `@keyframes clockColonBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.2; } }`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeLeft(countdownConfig.targetDate),
  );

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800&family=Space+Grotesk:wght@400;500;600&display=swap";
    document.head.appendChild(link);

    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(countdownConfig.targetDate));
    }, 1000);

    return () => {
      document.head.removeChild(link);
      clearInterval(id);
    };
  }, []);

  const isLive = timeLeft.total <= 0;

  const units = useMemo(
    () => [
      { label: "Days", value: timeLeft.days },
      { label: "Hours", value: timeLeft.hours },
      { label: "Minutes", value: timeLeft.minutes },
      { label: "Seconds", value: timeLeft.seconds },
    ],
    [timeLeft],
  );

  return (
    <section
      id="countdown"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#02060A" }}
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 35%, rgba(0,173,238,0.14), transparent 65%)",
        }}
      />
      {/* faint grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,173,238,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,173,238,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* framed heading */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-2">
          <span
            className="h-px flex-1 max-w-[120px] md:max-w-[220px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,173,238,0.7))",
            }}
          />
          <span
            className="h-1.5 w-1.5 rounded-full shrink-0"
            style={{
              background: ACCENT,
              boxShadow: "0 0 10px rgba(0,173,238,0.9)",
            }}
          />
          <span
            className="h-px flex-1 max-w-[120px] md:max-w-[220px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,173,238,0.7), transparent)",
            }}
          />
        </div>

        <h2
          className="font-extrabold uppercase text-[11vw] sm:text-5xl md:text-6xl lg:text-7xl leading-none"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: "#f2fbff",
            letterSpacing: "0.02em",
            textShadow:
              "0 0 14px rgba(0,173,238,0.4), 0 0 45px rgba(0,173,238,0.2), 0 6px 18px rgba(0,0,0,0.6)",
          }}
        >
          {isLive ? "Registration Closed" : countdownConfig.heading}
        </h2>

        <div className="flex items-center justify-center mt-2">
          <span
            className="h-px w-full max-w-xs md:max-w-sm"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,173,238,0.6), transparent)",
            }}
          />
        </div>

        {/* subtitle */}
        <p
          className="mt-8 text-sm md:text-base tracking-[0.15em] uppercase font-medium"
          style={{
            color: "#8fd9f5",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {countdownConfig.subtitle}
        </p>

        {/* countdown clock */}
        {!isLive && (
          <div
            className="mt-10 inline-flex items-center justify-center rounded-2xl px-5 py-6 sm:px-8 sm:py-7 md:px-12 md:py-8"
            style={{
              background:
                "linear-gradient(155deg, rgba(0,173,238,0.14), rgba(2,6,10,0.5) 65%)",
              border: "1px solid rgba(0,173,238,0.3)",
              boxShadow:
                "0 0 42px rgba(0,173,238,0.18), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {units.map((u, i) => (
              <div key={u.label} className="flex items-start">
                <div className="flex flex-col items-center px-2 sm:px-3 md:px-4">
                  <span
                    className="font-bold tabular-nums text-3xl sm:text-4xl md:text-5xl leading-none text-white"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      textShadow:
                        "0 0 10px rgba(0,173,238,0.55), 0 0 30px rgba(0,173,238,0.25)",
                    }}
                  >
                    {pad(u.value)}
                  </span>
                  <span
                    className="mt-3 text-[9px] sm:text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#6fa9c2]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {u.label}
                  </span>
                </div>
                {i < units.length - 1 && (
                  <span
                    className="text-2xl sm:text-3xl md:text-4xl font-bold leading-none select-none"
                    style={{
                      color: ACCENT,
                      textShadow: "0 0 10px rgba(0,173,238,0.8)",
                      animation: "clockColonBlink 1s steps(1) infinite",
                    }}
                  >
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* note */}
        <p
          className="mt-10 mx-auto max-w-md text-xs md:text-sm leading-relaxed text-[#5f7d8a]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {countdownConfig.note}
        </p>
      </div>
    </section>
  );
}
