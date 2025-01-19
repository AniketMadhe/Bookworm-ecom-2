import { React, useState, useEffect } from "react";
import axios from "axios";

function HomeBooks() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://bookworm-ecom-app-1.onrender.com/api/getBooks",
          {
            withCredentials: true,
          }
        );

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
        const response = await axios.get(
          "https://bookworm-ecom-app-1.onrender.com/api/welcome",
          {
            withCredentials: true,
          }
        );
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
        "https://bookworm-ecom-app-1.onrender.com/api/addToCart",
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
        "https://bookworm-ecom-app-1.onrender.com/api/cartBookRemove",
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
    <div className="w-full h-auto flex justify-center items-center">
      <ul className="main w-[98%] h-[94%] m-6 flex justify-center gap-6 flex-wrap ">
        {books.map((book, i) => (
          <li key={i} className="w-[210px] h-[320px] border-red-700 m-[10px] ">
            <div className="w-full h-full border border-gray-400 shadow-[8px_8px_20px_rgba(0,0,0,3)] flex flex-col my-[3px] ">
              <img
                src={book.imageUrl}
                alt="book image"
                className="w-full h-[80%] object-cover "
              />
              <div className="w-full h-[20%] border  ">
                <h3 className="text-center font-semibold text-[14px]">
                  {book.title}
                </h3>

                <div className="buttonDiv border bg-white flex justify-around ">
                  <button
                    disabled={!isInCart(book._id)}
                    onClick={() => {
                      removeBook(book._id);
                    }}
                    className={`border border-gray-500 px-4 rounded-md ${
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
