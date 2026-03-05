import React from "react"
import {Link} from 'react-router-dom'
import laptop from '../../Images/laptop-bg.png'
import { useEffect } from "react"
import gsap from "gsap"



function LandingPage() {

  useEffect(() => {
    gsap.to(".laptop", {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })
  }, [])

  return (
    <section className="relative min-h-screen bg-[#0b0f19] text-white overflow-hidden">
<div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-500 opacity-20 blur-[200px] pointer-events-none"></div>

<div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-purple-500 opacity-20 blur-[200px] pointer-events-none"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 z-20 items-center min-h-screen px-8 lg:px-20">

        {/* LEFT SIDE */}
        <div className="space-y-10 max-w-xl">

          <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05]">
            Streamline Your <span className="text-purple-600">Workforce</span> Management
          </h1>

          <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
            Track attendance, manage shifts, and monitor your employees in real time
            with a powerful admin dashboard designed for modern teams.
          </p>

          <div className="space-x-5">

            {/* Primary */}
            <Link
              to="/login"
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 cursor-pointer
                rounded-lg font-semibold text-white shadow-lg 
                hover:from-purple-600 hover:to-purple-800
                hover:shadow-purple-500/40
                transition-all duration-300"
            >
              Login
            </Link>

            {/* Secondary */}
            <Link
              to="/register"
              className="px-8 py-3 border border-white text-white cursor-pointer
              rounded-lg font-semibold hover:bg-white/10
              transition-all duration-300"
            >
              Register
            </Link>

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="relative flex justify-center items-center">

          {/* glow behind laptop */}
          <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-[180px]"></div>

          <img
            src={laptop}
            className="laptop relative max-w-[800px]  w-full"
          />

        </div>

      </div>

    </section>
  )
}

export default LandingPage