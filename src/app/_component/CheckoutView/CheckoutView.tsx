"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "image/components/ui/button";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Cart, CartData } from "image/types/cart.type";
import { GetCartItems } from "image/cartActions";
import { CardPayment, CashPayment } from "image/PaymentAction";
import {  CardPaymenttype, CheckOut, CheckOutCard } from "image/types/CheckOut.type";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "image/components/ui/form";
import { Input } from "image/components/ui/input";
import Loading from "image/app/loading";

function CheckoutView() {
  const { cartID } = useParams<{ cartID: string }>();
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [CartItems, setCartItems] = useState<Cart>();
  const [TotalPrice, setPrice] = useState(0);
 
  async function getcartItems() {
    const data: CartData = await GetCartItems();
    setPrice(data?.data?.totalCartPrice);
    setCartItems(data.data);
  }

  useEffect(() => {
    getcartItems();
  }, []);

  const scheme = z.object({
    details: z.string().nonempty("Address is required"),
    phone: z.string().nonempty("Phone is required"),
    city: z.string().nonempty("City is required"),
  });

  async function handlechecout(values: z.infer<typeof scheme>) {
      // 👈 كده هتاخديه من الـ URL
    console.log(cartID)
    if (paymentMethod === "cash") {
      let data: CheckOut = await CashPayment(cartID, values);
      if (data.status === "success") {
        toast.success("Order Completed", { position: "top-center" });
        window.location.href = "/";
      }
    }

    if (paymentMethod === "card") {
      let data :CardPaymenttype= await CardPayment(cartID, values);
      if (data.session.url) {
        window.location.href = data.session.url;
      }
    }
  }

  const Checkout = useForm({
    resolver: zodResolver(scheme),
  });

  if (!CartItems) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-3/4 mx-auto grid grid-cols-12 gap-y-3 py-10 h-screen">
      {/* Left side - Form */}
      <div className="col-span-12 lg:col-span-6 flex justify-center items-center">
        <div className="w-full bg-white shadow-md rounded-2xl p-8">
          <Form {...Checkout}>
            <form
              className="space-y-4"
              onSubmit={Checkout.handleSubmit(handlechecout)}
            >
              {/* Address */}
              <FormField
                control={Checkout.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600 text-xs" />
                  </FormItem>
                )}
              />

            
              <FormField
                control={Checkout.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600 text-xs" />
                  </FormItem>
                )}
              />

              
              <FormField
                control={Checkout.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600 text-xs" />
                  </FormItem>
                )}
              />

              <div className="mt-6">
                <p className="text-sm font-semibold mb-2">Payment Method</p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                    />
                    Cash
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
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

              {/* Submit */}
              <Button
                type="submit"
                className="w-full mt-4 bg-cyan-800 rounded-xl text-white"
              
              >
                Complete Order
              </Button>
            </form>
          </Form>
        </div>
      </div>


      <div className="col-span-12 lg:col-span-6 bg-gray-50 rounded-2xl shadow-md p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {CartItems?.products.map((item) => (
            <div
              key={item._id}
              className="flex items-center p-3 rounded-lg bg-white shadow-sm"
            >
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                width={50}
                height={50}
                className="rounded-md object-cover"
              />
              <div className="flex-1 ml-4">
                <p className="font-medium md:text-sm  text-xs">{item.product.title}</p>
                <p className="md:text-sm  text-xs text-gray-500">
                  {item.product.brand.name}
                </p>
              </div>
              <p className="font-semibold md:text-sm  text-xs">{item.price} LE</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <span>{TotalPrice} LE</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutView;
