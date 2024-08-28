import axios, { AxiosError, AxiosResponse } from "axios";
import { IUser, IUserCredentials } from "../interfaces/IUser";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const userService = {
  register: async (user: IUser): Promise<AxiosResponse | AxiosError> => {
    const data = user;
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/user`,
      headers: {},
      data: data,
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
  login: async (user: IUserCredentials): Promise<AxiosResponse | AxiosError> => {
    const data = user;
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/user/signin`,
      headers: {},
      data: data,
    };

    try {
      const response: AxiosResponse = await axios(config);
      if ("data" in response) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
      }
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error as AxiosError;
      }
      throw error as AxiosError;
    }
  },
};
