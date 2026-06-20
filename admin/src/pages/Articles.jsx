import { useEffect, useState } from "react";
import api from "../services/api";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const [categories, setCategories] = useState([]);

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= GET DATA =================
  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await api.get("/article");
      setArticles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  // ================= RESET FORM =================
  const resetForm = () => {
    setTitle("");
    setAuthorName("");
    setCategoryId("");
    setContent("");
    setThumbnail(null);
    setEditId(null);
  };

  // ================= ADD / UPDATE =================
  const saveArticle = async () => {
    if (!title || !authorName || !categoryId || !content)
      return alert("Fill all fields");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("authorName", authorName);
      formData.append("categoryId", categoryId);
      formData.append("content", content);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      if (editId) {
        await api.put(`/article/${editId}`, formData);
      } else {
        await api.post("/article", formData);
      }

      resetForm();
      fetchArticles();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const deleteArticle = async (id) => {
    try {
      await api.delete(`/article/${id}`);
      fetchArticles();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ================= EDIT =================
  const startEdit = (art) => {
    setEditId(art._id);
    setTitle(art.title);
    setAuthorName(art.authorName);
    setCategoryId(art.categoryId?._id || "");
    setContent(art.content);
  };

  return (
    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4">Articles</h1>

      {/* ================= FORM ================= */}
      <div className="bg-white p-4 shadow rounded mb-6">

        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Author Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-2"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          className="border p-2 w-full mb-2"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />

        <button
          onClick={saveArticle}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Saving..." : editId ? "Update Article" : "Add Article"}
        </button>

      </div>

      {/* ================= LIST ================= */}
      <div className="bg-white shadow rounded">

        {articles.length === 0 ? (
          <p className="p-4">No articles found</p>
        ) : (
          articles.map((art) => (
            <div
              key={art._id}
              className="p-3 border-b flex justify-between items-center"
            >

              <div className="flex items-center gap-3">

                {/* IMAGE */}
                {art.thumbnail && (
                  <img
                    src={art.thumbnail}
                    alt="thumb"
                    className="w-16 h-16 object-cover rounded"
                  />
                )}

                <div>
                  <p className="text-sm">
          <span className="font-semibold">Title:</span> {art.title}
        </p>

        <p className="text-sm text-gray-600">
          <span className="font-semibold">Author:</span> {art.authorName}
        </p>
                 
                  <p className="text-xs text-gray-400">
                    👁 {art.views} | ⭐ {art.averageRating}
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => startEdit(art)}
                  className="text-blue-500 mr-3"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteArticle(art._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}