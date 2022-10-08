import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import DiscussionsPage from "../views/DiscussionsPage.vue";
const routes = [
  { path: "/", component: LoginPage, name: "login" },
  { path: "/register", component: RegisterPage, name: "register" },
  { path: "/discussions", component: DiscussionsPage, name: "discussions" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
