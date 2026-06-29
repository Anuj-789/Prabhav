import api from "./axiosInstance";

// Get articles (with optional category filter)
export const getArticles = (categoryId) => {
  return api
    .get("/article", {
      params: categoryId ? { category: categoryId } : {},
    })
    .then((res) => res.data);
};

// Get single article
export const getSingleArticle = async (id) => {
  const res = await api.get(`/article/${id}`);
  return res.data;
};