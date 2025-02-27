import CreateFormView from "../views/FormView/CreateFormView.vue";
import FillFormView from "../views/FormView/FillFormView.vue";

export default [
    { path: "/project/:projectId/form/create-form", component: CreateFormView },
    { path: "/fill-form/:formId", component: FillFormView },
];