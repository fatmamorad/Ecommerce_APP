import Categories from "image/app/_component/Categories/Categories";
export const metadata = {
  title: "Categories",
  description: "Browse your favorite products in your wishlist on BuyHive.",
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
    <>
       <Categories></Categories>
    </>
  );
}

export default Page;
