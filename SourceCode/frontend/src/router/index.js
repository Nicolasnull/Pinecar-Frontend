import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ScoreBoard from "../views/ScoreBoard.vue";
import Dad from "../views/Dad.vue";
import ScheduleBuilder from "../views/ScheduleBuilder.vue";
import Scorers from "../views/Scorers.vue";
import Schedule from "../views/Schedule.vue";
import Login from "../views/Login.vue";
import PageNotFound from "../views/PageNotFound.vue";
import Logout from "../views/Logout.vue";

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
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: "/Dad",
    name: "Dad",
    component: Dad,
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: "/schedule-builder",
    name: "ScheduleBuilder",
    component: ScheduleBuilder,
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule,
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: "/scorers",
    name: "Scorers",
    component: Scorers,
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta:{
      requiresAuth: true,
    },
  },
  {
    path: "/page-not-found",
    name:"PageNotFound",
    component: PageNotFound,
  },
  {
    path: "*",
    beforeEnter: (next)=>{next({name:"PageNotFound"})}
  },
];

const router = new VueRouter({
  routes,
});

// navigation guard
router.beforeEach((to, from, next)=>{
  try{
    if(to.matched.some(record=>record.meta.requiresAuth) && !router.app.$store.getters.isLoggedIn){
      next({name: "PageNotFound"})
    }
    else{
      next();
    }
  } catch(e){
    console.log("May need to find a better solution to this... Look in router navigation guard")
    next();
  }
  
  
});

export default router;
