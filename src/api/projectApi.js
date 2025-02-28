import api from "./axios";

export const getAllProjects = async () => {
    const response = await api.get("/projects");
    return response.result;
}

export const getUserProject = async (projectId) => {
    const response = await api.get(`/projects/${projectId}`);
    console.log(response.result);
    return response.result;
}