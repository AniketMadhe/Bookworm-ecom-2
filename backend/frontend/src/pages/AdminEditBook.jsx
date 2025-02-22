import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import axios from "axios";

function AdminEditBook() {
  const location = useLocation();
  const { id } = location.state;
  const navigate = useNavigate();

  const [book, setBook] = useState({});
  const [firstDiv, setFirstDiv] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const [bookId, setBookId] = useState();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://bookworm-ecom-app-1.onrender.com/api/getBook/${id}`,
          { withCredentials: true }
        );

        setBookId(response.data._id);
        setBook(response.data);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setImageUrl(response.data.imageUrl);
        setRefresh(true);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [refresh]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://bookworm-ecom-app-1.onrender.com/api/adminUpdateBook/${id}`,
        { title, author, price, description, imageUrl },
        { withCredentials: true }
      );
      if (response) setRefresh(false);
      alert("updated");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `https://bookworm-ecom-app-1.onrender.com/api/adminDeleteBook/${bookId}`,
        {
          withCredentials: true,
        }
      );
      navigate("/adminDashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-screen flex gap-12 m-6">
      <img
        className="w-1/3 h-5/6 object-cover shadow-[3px_3px_5px_rgba(0,0,0,0.9)]"
        src={book.imageUrl}
        alt=""
      />
      {firstDiv && (
        <div
          className={` w-1/2 h-5/6 flex flex-col gap-3 bg-slate-200 justify-around items-center border border-gray-400`}
        >
          <h3 className="text-black font-semibold text-center">{book.title}</h3>
          <p className="w-[90%] flex justify-start p-5 h-4/6  ">
            {book.description}
          </p>
          <h3 className="border border-gray-500 bg-slate-400 px-3 p-y[1px] rounded-sm ">
            Price:{book.price}
          </h3>
          <button
            onClick={() => setFirstDiv(false)}
            className="mb-2 px-5 py-[1px] bg-gray-700 hover:bg-gray-800 text-white rounded-sm border border-white"
          >
            Edit
          </button>
        </div>
      )}

      {/**Hidden div */}
      {!firstDiv && (
        <div className="w-1/2 h-5/6 flex justify-center items-center  ">
          <form className="w-[45%] h-[85%] bg-gradient-to-b from-gray-200 to-slate-300  border border-blue-950 flex flex-col items-center  gap-[5px] rounded-sm">
            <h2 className="mt-5 font-bold">Update Book</h2>
            <label className="mt-[3px]" htmlFor="title">
              {" "}
              Title
            </label>
            <input
              className="border border-gray-400 px-3 py-[2px]"
              id="title"
              value={title}
              placeholder="Book title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label htmlFor="author"> Author</label>
            <input
              className="border border-gray-400 px-3 py-[2px]"
              id="author"
              value={author}
              placeholder="Book Author"
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <label htmlFor="price"> Price</label>
            <input
              className="border border-gray-400 px-3 py-[2px]"
              id="price"
              value={price}
              placeholder="Book Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <label htmlFor="description"> Description</label>
            <input
              className="border border-gray-400 px-3 py-[2px]"
              id="description"
              value={description}
              placeholder="Book Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label htmlFor="imageUrl"> ImageUrl</label>
            <input
              className="border border-gray-400 px-3 py-[2px]"
              id="imageUrl"
              value={imageUrl}
              placeholder="Book ImageUrl"
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <div className="w-[100%] flex  gap-4 border ">
              <button className="  mt-5 px-4 py-[2px] rounded-sm">
                <i
                  onClick={() => setFirstDiv(true)}
                  className="ri-arrow-left-circle-fill text-2xl"
                ></i>
              </button>
              <button
                onClick={handleUpdate}
                className="border font-semibold bg-blue-700 hover:bg-blue-900  text-white border-gray-700 mt-5 px-4 py-[2px] rounded-md"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="border font-semibold bg-red-700 hover:bg-red-900  text-white border-gray-700 mt-5 px-4 py-[2px] rounded-md"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      )}
      {/**Hidden div */}
    </div>
  );
}

export default AdminEditBook;
