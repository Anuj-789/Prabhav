import api from "./axiosInstance";

export const getCategories = async () => {
  const res = await api.get("/category");
  return res.data;
};