import { Link } from "react-router";
import EsportsBackground from "../Components/esports/EsportsBackground";
import EsportsCard from "../Components/esports/EsportsCard";

const ACCENT = "#00adee";

// Replace this array with real data from your backend later.
// Keep the shape the same and EsportsCard will keep working as-is.
// - image: URL to a square/round logo or icon for the game (dummy for now)
// - entryFee: shown as plain text on the card, e.g. "Free" or "৳500 / team"
// - formLink: the Google Form URL the REGISTER NOW button opens (new tab)
const esportsGames = [
  {
    id: 1,
    name: "VALORANT",
    image: "https://i.ibb.co.com/gLNJjnR6/Valorant-Logo-PNG-Cutout.png",
    description:
      "Register your team for the Valorant 5v5 tournament at JnU Esports Carnival 2026.",
    category: "PC",
    mode: "5v5",
    status: "Registration Open",
    entryFee: "৳1000 / team",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdwVGU8uW-12TQIqUvBMhvwDA6u9Oj6o77f6hp9fW8fHZGzhA/viewform?usp=dialog",
  },

  {
    id: 2,
    name: "PUBG MOBILE",
    image: "https://i.ibb.co.com/Xrvv1Hkv/pubg-mobile-seeklogo.png",
    description:
      "Showcase your strategy, teamwork, and combat skills as you fight your way to the top.",
    category: "Mobile",
    mode: "Squad",
    status: "Registration Open",
    entryFee: "৳500 / team",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSdCaMJHSIWUtzHnrk83Z6iS-zUWpsNFZ99I7vPqNokKOO4XqA/viewform?usp=dialog",
  },

  {
    id: 3,
    name: "FREE FIRE",
    image: "https://i.ibb.co.com/HTV74MVB/Free-Fire.png",
    description:
      "Get ready for the Free Fire segment of JnU Esports Carnival 2026.",
    category: "Mobile",
    mode: "Squad",
    status: "Coming Soon",
    entryFee: "৳ 0 / JnU Campus Student",
    formLink: "#",
  },

  {
    id: 4,
    name: "FIFA",
    image: "https://i.ibb.co.com/pjFRfNj0/FIFA-Console.png",
    description:
      "Compete in the FIFA Console segment and battle your way to the top as a solo player.",
    category: "Console",
    mode: "1v1",
    status: "Registration Open",
    entryFee: "৳250 / player",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSc8gm02EI7B3ni8hMp8Ex9_gzRBMdq4Vx4x-S2lafRPWfx8WA/viewform?usp=dialog",
  },

  {
    id: 5,
    name: "ONLINE CHESS",
    image: "https://i.ibb.co.com/v6jmQTz8/Chess-Set.jpg",
    description:
      "Compete in the JnU E-Sports Carnival 2026 Chess Championship and battle your way to the top.",
    category: "Online",
    mode: "1v1",
    status: "Registration Open",
    entryFee: "৳100 / player",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSc15AxwkjXzNuWvbWlUiNDooVfhCtjDUnyaQanhqFZgFo6McA/viewform?usp=dialog",
  },

  {
    id: 6,
    name: "MOBILE LEGENDS",
    image: "https://i.ibb.co.com/whryxw32/Mobile-Legends.png",
    description:
      "Compete in the Mobile Legends: Bang Bang 5v5 university tournament at JnU Esports Carnival 2026.",
    category: "Mobile",
    mode: "5v5",
    status: "Registration Open",
    entryFee: "৳500 / team",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfHlbeFXq9e3D9IfKWSbU3tP1PLbJSA-ZrxK55Ld4r4Eh_omw/viewform?usp=dialog",
  },

  {
    id: 7,
    name: "EFOOTBALL",
    image: "https://i.ibb.co.com/XZ3ZrdT6/E-Football.png",
    description:
      "Compete as a solo player in the eFootball segment of JnU E-Sports Carnival 2026.",
    category: "Mobile",
    mode: "1v1",
    status: "Registration Open",
    entryFee: "৳100 / player",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSciH-pdRHR4eexz1VmfZlMlnazEyuWTHlgTPHKrMw2KUdKyQQ/viewform?usp=dialog",
  },

  {
    id: 8,
    name: "CLASH ROYALE",
    image: "https://i.ibb.co.com/b55cfLVK/Clash-Royale.png",
    description:
      "Compete in the Clash Royale Championship of JnU E-Sports Carnival 2026.",
    category: "Mobile",
    mode: "1v1",
    status: "Registration Open",
    entryFee: "৳100 / player",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLScYGVugdTESIUbyfYUxRa1ex7c91RJjnGHzuJwrdug-dB3U_g/viewform?usp=dialog",
  },

  {
    id: 9,
    name: "RUBIK'S CUBE",
    image: "https://i.ibb.co.com/9mRzt2nD/Rubiks-Cube.png",
    description:
      "Register for the University Speedcubing Championship and compete to solve the cube with speed and accuracy.",
    category: "Offline",
    mode: "Solo",
    status: "Registration Open",
    entryFee: "৳100 / player",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfJQGSPuupd10M8rqjNoCUYlXGkJiNVqeQlFUdFzAtwFfI-4g/viewform?usp=dialog",
  },
];

export default function Esports() {
  return (
    <div className="relative min-h-screen">
      <EsportsBackground />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-8 sm:pt-10">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            outlineColor: ACCENT,
          }}
        >
          <span aria-hidden="true">←</span> BACK TO HOME
        </Link>

        {/* Page header */}
        <header className="mx-auto mt-10 max-w-2xl text-center sm:mt-16">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className="h-px w-8"
              style={{
                background: `linear-gradient(90deg, transparent, ${ACCENT})`,
              }}
              aria-hidden="true"
            />
            <p
              className="text-xs tracking-[0.25em] text-slate-400"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ESPORTS CARNIVAL 2026
            </p>
            <span
              className="h-px w-8"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
              }}
              aria-hidden="true"
            />
          </div>

          <h1
            className="text-4xl leading-tight text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            CHOOSE YOUR
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, #ffffff, ${ACCENT})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              GAME
            </span>
          </h1>

          <p
            className="mx-auto mt-5 max-w-md text-sm text-slate-400 sm:text-base"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Enter the arena. Pick your battlefield. Become a champion.
          </p>
        </header>

        {/* Game cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {esportsGames.map((game, index) => (
            <EsportsCard key={game.id} game={game} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
