import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../config/config_Url";

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
        const response = await axios.get(`${BACKEND_URL}/api/getBook/${id}`, {
          withCredentials: true,
        });

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
        `${BACKEND_URL}/api/adminUpdateBook/${id}`,
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
        `${BACKEND_URL}/api/adminDeleteBook/${bookId}`,
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
    <div className="md:w-full md:h-auto w-screen h-auto flex flex-col my-[5%] gap-6 justify-center items-center md:flex md:gap-12 md:m-6">
      <img
        className="md:w-1/3 md:h-5/6 md:object-cover w-[80%] h-auto  shadow-[3px_3px_5px_rgba(0,0,0,0.9)]"
        src={book.imageUrl}
        alt=""
      />
      {firstDiv && (
        <div
          className={` md:w-1/2 md:h-5/6 md:flex md:flex-col md:gap-3 w-[90%] h-auto p-3 flex flex-col gap-4 justify-center items-center bg-slate-200 md:justify-around md:items-center border border-gray-400`}
        >
          <h3 className="text-black font-semibold md:text-center">
            {book.title}
          </h3>
          <p className="md:w-[90%] md:flex md:justify-start md:p-5 md:h-4/6  ">
            {book.description}
          </p>
          <h3 className="border border-gray-500 bg-slate-400 md:px-3 md:p-y[1px] rounded-sm ">
            Price:{book.price}
          </h3>
          <button
            onClick={() => setFirstDiv(false)}
            className="md:mb-2 md:px-5 md:py-[1px] px-2 rounded-md bg-gray-700 hover:bg-gray-800 text-white md:rounded-sm border border-white"
          >
            Edit
          </button>
        </div>
      )}

      {/**Hidden div */}
      {!firstDiv && (
        <div className="md:w-1/2 md:h-5/6 w-[90%] h-auto  gap-3 md:flex md:justify-center md:items-center  ">
          <form className="md:w-[45%] md:h-[85%] w-full h-full flex justify-center items-center flex-col gap-1  bg-gradient-to-b from-gray-200 to-slate-300  border border-blue-950 md:flex md:flex-col md:items-center  md:gap-[5px] rounded-sm">
            <h2 className="md:mt-5 mt-3 font-bold">Update Book</h2>
            <label className="mt-[3px]" htmlFor="title">
              {" "}
              Title
            </label>
            <input
              className="border border-gray-400 md:px-3 md:py-[2px]"
              id="title"
              value={title}
              placeholder="Book title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label htmlFor="author"> Author</label>
            <input
              className="border border-gray-400 md:px-3 md:py-[2px]"
              id="author"
              value={author}
              placeholder="Book Author"
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <label htmlFor="price"> Price</label>
            <input
              className="border border-gray-400 md:px-3 md:py-[2px]"
              id="price"
              value={price}
              placeholder="Book Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <label htmlFor="description"> Description</label>
            <input
              className="border border-gray-400 md:px-3 md:py-[2px]"
              id="description"
              value={description}
              placeholder="Book Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label htmlFor="imageUrl"> ImageUrl</label>
            <input
              className="border border-gray-400 md:px-3 md:py-[2px]"
              id="imageUrl"
              value={imageUrl}
              placeholder="Book ImageUrl"
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <div className="md:w-[100%] md:flex w-full h-full mb-5 ml-[-10%]  flex items-center justify-center gap-8 px-3 md:gap-2 md:pb-2 border ">
              <button className="  md:mt-5 md:px-2 md:py-[2px] mt-3 rounded-sm">
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
