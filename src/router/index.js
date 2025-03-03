import { createRouter, createWebHistory } from 'vue-router';

import homeRoutes from './homeRoutes';
import authRoutes from "./authRoutes"
import infoRoutes from "./infoRoutes"
import projectRoutes from './projectRoutes';
import formRoutes from './formRoutes';
import userRouter from "./user.Router";

const routes = [
    ...homeRoutes,
    ...authRoutes,
    ...infoRoutes,
    ...projectRoutes,
    ...formRoutes,
    ...userRouter,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
