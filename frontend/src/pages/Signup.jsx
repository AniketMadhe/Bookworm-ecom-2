import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(pin);
      const response = await axios.post(
        "https://bookworm-ecom.onrender.com/api/signup",
        {
          username,
          email,
          password,
          address,
          pin,
        }
      );
      alert("User Registered Successfully!");
      navigate("/login");
    } catch (e) {
      alert(`${e.response.data.message}`);
      console.log(e.response);
    }
  };

  return (
    <div className="w-full h-screen flex   justify-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[20%] h-[65%] mt-16 justify-center gap-[5px] items-center bg-slate-300 border border-slate-600"
      >
        <h1 className="font-bold mb-2">Signup</h1>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <label htmlFor="address">Address</label>
        <input
          className="w-[80%]"
          id="address"
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          required
        />
        <input
          className="w-[30%] mt-1"
          type="number"
          placeholder="pin"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
          }}
          required
        />
        <button
          className="mt-3 border text-white  bg-blue-900 hover:bg-blue-950 px-[8px] py-[1px] rounded-sm"
          type="submit"
        >
          Submit
        </button>
        <p className="text-[11px] mt-3">
          Already have an account ?{"  "}
          <span>
            <a className="text-blue-600 text-[12px]" href="/login">
              Login
            </a>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
