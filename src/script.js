const menuItems = [
  {
    id: 1,
    name: "Grilled Chicken Bowl",
    price: 199,
    image: "https://i.imgur.com/BnLx2uH.jpeg"
  },
  {
    id: 2,
    name: "Paneer Rice Bowl",
    price: 149,
    image: "https://i.imgur.com/h0s6Nqz.jpeg"
  },
  {
    id: 3,
    name: "Veg Roll",
    price: 79,
    image: "https://i.imgur.com/mVB9SRe.jpeg"
  },
  {
    id: 4,
    name: "Cold Coffee",
    price: 99,
    image: "https://i.imgur.com/7j9r2kn.jpeg"
  }
];

const menuContainer = document.getElementById("menu");

let cart = JSON.parse(localStorage.getItem("cart")) || {};

function renderMenu() {
  if (!menuContainer) return;

  menuContainer.innerHTML = "";

  menuItems.forEach(item => {
    const qty = cart[item.id]?.qty || 0;

    menuContainer.innerHTML += `
      <div class="item-card">
        <img src="${item.image}">
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>

          <div class="qty-box">
            <button onclick="decrease(${item.id})">−</button>
            <span>${qty}</span>
            <button onclick="increase(${item.id})">+</button>
          </div>
        </div>
      </div>
    `;
  });
}

function increase(id) {
  if (!cart[id]) {
    const item = menuItems.find(i => i.id === id);
    cart[id] = { ...item, qty: 1 };
  } else {
    cart[id].qty++;
  }
  saveCart();
}

function decrease(id) {
  if (!cart[id]) return;
  cart[id].qty--;
  if (cart[id].qty <= 0) delete cart[id];
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderMenu();
}

renderMenu();
