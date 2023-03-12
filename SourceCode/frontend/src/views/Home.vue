<template>
  <div class="home">
    <v-btn v-on:click="toScheduleBuilder">ScheduleBuilder</v-btn>
    <v-btn v-on:click="toScorers">Scorers</v-btn>
    <v-btn v-on:click="toScoreBoard">Score Board</v-btn>
    <v-btn v-on:click="toDad">Dad</v-btn>
    <v-btn v-on:click="toSchedule">Schedule</v-btn>
    <v-btn v-on:click="toLogin">Login</v-btn>
    <v-btn v-on:click="logout">Log out</v-btn>
  </div>
</template>

<script>
import router from "@/router/index.js";
import { logOut } from "../firebase";
export default {
  name: "Home",
  components: {
    
  },
  methods: {
    toScoreBoard() {
      router.push({
        path: "/scoreboard",
      });
    },
    toDad() {
      router.push({
        path: "/dad",
      });
    },
    toScheduleBuilder() {
      router.push({
        path: "/schedule-builder",
      });
    },
    toSchedule() {
      router.push({
        path: "/schedule",
      });
    },
    toScorers() {
      router.push({
        path: "/scorers",
      });
    },
    toLogin() {
      router.push({
        path: "/login",
      });
    },
    logout(){
      logOut();
    }
  },
};
</script>
