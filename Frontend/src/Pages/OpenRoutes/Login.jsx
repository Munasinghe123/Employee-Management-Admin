import React from "react";
import LoginImage from "../../Images/login.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from 'jwt-decode';

function Login() {

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const [employeeId, setId] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {

    try {
      const response = await axios.post('http://localhost:7001/auth/login', {employeeId,password}, { withCredentials: true } );
      console.log(response.data.accessToken);
      login(response.data.accessToken);

      const decode=jwtDecode(response.data.accessToken)

      if(decode.role==='admin'){
        navigate('/dashboard');
      }

    } catch (error) {
        console.log(error);
    }

  }

  return (
    <div className="flex-1 flex w-full pt-28 px-10 md:px-20 lg:px-20 py-10  items-center justify-center bg-[#0b0f19]">

      {/* Glass Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-3xl w-full 
      backdrop-blur-xl bg-[#0f1520] border border-white/20 
      rounded-2xl shadow-2xl overflow-hidden">

        {/* Illustration */}
        <div className="hidden lg:flex items-center justify-center p-8">
          <img
            src={LoginImage}
            className="w-full max-w-xs object-contain"
          />
        </div>

        {/* Login Form */}
        <div className="flex flex-col justify-center p-8 md:p-12 xl:p-10 text-white">

          <h1 className="text-3xl font-semibold mb-6">
            Welcome Admin
          </h1>

          <label className="text-sm text-gray-300 mb-1">Employee ID</label>
          <input
            type="text"
            onChange={(e) => setId(e.target.value)}
            className="mb-4 px-4 py-2 rounded-lg bg-white/10 border border-white/20
            focus:outline-none focus:ring-1 focus:ring-purple-500"
          />

          <label className="text-sm text-gray-300 mb-1">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 px-4 py-2 rounded-lg bg-white/10 border border-white/20
            focus:outline-none focus:ring-1 focus:ring-purple-500"
          />

          <button
            className="py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700
            hover:scale-[1.03] transition-all shadow-lg cursor-pointer"
            onClick={() => loginUser(employeeId, password)}
          >
            Login
          </button>
        </div>
      </div>

    </div>
  );
}

export default Login;