
import CheckoutView from "image/app/_component/CheckoutView/CheckoutView";
export const metadata = {
  title: "ChekOut",
  description: "Browse your favorite products in your wishlist on BuyHive.",
  keywords: ["Chek Out", "buyhive", "shopping", "favorites"],
  openGraph: {
    title: "Chek Out - BuyHive",
   siteName: "BuyHive",
    type: "website",
  },
};
function Page({ params }: { params: { cartID: string } }) {
 
  return (
   <>
     <CheckoutView >
      
     </CheckoutView>
   </>
  );
}

export default Page;
