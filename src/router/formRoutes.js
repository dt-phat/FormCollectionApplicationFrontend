import CreateFormView from "../views/FormView/CreateFormView.vue";
import EditFormView from "../views/FormView/EditFormView.vue";
import FillFormView from "../views/FormView/FillFormView.vue";

export default [
    { path: "/project/:projectId/create-form", component: CreateFormView, props: true },
    { path: "/form/:formId", component: EditFormView, props: true },
    { path: "/fill-form/:formId", component: FillFormView },
];