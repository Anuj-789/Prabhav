function CategoryCard({ category, onClick }) {
  return (
    <div
      onClick={() => onClick(category)}
      className="cursor-pointer bg-white shadow-md hover:shadow-xl transition-all p-4 rounded-xl border hover:border-[#8B4513]"
    >
      <h2 className="text-lg font-semibold text-[#8B4513] ">
        {category.name}
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Explore {category.name}
      </p>
    </div>
  );
}

export default CategoryCard;