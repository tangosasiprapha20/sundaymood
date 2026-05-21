import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Checkout from "./pages/Checkout.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";

import imgราชเบอร์รี่สด from "./assets/ราชเบอร์รี่สด.jpg";
import imgแบล็กเบอร์รี่ from "./assets/แบล็กเบอร์รี่.jpg";
import imgแครนเบอร์รี่ from "./assets/แครนเบอร์รี่.jpg";
import imgมิกซ์เบอร์รี่แช่แข็ง from "./assets/มิกซ์เบอร์รี่แช่แข็ง.jpg";
import imgเบอร์รี่คั้นสด from "./assets/เบอร์รี่คั้นสด.jpg";
import imgเชอรี่นำเข้าฤดูใหม่ from "./assets/เชอรี่นำเข้าฤดูใหม่.jpg";
import imgสมูทตี้มิกซ์เบอร์รี่ from "./assets/สมูทตี้มิกซ์เบอร์รี่.jpg";
import imgแยมเบอร์รี่โฮมเมด from "./assets/แยมเบอรืรี่โฮมเมด.jpg";
import imgGoldenBerryBox from "./assets/Golden Berry Box.jpg";

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
      name: "ราชเบอร์รี่สด",
      price: 279,
      category: "fresh",
      image: imgราชเบอร์รี่สด,
    },
    {
      id: 2,
      name: "แบล็กเบอร์รี่",
      price: 199,
      category: "fresh",
      image: imgแบล็กเบอร์รี่,
    },
    {
      id: 3,
      name: "แครนเบอร์รี่",
      price: 129,
      category: "dried",
      image: imgแครนเบอร์รี่,
    },
    {
      id: 4,
      name: "มิกซ์เบอร์รี่แช่แข็ง",
      price: 299,
      category: "frozen",
      image: imgมิกซ์เบอร์รี่แช่แข็ง,
    },
    {
      id: 5,
      name: "เบอร์รี่คั้นสด",
      price: 89,
      category: "fresh",
      image: imgเบอร์รี่คั้นสด,
    },
    {
      id: 2,
      name: "Frozen Raspberry",
      price: 249,
      category: "frozen",
      image:
        "https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=1200&auto=format&fit=crop",
    },
    
    {
      id: 5,
      name: "Blueberry Premium",
      price: 289,
      category: "fresh",
      image:
        "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Dried Cranberry",
      price: 159,
      category: "dried",
      image:
        "https://images.unsplash.com/photo-1471943311424-646960669fbc?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Berry Gift Box",
      price: 499,
      category: "gift",
      image:
        "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=1200&auto=format&fit=crop",
    },

  ];

  const comingSoon = [
   {
      id: "soon-1",
      name: "Golden Berry Box",
      teaser: "เบอร์รี่รวมพรีเมียมหวานอมเปรี้ยว พร้อมกล่องของขวัญ",
      eta: "Coming July",
      image:
      imgGoldenBerryBox,
    },
    {
      id: "soon-1",
      name: "เชอรี่นำเข้าฤดูใหม่",
      teaser: "หวานกรอบ จำกัดจำนวนต่อวัน",
      eta: "สัปดาห์หน้า",
      image: imgเชอรี่นำเข้าฤดูใหม่,
    },
    {
      id: "soon-2",
      name: "สมูทตี้มิกซ์เบอร์รี่",
      teaser: "พร้อมดื่มเย็นๆ ส่งถึงบ้าน",
      eta: "ปลายเดือนนี้",
      image: imgสมูทตี้มิกซ์เบอร์รี่,
    },
    {
      id: "soon-3",
      name: "แยมเบอรืรี่โฮมเมด",
      teaser: "ทำสดทุกอาทิตย์ ไม่ใส่วัตถุกันเสีย",
      eta: "เร็วๆ นี้",
      image: imgแยมเบอร์รี่โฮมเมด,
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
