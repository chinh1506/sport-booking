import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import queryString from "query-string";
import mem from "mem";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const URLS_TO_IGNORE: string[] = ["/auth/login", "/auth/register"];

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: {
        serialize: (params) => queryString.stringify(params),
    },
});

axiosClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        const tokensCookie = await getCookie("tokens");

        const tokens = tokensCookie ? JSON.parse(tokensCookie) : undefined;
        console.log(tokens);
        if (config.url && URLS_TO_IGNORE.includes(config.url)) {
            return config;
        }

        if (tokens?.accessToken) {
            config.headers.Authorization = `Bearer ${tokens?.accessToken}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);
axiosClient.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res && res.data) {
            return res.data.data;
        }
        return res;
    },
    async (error) => {
        const config = error.config;
        if ((error.response?.status === 401 || error.response.data?.statusCode === 401) && !config?.sent) {
            config.sent = true;
            const result = await memoizedRefreshToken();

            if (result?.accessToken) {
                config.headers.Authorization = `Bearer ${result?.accessToken}`;
            }

            return axiosClient(config);
        }
        return Promise.reject(error);
    }
);

const refreshTokenFn = async () => {
    const tokenString = await getCookie("tokens");
    const tokens = tokenString ? JSON.parse(tokenString) : undefined;
    if (!tokens) {
        const error = new Error("Refresh_token is missing");
        return Promise.reject(error);
    }

    try {
        const { data } = await axios.post(
            BASE_URL + "/auth/refresh-token",
            {
                clientId: "web-app",
                refreshToken: tokens.refreshToken,
            }
            // {
            //     headers: { Authorization: "Bearer " + tokens.refreshToken },
            // }
        );

        if (!(data.data && data.data.accessToken && data.data.refreshToken)) {
            deleteCookie("tokens");
            return Promise.reject(new Error("There are no JWT."));
        }

        tokens.accessToken = data?.data.accessToken;
        tokens.refreshToken = data?.data.refreshToken;

        setCookie("tokens", JSON.stringify(tokens));
        return data.data;
    } catch (error) {
        deleteCookie("tokens");
        return Promise.reject(error);
    }
};
const maxAge = 10000;
const memoizedRefreshToken = mem(refreshTokenFn, {
    maxAge,
});

export default axiosClient;
