import api from "./api";

export const getPosts = async (
  page = 1,
  limit = 6
) => {
  const response = await api.get(
    `/posts?page=${page}&limit=${limit}`
  );

  return response.data;
};

export const searchPosts = async (
  query: string,
  page = 1,
  limit = 6
) => {
  const response = await api.get(
    `/posts/search?q=${query}&page=${page}&limit=${limit}`
  );

  return response.data;
};

export const getPost = async (id: string) => {
  const response = await api.get(`/posts/${id}`);

  return response.data;
};

export const updatePost = async (
  id: string,
  title: string,
  content: string
) => {
  const response = await api.patch(`/posts/${id}`, {
    title,
    content,
  });

  return response.data;
};

export const deletePost = async (id: string) => {
  const response = await api.delete(`/posts/${id}`);

  return response.data;
};

export const getMyPosts = async () => {
  const response = await api.get("/posts/my-posts");

  return response.data;
};
