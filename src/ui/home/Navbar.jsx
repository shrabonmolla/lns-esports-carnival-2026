import { useState, useEffect } from "react";

/* ==================================================
   CONFIGURABLE CONTENT
   ================================================== */
const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const ACCENT = "#00adee";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [logoOk, setLogoOk] = useState(true);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Space+Grotesk:wght@400;500;600&display=swap";
    document.head.appendChild(link);

    const prevScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";

    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      document.head.removeChild(link);
      document.documentElement.style.scrollBehavior = prevScrollBehavior;
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Highlight the link for whichever section is currently in view
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
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
        {/* Logo */}
        <a
          href="#home"
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
            ESPORTS<span style={{ color: ACCENT }}>CARNIVAL</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul
          className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className="group relative text-sm font-medium transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
                  style={{
                    color: isActive ? "#ffffff" : "#cfeaf6",
                    outlineColor: ACCENT,
                  }}
                >
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
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#registration"
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
        </a>

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
          maxHeight: open ? "360px" : "0px",
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
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active === link.id ? "page" : undefined}
                className="text-base font-medium transition-colors"
                style={{ color: active === link.id ? "#ffffff" : "#cfeaf6" }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#registration"
              onClick={() => setOpen(false)}
              className="inline-flex items-center px-8 py-3 rounded-md text-sm font-semibold text-[#02060A] transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #5fe2ff, #00adee)",
                boxShadow: "0 0 18px rgba(0,173,238,0.5)",
              }}
            >
              Registration
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
