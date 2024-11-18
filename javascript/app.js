// sign up/register
// let password1;
// function setupUser() {
//   const username = prompt("Create your username:");

//   password1 = prompt("Create your password:");

//   alert(`Username: ${username}\nPassword: ${password1}\nUser setup complete!`);
//   console.table(`Username: ${username}\nPassword: ${password1}`);
// }

// setupUser();

// let password;

// let attempt = 0;
// const MAX_ATTEMPT = 3;

// do {
//   password = prompt("type your password");
//   attempt++;

//   if (password === password1) {
//     console.log("password correct!");
//     break;
//   }

//   if (attempt >= MAX_ATTEMPT) {
//     console.log("you have reached max attempts!");
//     break;
//   }
// } while (true);



// login and password
// const sampleUser = {
//   email: "test@example.com",
//   password: "password123"
// };

// document.getElementById('login-form').addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent page reload

//   const email = document.getElementById('login-email').value;
//   const password = document.getElementById('login-pass').value;

//   if (email === sampleUser.email && password === sampleUser.password) {
//       alert("Login successful!");
//       // Redirect to a new page (to index)
//   } else {
//       alert("Incorrect email or password.");
//   }
// });

// // signup
// document.getElementById('signup-form').addEventListener('submit', function(event) {
//   event.preventDefault(); 

//   const email = document.getElementById('signup-email').value;
//   const password = document.getElementById('signup-pass').value;
//   const confirmPassword = document.getElementById('signup-repass').value;

//   if (password !== confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//   }

//   if (password.length < 6) {
//       alert("Password must be at least 6 characters long.");
//       return;
//   }

//   alert("Signup successful! You can now log in.");
//   //redirect to a login page
// });

// //personal info

// let name = prompt("Type in your name");

// let age;
// do {
//   age = parseInt(prompt("What's your age?"));
//   if (isNaN(age)) {
//     alert("Please type in a valid number for your age.");
//   }
// } while (isNaN(age));

// let address;
// do {
//   address = parseInt(prompt("Type in your address number"));
//   if (isNaN(address)) {
//     alert("Please type in a valid number for your address.");
//   }
// } while (isNaN(address));

// let street = prompt("Type in your street name");

// let cityAndState = prompt("Type in your city and state");

// let zipCode;
// do {
//   zipCode = parseInt(prompt("Type in your zip code"));
//   if (isNaN(zipCode)) {
//     alert("Please type in a valid number for your zip code.");
//   }
// } while (isNaN(zipCode));

// let phoneNumber;
// do {
//   phoneNumber = prompt("Type in your phone number");
//   if (isNaN(phoneNumber) || phoneNumber.trim() === "") {
//     alert("Please type in a valid phone number.");
//   }
// } while (isNaN(phoneNumber) || phoneNumber.trim() === "");

// let eMail;
// attempt = 0; // Reset attempt for email validation

// do {
//   eMail = prompt("Type in your email address");
//   attempt++;

//   if (eMail.includes("@") && eMail.includes(".com")) {
//     alert("Your email is valid");
//     break;
//   } else {
//     alert("Must include : '@' followed by a '.com'");
//   }

//   if (attempt >= MAX_ATTEMPT) {
//     console.log("You have reached the maximum number of attempts!");
//     break; // Exit the loop if the maximum attempts are reached
//   }
// } while (true);

// const RESULT = `Name: ${name}\nAge: ${age}\nAddress Number: ${address}\nStreet: ${street}\nCity and State: ${cityAndState}\nZip Code: ${zipCode}\nPhone Number: ${phoneNumber}\nemail address :${eMail}`;
// console.table(RESULT);
// //end

document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-pass').value;
  const confirmPassword = document.getElementById('signup-repass').value;

  // Validate passwords match
  if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
  }

  // Save data to localStorage
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userPassword', password);

  alert('Sign-up successful! You can now log in.');

  // Reset the form inputs
  e.target.reset();
});

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-pass').value;

  // Retrieve data from localStorage
  const storedEmail = localStorage.getItem('userEmail');
  const storedPassword = localStorage.getItem('userPassword');

  // Validate login credentials
  if (email === storedEmail) {
      if (password === storedPassword) {
          alert('Login successful! Welcome back.');
          // Reset the form inputs
          e.target.reset();
      } else {
          alert('Incorrect password!');
      }
  } else {
      alert('Email not found!');
  }
});



// catalog

// let ropa = [
//   { item: "blusa", price: 15000, size: "Small" },
//   { item: "pants", price: 20000, size: "Medium" },
//   { item: "saco", price: 30000, size: "Large" },
//   { item: "camisa", price: 18000, size: "Medium" },
//   { item: "traje", price: 50000, size: "Large" },
// ];

// console.log(ropa);

// // Stock Check
// class Product {
//   constructor(name, price, stock) {
//     this.name = name.toLowerCase();
//     this.price = parseFloat(price).toFixed(3);
//     this.stock = stock;
//   }

