import { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
import CategoryCard from "./CategoryCard";

function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const data = await getCategories();

      // Demo ke liye loader thoda dikhe
      setTimeout(() => {
        setCategories(data);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    console.log("Selected Category:", category);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <h2 className="text-3xl font-bold text-[#8B4513] mb-6">
        Categories
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat._id}
              category={cat}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategorySection;