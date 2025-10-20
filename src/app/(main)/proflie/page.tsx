import ProfileView from "image/app/_component/ProfileView/ProfileView";
export const metadata = {
  title: "Profikle",
  keywords: ["Profile", "buyhive", "shopping", "favorites"],
  openGraph: {
    title: "User Profile - BuyHive",
    siteName: "BuyHive",
    type: "website",
  },
};
function Page() {
 
  return (
    <>
      <ProfileView></ProfileView>
    </>
  );
}

export default Page;
