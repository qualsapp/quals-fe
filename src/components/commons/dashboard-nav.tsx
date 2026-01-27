"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {
  menus: { label: string; href: string }[];
};

const DashboardNav = ({ menus }: Props) => {
  const pathname = usePathname();
  console.log(pathname.split("/"));
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menus.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              asChild
              key={index}
              className={cn(
                "hover:bg-white focus:bg-white hover:border-y-3 hover:border-t-primary hover:text-primary rounded-none border-y-3 border-transparent py-3 lg:py-6 lg:px-4 transition-all duration-200 font-semibold",
                pathname === item.href
                  ? "border-t-primary bg-white text-primary"
                  : "",
              )}
            >
              <Link href={item.href} className="text-primary">
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DashboardNav;
