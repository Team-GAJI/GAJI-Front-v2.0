import { api } from "../../../app/api";

export const communityPostsPreviewAPI = async (
  postType,
  category,
  sortType,
  filter,
  size,
) => {
  try {
    const response = await api.get(`community-posts/preivew`, {
      params: {
        postType: postType,
        category: category,
        sortType: sortType,
        filter: filter,
        size: size,
      },
    });
    console.log(response.data.result.postList);
    return response.data.result.postList;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
