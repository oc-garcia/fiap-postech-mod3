import axios, { AxiosError, AxiosResponse } from "axios";
import { IPost } from "../interfaces/IPost";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const PostsService = {
  getAll: async (): Promise<AxiosResponse<IPost[]>> => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/post/all`,
      headers: {},
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response as AxiosResponse<IPost[]>;
      }
      throw error;
    }
  },
  getById: async (id: number): Promise<AxiosResponse<IPost> | AxiosError> => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/post/${id}`,
      headers: {},
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError;
      }
      throw error as AxiosError;
    }
  },
  getByKeyword: async (keyword: string): Promise<AxiosResponse<IPost[]> | AxiosError> => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseUrl}/post/wordkey/${keyword}`,
      headers: {},
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError;
      }
      throw error as AxiosError;
    }
  },
  create: async (
    post: Omit<IPost, "id" | "creation_date" | "update_date">,
    token: string
  ): Promise<AxiosResponse<IPost> | AxiosError> => {
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/post`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: post,
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError;
      }
      throw error as AxiosError;
    }
  },
  put: async (
    id: number,
    post: Partial<Omit<IPost, "id" | "creation_date" | "update_date">>,
    token: string
  ): Promise<AxiosResponse<IPost> | AxiosError> => {
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${baseUrl}/post/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: post,
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError;
      }
      throw error as AxiosError;
    }
  },
  delete: async (id: number, token: string): Promise<AxiosResponse<void> | AxiosError> => {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${baseUrl}/post/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError;
      }
      throw error as AxiosError;
    }
  },
};
