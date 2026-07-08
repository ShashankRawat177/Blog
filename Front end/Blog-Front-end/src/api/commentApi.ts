import api from "./api";

export const getComments = async (
  postId: string
) => {
  const response = await api.get(
    `/comments/post/${postId}`
  );

  return response.data;
};

export const createComment = async (
  postId: string,
  content: string
) => {
  const response = await api.post(
    `/comments/${postId}`,
    {
      content,
    }
  );

  return response.data;
};

export const updateComment = async (
  id: number,
  content: string
) => {
  const response = await api.patch(
    `/comments/${id}`,
    {
      content,
    }
  );

  return response.data;
};

export const deleteComment = async (
  id: number
) => {
  const response = await api.delete(
    `/comments/${id}`
  );

  return response.data;
};