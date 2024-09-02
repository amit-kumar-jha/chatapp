// models/Otp.js
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  otp: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
});

const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema); // Use existing model or create a new one

export default OTP;
