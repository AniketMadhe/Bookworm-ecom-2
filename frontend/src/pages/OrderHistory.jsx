import axios from "axios";
import { React, useState, useEffect } from "react";
axios;
import { format } from "date-fns/fp";
import BACKEND_URL from "../config/config_Url";

function OrderHistory() {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/orderHistory`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setMyOrders(response.data.orders);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchOrderHistory();
  }, []);
  return (
    <div className="md:w-full  w-screen h-screen md:h-screen md:flex ">
      <div className="md:w-2/3 md:h-full bg-white ">
        <ul className="md:flex md:flex-col md:justify-around md:items-center md:gap-8 md:mx-2 md:my-2">
          {myOrders.map((order) => (
            <div
              className="md:w-full md:h-10 w-full h-full p-3  flex justify-center gap-4 bg-gray-300 md:flex md:justify-around md:items-center md:gap-8"
              key={order._id}
            >
              <li>{order.email}</li>
              <p>
                {new Date(order.createdAt).toLocaleDateString()}
                <br />

                <span className="text-blue-800">
                  {new Date(order.createdAt).toLocaleTimeString("en-us", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
              {/** <details>
                <summary>Books</summary>
                {order.bookId.map((book) => (
                  <p key={book._id}>{book.title}</p>
                ))}
              </details> */}
              <p>{order.status}</p>
            </div>
          ))}
          <details className="flex justify-center items-center">
            <summary>View more</summary>
            <p>/-</p>
          </details>
        </ul>
      </div>
      <div className=" md:w-1/3 md:h-full hidden md:block  "></div>
    </div>
  );
}

export default OrderHistory;
