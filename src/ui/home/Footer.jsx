import { useEffect } from "react";
import { Link } from "react-router";

const ACCENT = "#00adee";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Esports", to: "/esports" },
  { label: "Contact", to: "/contact" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/lastnightscholars",
    icon: (
      <path d="M13.5 21v-7.7h2.6l.4-3h-3v-1.9c0-.9.2-1.5 1.5-1.5h1.6V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3H10V21h3.5Z" />
    ),
  },
  {
    label: "Facebook Group",
    href: "https://www.facebook.com/groups/520851837609125",
    icon: (
      <path d="M16.5 12.5a3 3 0 1 0-2.6-4.5 4.5 4.5 0 0 1 0 5.4c.2 0 .4.1.6.1a3 3 0 0 0 2-1Zm-6.5 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1.5c-2.3 0-6.5 1.2-6.5 3.5V19h13v-1.5c0-2.3-4.2-3.5-6.5-3.5Zm6.9.1c1.4.7 2.6 1.8 2.6 3.4V19h3v-1.5c0-1.9-2.6-3-5.6-3.4Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/last-night-scholars/",
    icon: (
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM20.45 20h-3.37v-6.1c0-1.46-.03-3.34-2.04-3.34-2.04 0-2.35 1.59-2.35 3.23V20H9.32V8.5h3.24v1.57h.05c.45-.86 1.56-1.77 3.2-1.77 3.43 0 4.06 2.25 4.06 5.18V20Z" />
    ),
  },
  {
    label: "X",
    href: "https://x.com/lnscholars",
    icon: (
      <path d="M18.9 3H22l-7.2 8.2L23.3 21h-6.6l-5.2-6.6L5.6 21H2.4l7.7-8.8L1.7 3h6.8l4.7 6.1L18.9 3Zm-1.2 16.2h1.8L7.4 4.7H5.5l12.2 14.5Z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/lnscholars/",
    icon: (
      <path d="M12 2.2c2.7 0 3 0 4 .1 1 0 1.7.2 2.1.4a4.2 4.2 0 0 1 1.5 1 4.2 4.2 0 0 1 1 1.5c.2.4.4 1.1.4 2.1.1 1 .1 1.3.1 4s0 3-.1 4c0 1-.2 1.7-.4 2.1a4.2 4.2 0 0 1-1 1.5 4.2 4.2 0 0 1-1.5 1c-.4.2-1.1.4-2.1.4-1 .1-1.3.1-4 .1s-3 0-4-.1c-1 0-1.7-.2-2.1-.4a4.2 4.2 0 0 1-1.5-1 4.2 4.2 0 0 1-1-1.5c-.2-.4-.4-1.1-.4-2.1-.1-1-.1-1.3-.1-4s0-3 .1-4c0-1 .2-1.7.4-2.1a4.2 4.2 0 0 1 1-1.5 4.2 4.2 0 0 1 1.5-1c.4-.2 1.1-.4 2.1-.4 1-.1 1.3-.1 4-.1Zm0 1.8c-2.6 0-2.9 0-4 .1-.8 0-1.2.2-1.5.3-.4.1-.6.3-.9.6-.3.3-.5.5-.6.9-.1.3-.3.7-.3 1.5-.1 1.1-.1 1.4-.1 4s0 2.9.1 4c0 .8.2 1.2.3 1.5.1.4.3.6.6.9.3.3.5.5.9.6.3.1.7.3 1.5.3 1.1.1 1.4.1 4 .1s2.9 0 4-.1c.8 0 1.2-.2 1.5-.3.4-.1.6-.3.9-.6.3-.3.5-.5.6-.9.1-.3.3-.7.3-1.5.1-1.1.1-1.4.1-4s0-2.9-.1-4c0-.8-.2-1.2-.3-1.5a1.7 1.7 0 0 0-.6-.9 1.7 1.7 0 0 0-.9-.6c-.3-.1-.7-.3-1.5-.3-1.1-.1-1.4-.1-4-.1Zm0 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.9-2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@lastnightscholars",
    icon: (
      <path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.7 4.7 12 4.7 12 4.7s-6.7 0-8.5.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 1.9c1.8.6 8.5.6 8.5.6s6.7 0 8.5-.6a2.8 2.8 0 0 0 2-1.9A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8ZM9.8 15.4V8.6l5.8 3.4-5.8 3.4Z" />
    ),
  },
];

export default function Footer() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Space+Grotesk:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#02060A" }}
    >
      {/* glowing top divider */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,173,238,0.6), transparent)",
        }}
      />
      {/* faint ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,173,238,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12 py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xs">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Esports Carnival logo"
                className="h-9 w-9 object-contain"
                style={{ filter: "drop-shadow(0 0 8px rgba(0,173,238,0.45))" }}
              />
              <span
                className="text-sm font-bold tracking-wide text-[#eaf6ff]"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Last Night Scholars - JnU
              </span>
            </Link>
            <p
              className="mt-4 text-sm text-[#8ba7b4] leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              An electrifying celebration of competitive gaming, hosted by Last
              Night Scholars (LNS).
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center md:items-start">
            <span
              className="text-xs tracking-[0.2em] font-medium mb-4"
              style={{
                color: "#6fa9c2",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              QUICK LINKS
            </span>
            <ul
              className="flex flex-col items-center md:items-start gap-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-[#cfeaf6] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center md:items-start">
            <span
              className="text-xs tracking-[0.2em] font-medium mb-4"
              style={{
                color: "#6fa9c2",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              CONNECT
            </span>
            <div className="flex flex-wrap items-center gap-3 max-w-[180px] md:max-w-none">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    borderColor: "rgba(0,173,238,0.25)",
                    backgroundColor: "rgba(0,173,238,0.06)",
                    outlineColor: ACCENT,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,173,238,0.8)";
                    e.currentTarget.style.boxShadow =
                      "0 0 14px rgba(0,173,238,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,173,238,0.25)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4.5 w-4.5"
                    style={{ width: 18, height: 18, fill: "#cfeaf6" }}
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t"
          style={{
            borderColor: "rgba(0,173,238,0.1)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          <p className="text-xs text-[#5f7d8a]">
            © {new Date().getFullYear()} Last Night Scholars - JnU. All rights
            reserved.
          </p>
          <p className="text-xs text-[#5f7d8a]">
            Organized by{" "}
            <span style={{ color: ACCENT }}>Last Night Scholars (LNS)</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
