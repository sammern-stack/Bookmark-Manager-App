import axios from "axios";
import type { AxiosError } from "axios";
import type { CustomAxiosRequestConfig, ApiResponse } from "../types"

let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => (accessToken = token);

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Apply the authorization header on optional requests
api.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  if (accessToken && config.requireAuth)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

// Refresh the access token if invalid
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as CustomAxiosRequestConfig;

    // Conditions required to refresh token
    const is403 = error.response?.status === 403;
    const isFirstTry = !original._retry;
    const needsAuth = original.requireAuth;

    if (is403 && isFirstTry && needsAuth) {
      // Set _retry flag to true to prevent infinite request loop
      original._retry = true;

      try {
        // Refresh access token
        const res = await api({
          method: "POST",
          url: "/auth/refresh",
          requireAuth: false,
        } as CustomAxiosRequestConfig);
        setAccessToken(res.data.accessToken);
        original.headers.Authorization = `Bearer ${res.data.accessToken}`;

        // Make the same api call with the new access token
        return api(original);
      } catch {
        setAccessToken(null);
        window.location.href = "/login";
        return;
      }
    }

    // If no token was passed redirect the user to log in
    const is401 = error.response?.status === 401;
    const isRefreshEndpoint = original.url === "/auth/refresh";
    if (is401 && !isRefreshEndpoint) window.location.href = "/login";

    // Throw the error outside the interceptor to flow through the next handler
    return Promise.reject(error);
  },
);

// Utility: Generic API call function with error handling
export const apiCall = async <T = unknown>(
  method: string,
  url: string,
  data: unknown = null,
  requireAuth: boolean = true,
): Promise<ApiResponse<T>> => {
  // Attach data as body or query params depending on method
  const isGET = method.toUpperCase() === "GET";
  const dataConfig = data ? (isGET ? { params: data } : { data }) : {};

  try {
    const res = await api({
      method,
      url,
      requireAuth,
      ...dataConfig,
    } as CustomAxiosRequestConfig);
    return { ok: true, data: res.data as T };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error(`Error during API call to ${url}:`, error);
    return {
      ok: false,
      error:
        error.response?.data?.message ||
        `An error occurred while making API call to ${url}.`,
    };
  }
};
