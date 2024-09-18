import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [message,setMessage] = useState("");
  const [data,setData] = useState({
    email: "",
    password: ""
  });
  

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:3001/api/auth",data);
      localStorage.setItem("token", response.data.token);
      window.location = "/home";
    } catch (error) {
      setMessage("Login failed");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/3 h-1/2 flex flex-col justify-center rounded-lg shadow-2xl p-4">
        <div className="w-full h-12 flex justify-center mb-5 ">
          <h1 className="text-3xl font-manrope">Login to your account</h1>
        </div>
        <form
          className="flex flex-col justify-center items-center w-full h-full space-y-5"
          onSubmit={handleLogin}
        >
          <div className="w-full">
            <input
              type="email"
              value = {data.email}
              onChange={handleChange}
              id="email"
              name="email"
              className="w-full p-2 rounded-lg text-lg font-manrope text-[#494E58] bg-input focus:outline-none"
              required
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              value={data.password}
              onChange={handleChange}
              id="password"
              name="password"
              className="w-full p-2 rounded-lg text-lg font-manrope text-[#494E58] bg-input focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary duration-300 hover:bg-purple-600 text-white font-manrope text-xl py-2 px-4 rounded-full w-full"
          >
            Login
          </button>
          {message && <p className="text-red-500 font-manrope">{message}</p>}
          <p className=" text-center ">
            No account? <Link to="/signup" className="text-blue-400 hover:text-blue-700 underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
