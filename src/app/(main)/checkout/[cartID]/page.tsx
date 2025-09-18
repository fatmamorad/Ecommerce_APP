"use client";
import { Input } from "../../../../components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "image/components/ui/button";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Cart, CartData } from "image/types/cart.type";
import { GetCartItems } from "image/cartActions";

import { CardPayment, CashPayment } from "image/PaymentAction";
import { CheckOut, CheckOutCard } from "image/types/CheckOut.type";

function Page({ params }: { params: { cartID: string } }) {
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [CartItems, setCartItems] = useState<Cart>();
  const [TotalPrice, setPrice] = useState(0);
 
  async function getcartItems() {
    const data: CartData = await GetCartItems();
    let count = 0;
    data.data.products.forEach((item) => {
      count += item.count;
    });
    setPrice(data?.data?.totalCartPrice);
    setCartItems(data.data);
  }
  useEffect(() => {
    getcartItems();
  }, []);
  const Route = useRouter();
  const scheme = z.object({
    details: z
      .string()
      .nonempty("Email is required"),
    phone: z
      .string()
      .nonempty("Password is required"),
    city: z
      .string()
      .nonempty("Password is required")
      
  });
  async function handlechecout(values: z.infer<typeof scheme>) {
    const param = await params;
    const cartID: string = param.cartID;
    console.log(paymentMethod)
    console.log(1500, cartID);
    console.log(values);
    if (paymentMethod === "cash") {
      let data: CheckOut = await CashPayment(cartID, values);
      if (data.status === "success") {
        toast.success("Orders Compeleted");
      }
    }

    if (paymentMethod === "card") {
      let data: CheckOutCard = await CardPayment(cartID, values);
      console.log(data)
      if (data.status === "success") {
        window.location.href=data.session.url
      }
    }
  }
  const Checkout = useForm({
    resolver: zodResolver(scheme),
  });
  return (
    <div className="w-3/4 mx-auto grid  grid-cols-12 h-screen ">
      <div className="col-span-12 order-1  lg:lg-0 lg:col-span-6 flex justify-center items-center">
        <div className="content-center  p-8 focus:outline-0 focus:border-0    items-center w-full">
          <Form {...Checkout}>
            <form
              className="    p-5 space-y-2 rounded-2xl"
              onSubmit={Checkout.handleSubmit(handlechecout)}
            >
              <FormField
                control={Checkout.control}
                name="details"
                render={({ field }) => (
                  <FormItem className="relative">
                    {!field.value ? (
                      <FormLabel className="absolute text-xs sm:text-s md:text-x left-1 top-3  text-gray-500 ">
                        Address
                      </FormLabel>
                    ) : (
                      <FormLabel className="text-black text-xs sm:text-s md:text-x">
                        Address
                      </FormLabel>
                    )}
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        className="text-xs sm:text-s md:text-x"
                      ></Input>
                    </FormControl>
                    <FormDescription />
                    <FormMessage className="ms-4 text-xs  text-red-700 " />
                  </FormItem>
                )}
              />

              {/* password Input  */}
              <FormField
                control={Checkout.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="relative">
                    {!field.value ? (
                      <FormLabel className="text-xs sm:text-s md:text-x absolute left-1 top-3 text-gray-500">
                        city
                      </FormLabel>
                    ) : (
                      <FormLabel className="text-xs sm:text-s md:text-x text-black">
                        city
                      </FormLabel>
                    )}
                    <FormControl>
                      <Input
                        type="text"
                        className="text-xs sm:text-s md:text-x"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormDescription />
                    <FormMessage className=" text-red-700 text-xs sm:text-s md:text-x" />
                  </FormItem>
                )}
              />

              <FormField
                control={Checkout.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="relative">
                    {!field.value ? (
                      <FormLabel className="text-xs sm:text-s md:text-x absolute left-1 top-3 text-gray-500">
                        phone
                      </FormLabel>
                    ) : (
                      <FormLabel className="text-xs sm:text-s md:text-x text-black">
                        phone
                      </FormLabel>
                    )}
                    <FormControl>
                      <Input
                        type="text"
                        className="text-xs sm:text-s md:text-x"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormDescription />
                    <FormMessage className=" text-red-700 text-xs sm:text-s md:text-x" />
                  </FormItem>
                )}
              />

              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Payment Method</p>
                <div className="flex gap-4 justify-around items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                    />
                    Cash
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    Credit Card
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-3 bg-cyan-800 rounded-xl cursor-pointer text-white"
              >
                {" "}
                Compelete order{" "}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6 p-10  place-content-center  order-0 lg:order-1  text-sm  md:text-x ">
        
        <div className="h-3/4 lg:h-2/6    overflow-y-auto ">
          {CartItems?.products.map((item) => {
            return (
              <>
                <div className="flex p-3  rounded-2xl w-full">
                  <div className="flex-1 relative ">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={70}
                      height={70}
                      className="w-full h-full object-contain  absolute rounded-3xl "
                    ></Image>
                   
                  </div>
                  <div className="flex-2 flex-col justify-center  items-center p-3">
                    <p>{item.product.title}</p>
                    <p>{item.product.brand.name}</p>
                  </div>
                  <div className="  flex-1 flex justify-start items-center">
                    {item.price} LE
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <div className="  rounded-2xl w-full flex text-sm  md:text-xl justify-around items-center">
          <div className="w-full text-sm  md:text-x grid grid-cols-12 place-content-center place-items-center">
            <p className="col-span-6 text-s  md:text-x">Total :</p>
            <p className="col-span-6">{TotalPrice} LE</p>
          </div>
      
        </div>
      </div>
    </div>
  );
}

export default Page;
