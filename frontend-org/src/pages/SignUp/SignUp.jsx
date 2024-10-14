import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const apiUrl = import.meta.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [data,setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "Student"
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const inputFields = [
    {
      type: "text",
      placeholder: "First Name",
      name: "firstname",
      value: data.firstname,
      onChange: handleChange
    },
    {
      type: "text",
      placeholder: "Last Name",
      name: "lastname",
      value: data.lastname,
      onChange: handleChange
    },
    {
      type: "email",
      placeholder: "Email",
      name: "email",
      value: data.email,
      onChange: handleChange
    },
    {
      type: "password",
      placeholder: "Password",
      name: "password",
      value: data.password,
      onChange: handleChange
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/auth/signup`, data);
      alert(response.data.message);
      navigate("/");
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
                name={field.name}
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
              name = {field.name}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              className="w-full p-2 rounded-lg text-lg font-manrope text-[#494E58] bg-input focus:outline-none"
            />
          ))}
          
          <select name="role" id="role" value={data.role} onChange={handleChange} className="w-full p-2 rounded-lg text-lg font-manrope text-[#494E58] bg-input focus:outline-none">
            <option value="Student">Student</option>
            <option value="Alumni">Alumni</option>
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
