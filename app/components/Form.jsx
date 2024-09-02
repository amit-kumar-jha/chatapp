"use client";
import {
  EmailOutlined,
  LockOpenOutlined,
  LockOutlined,
  PersonOutline,
} from "@mui/icons-material";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import OtpVerify from "./otpVerify";

function Form({ type }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState("");

  const onSubmit = async (data) => {
    if (type === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/");
      }

      if (res.error) {
        toast.error("Something went wrong");
      }
    }

    if (type === "login") {
      try {
        const res = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (res.ok) {
          setOtpSent(true);
        }
        if (res.error) {
          toast.error("Invalid  password");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      {!otpSent ? (
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
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              {type === "register" && (
                <div>
                  <div className="input">
                    <input
                      defaultValue=""
                      {...register("username", {
                        required: "Username is required",
                        validate: (value) => {
                          if (value.length < 3) {
                            return "Username must be at least 3 characters";
                          }
                        },
                      })}
                      type="text"
                      placeholder="Username"
                      className="input-field"
                    />
                    <PersonOutline sx={{ color: "#737373" }} />
                  </div>
                  {errors.username && (
                    <p className="text-red-500">{errors.username.message}</p>
                  )}
                </div>
              )}
              <div>
                <div className="input">
                  <input
                    defaultValue=""
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Email"
                    className="input-field"
                  />
                  <EmailOutlined sx={{ color: "#737373" }} />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <div className="input">
                  <input
                    defaultValue=""
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      validate: (value) => {
                        if (
                          value.length < 5 ||
                          !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)
                        ) {
                          return "Password must be at least 5 characters and contain at least one special character";
                        }
                      },
                    })}
                    placeholder="Password"
                    className="input-field"
                  />
                  {showPassword ? (
                    <div
                      className="input-icon-wrapper"
                      onClick={togglePasswordVisibility}
                    >
                      <LockOpenOutlined
                        sx={{ color: "#737373", cursor: "pointer" }}
                      />
                    </div>
                  ) : (
                    <div
                      className="input-icon-wrapper"
                      onClick={togglePasswordVisibility}
                    >
                      <LockOutlined
                        sx={{ color: "#737373", cursor: "pointer" }}
                      />
                    </div>
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <button className="button" type="submit">
                {type === "register" ? "Join Free" : "Let's Chat"}
              </button>
            </form>
            {type === "register" ? (
              <p className="text-center">
                Already have an account?{" "}
                <Link href="/" className="link">
                  Sign In
                </Link>
              </p>
            ) : (
              <p className="text-center">
                Don't have an account?{" "}
                <Link href="/register" className="link">
                  Register
                </Link>
              </p>
            )}
          </div>
        </div>
      ) : (
        <OtpVerify email={email} userId={userId} setOtpSent={setOtpSent} />
      )}
    </>
  );
}

export default Form;
