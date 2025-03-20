const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true }, // Format: 'YYYY-MM-DD'
    timeSlot: { type: String, required: true },
    status: { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
