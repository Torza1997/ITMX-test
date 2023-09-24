export const baseUrl = import.meta.env.VITE_BASE_URL;
export const apiUrl = import.meta.env.VITE_HTTP_HOST + baseUrl;
export const apiUrlMockUp = import.meta.env.VITE_HTTP_HOST_MOCK_UP + baseUrl;
export const isMockUp = import.meta.env.VITE_MOCK_UP.toLowerCase() === "true";
