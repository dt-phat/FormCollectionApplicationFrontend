import CreateFormView from "../views/FormView/CreateFormView.vue";
import EditFormView from "../views/FormView/EditFormView.vue";
import FillFormView from "../views/FormView/FillFormView.vue";
import FormAnswerView from "../views/FormView/FormAnswerView.vue";
import CompleteFormView from "../views/FormView/CompleteFormView.vue";

export default [
    { path: "/project/:projectId/create-form", component: CreateFormView, props: true },
    { path: "/project/:projectId/form/:formId", component: EditFormView, props: true },
    { path: "/form/:formId/view", component: FormAnswerView, props: true },
    { path: "/fill-form/:formId", component: FillFormView, props: true },
    { path: "/fill-form/:formId/completed", component: CompleteFormView },
];