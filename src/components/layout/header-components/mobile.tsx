import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { UserRole } from "@/types/user";

type Props = {
  isAuthenticated?: boolean;
  role?: UserRole;
  logout?: () => void;
};

const MobileMenu = (props: Props) => {
  const { isAuthenticated, role, logout } = props;
  return (
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
              <NavigationMenuItem className="rounded-none hidden md:flex">
                <NavigationMenuLink asChild className="rounded-none border-3">
                  {role === "host" ? (
                    <Link
                      href="/community"
                      className="block py-4 px-6 hover:bg-transparent hover:text-secondary border-none font-bold "
                    >
                      Community
                    </Link>
                  ) : role === "admin" ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="block py-4 px-6 hover:bg-transparent hover:text-secondary border-none font-bold "
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/community"
                        className="block py-4 px-6 hover:bg-transparent hover:text-secondary border-none font-bold "
                      >
                        Community
                      </Link>
                      <Link
                        href="/admin"
                        className="block py-4 px-6 hover:bg-transparent hover:text-secondary border-none font-bold "
                      >
                        Admin
                      </Link>
                    </>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="block py-4 px-6 hover:bg-transparent hover:text-secondary border-none font-bold "
                    >
                      Dashboard
                    </Link>
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
              {isAuthenticated ? (
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:text-secondary data-[state=open]:text-secondary focus:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:bg-transparent p-0">
                    <Avatar className="size-8">
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
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/login" className="text-secondary">
                        Masuk
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/register" className="text-secondary">
                        Daftar
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
