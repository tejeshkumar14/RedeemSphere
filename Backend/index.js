const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const connectDB = require('./db.js');
const UserModel = require("./model/User.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const Coupon = require("./model/Coupon.js");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions"
    }).on('error', err => console.log("Session store error:", err)),    
    cookie: {
        httpOnly: true,
        secure: false, // Change to true in production with HTTPS
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}));

connectDB();

app.listen(process.env.PORT, () => {
    console.log("Server started running on Port: " + process.env.PORT);
    deleteExpiredCoupons(); // Run cleanup on startup
});

// Delete Expired Coupons Function (Runs every hour)
const deleteExpiredCoupons = async () => {
    try {
        const today = new Date().toISOString().split("T")[0]; // Get current date (YYYY-MM-DD)
        const result = await Coupon.deleteMany({ expiry: { $lt: today } }); // Delete expired coupons
        if (result.deletedCount > 0) {
            console.log(`Deleted ${result.deletedCount} expired coupons.`);
        }
    } catch (error) {
        console.error("Error deleting expired coupons:", error);
    }
};

// Run the delete function every hour
setInterval(deleteExpiredCoupons, 60 * 60 * 1000); // 1 hour interval

// Register User
app.post('/register', async (req, res) => {
    try {
        const { fullName, email, phone, username, password } = req.body;
        const existingUser = await UserModel.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ error: "Phone number already exists" });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ fullName, email, phone, username, password: hashpassword });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login User
app.post('/login', async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await UserModel.findOne({ phone });
        if (!user) {
            return res.status(400).json({ error: "Invalid phone number or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid phone number or password" });
        }

        req.session.user = {
            name: user.username,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone
        };
        res.status(200).json({ message: "Login successful", user: req.session.user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check Session Route
app.get('/auth/user', (req, res) => {
    if (!req.session.user) req.session.user = { user: null };
    else if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ error: "Not authenticated" });
    }
});

// Logout Route
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Logout failed" });
        }
        res.clearCookie("connect.sid"); // Clear session cookie
        res.json({ message: "Logged out successfully" });
    });
});

// Get Coupons
app.get("/api/coupons", async (req, res) => {
    try {
        const coupons = await Coupon.find(); // Fetch all coupons from the database
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch coupons" });
    }
});

// Post Coupon
app.post("/api/coupons", async (req, res) => {
    console.log("Received Data:", req.body); // Debugging log

    try {
        const { title, code, description, companyName, companyLink, expiry, username } = req.body;

        if (!title || !code || !description || !companyName || !companyLink || !expiry || !username) {
            console.error("Missing fields:", req.body);
            return res.status(400).json({ error: "All fields are required" });
        }

        const newCoupon = new Coupon({
            title,
            code,
            description,
            companyName,
            companyLink,
            expiry: new Date(expiry),
            username,
            status: "onSale",
            boughtBy: null
        });

        await newCoupon.save();
        res.status(201).json(newCoupon);
    } catch (error) {
        console.error("Error saving coupon:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Delete Expired Coupon Manually (Optional)
app.delete("/api/coupons/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Coupon.findByIdAndDelete(id);
        console.log("deleted");
        res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (error) {
        console.log("failed");
        res.status(500).json({ error: "Failed to delete coupon" });
    }
});

// Update coupon status to sold and set boughtBy
app.put("/api/coupons/:id/buy", async (req, res) => {
    try {
      const { username } = req.body;
      const updated = await Coupon.findByIdAndUpdate(
        req.params.id,
        { status: "sold", boughtBy: username },
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Failed to update coupon" });
    }
  });
  