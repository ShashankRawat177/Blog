export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string | null;

  likeCount: number;
  commentCount: number;

  createdAt: string;
  updatedAt: string;

  author: {
    id: number;
    name: string;
    email: string;
    role: string;
  };

  tags: {
    id: number;
    name: string;
  }[];
}