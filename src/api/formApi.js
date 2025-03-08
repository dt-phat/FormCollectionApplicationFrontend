import api from "./axios";

export const createForm = async (projectId, data) => {
    const response = await api.post(`/projects/${projectId}/forms`, data);
    return response.result;
}

export const updateForm = async (projectId, formId, data) => {
    const response = await api.put(`/projects/${projectId}/forms/${formId}`, data);
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

export const getFormSummary = async (projectId, formId) => {
    const response = await api.get(`/projects/${projectId}/forms/${formId}/summarize`);
    return response;
}

export const openForm = async (projectId, formId) => {
    await api.post(`/projects/${projectId}/forms/${formId}/publish`);
}

export const closeForm = async (projectId, formId) => {
    await api.post(`/projects/${projectId}/forms/${formId}/close`);
}