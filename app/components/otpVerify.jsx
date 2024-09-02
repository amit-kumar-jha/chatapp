"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const OtpVerify = ({ email, setOtpSent }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "verify",
          //   userId: userId,
          email: email,
          otp: otp,
        }),
      });

      if (response.ok) {
        toast.success("OTP verified successfully!");

        router.push("/chats"); // Redirect to chats without any query parameters
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to verify OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred during OTP verification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="content">
        <div className="flex">
          <div className="text-heading3-bold p-2">Chatty</div>
          <img
            src="/assets/newLogo.png"
            height={"50px"}
            width={"50px"}
            alt="logo"
            // className="logo"
          />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <div className="input">
              <input
                className="input-field"
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter your OTP"
                maxLength="6"
                required
              />
            </div>
          </div>

          <button className="button" type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-center">
          Didn't got the otp{" "}
          <span
            onClick={() => setOtpSent(false)}
            className="link"
            style={{ cursor: "pointer" }}
          >
            Login again
          </span>
        </p>
      </div>
    </div>
  );
};

export default OtpVerify;
