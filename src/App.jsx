import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Checkout from "./pages/Checkout.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";

const imgสตรอว์เบอร์รี่ =
  "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80";
const imgบลูเบอร์รี่ =
  "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&q=80";
const imgราสเบอร์รี่ =
  "https://images.unsplash.com/photo-1577069861033-55d04cec883b?w=600&q=80";
const imgแบล็กเบอร์รี่ =
  "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&q=80";
const imgแครนเบอร์รี่ =
  "https://images.unsplash.com/photo-1550831518-38c1abe42726?w=600&q=80";
const imgมิกซ์เบอร์รี่ =
  "https://images.unsplash.com/photo-1493916679350-3b2bba79e24b?w=600&q=80";
const imgโกจิเบอร์รี่ =
  "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80";
const imgน้ำเบอร์รี่ =
  "https://images.unsplash.com/photo-1610970881699-44a55842ed08?w=600&q=80";
const imgแช่แข็ง =
  "https://images.unsplash.com/photo-1571771894821-d9b910e82ed8?w=600&q=80";
const imgกล่องของขวัญ =
  "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80";
const imgสตรอว์เบอร์รี่ช็อกโกแลต =
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80";
const imgเชอร์รี่ =
  "https://images.unsplash.com/photo-1528821122594-5a6305070b6c?w=600&q=80";

