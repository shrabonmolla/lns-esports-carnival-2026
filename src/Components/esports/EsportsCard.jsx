const ACCENT = "#00adee";

/**
 * A single futuristic glass-panel card for one esports game.
 * Renders the game identifier, a placeholder visual (initials),
 * info badges, description, status, and a register button.
 */
export default function EsportsCard({ game, index }) {
  const isOpen = game.status === "Registration Open";
  const orderLabel = `GAME // ${String(index + 1).padStart(2, "0")}`;

  return (
    <div
      className="group relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 sm:p-7"
      style={{
        background: "rgba(6, 19, 28, 0.55)",
        borderColor: "rgba(0, 173, 238, 0.18)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 0 1px ${ACCENT}66, 0 0 32px 0 ${ACCENT}26`,
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative mb-5">
        <p
          className="mb-2 text-[11px] tracking-[0.2em]"
          style={{
            color: `${ACCENT}99`,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {orderLabel}
        </p>
        <h3
          className="break-words text-2xl leading-tight text-white sm:text-[1.7rem]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {game.name}
        </h3>
      </div>

      {/* Visual placeholder */}
      <div className="relative mb-6 flex items-center justify-center">
        <div
          className="relative flex h-28 w-28 items-center justify-center rounded-full transition-transform duration-300 ease-out group-hover:scale-105 sm:h-32 sm:w-32"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(0,173,238,0.20), rgba(6,19,28,0.4) 70%)",
            border: `1px solid ${ACCENT}40`,
          }}
        >
          {/* Outer ring */}
          <div
            className="absolute inset-[-8px] rounded-full"
            style={{ border: `1px solid ${ACCENT}22` }}
          />
          {/* Corner accents */}
          <span
            className="absolute left-0 top-0 h-3 w-3 -translate-x-1 -translate-y-1 border-l"
            style={{
              borderColor: `${ACCENT}80`,
              borderTopWidth: 1,
              borderTopStyle: "solid",
            }}
          />
          <span
            className="absolute right-0 bottom-0 h-3 w-3 translate-x-1 translate-y-1 border-r"
            style={{
              borderColor: `${ACCENT}80`,
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
            }}
          />
          <span
            className="text-xl font-bold tracking-wide text-white sm:text-2xl"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              textShadow: `0 0 18px ${ACCENT}80`,
            }}
          >
            {game.shortName}
          </span>
        </div>
      </div>

      {/* Info badges */}
      <div className="relative mb-4 flex flex-wrap items-center justify-center gap-2">
        <Badge label={game.category} />
        <Badge label={game.mode} />
      </div>

      {/* Description */}
      <p
        className={`relative text-center text-sm leading-relaxed text-slate-400 ${
          game.entryFee ? "mb-3" : "mb-6"
        }`}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {game.description}
      </p>

      {/* Entry fee */}
      {game.entryFee && (
        <p
          className="relative mb-6 text-center text-xs tracking-wide"
          style={{
            color: `${ACCENT}cc`,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Entry fee: {game.entryFee}
        </p>
      )}

      {/* Status */}
      <div className="relative mb-6 flex items-center justify-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{
            backgroundColor: isOpen ? ACCENT : "#64748b",
            boxShadow: isOpen ? `0 0 8px 2px ${ACCENT}99` : "none",
          }}
        />
        <span
          className="text-xs tracking-wide"
          style={{
            color: isOpen ? "#e2f6ff" : "#94a3b8",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {game.status}
        </span>
      </div>

      {/* Register button — pinned to bottom of card */}
      <div className="relative mt-auto">
        {isOpen ? (
          <a
            href={game.formLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg px-5 py-3 text-center text-sm font-semibold tracking-wide text-[#02060A] transition-all duration-300 ease-out hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, #7fe3ff)`,
              boxShadow: `0 0 16px 0 ${ACCENT}55`,
              outlineColor: ACCENT,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            aria-label={`Register now for ${game.name} (opens registration form in a new tab)`}
          >
            REGISTER NOW
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="w-full cursor-not-allowed rounded-lg border px-5 py-3 text-sm font-semibold tracking-wide text-slate-500"
            style={{
              borderColor: "rgba(148, 163, 184, 0.25)",
              background: "rgba(148, 163, 184, 0.06)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            aria-label={`Registration coming soon for ${game.name}`}
          >
            COMING SOON
          </button>
        )}
      </div>
    </div>
  );
}

function Badge({ label }) {
  const ACCENT = "#00adee";
  return (
    <span
      className="rounded-full px-3 py-1 text-[11px] tracking-wide text-slate-300"
      style={{
        border: `1px solid ${ACCENT}33`,
        background: "rgba(0, 173, 238, 0.06)",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {label}
    </span>
  );
}
