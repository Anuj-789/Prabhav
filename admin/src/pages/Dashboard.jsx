import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState({
    articles: 0,
    categories: 0,
    views: 0,
    rating: 0
  });

  useEffect(() => {
    api.get("/admin/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4 grid grid-cols-2 gap-4">

      <div className="bg-white p-4 shadow rounded">
        Articles: {data.articles}
      </div>

      <div className="bg-white p-4 shadow rounded">
        Categories: {data.categories}
      </div>

      <div className="bg-white p-4 shadow rounded">
        Views: {data.views}
      </div>

      <div className="bg-white p-4 shadow rounded">
        Rating: {data.rating}
      </div>

    </div>
  );
}