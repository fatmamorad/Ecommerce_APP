import WishList from "image/app/_component/WishList/WishList";
export const metadata = {
  title: "My Wishlist - BuyHive",
  description: "Browse your favorite products in your wishlist on BuyHive.",
  keywords: ["wishlist", "buyhive", "shopping", "favorites"],
  openGraph: {
    title: "My Wishlist - BuyHive",
    description: "Browse your favorite products in your wishlist on BuyHive.",

  },
};
function Page() {
  
  return (
   <>
      <WishList>

      </WishList>
   </>
  );
}

export default Page;
