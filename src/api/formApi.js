import api from "./axios";

export const createForm = async (projectId, data) => {
    const response = await api.post(`/projects/${projectId}/forms`, data);
    return response.result;
}

export const getForm = async (projectId, formId) => {
    const response = await api.get(`/projects/${projectId}/forms/${formId}`);
    return response.result;
}

export const submitForm = async (formId, data) => {
    const response = await api.post(`/${formId}/formAnswers`, data);
    return response.result;
}

export const getFormAnswers = async (formId) => {
    const response = await api.get(`/${formId}/formAnswers`);
    return response.result;
}

export const deleteForm = async (projectId, formId) => {
    await api.delete(`/projects/${projectId}/forms/${formId}`);
}