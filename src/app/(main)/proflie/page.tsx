import ProfileView from "image/app/_component/ProfileView/ProfileView";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
function Page() {
  const { data } = useSession();
  console.log(data)
  return (
    <>
      <ProfileView></ProfileView>
    </>
  );
}

export default Page;
