import api from "./axios";

export const createForm = async (projectId, data) => {
    const response = await api.post(`/projects/${projectId}/forms`, data);
    console.log(response.result);
    return response.result;
}

export const getForm = async (projectId, formId) => {
    const response = await api.get(`/projects/${projectId}/forms/${formId}`);
    return response.result;
}