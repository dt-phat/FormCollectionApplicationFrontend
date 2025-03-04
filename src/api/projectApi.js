import api from "./axios";

export const getAllProjects = async () => {
    const response = await api.get("/projects");
    return response.result;
}

export const createProject = async (data) => {
    const response = await api.post("/projects", data);
    return response.result;
}

export const updateProject = async (projectId, data) => {
    const response = await api.put(`/projects/${projectId}`, data);
    return response.result;
}

export const getUserProject = async (projectId) => {
    const response = await api.get(`/projects/${projectId}`);
    console.log(response.result);
    return response.result;
}

export const deleteProject = async (projectId) => {
    const response = await api.delete(`/projects/${projectId}`);
}