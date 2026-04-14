import React, { useState, useEffect } from "react";

const PROMO_MESSAGES = [
  "🚚 Free shipping above ₹999",
  "🎉 Use code STYLE20",
  "🔁 30-day returns",
  "⭐ New arrivals weekly"
];

function PromoStrip() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx(i => (i + 1) % PROMO_MESSAGES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="promo-strip">
      <span>{PROMO_MESSAGES[idx]}</span>
    </div>
  );
}

export default PromoStrip;