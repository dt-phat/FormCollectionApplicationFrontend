import api from "./axios";

export const getUserInfo = async () => {
    const response = await api.get("/users/myInfo");
    return response.result;
}

export const getAllFormAnswers = async () => {
    const response = await api.get("/users/myFormAnswers");
    return response.result;
}