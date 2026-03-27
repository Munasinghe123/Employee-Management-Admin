import React from "react";
import LoginImage from "../../Images/login.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'


function Register() {

    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitForm = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:7000/auth/register",
                { name, password, email, employeeId, role:"admin" }
            )

            console.log("register response", response.data);

            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div className="flex-1 pt-16  py-20 px-10 lg:px-20 w-full flex items-center justify-center bg-[#0b0f19]">

            {/* Glass Card */}
            <form
                onSubmit={submitForm}
                className="grid grid-cols-1 lg:grid-cols-2 max-w-3xl w-full 
      backdrop-blur-xl bg-[#0f1520] border border-white/20 
      rounded-2xl shadow-2xl overflow-hidden ">

                {/* image */}
                <div className="hidden lg:flex items-center justify-center p-8">
                    <img
                        src={LoginImage}
                        className="w-full max-w-xs object-contain"
                    />
                </div>

                {/* Register Form */}
                <div

                    className="flex flex-col justify-center p-6 lg:p-14 xl:p-10 text-white">

                    <h1 className="text-2xl xl:text-3xl  items-start font-semibold mb-6 w-full">
                        Create Account
                    </h1>

                    <label className="text-sm text-gray-300 mb-1">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="mb-4 px-4 py-2 rounded-lg bg-white/10 border border-white/20
            focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />


                    <label className="text-sm text-gray-300 mb-1">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="mb-4 px-4 py-2 rounded-lg bg-white/10 border border-white/20
            focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />


                    <label className="text-sm text-gray-300 mb-1">Employee ID</label>
                    <input
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        type="text"
                        className="mb-4 px-4 py-2 rounded-lg bg-white/10 border border-white/20
            focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />


                    <label className="text-sm text-gray-300 mb-1">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="mb-6 px-4 py-2 rounded-lg bg-white/10 border border-white/20
            focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <label className="text-sm text-gray-300 mb-1">Confirm Password</label>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        className="mb-6 px-4 py-2 rounded-lg bg-white/10 border border-white/20
            focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />

                    <button
                        className="py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700
            hover:scale-[1.03] transition-all shadow-lg cursor-pointer"
                        type="submit"
                    >
                        Register
                    </button>

                </div>
            </form>

        </div>
    );
}

export default Register;