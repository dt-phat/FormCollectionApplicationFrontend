import api from "./axios";

export const register = async (username, password, firstname, lastname, dob) => {
    console.log({ username, password, firstname, lastname, dob });
    const response = await api.post("/users", { username, password, firstname, lastname, dob });
    console.log(response);
    return response;
};

export const login = async (username, password) => {
    const response = await api.post("/auth/token", { username, password });
    localStorage.setItem("token", response?.result?.token);
    return response;
};