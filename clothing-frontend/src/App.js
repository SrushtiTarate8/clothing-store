import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

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
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 🔍 FILTER
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === "" || p.category === categoryFilter)
  );

  return (
    <div>

      {/* 🔥 NAVBAR */}
      <div className="navbar">
        <h2>StyleHub</h2>
        <div>
          <span>Home</span>
          <span>Men</span>
          <span>Women</span>
          <span>🛒 {cart.length}</span>
        </div>
      </div>

      {/* 🔍 SEARCH */}
      <div className="search-box">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
      </div>

      {/* 🛒 CART */}
      <div className="cart">
        <h2>Cart</h2>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                {item.name} - ₹{item.price}
              </div>

              <div>
                <button className="qty-btn" onClick={() => decreaseQty(item.id)}>-</button>
                {item.quantity}
                <button className="qty-btn" onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))
        )}

        {cart.length > 0 && <h3>Total: ₹{totalPrice}</h3>}
      </div>

      {/* 🛍️ PRODUCTS */}
      <div className="product-grid">
        {filteredProducts.map(p => (
          <div key={p.id} className="card">
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>
            <p>{p.category}</p>

            <button className="btn" onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;