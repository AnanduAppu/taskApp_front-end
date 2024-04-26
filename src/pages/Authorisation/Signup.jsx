import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import backimg from "../../assets/SignupWal.jpg";

function Signup() {
  const navigate = useNavigate();
  const [roleChecked, setRoleChecked] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = () => {
    setRoleChecked(!roleChecked);
    setFormData({
      ...formData,
      role: roleChecked ? "user" : "Authuser",
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.username) {
      newErrors.username = true;
    }
    if (!formData.password) {
      newErrors.password = true;
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = true;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
      alert("confirm password is wrong");
    }

    setErrors(newErrors);
try {
    if (Object.keys(newErrors).length === 0) {
      
        const response =  await axios.post("http://localhost:3020/user/signup",{formData})
        if(response.data.success){
            toast.success(response.data.message)
            navigate("/");
        }
        
      }
} catch (error) {
    toast.error("some error occured in sign up")
   
}

  };

  return (
    <div
      style={{
        backgroundImage: `url(${backimg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-10">
        <h1 className="text-center py-16 text-3xl font-semibold">
          <span
            className="text-yellow-600 font-bold "
            style={{ textShadow: "4px 4px 4px rgba(0, 0, 0, 0.3)" }}
          >
            {" "}
            Welcome
          </span>{" "}
          to Task App
        </h1>
      </div>
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg shadow-neutral-400 p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            Sign Up
          </span>
          <form className="mb-4" onSubmit={handleSubmit}>
            <div
              className={`mb-4 md:w-full ${
                errors.email ? "border-red-500" : ""
              }`}
            >
              <label htmlFor="email" className="block text-xs mb-1">
                Username{" "}
              </label>
              <input
                className={`w-full border rounded p-2 outline-none focus:shadow-outline ${
                  errors.email ? "border-red-500" : ""
                }`}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div
              className={`mb-6 md:w-full ${
                errors.password ? "border-red-500" : ""
              }`}
            >
              <label htmlFor="password" className="block text-xs mb-1">
                Password
              </label>
              <input
                className={`w-full border rounded p-2 outline-none focus:shadow-outline ${
                  errors.password ? "border-red-500" : ""
                }`}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div
              className={`mb-6 md:w-full ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            >
              <label htmlFor="confirmPassword" className="block text-xs mb-1">
                Confirm Password
              </label>
              <input
                className={`w-full border rounded p-2 outline-none focus:shadow-outline ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label className="inline-flex items-center me-5 mt-3 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={roleChecked}
                onChange={handleRoleChange}
                  
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-100 dark:peer-focus:ring-orange-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-400"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Autharised user
                </span>
              </label>
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
              Sign Up
            </button>
          </form>
          <Link to="/login" className="text-blue-700 text-center text-sm">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
