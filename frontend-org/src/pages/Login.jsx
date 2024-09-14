import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      setMessage("Login failed");
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              className="w-full p-2 rounded-lg text-lg font-manrope text-[#494E58] bg-input focus:outline-none"
              required
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
