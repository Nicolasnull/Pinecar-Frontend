import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ScoreBoard from "../views/ScoreBoard.vue";
import Dad from "../views/Dad.vue";
import ScheduleBuilder from "../views/ScheduleBuilder.vue";
import Scorers from "../views/Scorers.vue";
import Schedule from "../views/Schedule.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ScoreBoard",
    name: "ScoreBoard",
    component: ScoreBoard,
  },
  {
    path: "/Dad",
    name: "Dad",
    component: Dad,
  },
  {
    path: "/schedule-builder",
    name: "ScheduleBuilder",
    component: ScheduleBuilder,
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule,
  },
  {
    path: "/scorers",
    name: "Scorers",
    component: Scorers,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
