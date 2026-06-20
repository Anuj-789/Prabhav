import { useState } from "react";
import api from "../api/axiosInstance";

function Rating({ articleId }) {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const submitRating = async (value) => {
    try {
      if (value < 1 || value > 5) return;

      setRating(value);
      setLoading(true);

      await api.post(`/article/${articleId}/rate`, {
        rating: Number(value), // ✅ FORCE NUMBER
      });

    } catch (err) {
      console.log(
        "Rating Error:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => submitRating(star)}
          className="cursor-pointer text-2xl"
        >
          {star <= rating ? "⭐" : "☆"}
        </span>
      ))}

      {loading && (
        <span className="text-xs ml-2">Saving...</span>
      )}
    </div>
  );
}

export default Rating;