"use client";
import {
  EmailOutlined,
  LockOutlined,
  PasswordOutlined,
  PersonOutline,
} from "@mui/icons-material";
import Link from "next/link";
// import { signIn } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Form({ type }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //   const onSubmit = async (data) => {
  //     console.log(data);
  //   };

  const router = useRouter();

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
        console.log(res);
        if (res.ok) {
          router.push("/chats");
        }

        if (res.error) {
          toast.error("Invalid  password");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className="auth">
      <div className="content">
        <div className="text-heading3-bold">Chat App</div>

        {/* <img src="/assets/logo.png" alt="logo" className="logo" /> */}
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
                type="password"
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
              <LockOutlined sx={{ color: "#737373" }} />
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
          <Link href="/" className="link">
            {" "}
            <p className="text-center">Already have an account? Sign in Here</p>
          </Link>
        ) : (
          <Link href="/register" className="link">
            {" "}
            <p className="text-center">Don't have an account? Register Here</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Form;
