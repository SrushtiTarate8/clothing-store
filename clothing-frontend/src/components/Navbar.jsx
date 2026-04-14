import React from "react";
import AccountMenu from "./AccountMenu";

const NAV_ITEMS = [
  { label: "Men", page: "men" },
  { label: "Women", page: "women" },
  { label: "Kids", page: "kids" },
  { label: "Home & Living", page: "home-living" },
  { label: "Beauty", page: "beauty" },
  { label: "Studio", page: "studio" },
];

function Navbar({
  cartCount,
  setCartOpen,
  search,
  setSearch,
  activePage,
  onNavClick,
  wishlistCount,
  setWishlistOpen,
}) {
  return (
    <div className="navbar">
      {/* Logo */}
      <h2
        className="navbar-logo"
        onClick={() => onNavClick("home")}
        style={{ cursor: "pointer" }}
      >
        StyleHub
      </h2>

      {/* Nav Links */}
      <div className="nav-links">
        {NAV_ITEMS.map((item) => (
          <span
            key={item.page}
            className={activePage === item.page ? "nav-active" : ""}
            onClick={() => onNavClick(item.page)}
          >
            {item.label}
          </span>
        ))}
      </div>

      {/* Search Bar */}
      <div className="nav-search">
        <span className="search-icon">🔍</span>
        <input
          placeholder="Search for products, brands and more"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Right-side Actions */}
      <div className="nav-actions">
        {/* Wishlist */}
        <button
          className="cart-icon-btn"
          onClick={() => setWishlistOpen((o) => !o)}
        >
          ♡
          <span className="label">Wishlist</span>
          {wishlistCount > 0 && (
            <span className="cart-badge">{wishlistCount}</span>
          )}
        </button>

        {/* Cart / Bag */}
        <button
          className="cart-icon-btn"
          onClick={() => setCartOpen((o) => !o)}
        >
          🛒
          <span className="label">Bag</span>
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </button>

        {/* Account Menu (login/profile avatar + dropdown) */}
        <AccountMenu />
      </div>
    </div>
  );
}

export default Navbar;