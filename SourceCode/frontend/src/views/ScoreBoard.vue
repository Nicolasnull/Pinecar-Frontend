<template>
  <v-app>
    <br>
    <v-card elevation="5">
      <v-row>
        <v-col>
          <h1>Score Board</h1> 
        </v-col>
        <v-col>
          <v-btn 
            v-on:click="toHome"
            fab
            text
            color="grey darken-2"
          >
            <v-icon large>
              mdi-home
            </v-icon>
        </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <br>
    <v-card>
      <v-row>
        <v-col>
          Place:
        </v-col>
        <v-col>
          Car Number:
        </v-col>
        <v-col>
          Name:
        </v-col>
        <v-col>
          Score:
        </v-col>
      </v-row>
    </v-card>
    
    <v-card v-for="(racer, index) in ScoreBoard.scoreBoard" :key="racer.racerId">
      <v-row>
        <v-col>
          {{(index + 1)}}
        </v-col>
        <v-col>
          {{racer.racerNumber}} 
        </v-col>
        <v-col>
          {{racer.racerName}} 
        </v-col>
        <v-col>
          {{racer.racerScore}}
        </v-col>
      </v-row>
    </v-card>
  </v-app>
</template>

<script>
import router from "@/router/index.js";
import { mapState } from "vuex";
export default {
  name: "ScoreBoard",
  computed: {
    ...mapState(["ScoreBoard","racersId"])
  },
  async created(){
    window.scrollTo(0, 0);
    await this.$store.dispatch("subscribeToScoreBoard", {racerListId: this.racersId});
  },  
  methods: {
    toHome() {
      router.push({
        path: "/",
      });
    },
  },
};
</script>

<style></style>
