import React from "react";
import LoginImage from "../../Images/login.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate()

    return (
        <div className="flex-1 pt-28  py-20 px-10 lg:px-20 w-full flex items-center justify-center bg-[#0b0f19]">

            {/* Glass Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-4xl w-full 
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
                <div className="flex flex-col justify-center p-6 lg:p-14 xl:p-10 text-white">

                    <h1 className="text-2xl xl:text-3xl text-center font-semibold mb-6">
                        Create Admin Account
                    </h1>

                    <label className="text-sm text-gray-300 mb-1">Name</label>
                    <input
                        type="text"
                        className="mb-4 px-4 py-2 rounded-lg bg-white/10 border border-white/20
            focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />


                    <label className="text-sm text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        className="mb-4 px-4 py-2 rounded-lg bg-white/10 border border-white/20
            focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />


                    <label className="text-sm text-gray-300 mb-1">Employee Number</label>
                    <input
                        type="text"
                        className="mb-4 px-4 py-2 rounded-lg bg-white/10 border border-white/20
            focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />


                    <label className="text-sm text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        className="mb-6 px-4 py-2 rounded-lg bg-white/10 border border-white/20
            focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                      <label className="text-sm text-gray-300 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        className="mb-6 px-4 py-2 rounded-lg bg-white/10 border border-white/20
            focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />

                    <button
                        className="py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700
            hover:scale-[1.03] transition-all shadow-lg cursor-pointer"
           onClick={() => navigate("/login")}
                    >
                        Register
                    </button>

                    <p className="mt-4 text-sm text-gray-300">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-purple-400 hover:text-purple-300"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </div>
            {/* Footer */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-between px-12 border-t border-white/5">
                <span className="text-xs text-gray-600">© 2026 Lanka Electricity Company</span>
                <span className="text-xs text-gray-600"> Authorized Personnel Only</span>
            </div> */}

        </div>
    );
}

export default Register;