import { React, useState } from "react";
import axios from "axios";

function AdminAddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://bookworm-ecom-app-1.onrender.com/api/addBook",
        { title, author, price, description, imageUrl },
        { withCredentials: true }
      );
      alert("Book Added");
      setTitle("");
      setAuthor("");
      setPrice("");
      setDescription("");
      setImageUrl("");
    } catch (e) {
      alert(`${e.response.data}`);
      console.log(e);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center border  ">
      <form
        className="w-1/5 h-3/5 border border-blue-950 rounded-md flex flex-col justify-center items-center bg-gray-300 "
        onSubmit={handleSubmit}
      >
        <h2 className="text-black font-semibold mb-6">ADD BOOK</h2>
        <label htmlFor="title">Title</label>
        <input
          className="border border-gray-500"
          id="title"
          type="text"
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="author">Author</label>
        <input
          className="border border-gray-500"
          id="author"
          type="text"
          placeholder="Book Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label htmlFor="price">Price</label>
        <input
          className="border border-gray-500"
          id="price"
          type="number"
          placeholder="Book Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="description">Description</label>
        <input
          className="border border-gray-500"
          id="description"
          type="text"
          placeholder="Book description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="imageUrl">ImageUrl</label>
        <input
          className="border border-gray-500"
          id="imageUrl"
          type="text"
          placeholder="Book ImageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button
          className="border border-gray-100 mt-4 px-3 py-[2px] rounded-sm bg-blue-900  text-white hover:bg-blue-950"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminAddBook;
