const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Appointment = require("../models/Appointment");

const router = express.Router();

// ✅ Book an appointment
router.post("/book", authMiddleware, async (req, res) => {
  try {
    const { doctorId, date, slot } = req.body;

    if (!doctorId || !date || !slot) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const appointment = new Appointment({
      patientId: req.user.id,
      doctorId,
      date,
      slot,
      status: "Booked",
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get all appointments for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const filter = req.user.category === "doctor" ? { doctorId: req.user.id } : { patientId: req.user.id };
    const appointments = await Appointment.find(filter)
      .populate("doctorId", "name category")
      .populate("patientId", "name email");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Cancel an appointment
router.put("/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (req.user.id !== String(appointment.patientId) && req.user.category !== "admin") {
      return res.status(403).json({ message: "Not authorized to cancel this appointment" });
    }

    appointment.status = "Cancelled";
    await appointment.save();

    res.json({ message: "Appointment cancelled successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
