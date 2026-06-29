import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/categoryApi";
import { getArticles } from "../api/articleApi";
import InitialLoader from "../components/InitialLoader";

function Home() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ NEW STATE (FIRST TIME ONLY)
  const [firstLoad, setFirstLoad] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const visited = sessionStorage.getItem("visited");

    if (visited) {
      setFirstLoad(false);
    }

    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);

    try {
      const [catData, articleData] = await Promise.all([
        getCategories(),
        getArticles(),
      ]);

      setCategories(catData);
      setArticles(articleData);

      sessionStorage.setItem("visited", "true");
      setFirstLoad(false);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async (categoryId = "") => {
    setLoading(true);
    try {
      const data = await getArticles(categoryId);
      setArticles(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const resetHome = () => {
    setSelectedCategory(null);
    fetchArticles();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    fetchArticles(cat._id);
  };

  const handleArticleClick = (article) => {
    navigate(`/article/${article._id}`);
  };

  // ✅ ONLY FIRST TIME SPLASH LOADER
  if (firstLoad && loading) {
    return <InitialLoader />;
  }

  // ✅ NORMAL LOADER (your existing one)
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">

        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-blue-200"></div>
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-500 animate-spin"></div>
        </div>

        <h2 className="mt-6 text-2xl font-bold bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 bg-clip-text text-transparent">
          Prabhav
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          My Library
        </p>

        <div className="flex gap-1 mt-4">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
        </div>

      </div>
    );
  }

  return (
    <div className="pb-10">

      {/* CATEGORY BAR */}
      <div className="flex gap-3 overflow-x-auto py-4 px-3 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 border-b border-slate-300">

        <button
          onClick={resetHome}
          className={`
            px-4 py-2 rounded-full border
            transition-all duration-300
            whitespace-nowrap
            border-slate-400
            ${
              !selectedCategory
                ? "bg-slate-400 text-white shadow-lg"
                : "bg-white text-slate-700 hover:bg-slate-400 hover:text-white"
            }
          `}
        >
          All
        </button>

        {categories.map((cat, index) => (
          <div
            key={cat._id}
            className="category-animate"
            style={{
              animationDelay: `${index * 120}ms`,
            }}
          >
            <button
              onClick={() => handleCategoryClick(cat)}
              className={`
                px-4 py-2 rounded-full border
                transition-all duration-300
                whitespace-nowrap
                border-slate-400
                ${
                  selectedCategory?._id === cat._id
                    ? "bg-slate-400 text-white shadow-lg"
                    : "bg-white text-slate-700 hover:bg-slate-400 hover:text-white"
                }
              `}
            >
              {cat.name}
            </button>
          </div>
        ))}
      </div>

      {/* ARTICLES */}
      <div className="max-w-8xl mx-auto px-2 md:px-4 lg:px-6 mt-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">

          {articles.map((article) => (
            <div
              key={article._id}
              onClick={() => handleArticleClick(article)}
              className="flex bg-slate-100 border border-slate-200 rounded-xl shadow-sm p-3 md:p-4 ml-5 mr-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full"
            >

              <img
                src={article.thumbnail}
                className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg border border-slate-200 flex-shrink-0"
              />

              <div className="ml-7 flex flex-col justify-center flex-1">

                <h2 className="text-sm md:text-lg font-semibold text-slate-800 line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-xs md:text-sm text-slate-500 mt-1">
                  <span className="text-slate-700 font-medium">
                    {article.categoryId?.name}
                  </span>
                </p>

                <p className="text-xs md:text-sm text-slate-500 mt-2">
                  — <span className="text-slate-600 font-medium">
                    {article.authorName}
                  </span>
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  ⭐ <span className="text-slate-600">
                    {article.averageRating}
                  </span> / 5
                </p>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* EXPLORE */}
      <div className="text-center mt-10">
        <button
          onClick={resetHome}
          className="relative px-6 py-2 rounded-full font-medium bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white shadow-lg border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30 overflow-hidden"
        >
          <span className="relative z-10">Explore More</span>
        </button>
      </div>

    </div>
  );
}

export default Home;