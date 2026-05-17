import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ShopShell from "../components/ShopShell.jsx";

export default function OrderHistory({
  orderHistory = [],
  onCancelOrder = () => {},
  onDeleteOrder = () => {},
  cart = [],
  setIsLoggedIn = () => {},
}) {
  const handleCancel = async (orderId) => {
    const ok = window.confirm(`ยืนยันยกเลิกออเดอร์ #${orderId} ?`);
    if (!ok) return;
    await onCancelOrder(orderId);
  };

  const handleDelete = (orderId) => {
    const ok = window.confirm(
      `ลบออเดอร์ #${orderId} ออกจากประวัติบนเครื่องนี้? จะไม่สามารถกู้คืนได้`
    );
    if (!ok) return;
    onDeleteOrder(orderId);
  };

  return (
    <ShopShell cart={cart} setIsLoggedIn={setIsLoggedIn}>
      <div className="mx-auto max-w-2xl space-y-8">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#fbcfe8] bg-white px-4 py-2 text-sm font-bold text-[#6b3d52] shadow-sm transition hover:border-[#f9a8d4] hover:text-[#4a1528]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          กลับหน้าแรก
        </Link>

        <div>
          <h1 className="font-craft text-3xl font-bold tracking-wide text-[#4a1528]">
            ประวัติออเดอร์
          </h1>
          <p className="mt-2 text-sm text-[#6b3d52]">
            บันทึกไว้ในเครื่องของคุณ — ลบรายการที่ไม่ต้องการเก็บได้
          </p>
        </div>

        {orderHistory.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-[#fce7f3] bg-white/90 px-6 py-16 text-center">
            <p className="text-4xl">🫐</p>
            <p className="mt-4 text-[#6b3d52]">ยังไม่มีประวัติการสั่งซื้อ</p>
            <Link
              to="/home"
              className="font-craft mt-6 inline-flex rounded-2xl border-2 border-[#be185d] bg-[#be185d] px-6 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_rgba(253,164,175,0.45)] transition hover:bg-white hover:text-[#be185d]"
            >
              ไปเลือกเบอร์รี่
            </Link>
          </div>
        ) : (
          <ul className="space-y-5">
            {orderHistory.map((order) => (
              <li
                key={order.orderId}
                className="overflow-hidden rounded-2xl border-2 border-[#fbcfe8] bg-white shadow-[4px_5px_0_0_rgba(190,24,93,0.08)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#fce7f3] bg-[#fdf2f8] px-5 py-4">
                  <p className="text-lg font-black text-[#4a1528]">
                    #{order.orderId}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border-2 px-3 py-0.5 text-xs font-bold ${
                        order.status === "canceled"
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-emerald-200 bg-emerald-50 text-emerald-800"
                      }`}
                    >
                      {order.status === "canceled"
                        ? "ยกเลิกแล้ว"
                        : "ชำระเงินแล้ว"}
                    </span>
                    <p className="text-xs font-medium text-[#be185d]">
                      {new Date(order.createdAt).toLocaleString("th-TH")}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 px-5 py-4 text-sm text-[#6b3d52]">
                  <p>
                    <span className="font-bold text-[#be185d]">ลูกค้า</span>{" "}
                    {order.name || "-"}
                  </p>
                  <p>
                    <span className="font-bold text-[#be185d]">เบอร์</span>{" "}
                    {order.phone || "-"}
                  </p>
                  <p>
                    <span className="font-bold text-[#be185d]">ที่อยู่</span>{" "}
                    {order.address || "-"}
                  </p>
                </div>

                <div className="mx-5 mb-4 rounded-2xl border-2 border-dashed border-[#fbcfe8] bg-[#fdf2f8] p-3">
                  {order.items.map((item, idx) => (
                    <p
                      key={`${order.orderId}-${item.id}-${idx}`}
                      className="text-sm text-[#6b3d52]"
                    >
                      {item.name} ×{item.quantity || 1} = ฿
                      {item.price * (item.quantity || 1)}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#fce7f3] px-5 py-4">
                  <p className="text-base font-black text-[#4a1528]">
                    รวม ฿{order.total}
                  </p>
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {order.status === "canceled" ? (
                      <p className="text-xs font-medium text-red-600">
                        ยกเลิกเมื่อ{" "}
                        {order.canceledAt
                          ? new Date(order.canceledAt).toLocaleString("th-TH")
                          : "-"}
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleCancel(order.orderId)}
                        className="rounded-full border-2 border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100"
                      >
                        ยกเลิกออเดอร์
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(order.orderId)}
                      className="rounded-2xl border-2 border-[#fbcfe8] bg-[#fdf2f8] px-4 py-2 text-xs font-bold text-[#4a1528] transition hover:bg-[#fce7f3]"
                    >
                      ลบจากประวัติ
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ShopShell>
  );
}
