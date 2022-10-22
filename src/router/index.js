import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage.vue";
const routes = [{ path: "", component: MainPage, name: "main" }];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
