const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get all users (Removed Admin Restriction)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all doctors
router.get("/doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await User.find({ category: "doctor" }, "-password");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all patients
router.get("/patients", authMiddleware, async (req, res) => {
  try {
    const patients = await User.find({ category: "patient" }, "-password");
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get user by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update user details
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email, number, specialization, timeSlots } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.number = number || user.number;

    if (user.category === "doctor") {
      user.specialization = specialization || user.specialization;
      user.timeSlots = timeSlots || user.timeSlots;
    }

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a user (Admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.category !== "admin") return res.status(403).json({ message: "Access Denied" });

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
