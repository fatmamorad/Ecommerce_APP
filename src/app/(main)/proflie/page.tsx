"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
function Page() {
  const { data } = useSession();
  console.log(data)
  return (
    <>
      <div className="w-3/4 mx-auto h-screen ">
        <p className=" text-center text-2xl mt-10 ">PROFILE</p>
        <div className="grid grid-cols-12  h-3/4  w-full">
          <div className="col-span-6 place-content-center place-items-cente">
             <div>
            {" "}
            <Image
              src="/icons/user.png"
              alt="User Avatar"
              width={60}
              height={60}
              className="rounded-full my-5"
            />
            <p>Name : {data?.user.name}</p>
            <p>Email : {data?.user.email}</p>
          </div>
          </div>
         
        </div>
      </div>
    </>
  );
}

export default Page;
