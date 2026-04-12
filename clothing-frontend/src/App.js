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

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [activePage, setActivePage] = useState("home"); // "home" | "men" | "women" | "kids" | "home-living" | "beauty" | "studio"
  const [sortBy, setSortBy] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/products")
      .then(res => { setProducts(res.data || []); setLoading(false); })
      .catch(err => { console.log(err); setLoading(false); });
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === product.size);
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.size === product.size
            ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.filter(i => i.id !== product.id);
      return [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlist.some(i => i.id === id);

  const increaseQty = (id) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));

  const decreaseQty = (id) =>
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter(i => i.quantity > 0)
    );

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const totalPrice = cart.reduce((t, i) => t + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const handleNavClick = (page) => {
    setActivePage(page);
    setCategoryFilter("");
    setSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Category pages (non-home)
  if (activePage !== "home") {
    return (
      <div>
        <PromoStrip />
        <Navbar
          cartCount={cartCount}
          setCartOpen={setCartOpen}
          search={search}
          setSearch={setSearch}
          activePage={activePage}
          onNavClick={handleNavClick}
          wishlistCount={wishlist.length}
          setWishlistOpen={setWishlistOpen}
        />
        <CartDrawer
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          cart={cart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          removeFromCart={removeFromCart}
          totalPrice={totalPrice}
        />
        <WishlistDrawer
          wishlistOpen={wishlistOpen}
          setWishlistOpen={setWishlistOpen}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
        />
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

  // Home page
  const CATEGORIES = [
    { label: "All", value: "", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=72&q=80" },
    { label: "Men", value: "Men", img: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=72&q=80" },
    { label: "Women", value: "Women", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=72&q=80" },
    { label: "Kids", value: "Kids", img: "https://images.unsplash.com/photo-1471286174890-9c112ac6a275?w=72&q=80" },
    { label: "Home", value: "Home", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=72&q=80" },
    { label: "Beauty", value: "Beauty", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=72&q=80" },
  ];

  let filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === "" || p.category?.toLowerCase() === categoryFilter.toLowerCase())
  );

  if (sortBy === "price_asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filtered = [...filtered].sort((a, b) => (b.rating || 4) - (a.rating || 4));

  return (
    <div>
      <PromoStrip />
      <Navbar
        cartCount={cartCount}
        setCartOpen={setCartOpen}
        search={search}
        setSearch={setSearch}
        activePage={activePage}
        onNavClick={handleNavClick}
        wishlistCount={wishlist.length}
        setWishlistOpen={setWishlistOpen}
      />
      <HeroBanner onShopNow={() => handleNavClick("women")} />

      <CartDrawer
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        removeFromCart={removeFromCart}
        totalPrice={totalPrice}
      />
      <WishlistDrawer
        wishlistOpen={wishlistOpen}
        setWishlistOpen={setWishlistOpen}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        addToCart={addToCart}
      />

      {/* Trending Banners */}
      <section className="trending-section">
        <h2 className="trending-title">Trending Now</h2>
        <div className="trending-grid">
          <div className="trending-card big" onClick={() => handleNavClick("women")}>
            <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80" alt="Women" />
            <div className="trending-overlay">
              <span className="trending-tag">Women</span>
              <p>New Season Arrivals</p>
              <button>Explore →</button>
            </div>
          </div>
          <div className="trending-col">
            <div className="trending-card" onClick={() => handleNavClick("men")}>
              <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80" alt="Men" />
              <div className="trending-overlay">
                <span className="trending-tag">Men</span>
                <p>Sharp & Sophisticated</p>
                <button>Shop →</button>
              </div>
            </div>
            <div className="trending-card" onClick={() => handleNavClick("kids")}>
              <img src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80" alt="Kids" />
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
          <p>Use code: <strong>STYLE40</strong> at checkout</p>
          <button className="offer-btn">Grab the Deal</button>
        </div>
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80" alt="Sale" />
      </div>

      {/* Category Chips */}
      <div className="category-chips">
        {CATEGORIES.map(c => (
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
          <button className="filter-btn" onClick={() => setCategoryFilter("Men")}>Men</button>
          <button className="filter-btn" onClick={() => setCategoryFilter("Women")}>Women</button>
        </div>
        <select className="sort-select" onChange={e => setSortBy(e.target.value)}>
          <option value="">Sort By: Recommended</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Better Rating</option>
        </select>
      </div>

      <p className="section-title">
        {categoryFilter ? `${categoryFilter}'s Fashion` : "All Products"} — {filtered.length} items
      </p>

      <div className="product-grid" style={{ marginTop: 20 }}>
        {loading ? (
          <p style={{ textAlign: "center", padding: 40, gridColumn: "1/-1" }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: "center", padding: 40, gridColumn: "1/-1" }}>No products found 😕</p>
        ) : (
          filtered.map(p => (
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
            <a>Contact Us</a><a>FAQ</a><a>T&C</a><a>Terms of Use</a><a>Track Orders</a>
          </div>
          <div className="footer-col">
            <h4>Experience StyleHub</h4>
            <a>Download App</a><a>StyleHub Social</a><a>New Arrivals</a>
          </div>
          <div className="footer-col">
            <h4>Keep in Touch</h4>
            <p>🐦 Twitter</p><p>📘 Facebook</p><p>📸 Instagram</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 StyleHub — India's Fashion Destination
        </div>
      </footer>
    </div>
  );
}

export default App;