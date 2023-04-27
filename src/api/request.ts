import axios, { AxiosError } from "axios";

import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import type { ErrorResponse } from "@/model/base";
import { MessagePlugin } from "tdesign-vue-next";
import { useAppStore } from "@/store";

export const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});
const tokenPrefix = "Bearer ";

instance.interceptors.request.use((request: AxiosRequestConfig) => {
  const appStore = useAppStore();
  if (appStore.token && request.headers) {
    request.headers["Authorization"] = tokenPrefix + appStore.token;
  }
  return request;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: AxiosError<ErrorResponse>) => {
    const responseData: ErrorResponse | ErrorResponse[] | undefined =
      error.response?.data;

    handleResponseData(responseData);

    if (error.response?.status === 401 || error.response?.status === 403) {
      const appStore = useAppStore();
      await appStore.logout();
    }
    return Promise.reject(error);
  }
);

const handleResponseData = (
  responseData: ErrorResponse | ErrorResponse[] | undefined
) => {
  if (!responseData) return;
  !(responseData instanceof Array) && (responseData = [responseData]);
  responseData.forEach((response) => MessagePlugin.error(response.message));
};

export default instance;
