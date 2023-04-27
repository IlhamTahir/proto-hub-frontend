import type { FileInitUploadRequest } from "@/model/file";
import request, { BASE_URL } from "@/api/request";

export const initUpload = (
  fileUploadInitRequest: FileInitUploadRequest
): Promise<{ fileId: string }> => {
  return request.post("/files/upload_init", fileUploadInitRequest);
};

export const upload = (id: string, file: File) => {
  return request.post(
    `/files/${id}`,
    { file },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const finishUpload = (id: string) => {
  return request.post(`/files/${id}/upload_finish`);
};

export const buildUploadUrl = (id = "") => {
  return BASE_URL + `/files/${id}`;
};
export default {
  initUpload,
  upload,
  finishUpload,
  buildUploadUrl,
};
