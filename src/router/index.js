import { createRouter, createWebHistory } from 'vue-router';

import authRoutes from "./auth"
import infoRoutes from "./info"

const routes = [
    ...authRoutes,
    ...infoRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;