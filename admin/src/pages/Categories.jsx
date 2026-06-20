import { useEffect, useState } from "react";
import api from "../services/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  // GET ALL CATEGORIES
  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ADD CATEGORY
  const addCategory = async () => {
    if (!name || !slug) return alert("Fill all fields");

    try {
      await api.post("/category", { name, slug });
      setName("");
      setSlug("");
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  // DELETE CATEGORY
  const deleteCategory = async (id) => {
    try {
      await api.delete(`/category/${id}`);
      fetchCategories();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-4">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {/* ADD FORM */}
      <div className="bg-white p-4 shadow rounded mb-6">

        <input
          className="border p-2 w-full mb-2"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Slug (kavita, news)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <button
          onClick={addCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>

      </div>

      {/* LIST */}
      <div className="bg-white shadow rounded">

        {categories.length === 0 ? (
          <p className="p-4">No categories found</p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="flex justify-between items-center p-3 border-b"
            >

              <div>
                <h2 className="font-semibold">{cat.name}</h2>
                <p className="text-sm text-gray-500">{cat.slug}</p>
              </div>

              <button
                onClick={() => deleteCategory(cat._id)}
                className="text-red-500"
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}