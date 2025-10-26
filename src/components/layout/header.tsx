import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

type MenuItem = {
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { label: "Event", href: "/events" },
  { label: "Komunitas", href: "/communities" },
  { label: "Masuk", href: "/login" },
  { label: "Daftar", href: "/register" },
];

const navItemClasses =
  "hover:!bg-transparent hover:border-y-3 hover:border-b-secondary hover:text-secondary rounded-none border-y-3 border-transparent py-3 lg:py-6 lg:px-4 transition-all duration-200 font-semibold";

const navItemHighlight =
  "hover:!bg-secondary hover:text-primary border-y-3 border-secondary px-6 my-4 lg:my-0 border font-semibold transition-all duration-200 lg:mx-4";

const Header = () => {
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
