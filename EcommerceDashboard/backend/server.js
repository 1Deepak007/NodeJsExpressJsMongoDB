// POST creates a resource. PUT replaces a resource. PATCH updates a resource.


require('./db/config');                         // db connection
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./db/models/User');       // model
const Product = require('./db/models/Product');
const cors = require('cors');


// import {conn} from './db/config';

const port = 5647
const app = express();
// const db = conn;


const JWT_SECRET = "my_JWT_secret_Key_hahaha";

const token = jwt.sign({ id: User._id, email: User.email }, JWT_SECRET, { expiresIn: '1d' });


app.use(express.json());            // To handle JSON payloads

// A CORS error (Cross-Origin Resource Sharing) happens when a web page tries to make a request to a different domain, protocol, or port than the one it was loaded from. Browsers block these requests for security reasons unless the server allows it.
// For example, if your frontend (React app) is running on http://localhost:3000 and tries to request data from a Node.js API on http://localhost:5000, the browser will block this by default because they are considered of different origins.
// To fix this, the Node.js server needs to tell the browser, "Hey, it's okay for your frontend to request data from me." This is done by setting CORS headers in the server's response.
app.use(cors());                                // middleware


// Middleware to verify token
const verifyToken = (req, res, next) => {

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    // Remove the "Bearer " part from the token if present
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length); // Remove "Bearer " prefix
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
            // navigate('/login');
        }

        req.userId = decoded.Id; // You can access the userId in your routes now
        next();
    });
};



app.get('/', (req, res) => {
    res.send('App is running');
});


// REGISTER API : Testing data -> raw, json -> {"name" : "Deepak","email" : "deepak@gmail.com","password" : "deepak"}
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        let user = new User({ name, email, password: hashedPassword });
        let result = await user.save();

        result = result.toObject();
        delete result.password;  // Remove password from the result object

        // Create a JWT token
        const token = jwt.sign({ id: result._id, email: result.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ user: result, token });  // Send token along with user data
    } catch (error) {
        console.error("Error registering user:", error.message);  // Log the error for debugging
        res.status(500).json({ error: "Error registering user", message: error.message });
    }
});



// LOGIN API - ensuring both email and password sent while logging-in 
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "Both Email and Password are required" });
        }

        // Find the user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Compare the password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Wrong password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        user = user.toObject();
        delete user.password;  // Remove password from the response

        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: "Error logging in", message: error.message });
    }
});



// GET ALL PRODUCTS
// http://localhost:5647/get_all_products
app.get('/get_all_products', verifyToken, async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length > 0) {
            res.send(products);
        }
        else {
            res.send({ result: "No products found." })
        }
    }
    catch (error) {
        console.log('Error getting all products');
        throw error;
    }
})


// GET ALL PRODUCTS ADDED BY A SPECIFIC USER
// http://localhost:5647/get_all_products/671e1db794949ad750b549a5
app.get('/get_all_products/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const products = await Product.find({ userId });

        if (products.length > 0) {
            res.send(products);
        } else {
            res.send({ result: "No products found for the specified user." });
        }
    } catch (error) {
        console.log('Error getting products for the user');
        throw error;
    }
});


// ADD PRODUCT API 
// http://localhost:5647/add_product        raw json -> {"name": "Asus Zenbook", "price": "80000", "category": "Laptop", "userId": "671dfa41847397a112ee4654", "company": "Asus"}
app.post("/add_product", verifyToken, async (req, res) => {
    try {
        const  { name, price, category, company, userId } = req.body;

        let product = new Product({name, price, category, company, userId});
        let result = await product.save();
        if(result){
            res.send({ message: "Added new product successfully.", data: result }); // Send a proper response object
        }
        else{
            return res.send({ message: "Product not added!" }); // Send a proper response object
        }
    } catch (error) {
        res.status(500).json({ error: "Error adding product", message: error.message });
    }
});



// UPDATE PRODUCT API
app.put("/update_product/:id", verifyToken, async (req, res) => {
    try {
        let productId = req.params.id;
        console.log(productId);
        let product = await Product.findOneAndUpdate({ _id: productId }, req.body, { new: true });
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.send({ message: "Product updated successfully", product });
        console.log(product);

    } catch (error) {
        res.sendStatus(500).json({ error: "Error updating product", message: error.message });
    }
});
// http://localhost:5647/update_product/67194528a00c66ecff6984e7
// {
//     "name": "MacBook Air", "price": "65000", "category": "Laptop",
//     "userId": "6718c1349c9753f89651883c", "company": "Apple"
// }


// DELETE PRODUCT API
app.delete('/delete_product/:id', verifyToken, async (req, res) => {
    try {
        const productId = req.params.id;
        const result = await Product.findByIdAndDelete(productId);
        if (result) {
            res.send({ message: "Product deleted successfully." })
        }
        else {
            res.send({ result: "Product not found." })
        }
    }
    catch (error) {
        console.log('Error deleting product');
        throw error;
    }
})

app.listen(port,
    console.log(`App listening at http://localhost:${port}`)
);