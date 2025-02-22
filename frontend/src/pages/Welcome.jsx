import { React, useEffect, useState, useContext } from "react";
import BACKEND_URL from "../config/config_Url";
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
          `${BACKEND_URL}/api/welcome`,

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
        const response = await axios.get(`${BACKEND_URL}/api/getBooks`, {
          withCredentials: true,
        });

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
    <div className="md:w-full w-screen h-screen md:h-screen flex flex-col md:flex md:flex-row">
      <div className="md:w-full md:h-full w-full h-full  px-2 pt-4 md:pt-0 flex flex-col md:flex-row md:p-20   justify-start items-center gap-8">
        <div
          style={{ perspective: "550px", perspectiveOrigin: "80% 5%" }}
          className="w-full h-1/3 md:w-[40%] md:h-full flex justify-center mt-15 md:mt-0 box-content  "
        >
          <div
            style={{
              transformStyle: "preserve-3d",
              animation: "rotateCarousel 10s infinite linear",
            }}
            className=" flex justify-center items-start relative w-[30%] h-full md:pt-10  mt-14"
          >
            {bookImages.map((book, i) => (
              <div
                style={{
                  transform: `rotateY(${
                    (360 / bookImages.length) * i
                  }deg) translateZ(150px)`,
                }}
                className="absolute w-[80%] md:w-[100%] md:h-[30%] h-[50%] "
                key={book._id}
              >
                <img className="w-full h-full" src={book.imageUrl} alt="" />
              </div>
            ))}
          </div>
        </div>
        {/**text part */}

        <div className=" md:w-[60%] md:h-auto h-[50%] md:flex flex flex-col items-center gap-5 md:flex-col md:justify-center md:items-center md:gap-3">
          <h2 className="text-4xl font-semibold font-sans text-center h-auto  ">
            Your next favorite book is just a click away.
          </h2>
          <p className="text-center p-3 h-auto">
            Discover books that spark joy and ignite your imagination in
            seconds. Dive into a curated collection of timeless classics,
            thrilling adventures, and heartwarming tales. Whether you're seeking
            inspiration or an escape, your next great read is waiting to be
            uncovered.
          </p>
          <button
            onClick={handleExploreBooks}
            className="border px-4 py-1  md:ml-0 w-fit  rounded-2xl text-black border-gray-900 font-semibold hover:bg-gradient-to-t from-blue-950 to-blue-700 hover:text-white "
          >
            Explore books
          </button>
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
