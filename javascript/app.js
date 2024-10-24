// sign up/register

function setupUser() {
  const username = prompt("Create your username:");

  const password = prompt("Create your password:");

  alert(`Username: ${username}\nPassword: ${password}\nUser setup complete!`);
  console.table(`Username: ${username}\nPassword: ${password}`);
}

setupUser();

let password;

let attempt = 0;
const MAX_ATTEMPT = 3;

do {
  password = prompt("type your password");
  attempt++;

  if (password === "hello123") {
    console.log("password correct!");
    break;
  }

  if (attempt >= MAX_ATTEMPT) {
    console.log("you have reached max attempts!");
    break;
  }
} while (true);

//personal info

let name = prompt("Type in your name");

let age;
do {
  age = parseInt(prompt("What's your age?"));
  if (isNaN(age)) {
    alert("Please type in a valid number for your age.");
  }
} while (isNaN(age));

let address;
do {
  address = parseInt(prompt("Type in your address number"));
  if (isNaN(address)) {
    alert("Please type in a valid number for your address.");
  }
} while (isNaN(address));

let street = prompt("Type in your street name");

let cityAndState = prompt("Type in your city and state");

let zipCode;
do {
  zipCode = parseInt(prompt("Type in your zip code"));
  if (isNaN(zipCode)) {
    alert("Please type in a valid number for your zip code.");
  }
} while (isNaN(zipCode));

let phoneNumber;
do {
  phoneNumber = prompt("Type in your phone number");
  if (isNaN(phoneNumber) || phoneNumber.trim() === "") {
    alert("Please type in a valid phone number.");
  }
} while (isNaN(phoneNumber) || phoneNumber.trim() === "");

let eMail;

do {
  eMail = prompt("Type in your email address");
  attempt++;

  if (eMail.includes("@")) {
    break;
    alert("Your email is valid");
    alert("Please type in a valid email address.");
  } else {
  }
  if (attempt >= MAX_ATTEMPT) {
    console.log("You have reached the maximum number of attempts!");
    break;
  }
} while (true);

const RESULT = `Name: ${name}\nAge: ${age}\nAddress Number: ${address}\nStreet: ${street}\nCity and State: ${cityAndState}\nZip Code: ${zipCode}\nPhone Number: ${phoneNumber}\nemail address :${eMail}`;
console.table(RESULT);
//end

// catalog

let ropa = [
  { item: "blusa", price: 15000, size: "Small" },
  { item: "pants", price: 20000, size: "Medium" },
  { item: "saco", price: 30000, size: "Large" },
  { item: "camisa", price: 18000, size: "Medium" },
  { item: "traje", price: 50000, size: "Large" },
];

console.log(ropa);

// Stock Check
class Product {
  constructor(name, price, stock) {
    this.name = name.toLowerCase();
    this.price = parseFloat(price).toFixed(3);
    this.stock = stock;
  }

  updateQuantity(newStock) {
    if (newStock > 0) {
      this.stock = newStock;
      console.log(`The item: ${this.name} has been added to your cart.`);
    }
  }

  stockCheck() {
    return this.stock > 0;
  }

  applyDiscount(percentageDiscount) {
    if (percentageDiscount > 0 && percentageDiscount <= 50) {
      const discountAmount = (this.price * percentageDiscount) / 100;
      this.price = (this.price - discountAmount).toFixed(3);
      console.log(
        `Thank you! ${percentageDiscount}% discount has been applied to ${this.name}.`
      );
    } else {
      alert(`You have applied an incorrect amount.`);
    }
  }
}

// shopping cart
function itemSelectionMenu(ropa) {
  let menu = "Select a product by entering the number:\n";
  ropa.forEach((item, index) => {
    menu += `${index + 1}. ${item.item} - $${item.price} (${item.size})\n`;
  });
  menu += "0. Finished Shopping?";
  return prompt(menu);
}

//total summary
function calculateTotal(cart) {
  return cart
    .reduce((total, item) => total + parseFloat(item.price), 0)
    .toFixed(3);
}

// aaply discount *needs a retry for incorrect input*
function applyDiscount(cart) {
  let discount = parseFloat(prompt("Enter discount percentage (0-30%):"));

  if (isNaN(discount) || discount < 0 || discount > 30) {
    alert(
      "Invalid discount percentage. Please enter a value between 0 and 30."
    );
    return;
  }

  cart.forEach((product) => {
    product.applyDiscount(discount);
  });

  console.log(`${discount}% discount applied to the entire cart.`);
}

// receipt
function generateReceipt(cart) {
  console.log("=== Thank You For your Purchase ===");
  const receiptItems = cart.map((item) => ({
    Item: item.item,
    Price: `$${item.price}`,
    Size: item.size,
  }));
  console.table(receiptItems);

  const total = calculateTotal(cart);
  alert(
    `Receipt Summary:\n${JSON.stringify(
      receiptItems,
      null,
      2
    )}\n\nTotal: $${total}`
  );
}

// select Function
function addToCart() {
  let cart = [];
  let selectedOption;

  do {
    selectedOption = itemSelectionMenu(ropa);

    if (selectedOption === null) {
      alert("Thank You, Goodbye.");
      break;
    }

    selectedOption = parseInt(selectedOption);

    if (selectedOption > 0 && selectedOption <= ropa.length) {
      const selectedProduct = ropa[selectedOption - 1];
      cart.push(selectedProduct);
      console.log(`You added ${selectedProduct.item} to your cart.`);
    } else if (selectedOption !== 0) {
      console.log("Invalid selection, please try again.");
    }
  } while (selectedOption !== 0);

  return cart;
}

// Shopping flow
let shoppingCart = addToCart();

// If the user added any products to the cart, display them and calculate the total
if (shoppingCart.length > 0) {
  // Display shopping cart details in a table
  console.table(shoppingCart);

  // Apply discount if the user wants to
  if (confirm("Do you want to apply a discount?")) {
    applyDiscount(shoppingCart);
  }

  // Generate receipt summary
  generateReceipt(shoppingCart);

  // Calculate total sum of selected products and display in alert
  let totalSum = calculateTotal(shoppingCart);
  alert(`The total sum for your shopping cart after discount is: $${totalSum}`);

  // Log the total to the console
  console.log(
    `The total sum for your shopping cart after discount is: $${totalSum}`
  );
} else {
  console.log("No items were added to the shopping cart.");
}
