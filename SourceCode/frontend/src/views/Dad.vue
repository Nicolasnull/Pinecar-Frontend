<template>
  <v-app>
    <v-card>
      <v-row>
        <v-col>
          <h1>Dad's Screen</h1>
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
    <div class="label">
      Current Race: {{ currentRaceId+1 }} / {{ schedule.length }}
    </div>
    <v-row>
      <v-col>
        <v-card
          color="yellow"
          class="my-card"
        >
          {{ currentRaceRacers[0] }}
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="green"
          class="my-card"
        >
          {{ currentRaceRacers[1] }}
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="blue"
          class="my-card"
        >
          {{ currentRaceRacers[2] }}
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="red"
          class="my-card"
        >
          {{ currentRaceRacers[3] }}
        </v-card>
      </v-col>
    </v-row>
    <div class="label" v-if="currentRaceId<schedule.length-1">
      Next Race:
    </div>
    <v-row v-if="currentRaceId<schedule.length-1">
      <v-col>
        <v-card
          color="yellow darken-2"
          class="my-card"
        >
          {{ nextRaceRacers[0] }}
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="green darken-2"
          class="my-card"
        >
          {{ nextRaceRacers[1] }}
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="blue darken-2"
          class="my-card"
        >
          {{ nextRaceRacers[2] }}
        </v-card>
      </v-col>
      <v-col>
        <v-card
          color="red darken-2"
          class="my-card"
        >
          {{ nextRaceRacers[3] }}
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          fab
          v-on:click="previous()"
        >
          <v-icon>
            mdi-arrow-left-drop-circle-outline
          </v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          fab
          v-on:click="next()"
        >
          <v-icon>
            mdi-arrow-right-drop-circle-outline
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import router from "@/router/index.js";
import { mapState } from "vuex";
export default {
  name: "Dad",
  async created() {
    window.scrollTo(0, 0);
    await this.$store.dispatch("getFullSchedule");
    this.schedule = this.Scorers.schedule;
    this.currentRaceId = 0;
    this.currentRaceRacers = this.schedule[this.currentRaceId].racers;
    this.nextRaceRacers = this.schedule[this.currentRaceId+1].racers;
  },
  computed: {
    ...mapState(["Scorers"]),
  },
  data: () => ({
    schedule: [],
    currentRaceId: 0,
    currentRaceRacers: [],
    nextRaceRacers: [],
  }),
  methods: {
    toHome() {
      router.push({
        path: "/",
      });
    },
    next(){
      if(this.currentRaceId >= this.schedule.length-1) return;
      this.currentRaceId++;
      this.currentRaceRacers=this.schedule[this.currentRaceId].racers;
      if(this.currentRaceId >= this.schedule.length-1){
        this.nextRaceRacers=[];
      }
      else{
        this.nextRaceRacers=this.schedule[this.currentRaceId+1].racers;
      }
    },
    previous(){
      if(this.currentRaceId <= 0) return;
      this.currentRaceId--;
      this.currentRaceRacers=this.schedule[this.currentRaceId].racers;
      this.nextRaceRacers=this.schedule[this.currentRaceId+1].racers;
    },
  },
};
</script>

<style>
  .my-card{
    padding-top:25px;
    padding-bottom:25px;
    font-family:"Le Mans Classic";
    font-weight: bold;
    font-size: 60px;
  }
  .label{
    font-weight: bold;
    font-size: 25px;
  }
</style>
