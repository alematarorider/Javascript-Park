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

const result =
  `Name: ${name}\nAge: ${age}\nAddress Number: ${address}\nStreet: ${street}\nCity and State: ${cityAndState}\nZip Code: ${zipCode}\nPhone Number: ${phoneNumber}`;

console.log(result);
