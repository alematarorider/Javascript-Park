document.addEventListener("DOMContentLoaded", () => {
  const purchaseSummary = document.getElementById("purchaseSummary");
  const purchaseList = document.getElementById("purchaseList");
  const totalCostDisplay = document.getElementById("totalCost");
  const confirmPurchaseButton = document.getElementById(
    "confirmPurchaseButton"
  );
  const clearOrderButton = document.getElementById("clearOrderButton"); // Get the Clear Order button

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
        // Create list item in purchase summary
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
      }
    });
  });

  // Confirm purchase button event
  confirmPurchaseButton.addEventListener("click", () => {
    alert("Purchase Confirmed!");
    cartData = [];
    totalCost = 0;
    purchaseList.innerHTML = "";
    totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;
    updateLocalStorage();
  });

  // Clear order button event
  clearOrderButton.addEventListener("click", () => {
    cartData = [];
    totalCost = 0;
    purchaseList.innerHTML = "";
    totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;
    updateLocalStorage();
  });
});
