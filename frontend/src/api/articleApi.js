import api from "./axiosInstance";
import axios from "axios";
// Get articles (with optional category filter)
export const getArticles = (categoryId) => {
  return axios
    .get("http://localhost:5000/api/article", {
      params: categoryId ? { category: categoryId } : {},
    })
    .then(res => res.data);
};

export const getSingleArticle = async (id) => {
  const res = await api.get(`/article/${id}`);
  return res.data;
};