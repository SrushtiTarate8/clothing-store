import React from "react";

function WishlistDrawer({ wishlistOpen, setWishlistOpen, wishlist, toggleWishlist, addToCart }) {
  if (!wishlistOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setWishlistOpen(false)} />
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>My Wishlist {wishlist.length > 0 && `(${wishlist.length} items)`}</h2>
          <button className="close-btn" onClick={() => setWishlistOpen(false)}>✕</button>
        </div>

        <div className="cart-items">
          {wishlist.length === 0 ? (
            <p className="empty-cart">Your wishlist is empty ♡<br /><small>Save items you love</small></p>
          ) : (
            wishlist.map(item => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/80x100"}
                  alt={item.name}
                />
                <div className="cart-item-details">
                  <p className="brand">{item.brand || item.name?.split(" ")[0]}</p>
                  <p className="name">{item.name}</p>
                  <p className="cart-item-price">₹{item.price}</p>

                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button
                      className="checkout-btn"
                      style={{ padding: "8px 14px", fontSize: 12, marginTop: 0, width: "auto" }}
                      onClick={() => { addToCart({ ...item, size: "M" }); toggleWishlist(item); }}
                    >
                      Move to Bag
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => toggleWishlist(item)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default WishlistDrawer;