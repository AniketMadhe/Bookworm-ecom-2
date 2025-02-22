import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { LoginContext } from "../App";
import BACKEND_URL from "../config/config_Url";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin, setIsLogin, isAdmin, setIsAdmin } = useContext(LoginContext);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${BACKEND_URL}/api/logout`, {
        withCredentials: true,
      });
      setIsLogin(false);
      setIsAdmin(false);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-screen relative  h-20 bg-gradient-to-b from-blue-950  to-blue-100 bg-green-400 flex items-center justify-between ">
      <div className=" w-10 md:w-20 h-10 md:h-20  ml-2 md:ml-6 rounded-full overflow-hidden">
        <img
          className="w-full h-full"
          src="https://img.pikbest.com/png-images/book-logo-vector-graphic-element_1792850.png!f305cw"
          alt=""
        />
      </div>
      <div>
        <h1 className=" md:ml-40 font-extrabold text-3xl text-center text-slate-950">
          BookWorm
        </h1>
      </div>
      {!isOpen && (
        <i
          className="ri-menu-line mr-5 text-2xl z-10 md:hidden"
          onClick={() => setIsOpen(true)}
        ></i>
      )}
      {isOpen && (
        <i
          className="ri-close-fill mr-5 text-2xl z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></i>
      )}
      {isOpen && (
        <div className="absolute w-2/3 h-[50vh] top-0 right-0 md:hidden bg-opacity-50  bg-gray-800  transition-all duration-300 ease-in-out">
          <ul className="w-full h-full flex flex-col z-30 justify-center items-center gap-4 mt-auto">
            {/**Links if user not logged in  */}
            {!isLogin && (
              <>
                <li>
                  <Link
                    to="/books"
                    className="text-white font-bold text-xl "
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    BOOKS
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="text-white font-bold text-xl "
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    SIGNUP
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-white font-bold text-xl "
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    LOGIN
                  </Link>
                </li>
              </>
            )}

            {/**Links if user logged in but is not (admin)  */}
            {isLogin && !isAdmin && (
              <>
                <li
                  className="text-white text-2xl z-50"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {" "}
                  <Link to="/"> HOME</Link>
                </li>
                <li
                  className="text-white text-2xl z-50"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {" "}
                  <Link to="/homeBooks">BOOKS</Link>
                </li>
                <li
                  className="text-white text-2xl z-50"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {" "}
                  <Link to="/cart"> CART</Link>
                </li>
                <li
                  className="text-white text-2xl z-50"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {" "}
                  <Link to="/orderHistory"> ORDER HISTORY</Link>
                </li>
                <button
                  className="text-white text-2xl z-50"
                  onClick={(e) => {
                    handleLogout(e);
                    setIsOpen(false);
                  }}
                >
                  LOGOUT
                </button>
              </>
            )}

            {/**LINKS FOR ADMIN */}
            {isLogin && isAdmin && (
              <>
                <li>
                  <Link
                    to="/adminDashboard"
                    className="text-white font-bold text-xl "
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    DASHBOARD
                  </Link>
                </li>
                <li>
                  <Link
                    to="/adminOrders"
                    className="text-white font-bold text-xl "
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    ORDERS
                  </Link>
                </li>
                <li>
                  <Link
                    to="/adminAddBook"
                    className="text-white font-bold text-xl "
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    ADD BOOK
                  </Link>
                </li>
                <li>
                  <button
                    className="text-red-600 font-bold text-2xl"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
      {/**LINKS FOR DESKTOP */}
      <ul className=" justify-center hidden  md:flex   items-center gap-6 mr-6 flex-wrap ">
        {/**Links if user not logged in  */}
        {!isLogin && (
          <>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/books"> Books</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/signup"> Signup</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/login"> Login</Link>
            </li>
          </>
        )}
        {/**Links if user logged in but is not (admin)  */}
        {isLogin && !isAdmin && (
          <>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/"> Home</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/homeBooks">Books</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/cart"> Cart</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/orderHistory"> Order history</Link>
            </li>
            <button className="hover:text-red-700" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
        {isLogin && isAdmin && (
          <>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/adminDashboard"> DashBoard</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/adminOrders">Orders</Link>
            </li>
            <li className="hover:text-slate-800">
              {" "}
              <Link to="/adminAddBook"> Add book</Link>
            </li>
            <button className="hover:text-red-700 " onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
