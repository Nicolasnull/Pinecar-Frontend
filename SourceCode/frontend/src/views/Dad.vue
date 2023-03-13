<template>
  <v-app>
    <br />
    <ChooseName @change_name_event="loadPageData()" />
    <br>
    <div v-if="rendered">
      <div class="label">
        Current Race: {{ currentRaceId+1 }} / {{ Scorers.schedule.length }}
      </div>
      <v-row>
        <v-col>
          <v-card
            v-if="currentRaceRacers.length > 3"
            color="yellow"
            class="my-card"
          >
            {{ racersMap.get(currentRaceRacers[3]).id }}
          </v-card>
          <v-card
            v-else
            color="yellow"
            class="my-card"
          >
            Empty
          </v-card>
        </v-col>
        <v-col>
          <v-card
            color="green"
            class="my-card"
          >
            {{ racersMap.get(currentRaceRacers[2]).id }}
          </v-card>
        </v-col>
        <v-col>
          <v-card
            color="blue"
            class="my-card"
          >
            {{ racersMap.get(currentRaceRacers[1]).id }}
          </v-card>
        </v-col>
        <v-col>
          <v-card
            color="red"
            class="my-card"
          >
            {{ racersMap.get(currentRaceRacers[0]).id }}
          </v-card>
        </v-col>
      </v-row>
      <div class="label" v-if="currentRaceId<Scorers.schedule.length-1">
        Next Race:
      </div>
      <v-row v-if="currentRaceId<Scorers.schedule.length-1">
        <v-col>
          <v-card
          v-if="nextRaceRacers.length > 3"
            color="yellow darken-2"
            class="my-card"
          >
            {{ racersMap.get(nextRaceRacers[3]).id }}
          </v-card>
          <v-card
          v-else
            color="yellow darken-2"
            class="my-card"
          >
            Empty
          </v-card>
        </v-col>
        <v-col>
          <v-card
            color="green darken-2"
            class="my-card"
          >
            {{ racersMap.get(nextRaceRacers[2]).id }}
          </v-card>
        </v-col>
        <v-col>
          <v-card
            color="blue darken-2"
            class="my-card"
          >
            {{ racersMap.get(nextRaceRacers[1]).id }}
          </v-card>
        </v-col>
        <v-col>
          <v-card
            color="red darken-2"
            class="my-card"
          >
            {{ racersMap.get(nextRaceRacers[0]).id }}
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
    </div>  
  </v-app>
</template>

<script>
import router from "@/router/index.js";
import { mapState } from "vuex";
import ChooseName from "../components/ChooseName.vue";
export default {
    name: "Dad",
    computed: {
        ...mapState(["Scorers", "scheduleId", "racersId", "racersMap", "user", "scheduleName"]),
    },
    data: () => ({
        schedule: [],
        currentRaceId: 0,
        currentRaceRacers: [],
        nextRaceRacers: [],
        rendered: false,
    }),
    async created() {
        window.scrollTo(0, 0);
        this.loadPageData();
    },
    methods: {
        async loadPageData() {
            this.rendered = false;
            await this.$store.dispatch("getFullSchedule", { userId: this.user, scheduleId: this.scheduleName });
            await this.$store.dispatch("getAllRacers", { userId: this.user, scheduleName: this.scheduleName });
            this.currentRaceId = 0;
            this.currentRaceRacers = this.Scorers.schedule[this.currentRaceId].racerIds;
            this.nextRaceRacers = this.Scorers.schedule[this.currentRaceId + 1].racerIds;
            console.log(this.Scorers.schedule);
            this.rendered = true;
        },
        toHome() {
            router.push({
                path: "/",
            });
        },
        next() {
            if (this.currentRaceId >= this.Scorers.schedule.length - 1)
                return;
            this.currentRaceId++;
            this.currentRaceRacers = this.Scorers.schedule[this.currentRaceId].racerIds;
            if (this.currentRaceId >= this.Scorers.schedule.length - 1) {
                this.nextRaceRacers = [];
            }
            else {
                this.nextRaceRacers = this.Scorers.schedule[this.currentRaceId + 1].racerIds;
            }
        },
        previous() {
            if (this.currentRaceId <= 0)
                return;
            this.currentRaceId--;
            this.currentRaceRacers = this.Scorers.schedule[this.currentRaceId].racerIds;
            this.nextRaceRacers = this.Scorers.schedule[this.currentRaceId + 1].racerIds;
        },
    },
    components: { ChooseName }
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
