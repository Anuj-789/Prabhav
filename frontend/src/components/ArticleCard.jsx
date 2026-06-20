function ArticleCard({ article, onClick }) {
  return (
    <div
      onClick={() => onClick(article)}
      className="flex gap-4 bg-white shadow-md hover:shadow-xl transition-all p-3 rounded-xl cursor-pointer"
    >
      {/* Left Image */}
      <img
        src={article.thumbnail}
        alt="img"
        className="w-24 h-24 object-cover rounded-lg"
      />

      {/* Right Content */}
      <div>
        <h2 className="text-lg font-semibold text-[#8B4513]">
          {article.title}
        </h2>

        <p className="text-sm text-gray-500">
          By {article.authorName}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          {article.views} views
        </p>
      </div>
    </div>
  );
}

export default ArticleCard;