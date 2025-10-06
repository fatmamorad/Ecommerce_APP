"use client";
import Loading from "image/app/loading";
import { Order } from "image/types/Orders.type";
import { GetAllOrders } from "image/WishlistAction";
import { useEffect, useState } from "react";

function Page() {
  const [OrderData, setOrderData] = useState<Order[]>();
  const [loading, setLoading] = useState<boolean>(false);

  async function GetOrders() {
    setLoading(true);
    const data: Order[] = await GetAllOrders();
    setLoading(false);
    setOrderData(data);
  }

  useEffect(() => {
    GetOrders();
  }, []);

  return (
    <>
      <div className="w-11/12 lg:w-3/4 mx-auto">
        <p className="text-center text-xl mt-10 font-semibold">ALL ORDERS</p>

        {loading && <Loading></Loading>}

        {OrderData && OrderData.length > 0 ? (
           <>       <div className="hidden md:block relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ORDER ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      PAYMENT METHOD
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delivered
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {OrderData.map((order) => (
                    <tr
                      key={order._id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order._id}
                      </td>
                      <td className="px-6 py-4">{order.paymentMethodType}</td>
                      <td className="px-6 py-4">
                        {order.isDelivered ? "Delivered" : "Not Delivered"}
                      </td>
                      <td className="px-6 py-4">{order.totalOrderPrice} EGP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

<div className="md:hidden mt-6 space-y-4">
              {OrderData.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-lg shadow-sm p-4 bg-white"
                >
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Order ID:</span> {order._id}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Payment:</span>{" "}
                    {order.paymentMethodType}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Status:</span>{" "}
                    {order.isDelivered ? "Delivered" : "Not Delivered"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Total:</span>{" "}
                    {order.totalOrderPrice} EGP
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          !loading && <p className="text-center mt-10">No orders found.</p>
        )}
      </div>
    </>
  );
}

export default Page;
