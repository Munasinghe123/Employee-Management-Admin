import React, { useRef } from "react"
import Logo from "../Images/new-logo.png"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import gsap from "gsap"

function Header() {

  const sidebarRef = useRef(null)
  const overlayRef = useRef(null)

  const openNav = () => {
    gsap.to(sidebarRef.current, {
      x: 0,
      duration: 0.5,
      ease: "power3.out"
    })

    gsap.to(overlayRef.current, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.3
    })
  }

  const closeNav = () => {
    gsap.to(sidebarRef.current, {
      x: "-100%",
      duration: 0.5,
      ease: "power3.inOut"
    })

    gsap.to(overlayRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3
    })
  }

  return (
    <>
      {/* desktop header */}
      <header className="relative bg-[#0b0f19] z-50 w-full transition-all duration-300" >
        <div className="hidden h-16 px-10 py-10 lg:flex items-center justify-between ">
          <Link to="/">
            <div className="hidden lg:flex items-center md:pl-10 pl-5 pt-5 gap-3 group cursor-pointer">
              <img src={Logo} alt="Leco" className=" h-17 w-15 rounded-xl transition-transform duration-300 " />
            </div>
          </Link>

          <div className="space-x-5 flex">

            {/* Primary */}
            <Link
              to="/login"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 cursor-pointer
                rounded-full font-semibold text-white shadow-lg 
                hover:from-purple-600 hover:to-purple-800
                hover:shadow-purple-500/40
                hover:pr-6
                transition-all duration-300
                flex items-center overflow-hidden group"
            >
              Login
              <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">
                →
              </span>
            </Link>

            <Link
              to="/register"
              className="px-8 py-3 border border-white/50 text-white cursor-pointer
                         hover:pr-6 rounded-full font-semibold hover:bg-white/10
                        transition-all duration-300 overflow-hidden group flex items-center"
            >
              Register

              <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">
                →
              </span>
            </Link>

          </div>
        </div>
      </header>

      {/*moblie Header */}
      <header className="lg:hidden fixed top-0 left-0 w-full z-50">
        <div className="
          flex items-center justify-between
          h-20 px-6
          backdrop-blur-md 
          border-b border-white/10
        ">
          <div>
            {/* Hamburger */}
            <button onClick={openNav} className="text-purple-600">
              <Menu size={30} />
            </button>
          </div>

          <Link to="/">
            <div className=" flex items-center gap-3">
              <img src={Logo} className="h-17 w-15" />
            </div>
          </Link>
        </div>
      </header>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="
          fixed top-0 left-0 h-full w-72
          bg-[#0b0f19] text-white
          shadow-2xl
          transform -translate-x-full 
          z-50
          p-6
        "
      >
        <div className="text-center h-fit items-center justify-center">
          <div className="flex justify-end items-center mb-8 text-white">
            <button onClick={closeNav}>
              <X size={40} />
            </button>
          </div>

          <div className="space-y-5 px-5">
            {/* Primary */}
            <Link
              to="/login"
              className=" p-3  bg-gradient-to-r from-purple-600 to-purple-700 cursor-pointer
                rounded-xl font-semibold text-white shadow-lg 
                hover:from-purple-600 hover:to-purple-800
                hover:shadow-purple-500/40
                hover:pr-6
                transition-all duration-300
                flex items-center justify-center overflow-hidden group"
            >
              Login
              <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">
                →
              </span>
            </Link>

            <Link
              to="/register"
              className="p-3 bg-gradient-to-r from-purple-600 to-purple-700 cursor-pointer
                rounded-xl font-semibold text-white shadow-lg 
                hover:from-purple-600 hover:to-purple-800
                hover:shadow-purple-500/40
                hover:pr-6
                transition-all duration-300
                flex items-center justify-center overflow-hidden group"
            >
              Register

              <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">
                →
              </span>
            </Link>
          </div>



        </div>

      </div>
    </>
  )
}

export default Header