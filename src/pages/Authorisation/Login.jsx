import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import backimg from "../../assets/loginWall2.jpg";
import UserContex from '../../userContex/UserContex'

function Login() {
    const navigate = useNavigate()
   const{userData,setUserData} =  useContext(UserContex)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
        const response =  await axios.post("http://localhost:3020/user/login",{formData},{withCredentials:true})
        if(response.data.success){
       
            toast.success(response.data.message)
            setUserData(response.data.Data)
            if(response.data.Data.role==="Authuser"){
                navigate("/home");
            }else{
              navigate ("/userhome")
            }
            
        }
    } catch (error) {
        
        toast.error("an error in login")
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
          Welcome Back to Task App
        </h1>
      </div>
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg shadow-neutral-400 p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            Login
          </span>
          <form className="mb-4" onSubmit={handleSubmit}>
            <div className="mb-4 md:w-full">
              <label htmlFor="username" className="block text-xs mb-1">
                Username
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="text"
                name="username"
                id="username" 
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6 md:w-full">
              <label htmlFor="password" className="block text-xs mb-1">
                Password
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
            >
              Login
            </button>
          </form>
          <Link to="/signup" className="text-blue-700 text-center text-sm">
            No account?, signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
