// Checks if document is loading or not and executes functions depending on result of check
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Only executes function to update cart once loading is done
function ready() {
  // Remove cart item loop
  var removeCartItemButtons = document.getElementsByClassName("btn-red");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  //   Item quantity input update
  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  // Add items to cart
  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  // Checkout button
  document
    .getElementsByClassName("btn-checkout")[0]
    .addEventListener("click", checkoutClicked);
}

// Add logic for when the checkout button is clicked
function checkoutClicked() {
  // For now user will be alerted of purchase -
  // UPDATE: Sign Up, Sign In, Add Card Details - Store in database
  // Store order in database as well
  alert(
    "Checkout capabilities not added yet. Please be patient as this is still under development."
  );

  // Remove items in cart one by one until the cart is empty
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

// Add to cart click function to add selected item to cart
function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;

  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

// Add item to cart
function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];

  //   Check is item to add is not already in the cart
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert(
        "Item has already been added to card. Update the quantity instead."
      );
      return;
    }
  }

  // Add item to the cart with desired styling
  var cartRowContents = `
        <div class="cart-item cart-column">
            <img src="${imageSrc}" alt="${title}" class="cart-item-image" />
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input type="number" value="1" class="cart-quantity-input" />
            <button role="button" class="btn btn-red">Remove</button>
        </div>
        `;
  cartRow.innerHTML = cartRowContents;
  cartItems.appendChild(cartRow);

  // Ensure that the added item can be removed and quantity can be updated
  cartRow
    .getElementsByClassName("btn-red")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

// Quantity change function to update input upon interaction
function quantityChanged(event) {
  var input = event.target;

  // Check if value is a valid value
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1; // Set the quantity to 1
  }
  updateCartTotal();
}

// Removes cart item from cart
function removeCartItem() {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

// Update cart total using current price and quantity after removal of item
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }

  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total.toFixed(2);
}
