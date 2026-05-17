import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import ShopShell from "../components/ShopShell.jsx";

const steps = [
  {
    n: 1,
    title: "เลือกเบอร์รี่ที่ชอบ",
    body: "ที่หน้าแรกแบ่งหมวดสดใหม่ แช่แข็ง อบแห้ง และของขวัญ — กดหยิบใส่ตะกร้าได้เลย",
  },
  {
    n: 2,
    title: "ตรวจตะกร้า",
    body: "ตรวจรายการและยอดรวม ลบรายการที่ไม่เอาได้ หากอยากเพิ่มจำนวนกลับไปหน้าแรกแล้วกดหยิบอีกครั้ง",
  },
  {
    n: 3,
    title: "กรอกที่อยู่และชำระเงิน",
    body: "กรอกชื่อ เบอร์โทร และที่อยู่จัดส่ง จากนั้นเปิด QR พร้อมเพย์ โอนแล้วแจ้งสลิปทาง Line หรือ Instagram",
  },
  {
    n: 4,
    title: "ดูประวัติออเดอร์",
    body: "ดูรายการได้ที่เมนูออเดอร์ สามารถลบออกจากประวัติได้เมื่อไม่ต้องการเก็บแล้ว",
  },
];

export default function About({
  cart = [],
  setIsLoggedIn = () => {},
}) {
  return (
    <ShopShell cart={cart} setIsLoggedIn={setIsLoggedIn}>
      <div className="mx-auto max-w-2xl space-y-10">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-[#fbcfe8] bg-white p-8 shadow-[6px_8px_0_0_rgba(190,24,93,0.1)] md:p-10">
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-[#fda4af]/40 blur-2xl" aria-hidden />
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[#f9a8d4] bg-[#fdf2f8] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#be185d]">
            <BookOpen className="h-4 w-4" aria-hidden />
            About
          </span>
          <h1 className="font-craft mt-4 text-3xl font-bold tracking-wide text-[#4a1528] md:text-4xl">
            เกี่ยวกับเรา
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#6b3d52] md:text-base">
            <span className="font-bold text-[#4a1528]">Sunday Berry</span>{" "}
            คือร้านผลไม้เบอร์รี่ที่คัดสดทุกวันอาทิตย์
            เน้นความหวานกรอบ ส่งเย็นถึงบ้านในกรุงเทพและปริมณฑล
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#6b3d52] md:text-base">
            เราอยากให้ทุกวันมีรสชาติผลไม้สดใหม่ที่ทำให้ยิ้มได้
            หากสนใจเบอร์รี่ตัวใหม่ที่กำลังจะเข้า แจ้งทางช่องทางติดต่อได้
            เราจะแจ้งเมื่อของเข้าหรือช่วยจองล่วงหน้า
          </p>
        </div>

        <div>
          <h2 className="font-craft text-xl font-bold text-[#4a1528] md:text-2xl">
            วิธีใช้งานเว็บ
          </h2>
          <p className="mt-2 text-sm text-[#6b3d52] md:text-base">
            เส้นไทม์ไลน์สั้นๆ — อ่านทีละขั้นแล้วไปต่อได้เลย
          </p>

          <ol className="relative mt-8 space-y-0 pl-0">
            <div
              className="absolute left-[1.125rem] top-4 bottom-4 w-0.5 border-l-2 border-dashed border-[#fbcfe8] md:left-5"
              aria-hidden
            />
            {steps.map((s) => (
              <li
                key={s.n}
                className="relative flex gap-5 pb-10 last:pb-0"
              >
                <span
                  className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border-2 border-[#be185d] bg-[#be185d] text-sm font-black text-white shadow-md md:h-11 md:w-11 md:text-base"
                  aria-hidden
                >
                  {s.n}
                </span>
                <div className="min-w-0 flex-1 rounded-[1.5rem] border-2 border-[#fbcfe8] bg-white p-5 shadow-sm">
                  <h3 className="font-craft font-bold text-[#4a1528]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b3d52] md:text-base">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[1.75rem] border-2 border-dashed border-[#f9a8d4] bg-[#fdf2f8] p-6">
          <p className="text-sm font-bold text-[#6b3d52]">ลิงก์ด่วน</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/home"
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-full border-2 border-[#be185d] bg-[#be185d] px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_rgba(253,164,175,0.45)] transition hover:bg-white hover:text-[#be185d]"
            >
              กลับหน้าแรก
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-w-[8.5rem] items-center justify-center rounded-2xl border-2 border-[#fbcfe8] bg-white px-5 py-2.5 text-sm font-bold text-[#4a1528] shadow-sm transition hover:border-[#f9a8d4]"
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </div>
    </ShopShell>
  );
}
