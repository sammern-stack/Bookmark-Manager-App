import axios from "axios";

let accessToken = false;
export const setAccessToken = (token) => (accessToken = token);

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Apply the authorization header on optional requests
api.interceptors.request.use((config) => {
  if (accessToken && config.requireAuth)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

// Refresh the access token if invalid
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

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
        });
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

    // If now token was passed redirect the user to log in
    const is401 = error.response?.status === 401;
    if (is401) window.location.href = "/login";

    // Throw the error outside the interceptor to flow through the next handler
    return Promise.reject(error);
  },
);

// Utility: Generic API call function with error handling
export const apiCall = async (method, url, data = null, requireAuth = true) => {
  // Attach data as body or query params depending on method
  const isGET = method.toUpperCase() === "GET";
  const dataConfig = data ? (isGET ? { params: data } : { data }) : {};

  try {
    const res = await api({ method, url, requireAuth, ...dataConfig });
    return { ok: true, data: res.data };
  } catch (err) {
    console.error(`Error during API call to ${url}:`, err);
    return {
      ok: false,
      error:
        err.response?.data?.message ||
        `An error occurred while making API call to ${url}.`,
    };
  }
};
