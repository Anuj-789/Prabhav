import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleArticle } from "../api/articleApi";
import { toPng } from "html-to-image";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

import FavouriteButton from "../components/FavouriteButton";
import Rating from "../components/Rating";
import ShareButtons from "../components/ShareButtons";
import ProgressBar from "../components/ProgressBar";

function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const data = await getSingleArticle(id);
      setArticle(data);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    const element = document.getElementById("article-content");
    if (!element) return;

    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (pdfWidth * element.offsetHeight) / element.offsetWidth;

    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("article.pdf");
  };

 if (loading) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      
      {/* Premium Spinner */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-blue-200"></div>

        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-500 animate-spin"></div>
      </div>

      {/* Brand Name */}
      <h2 className="mt-6 text-2xl font-bold bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 bg-clip-text text-transparent">
        Prabhav
      </h2>

      {/* Loading Text */}
      <p className="mt-2 text-sm text-slate-500 tracking-wide">
      Showing ...
      </p>

      {/* Animated Dots */}
      <div className="flex gap-1 mt-4">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
        <span
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>
        <span
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>
    </div>
  );
}
  if (!article) {
    return (
      <div className="p-10 text-center text-red-500">
        Article not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 relative">

      {/* TOP BACK BUTTON (NAV STYLE) */}
      <button
        onClick={() => navigate(-1)}
        className="
          fixed top-10 left-2
          px-4 py-2 
          rounded-full
          bg-slate-900 text-white
          shadow-lg
          hover:scale-105
          transition-all duration-300
          hover:cursor-pointer
          z-50
        "
      >
        ⬅ Back
      </button>

      <ProgressBar />

      {/* ARTICLE */}
      <div
        id="article-content"
        className="
          bg-white
          border border-slate-200
          rounded-2xl
          shadow-sm
          p-5 md:p-8
          text-slate-800
          
        "
      >

        {/* TOP SECTION (IMAGE + INFO) */}
        <div className="flex flex-row md:flex-row gap-5 ">

          {/* IMAGE LEFT */}
          {article.thumbnail && (
            <img
              src={article.thumbnail}
              className="
                w-1/2 md:w-1/3
                h-48 md:h-64
                object-cover
                rounded-2xl
                border border-slate-200
               
              "
            />
          )}

          {/* RIGHT CONTENT */}
          <div className="flex-1 flex flex-col justify-center">

            <h1 className="
              text-xl md:text-2xl
              font-bold
              text-slate-900
            ">
              {article.title}
            </h1>

            <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">

              <span>
                By{" "}
                <span className="font-medium text-slate-700">
                  {article.authorName}
                </span>
              </span>

              <span>⭐ {article.averageRating}/5</span>

            </div>

          </div>

        </div>

        <hr className="my-6 border-slate-200" />

        {/* CONTENT */}
        <div className="
          text-base md:text-lg
          leading-8
          text-slate-700
          whitespace-pre-line
          bg-slate-100
          p-3
        ">
          {article.content}
        </div>

        <hr className="my-6 border-slate-200" />

        <div className="text-center text-slate-400 text-sm">
          — Thanks for Reading ❤️  —
        </div>

      </div>

      {/* ACTIONS FOOTER */}
      <div className="
        mt-6
        bg-slate-100
        border border-slate-200
        rounded-2xl
        p-4

        flex flex-wrap
        gap-3
        justify-center
      ">

        <FavouriteButton article={article} />
        <Rating articleId={article._id} />
        <ShareButtons article={article} />

        <button
          onClick={downloadPDF}
          className="
            px-5 py-2
            rounded-full

            bg-gradient-to-r
            from-slate-900
            via-blue-800
            to-slate-900

            text-white

            hover:scale-105
            transition-all duration-300

            shadow-md
          "
        >
          ⬇ Download PDF
        </button>

      </div>
      
<div className="mt-12 border-t border-slate-300 pt-5 text-center">

          <p className="text-sm text-blue-800 font-medium my-2">
          @ {new Date().getFullYear()} Prabhav • Made by Anuj Gupta
        </p>


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
       
      
      </div>

    </div>
    
  );
}

export default ArticlePage;