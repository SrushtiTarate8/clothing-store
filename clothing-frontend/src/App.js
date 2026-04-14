import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

import PromoStrip from "./components/PromoStrip";
import HeroBanner from "./components/HeroBanner";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import CategoryPage from "./pages/CategoryPage";
import OrdersPage from "./pages/OrdersPage";

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";

// ─── Main Shopping App (wrapped inside Router) ───────────────────────────────
function ShoppingApp() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [activePage, setActivePage] = useState("home"); // "home" | "men" | "women" | ...
  const [sortBy, setSortBy] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    phone: "",
    flat: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((res) => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // ── Cart helpers ────────────────────────────────────────────────────────────
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.size === product.size
      );
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === product.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQty = (id) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );

  const decreaseQty = (id) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  // ── Wishlist helpers ────────────────────────────────────────────────────────
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.filter((i) => i.id !== product.id);
      return [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlist.some((i) => i.id === id);

  const openOrderForm = () => {
    setOrderOpen(true);
    setCartOpen(false);
    setOrderSuccess(false);
    setOrderError("");
  };

  const closeOrderForm = () => {
    setOrderOpen(false);
    setOrderSuccess(false);
    setOrderError("");
    setOrderForm({
      name: "",
      email: "",
      phone: "",
      flat: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      paymentMethod: "cod",
    });
  };

  const updateOrderField = (field, value) =>
    setOrderForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setOrderError("");

    try {
      const orderPayload = {
        userId: user?.userId || null,
        name: orderForm.name,
        email: orderForm.email,
        phone: orderForm.phone,
        flat: orderForm.flat,
        area: orderForm.area,
        city: orderForm.city,
        state: orderForm.state,
        pincode: orderForm.pincode,
        paymentMethod: orderForm.paymentMethod,
        totalAmount: totalPrice,
        status: "Pending",
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          size: item.size || "",
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl || "",
        })),
      };

      await axios.post("http://localhost:8080/api/orders", orderPayload);

      setOrderSuccess(true);
      setTimeout(() => {
        setOrderOpen(false);
        setOrderSuccess(false);
        setCart([]);
        setOrderForm({
          name: "",
          email: "",
          phone: "",
          flat: "",
          area: "",
          city: "",
          state: "",
          pincode: "",
          paymentMethod: "cod",
        });
      }, 2200);
    } catch (err) {
      console.log(err);
      setOrderError("Could not place order right now. Please try again.");
    }
  };

  // ── Derived values ──────────────────────────────────────────────────────────
  const totalPrice = cart.reduce((t, i) => t + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  // ── Navigation ──────────────────────────────────────────────────────────────
  const handleNavClick = (page) => {
    setActivePage(page);
    setCategoryFilter("");
    setSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Shared drawer + navbar props ────────────────────────────────────────────
  const navbarProps = {
    cartCount,
    setCartOpen,
    search,
    setSearch,
    activePage,
    onNavClick: handleNavClick,
    wishlistCount: wishlist.length,
    setWishlistOpen,
  };

  const drawerProps = {
    cartOpen,
    setCartOpen,
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
    onPlaceOrder: openOrderForm,
  };

  const wishlistDrawerProps = {
    wishlistOpen,
    setWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
  };

  const orderModal = orderOpen ? (
    <>
      <div className="cart-overlay" onClick={closeOrderForm} />
      <div className="order-modal">
        <div className="order-header">
          <h2>Checkout</h2>
          <button className="close-btn" onClick={closeOrderForm}>
            ✕
          </button>
        </div>

        {orderSuccess ? (
          <div className="order-confirmation">
            <h3>Order confirmed!</h3>
            <p>
              Thanks {orderForm.name || "there"}, your order has been placed.
            </p>
            <p>We will email you the order details shortly.</p>
          </div>
        ) : (
          <form className="order-form" onSubmit={handleSubmitOrder}>
            <div className="field-row">
              <label htmlFor="order-name">Full Name</label>
              <input
                id="order-name"
                type="text"
                placeholder="Enter your name"
                value={orderForm.name}
                onChange={(e) => updateOrderField("name", e.target.value)}
                required
              />
            </div>

            <div className="field-row">
              <label htmlFor="order-email">Email</label>
              <input
                id="order-email"
                type="email"
                placeholder="name@example.com"
                value={orderForm.email}
                onChange={(e) => updateOrderField("email", e.target.value)}
                required
              />
            </div>

            <div className="field-row">
              <label htmlFor="order-phone">Phone</label>
              <input
                id="order-phone"
                type="tel"
                placeholder="Enter phone number"
                value={orderForm.phone}
                onChange={(e) => updateOrderField("phone", e.target.value)}
                required
              />
            </div>

            <div className="field-row">
              <label htmlFor="order-flat">Flat / House No.</label>
              <input
                id="order-flat"
                type="text"
                placeholder="Flat no, building name"
                value={orderForm.flat}
                onChange={(e) => updateOrderField("flat", e.target.value)}
                required
              />
            </div>

            <div className="field-row">
              <label htmlFor="order-area">Area / Street</label>
              <textarea
                id="order-area"
                rows="3"
                placeholder="Street, locality, landmark"
                value={orderForm.area}
                onChange={(e) => updateOrderField("area", e.target.value)}
                required
              />
            </div>

            <div className="field-row">
              <label htmlFor="order-city">City</label>
              <input
                id="order-city"
                type="text"
                placeholder="Enter city"
                value={orderForm.city}
                onChange={(e) => updateOrderField("city", e.target.value)}
                required
              />
            </div>

            <div className="field-row">
              <label htmlFor="order-state">State</label>
              <input
                id="order-state"
                type="text"
                placeholder="Enter state"
                value={orderForm.state}
                onChange={(e) => updateOrderField("state", e.target.value)}
                required
              />
            </div>

            <div className="field-row">
              <label htmlFor="order-pincode">Pincode</label>
              <input
                id="order-pincode"
                type="text"
                pattern="[0-9]{6}"
                maxLength={6}
                inputMode="numeric"
                placeholder="6-digit pincode"
                value={orderForm.pincode}
                onChange={(e) =>
                  updateOrderField(
                    "pincode",
                    e.target.value.replace(/[^0-9]/g, "").slice(0, 6)
                  )
                }
                required
              />
            </div>

            <div className="field-row">
              <label>Payment Method</label>
              <div className="payment-row">
                <label
                  className={`payment-option ${
                    orderForm.paymentMethod === "cod" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={orderForm.paymentMethod === "cod"}
                    onChange={() => updateOrderField("paymentMethod", "cod")}
                  />
                  Cash on Delivery
                </label>
                <label
                  className={`payment-option ${
                    orderForm.paymentMethod === "upi" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={orderForm.paymentMethod === "upi"}
                    onChange={() => updateOrderField("paymentMethod", "upi")}
                  />
                  UPI
                </label>
              </div>
            </div>

            {orderForm.paymentMethod === "upi" && (
              <div className="qr-section">
                <p>Scan this QR code with any UPI app</p>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://www.google.com"
                  alt="UPI QR Code"
                />
                <p className="qr-hint">
                  This is a placeholder QR code. Use it to mimic UPI payment.
                </p>
              </div>
            )}

            {orderError && <p className="order-error">{orderError}</p>}

            <button className="checkout-btn" type="submit">
              {orderForm.paymentMethod === "upi"
                ? "Pay & Confirm"
                : "Confirm Order"}
            </button>
          </form>
        )}
      </div>
    </>
  ) : null;

  // ── Category pages (non-home) ───────────────────────────────────────────────
  if (activePage !== "home") {
    return (
      <div>
        <PromoStrip />
        <Navbar {...navbarProps} />
        <CartDrawer {...drawerProps} />
        <WishlistDrawer {...wishlistDrawerProps} />
        {orderModal}
        <CategoryPage
          category={activePage}
          products={products}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          isWishlisted={isWishlisted}
          search={search}
        />
      </div>
    );
  }

  // ── Home page ───────────────────────────────────────────────────────────────
  const CATEGORIES = [
    {
      label: "All",
      value: "",
      img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=72&q=80",
    },
    {
      label: "Men",
      value: "Men",
      img: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=72&q=80",
    },
    {
      label: "Women",
      value: "Women",
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=72&q=80",
    },
    {
      label: "Kids",
      value: "Kids",
      img: "https://images.unsplash.com/photo-1471286174890-9c112ac6a275?w=72&q=80",
    },
    {
      label: "Home",
      value: "Home",
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=72&q=80",
    },
    {
      label: "Beauty",
      value: "Beauty",
      img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=72&q=80",
    },
  ];

  let filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === "" ||
        p.category?.toLowerCase() === categoryFilter.toLowerCase())
  );

  if (sortBy === "price_asc")
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc")
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "rating")
    filtered = [...filtered].sort(
      (a, b) => (b.rating || 4) - (a.rating || 4)
    );

  return (
    <div>
      <PromoStrip />
      <Navbar {...navbarProps} />
      <HeroBanner onShopNow={() => handleNavClick("women")} />

      <CartDrawer {...drawerProps} />
      <WishlistDrawer {...wishlistDrawerProps} />
      {orderModal}

      {/* Trending Banners */}
      <section className="trending-section">
        <h2 className="trending-title">Trending Now</h2>
        <div className="trending-grid">
          <div
            className="trending-card big"
            onClick={() => handleNavClick("women")}
          >
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80"
              alt="Women"
            />
            <div className="trending-overlay">
              <span className="trending-tag">Women</span>
              <p>New Season Arrivals</p>
              <button>Explore →</button>
            </div>
          </div>
          <div className="trending-col">
            <div
              className="trending-card"
              onClick={() => handleNavClick("men")}
            >
              <img
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80"
                alt="Men"
              />
              <div className="trending-overlay">
                <span className="trending-tag">Men</span>
                <p>Sharp & Sophisticated</p>
                <button>Shop →</button>
              </div>
            </div>
            <div
              className="trending-card"
              onClick={() => handleNavClick("kids")}
            >
              <img
                src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80"
                alt="Kids"
              />
              <div className="trending-overlay">
                <span className="trending-tag">Kids</span>
                <p>Playful & Bright</p>
                <button>Shop →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <div className="offer-banner">
        <div className="offer-content">
          <p className="offer-eyebrow">LIMITED TIME OFFER</p>
          <h3>Flat 40% OFF on Premium Brands</h3>
          <p>
            Use code: <strong>STYLE40</strong> at checkout
          </p>
          <button className="offer-btn">Grab the Deal</button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80"
          alt="Sale"
        />
      </div>

      {/* Category Chips */}
      <div className="category-chips">
        {CATEGORIES.map((c) => (
          <div
            key={c.value}
            className={`chip ${categoryFilter === c.value ? "active" : ""}`}
            onClick={() => setCategoryFilter(c.value)}
          >
            <img className="chip-img" src={c.img} alt={c.label} />
            <span className="chip-label">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Filter / Sort Bar */}
      <div className="filter-bar">
        <div className="filter-left">
          <button className="filter-btn">Filter</button>
          <button
            className="filter-btn"
            onClick={() => setCategoryFilter("Men")}
          >
            Men
          </button>
          <button
            className="filter-btn"
            onClick={() => setCategoryFilter("Women")}
          >
            Women
          </button>
        </div>
        <select
          className="sort-select"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By: Recommended</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Better Rating</option>
        </select>
      </div>

      <p className="section-title">
        {categoryFilter ? `${categoryFilter}'s Fashion` : "All Products"} —{" "}
        {filtered.length} items
      </p>

      <div className="product-grid" style={{ marginTop: 20 }}>
        {loading ? (
          <p
            style={{ textAlign: "center", padding: 40, gridColumn: "1/-1" }}
          >
            Loading...
          </p>
        ) : filtered.length === 0 ? (
          <p
            style={{ textAlign: "center", padding: 40, gridColumn: "1/-1" }}
          >
            No products found 😕
          </p>
        ) : (
          filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              isWishlisted={isWishlisted(p.id)}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Online Shopping</h4>
            <a onClick={() => handleNavClick("men")}>Men</a>
            <a onClick={() => handleNavClick("women")}>Women</a>
            <a onClick={() => handleNavClick("kids")}>Kids</a>
            <a onClick={() => handleNavClick("home-living")}>Home & Living</a>
            <a onClick={() => handleNavClick("beauty")}>Beauty</a>
          </div>
          <div className="footer-col">
            <h4>Customer Policies</h4>
            <a>Contact Us</a>
            <a>FAQ</a>
            <a>T&C</a>
            <a>Terms of Use</a>
            <a>Track Orders</a>
          </div>
          <div className="footer-col">
            <h4>Experience StyleHub</h4>
            <a>Download App</a>
            <a>StyleHub Social</a>
            <a>New Arrivals</a>
          </div>
          <div className="footer-col">
            <h4>Keep in Touch</h4>
            <p>🐦 Twitter</p>
            <p>📘 Facebook</p>
            <p>📸 Instagram</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 StyleHub — India's Fashion Destination
        </div>
      </footer>
    </div>
  );
}

// ─── Root App with Router + AuthProvider ─────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth pages — full-page routes, no Navbar */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />

          {/* Main shopping app — catches everything else */}
          <Route path="*" element={<ShoppingApp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;