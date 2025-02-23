import api from "./axios";

export const getUserInfo = async () => {
    const response = await api.get("/users/myInfo");
    console.log(response.result);
    return response.result;
}