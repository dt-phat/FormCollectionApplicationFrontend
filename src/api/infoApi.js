import api from "./axios";

export const getUserInfo = async () => {
    const response = await api.get("/users/myInfo");
    return response.result;
}