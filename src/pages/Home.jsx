import { useMemo, useState } from "react";
import { Sparkles, Leaf } from "lucide-react";
import ShopShell from "../components/ShopShell.jsx";

const CATEGORY_LABELS = {
  all: "ทั้งหมด",
  fresh: "สดใหม่",
  frozen: "แช่แข็ง",
  dried: "อบแห้ง",
  gift: "ของขวัญ",
};

export default function Home({
  products = [],
  comingSoon = [],
  addToCart = () => {},
  cart = [],
  setIsLoggedIn = () => {},
}) {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    if (!Array.isArray(products)) return [];
    if (category === "all") return products;
    return products.filter((p) => p.category === category);
  }, [products, category]);

  return (
    <ShopShell cart={cart} setIsLoggedIn={setIsLoggedIn}>
      <main className="space-y-10 md:space-y-14">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <section className="space-y-6 lg:col-span-4 lg:sticky lg:top-24">
            <div
              className="relative overflow-hidden rounded-[1.75rem_2.25rem_2rem_1.85rem] border-2 border-dashed border-[#f9a8d4] bg-white p-7 shadow-[6px_6px_0_0_rgba(190,24,93,0.12)] md:p-8"
              style={{
                backgroundImage:
                  "linear-gradient(165deg, rgba(255,255,255,0.98) 0%, rgba(255,240,245,0.98) 55%, rgba(252,231,243,0.5) 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-2 top-6 h-14 w-24 rotate-[8deg] rounded-2xl bg-[#bbf7d0]/70 shadow-sm ring-1 ring-[#86efac]/60"
                aria-hidden
              />
              <div
                className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#fda4af]/35 blur-2xl"
                aria-hidden
              />
              <p className="inline-flex items-center gap-2 rounded-full border border-[#fbcfe8] bg-[#fdf2f8] px-3 py-1.5 font-craft text-xs font-bold tracking-wide text-[#be185d]">
                <Leaf
                  className="h-3.5 w-3.5 text-[#16a34a]"
                  strokeWidth={2}
                  aria-hidden
                />
                fresh & fruity
              </p>
              <h1 className="font-craft mt-5 text-3xl font-bold leading-[1.2] tracking-wide text-[#4a1528] md:text-[2.35rem]">
                ผลไม้เบอร์รี่
                <span className="mt-2 block font-craft text-[1.35rem] font-semibold text-[#be185d] md:text-2xl">
                  สด · หวาน · ส่งถึงบ้าน
                </span>
              </h1>
              <p className="mt-2 text-center font-craft text-sm text-[#db2777]">
                🍓 · 🫐 · 🍒
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#6b3d52] md:text-base">
                คัดเบอร์รี่สดจากแหล่งที่เชื่อถือได้ ส่งตรงถึงมือคุณทุกวันอาทิตย์
                เลือกหมวดแล้วหยิบใส่ตะกร้าได้เลยค่ะ
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rotate-[-1deg] rounded-2xl border-2 border-[#fda4af] bg-[#fff1f2] px-3 py-1.5 font-craft text-xs font-bold text-[#be185d] shadow-sm">
                  สดจากฟาร์ม
                </span>
                <span className="rotate-[1deg] rounded-2xl border-2 border-[#c4b5fd] bg-[#f5f3ff] px-3 py-1.5 font-craft text-xs font-bold text-[#6d28d9] shadow-sm">
                  ส่งเย็นทั่วกรุงเทพ
                </span>
              </div>
            </div>

            <div className="rounded-[1.6rem_2rem_1.8rem_2rem] border-2 border-[#fbcfe8] bg-white p-5 shadow-[4px_4px_0_0_rgba(244,114,182,0.2)]">
              <p className="font-craft text-sm font-bold tracking-wide text-[#be185d]">
                เลือกหมวด
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                {Object.entries(CATEGORY_LABELS).map(([key, label], i) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key)}
                    className={`flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${
                      category === key
                        ? "border-[#be185d] bg-[#be185d] text-white shadow-[3px_3px_0_0_rgba(157,23,77,0.25)]"
                        : `border-[#fce7f3] bg-[#fff5f9] text-[#4a1528] shadow-sm hover:border-[#f9a8d4] hover:bg-white ${i % 2 === 1 ? "translate-x-0.5" : ""}`
                    }`}
                  >
                    <span className={category === key ? "" : "font-craft"}>
                      {label}
                    </span>
                    {category === key ? (
                      <span className="font-craft text-xs text-[#fbcfe8]">
                        เลือกอยู่
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[#be185d] bg-gradient-to-br from-[#9d174d] to-[#831843] p-6 text-white shadow-[5px_5px_0_0_rgba(253,164,175,0.5)]">
              <p className="font-craft text-sm font-semibold tracking-wide text-[#fbcfe8]">
                แพ็กสดใส
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#fce7f3]">
                ห่อกล่องโฟมเย็นก่อนส่ง — อยากปรับน้ำหนักหรือสอบถามสต็อก
                ทักมาที่หน้าติดต่อได้เลยนะคะ
              </p>
            </div>
          </section>

          <div className="space-y-10 lg:col-span-8">
            {Array.isArray(comingSoon) && comingSoon.length > 0 && (
              <section aria-labelledby="coming-soon-heading">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2
                      id="coming-soon-heading"
                      className="font-craft text-xl font-bold text-[#4a1528] md:text-2xl"
                    >
                      เร็วๆ นี้
                    </h2>
                    <p className="mt-1 max-w-xl text-sm text-[#6b3d52]">
                      เบอร์รี่ตัวใหม่ที่กำลังจะเข้า — แตะการ์ดอ่านรายละเอียด
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-2xl border-2 border-[#fbcfe8] bg-[#fdf2f8] px-3 py-1.5 font-craft text-xs font-bold text-[#be185d]">
                    <Sparkles
                      className="h-3.5 w-3.5 text-[#ec4899]"
                      strokeWidth={1.75}
                    />
                    soon
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {comingSoon.map((item, idx) => (
                    <article
                      key={item.id}
                      className={`overflow-hidden rounded-[1.65rem_2rem_1.85rem_2rem] border-2 border-[#fbcfe8] bg-white shadow-[5px_6px_0_0_rgba(190,24,93,0.12)] ring-1 ring-[#fce7f3]/60 ${
                        idx % 2 === 1 ? "sm:translate-y-2" : ""
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full">
                        <img
                          src={item.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#4a1528]/60 via-transparent to-transparent" />
                        <span className="font-craft absolute left-3 top-3 rounded-xl border border-white/90 bg-white/95 px-3 py-1 text-xs font-bold text-[#4a1528] shadow-sm">
                          {item.eta}
                        </span>
                      </div>
                      <div className="space-y-1 p-4">
                        <h3 className="font-craft text-lg font-bold text-[#4a1528]">
                          {item.name}
                        </h3>
                        {item.teaser ? (
                          <p className="text-sm text-[#6b3d52]">{item.teaser}</p>
                        ) : null}
                        <p className="pt-2 text-[11px] font-semibold uppercase tracking-wider text-[#db2777]">
                          ยังไม่พร้อมสั่งออนไลน์
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <section aria-labelledby="shop-heading">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#be185d] bg-[#fdf2f8] text-xl shadow-[3px_3px_0_0_rgba(190,24,93,0.2)]">
                    🍓
                  </span>
                  <div>
                    <h2
                      id="shop-heading"
                      className="font-craft text-xl font-bold text-[#4a1528] md:text-2xl"
                    >
                      {category === "all"
                        ? "พร้อมส่งวันนี้"
                        : CATEGORY_LABELS[category]}
                    </h2>
                    <p className="text-sm text-[#6b3d52]">
                      {filtered.length} รายการ · สดใหม่ทุกวัน
                    </p>
                  </div>
                </div>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
                  {filtered.map((product, i) => (
                    <article
                      key={product.id}
                      className={`flex flex-col overflow-hidden rounded-[1.7rem_2.1rem_1.9rem_1.75rem] border-2 border-[#fbcfe8] bg-white shadow-[5px_6px_0_0_rgba(190,24,93,0.08)] transition hover:-translate-y-0.5 hover:border-[#f9a8d4] hover:shadow-[6px_7px_0_0_rgba(244,114,182,0.2)] ${
                        i % 3 === 1
                          ? "md:rotate-[0.35deg]"
                          : i % 3 === 2
                            ? "md:-rotate-[0.3deg]"
                            : ""
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="aspect-[4/5] w-full object-cover"
                        />
                        <span className="font-craft absolute bottom-3 left-3 rounded-xl border border-[#fbcfe8]/80 bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[#be185d] shadow-sm">
                          {CATEGORY_LABELS[product.category] ?? "เบอร์รี่"}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col space-y-3 p-4">
                        <h3 className="font-craft text-base font-bold leading-snug text-[#4a1528]">
                          {product.name}
                        </h3>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                          <span className="text-lg font-bold tabular-nums text-[#be185d]">
                            ฿{product.price}
                          </span>
                          <button
                            type="button"
                            onClick={() => addToCart(product)}
                            className="font-craft rounded-2xl border-2 border-[#be185d] bg-[#be185d] px-4 py-2 text-xs font-bold tracking-wide text-white shadow-[2px_2px_0_0_rgba(253,164,175,0.6)] transition hover:bg-white hover:text-[#be185d]"
                          >
                            หยิบใส่ตะกร้า
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border-2 border-dashed border-[#fbcfe8] bg-white/90 py-12 text-center text-sm text-[#be185d]">
                  ไม่มีสินค้าในหมวดนี้ค่ะ
                </p>
              )}
            </section>
          </div>
        </div>
      </main>
    </ShopShell>
  );
}
