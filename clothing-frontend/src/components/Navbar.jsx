import React from "react";

const NAV_ITEMS = [
  { label: "Men", page: "men" },
  { label: "Women", page: "women" },
  { label: "Kids", page: "kids" },
  { label: "Home & Living", page: "home-living" },
  { label: "Beauty", page: "beauty" },
  { label: "Studio", page: "studio" },
];

function Navbar({ cartCount, setCartOpen, search, setSearch, activePage, onNavClick, wishlistCount, setWishlistOpen }) {
  return (
    <div className="navbar">
      <h2 className="navbar-logo" onClick={() => onNavClick("home")} style={{ cursor: "pointer" }}>
        StyleHub
      </h2>

      <div className="nav-links">
        {NAV_ITEMS.map(item => (
          <span
            key={item.page}
            className={activePage === item.page ? "nav-active" : ""}
            onClick={() => onNavClick(item.page)}
          >
            {item.label}
          </span>
        ))}
      </div>

      <div className="nav-search">
        <span className="search-icon">🔍</span>
        <input
          placeholder="Search for products, brands and more"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="nav-actions">
        <button className="cart-icon-btn" onClick={() => setWishlistOpen(o => !o)}>
          ♡
          <span className="label">Wishlist</span>
          {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
        </button>

        <button className="cart-icon-btn" onClick={() => setCartOpen(o => !o)}>
          🛒
          <span className="label">Bag</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </div>
  );
}

export default Navbar;