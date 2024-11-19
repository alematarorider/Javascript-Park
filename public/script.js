document.addEventListener("DOMContentLoaded", async () => {
    const productListDiv = document.getElementById("productList");
    const purchaseList = document.getElementById("purchaseList");
    const totalCostDisplay = document.getElementById("totalCost");
    const confirmPurchaseButton = document.getElementById("confirmPurchaseButton");
    const clearOrderButton = document.getElementById("clearOrderButton");

    let cartData = [];
    let totalCost = 0;

    // Fetch product data
    try {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();

        products.forEach((product) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                    Add to Cart
                </button>
            `;
            productListDiv.appendChild(productCard);
        });

        document.querySelectorAll('.add-to-cart').forEach((button) => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const name = e.target.getAttribute('data-name');
                const price = parseFloat(e.target.getAttribute('data-price'));

                const existingItem = cartData.find(item => item.id === id);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cartData.push({ id, name, price, quantity: 1 });
                }

                updateCart();
            });
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    // Update cart display
    const updateCart = () => {
        purchaseList.innerHTML = '';
        totalCost = 0;

        cartData.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - Quantity: ${item.quantity} - Total: $${(item.price * item.quantity).toFixed(2)}`;
            purchaseList.appendChild(listItem);
            totalCost += item.price * item.quantity;
        });

        totalCostDisplay.textContent = `Total: $${totalCost.toFixed(2)}`;
    };

    // Confirm purchase
    confirmPurchaseButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:3000/confirm-purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartData, totalCost })
            });

            const result = await response.json();
            console.log(result);
            alert('Purchase confirmed!');
            cartData = [];
            updateCart();
        } catch (error) {
            console.error('Error confirming purchase:', error);
        }
    });

    // Clear cart
    clearOrderButton.addEventListener('click', () => {
        cartData = [];
        updateCart();
    });
});
