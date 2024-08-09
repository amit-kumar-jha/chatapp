"use client";

import { Logout } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { LogoutModal } from "./Modal/LogoutModal";

const TopBar = () => {
  const pathname = usePathname();
  const [isModalOpen, setModalOpen] = useState(false);
  const handleLogout = async () => {
    signOut({ callbackUrl: "/" });
  };

  const { data: session } = useSession();
  const user = session?.user;

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const confirmLogout = () => {
    closeModal();
    handleLogout();
  };

  return (
    <div className="topbar">
      <Link href="/chats">
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
      </Link>

      <div className="menu">
        <Link
          href="/chats"
          className={`${
            pathname === "/chats" ? "text-green-1" : ""
          } text-heading4-bold`}
        >
          Chats
        </Link>
        <Link
          href="/contacts"
          className={`${
            pathname === "/contacts" ? "text-green-1" : ""
          } text-heading4-bold`}
        >
          Contacts
        </Link>

        <Logout
          sx={{ color: "#737373", cursor: "pointer" }}
          onClick={openModal}
        />

        <Link href="/profile">
          <img
            src={user?.profileImage || "/assets/person.jpg"}
            alt="profile"
            className="profilePhoto"
          />
        </Link>
      </div>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default TopBar;
