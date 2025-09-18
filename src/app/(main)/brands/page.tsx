import BransView from "image/app/_component/BransView/BransView";
export const metadata = {
  title: "Brands Page",
  keywords: ["Brands", "buyhive", "shopping", "favorites"],
  openGraph: {
    title: "Bran - BuyHive",
    description: "Browse your favorite products in your wishlist on BuyHive.",
    siteName: "BuyHive",
    type: "website",
  },
};
function Page() {
 
  return (
     <>
       <BransView>
       </BransView>
     </>
  );
}

export default Page;
