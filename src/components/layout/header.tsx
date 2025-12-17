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

type MenuItem = {
  label: string;
  href: string;
  isHighlight?: boolean;
};

const navItemClasses =
  "hover:!bg-transparent hover:border-y-3 hover:border-b-secondary hover:text-secondary rounded-none border-y-3 border-transparent py-3 lg:py-6 lg:px-4 transition-all duration-200 font-semibold";

const navItemHighlight =
  "hover:!bg-secondary hover:text-primary border-y-3 border-secondary px-6 my-4 lg:my-0 border font-semibold transition-all duration-200 lg:mx-4";

const Header = () => {
  const { user, isAuthenticated, loading, logout } = useUser();

  const menuItems: (MenuItem | undefined)[] = [
    { label: "Komunitas", href: "/community", isHighlight: false },
    isAuthenticated
      ? { label: "Switch to Player", href: "/player", isHighlight: true }
      : undefined,
  ];

  return (
    <header className="bg-primary sticky top-0 z-50 text-white">
      <nav className="flex justify-between items-center px-6 py-2 lg:py-0">
        <div>
          <Link href="/" className="text-secondary font-bold">
            QUALS
          </Link>
        </div>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {menuItems.map(
              (item, index) =>
                item && (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      key={index}
                      className={
                        item.isHighlight ? navItemHighlight : navItemClasses
                      }
                    >
                      <Link href={item.href} className="text-secondary">
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
            )}

            {isAuthenticated ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:text-secondary data-[state=open]:text-secondary focus:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:bg-transparent p-0">
                  <Avatar className="size-6">
                    <AvatarImage src="https://github.com/evilrabbit.png" />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-full p-0">
                  <NavigationMenuItem className="rounded-none">
                    <NavigationMenuLink
                      asChild
                      className="rounded-none border-3 border-transparent hover:border-l-primary"
                    >
                      <Link
                        href="/profile"
                        className="block py-4 px-6 hover:bg-primary/10 hover:text-primary font-bold "
                      >
                        Profile
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="rounded-none border-3 border-transparent hover:border-l-primary"
                    >
                      <Link
                        href="/settings"
                        className="block py-4 px-6 hover:bg-primary/10 font-bold border-3 border-transparent hover:border-l-primary hover:text-primary"
                      >
                        Settings
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="rounded-none border-3 border-transparent hover:border-l-primary"
                    >
                      <Button
                        onClick={logout}
                        variant="text"
                        className="h-auto w-full rounded-none py-4 px-6 hover:bg-destructive/10 font-bold border-3 border-transparent hover:border-l-destructive hover:text-destructive"
                      >
                        Logout
                      </Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <>
                {" "}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navItemClasses}>
                    <Link href="/login" className="text-secondary">
                      Masuk
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navItemHighlight}>
                    <Link href="/register" className="text-secondary">
                      Daftar
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet>
          <SheetTrigger className="lg:hidden flex">
            <Menu size={32} className="text-secondary" />
          </SheetTrigger>
          <SheetContent className="w-full bg-primary text-secondary border-none">
            <SheetHeader>
              <SheetTitle className="border-b">
                <p className="text-2xl text-secondary pb-3">QUALS</p>
              </SheetTitle>
              <NavigationMenu>
                <NavigationMenuList className="flex flex-col items-start">
                  {menuItems.map(
                    (item, index) =>
                      item && (
                        <NavigationMenuItem key={index}>
                          <NavigationMenuLink
                            asChild
                            key={index}
                            className={
                              item.label === "Daftar"
                                ? navItemHighlight
                                : navItemClasses
                            }
                          >
                            <Link href={item.href} className="text-secondary">
                              {item.label}
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Header;
