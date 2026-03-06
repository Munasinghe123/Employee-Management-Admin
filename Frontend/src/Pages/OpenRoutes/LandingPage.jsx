import React from "react"
import { Link } from 'react-router-dom'
import laptop from '../../Images/laptop-bg.png'
import { useEffect } from "react"
import gsap from "gsap"



function LandingPage() {

  useEffect(() => {
  // only animate on desktop
  if (window.innerWidth >= 1024) {
    gsap.fromTo(
      ".laptop",
      { y: -30 },
      { y: 30, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" }
    )
  }
}, [])

  return (
    <section className="relative flex-1 flex items-center justify-center bg-[#0b0f19] text-white overflow-hidden">

      <div className="grid grid-cols-1 lg:grid-cols-2 z-20 items-center justify-center  px-8 lg:px-20">
     
        {/* LEFT SIDE */}
        <div className="relative space-y-6 max-w-xl mt-10">

          {/* Sine wave background */}
          <svg
            className="hidden lg:block absolute -bottom-50 -left-20 pointer-events-none w-full h-[1000px]"
            viewBox="0 0 700 900"
            preserveAspectRatio="xMinYMax meet"
            fill="none"
          >
            <defs>
              <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C5CFC" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#7C5CFC" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C5CFC" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#7C5CFC" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path d="M -10 900 L -10 480 C 40 480 60 320 120 280 C 180 240 200 400 260 380 C 320 360 340 180 420 200 C 500 220 520 380 600 360 L 700 340 L 700 900 Z"
              fill="url(#waveGrad2)" />
            <path d="M -10 900 L -10 520 C 50 520 70 360 130 320 C 190 280 210 440 270 420 C 330 400 350 220 430 240 C 510 260 520 420 600 400 L 700 380 L 700 900 Z"
              fill="url(#waveGrad1)" />
          </svg>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-500 uppercase tracking-[0.2em]">
              Administrative Control Platform
            </span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
          <div className="xl:mt-28 space-y-7">
            {/* <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05]">
              Admin Portal For<span className="text-purple-600"> Workforce Management</span>
            </h1> */}

             <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05]">
              <span className="text-purple-600">Admin Portal For</span><span className="text-white"> Workforce Management</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
              Track attendance, manage shifts, and monitor your employees in real time
              with a powerful admin dashboard designed for modern teams.
            </p>

          </div>


        </div>

        {/* RIGHT SIDE */}
        <div className="relative w-full h-full flex justify-center items-center">

          <div className="absolute -top-10 left-10 w-[500px] h-[500px] bg-purple-600 opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

          <img
            src={laptop}
            className="laptop relative w-full"
          />

        </div>
      </div>
    </section>
  )
}

export default LandingPage