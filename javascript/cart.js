document.addEventListener('DOMContentLoaded', () => {
    // Elements in the DOM
    const purchaseSummary = document.getElementById('purchaseSummary');
    const purchaseList = document.getElementById('purchaseList');
    const totalCostDisplay = document.getElementById('totalCost');
    const confirmPurchaseButton = document.getElementById('confirmPurchaseButton');
    const clearOrderButton = document.getElementById('clearOrderButton'); // Get the Clear Order button

    let totalCost = 0;
    let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    // Function to update localStorage
    const updateLocalStorage = () => {
        localStorage.setItem('cartData', JSON.stringify(cartData));
        localStorage.setItem('totalCost', totalCost);
    };

    // Load the cart from localStorage if available
    cartData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `${item.name} - Quantity: ${item.quantity} - Total: $${(item.price * item.quantity).toFixed(2)}`;
        purchaseList.appendChild(listItem);
        totalCost += item.price * item.quantity;
    });

    totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;

    // Event listeners for each card's cart and purchase buttons
    document.querySelectorAll('.card').forEach(card => {
        const cartButton = card.querySelector('#cartButton');
        const purchaseButton = card.querySelector('#purchaseButton');
        const cartCount = card.querySelector('#cartCount');
        const addButton = card.querySelector('.add-btn');
        const subtractButton = card.querySelector('.subtract-btn');

        // Data attributes for the item
        const itemName = card.querySelector('.cart-group').dataset.name;
        const itemPrice = parseFloat(card.querySelector('.cart-group').dataset.price);

        // Quantity control
        let itemQuantity = 0;

        // Update cart quantity
        const updateCartDisplay = () => {
            cartCount.textContent = `(${itemQuantity})`;
        };

        // Popup summary without adding to the main summary
        const showPopupSummary = () => {
            alert(`Summary:\n${itemName}\nQuantity: ${itemQuantity}\nTotal: $${(itemPrice * itemQuantity).toFixed(2)}`);
        };

        // Add quantity
        addButton.addEventListener('click', () => {
            itemQuantity++;
            updateCartDisplay();
        });

        // Subtract quantity
        subtractButton.addEventListener('click', () => {
            if (itemQuantity > 0) {
                itemQuantity--;
                updateCartDisplay();
            }
        });

        // Show cart summary popup
        cartButton.addEventListener('click', (e) => {
            e.preventDefault();
            showPopupSummary();
        });

        // Purchase action to add to aside summary
        purchaseButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (itemQuantity > 0) {
                // Create list item in purchase summary
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.textContent = `${itemName} - Quantity: ${itemQuantity} - Total: $${(itemPrice * itemQuantity).toFixed(2)}`;

                // Append to purchase summary list
                purchaseList.appendChild(listItem);

                // Update total cost
                totalCost += itemPrice * itemQuantity;
                totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;

                // Add item to cart data
                cartData.push({
                    name: itemName,
                    price: itemPrice,
                    quantity: itemQuantity
                });

                // Update localStorage
                updateLocalStorage();

                // Reset quantity
                itemQuantity = 0;
                updateCartDisplay();
            }
        });
    });

    // Confirm all purchases button
    confirmPurchaseButton.addEventListener('click', () => {
        alert(`Thank you for your purchase! Total: $${totalCost.toFixed(2)}`);
        // Clear the purchase list and reset total
        purchaseList.innerHTML = ''; // Clears items in the aside section only
        totalCost = 0;
        totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;
        
        // Clear the cart data in localStorage
        cartData = [];
        updateLocalStorage();
    });

    // Clear Order button functionality (reset total and purchase summary in the aside)
    clearOrderButton.addEventListener('click', () => {
        // Reset the total cost in the aside section
        totalCost = 0;
        totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;

        // Reset the purchase summary in the aside section
        const purchaseSummaryItems = document.querySelectorAll('.purchase-summary .list-group-item');
        purchaseSummaryItems.forEach(item => item.remove());

        // Clear the cart data in localStorage
        cartData = [];
        updateLocalStorage();
    });
});
