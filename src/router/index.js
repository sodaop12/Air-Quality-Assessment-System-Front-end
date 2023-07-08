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
    path: "/calendar_as",
    name: "calendar_as",

    component: () => import("../views/CalendarAssessmentView.vue"),
  },
  {
    path: "/compact_as",
    name: "compact_as",

    component: () => import("../views/CompactAssessmentView.vue"),
  },
  {
    path: "/complete_as",
    name: "complete_as",

    component: () => import("../views/CompleteAssessmentView.vue"),
  },
  {
    path: "/feedback",
    name: "feedback",

    component: () => import("../views/FeedbackView.vue"),
  },
  {
    path: "/allfeedback",
    name: "allfeedback",

    component: () => import("../views/AllFeedbackView.vue"),
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
