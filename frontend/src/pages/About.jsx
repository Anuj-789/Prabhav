import { Link, useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 min-h-[80vh] flex flex-col">

      {/* MAIN CONTENT */}
      <div className="flex-1">

        <h1 className="text-3xl font-bold text-blue-900 mb-4 flex justify-center">
          Prabhav – Where Thoughts Live
        </h1>

        <p className="text-blue-900 leading-7 font-semibold">
          Prabhav is a digital platform that I created out of my personal interest. I really enjoy reading, writing, especially poems and stories.
        </p>

        <p className="mt-4 text-blue-900 leading-7 font-semibold">
          The main purpose of this platform is to keep all the things I love in one place — such as poems, stories, and thoughts — so I can easily access them anytime, and also allow others to read and explore them.
        </p>

        {/* BUTTON */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="
              mt-6
              px-6 py-2
              rounded-full

              bg-gradient-to-r
              from-slate-900
              via-blue-800
              to-slate-900

              text-white
              shadow-lg

              hover:scale-105
              transition-all duration-300

              cursor-pointer
            "
          >
            ⬆ Explore More
          </button>
        </div>

      </div>

      {/* FOOTER INSIDE PAGE */}
      <div className="mt-12 border-t border-slate-300 pt-5 text-center">

        

        <div className="flex justify-center gap-4 mt-3 text-sm">

          <Link to="/" className="text-blue-900 font-bold hover:text-blue-800 transition">
            Home
          </Link>

          <span className="text-slate-400">•</span>

          <Link to="/about" className="text-blue-900 font-bold hover:text-blue-800 transition">
            About
          </Link>

          <span className="text-slate-400">•</span>

          <Link to="/favourites" className="text-blue-900 font-bold hover:text-blue-800 transition">
            Favourites
          </Link>

        </div>
<p className="text-sm text-blue-800 font-medium my-2">
          @ {new Date().getFullYear()} Prabhav • Made by Anuj Gupta
        </p>
      </div>

    </div>
  );
}

export default About;
