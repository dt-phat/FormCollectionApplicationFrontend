import ProjectView from "../views/ProjectView/ProjectView.vue";
import ProjectDetailsView from "../views/ProjectView/ProjectDetailsView.vue";
export default [
    { path: "/project", component: ProjectView },
    { path: "/project/:projectId/", component: ProjectDetailsView, props: true },
];