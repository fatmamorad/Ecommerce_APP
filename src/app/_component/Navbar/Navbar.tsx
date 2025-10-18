"use client";

import Link from "next/link";
import { useState, useContext, useEffect } from "react";
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "image/components/ui/dropdown-menu";
import SearchIcon from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "image/Redux/store";
import { fetchCart, addProductAsync } from "image/Redux/CartSlice";
// import { fetchCart, } from ;

const components: { Path: string; content: string; protected: boolean }[] = [
  { Path: "/", content: "Home", protected: false },
  { Path: "/wishList", content: "WhishList", protected: true },
  
  { Path: "/allproducts", content: "Products", protected: false },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const [toggleBar, setToggleBar] = useState(false);
  const path = usePathname();
    const { count } = useSelector(
    (state: RootState) => state.cart)
    const dispatch = useDispatch<AppDispatch>()
useEffect(() => {
  if (status === "authenticated") {
    dispatch(fetchCart())
  }
}, [status, dispatch])
  
  return (
   
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
     
        <Link href="/" className="flex items-center gap-1 font-extrabold text-xl">
          <span className="text-gray-800">BUY</span>
          <span className="text-cyan-700">HIVE</span>
        </Link>
        <NavigationMenu viewport={false} className="hidden lg:flex">
          <NavigationMenuList className="flex gap-4">
            {components.map((item, index) =>
              (!item.protected || (item.protected && status === "authenticated")) && (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()} ${
                      path === item.Path ? " rounded-full bg-cyan-700 !text-white" : ""
                    }`}
                  >
                    <Link href={item.Path}>{item.content}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-3">
        
          <SearchIcon />
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`${navigationMenuTriggerStyle()} cursor-pointer`}
            >
              <Image
                src="/icons/user.png"
                alt="userIcon"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white mt-5">
              {status === "authenticated" ? (
                <>
                  <DropdownMenuLabel>
                    Hi, {session?.user?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/allorders">Orders</Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem>
                    <Link href="/proflie">Profile</Link>
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

          {/* Cart */}
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100">
            <Image
              src="/icons/shopping-cart.png"
              alt="cartIcon"
              width={22}
              height={22}
              className="w-5 h-5"
            />
            {count>0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {count}
              </span>
            )}
          </Link>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2"
            type="button"
            onClick={() => setToggleBar(!toggleBar)}
          >
            <i className="fa-solid fa-xl fa-bars-staggered"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {toggleBar && (
        <div className="lg:hidden fixed w-3/4 right-0 bg-cyan-100 mt-5 rounded-2xl  z-40 animate-slide-down">
       
          <ul className="flex flex-col p-4 gap-2 ">
            {components.map((item, index) =>
              (!item.protected || (item.protected && status === "authenticated")) && (
                <li
                  key={index}
                  className={`p-3 rounded hover:bg-gray-100 ${
                    path === item.Path ? "bg-cyan-50" : ""
                  }`}
                >
                  <Link
                    className="w-full block"
                    href={item.Path}
                    onClick={() => setToggleBar(false)}
                  >
                    {item.content}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
