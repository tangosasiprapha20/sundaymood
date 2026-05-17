import { Sparkles, Cherry } from "lucide-react";

const grainSvg =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Login({ setIsLoggedIn = () => {} }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#ffe4ec] via-[#fff0f5] to-[#fce7f3] px-5 py-12 font-sans text-left antialiased">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(190 24 93 / 0.08) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
        style={{ backgroundImage: grainSvg }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#fda4af]/35 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-[#c4b5fd]/25 blur-3xl"
        aria-hidden
      />

      <div className="relative w-full max-w-md rounded-[1.85rem_2.2rem_2rem_1.9rem] border-2 border-dashed border-[#f9a8d4] bg-white p-8 text-center shadow-[8px_8px_0_0_rgba(190,24,93,0.12)] md:p-10">
        <div className="pointer-events-none absolute -right-1 top-8 h-12 w-20 rotate-[10deg] rounded-2xl bg-[#bbf7d0]/80 ring-1 ring-[#86efac]/50" aria-hidden />
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#fbcfe8] bg-gradient-to-br from-[#fda4af] to-[#f472b6] text-white shadow-[3px_3px_0_0_rgba(244,114,182,0.35)]">
          <Cherry className="h-9 w-9" strokeWidth={2} />
        </div>

        <p className="inline-flex items-center gap-1.5 rounded-full border border-[#fbcfe8] bg-[#fdf2f8] px-3 py-1 font-craft text-xs font-bold tracking-wide text-[#be185d]">
          <Sparkles className="h-3.5 w-3.5 text-[#ec4899]" strokeWidth={1.75} aria-hidden />
          Sunday Berry
        </p>

        <h1 className="font-craft mt-5 text-2xl font-bold leading-snug text-[#4a1528] md:text-3xl">
          ร้านผลไม้เบอร์รี่
        </h1>
        <p className="mt-2 font-craft text-sm text-[#db2777]">🍓 สดหวานทุกวัน 🫐</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#6b3d52]">
          สตรอว์เบอร์รี่ บลูเบอร์รี่ ราสเบอร์รี่ และเบอร์รี่พรีเมียมอีกมากมาย
          — เข้ามาเลือกแล้วหยิบใส่ตะกร้าได้เลยค่ะ
        </p>

        <button
          type="button"
          onClick={() => setIsLoggedIn(true)}
          className="font-craft mt-8 w-full rounded-2xl border-2 border-[#be185d] bg-[#be185d] py-4 text-sm font-bold tracking-wide text-white shadow-[4px_4px_0_0_rgba(253,164,175,0.55)] transition hover:bg-white hover:text-[#be185d]"
        >
          เข้าชมร้านเบอร์รี่
        </button>
      </div>
    </div>
  );
}
