import { api } from "../../../app/api";

export const studyPostsPreviewAPI = async (category, filter, sort, page) => {
  try {
    const response = await api.get(`study-recruit-posts/preview`, {
      params: {
        category: category,
        filter: filter,
        sort: sort,
        page: page,
      },
    });
    console.log(response.data.result.previewList);
    return response.data.result.previewList;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
