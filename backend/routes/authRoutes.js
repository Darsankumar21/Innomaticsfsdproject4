const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ REGISTER User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, number, category, specialization, timeSlots } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      number,
      category,
      specialization: category === "doctor" ? specialization || "" : "", // Ensure it's not undefined
      timeSlots: category === "doctor" ? timeSlots || [] : []
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ LOGIN User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Debugging - Check if category exists
    console.log("User Category:", user.category);

    if (!user.category) {
      return res.status(400).json({ message: "User category is missing" });
    }

    // ✅ Generate Token
    const token = jwt.sign(
      { id: user._id, category: user.category },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Add expiry for security
    );

    // ✅ Send Complete User Data in Response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
        category: user.category,
        specialization: user.specialization || "",
        timeSlots: user.timeSlots || [],
      },
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
