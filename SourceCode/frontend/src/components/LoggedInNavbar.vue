<template>
  <div>
      <v-layout>
        <v-app-bar
        color="primary"
        density="compact"
        >
          <v-app-bar-title>Pine Car Derby</v-app-bar-title>
          <v-spacer></v-spacer>
          <v-btn @click="toHome" icon><v-icon>mdi-home</v-icon></v-btn>
          <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
  
          <v-list>
            <v-list-item
              key="ScheduleBuilder"
              @click="toScheduleBuilder"
            >
              <v-list-item-title>Schedule Builder</v-list-item-title>
            </v-list-item>
            <v-list-item
              key="Scorers"
              @click="toScorers"
            >
              <v-list-item-title>Scorers</v-list-item-title>
            </v-list-item>
            <v-list-item
              key="ScoreBoard"
              @click="toScoreBoard"
            >
              <v-list-item-title>Score Board</v-list-item-title>
            </v-list-item>
            <v-list-item
              key="Dad"
              @click="toDad"
            >
              <v-list-item-title>Dad's Screen</v-list-item-title>
            </v-list-item>
            <v-list-item
              key="Logout"
              @click="logout"
            >
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
          
        </v-app-bar>
      </v-layout>
    </div>
</template>

<script>
import router from '../router';

export default {
    name: "LoggedInNavbar",
    components:{
    },
    methods:{
      toHome(){
        if(this.$route.path !=="/"){
          router.push({
          path: "/",
          });
        }
      },
      toScoreBoard() {
        if(this.$route.path !=="/scoreboard"){
          router.push({
          path: "/scoreboard",
        });
        }
    },
    toDad() {
      if(this.$route.path !=="/dad"){
          router.push({
          path: "/dad",
          });
        }
    },
    toScheduleBuilder() {
      if(this.$route.path !=="/schedule-builder"){
          router.push({
          path: "/schedule-builder",
          });
        }
    },
    toSchedule() {
      if(this.$route.path !=="/schedule"){
          router.push({
          path: "/schedule",
          });
        }
    },
    toScorers() {
      if(this.$route.path !=="/scorers"){
          router.push({
          path: "/scorers",
          });
        }
    },
    logout(){
      router.push({
          path: "/logout",
          });
    },
    }
}
</script>

<style>

</style>