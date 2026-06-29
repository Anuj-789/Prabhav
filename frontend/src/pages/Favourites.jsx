import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Favourites() {
  const [favs, setFavs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favs")) || [];
    setFavs(data);
  }, []);

  const removeFavourite = (id) => {
    const updated = favs.filter((item) => item._id !== id);
    setFavs(updated);
    localStorage.setItem("favs", JSON.stringify(updated));

    window.dispatchEvent(new Event("favsUpdated"));
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-[80vh] flex flex-col">

      {/* HEADER */}
      <div className="text-center mb-8">

        <h1
          className="
            text-3xl md:text-4xl
            font-bold
            bg-gradient-to-r
            from-slate-900
            via-blue-800
            to-slate-900
            bg-clip-text
            text-transparent
          "
        >
       Favourites ❤️
        </h1>

        <p className="text-slate-500 mt-2">
      
        Save articles to read them later.
        </p>

      </div>

      {/* CONTENT */}
      <div className="flex-1">

        {favs.length === 0 ? (
          <div className="text-center mt-20">

            <h2 className="text-2xl font-bold text-slate-500">
              No Favourites Yet 
            </h2>

         

            <button
              onClick={goBack}
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
              ⬅ Go Back
            </button>

          </div>
        ) : (
          <div className="space-y-5">

            {favs.map((item) => (
              <div
                key={item._id}
                className="
                  flex gap-4

                  bg-slate-100
                  border border-slate-200

                  rounded-2xl
                  p-4

                  shadow-sm
                  hover:shadow-lg
                  hover:-translate-y-1

                  transition-all duration-300
                "
              >

                {/* IMAGE */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="
                    w-24 h-24 md:w-28 md:h-28
                    object-cover
                    rounded-xl
                    border border-slate-200
                    flex-shrink-0
                  "
                />

                {/* CONTENT */}
                <div className="flex-1 flex flex-col justify-center">

                  <h2
                    className="
                      text-lg md:text-xl
                      font-semibold
                      text-slate-800
                      line-clamp-2
                    "
                  >
                    {item.title}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    —{" "}
                    <span className="font-medium text-slate-700">
                      {item.authorName}
                    </span>
                  </p>

                  <div className="flex gap-2 mt-4 flex-wrap">

                    <button
                      onClick={() => navigate(`/article/${item._id}`)}
                      className="
                        px-4 py-1.5
                        rounded-full

                        bg-gradient-to-r
                        from-slate-900
                        via-blue-800
                        to-slate-900

                        text-white

                        hover:scale-105
                        transition-all duration-300

                        cursor-pointer
                      "
                    >
                      📖 Read
                    </button>

                    <button
                      onClick={() => removeFavourite(item._id)}
                      className="
                        px-4 py-1.5
                        rounded-full

                        bg-gradient-to-r
                        from-red-500
                        to-red-600

                        text-white

                        hover:scale-105
                        transition-all duration-300

                        cursor-pointer
                      "
                    >
                      🗑 Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* FOOTER */}
      <div className="mt-12 border-t border-slate-300 pt-3 text-center">

          

        <div className="flex justify-center gap-4 mt-3 text-sm">

          <Link
            to="/"
            className="text-blue-900 font-bold hover:text-blue-800 transition"
          >
            Home
          </Link>

          <span className="text-slate-400">•</span>

          <Link
            to="/about"
            className="text-blue-900 font-bold hover:text-blue-800 transition"
          >
            About
          </Link>

          <span className="text-slate-400">•</span>

          <Link
            to="/favourites"
            className="text-blue-900 font-bold hover:text-blue-800 transition"
          >
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

export default Favourites;
