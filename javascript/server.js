// const express = require('express');
// const app = express();
// const cors = require('cors');

// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));

// const products = [
//     { id: 1, name: 'Product 1', price: 10 },
//     { id: 2, name: 'Product 2', price: 20 },
//     { id: 3, name: 'Product 3', price: 30 },
// ];

// // Endpoint to get products
// app.get('/products', (req, res) => {
//     res.json(products);
// });

// // Endpoint to confirm purchase
// app.post('/confirm-purchase', (req, res) => {
//     const { cartData, totalCost } = req.body;
//     console.log('Purchase Data:', cartData);
//     console.log('Total Cost:', totalCost);
//     res.status(200).json({ message: 'Purchase confirmed', cartData, totalCost });
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let users = [];
let products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
];

// Load users from a file (for persistence)
const loadUsers = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8');
        users = JSON.parse(data);
    } catch (err) {
        users = []; // If no file, start with an empty list
    }
};

// Save users to a file
const saveUsers = () => {
    fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
};

// Endpoint to get products
app.get('/products', (req, res) => {
    res.json(products);
});

// Sign up endpoint
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    
    // Check if the email already exists
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });

    saveUsers(); // Save users to file

    res.status(201).json({ message: 'Sign-up successful' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) return res.status(400).json({ message: 'Email not found' });

    const match = await bcrypt.compare(password, user.password);
    if (match) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(400).json({ message: 'Incorrect password' });
    }
});

// Endpoint to confirm purchase
app.post('/confirm-purchase', (req, res) => {
    const { cartData, totalCost } = req.body;

    console.log('Purchase Data:', cartData);
    console.log('Total Cost:', totalCost);

    // Process the order (e.g., save it to a database or file, etc.)

    res.status(200).json({ message: 'Purchase confirmed', cartData, totalCost });
});

// Load users on startup
loadUsers();

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

