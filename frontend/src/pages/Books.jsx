import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://bookworm-ecom-app-1.onrender.com/api/books",
          {
            withCredentials: true,
          }
        );
        setBooks(response.data.slice(0, 5));
      } catch (e) {
        console.log(e);
      }
    };
    fetchBooks();
  }, []);

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className="w-full h-screen flex flex-col justify-start gap-4 items-center">
      <h2 className="font-bold mt-5 text-lg">Featured Books</h2>
      <ul className="w-[90%] h-[50%] flex flex-wrap justify-center items-center  gap-6 border">
        {books.map((book) => (
          <div
            className="w-1/6 h-[95%] border   border-gray-500 shadow-[4px_4px_5px_rgba(0,0,0,0.8)]"
            key={book._id}
          >
            <li className="w-full h-[80%]">
              <img
                className="w-full h-full object-cover"
                src={book.imageUrl}
                alt=""
              />
              <h4 className="w-full h-[10%]  font-semibold text-center mt-4">
                {book.title}
              </h4>
            </li>
          </div>
        ))}
      </ul>
      <button
        onClick={handleClick}
        className="font-semibold mt-4  border px-5 py-1 rounded-sm bg-gray-900 text-white hover:bg-gray-800 "
      >
        Get Started
      </button>
    </div>
  );
}

export default Books;
