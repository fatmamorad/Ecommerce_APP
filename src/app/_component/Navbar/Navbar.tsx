"use client";

import * as React from "react";
import Link from "next/link";
import { useState, useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../../components/ui/navigation-menu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { CounterContext } from "image/app/CounterProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "image/components/ui/dropdown-menu";

const components: { Path: string; content: string; protected: boolean }[] = [
  { Path: "/", content: "Home", protected: false },
  { Path: "/wishList", content: "WhishList", protected: true },
  { Path: "/brands", content: "Brands", protected: false },
  { Path: "/allproducts", content: "Products", protected: false },
  { Path: "/categories", content: "Categories", protected: false },
];

export default function Navbar() {
  const { data: session, status } = useSession();
 
  const countContext = useContext(CounterContext);
  const [toggleBar, setToggleBar] = useState(false);
  const path = usePathname();

  return (
    <div className="w-3/4 relative bg-[#eaf1f1] my-2 mx-auto flex justify-between items-center p-2 rounded-full">
      {/* Logo */}
      <div className="w-1/4">
        <Link href="/">
          <div className="flex items-center justify-center md:text-xl text-xs font-bold">
            BUY <span className="md:text-xl text-xs text-cyan-700">HIVE</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <NavigationMenu viewport={false} className="hidden lg:flex w-1/2">
        <NavigationMenuList className="flex gap-4 w-full">
          {components.map((item, index) => (
            <NavigationMenuItem key={index}>
              { 
                !item.protected&&
                <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()} ${
                  path === item.Path ? "bg-[#cdd2d3] rounded-full" : ""
                }`}
              >
                <Link href={item.Path}>{item.content}</Link>
              </NavigationMenuLink>
                  
              }


               { 
                item.protected&&status==='authenticated'&&
                <NavigationMenuLink
                asChild
                className={`${navigationMenuTriggerStyle()} ${
                  path === item.Path ? "bg-[#cdd2d3] rounded-full" : ""
                }`}
              >
                <Link href={item.Path}>{item.content}</Link>
              </NavigationMenuLink>
                  
              }
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side */}
      <div className="flex justify-end items-center w-1/4">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            {/* User Icon Dropdown */}
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`${navigationMenuTriggerStyle()} cursor-pointer`}
                >
                  <Image
                    src="/icons/user.png"
                    alt="userIcon"
                    width={20}
                    height={20}
                    className="w-full"
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-40 bg-white">
                  {status === "authenticated" ? (
                    <>
                      <DropdownMenuLabel>
                        Hi, {session?.user?.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/allorders">Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/addresses">Addresses</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="text-red-500 cursor-pointer"
                      >
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem>
                        <Link href="/login">Login</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/register">Register</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>

            {/* Cart Icon */}
            <NavigationMenuItem>
              <Link
                href="/cart"
                className={`${navigationMenuTriggerStyle()} text-red-500 cursor-pointer relative`}
              >
                <Image
                  src="/icons/shopping-cart.png"
                  alt="cartIcon"
                  width={20}
                  height={20}
                  className="w-full"
                />
                <span className="absolute top-0 right-0">
                  {countContext?.count}
                </span>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile toggle button */}
        <button
          className="lg:hidden p-2"
          type="button"
          onClick={() => setToggleBar(!toggleBar)}
        >
          <i className="fa-solid fa-xl fa-bars-staggered"></i>
        </button>
      </div>
    </div>
  );
}
