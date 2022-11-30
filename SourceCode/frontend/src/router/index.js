import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ScoreBoard from "../views/ScoreBoard.vue";
import Dad from "../views/Dad.vue";
import Schedule from "../views/Schedule.vue";
import Scorers from "../views/Scorers.vue";

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
    path: "/schedule",
    name: "Schedule",
    component: Schedule,
  },
  {
    path: "/scorers",
    name: "Scorers",
    component: Scorers,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
