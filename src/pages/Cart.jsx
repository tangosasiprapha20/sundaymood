import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ShopShell from "../components/ShopShell.jsx";

export default function Cart({
  cart,
  removeFromCart,
  setIsLoggedIn = () => {},
}) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0
  );

  return (
    <ShopShell cart={cart} setIsLoggedIn={setIsLoggedIn}>
      <div className="mx-auto max-w-xl space-y-8">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#fbcfe8] bg-white px-4 py-2 text-sm font-bold text-[#6b3d52] shadow-sm transition hover:border-[#f9a8d4] hover:text-[#4a1528]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          เลือกสินค้าต่อ
        </Link>

        <div>
          <h1 className="font-craft text-3xl font-bold tracking-wide text-[#4a1528]">
            ตะกร้าของคุณ
          </h1>
          <p className="mt-2 text-sm text-[#6b3d52]">
            ตรวจรายการก่อนไปชำระเงิน
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-[#fbcfe8] bg-white/90 px-6 py-16 text-center shadow-inner">
            <p className="text-4xl">🍓</p>
            <p className="mt-4 text-[#6b3d52]">ยังไม่มีเบอร์รี่ในตะกร้า</p>
            <Link
              to="/home"
              className="font-craft mt-6 inline-flex rounded-2xl border-2 border-[#be185d] bg-[#be185d] px-6 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_rgba(253,164,175,0.5)] transition hover:bg-white hover:text-[#be185d]"
            >
              ไปเลือกเบอร์รี่
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className="flex gap-4 rounded-2xl border-2 border-[#fbcfe8] bg-white p-4 shadow-[4px_4px_0_0_rgba(190,24,93,0.08)]"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-28 w-28 shrink-0 rounded-2xl object-cover ring-2 ring-[#fce7f3]"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="font-craft font-bold text-[#4a1528]">{item.name}</h2>
                    <p className="mt-1 text-sm text-[#be185d]">
                      ฿{item.price}{" "}
                      <span className="text-[#db2777]">
                        × {item.quantity ?? 1}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart?.(item.id)}
                      className="mt-3 inline-flex rounded-2xl border-2 border-[#fce7f3] bg-[#fdf2f8] px-4 py-1.5 text-xs font-bold text-[#be185d] transition hover:bg-white"
                    >
                      เอาออก
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-[2rem] border-2 border-[#be185d] bg-gradient-to-br from-[#9d174d] to-[#831843] p-6 text-white shadow-[6px_6px_0_0_rgba(253,164,175,0.45)]">
              <div className="flex items-baseline justify-between border-b border-white/15 pb-4">
                <span className="text-sm font-semibold text-[#fbcfe8]">
                  ยอดรวม
                </span>
                <span className="text-3xl font-bold tabular-nums">
                  ฿{totalPrice}
                </span>
              </div>
              <Link to="/checkout" className="mt-5 block">
                <span className="font-craft flex w-full items-center justify-center rounded-2xl border-2 border-white bg-white py-3.5 text-sm font-bold text-[#be185d] transition hover:bg-[#fdf2f8]">
                  ไปชำระเงิน
                </span>
              </Link>
            </div>
          </>
        )}
      </div>
    </ShopShell>
  );
}
