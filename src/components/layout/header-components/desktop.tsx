import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  isAuthenticated?: boolean;
  logout?: () => void;
  role?: string;
};

const navItemClasses =
  "hover:!bg-transparent hover:border-y-3 hover:border-b-secondary hover:text-secondary rounded-none border-y-3 border-transparent py-3 lg:py-6 lg:px-4 transition-all duration-200 font-semibold";

const navItemHighlight =
  "hover:!bg-secondary hover:text-primary border-y-3 border-secondary px-6 my-4 lg:my-0 border font-semibold transition-all duration-200 lg:mx-4";

const DesktopMenu = (props: Props) => {
  const { isAuthenticated, logout, role } = props;
  return (
    <NavigationMenu className="h-[72px]">
      <NavigationMenuList>
        {isAuthenticated ? (
          <>
            <NavigationMenuItem className="rounded-none hidden md:flex">
              <NavigationMenuLink asChild className="rounded-none border-3">
                {role === "host" ? (
                  <Link
                    href="/community"
                    className="block py-4 px-6 hover:bg-transparent hover:text-secondary border-none font-bold "
                  >
                    Community
                  </Link>
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
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:text-secondary data-[state=open]:text-secondary focus:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:bg-transparent p-0">
                <Avatar className="size-8">
                  <AvatarImage src="https://github.com/evilrabbit.png" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-full p-0">
                <NavigationMenuItem className="rounded-none flex md:hidden">
                  <NavigationMenuLink asChild className="rounded-none border-3">
                    {role === "host" ? (
                      <Link
                        href="/community"
                        className="block py-4 px-6 hover:bg-transparent hover:text-secondary border-none font-bold "
                      >
                        Community
                      </Link>
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
                      className="!justify-start h-auto w-full rounded-none py-4 px-6 hover:bg-destructive/10 font-bold border-3 border-transparent hover:border-l-destructive hover:text-destructive"
                    >
                      Logout
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </>
        ) : (
          <>
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
  );
};

export default DesktopMenu;
