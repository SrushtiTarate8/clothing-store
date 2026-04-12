import React from "react";

const SIZES = ["XS", "S", "M", "L", "XL"];

function ProductCard({ product, addToCart, toggleWishlist, isWishlisted }) {
  if (!product) return null;

  const originalPrice = Math.round(product.price * 1.4);
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);
  const rating = product.rating || (4.0 + Math.random()).toFixed(1);
  const ratingCount = product.ratingCount || Math.floor(Math.random() * 2000 + 100);
  const brand = product.brand || product.name?.split(" ")[0] || "StyleHub";

  return (
    <div className="card">
      <div className="card-img-wrap">
        <img src={product.imageUrl} alt={product.name} />

        {/* Wishlist */}
        <button
          className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
          onClick={() => toggleWishlist(product)}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>

        {/* Quick-add sizes on hover */}
        <div className="quick-add">
          {SIZES.map(s => (
            <button
              key={s}
              className="size-btn"
              onClick={() => addToCart({ ...product, size: s })}
              title={`Add size ${s}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="card-info">
        <p className="brand-name">{brand}</p>
        <p className="product-name">{product.name}</p>

        <div className="price-row">
          <span className="price-current">₹{product.price}</span>
          <span className="price-original">₹{originalPrice}</span>
          <span className="price-discount">({discount}% OFF)</span>
        </div>

        <div className="rating-row">
          <span className="rating-badge">⭐ {rating}</span>
          <span className="rating-count">({ratingCount.toLocaleString()})</span>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={() => addToCart({ ...product, size: "M" })}
        >
          + Add to Bag
        </button>
      </div>
    </div>
  );
}

export default ProductCard;