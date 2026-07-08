import api from "./api";

export const likePost = async (
  postId: number
) => {
  const response = await api.post(
    `/likes/${postId}`
  );

  return response.data;
};

export const unlikePost = async (
  postId: number
) => {
  const response = await api.delete(
    `/likes/${postId}`
  );

  return response.data;
};

export const checkLike = async (
  postId: number
) => {
  const response = await api.get(
    `/likes/check/${postId}`
  );

  return response.data;
};