import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(
          "https://bookworm-ecom-app-1.onrender.com/api/getBooks",
          {
            withCredentials: true,
          }
        );
        setBooks(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllBooks();
  }, []);

  const handleBookClick = (id) => {
    navigate("/adminEditBook", { state: { id } });
  };

  return (
    <div className="w-full h-screen flex justify-center items-start border  ">
      <ul className="w-[90%] h-[90%]  mt-8  flex justify-center items-center gap-4 flex-wrap">
        {books.map((book) => (
          <li
            onClick={() => {
              handleBookClick(book._id);
            }}
            className="w-48 h-72 mx-2 my-2 border border-gray-500 cursor-pointer rounded-sm shadow-[4px_4px_10px_rgba(0,0,0,3)]"
            key={book._id}
          >
            <img
              className="w-full h-[80%] object-cover"
              src={book.imageUrl}
              alt="image"
            />

            <h4 className="w-full h-[20%] text-[13px] font-semibold border bg-white flex justify-center items-center ">
              {book.title}
            </h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
