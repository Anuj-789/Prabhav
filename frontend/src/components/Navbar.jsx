import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const [count, setCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const updateFavs = () => {
    const favs = JSON.parse(localStorage.getItem("favs")) || [];
    setCount(favs.length);
  };

  useEffect(() => {
    updateFavs();
    window.addEventListener("favsUpdated", updateFavs);
    return () => window.removeEventListener("favsUpdated", updateFavs);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        sticky top-0 z-50
        bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900
        border-b border-white/10 shadow-xl
        transition-all duration-500
        ${scrolled ? "py-2" : "py-5"}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* LEFT EMPTY (balance) */}
        <div className="w-1/3"></div>

        {/* CENTER - LOGO + TEXT */}
        <div className="w-1/3 flex flex-col items-center">

          {/* LOGO */}
          <div className="relative animate-float3">

            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 blur-md opacity-50 animate-pulse"></div>

            <img
              src={logo}
              alt="logo"
              className={`
                relative z-10
                w-16 h-16 md:w-20 md:h-20
                rounded-full
                object-cover
                border-2 border-white/20
                shadow-lg
                transition-all duration-500
              `}
            />

          </div>

          {/* TEXT - hides on scroll smoothly */}
          <h1
            className={`
              mt-2 text-xl md:text-2xl font-extrabold text-white tracking-wider
              transition-all duration-500 ease-in-out
              ${scrolled ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"}
            `}
          >
            प्राभव
          </h1>

        </div>

        {/* RIGHT - HEART */}
        <div className="w-1/3 flex justify-end">

          <Link
            to="/favourites"
            className="
              relative
              flex items-center justify-center
              w-11 h-11
              rounded-full
              bg-white/10
              backdrop-blur-md
              border border-white/20
              hover:bg-white/20
              hover:scale-105
              transition-all duration-300
            "
          >
            <FaHeart className="text-red-400 text-xl animate-pulse" />

            {count > 0 && (
              <span className="
                absolute -top-1 -right-1
                min-w-[20px] h-[20px] px-1
                rounded-full
                bg-gradient-to-r from-pink-500 to-red-500
                text-white text-[10px] font-bold
                flex items-center justify-center
                shadow-lg
              ">
                {count}
              </span>
            )}

          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;