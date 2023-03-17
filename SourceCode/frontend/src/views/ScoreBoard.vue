<template>
  <v-app>
    <br>
    <ChooseName @change_name_event="loadPageData()" />
    <br>
    <div v-if="scheduleName!==''">
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
    </div>
    
  </v-app>
</template>

<script>
import router from "@/router/index.js";
import { mapState } from "vuex";
import ChooseName from "../components/ChooseName.vue";
export default {
    name: "ScoreBoard",
    computed: {
        ...mapState(["ScoreBoard", "racersId", "user", "scheduleName"])
    },
    created() {
      if(this.scheduleName!==''){
        this.loadPageData();
      } 
    },
    methods: {
        async loadPageData() {
            window.scrollTo(0, 0);
            await this.$store.dispatch("subscribeToScoreBoard", { userId: this.user, scheduleName: this.scheduleName });
        },
        toHome() {
            router.push({
                path: "/",
            });
        },
    },
    components: { ChooseName }
};
</script>

<style></style>
