// sign up/register

//log in password

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

const RESULT = `Name: ${name}\nAge: ${age}\nAddress Number: ${address}\nStreet: ${street}\nCity and State: ${cityAndState}\nZip Code: ${zipCode}\nPhone Number: ${phoneNumber}`;

console.table(RESULT);
//end



// payment options

// shopping cart

class product {
  constructor(name, price, stock) {
    this.name = name.toLowerCase();
    this.price = parseFloat(price).toFixed(3);
    this.stock = stock;
  }
  updateQuantity(newStock) {
    if (newStock > 0) {
      this.stock = newStock;
      console.log(`the item : ${this.name} has been added to your cart`);
    }
  }

  stockCheck() {
    if (this.stock > 0) {
      console.log(`The item : ${this.name} is available`);
    } else {
      console.log(`The item : ${this.name} is out of stock`);
    }
  }

  // total sum generator


  // add code "do" with prompt for discount application
  Discounts(percentageDiscount) {
    if (percentageDiscount > 0 && percentageDiscount < 50) {
      this.price = this.price - (this.price * percentageDiscount) / 100;
      console.log(`Thank you! ${percentageDiscount}% discount has been applied to ${this.name}`);
    } else {
      console.log(`You have applied an incorrect amount`);
    }
  }
}
// catalogue search with price
const product1 = new product("dress", 11.000, 12);
product1.stockCheck();
product1.updateQuantity(10);

console.table(product1);
