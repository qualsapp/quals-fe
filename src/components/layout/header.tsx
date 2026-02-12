"use client";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "../ui/button";
import { useUser } from "@/context/UserContext";
import DesktopMenu from "./header-components/desktop";
import MobileMenu from "./header-components/mobile";

type MenuItem = {
  label: string;
  href: string;
  isHighlight?: boolean;
};

const Header = () => {
  const { user, isAuthenticated, loading, logout } = useUser();

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
