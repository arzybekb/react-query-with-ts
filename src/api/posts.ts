import axiosInstance from "../config/axiosInstance";
import Posts from "../types/types";

const findAllPosts = async () => {
  const response = await axiosInstance.get<Posts[]>("/posts");
  return response.data;
};
const postsServices = {
  findAllPosts,
};
export default postsServices;
