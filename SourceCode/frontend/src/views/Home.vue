<template>
  <div class="home">
    <v-btn v-on:click="toSchedule">Schedule</v-btn>
    <v-btn v-on:click="toScorers">Scorers</v-btn>
    <v-btn v-on:click="toScoreBoard">Score Board</v-btn>
    <v-btn v-on:click="toDad">Dad</v-btn>
  </div>
</template>

<script>
import router from "@/router/index.js";
export default {
  name: "Home",
  components: {},
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
  },
};
</script>
