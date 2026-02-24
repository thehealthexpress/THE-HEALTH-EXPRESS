import React, { useEffect, useMemo, useState } from 'react';
import { FaMapMarkerAlt, FaMinus, FaPlus, FaShoppingBag, FaShoppingBasket, FaUserCircle } from 'react-icons/fa';

const MENU_ITEMS = [
  {
    id: 'thx-1',
    name: 'Power Protein Bowl',
    description: 'Quinoa, tofu tikka, avocado, crunchy seeds, lemon tahini.',
    price: 259,
    tag: 'High Protein',
    eta: '18 min'
  },
  {
    id: 'thx-2',
    name: 'Rainbow Millet Khichdi',
    description: 'Foxtail millet, vegetables, curry leaf ghee tadka.',
    price: 199,
    tag: 'Satvik',
    eta: '22 min'
  },
  {
    id: 'thx-3',
    name: 'Green Detox Wrap',
    description: 'Spinach roti, hummus, sprouts, cucumber ribbons.',
    price: 179,
    tag: 'Low Calorie',
    eta: '16 min'
  },
  {
    id: 'thx-4',
    name: 'Immunity Soup Combo',
    description: 'Turmeric ginger soup with grilled paneer salad side.',
    price: 229,
    tag: 'Chef Special',
    eta: '20 min'
  },
  {
    id: 'thx-5',
    name: 'Sunrise Fruit Yogurt Jar',
    description: 'Greek yogurt, seasonal fruits, flax and honey crunch.',
    price: 149,
    tag: 'Breakfast',
    eta: '14 min'
  },
  {
    id: 'thx-6',
    name: 'Hydration Booster Juice',
    description: 'Cold-pressed orange, carrot, amla and mint.',
    price: 119,
    tag: 'Beverage',
    eta: '12 min'
  }
];

const DEFAULT_ADDRESSES = [
  { id: 'home', label: 'Home', line: 'S-203, Udyog Vihar, Gurugram' },
  { id: 'work', label: 'Work', line: 'Sector 45, Green Plaza Towers, Gurugram' }
];

const STORAGE_KEYS = {
  cart: 'the-health-express-cart',
  orders: 'the-health-express-orders',
  addresses: 'the-health-express-addresses',
  profile: 'the-health-express-profile'
};

const currency = (value) => `₹${value.toFixed(0)}`;

