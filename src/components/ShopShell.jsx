import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  LogOut,
  Cherry,
  BookOpen,
  Mail,
  ClipboardList,
} from "lucide-react";

const nav = [
  { to: "/home", label: "หน้าแรก", icon: Home },
  { to: "/about", label: "เกี่ยวกับ", icon: BookOpen },
  { to: "/contact", label: "ติดต่อ", icon: Mail },
  { to: "/orders", label: "ออเดอร์", icon: ClipboardList },
];

const grainSvg =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function NavLink({ to, label, icon: Icon, active }) {
  return (
    <Link
      to={to}
      title={label}
      aria-label={label}
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 transition-all md:h-12 md:w-12 ${
        active
          ? "border-[#be185d] bg-[#be185d] text-white shadow-[3px_3px_0_0_rgba(157,23,77,0.3)]"
          : "border-transparent bg-white/90 text-[#6b3d52] shadow-sm hover:border-[#f9a8d4] hover:bg-white hover:text-[#4a1528]"
      }`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </Link>
  );
}

function HeaderNavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`rounded-2xl px-3.5 py-2 text-sm font-semibold transition ${
        active
          ? "bg-[#be185d] text-white shadow-[2px_2px_0_0_rgba(190,24,93,0.35)]"
          : "text-[#6b3d52] hover:bg-white hover:text-[#4a1528]"
      }`}
    >
      {label}
    </Link>
  );
}

export default function ShopShell({
  children,
  cart = [],
  setIsLoggedIn = () => {},
}) {
  const { pathname } = useLocation();
  const count = Array.isArray(cart) ? cart.length : 0;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#ffe4ec] via-[#fff0f5] to-[#fce7f3] font-sans text-left text-[#4a1528] antialiased">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(190 24 93 / 0.08) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        aria-hidden
        style={{ backgroundImage: grainSvg }}
      />
      <div
        className="pointer-events-none fixed -left-28 top-16 h-80 w-80 rounded-full bg-[#fda4af]/35 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-20 bottom-24 h-72 w-72 rounded-full bg-[#c4b5fd]/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed left-1/2 top-1/4 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#bbf7d0]/20 blur-3xl"
        aria-hidden
      />

      <header className="sticky top-0 z-50 border-b-2 border-[#fbcfe8] bg-white/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-6">
            <Link
              to="/home"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-2xl border-2 border-dashed border-[#f9a8d4] bg-white px-3 py-2 pr-4 shadow-[3px_3px_0_0_rgba(190,24,93,0.12)] transition hover:border-[#ec4899]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#fda4af] to-[#f472b6] text-white transition group-hover:rotate-[-6deg] group-hover:scale-105">
                <Cherry className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="font-craft truncate text-lg font-bold tracking-wide text-[#4a1528] md:text-xl">
                Sunday Berry
              </span>
            </Link>

            <nav
              className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex"
              aria-label="เมนูหลัก"
            >
              {nav.map((item) => (
                <HeaderNavLink
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  active={pathname === item.to}
                />
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/cart"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#fbcfe8] bg-white text-[#4a1528] shadow-sm transition hover:-translate-y-0.5 hover:border-[#f472b6] hover:shadow-[3px_3px_0_0_rgba(244,114,182,0.25)]"
              aria-label="ตะกร้า"
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-lg bg-[#be185d] px-1 font-craft text-[11px] font-bold text-white">
                  {count > 9 ? "9+" : count}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              onClick={() => setIsLoggedIn(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#fbcfe8] bg-[#fdf2f8] text-[#6b3d52] transition hover:bg-white hover:text-[#4a1528]"
              title="ออกจากระบบ"
              aria-label="ออกจากระบบ"
            >
              <LogOut className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <nav
        className="pointer-events-none fixed bottom-8 left-6 z-40 hidden md:block"
        aria-label="เมนูลัด"
      >
        <div className="pointer-events-auto flex flex-col gap-2 rounded-3xl border-2 border-[#fbcfe8] bg-white/95 p-2 shadow-[4px_6px_0_0_rgba(190,24,93,0.1)] backdrop-blur-sm">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              {...item}
              active={pathname === item.to}
            />
          ))}
        </div>
      </nav>

      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-[#fbcfe8] bg-white/96 px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_32px_rgba(190,24,93,0.08)] backdrop-blur-md md:hidden"
        aria-label="เมนูหลัก"
      >
        <div className="mx-auto flex max-w-lg items-center justify-between gap-0.5 px-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              {...item}
              active={pathname === item.to}
            />
          ))}
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-28 pt-6 md:px-8 md:pb-12 md:pl-20">
        {children}
      </div>
    </div>
  );
}
