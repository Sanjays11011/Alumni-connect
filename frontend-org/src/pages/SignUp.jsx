import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student"); // Default value for role


  const inputFields = [
    {
      type: "text",
      placeholder: "First Name",
      value: firstName,
      onChange: (e) => setFirstName(e.target.value)
    },
    {
      type: "text",
      placeholder: "Last Name",
      value: lastName,
      onChange: (e) => setLastName(e.target.value)
    },
    {
      type: "email",
      placeholder: "Email",
      value: email,
      onChange: (e) => setEmail(e.target.value)
    },
    {
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: (e) => setPassword(e.target.value)
    }
  ];

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:3001/signup", {
        firstName,
        lastName,
        email,
        password,
        role
      });
      alert(response.data.message);
      window.location.href = "/"; // Redirect to login page after successful signup
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Failed to sign up");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="font-manrope mb-2 text-center text-2xl">Welcome to Heritage Hub</h1>
      <div className="w-2/5 h-3/4 flex flex-col items-center rounded-lg shadow-2xl">
        <h1 className="text-3xl m-6 font-manrope">SignUp</h1>
        <form className="flex flex-col space-y-8" onSubmit={handleSubmit}>
          {/* Map through inputFields to render inputs dynamically */}
          <div className="flex flex-row space-x-4">
            {inputFields.slice(0, 2).map((field, index) => (
              <input
                key={index}
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                className="w-full p-2 rounded-lg text-lg font-manrope text-[#494E58] bg-input focus:outline-none"
              />
            ))}
          </div>
          {inputFields.slice(2).map((field, index) => (
            <input
              key={index}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              className="w-full p-2 rounded-lg text-lg font-manrope text-[#494E58] bg-input focus:outline-none"
            />
          ))}
          
          <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 rounded-lg text-lg font-manrope text-[#494E58] bg-input focus:outline-none">
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </select>
          <button
            className="bg-primary duration-300 hover:bg-purple-600 text-white font-manrope text-xl py-2 px-4 rounded-full w-full"
            type="submit"
          >
            Signup
          </button>
          <p className="signin">
            Already have an account? <Link to="/" className="text-blue-400 hover:text-blue-700 underline">Signin</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
