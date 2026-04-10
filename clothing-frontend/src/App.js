import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./index.css";

// ─── Banner Data (edit freely) ───────────────────────────────────────────────
const BANNERS = [
  {
    id: 1,
    tag: "LIMITED OFFER",
    headline: "Flat 40% Off",
    sub: "On all Women's Summer Collection",
    cta: "Shop Women",
    bg: "#1a1a2e",
    accent: "#e94560",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    id: 2,
    tag: "NEW ARRIVALS",
    headline: "Men's Edit 2025",
    sub: "Premium linen, cotton & more — starting ₹799",
    cta: "Shop Men",
    bg: "#0f3460",
    accent: "#e94560",
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80",
  },
  {
    id: 3,
    tag: "FLASH SALE",
    headline: "Buy 2 Get 1 Free",
    sub: "Mix & match from 500+ styles",
    cta: "Grab the Deal",
    bg: "#16213e",
    accent: "#f5a623",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  },
];

const PROMO_MESSAGES = [
  "🚚  Free shipping on orders above ₹999",
  "🎉  Use code STYLE20 for extra 20% off",
  "🔁  Easy 30-day returns — no questions asked",
  "⭐  New arrivals every Monday — stay tuned!",
];

// ─── Countdown Hook ───────────────────────────────────────────────────────────
function useCountdown(targetDate) {
  const calc = () => {
    const diff = targetDate - Date.now();
    if (diff <= 0) return { h: 0, m: 0, s: 0 };
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

// ─── PromoStrip ───────────────────────────────────────────────────────────────
function PromoStrip() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % PROMO_MESSAGES.length), 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="promo-strip">
      <span key={idx} className="promo-text">{PROMO_MESSAGES[idx]}</span>
    </div>
  );
}

// ─── HeroBanner ──────────────────────────────────────────────────────────────
function HeroBanner() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  // Flash sale ends in 6 hours from page load
  const saleEnd = useRef(Date.now() + 6 * 3600 * 1000).current;
  const { h, m, s } = useCountdown(saleEnd);
  const pad = n => String(n).padStart(2, "0");

  const goTo = (i) => {
    setActive(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(a => (a + 1) % BANNERS.length), 4500);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(a => (a + 1) % BANNERS.length), 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const b = BANNERS[active];

  return (
    <div className="hero-banner" style={{ background: b.bg }}>
      <div className="hero-content">
        <span className="hero-tag" style={{ background: b.accent }}>{b.tag}</span>
        <h1 className="hero-headline">{b.headline}</h1>
        <p className="hero-sub">{b.sub}</p>

        {/* Countdown — only on flash-sale slide */}
        {b.tag === "FLASH SALE" && (
          <div className="countdown">
            <span>Ends in</span>
            <div className="countdown-blocks">
              {[pad(h), pad(m), pad(s)].map((v, i) => (
                <React.Fragment key={i}>
                  <div className="cd-block">{v}</div>
                  {i < 2 && <span className="cd-colon">:</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <button
          className="hero-cta"
          style={{ background: b.accent, border: "none" }}
        >
          {b.cta} →
        </button>
      </div>

      <div className="hero-img-wrap">
        <img key={b.id} src={b.img} alt={b.headline} className="hero-img" />
      </div>

      {/* Dots */}
      <div className="hero-dots">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === active ? "dot-active" : ""}`}
            style={i === active ? { background: b.accent } : {}}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🛒 CART FUNCTIONS
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) =>
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));

  const decreaseQty = (id) =>
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
      .filter(item => item.quantity > 0));

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // 🔍 FILTER
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === "" || p.category === categoryFilter)
  );

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div>

      {/* 📢 PROMO STRIP */}
      <PromoStrip />

      {/* 🔥 NAVBAR */}
      <div className="navbar">
        <h2>StyleHub</h2>
        <div className="nav-links">
          <span>Home</span>
          <span>Men</span>
          <span>Women</span>
          <button className="cart-icon-btn" onClick={() => setCartOpen(o => !o)}>
            🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* 🖼️ HERO BANNERS */}
      <HeroBanner />

      {/* 🛒 CART DRAWER */}
      {cartOpen && (
        <div className="cart-drawer">
          <div className="cart-header">
            <h2>Your Cart</h2>
            <button className="close-btn" onClick={() => setCartOpen(false)}>✕</button>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty 🛍️</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">₹{item.price}</span>
                </div>
                <div className="cart-item-controls">
                  <button className="qty-btn" onClick={() => decreaseQty(item.id)}>−</button>
                  <span className="qty-val">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => increaseQty(item.id)}>+</button>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <div className="cart-footer">
              <h3>Total: ₹{totalPrice}</h3>
              <button className="checkout-btn">Checkout →</button>
            </div>
          )}
        </div>
      )}

      {/* 🔍 SEARCH + FILTER */}
      <div className="search-box">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
      </div>

      {/* 🛍️ PRODUCTS */}
      <div className="product-grid">
        {filteredProducts.map(p => (
          <div key={p.id} className="card">
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>
            <p>{p.category}</p>
            <button className="btn" onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;