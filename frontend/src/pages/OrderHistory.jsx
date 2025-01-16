import axios from "axios";
import { React, useState, useEffect } from "react";
axios;
import { format } from "date-fns/fp";

function OrderHistory() {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/orderHistory",
          { withCredentials: true }
        );

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
    <div className="w-full h-screen flex ">
      <div className="w-2/3 h-full bg-white ">
        <ul className="flex flex-col justify-around items-center gap-8 mx-2 my-2">
          {myOrders.map((order) => (
            <div
              className="w-full h-10 bg-gray-300 flex justify-around items-center gap-8"
              key={order._id}
            >
              <li>{order.email}</li>
              <p>
                {new Date(order.createdAt).toLocaleDateString()}
                {" at "}
                {new Date(order.createdAt).toLocaleTimeString("en-us", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
          <details>
            <summary>View more</summary>
            <p>/-</p>
          </details>
        </ul>
      </div>
      <div className="border w-1/3 h-full  "></div>
    </div>
  );
}

export default OrderHistory;
