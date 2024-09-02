// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcryptjs";

// import User from "../../../models/user";
// import { connectToDB } from "../../../mongodb";
// // import OTP from "../../../models/Otp"; // Ensure the correct path to your OTP model
// // import { sendMail } from "@lib/otpUtility"; // Import your sendMail utility
// import crypto from "crypto";
// import OTP from "@app/models/Otp";
// import { sendMail } from "@lib/otpUtility";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       async authorize(credentials, req) {
//         if (!credentials.email || !credentials.password) {
//           throw new Error("Invalid email or password");
//         }

//         await connectToDB();

//         const user = await User.findOne({ email: credentials.email });

//         if (!user || !user?.password) {
//           throw new Error("Invalid password");
//         }

//         const isMatch = await compare(credentials.password, user.password);

//         if (!isMatch) {
//           throw new Error("Invalid password");
//         }

//         // Generate and send OTP
//         const generatedOtp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
//         await OTP.create({
//           userId: user._id,
//           otp: generatedOtp,
//           expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiration
//         });

//         // Send OTP to user's email
//         await sendMail(
//           user.email,
//           "Your OTP Code",
//           `Your OTP is ${generatedOtp}`
//         );

//         // Return the user object without logging them in yet
//         // return { ...user, otpSent: true }; // Indicate that the OTP has been sent
//         return { id: user._id.toString(), otpSent: true };
//       },
//     }),
//   ],

//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async session({ session }) {
//       const mongodbUser = await User.findOne({ email: session.user.email });
//       session.user.id = mongodbUser._id.toString();

//       session.user = { ...session.user, ...mongodbUser._doc };

//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcryptjs";
// import User from "../../../models/user";
// import { connectToDB } from "../../../mongodb";
// import OTP from "@app/models/Otp";
// import { sendMail } from "@lib/otpUtility";
// import crypto from "crypto";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       async authorize(credentials, req) {
//         if (!credentials.email || !credentials.password) {
//           throw new Error("Invalid email or password");
//         }

//         await connectToDB();

//         const user = await User.findOne({ email: credentials.email });

//         if (!user || !user?.password) {
//           throw new Error("Invalid email or password");
//         }

//         const isMatch = await compare(credentials.password, user.password);

//         if (!isMatch) {
//           throw new Error("Invalid email or password");
//         }

//         // Generate and send OTP
//         const generatedOtp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
//         await OTP.create({
//           userId: user._id,
//           otp: generatedOtp,
//           expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiration
//         });

//         // Send OTP to user's email
//         await sendMail(
//           user.email,
//           "Your OTP Code",
//           `Your OTP is ${generatedOtp}`
//         );

//         // Return user ID and otpSent flag
//         return { id: user._id.toString(), otpSent: true };
//       },
//     }),
//   ],

//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async session({ session }) {
//       const mongodbUser = await User.findOne({ email: session.user.email });
//       session.user.id = mongodbUser._id.toString();

//       session.user = { ...session.user, ...mongodbUser._doc };

//       return session;
//     },

//     async redirect({ url, baseUrl }) {
//       // Redirect to OTP verification page if OTP has been sent
//       const urlParams = new URL(url, baseUrl);
//       const otpSent = urlParams.searchParams.get("otpSent");
//       const userId = urlParams.searchParams.get("id");

//       if (otpSent && userId) {
//         return `${baseUrl}/otp-verify?id=${userId}`;
//       }

//       return baseUrl;
//     },
//   },
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import crypto from "crypto";
// import { connectToDB } from "@mongodb";
import User from "../../../models/user";
import { connectToDB } from "../../../mongodb";
import { sendMail } from "@lib/otpUtility";
import OTP from "@app/models/Otp";
// import User from "@models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }

        await connectToDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user || !user?.password) {
          throw new Error("Invalid password");
        }

        const isMatch = await compare(credentials.password, user.password);

        if (!isMatch) {
          throw new Error("Invalid password");
        }

        // Generate and send OTP
        const generatedOtp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
        await OTP.create({
          userId: user._id,
          otp: generatedOtp,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiration
        });

        // Send OTP to user's email
        await sendMail(
          user.email,
          "Your OTP Code",
          `Your OTP is ${generatedOtp}`
        );

        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session }) {
      const mongodbUser = await User.findOne({ email: session.user.email });
      session.user.id = mongodbUser._id.toString();

      session.user = { ...session.user, ...mongodbUser._doc };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