/** ส่งออเดอร์ไป Discord */
async function sendOrderToDiscord({
  cart,
  name,
  phone,
  address,
  slipFile,
  orderId,
}) {
  const url = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

  if (!url) {
    console.log("WEBHOOK =", import.meta.env.VITE_DISCORD_WEBHOOK_URL);
    return;
  }

  if (!Array.isArray(cart) || cart.length === 0) {
    console.log("cart ว่าง");
    return;
  }

  const items = cart
    .map((p) => {
      const qty = p.quantity || 1;
      return `• ${p.name} x${qty} = ฿${p.price * qty}`;
    })
    .join("\n");

  const total = cart.reduce(
    (sum, p) => sum + p.price * (p.quantity || 1),
    0
  );

  const payload = {
    embeds: [
      {
        title: `🍓 ออเดอร์ #${orderId}`,
        color: 0xbe185d,

        fields: [
          {
            name: "👤 ลูกค้า",
            value: name || "-",
            inline: true,
          },
          {
            name: "📞 เบอร์",
            value: phone || "-",
            inline: true,
          },
          {
            name: "📍 ที่อยู่",
            value: address || "-",
          },
          {
            name: "🫐 รายการสินค้า",
            value: items || "-",
          },
          {
            name: "💰 ราคารวม",
            value: `฿${total}`,
            inline: true,
          },
        ],

        footer: {
          text: "Sunday Berry Order",
        },

        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const hasSlip = slipFile instanceof File;

    const res = hasSlip
      ? await fetch(url, {
          method: "POST",
          body: (() => {
            const fd = new FormData();

            fd.append(
              "payload_json",
              JSON.stringify(payload)
            );

            fd.append(
              "files[0]",
              slipFile,
              slipFile.name || "slip.jpg"
            );

            return fd;
          })(),
        })
      : await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

    console.log("Discord status:", res.status);
  } catch (err) {
    console.log("Discord error:", err);
  }
}

/** ส่งแจ้งเตือนยกเลิกออเดอร์ไป Discord */
async function sendOrderCancellationToDiscord(order) {
  const url = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
  if (!url || !order) return;

  const itemsText = (order.items || [])
    .map((item) => {
      const qty = item.quantity || 1;
      return `• ${item.name} x${qty} = ฿${item.price * qty}`;
    })
    .join("\n");

  const payload = {
    embeds: [
      {
        title: `❌ ยกเลิกออเดอร์ #${order.orderId}`,
        color: 0xdc2626,
        fields: [
          { name: "👤 ลูกค้า", value: order.name || "-", inline: true },
          { name: "📞 เบอร์", value: order.phone || "-", inline: true },
          { name: "📍 ที่อยู่", value: order.address || "-" },
          { name: "🫐 รายการสินค้า", value: itemsText || "-" },
          { name: "💰 ยอดเดิม", value: `฿${order.total || 0}`, inline: true },
          {
            name: "🕒 เวลาที่ยกเลิก",
            value: order.canceledAt
              ? new Date(order.canceledAt).toLocaleString("th-TH")
              : new Date().toLocaleString("th-TH"),
            inline: true,
          },
        ],
        footer: { text: "Sunday Berry Order" },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log("Discord cancel status:", res.status);
  } catch (err) {
    console.log("Discord cancel error:", err);
  }
}

function readOrderHistory() {
  try {
    const raw =
      localStorage.getItem("sundayberry.orderHistory") ??
      localStorage.getItem("lunelle.orderHistory") ??
      localStorage.getItem("softlane.orderHistory");
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readOrderId() {
  try {
    const raw =
      localStorage.getItem("sundayberry.orderId") ??
      localStorage.getItem("lunelle.orderId") ??
      localStorage.getItem("softlane.orderId");
    const n = raw ? Number(raw) : 1001;
    return Number.isFinite(n) ? n : 1001;
  } catch {
    return 1001;
  }
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderHistory, setOrderHistory] = useState(readOrderHistory);

  const [orderId, setOrderId] = useState(readOrderId);

  useEffect(() => {
    try {
      localStorage.setItem(
        "sundayberry.orderHistory",
        JSON.stringify(orderHistory)
      );
    } catch {
      // ignore write failures
    }
  }, [orderHistory]);

  useEffect(() => {
    try {
      localStorage.setItem("sundayberry.orderId", String(orderId));
    } catch {
      // ignore write failures
    }
  }, [orderId]);

  const products = [
    {
      id: 1,
      name: "สตรอว์เบอร์รี่สดพรีเมียม (500g)",
      price: 189,
      category: "fresh",
      image: imgสตรอว์เบอร์รี่,
    },
    {
      id: 2,
      name: "บลูเบอร์รี่นำเข้า (250g)",
      price: 249,
      category: "fresh",
      image: imgบลูเบอร์รี่,
    },
    {
      id: 3,
      name: "ราสเบอร์รี่สด (200g)",
      price: 279,
      category: "fresh",
      image: imgราสเบอร์รี่,
    },
    {
      id: 4,
      name: "แบล็กเบอร์รี่สด (200g)",
      price: 199,
      category: "fresh",
      image: imgแบล็กเบอร์รี่,
    },
    {
      id: 5,
      name: "แครนเบอร์รี่อบแห้ง (150g)",
      price: 129,
      category: "dried",
      image: imgแครนเบอร์รี่,
    },
    {
      id: 6,
      name: "โกจิเบอร์รี่อบแห้ง (200g)",
      price: 159,
      category: "dried",
      image: imgโกจิเบอร์รี่,
    },
    {
      id: 7,
      name: "มิกซ์เบอร์รี่แช่แข็ง (1kg)",
      price: 299,
      category: "frozen",
      image: imgแช่แข็ง,
    },
    {
      id: 8,
      name: "สตรอว์เบอร์รี่ชุบช็อกโกแลต (12 ชิ้น)",
      price: 179,
      category: "gift",
      image: imgสตรอว์เบอร์รี่ช็อกโกแลต,
    },
    {
      id: 9,
      name: "น้ำเบอร์รี่คั้นสด (500ml)",
      price: 89,
      category: "fresh",
      image: imgน้ำเบอร์รี่,
    },
    {
      id: 10,
      name: "กล่องของขวัญเบอร์รี่มิกซ์",
      price: 590,
      category: "gift",
      image: imgกล่องของขวัญ,
    },
  ];

  const comingSoon = [
    {
      id: "soon-1",
      name: "เชอร์รี่นำเข้าฤดูใหม่",
      teaser: "หวานกรอบ จำกัดจำนวนต่อวัน",
      eta: "สัปดาห์หน้า",
      image: imgเชอร์รี่,
    },
    {
      id: "soon-2",
      name: "สมูทตี้มิกซ์เบอร์รี่",
      teaser: "พร้อมดื่มเย็นๆ ส่งถึงบ้าน",
      eta: "ปลายเดือนนี้",
      image: imgมิกซ์เบอร์รี่,
    },
    {
      id: "soon-3",
      name: "แยมเบอร์รี่โฮมเมด",
      teaser: "ทำสดทุกอาทิตย์ ไม่ใส่วัตถุกันเสีย",
      eta: "เร็วๆ นี้",
      image: imgราสเบอร์รี่,
    },
  ];

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (!existing) {
        return [...prev, { ...product, quantity: 1 }];
      }

      return prev.map((p) =>
        p.id === product.id
          ? {
              ...p,
              quantity: (p.quantity || 1) + 1,
            }
          : p
      );
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  const clearCart = async (orderData) => {
    const payload =
      orderData && Array.isArray(orderData.cart)
        ? {
            cart: [...orderData.cart],
            name: orderData.name,
            phone: orderData.phone,
            address: orderData.address,
            slipFile: orderData.slipFile ?? null,
            orderId,
          }
        : {
            cart: [...cart],
            name: "-",
            phone: "-",
            address: "-",
            slipFile: null,
            orderId,
          };

    await sendOrderToDiscord(payload);

    const purchasedItems = [...payload.cart];
    const total = purchasedItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    setOrderHistory((prev) => [
      {
        orderId: payload.orderId,
        name: payload.name,
        phone: payload.phone,
        address: payload.address,
        items: purchasedItems,
        total,
        createdAt: new Date().toISOString(),
        status: "paid",
        canceledAt: null,
      },
      ...prev,
    ]);

    setOrderId((prev) => prev + 1);

    setCart([]);
  };

  const cancelOrder = async (targetOrderId) => {
    let canceledOrder = null;
    setOrderHistory((prev) =>
      prev.map((order) =>
        order.orderId === targetOrderId && order.status !== "canceled"
          ? (() => {
              canceledOrder = {
                ...order,
                status: "canceled",
                canceledAt: new Date().toISOString(),
              };
              return canceledOrder;
            })()
          : order
      )
    );
    if (canceledOrder) {
      await sendOrderCancellationToDiscord(canceledOrder);
    }
  };

  const deleteOrderFromHistory = (targetOrderId) => {
    setOrderHistory((prev) =>
      prev.filter((order) => order.orderId !== targetOrderId)
    );
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <Home
                products={products}
                comingSoon={comingSoon}
                addToCart={addToCart}
                cart={cart}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/orders"
          element={
            isLoggedIn ? (
              <OrderHistory
                orderHistory={orderHistory}
                onCancelOrder={cancelOrder}
                onDeleteOrder={deleteOrderFromHistory}
                cart={cart}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/cart"
          element={
            isLoggedIn ? (
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/checkout"
          element={
            isLoggedIn ? (
              <Checkout
                cart={cart}
                clearCart={clearCart}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/contact"
          element={
            isLoggedIn ? (
              <Contact
                cart={cart}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/about"
          element={
            isLoggedIn ? (
              <About
                cart={cart}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
