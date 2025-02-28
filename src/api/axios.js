import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 < Date.now();
    } catch (error) {
        return true;
    }
}

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token && !isTokenExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`; // Gắn token vào headers
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default api;