import AllProductsView from "image/app/_component/AllProductsView/AllProductsView";
export const metadata = {
  title: "Products Page",
  keywords: ["Brands", "Products", "shopping", "favorites"],
  openGraph: {
    title: " BuyHive",
    description: "Browse your favorite products in your wishlist on BuyHive.",
    siteName: "BuyHive",
    type: "website",
  },
};
export default function Page() {

  return (
     <> 
       <AllProductsView></AllProductsView>
     </>
  )
}
