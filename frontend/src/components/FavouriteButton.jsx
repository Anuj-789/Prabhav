import { useState, useEffect } from "react";

function FavouriteButton({ article }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favs")) || [];
    const exists = saved.find((a) => a._id === article._id);
    if (exists) setFav(true);
  }, []);
const toggleFavourite = () => {
  let saved = JSON.parse(localStorage.getItem("favs")) || [];

  if (fav) {
    saved = saved.filter((a) => a._id !== article._id);
    setFav(false);
  } else {
    saved.push(article);
    setFav(true);
  }

  localStorage.setItem("favs", JSON.stringify(saved));

  // 🔥 THIS IS THE MAGIC LINE
  window.dispatchEvent(new Event("favsUpdated"));
};
  return (
    <button
      onClick={toggleFavourite}
      className={`px-4 py-2 rounded ${
        fav ? "bg-red-500 text-white" : "bg-gray-200"
      }`}
    >
      ❤️ {fav ? "Saved" : "Favourite"}
    </button>
  );
}

export default FavouriteButton;