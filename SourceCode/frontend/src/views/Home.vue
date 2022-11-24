<template>
  <div class="home">
    <button v-on:click="toSchedule">Schedule</button>
    <button v-on:click="toScorers">Scorers</button>
    <button v-on:click="toScoreBoard">Score Board</button>
    <button v-on:click="toDad">Dad</button>
  </div>
</template>

<script>
import router from "@/router/index.js";
export default {
  name: "Home",
  components: {
  },
  methods: {
    toScoreBoard(){
      router.push({
        path: "/scoreboard"
      })
    },
    toDad(){
      router.push({
        path:"/dad"
      })
    },
    toSchedule(){
      router.push({
        path:"/schedule"
      })
    },
    toScorers(){
      router.push({
        path:"/scorers"
      })
    },
  },
};
</script>
