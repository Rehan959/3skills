const products = [
  { id: 1, name: "Wireless Mouse", price: 19.99 },
  { id: 2, name: "Mechanical Keyboard", price: 59.99 },
  { id: 3, name: "27-inch Monitor", price: 189.0 },
  { id: 4, name: "USB-C Hub", price: 34.5 },
  { id: 5, name: "Desk Lamp", price: 24.99 },
  { id: 6, name: "Notebook Set", price: 9.99 },
];

const cart = new Map();

const productsEl = document.getElementById("products");
const cartEl = document.getElementById("cart");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");

function renderProducts() {
  productsEl.innerHTML = products
    .map(
      (p) => `
      <article class="card">
        <h3>${p.name}</h3>
        <p class="price">$${p.price.toFixed(2)}</p>
        <button class="add-btn" data-id="${p.id}">Add to cart</button>
      </article>`
    )
    .join("");
}

function renderCart() {
  const items = [...cart.values()];
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  cartCountEl.textContent = count;
  cartTotalEl.textContent = `$${total.toFixed(2)}`;

  cartItemsEl.innerHTML = items.length
    ? items
        .map(
          (i) => `
        <li class="cart-item">
          <span>${i.name} × ${i.qty}</span>
          <span>$${(i.qty * i.price).toFixed(2)}</span>
          <button class="remove-btn" data-id="${i.id}">Remove</button>
        </li>`
        )
        .join("")
    : "<li class='empty'>Your cart is empty</li>";
}

productsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  const product = products.find((p) => p.id === Number(btn.dataset.id));
  const existing = cart.get(product.id);
  cart.set(product.id, { ...product, qty: existing ? existing.qty + 1 : 1 });
  renderCart();
});

cartItemsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".remove-btn");
  if (!btn) return;
  cart.delete(Number(btn.dataset.id));
  renderCart();
});

document.getElementById("cart-btn").addEventListener("click", () => {
  cartEl.classList.remove("hidden");
});

document.getElementById("close-cart").addEventListener("click", () => {
  cartEl.classList.add("hidden");
});

document.getElementById("checkout").addEventListener("click", () => {
  if (!cart.size) return alert("Your cart is empty.");
  alert(`Order placed! Total: ${cartTotalEl.textContent}`);
  cart.clear();
  renderCart();
  cartEl.classList.add("hidden");
});

renderProducts();
renderCart();
