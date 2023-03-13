<template>
  <div>
      <v-layout>
        <v-app-bar
        color="primary"
        density="compact"
        >
          <v-app-bar-title>Pine Car Derby</v-app-bar-title>
          <v-btn @click="toHome" icon><v-icon>mdi-home</v-icon></v-btn>
          <v-btn @click="toScheduleBuilder">Schedule Builder</v-btn>
          <v-btn @click="toScorers" >Scorers</v-btn>
          <v-btn @click="toScoreBoard">Scoreboard</v-btn>
          <v-btn @click="toDad" >Dad</v-btn>
          <v-btn @click="toSchedule">Schedule</v-btn>
          <v-btn @click="logout" icon><v-icon>mdi-logout</v-icon></v-btn>
        </v-app-bar>
      </v-layout>
    </div>
</template>

<script>
import router from '../router';
import { logOut } from '../firebase';
export default {
    name: "LoggedInNavbar",
    components:{
    },
    methods:{
      toHome(){
        if(this.$route.path !="/"){
          router.push({
          path: "/",
          });
        }
      },
      toScoreBoard() {
        if(this.$route.path !="/scoreboard"){
          router.push({
          path: "/scoreboard",
        });
        }
    },
    toDad() {
      if(this.$route.path !="/dad"){
          router.push({
          path: "/dad",
          });
        }
    },
    toScheduleBuilder() {
      if(this.$route.path !="/schedule-builder"){
          router.push({
          path: "/schedule-builder",
          });
        }
    },
    toSchedule() {
      if(this.$route.path !="/schedule"){
          router.push({
          path: "/schedule",
          });
        }
    },
    toScorers() {
      if(this.$route.path !="/scorers"){
          router.push({
          path: "/scorers",
          });
        }
    },
    logout(){
      this.toHome()
      logOut();
    }
    }
}
</script>

<style>

</style>