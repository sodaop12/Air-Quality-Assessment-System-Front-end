import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/assessment",
    name: "assessment",

    component: () => import("../views/AssessmentView.vue"),
  },
  {
    path: "/feedback",
    name: "feedback",

    component: () => import("../views/FeedbackView.vue"),
  },

  {
    path: "/forecast",
    name: "forecast",

    component: () => import("../views/ForecastView.vue"),
  },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
