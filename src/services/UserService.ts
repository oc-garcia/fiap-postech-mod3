import axios from "axios";
import { IUser, IUserCredentials } from "../interfaces/IUser";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const userService = {
  register: async (user: IUser) => {
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
      return error;
    }
  },
  login: async (user: IUserCredentials) => {
    const data = user;
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseUrl}/user/signin`,
      headers: {},
      data: data,
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      return error;
    }
  },
};
