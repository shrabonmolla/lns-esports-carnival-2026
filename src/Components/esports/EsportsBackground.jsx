const ACCENT = "#00adee";

/**
 * Subtle futuristic backdrop for content pages.
 * Deliberately quieter than the landing page hero — this page's job
 * is to let the game cards be the focus, not to compete with them.
 */
export default function EsportsBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: "#02060A" }}
      aria-hidden="true"
    >
      {/* Faint cyan radial glow, top center */}
      <div
        className="absolute left-1/2 top-0 h-[60vh] w-[90vw] -translate-x-1/2"
        style={{
          background: `radial-gradient(ellipse at top, ${ACCENT}14 0%, transparent 65%)`,
        }}
      />

      {/* Second, dimmer glow lower on the page for depth */}
      <div
        className="absolute bottom-0 left-1/2 h-[40vh] w-[70vw] -translate-x-1/2 translate-y-1/3"
        style={{
          background: `radial-gradient(ellipse at bottom, ${ACCENT}0d 0%, transparent 70%)`,
        }}
      />

      {/* Faint perspective grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(${ACCENT}66 1px, transparent 1px),
            linear-gradient(90deg, ${ACCENT}66 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 90%)",
        }}
      />

      {/* Extremely subtle particles */}
      <div className="absolute inset-0 opacity-[0.15]">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: ACCENT,
              boxShadow: `0 0 ${p.size * 2}px ${ACCENT}`,
            }}
          />
        ))}
      </div>

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 40%, transparent 55%, #02060A 100%)",
        }}
      />

      {/* Optional subtle scanlines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
}

// Fixed positions so particles don't shift on every re-render.
const PARTICLES = [
  { id: 1, left: "8%", top: "12%", size: 2 },
  { id: 2, left: "22%", top: "68%", size: 1.5 },
  { id: 3, left: "35%", top: "30%", size: 2 },
  { id: 4, left: "48%", top: "80%", size: 1.5 },
  { id: 5, left: "61%", top: "18%", size: 2 },
  { id: 6, left: "74%", top: "55%", size: 1.5 },
  { id: 7, left: "86%", top: "25%", size: 2 },
  { id: 8, left: "92%", top: "70%", size: 1.5 },
  { id: 9, left: "15%", top: "88%", size: 1.5 },
  { id: 10, left: "55%", top: "5%", size: 1.5 },
];
