import { createRouter, createWebHistory } from "vue-router";
import loginPage from "../views/LoginPage.vue";

const routes = [{ path: "/", component: loginPage, name: "login" }];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
