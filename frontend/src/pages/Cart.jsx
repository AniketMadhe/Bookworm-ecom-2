import { React, useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../config/config_Url";

function Cart() {
  const [cartBooks, setCartBooks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refresh2, setRefresh2] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userAddress, setUserAddress] = useState("");

  const [hiddenAddressDiv, setHiddenAddressDiv] = useState(false);
  const [userID, setUserId] = useState();

  useEffect(() => {
    const fetchingCartBooks = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/getCartBooks`, {
          withCredentials: true,
        });

        setCartBooks(response.data.cart);
        const total = response.data.cart.reduce(
          (acc, book) => acc + book.price,
          0
        );
        setTotalPrice(total);
      } catch (e) {
        console.log(e);
      }
    };
    fetchingCartBooks();
  }, [refresh, refresh2]);

  {
    /** for fetching user address */
  }
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/welcome`, {
          withCredentials: true,
        });
        setUserAddress(response.data.address);
        setUserId(response.data._id);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserDetails();
  }, []);

  const handleRemove = async (bookId) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/cartBookRemove`,
        { bookId },
        { withCredentials: true }
      );
      if (response) {
        setRefresh((prev) => !prev);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleOrder = async (e) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/getCartBooks/handleOrder`,
        { cartBooks, userAddress },
        { withCredentials: true }
      );
      if (response) {
        alert("Order placed");
        setRefresh2((prev) => !prev);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addressUpdate = async () => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/updateUserAddress/${userID}`,
        { userAddress },
        { withCredentials: true }
      );
      alert("Address updated");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="md:w-full w-screen h-auto md:h-screen md:flex min-h-screen ">
      <div className="md:w-2/3 md:h-full bg-b w-full h-auto  ">
        <ul className="md:w-full md:h-full md:flex md:justify-around flex justify-center items-center flex-wrap gap-6 p-4 md:gap-6 md:flex-wrap">
          {cartBooks.map((book) => (
            <li
              key={book._id}
              className="md:w-[150px] md:h-[250px] md:overflow-hidden w-[100px] h-[150px]  md:m-4 border border-gray-600 shadow-[3px_3px_8px_rgba(0,0,0,2),-1px_-1px_6px_rgba(0,0,0,2)] "
            >
              <img
                src={`${book.imageUrl}`}
                alt="book image"
                className="md:w-full md:h-[65%] w-full h-3/4 md:object-cover border "
              />
              <div className="md:w-full md:h-[33%] w-full h-1/4 flex justify-center  my-2  md:flex md:flex-col md:items-center gap-2 md:gap-0 md:justify-between ">
                <h3 className="hidden md:block md:text-sm ">{book.title}</h3>
                <p className="hidden md:block md:text-sm ">{book.author}</p>
                <button
                  onClick={() => {
                    handleRemove(book._id);
                  }}
                  className="border  border-gray-500  md:px-[8px] md:mb-2 mb-1 px-2 py-f w-fit h-fit rounded-sm text-sm md:rounded-sm hover:text-white hover:bg-red-700 "
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-1/3 md:h-full md:text-center flex flex-col text-center p-3 border border-gray-500  bg-gradient-to-br from-gray-400 to-blue-800 md:flex md:flex-col md:gap-[10px]">
        <h2 className="font-bold">Order Summary</h2>
        {cartBooks.map((book) => (
          <div
            key={book._id}
            className="w-full h-[50px] bg-white p-3 mt-2 md:mt-0 md:p-0  flex gap-8 items-center justify-between px-4  "
          >
            <div className="flex-shrink-0 ">
              <img
                src={book.imageUrl}
                alt="book Image"
                className="w-[40px] h-[40px] object-cover "
              />
            </div>

            <h3>{book.title}</h3>
            <div className="flex-shrink-0">
              <h4 className="mr-6">{book.price} </h4>
            </div>
          </div>
        ))}
        <div className=" w-full h-[50px] my-4 bg-white flex">
          {!hiddenAddressDiv && (
            <div className="bg-white   w-[60%] flex  items-center px-2 pt-[2px]">
              <h4 className="">Address : {userAddress} </h4>
              <i
                onClick={() => setHiddenAddressDiv(true)}
                className="ri-edit-box-fill text-xl cursor-pointer"
              ></i>
            </div>
          )}
          {/**hidden*/}
          {hiddenAddressDiv && (
            <div className="  w-[60%] flex items-center gap-2 cursor-pointer ">
              <i
                onClick={() => setHiddenAddressDiv(false)}
                className="ri-arrow-left-circle-fill"
              ></i>
              <input
                className="w-full "
                type="text"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                required
              />
              <i onClick={addressUpdate} className="ri-save-fill"></i>
            </div>
          )}
          {/**hidden */}
          <div className="bg-gray-400 border border-gray-500 w-[40%] flex items-center justify-center pr-4 ">
            <h2>Total: {totalPrice}</h2>
          </div>
        </div>
        <div className=" w-full h-[40px]  flex justify-center items-center">
          <button
            onClick={() => {
              handleOrder();
            }}
            className="bg-gradient-to-t from-blue-950 to-blue-700 px-3 py-1 rounded-xl text-white border border-gray-600 hover:text-gray-300 hover:border-white "
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