//   updateQuantity(newStock) {
//     if (newStock > 0) {
//       this.stock = newStock;
//       console.log(`The item: ${this.name} has been added to your cart.`);
//     }
//   }

//   stockCheck() {
//     return this.stock > 0;
//   }

//   applyDiscount(percentageDiscount) {
//     if (percentageDiscount > 0 && percentageDiscount <= 30) {
//       const discountAmount = (this.price * percentageDiscount) / 100;
//       this.price = (this.price - discountAmount).toFixed(3);
//       console.log(
//         `Thank you! ${percentageDiscount}% discount has been applied to ${this.name}.`
//       );
//     } else {
//       alert(`You have applied an incorrect amount.`);
//     }
//   }
// }

// // Filter by Price
// function filterByPrice(maxPrice) {
//   return ropa.filter(item => item.price <= maxPrice);
// }

// // Filter by Size
// function filterBySize(size) {
//   return ropa.filter(item => item.size.toLowerCase() === size.toLowerCase());
// }

// // shopping cart
// function itemSelectionMenu(ropa) {
//   let menu = "Select a product by entering the number:\n";
//   ropa.forEach((item, index) => {
//     menu += `${index + 1}. ${item.item} - $${item.price} (${item.size})\n`;
//   });
//   menu += "0. Finished Shopping?";
//   return prompt(menu);
// }

// // total summary
// function calculateTotal(cart) {
//   return cart
//     .reduce((total, item) => total + parseFloat(item.price), 0)
//     .toFixed(3);
// }

// // apply discount
// let discount;
// function applyDiscount(cart) {
//   discount = parseFloat(prompt("Enter discount percentage (0-30%):"));

//   if (isNaN(discount) || discount < 0 || discount > 30) {
//     alert(
//       "Invalid discount percentage. Please enter a value between 0 and 30."
//     );
//     applyDiscount();
//   }

//   console.log(`${discount}% discount applied to the entire cart.`);
//   return;
// }

// // receipt
// function generateReceipt(cart) {
//   console.log("=== Thank You For your Purchase ===");
//   const receiptItems = cart.map((item) => ({
//     Item: item.item,
//     Price: `$${item.price}`,
//     Size: item.size,
//   }));
//   console.table(receiptItems);

//   const total = calculateTotal(cart);
//   alert(
//     `Receipt Summary:\n${JSON.stringify(
//       receiptItems,
//       null,
//       2
//     )}\n\nTotal: $${total}`
//   );
// }

// // Filter products by price or size
// function filterProducts() {
//   let maxPrice = parseInt(prompt("Enter the maximum price you want to spend:"));
//   if (!isNaN(maxPrice)) {
//     let filteredByPrice = filterByPrice(maxPrice);
//     if (filteredByPrice.length > 0) {
//       console.log("Items within your price range:");
//       console.table(filteredByPrice);
//     } else {
//       console.log("No items found within that price range.");
//     }

//     let size = prompt("Enter the size (Small, Medium, Large) you are looking for:");
//     let filteredBySize = filterBySize(size);
//     if (filteredBySize.length > 0) {
//       console.log(`Items available in size ${size}:`);
//       console.table(filteredBySize);
//       return filteredBySize;
//     } else {
//       console.log(`No items available in size ${size}.`);
//     }
//   } else {
//     console.log("Invalid price entered.");
//   }
// }

// // select Function
// function addToCart() {
//   let cart = [];
//   let filteredItems = filterProducts();
//   if (!filteredItems || filteredItems.length === 0) {
//     alert("No items available based on your filters.");
//     return cart;
//   }

//   let selectedOption;

//   do {
//     selectedOption = itemSelectionMenu(filteredItems);

//     if (selectedOption === null) {
//       alert("Thank You, Goodbye.");
//       break;
//     }

//     selectedOption = parseInt(selectedOption);

//     if (selectedOption > 0 && selectedOption <= filteredItems.length) {
//       const selectedProduct = filteredItems[selectedOption - 1];
//       cart.push(selectedProduct);
//       console.log(`You added ${selectedProduct.item} to your cart.`);
//     } else if (selectedOption !== 0) {
//       console.log("Invalid selection, please try again.");
//     }
//   } while (selectedOption !== 0);

//   return cart;
// }

// // Shopping flow
// let shoppingCart = addToCart();

// // total calculator
// if (shoppingCart.length > 0) {

//   console.table(shoppingCart);

//   // Apply discount?
//   if (confirm("Do you want to apply a discount?")) {
//     applyDiscount(shoppingCart);
//   }

//   // Generate summary
//   generateReceipt(shoppingCart);

//   // Calculate total sum of selected items
//   let totalSum = calculateTotal(shoppingCart);
//   alert(
//     `The total sum for your shopping cart after discount is: $${
//       totalSum - (totalSum * discount) / 100
//     }`
//   );

//   // display the total on console.log
//   console.log(
//     `The total sum for your shopping cart after discount is: $${
//       totalSum - (totalSum * discount) / 100
//     }`
//   );
// } else {
//   console.log("No items were added to the shopping cart.");
// }
