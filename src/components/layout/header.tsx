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

type MenuItem = {
  label: string;
  href: string;
};

const navItemClasses =
  "hover:!bg-transparent hover:border-y-3 hover:border-b-secondary hover:text-secondary rounded-none border-y-3 border-transparent py-3 lg:py-6 lg:px-4 transition-all duration-200 font-semibold";

const navItemHighlight =
  "hover:!bg-secondary hover:text-primary border-y-3 border-secondary px-6 my-4 lg:my-0 border font-semibold transition-all duration-200 lg:mx-4";

const Header = () => {
  const isLoggedIn = true; // Replace with actual authentication logic
  const menuItems: MenuItem[] = [
    { label: "Event", href: "/events" },
    { label: "Komunitas", href: "/communities" },
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
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  asChild
                  key={index}
                  className={
                    item.label === "Daftar" ? navItemHighlight : navItemClasses
                  }
                >
                  <Link href={item.href} className="text-secondary">
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            {isLoggedIn ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:bg-transparent p-0">
                  <Avatar className="size-6">
                    <AvatarImage src="https://github.com/evilrabbit.png" />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-full">
                  <ul className="grid gap-3 p-4 grid-cols-1 w-full">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/profile"
                          className="block p-3 rounded-md hover:bg-secondary hover:text-primary"
                        >
                          Profile
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/settings"
                          className="block p-3 rounded-md hover:bg-secondary hover:text-primary"
                        >
                          Settings
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
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
                  {menuItems.map((item, index) => (
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
                  ))}
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
