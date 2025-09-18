import CartView from "image/app/_component/CartView/CartView";
export const metadata = {
  title: "Cart",
  description: "Browse your favorite products in your Cart on BuyHive.",
  keywords: ["wishlist", "buyhive", "shopping", "favorites"],
  openGraph: {
    title: "Products - BuyHive",
    description: "Browse your favorite products in your wishlist on BuyHive.",
    siteName: "BuyHive",
    type: "website",
  },
};
 function Page() {
    return (
     <CartView></CartView>
    );
}

export default Page
