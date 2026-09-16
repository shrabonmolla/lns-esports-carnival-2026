import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";

/* ==================================================
   CONFIGURABLE CONTENT
   ================================================== */
const navLinks = [
  { label: "Home", to: "/", end: true },
  { label: "Esports", to: "/esports", end: false },
  { label: "About", to: "/about", end: false },
  { label: "Contact", to: "/contact", end: false },
];

const ACCENT = "#00adee";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoOk, setLogoOk] = useState(true);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Space+Grotesk:wght@400;500;600&display=swap";
    document.head.appendChild(link);

    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      document.head.removeChild(link);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-black">
      <nav
        className="relative flex items-center justify-between px-5 md:px-10 transition-all duration-300"
        style={{
          height: scrolled ? "64px" : "76px",
          backgroundColor: "rgba(3,11,18,0.65)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: `1px solid ${
            scrolled ? "rgba(0,173,238,0.22)" : "rgba(0,173,238,0.1)"
          }`,
          boxShadow: scrolled ? "0 8px 30px rgba(0,0,0,0.35)" : "none",
        }}
      >
        {/* Logo — always returns to the home route */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
          style={{ outlineColor: ACCENT }}
        >
          {logoOk ? (
            <img
              src="/logo.png"
              alt="Esports Carnival logo"
              className="h-9 w-9 md:h-10 md:w-10 object-contain"
              style={{ filter: "drop-shadow(0 0 8px rgba(0,173,238,0.45))" }}
              onError={() => setLogoOk(false)}
            />
          ) : (
            <span
              className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border text-xs font-bold"
              style={{
                borderColor: "rgba(0,173,238,0.4)",
                color: ACCENT,
                fontFamily: "'Orbitron', sans-serif",
                boxShadow: "0 0 10px rgba(0,173,238,0.35)",
              }}
            >
              EC
            </span>
          )}
          <span
            className="hidden sm:block text-sm md:text-base font-bold tracking-wide text-[#eaf6ff]"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Last Night Scholars - JnU
          </span>
        </Link>

        {/* Desktop links */}
        <ul
          className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                end={link.end}
                className="group relative text-sm font-medium transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#cfeaf6",
                  outlineColor: ACCENT,
                })}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-[2px] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                      style={{
                        background: ACCENT,
                        boxShadow: "0 0 8px rgba(0,173,238,0.8)",
                      }}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          to="/esports"
          className="hidden md:inline-flex items-center px-6 py-2.5 rounded-md text-sm font-semibold text-[#02060A] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: "linear-gradient(135deg, #5fe2ff, #00adee)",
            boxShadow: "0 0 16px rgba(0,173,238,0.45)",
            outlineColor: ACCENT,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 28px rgba(0,173,238,0.75)";
            e.currentTarget.style.transform = "translateY(-1px) scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 16px rgba(0,173,238,0.45)";
            e.currentTarget.style.transform = "translateY(0) scale(1)";
          }}
        >
          Registration
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative h-9 w-9 flex flex-col items-center justify-center gap-[5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
          style={{ outlineColor: ACCENT }}
        >
          <span
            className="block h-[2px] w-6 rounded-full transition-all duration-300"
            style={{
              background: "#eaf6ff",
              transform: open ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-[2px] w-6 rounded-full transition-all duration-300"
            style={{ background: "#eaf6ff", opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-[2px] w-6 rounded-full transition-all duration-300"
            style={{
              background: "#eaf6ff",
              transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: open ? "420px" : "0px",
          backgroundColor: "rgba(3,11,18,0.85)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: open ? "1px solid rgba(0,173,238,0.22)" : "none",
        }}
      >
        <ul
          className="flex flex-col items-center gap-6 py-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className="text-base font-medium transition-colors"
                style={({ isActive }) => ({
                  color: isActive ? "#ffffff" : "#cfeaf6",
                })}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/esports"
              onClick={() => setOpen(false)}
              className="inline-flex items-center px-8 py-3 rounded-md text-sm font-semibold text-[#02060A] transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #5fe2ff, #00adee)",
                boxShadow: "0 0 18px rgba(0,173,238,0.5)",
              }}
            >
              Registration
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
