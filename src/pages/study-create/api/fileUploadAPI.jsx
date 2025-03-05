import { api } from "../../../app/api";

export const fileUploadAPI = async (fileCategory, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(`files/${fileCategory}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
    return response.data.result.url;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
