<template>
    <v-app>
        <br>
        <v-card elevation="5">
            <v-row>
                <v-col cols="8">
                    <h1>
                        Scorers
                    </h1> 
                </v-col>
                <v-col cols="2">
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
    
        <br />
        <div>
            <v-card>
                <h3>
                    Race {{currentRaceId+1}} / {{schedule.length}}
                </h3>
            </v-card>
        </div>
        <br>

        <div class="main-content">
            <v-row>
                <v-col cols="6">
                    <v-card 
                    v-if="renderButton"
                    elevation="5" 
                    :color="currentRaceScores[0] === 0 ? 'red' : 'red darken-4'"
                    class="my-card"
                    v-on:click="scoreLane(0)">
                        {{currentRaceRacers[0]}}
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card elevation="5"
                    v-if="renderButton" 
                    :color="currentRaceScores[1] === 0 ? 'blue' : 'blue darken-4'"
                    class="my-card"
                    v-on:click="scoreLane(1)">
                        {{currentRaceRacers[1]}}
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-card elevation="5" 
                    v-if="renderButton"
                    :color="currentRaceScores[2] === 0 ? 'green' : 'green darken-4'"
                    class="my-card"
                    v-on:click="scoreLane(2)">
                        {{currentRaceRacers[2]}}
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card elevation="5"
                    v-if="renderButton"
                    :color="currentRaceScores[3] === 0 ? 'yellow' : 'yellow darken-4'"
                    class="my-card"
                    v-on:click="scoreLane(3)">
                        {{currentRaceRacers[3]}}
                    </v-card>
                </v-col>
            </v-row>
            <br/>
            <v-row>
                <v-col cols="4">
                    <v-btn 
                        v-on:click="previousRace"
                        fab>
                        <v-icon large>
                            mdi-arrow-left-drop-circle-outline
                        </v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn
                        v-on:click="clearRace"
                        fab
                        text>
                        <v-icon 
                            large
                            color="red">
                            mdi-cancel
                        </v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn 
                        v-on:click="nextRace"
                        fab>
                        <v-icon large>
                            mdi-arrow-right-drop-circle-outline
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </v-app>
</template>

<script>
import { mapState } from "vuex";
import router from "../router";
export default {
  name: "Scorers",
  data: () => ({
    schedule: [],
    currentRaceId: null,
    currentRaceRacers: [],
    currentRaceScores: [],
    renderButton: true,
  }),
  computed: {
    ...mapState(["Scorers"]),
  },
  async created() {
    window.scrollTo(0, 0);
    await this.$store.dispatch("getFullSchedule");
    this.schedule = this.Scorers.schedule;
    this.currentRaceId = 0;
    this.currentRaceRacers = this.schedule[this.currentRaceId].racers;
    this.currentRaceScores = this.schedule[this.currentRaceId].scores;
  },
  methods: {
    toHome() {
      router.push({
        path: "/",
      });
    },
    nextRace() {
      if (this.currentRaceId < this.schedule.length - 1) {
        this.currentRaceId++;
        this.currentRaceRacers = this.schedule[this.currentRaceId].racers;
        this.currentRaceScores = this.schedule[this.currentRaceId].scores;
      }
    },
    previousRace() {
      if (this.currentRaceId > 0) {
        this.currentRaceId--;
        this.currentRaceRacers = this.schedule[this.currentRaceId].racers;
        this.currentRaceScores = this.schedule[this.currentRaceId].scores;
      }
    },
    clearRace() {
      for(let racer in this.currentRaceScores){
        this.currentRaceScores[racer]=0;
      }
      this.renderButton=false;
        this.$nextTick(() => {
            this.renderButton=true;
        })
    },
    scoreLane(laneNumber){
        if(this.currentRaceScores[laneNumber] > 0){
            return;
        }
        let counter = 0;
        for(let i = 0; i < this.currentRaceScores.length; i++){
            if(this.currentRaceScores[i] > 0)
                counter+=1;
        }
        this.currentRaceScores[laneNumber]=4-counter;
        this.renderButton=false;
        this.$nextTick(() => {
            this.renderButton=true;
        })
        console.log(this.currentRaceScores);
    },
  },
};
</script>

<style>
    .main-content{
        margin:5%;
    }
    .my-card{
        padding-top:25px;
        padding-bottom:25px;
        font-family:"Le Mans Classic";
        font-weight: bold;
        font-size: 60px;
    }
</style>
