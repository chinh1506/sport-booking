import axios from "axios";
import queryString from "query-string";
import mem from "mem";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const URLS_TO_IGNORE: any[] = ["/auth/login", "/auth/register"];
console.log("BASE URL",BASE_URL);


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
    async (config) => {
        const tokensCookie = await getCookie("tokens");

        const tokens = tokensCookie ? JSON.parse(tokensCookie) : undefined;
        if (URLS_TO_IGNORE.includes(config.url)) {
            return config;
        }
        if (tokens?.accessToken) {
            //   @ts-ignore
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${tokens?.accessToken}`,
            };
        }

        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);
axiosClient.interceptors.response.use(
    (res) => {
        if (res && res.data) {
            return res.data;
        }
        return res;
    },
    async (error) => {
        const config = error?.config;
        if (error?.response?.status === 401 && !config?.sent) {
            config.sent = true;
            const result = await memoizedRefreshToken();

            if (result?.accessToken) {
                config.headers = {
                    ...config.headers,
                    authorization: `Bearer ${result?.accessToken}`,
                };
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
        const error = new Error("Not have refresh token");
        return Promise.reject(error);
    }

    try {
        const { data } = await axios.get(BASE_URL + "/auth/refresh", {
            headers: { Authorization: "Bearer " + tokens.refreshToken },
        });
        tokens.accessToken = data?.accessToken;
        tokens.refreshToken = data?.refreshToken;

        if (!tokens?.accessToken) {
            deleteCookie("tokens");
            const error = new Error("Can't fetch new token");
            return Promise.reject(error);
        }
        setCookie("tokens", JSON.stringify(tokens));
        return data;
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
