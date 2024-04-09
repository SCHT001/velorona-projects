import axios, { AxiosResponse } from "axios";
import { setCookie } from "cookies-next";

export const client = axios.create({
	baseURL: "https://cms-3v4y.onrender.com/api/",
});

client.interceptors.response.use((res: AxiosResponse) => {
	setCookie("test", "test", {
		httpOnly: true,
	});
	return res;
});
