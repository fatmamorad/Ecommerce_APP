"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { Button } from "image/components/ui/button";
import { GetUserToken } from "image/GetUserToken";

function ProfileView() {
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  useEffect(() => {
    dataUpdateForm.reset({
      name: data?.user.name,
      email: data?.user.email,
    });
  }, [data]);

  useEffect(() => {
    initFlowbite();
  });
  const PasswordScheme = z
    .object({
      currentPassword: z
        .string()
        .nonempty("Password is required")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Password must include uppercase, lowercase, number, and special character"
        ),
      rePassword: z.string().nonempty("Confirm Password is required"),
      password: z
        .string()
        .nonempty("Password is required")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Password must include uppercase, lowercase, number, and special character"
        ),
    })
    .refine(
      (values) => {
        return values.password === values.rePassword;
      },
      {
        path: ["rePassword"],
        error: "Confirm password not match..",
      }
    );
  const scheme = z.object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: z
      .email()
      .nonempty("Email is required")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter valid email"),
    phone: z
      .string()
      .nonempty("Phone is required")
      .regex(/^01[0125][0-9]{8}$/, "Please enter Egyption Number..."),
  });

  async function handlePasswordUpdate(values: z.infer<typeof PasswordScheme>) {
    const token = await GetUserToken();
    if (!token) {
      return;
    }
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/changeMyPassword/`,
      {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    const dataA = await res.json();
    setLoading(false);
    if (dataA.statusMsg === "fail") {
      toast.error(dataA.errors.msg, {
        position: "top-center",
        classNames: {
          toast: "bg-cyan-800/80 text-white border-none",
        },
        duration: 1000,
      });
    } else {
      toast.success("User Data Updated Successfully", {
        position: "top-center",
        duration: 1000,
      });
      signOut({ callbackUrl: "/login" });
    }
  }

  async function handleDataUpdate(values: z.infer<typeof scheme>) {
    const token = await GetUserToken();
    if (!token) {
      return;
    }
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/updateMe/`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
        }),
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    const dataA = await res.json();
    setLoading(false);
    if (dataA.statusMsg === "fail") {
      toast.error(dataA.errors.msg, {
        position: "top-center",
        classNames: {
          toast: "bg-cyan-800/80 text-white border-none",
        },
        duration: 1000,
      });
    } else {
      toast.success("User Data Updated Successfully", {
        position: "top-center",
        duration: 1000,
      });
      signOut({ callbackUrl: "/login" });
    }
  }
  const dataUpdateForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(scheme),
  });

  const PasswordUpdateForm = useForm({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(PasswordScheme),
  });
  return (
    <>
      <div className="w-full  h-screen flex justify-center items-center">
        <div className="w-3/4 md:w-1/2  mx-auto   mt-10">
          <p className="text-center text-2xl font-bold">My Account</p>
          <div className="flex flex-col mt-4 border-1 rounded-2xl p-5 border-gray-400 ">
            <p className="font-medium text-sm md:text-xl ">
              <i className="fa-regular fa-user me-2"></i>Account Informaion
            </p>
            <div className="mt-4 flex flex-row ">
              <div className="flex justify-center items-center">
                <i className="text-gray-600 fa-regular fa-xs fa-user me-2"></i>
              </div>
              <div className="flex-colflex justify-center items-center">
                <p className="font-light text-gray-400  text-sm">Name</p>
                <p className="mt-1 w-fit flex justify-center items-center   text-[10px]   font-light font-sans text-s text-sm md:text-xl">
                  {data?.user.name}
                </p>
              </div>
            </div>
            <hr className="mt-2 text-gray-400"></hr>
            <div className="mt-4 flex flex-row">
              <div className="flex justify-center items-center">
                <i className=" text-gray-400 fa-regular fa-xs fa-envelope me-2"></i>
              </div>
              <div className="flex-colflex justify-center items-center">
                <p className="font-light text-gray-400  text-sm">email</p>
                <p className="mt-1 w-fit flex justify-center items-center   text-[10px]  rounded-md ">
                  {data?.user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-4 border-1 rounded-2xl p-5 border-gray-400">
            <p className="font-medium">Quick Access</p>
            <div className="flex justify-center items-center gap-2">
              <Link
                href=""
                className="w-fit flex justify-center items-center   text-[10px]   md:text-sm lg:text-md   text-center mt-5 rounded-2xl px-3 py-2 border-1 border-gray-400"
              >
                <i className="fa-regular fa-heart"></i> WishList
              </Link>
              <Link
                href=""
                className=" w-fit flex justify-center items-center   text-[10px]   md:text-sm lg:text-md text-center mt-5 rounded-2xl px-3 py-2 border-1 border-gray-400"
              >
                <i className="fa fa-shopping-cart"></i> Cart
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              type="button"
              data-modal-target="DataUpdateModal"
              data-modal-toggle="DataUpdateModal"
              className=" text-center mt-5  w-fit flex justify-center items-center   text-[10px] md:text-sm lg:text-md   rounded-2xl px-3 py-2 border-1 bg-cyan-800 text-white"
            >
              Update Profile
            </button>
            <button
              type="button"
              data-modal-target="PasswordUpdateModal"
              data-modal-toggle="PasswordUpdateModal"
              className="w-fit flex justify-center items-center   text-[10px]  md:text-sm  lg:text-md mt-5 rounded-2xl px-3 py-2 border-1 border-cyan-800 text-cyan-800"
            >
              Update Password
            </button>
          </div>
          {/* Modal For Update User Data.................... */}
          <div
            id="DataUpdateModal"
            aria-hidden="true"
            className="hidden overflow-y-auto overflow-x-hidden bg-black/50 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-11/12 md:w-1/2 max-h-full">
              <div className="relative flex bg-white justify-center items-center  rounded-lg shadow-sm dark:bg-gray-700">
                <Form {...dataUpdateForm}>
                  <form
                    className="bg-cyan-50/50 flex justify-center items-center flex-col   border-r-cyan-800 md:bg-transparent p-5 space-y-3 w-3/4 rounded-2xl"
                    onSubmit={dataUpdateForm.handleSubmit(handleDataUpdate)}
                  >
                    <p className="text-center text-s md:text-2xl font-mono mb-5 mt-5">
                      Update Profile
                    </p>

                    <FormField
                      control={dataUpdateForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="relative w-full">
                          <FormControl>
                            <Input
                              type="text"
                              placeholder={data?.user.name}
                              {...field}
                              className="
                              focus:ring-0 focus:outline-none text-xs md:text-md focus:border-none"
                            ></Input>
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="ms-4  text-red-700 text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={dataUpdateForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="relative w-full">
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={data?.user.email}
                              {...field}
                              className="text-xs md:text-md"
                            ></Input>
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="ms-4 text-xs  text-red-700 " />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={dataUpdateForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="relative w-full">
                          {!field.value ? (
                            <FormLabel className="absolute  text-xs md:text-md left-1 top-3 text-gray-500">
                              Phone
                            </FormLabel>
                          ) : (
                            <FormLabel className="text-xs md:text-md text-black">
                              Phone
                            </FormLabel>
                          )}
                          <FormControl>
                            <Input
                              type="tel"
                              {...field}
                              className="text-xs md:text-md"
                            ></Input>
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="ms-4   text-red-700 text-sm" />
                        </FormItem>
                      )}
                    />
                    {!loading ? (
                      <Button
                        type="submit"
                        className=" mx-auto w-1/2 bg-cyan-800 rounded-2xl cursor-pointer text-white"
                      >
                        Upodate
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="w-1/2 bg-cyan-800 rounded-2xl cursor-pointer text-white"
                      >
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      </Button>
                    )}
                  </form>
                </Form>
              </div>
            </div>
          </div>
          <div
            id="PasswordUpdateModal"
            aria-hidden="true"
            className="hidden overflow-y-auto overflow-x-hidden bg-black/50 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4  w-11/12 md:w-1/2  max-h-full">
              <div className="relative flex bg-white justify-center items-center  rounded-lg shadow-sm dark:bg-gray-700">
                <Form {...PasswordUpdateForm}>
                  <form
                    className="bg-cyan-50/50 flex justify-center items-center flex-col  md:bg-transparent p-5 space-y-3 w-3/4 rounded-2xl"
                    onSubmit={PasswordUpdateForm.handleSubmit(
                      handlePasswordUpdate
                    )}
                  >
                    <p className="text-center text-s md:text-2xl font-mono mb-5 mt-5">
                      Update Password
                    </p>
                    <FormField
                      control={PasswordUpdateForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem className="relative w-full">
                          {!field.value ? (
                            <FormLabel className="absolute  text-xs md:text-md left-1 top-3 text-gray-500">
                              Old Password
                            </FormLabel>
                          ) : (
                            <FormLabel className="text-xs md:text-md text-black">
                              Old Password
                            </FormLabel>
                          )}
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              className="text-xs md:text-md"
                            ></Input>
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="ms-4   text-red-700 text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={PasswordUpdateForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="relative w-full">
                          {!field.value ? (
                            <FormLabel className="absolute  text-xs md:text-md left-1 top-3 text-gray-500">
                              New Password
                            </FormLabel>
                          ) : (
                            <FormLabel className="text-xs md:text-md text-black">
                              New Password
                            </FormLabel>
                          )}
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              className="
                              focus:ring-0 focus:outline-none text-xs md:text-md focus:border-none"
                            ></Input>
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="ms-4  text-red-700 text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={PasswordUpdateForm.control}
                      name="rePassword"
                      render={({ field }) => (
                        <FormItem className="relative w-full">
                          {!field.value ? (
                            <FormLabel className="absolute  text-xs md:text-md left-1 top-3 text-gray-500">
                              Confirm Password
                            </FormLabel>
                          ) : (
                            <FormLabel className="text-xs md:text-md text-black">
                              Confirm Password
                            </FormLabel>
                          )}
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              className="text-xs md:text-md"
                            ></Input>
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="ms-4 text-xs  text-red-700 " />
                        </FormItem>
                      )}
                    />

                    {!loading ? (
                      <Button
                        type="submit"
                        className=" mx-auto w-1/2 bg-cyan-800 rounded-2xl cursor-pointer text-white"
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="w-1/2 bg-cyan-800 rounded-2xl cursor-pointer text-white"
                      >
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      </Button>
                    )}
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileView;
