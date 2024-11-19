document.addEventListener("DOMContentLoaded", () => {
  const purchaseSummary = document.getElementById("purchaseSummary");
  const purchaseList = document.getElementById("purchaseList");
  const totalCostDisplay = document.getElementById("totalCost");
  const confirmPurchaseButton = document.getElementById(
    "confirmPurchaseButton"
  );
  const clearOrderButton = document.getElementById("clearOrderButton");

  let totalCost = 0;
  let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

  const updateLocalStorage = () => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
    localStorage.setItem("totalCost", totalCost);
  };

  cartData.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = `${item.name} - Quantity: ${
      item.quantity
    } - Total: $${(item.price * item.quantity).toFixed(2)}`;
    purchaseList.appendChild(listItem);
    totalCost += item.price * item.quantity;
  });

  totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;

  document.querySelectorAll(".card").forEach((card) => {
    const cartButton = card.querySelector("#cartButton");
    const purchaseButton = card.querySelector("#purchaseButton");
    const cartCount = card.querySelector("#cartCount");
    const addButton = card.querySelector(".add-btn");
    const subtractButton = card.querySelector(".subtract-btn");

    const itemName = card.querySelector(".cart-group").dataset.name;
    const itemPrice = parseFloat(
      card.querySelector(".cart-group").dataset.price
    );

    let itemQuantity = 0;

    const updateCartDisplay = () => {
      cartCount.textContent = `(${itemQuantity})`;
    };

    const showPopupSummary = () => {
      alert(
        `Summary:\n${itemName}\nQuantity: ${itemQuantity}\nTotal: $${(
          itemPrice * itemQuantity
        ).toFixed(2)}`
      );
    };

    addButton.addEventListener("click", () => {
      itemQuantity++;
      updateCartDisplay();
    });

    subtractButton.addEventListener("click", () => {
      if (itemQuantity > 0) {
        itemQuantity--;
        updateCartDisplay();
      }
    });

    cartButton.addEventListener("click", (e) => {
      e.preventDefault();
      showPopupSummary();
    });

    purchaseButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (itemQuantity > 0) {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = `${itemName} - Quantity: ${itemQuantity} - Total: $${(
          itemPrice * itemQuantity
        ).toFixed(2)}`;

        purchaseList.appendChild(listItem);

        totalCost += itemPrice * itemQuantity;
        totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;

        cartData.push({
          name: itemName,
          price: itemPrice,
          quantity: itemQuantity,
        });

        updateLocalStorage();

        itemQuantity = 0;
        updateCartDisplay();
      }
    });
  });

  confirmPurchaseButton.addEventListener("click", async () => {
    try {
        const response = await fetch('http://localhost:3000/confirm-purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartData, totalCost }),
        });
        const result = await response.json();
        alert(result.message); // Show confirmation message
        // Reset cart after confirmation
    } catch (error) {
        console.error('Error confirming purchase:', error);
    }
});

  // Confirm purchase
  confirmPurchaseButton.addEventListener("click", () => {
    alert(`Purchase Confirmed! Your total is :$${totalCost.toFixed(2)}`);
    cartData = [];
    totalCost = 0;
    purchaseList.innerHTML = "";
    totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;
    updateLocalStorage();

    document.querySelectorAll(".card input").forEach((input) => {
      if (input.type === "number") {
        input.value = 0; // Reset to 0
      }
    });

    // Reset cart
    document.querySelectorAll(".card #cartCount").forEach((cartCount) => {
      cartCount.textContent = "(0)";
    });
  });

  // Clear order
  clearOrderButton.addEventListener("click", () => {
    cartData = [];
    totalCost = 0;
    purchaseList.innerHTML = "";
    totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;
    updateLocalStorage();
  });
});
