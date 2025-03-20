const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    number: { type: String, required: true },
    category: { type: String, enum: ["doctor", "patient", "admin"], required: true },

    // Doctor-specific fields
    specialization: { type: String, default: null },
    timeSlots: { type: [String], default: [] },

    // Store appointment references
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
