"use client";
import Link from "next/link";
import React from "react";

import { useUser } from "@/context/UserContext";
import DesktopMenu from "./header-components/desktop";

const Header = () => {
  const { user, isAuthenticated, logout } = useUser();

  return (
    <header className="bg-primary sticky top-0 z-50 text-white">
      <nav className="flex justify-between items-center px-6 py-2 lg:py-0">
        <div>
          <Link href="/" className="text-secondary font-bold">
            QUALS
          </Link>
        </div>
        <DesktopMenu
          isAuthenticated={isAuthenticated}
          role={user?.user_type}
          logout={logout}
        />

        {/* <MobileMenu
          isAuthenticated={isAuthenticated}
          role={user?.user_type}
          logout={logout}
        /> */}
      </nav>
    </header>
  );
};

export default Header;
