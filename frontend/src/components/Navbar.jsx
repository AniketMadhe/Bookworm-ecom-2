import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { LoginContext } from "../App";

function Navbar() {
  const { isLogin, setIsLogin, isAdmin, setIsAdmin } = useContext(LoginContext);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/api/logout", {
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
    <div className="w-full h-20 bg-gradient-to-b from-blue-950  to-blue-100 bg-green-400 flex items-center justify-between ">
      <div className="w-20 h-20 ml-6 rounded-full overflow-hidden">
        <img
          className="w-full h-full"
          src="https://img.pikbest.com/png-images/book-logo-vector-graphic-element_1792850.png!f305cw"
          alt=""
        />
      </div>
      <div>
        <h1 className=" ml-40 font-extrabold text-3xl text-slate-950">
          BookWorm
        </h1>
      </div>
      <ul className="flex justify-center  items-center gap-6 mr-6 flex-wrap ">
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
            <button onClick={handleLogout}>Logout</button>
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

            <button className="hover:text-slate-800" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
