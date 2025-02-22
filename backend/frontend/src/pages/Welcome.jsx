import { React, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../App";

function Welcome() {
  const { isLogin, setIsLogin, isAdmin, setIsAdmin, userId, setUserId } =
    useContext(LoginContext);
  const [bookImages, setBookImages] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(
          "https://bookworm-ecom-app-1.onrender.com/api/welcome",
          {
            withCredentials: true,
          }
        );

        if (response.data.email) {
          setIsLogin(true);
          setUserId(`${response.data._id}`);
        }
        if (response.data.role == "admin") {
          setIsAdmin(true);
          navigate("/adminDashboard");
        }
        if (response.data.role == "user") {
          setIsAdmin(false);
        }
      } catch (e) {
        if (e.response.status === 401) {
          navigate("/login");
        }
      }
    };
    validateToken();
  }, []);

  useEffect(() => {
    const fetchingBookImages = async () => {
      try {
        const response = await axios.get(
          "https://bookworm-ecom-app-1.onrender.com/api/getBooks",
          {
            withCredentials: true,
          }
        );

        setBookImages(response.data.slice(0, 4));
      } catch (e) {
        console.log(e);
      }
    };
    fetchingBookImages();
  }, []);

  const handleExploreBooks = () => {
    navigate("/homeBooks");
  };
  return (
    <div className="w-full h-screen flex ">
      <div className="w-3/5 h-full  flex flex-col p-20 pt-36 justify-start items-center gap-8">
        <h2 className="text-5xl font-semibold font-sans  mt-30">
          Your next favorite book is just a click away.
        </h2>
        <p>
          Discover books that spark joy and ignite your imagination in seconds.
          Dive into a curated collection of timeless classics, thrilling
          adventures, and heartwarming tales. Whether you're seeking inspiration
          or an escape, your next great read is waiting to be uncovered.
        </p>
        <button
          onClick={handleExploreBooks}
          className="border px-4 py-1 rounded-2xl text-black border-gray-900 font-semibold hover:bg-gradient-to-t from-blue-950 to-blue-700 hover:text-white "
        >
          Explore books
        </button>
      </div>

      <div
        style={{ perspective: "800px" }}
        className="w-2/5 h-screen flex justify-center   "
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            animation: "rotateCarousel 10s infinite linear",
          }}
          className=" flex justify-center items-center relative w-[80%] h-[80%]  mt-14"
        >
          {bookImages.map((book, i) => (
            <div
              style={{
                transform: `rotateY(${
                  (360 / bookImages.length) * i
                }deg) translateZ(250px)`,
              }}
              className="absolute w-[200px] h-[250px] border"
              key={book._id}
            >
              <img className="w-full h-full" src={book.imageUrl} alt="" />
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
      @keyframes rotateCarousel {
         0%{
         transform:rotateY(0deg);
         }
         100%{
         transform:rotateY(360deg);
         }
      }
      `}
      </style>
    </div>
  );
}

export default Welcome;
