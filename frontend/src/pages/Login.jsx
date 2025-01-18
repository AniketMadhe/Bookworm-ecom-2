import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      const response = await axios.get(
        "https://bookworm-ecom-app-1.onrender.com/api/logout",
        {
          withCredentials: true,
        }
      );
      alert("Logged out");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://bookworm-ecom-app-1.onrender.com/api/login",
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
    <div className="w-full h-screen  flex justify-center   items-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-1/6 h-3/6 justify-center bg-gray-300 items-center gap-[5px] border border-gray-500 "
      >
        <h1 className="font-semibold mb-4">Login</h1>
        <label htmlFor="username">Username</label>
        <input
          className="border  border-gray-400"
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <label htmlFor="password">password</label>
        <input
          className="border border-gray-400"
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <button className=" px-[8px] mt-[18px] bg-blue-900 hover:bg-blue-950  text-white rounded-sm">
          Submit
        </button>
        <p className="text-[11px] mt-4">
          Don't have an account ?{"  "}
          <span>
            <a className="text-blue-600 text-[12px]" href="/signup">
              Signup
            </a>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
