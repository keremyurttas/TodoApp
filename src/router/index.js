import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import DiscussionsPage from "../views/DiscussionsPage.vue";
import DiscussionPage from "../views/DiscussionPage.vue";
const routes = [
  { path: "/", component: LoginPage, name: "login" },
  { path: "/register", component: RegisterPage, name: "register" },
  { path: "/discussions", component: DiscussionsPage, name: "discussions" },
  {
    path: "/discussion/:id",
    component: DiscussionPage,
    name: "discussion",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
