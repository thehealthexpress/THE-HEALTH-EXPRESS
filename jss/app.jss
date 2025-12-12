let cart = [];

// Example menu items
const menuItems = [
    {name:"Burger", price:200, category:"meals"},
    {name:"Pizza", price:350, category:"meals"},
    {name:"Fries", price:100, category:"snacks"},
    {name:"Coke", price:50, category:"drinks"},
    {name:"Cake", price:150, category:"desserts"}
];

// Inject menu items into menu.html
window.addEventListener('DOMContentLoaded', () => {
    const menuGrid = document.getElementById('menu-grid');
    if(menuGrid){
        menuItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <img src="https://i.imgur.com/WF5hRpD.png" alt="${item.name}">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                    <div class="price-add">
                        <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
                    </div>
                </div>`;
            menuGrid.appendChild(card);
        });
    }

    // Display cart items
    displayCart();
});

// Add item to cart
function addToCart(item){
    cart.push({...item, quantity:1});
    alert(${item.name} added to cart);
    displayCart();
}

// Display cart items on cart.html
function displayCart(){
    const cartContainer = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if(!cartContainer) return;
    cartContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.innerHTML = ${item.name} x ${item.quantity} = $${item.price};
        cartContainer.appendChild(div);
    });
    totalEl.textContent = total;
}

// Checkout form
const checkoutForm = document.getElementById('checkout-form');
if(checkoutForm){
    checkoutForm.addEventListener('submit', e=>{
        e.preventDefault();
        alert("Order placed successfully!");
        cart = [];
        window.location.href = "success.html";
    });
}
