import { React, useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../config/config_Url";

function HomeBooks() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/getBooks`, {
          withCredentials: true,
        });

        setBooks(response.data);
      } catch (e) {
        alert("error");
        console.log("error");
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchingCart = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/welcome`, {
          withCredentials: true,
        });
        if (response) {
          setCart(response.data.cart);
        }
      } catch (e) {
        alert("fetching cart failed");
      }
    };
    fetchingCart();
  }, [cart]);

  const isInCart = (bookId) => cart.includes(bookId);

  const addBook = async (bookId) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/addToCart`,
        {
          bookId,
        },
        { withCredentials: true }
      );
    } catch (e) {
      alert("not added");
      console.log(e);
    }
  };
  const removeBook = async (bookId) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/cartBookRemove`,
        {
          bookId,
        },
        { withCredentials: true }
      );
    } catch (e) {
      alert("not removed from Cart");
      console.log(e);
    }
  };

  return (
    <div className="md:w-full w-screen h-auto flex r md:h-auto md:flex md:justify-center bg-blue-400 md:items-center">
      <ul className="main md:w-[98%] md:h-[94%] w-full h-full flex flex-wrap justify-center items-start gap-4 my-4 md:m-6 md:flex md:justify-center md:gap-6 md:flex-wrap ">
        {books.map((book, i) => (
          <li
            key={i}
            className="md:w-[210px] md:h-[320px] w-[40%] h-[60%] border-red-700 md:m-[10px] "
          >
            <div className="md:w-full md:h-full border border-gray-400 shadow-[8px_8px_20px_rgba(0,0,0,3)] md:flex md:flex-col  ">
              <img
                src={book.imageUrl}
                alt="book image"
                className="md:w-full md:h-[80%] md:object-cover "
              />
              <div className="md:w-full md:h-[20%] w-full h-[30%] border  ">
                <h3 className="text-center font-semibold text-[14px] md:my-2 my-0">
                  {book.title}
                </h3>

                <div className="buttonDiv w-full h-full border bg-white flex justify-around items-center ">
                  <button
                    disabled={!isInCart(book._id)}
                    onClick={() => {
                      removeBook(book._id);
                    }}
                    className={`border border-gray-500 md:px-4 rounded-md ${
                      isInCart(book._id)
                        ? " bg-red-600 hover:bg-red-800 text-white"
                        : "bg-gray-300 text-black text-opacity-50"
                    }   `}
                  >
                    Remove
                  </button>
                  <button
                    disabled={isInCart(book._id)}
                    onClick={() => {
                      addBook(book._id);
                    }}
                    className={`border border-gray-500 px-7 ${
                      !isInCart(book._id)
                        ? " bg-blue-950 hover:bg-blue-900 text-white"
                        : "bg-gray-300 text-black text-opacity-50"
                    } rounded-md `}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeBooks;
