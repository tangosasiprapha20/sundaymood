import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import PromptPayQR from "promptpay-qr";
import ShopShell from "../components/ShopShell.jsx";

const DEFAULT_PROMPTPAY = "0979589118";

const fieldClass =
  "mb-3 w-full rounded-2xl border-2 border-[#fbcfe8] bg-white/90 p-3.5 text-base text-[#4a1528] outline-none transition placeholder:text-[#f9a8d4] focus:border-[#be185d] focus:bg-white";

export default function Checkout({
  cart = [],
  clearCart,
  setIsLoggedIn = () => {},
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const items = useMemo(() => (Array.isArray(cart) ? cart : []), [cart]);

  const total = useMemo(
    () => items.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0),
    [items]
  );

  const promptPayPayload = useMemo(() => {
    if (total <= 0) return "";
    try {
      return PromptPayQR(DEFAULT_PROMPTPAY, {
        amount: total,
      });
    } catch (e) {
      console.log(e);
      return "";
    }
  }, [total]);

  const isCustomerInfoValid =
    name.trim().length > 0 &&
    phone.trim().length > 0 &&
    address.trim().length > 0;

  const openPayment = () => {
    if (!isCustomerInfoValid) {
      setToast({ type: "error", message: "กรุณากรอกข้อมูลให้ครบ" });
      return;
    }
    if (!items.length) {
      setToast({ type: "error", message: "ตะกร้าว่าง" });
      return;
    }
    setShowQR(true);
  };

  const handleConfirmOrder = async () => {
    if (!isCustomerInfoValid) {
      setToast({ type: "error", message: "กรุณากรอกข้อมูลให้ครบ" });
      return;
    }
    if (!items.length) {
      setToast({ type: "error", message: "ตะกร้าว่าง" });
      return;
    }

    try {
      setIsSubmitting(true);
      await clearCart({
        cart: items,
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
      });

      setShowQR(false);
      setName("");
      setPhone("");
      setAddress("");

      setToast({
        type: "success",
        message:
          "ชำระเงินสำเร็จแล้ว สามารถกดปุ่มดูประวัติการสั่งซื้อเพื่อตรวจสอบรายการได้",
      });
      window.setTimeout(() => setToast(null), 4500);
    } catch {
      setToast({
        type: "error",
        message: "เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองใหม่อีกครั้ง",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ShopShell cart={cart} setIsLoggedIn={setIsLoggedIn}>
      <div className="mx-auto grid max-w-3xl gap-8 lg:grid-cols-5 lg:items-start">
        <div className="lg:col-span-3">
          <div className="rounded-[2rem] border-2 border-dashed border-[#f9a8d4] bg-white p-6 shadow-[5px_5px_0_0_rgba(190,24,93,0.08)] md:p-8">
            <p className="font-craft inline-flex rounded-2xl border border-[#fbcfe8] bg-[#fdf2f8] px-3 py-1 text-xs font-bold tracking-wide text-[#be185d]">
              Checkout
            </p>
            <h1 className="font-craft mt-3 text-2xl font-bold text-[#4a1528] md:text-3xl">
              ชำระเงิน
            </h1>
            <p className="mt-2 text-sm text-[#6b3d52]">
              กรอกข้อมูลจัดส่ง แล้วเปิด QR พร้อมเพย์
            </p>

            <div className="mt-6 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#be185d]">
                ชื่อ
              </label>
              <input
                className={fieldClass}
                placeholder="ชื่อผู้รับ"
                value={name}
                type="text"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-1 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#be185d]">
                เบอร์โทร
              </label>
              <input
                className={fieldClass}
                placeholder="เบอร์ติดต่อ"
                value={phone}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mt-1 space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#be185d]">
                ที่อยู่
              </label>
              <textarea
                placeholder="ที่อยู่จัดส่ง"
                value={address}
                rows={4}
                className={`${fieldClass} min-h-[120px] resize-y`}
                autoComplete="street-address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {!showQR ? (
              <button
                type="button"
                onClick={openPayment}
                disabled={!isCustomerInfoValid || !items.length}
                className={`mt-6 w-full rounded-full border-2 py-3.5 text-sm font-black uppercase tracking-wide transition ${
                  isCustomerInfoValid && items.length
                    ? "border-[#be185d] bg-[#be185d] text-white shadow-[3px_3px_0_0_rgba(253,164,175,0.45)] hover:bg-white hover:text-[#be185d]"
                    : "cursor-not-allowed border-[#fce7f3] bg-[#fdf2f8] text-[#f9a8d4]"
                }`}
              >
                ชำระเงิน (PromptPay)
              </button>
            ) : (
              <div className="mt-6 space-y-5">
                <div className="rounded-[1.5rem] border-2 border-[#fbcfe8] bg-[#fff5f9] p-5 text-center">
                  <h2 className="font-craft text-lg font-bold text-[#4a1528]">
                    สแกนเพื่อโอน
                  </h2>

                  {promptPayPayload ? (
                    <div className="mt-4 flex justify-center rounded-2xl bg-white p-4 ring-2 ring-[#fce7f3]">
                      <QRCodeSVG value={promptPayPayload} size={200} />
                    </div>
                  ) : (
                    <p className="mt-4 text-sm font-medium text-red-600">
                      สร้าง QR ไม่ได้
                    </p>
                  )}

                  <p className="mt-4 text-sm font-bold text-[#6b3d52]">
                    ยอด{" "}
                    <span className="text-lg text-[#be185d]">฿{total}</span>
                  </p>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  type="button"
                  disabled={isSubmitting}
                  className={`w-full rounded-full border-2 py-3.5 text-sm font-black transition ${
                    isSubmitting
                      ? "cursor-not-allowed border-[#fce7f3] bg-[#fdf2f8] text-[#f9a8d4]"
                      : "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-500"
                  }`}
                >
                  {isSubmitting ? "กำลังส่งออเดอร์..." : "ยืนยันออเดอร์"}
                </button>

                <Link
                  to="/orders"
                  className="flex w-full items-center justify-center rounded-2xl border-2 border-[#fbcfe8] bg-white py-3 text-sm font-bold text-[#4a1528] transition hover:bg-[#fff5f9]"
                >
                  ดูประวัติการสั่งซื้อ
                </Link>

                <p className="text-center text-xs font-medium text-[#6b3d52]">
                  โอนแล้วแจ้งสลิปใน Line / Instagram
                </p>
              </div>
            )}
          </div>
        </div>

        <aside className="lg:col-span-2">
          <div className="sticky top-24 space-y-4 rounded-[1.75rem] border-2 border-[#be185d] bg-gradient-to-br from-[#9d174d] to-[#831843] p-5 text-white shadow-[5px_6px_0_0_rgba(253,164,175,0.4)]">
            <p className="font-craft text-xs font-bold tracking-wide text-[#fbcfe8]">
              สรุปสินค้าในตะกร้า
            </p>
            {items.length === 0 ? (
              <p className="mt-2 text-sm text-[#fbcfe8]">ตะกร้าว่าง</p>
            ) : (
              <ul className="max-h-64 space-y-2 overflow-y-auto text-sm">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between gap-2 border-b border-white/10 pb-2 last:border-0"
                  >
                    <span className="truncate font-medium text-[#fce7f3]">
                      {item.name}{" "}
                      <span className="text-[#fbcfe8]">
                        ×{item.quantity || 1}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex items-baseline justify-between border-t border-white/15 pt-4">
              <span className="text-sm font-semibold text-[#fbcfe8]">รวม</span>
              <span className="text-2xl font-bold tabular-nums">฿{total}</span>
            </div>
            <Link
              to="/cart"
              className="block rounded-2xl border-2 border-white/25 py-2.5 text-center text-xs font-bold text-white transition hover:bg-white/10"
            >
              แก้ไขตะกร้า / เพิ่มสินค้า
            </Link>
          </div>
        </aside>
      </div>

      {toast && (
        <div className="fixed inset-x-0 bottom-24 z-[60] px-4 md:bottom-8">
          <div
            className={`mx-auto flex w-full max-w-md items-start justify-between gap-3 rounded-2xl border-2 p-4 shadow-xl ${
              toast.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-red-200 bg-red-50 text-red-900"
            }`}
            role="status"
            aria-live="polite"
          >
            <p className="text-sm font-medium leading-relaxed">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="shrink-0 rounded-full px-2 py-1 text-sm font-bold opacity-80 hover:opacity-100"
            >
              ปิด
            </button>
          </div>
          {toast.type === "success" && (
            <div className="mx-auto mt-2 w-full max-w-md">
              <Link
                to="/orders"
                onClick={() => setToast(null)}
                className="font-craft block w-full rounded-2xl border-2 border-[#be185d] bg-[#be185d] py-2.5 text-center text-sm font-bold text-white transition hover:bg-white hover:text-[#be185d]"
              >
                ดูประวัติการสั่งซื้อ
              </Link>
            </div>
          )}
        </div>
      )}
    </ShopShell>
  );
}