const App = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState(DEFAULT_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [newAddress, setNewAddress] = useState({ label: '', line: '' });
  const [profile, setProfile] = useState({
    name: 'Health Express Member',
    phone: '+91 98765 43210',
    email: 'member@healthexpress.com',
    wellnessMode: true
  });

  useEffect(() => {
    const savedCart = localStorage.getItem(STORAGE_KEYS.cart);
    const savedOrders = localStorage.getItem(STORAGE_KEYS.orders);
    const savedAddresses = localStorage.getItem(STORAGE_KEYS.addresses);
    const savedProfile = localStorage.getItem(STORAGE_KEYS.profile);

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  useEffect(() => localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.addresses, JSON.stringify(addresses)), [addresses]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile)), [profile]);

  const groupedCart = useMemo(() => {
    const groups = new Map();

    cart.forEach((item) => {
      const existing = groups.get(item.id);
      if (existing) {
        existing.qty += 1;
      } else {
        groups.set(item.id, { ...item, qty: 1 });
      }
    });

    return Array.from(groups.values());
  }, [cart]);

  const subtotal = groupedCart.reduce((total, item) => total + item.qty * item.price, 0);
  const deliveryFee = groupedCart.length ? 29 : 0;
  const handlingFee = groupedCart.length ? 12 : 0;
  const grandTotal = subtotal + deliveryFee + handlingFee;

  const addToCart = (item) => setCart((prev) => [...prev, item]);

  const updateQty = (itemId, delta) => {
    setCart((prev) => {
      if (delta > 0) {
        const targetItem = MENU_ITEMS.find((item) => item.id === itemId);
        return targetItem ? [...prev, targetItem] : prev;
      }

      const removeIndex = prev.findIndex((item) => item.id === itemId);
      if (removeIndex === -1) return prev;

      return prev.filter((_, index) => index !== removeIndex);
    });
  };

  const placeOrder = () => {
    if (!groupedCart.length) return;

    const order = {
      id: `THX-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleString(),
      items: groupedCart,
      total: grandTotal,
      address: addresses.find((address) => address.id === selectedAddress)?.line || 'Address unavailable',
      status: 'Preparing'
    };

    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setActiveTab('orders');
  };

  const addAddress = () => {
    if (!newAddress.label.trim() || !newAddress.line.trim()) return;

    const id = `${newAddress.label.toLowerCase()}-${Date.now()}`;
    setAddresses((prev) => [...prev, { id, label: newAddress.label.trim(), line: newAddress.line.trim() }]);
    setSelectedAddress(id);
    setNewAddress({ label: '', line: '' });
  };

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand-wrap">
          <div className="logo-mark">TH</div>
          <div>
            <p className="brand-name">THE HEALTH EXPRESS</p>
            <p className="brand-subtitle">Healthy bistro-style delivery</p>
          </div>
        </div>
        <div className="service-meta">
          <span><FaMapMarkerAlt /> Udyog Vihar • 30 mins</span>
          <span><FaShoppingBasket /> Cart {cart.length}</span>
          <button className="profile-chip"><FaUserCircle /> {profile.name}</button>
        </div>
      </header>

      <main className="content-grid">
        <section className="main-panel">
          <div className="hero-banner">
            <h1>Fresh bowls, wraps & wellness meals from your single favourite kitchen.</h1>
            <p>
              Crafted for fast delivery with mindful ingredients. Inspired by modern quick-commerce bistro layout.
            </p>
          </div>

          <div className="tabs">
            {[
              ['menu', 'Menu'],
              ['cart', 'My Cart'],
              ['orders', 'My Orders'],
              ['addresses', 'My Addresses'],
              ['settings', 'Settings']
            ].map(([id, label]) => (
              <button
                key={id}
                className={activeTab === id ? 'tab active' : 'tab'}
                onClick={() => setActiveTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'menu' && (
            <div className="card-grid">
              {MENU_ITEMS.map((item) => (
                <article key={item.id} className="menu-card">
                  <div className="food-image" />
                  <p className="pill">{item.tag}</p>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="row between">
                    <strong>{currency(item.price)}</strong>
                    <span>{item.eta}</span>
                  </div>
                  <button onClick={() => addToCart(item)} className="primary-btn">Add</button>
                </article>
              ))}
            </div>
          )}

          {activeTab === 'cart' && (
            <section className="stack">
              {!groupedCart.length ? (
                <p className="empty-state">Your cart is empty. Add healthy meals from the menu tab.</p>
              ) : (
                groupedCart.map((item) => (
                  <article key={item.id} className="line-item">
                    <div>
                      <h4>{item.name}</h4>
                      <p>{currency(item.price)} each</p>
                    </div>
                    <div className="qty-wrap">
                      <button onClick={() => updateQty(item.id, -1)}><FaMinus /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}><FaPlus /></button>
                    </div>
                  </article>
                ))
              )}
            </section>
          )}

          {activeTab === 'orders' && (
            <section className="stack">
              {!orders.length ? (
                <p className="empty-state">No orders yet. Your completed orders will appear here.</p>
              ) : (
                orders.map((order) => (
                  <article key={order.id} className="order-card">
                    <div className="row between">
                      <h4>Order #{order.id}</h4>
                      <span className="pill">{order.status}</span>
                    </div>
                    <p>{order.createdAt}</p>
                    <p>{order.items.map((item) => `${item.name} x${item.qty}`).join(', ')}</p>
                    <p>Deliver to: {order.address}</p>
                    <strong>{currency(order.total)}</strong>
                  </article>
                ))
              )}
            </section>
          )}

          {activeTab === 'addresses' && (
            <section className="stack">
              {addresses.map((address) => (
                <label key={address.id} className="address-option">
                  <input
                    type="radio"
                    checked={selectedAddress === address.id}
                    onChange={() => setSelectedAddress(address.id)}
                  />
                  <div>
                    <h4>{address.label}</h4>
                    <p>{address.line}</p>
                  </div>
                </label>
              ))}
              <div className="address-form">
                <input
                  placeholder="Label (Home, Gym...)"
                  value={newAddress.label}
                  onChange={(event) => setNewAddress((prev) => ({ ...prev, label: event.target.value }))}
                />
                <input
                  placeholder="Complete address"
                  value={newAddress.line}
                  onChange={(event) => setNewAddress((prev) => ({ ...prev, line: event.target.value }))}
                />
                <button onClick={addAddress} className="primary-btn">Save Address</button>
              </div>
            </section>
          )}

          {activeTab === 'settings' && (
            <section className="settings-panel">
              <label>
                Full Name
                <input
                  value={profile.name}
                  onChange={(event) => setProfile((prev) => ({ ...prev, name: event.target.value }))}
                />
              </label>
              <label>
                Phone Number
                <input
                  value={profile.phone}
                  onChange={(event) => setProfile((prev) => ({ ...prev, phone: event.target.value }))}
                />
              </label>
              <label>
                Email
                <input
                  value={profile.email}
                  onChange={(event) => setProfile((prev) => ({ ...prev, email: event.target.value }))}
                />
              </label>
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={profile.wellnessMode}
                  onChange={(event) => setProfile((prev) => ({ ...prev, wellnessMode: event.target.checked }))}
                />
                Enable wellness recommendations
              </label>
            </section>
          )}
        </section>

        <aside className="checkout-panel">
          <h3><FaShoppingBag /> Bill Details</h3>
          <div className="row between"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
          <div className="row between"><span>Delivery Fee</span><span>{currency(deliveryFee)}</span></div>
          <div className="row between"><span>Handling Fee</span><span>{currency(handlingFee)}</span></div>
          <hr />
          <div className="row between total"><span>To Pay</span><span>{currency(grandTotal)}</span></div>
          <button className="primary-btn checkout-btn" disabled={!groupedCart.length} onClick={placeOrder}>
            Place Order
          </button>
        </aside>
      </main>
    </div>
  );
};

export default App;
