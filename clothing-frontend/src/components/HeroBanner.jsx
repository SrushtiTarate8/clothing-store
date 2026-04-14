import React from "react";

function HeroBanner({ onShopNow }) {
  return (
    <div className="hero-banner">
      <div className="hero-text">
        <p className="eyebrow">End of Season Sale</p>
        <h1>Styles that<br />speak for you</h1>
        <p>Up to 50% off on top brands</p>
        <button className="hero-cta" onClick={onShopNow}>Shop Now</button>
      </div>

      <div className="hero-img-wrap">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=480&q=80"
          alt="Fashion"
        />
      </div>

      {/* Floating badges */}
      <div className="hero-badge hero-badge-1">
        <span>🔥</span>
        <div>
          <p>Hot Deal</p>
          <p>Up to 50% OFF</p>
        </div>
      </div>
      <div className="hero-badge hero-badge-2">
        <span>🚚</span>
        <div>
          <p>Free Delivery</p>
          <p>On orders ₹999+</p>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;