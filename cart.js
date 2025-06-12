function addToCart(product) {
  const { id, name, price } = product;

  if (cart[id]) {
    cart[id].quantity += 1;
  } else {
    cart[id] = { id, name, price, quantity: 1 };
  }

  renderCart();
}

let cart = {};

function addToCart(productId) {
  if (cart[productId]) {
    cart[productId].quantity += 1;
  } else {
    cart[productId] = { ...products[productId], quantity: 1 };
  }
  renderCart();
}

function removeFromCart(productId) {
  if (!cart[productId]) return;
  cart[productId].quantity -= 1;
  if (cart[productId].quantity <= 0) {
    delete cart[productId];
  }
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElem = document.getElementById("cart-total");
  const cartCountElem = document.getElementById("cart-count");

  if (cartItemsContainer) cartItemsContainer.innerHTML = "";

  let total = 0;
  let itemCount = 0;

  for (const productId in cart) {
    const item = cart[productId];
    total += item.price * item.quantity;
    itemCount += item.quantity;

    if (cartItemsContainer) {
      const li = document.createElement("li");
      li.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.style.marginLeft = "10px";
      removeBtn.onclick = () => removeFromCart(item.id);

      li.appendChild(removeBtn);
      cartItemsContainer.appendChild(li);
    }
  }

  if (cartTotalElem) cartTotalElem.textContent = total.toFixed(2);
  if (cartCountElem) cartCountElem.textContent = itemCount;
}

document.addEventListener("DOMContentLoaded", renderCart);
emailjs.send("default_service", "template_afa89jk", {
  from_name: document.getElementById("name").value,
  reply_to: document.getElementById("email").value,
  message: document.getElementById("message").value,
});
