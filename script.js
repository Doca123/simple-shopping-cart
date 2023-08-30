document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const clearCartButton = document.getElementById("clear-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", addToCart);
  });

  clearCartButton.addEventListener("click", clearCart);

  updateCart();

  function addToCart(event) {
    const productId = event.target.getAttribute("data-id");
    const quantityInput = event.target.previousElementSibling;
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity <= 0) {
      return; // Don't add to cart if quantity is invalid
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    for (let i = 0; i < quantity; i++) {
      cart.push(productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }

  function updateCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsList.innerHTML = "";

    let total = 0;
    cart.forEach(productId => {
      const product = document.createElement("li");
      product.textContent = `Product ${productId}`;
      cartItemsList.appendChild(product);
      total += productId === "1" ? 10 : 15;
    });

    cartTotal.textContent = total;
  }

  function clearCart() {
    localStorage.removeItem("cart");
    updateCart();
  }
});
