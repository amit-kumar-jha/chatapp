import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";
import ToasterContext from "../components/ToasterContext";
import Provider from "@app/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth ChatApp ",
  description: "Next chat app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-purple-2`}>
        <Provider>
          <ToasterContext />
          {children}

          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
