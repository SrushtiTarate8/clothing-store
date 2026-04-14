import React from "react";
 
function CartDrawer({
  cartOpen,
  setCartOpen,
  cart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  totalPrice,
  onPlaceOrder,
}) {
  if (!cartOpen) return null;
 
  const savings = cart.reduce((sum, item) => {
    const orig = Math.round(item.price * 1.4);
    return sum + (orig - item.price) * item.quantity;
  }, 0);
 
  return (
    <>
      <div className="cart-overlay" onClick={() => setCartOpen(false)} />
 
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>My Bag {cart.length > 0 && `(${cart.reduce((s,i)=>s+i.quantity,0)} items)`}</h2>
          <button className="close-btn" onClick={() => setCartOpen(false)}>✕</button>
        </div>
 
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your bag is empty 🛍️<br /><small>Add items to it now</small></p>
          ) : (
            cart.map(item => (
              <div key={item.id + (item.size || "")} className="cart-item">
                {/* Show image if available, else a placeholder */}
                <img
                  src={item.imageUrl || "https://via.placeholder.com/80x100"}
                  alt={item.name}
                />
 
                <div className="cart-item-details">
                  <p className="brand">{item.brand || item.name?.split(" ")[0]}</p>
                  <p className="name">{item.name}{item.size ? ` — ${item.size}` : ""}</p>
                  <p className="cart-item-price">₹{item.price}</p>
 
                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item.id)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
 
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
 
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="price-breakdown">
              <span>Total MRP</span>
              <span>₹{Math.round(totalPrice * 1.4)}</span>
            </div>
            <div className="price-breakdown" style={{ color: "#26a541" }}>
              <span>Discount on MRP</span>
              <span>- ₹{savings}</span>
            </div>
            <div className="price-breakdown">
              <span>Shipping Fee</span>
              <span style={{ color: "#26a541" }}>FREE</span>
            </div>
            <div className="price-breakdown total">
              <span>Total Amount</span>
              <span>₹{totalPrice}</span>
            </div>
            <button className="checkout-btn" onClick={onPlaceOrder}>
              Place Order
            </button>
          </div>
        )}
      </div>
    </>
  );
}
 
export default CartDrawer;