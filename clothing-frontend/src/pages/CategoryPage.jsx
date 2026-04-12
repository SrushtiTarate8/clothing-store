import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const CATEGORY_CONFIG = {
  men: {
    label: "Men",
    hero: {
      title: "Men's Fashion",
      subtitle: "Sharp. Bold. Confident.",
      img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200&q=80",
      gradient: "linear-gradient(120deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      textColor: "#fff",
    },
    banners: [
      { title: "Formals", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80", tag: "Office Ready" },
      { title: "Casuals", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80", tag: "Weekend Vibes" },
      { title: "Ethnic", img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&q=80", tag: "Festive Season" },
      { title: "Activewear", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&q=80", tag: "Stay Fit" },
    ],
    filterKey: "men",
    mockProducts: [
      { id: "m1", name: "Classic Oxford Shirt", brand: "Arrow", price: 1299, imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80", rating: 4.5, ratingCount: 2341, category: "Men" },
      { id: "m2", name: "Slim Fit Chinos", brand: "UCB", price: 1799, imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80", rating: 4.3, ratingCount: 1876, category: "Men" },
      { id: "m3", name: "Casual Linen Shirt", brand: "Levi's", price: 999, imageUrl: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400&q=80", rating: 4.6, ratingCount: 3210, category: "Men" },
      { id: "m4", name: "Denim Jacket", brand: "Jack & Jones", price: 2499, imageUrl: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80", rating: 4.4, ratingCount: 1543, category: "Men" },
      { id: "m5", name: "Formal Blazer", brand: "Peter England", price: 3999, imageUrl: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&q=80", rating: 4.7, ratingCount: 987, category: "Men" },
      { id: "m6", name: "Polo T-Shirt", brand: "Tommy Hilfiger", price: 1499, imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", rating: 4.5, ratingCount: 4521, category: "Men" },
      { id: "m7", name: "Jogger Pants", brand: "Nike", price: 1999, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", rating: 4.8, ratingCount: 6732, category: "Men" },
      { id: "m8", name: "Ethnic Kurta", brand: "Manyavar", price: 1599, imageUrl: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80", rating: 4.6, ratingCount: 2198, category: "Men" },
    ],
  },
  women: {
    label: "Women",
    hero: {
      title: "Women's Fashion",
      subtitle: "Graceful. Vibrant. Unstoppable.",
      img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80",
      gradient: "linear-gradient(120deg, #f8bbd0 0%, #fce4ec 50%, #fff 100%)",
      textColor: "#282c3f",
    },
    banners: [
      { title: "Dresses", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&q=80", tag: "Party Ready" },
      { title: "Sarees", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80", tag: "Ethnic Elegance" },
      { title: "Western", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80", tag: "Bold & Modern" },
      { title: "Activewear", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=80", tag: "Fitness First" },
    ],
    filterKey: "women",
    mockProducts: [
      { id: "w1", name: "Floral Wrap Dress", brand: "Zara", price: 1899, imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80", rating: 4.6, ratingCount: 3421, category: "Women" },
      { id: "w2", name: "High Waist Jeans", brand: "H&M", price: 1499, imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80", rating: 4.4, ratingCount: 5123, category: "Women" },
      { id: "w3", name: "Crop Top", brand: "Forever 21", price: 599, imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80", rating: 4.3, ratingCount: 8765, category: "Women" },
      { id: "w4", name: "Printed Kurti", brand: "Biba", price: 899, imageUrl: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80", rating: 4.7, ratingCount: 2341, category: "Women" },
      { id: "w5", name: "Evening Gown", brand: "AND", price: 3499, imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80", rating: 4.8, ratingCount: 1298, category: "Women" },
      { id: "w6", name: "Denim Skirt", brand: "Vero Moda", price: 1199, imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80", rating: 4.5, ratingCount: 3876, category: "Women" },
      { id: "w7", name: "Blazer Set", brand: "Marks & Spencer", price: 4299, imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80", rating: 4.6, ratingCount: 987, category: "Women" },
      { id: "w8", name: "Summer Co-ord Set", brand: "Global Desi", price: 1699, imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80", rating: 4.4, ratingCount: 4321, category: "Women" },
    ],
  },
  kids: {
    label: "Kids",
    hero: {
      title: "Kids' Fashion",
      subtitle: "Fun. Bright. Comfortable.",
      img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1200&q=80",
      gradient: "linear-gradient(120deg, #fff9c4 0%, #fff3e0 50%, #fce4ec 100%)",
      textColor: "#282c3f",
    },
    banners: [
      { title: "Boys", img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&q=80", tag: "Adventure Wear" },
      { title: "Girls", img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=300&q=80", tag: "Pretty & Playful" },
      { title: "Infant", img: "https://images.unsplash.com/photo-1471286174890-9c112ac6a275?w=300&q=80", tag: "Tiny Trendsetters" },
      { title: "School", img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=300&q=80", tag: "Back to School" },
    ],
    filterKey: "kids",
    mockProducts: [
      { id: "k1", name: "Cartoon Print T-Shirt", brand: "H&M Kids", price: 399, imageUrl: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&q=80", rating: 4.5, ratingCount: 1234, category: "Kids" },
      { id: "k2", name: "Denim Overalls", brand: "Zara Kids", price: 799, imageUrl: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80", rating: 4.6, ratingCount: 876, category: "Kids" },
      { id: "k3", name: "Floral Frock", brand: "Mothercare", price: 599, imageUrl: "https://images.unsplash.com/photo-1471286174890-9c112ac6a275?w=400&q=80", rating: 4.7, ratingCount: 2341, category: "Kids" },
      { id: "k4", name: "Sports Tracksuit", brand: "Nike Kids", price: 1299, imageUrl: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&q=80", rating: 4.8, ratingCount: 543, category: "Kids" },
      { id: "k5", name: "Ethnic Kurta Pajama", brand: "FabIndia Kids", price: 699, imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80", rating: 4.4, ratingCount: 765, category: "Kids" },
      { id: "k6", name: "Rainbow Hoodie", brand: "Gap Kids", price: 999, imageUrl: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80", rating: 4.6, ratingCount: 1098, category: "Kids" },
    ],
  },
  "home-living": {
    label: "Home & Living",
    hero: {
      title: "Home & Living",
      subtitle: "Make every corner beautiful.",
      img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      gradient: "linear-gradient(120deg, #e8f5e9 0%, #f3e5f5 50%, #fff8e1 100%)",
      textColor: "#282c3f",
    },
    banners: [
      { title: "Bedding", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&q=80", tag: "Sleep Better" },
      { title: "Decor", img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=300&q=80", tag: "Style Your Home" },
      { title: "Kitchen", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80", tag: "Chef's Pick" },
      { title: "Bath", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=300&q=80", tag: "Spa at Home" },
    ],
    filterKey: "home",
    mockProducts: [
      { id: "h1", name: "Luxury Bedsheet Set", brand: "Spaces", price: 1499, imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80", rating: 4.7, ratingCount: 3214, category: "Home" },
      { id: "h2", name: "Ceramic Vase Set", brand: "Home Centre", price: 699, imageUrl: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80", rating: 4.5, ratingCount: 876, category: "Home" },
      { id: "h3", name: "Scented Candle Pack", brand: "Iba", price: 399, imageUrl: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=400&q=80", rating: 4.8, ratingCount: 5432, category: "Home" },
      { id: "h4", name: "Throw Blanket", brand: "Raymond Home", price: 1199, imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", rating: 4.6, ratingCount: 2143, category: "Home" },
      { id: "h5", name: "Wall Art Print", brand: "Artbox", price: 849, imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80", rating: 4.4, ratingCount: 1234, category: "Home" },
      { id: "h6", name: "Plant Pot Set", brand: "Green & Earth", price: 549, imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80", rating: 4.7, ratingCount: 987, category: "Home" },
    ],
  },
  beauty: {
    label: "Beauty",
    hero: {
      title: "Beauty & Skincare",
      subtitle: "Glow up. Every single day.",
      img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80",
      gradient: "linear-gradient(120deg, #fce4ec 0%, #f8bbd0 50%, #fff 100%)",
      textColor: "#282c3f",
    },
    banners: [
      { title: "Skincare", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80", tag: "Radiant Skin" },
      { title: "Makeup", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80", tag: "Bold Looks" },
      { title: "Haircare", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80", tag: "Healthy Hair" },
      { title: "Fragrance", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&q=80", tag: "Signature Scent" },
    ],
    filterKey: "beauty",
    mockProducts: [
      { id: "b1", name: "Vitamin C Serum", brand: "Minimalist", price: 499, imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80", rating: 4.8, ratingCount: 12341, category: "Beauty" },
      { id: "b2", name: "Matte Lipstick", brand: "Nykaa", price: 299, imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80", rating: 4.6, ratingCount: 8765, category: "Beauty" },
      { id: "b3", name: "Argan Oil Shampoo", brand: "WOW", price: 399, imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80", rating: 4.5, ratingCount: 6543, category: "Beauty" },
      { id: "b4", name: "Perfume EDP 50ml", brand: "Engage", price: 799, imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&q=80", rating: 4.7, ratingCount: 3214, category: "Beauty" },
      { id: "b5", name: "Face Wash Gel", brand: "Plum", price: 249, imageUrl: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&q=80", rating: 4.4, ratingCount: 9876, category: "Beauty" },
      { id: "b6", name: "Sunscreen SPF 50", brand: "Dot & Key", price: 349, imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80", rating: 4.9, ratingCount: 15432, category: "Beauty" },
    ],
  },
  studio: {
    label: "Studio",
    hero: {
      title: "StyleHub Studio",
      subtitle: "Curated. Exclusive. Yours.",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      gradient: "linear-gradient(120deg, #212121 0%, #37474f 50%, #263238 100%)",
      textColor: "#fff",
    },
    banners: [
      { title: "Designer", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80", tag: "Luxury Picks" },
      { title: "Streetwear", img: "https://images.unsplash.com/photo-1552668693-d0738e00eca8?w=300&q=80", tag: "Urban Cool" },
      { title: "Sustainable", img: "https://images.unsplash.com/photo-1542601906897-edc39f5e5a9e?w=300&q=80", tag: "Eco Fashion" },
      { title: "Vintage", img: "https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=300&q=80", tag: "Retro Vibes" },
    ],
    filterKey: "studio",
    mockProducts: [
      { id: "s1", name: "Designer Kurta Set", brand: "Sabyasachi", price: 8999, imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.9, ratingCount: 342, category: "Studio" },
      { id: "s2", name: "Streetwear Hoodie", brand: "Huemn", price: 3499, imageUrl: "https://images.unsplash.com/photo-1552668693-d0738e00eca8?w=400&q=80", rating: 4.7, ratingCount: 876, category: "Studio" },
      { id: "s3", name: "Organic Cotton Tee", brand: "No Nasties", price: 999, imageUrl: "https://images.unsplash.com/photo-1542601906897-edc39f5e5a9e?w=400&q=80", rating: 4.6, ratingCount: 1234, category: "Studio" },
      { id: "s4", name: "Vintage Denim Jacket", brand: "Levi's Vintage", price: 5999, imageUrl: "https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=400&q=80", rating: 4.8, ratingCount: 543, category: "Studio" },
      { id: "s5", name: "Silk Slip Dress", brand: "Label Ritu Kumar", price: 6499, imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80", rating: 4.9, ratingCount: 287, category: "Studio" },
      { id: "s6", name: "Handwoven Shawl", brand: "FabIndia", price: 2299, imageUrl: "https://images.unsplash.com/photo-1601925228870-dc33a99ab7ef?w=400&q=80", rating: 4.7, ratingCount: 432, category: "Studio" },
    ],
  },
};

function CategoryPage({ category, products, addToCart, toggleWishlist, isWishlisted, search }) {
  const [sortBy, setSortBy] = useState("");
  const config = CATEGORY_CONFIG[category];

  if (!config) return <p style={{ padding: 40 }}>Coming soon...</p>;

  // Use backend products filtered by category if available, else use mock
  const backendProducts = products.filter(p =>
    p.category?.toLowerCase() === config.filterKey.toLowerCase() &&
    p.name?.toLowerCase().includes(search.toLowerCase())
  );
  const displayProducts = backendProducts.length > 0 ? backendProducts : config.mockProducts.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  let sorted = [...displayProducts];
  if (sortBy === "price_asc") sorted.sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc") sorted.sort((a, b) => b.price - a.price);
  if (sortBy === "rating") sorted.sort((a, b) => (b.rating || 4) - (a.rating || 4));

  const { hero, banners, label } = config;

  return (
    <div>
      {/* Hero */}
      <div
        className="category-hero"
        style={{ background: hero.gradient, color: hero.textColor }}
      >
        <div className="category-hero-text">
          <p className="eyebrow" style={{ color: hero.textColor === "#fff" ? "#ff8a80" : "#FF3F6C" }}>
            {label.toUpperCase()} COLLECTION
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, lineHeight: 1.1, margin: "12px 0" }}>
            {hero.title}
          </h1>
          <p style={{ fontSize: 18, opacity: 0.8 }}>{hero.subtitle}</p>
        </div>
        <div className="category-hero-img">
          <img src={hero.img} alt={label} />
        </div>
      </div>

      {/* Sub-category banners */}
      <section className="sub-cat-section">
        <h3 className="sub-cat-title">Shop by Category</h3>
        <div className="sub-cat-grid">
          {banners.map((b, i) => (
            <div key={i} className="sub-cat-card">
              <img src={b.img} alt={b.title} />
              <div className="sub-cat-overlay">
                <span className="sub-cat-tag">{b.tag}</span>
                <p>{b.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sort Bar */}
      <div className="filter-bar">
        <p style={{ fontWeight: 700, fontSize: 16 }}>{label}'s Collection — {sorted.length} items</p>
        <select className="sort-select" onChange={e => setSortBy(e.target.value)}>
          <option value="">Sort By: Recommended</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Better Rating</option>
        </select>
      </div>

      {/* Products */}
      <div className="product-grid" style={{ marginTop: 20, marginBottom: 60 }}>
        {sorted.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted(p.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;