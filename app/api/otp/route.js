// import OTP from "@app/models/Otp"; // Ensure the correct path to your OTP model
import OTP from "@app/models/Otp";
import { connectToDB } from "@app/mongodb";
// import { connectToDB } from "@app/mongodb"; // Ensure the correct path to your DB connection utility
import { sendMail } from "@lib/otpUtility";
// import { sendMail } from "@app/utils/sendMail"; // Import the sendMail utility
import crypto from "crypto";

export const POST = async (req) => {
  try {
    await connectToDB(); // Ensure the database is connected

    const body = await req.json();
    const { type, userId, otp, email } = body; // Assume type can be "send" or "verify"

    if (type === "send") {
      // Generate and send OTP
      const generatedOtp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP

      // Store the OTP in the database with expiration
      const newOtp = await OTP.create({
        userId,
        otp: generatedOtp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiration
      });

      // Send the OTP to the user's email using the sendMail utility
      await sendMail(email, "Your OTP Code", `Your OTP is ${generatedOtp}`);

      return new Response(
        JSON.stringify({ message: "OTP sent successfully" }),
        { status: 200 }
      );
    } else if (type === "verify") {
      //   // Verify OTP
      //   const existingOtp = await OTP.findOne({ userId, otp });

      //   if (!existingOtp) {
      //     return new Response(
      //       JSON.stringify({ error: "Invalid or expired OTP" }),
      //       { status: 400 }
      //     );
      //   }

      //   // OTP is valid, proceed to delete it
      //   await OTP.deleteOne({ _id: existingOtp._id });

      // Verify the OTP
      const existingOtp = await OTP.findOne({ email, otp });

      if (!existingOtp) {
        return res.status(400).json({ error: "Invalid or expired OTP" });
      }

      // OTP is valid, delete it and respond
      await OTP.deleteOne({ _id: existingOtp._id });

      return new Response(
        JSON.stringify({ message: "OTP verified successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ error: "Invalid request type" }), {
        status: 400,
      });
    }
  } catch (err) {
    return new Response("Failed to process OTP request", { status: 500 });
  }
};
