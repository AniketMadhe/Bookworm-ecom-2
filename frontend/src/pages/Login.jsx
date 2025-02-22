import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../config/config_Url";
import { LoginContext } from "../App";

function Login() {
  const { isLogin, setIsLogin, isAdmin, setIsAdmin } = useContext(LoginContext);
  const [showAlert, setShowAlert] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${BACKEND_URL}/api/logout`, {
        withCredentials: true,
      });
      alert("Logged out");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/login`,
        { username, password },
        { withCredentials: true }
      );

      if (response) setIsLogin(true);
      if (response && response.data.role === "admin") {
        setIsAdmin(true);
        navigate("/adminDashboard");
      } else {
        navigate("/");
      }
    } catch (e) {
      alert("Wrong usename or password");
      console.log(e);
    }
  };
  return (
    <div className="w-screen h-screen  flex justify-center md:mt-[-40px]  items-center mt-[-15%] ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[80%] h-[60%] md:w-1/5 md:h-3/6 justify-center  bg-gray-300 items-center gap-[10px] md:gap-[5px] border border-gray-500 "
      >
        <h1 className="sm:font-semibold font-bold text-2xl md:text-xl mb-4">
          Login
        </h1>
        <label htmlFor="username" className="text-xl md:text-base">
          Username
        </label>
        <input
          className="border w-[90%]  text-xl md:text-base  border-gray-400"
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <label htmlFor="password" className="text-xl md:text-base">
          password
        </label>
        <input
          className="border w-[90%] text-xl md:text-base border-gray-400"
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <button className=" md:px-[8px] md:mt-[18px] px-[13px] text-[20px] md:text-[16px] mt-[25px] bg-blue-900 hover:bg-blue-950  text-white rounded-sm">
          Submit
        </button>
        <p className="text-[13px] md:text-[11px] mt-4">
          Don't have an account ?{"  "}
          <span>
            <a
              className="text-blue-600 text-[15px] md:text-[12px] "
              href="/signup"
            >
              Signup
            </a>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
