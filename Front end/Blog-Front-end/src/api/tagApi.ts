import api from "./api";

export const getTags = async () => {
  const response = await api.get("/tags");

  return response.data;
};

export const getPostsByTag = async (
  tagId: number
) => {
  const response = await api.get(
    `/tags/${tagId}/posts`
  );

  return response.data;
};