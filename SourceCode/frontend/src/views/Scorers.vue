<template>
    <v-app>
        <br />
        <ChooseName @change_name_event="loadPage()" />
        <br />
        <div>
            <v-card>
                <h3>
                    Race {{currentRaceId+1}} / {{Scorers.schedule.length}}
                </h3>
            </v-card>
        </div>
        <br>

        <div class="main-content" v-if="render">
            <v-row>
                <v-col cols="6">
                    <v-card 
                    v-if="renderButton"
                    elevation="5" 
                    :color="currentRaceScores[0] === 0 ? 'red' : 'red darken-4'"
                    class="my-card"
                    v-on:click="scoreLane(0)">
                        <v-row>
                            <v-col v-if="(currentRaceScores[0]>0)">
                                <img v-if="(currentRaceScores[0]===4)" src="@/assets/Gold-Medal.png" alt="gold medal" width="40px" />
                                <img v-if="(currentRaceScores[0]===3)" src="@/assets/Silver-Medal.png" alt="gold medal" width="40px" />
                                <img v-if="(currentRaceScores[0]===2)" src="@/assets/Bronze-Medal.png" alt="gold medal" width="40px" />
                                <div v-if="(currentRaceScores[0]===1)">L</div>
                            </v-col>
                            <v-col>
                                {{racersMap.get(currentRaceRacers[0]).id}}
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card elevation="5"
                    v-if="renderButton" 
                    :color="currentRaceScores[1] === 0 ? 'blue' : 'blue darken-4'"
                    class="my-card"
                    v-on:click="scoreLane(1)">
                        <v-row>
                            <v-col v-if="(currentRaceScores[1]>0)">
                                <img v-if="(currentRaceScores[1]===4)" src="@/assets/Gold-Medal.png" alt="gold medal" width="40px" />
                                <img v-if="(currentRaceScores[1]===3)" src="@/assets/Silver-Medal.png" alt="gold medal" width="40px" />
                                <img v-if="(currentRaceScores[1]===2)" src="@/assets/Bronze-Medal.png" alt="gold medal" width="40px" />
                                <div v-if="(currentRaceScores[1]===1)">L</div>
                            </v-col>
                            <v-col>
                                {{racersMap.get(currentRaceRacers[1]).id}}
                            </v-col>
                        </v-row>
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
                        <v-row>
                            <v-col v-if="(currentRaceScores[2]>0)">
                                <img v-if="(currentRaceScores[2]===4)" src="@/assets/Gold-Medal.png" alt="gold medal" width="40px" />
                                <img v-if="(currentRaceScores[2]===3)" src="@/assets/Silver-Medal.png" alt="gold medal" width="40px" />
                                <img v-if="(currentRaceScores[2]===2)" src="@/assets/Bronze-Medal.png" alt="gold medal" width="40px" />
                                <div v-if="(currentRaceScores[2]===1)">L</div>
                            </v-col>
                            <v-col>
                                {{racersMap.get(currentRaceRacers[2]).id}}
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card elevation="5"
                    v-if="renderButton"
                    :color="currentRaceScores[3] === 0 ? 'yellow' : 'yellow darken-4'"
                    class="my-card"
                    v-on:click="scoreLane(3)">
                        <v-row>
                            <v-col v-if="(currentRaceScores[3]>0)">
                                <img v-if="(currentRaceScores[3]===4)" src="@/assets/Gold-Medal.png" alt="gold medal" width="40px" />
                                <img v-if="(currentRaceScores[3]===3)" src="@/assets/Silver-Medal.png" alt="gold medal" width="40px" />
                                <img v-if="(currentRaceScores[3]===2)" src="@/assets/Bronze-Medal.png" alt="gold medal" width="40px" />
                                <div v-if="(currentRaceScores[3]===1)">L</div>
                            </v-col>
                            <v-col v-if="currentRaceRacers[3]">
                                {{racersMap.get(currentRaceRacers[3]).id}}
                            </v-col>
                            <v-col v-else>
                                Empty
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <br/>
            <v-row>
                <v-col cols="4">
                    <v-btn 
                        v-on:click="previousRace"
                        fab
                        v-if="!firstRace()">
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
                        v-on:click="finish()"
                        fab
                        v-if="allScored()&&lastRace()"
                        >
                        <v-icon large 
                        v-if="lastRace()"
                        color="green">
                            mdi-check
                        </v-icon>
                    </v-btn>
                    <v-btn 
                        v-on:click="nextRace"
                        fab
                        v-if="(allScored()&&!lastRace())"
                        >
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
import {updateScore} from "../firebase"
import ChooseName from "../components/ChooseName.vue";
export default {
    name: "Scorers",
    data: () => ({
        currentRaceId: null,
        currentRaceRacers: [],
        currentRaceScores: [],
        currentRaceAlreadyScored: false,
        renderButton: true,
        render: false,
    }),
    computed: {
        ...mapState(["Scorers", "scheduleId", "racersId", "racers", "racersMap", "scheduleName", "user"]),
    },
    async created() {
        await this.loadPage();
    },
    methods: {
        async loadPage(){
            window.scrollTo(0, 0);
            this.render = false;
            await this.$store.dispatch("getFullSchedule", { userId: this.user, scheduleId: this.scheduleName });
            await this.$store.dispatch("getAllRacers", { userId: this.user, scheduleName: this.scheduleName });
            this.currentRaceId = 0;
            this.currentRaceRacers = this.Scorers.schedule[this.currentRaceId].racerIds;
            this.currentRaceScores = this.Scorers.schedule[this.currentRaceId].racerScores;
            this.render = true;
        },
        toHome() {
            router.push({
                path: "/",
            });
        },
        nextRace() {
            if (this.currentRaceId < this.Scorers.schedule.length - 1) {
                if (!this.currentRaceAlreadyScored) {
                    this.submitRaceScore();
                }
                this.currentRaceId++;
                this.currentRaceRacers = this.Scorers.schedule[this.currentRaceId].racerIds;
                this.currentRaceScores = this.Scorers.schedule[this.currentRaceId].racerScores;
                if (this.allScored()) {
                    this.currentRaceAlreadyScored = true;
                }
                else {
                    this.currentRaceAlreadyScored = false;
                }
            }
        },
        previousRace() {
            if (this.currentRaceId > 0) {
                this.currentRaceId--;
                this.currentRaceRacers = this.Scorers.schedule[this.currentRaceId].racerIds;
                this.currentRaceScores = this.Scorers.schedule[this.currentRaceId].racerScores;
                this.currentRaceAlreadyScored = true;
            }
        },
        clearRace() {
            for (let racer in this.currentRaceScores) {
                this.currentRaceScores[racer] = 0;
            }
            this.renderButton = false;
            this.$nextTick(() => {
                this.renderButton = true;
            });
            this.currentRaceAlreadyScored = false;
        },
        scoreLane(laneNumber) {
            if (this.currentRaceScores[laneNumber] > 0) {
                return;
            }
            let counter = 0;
            for (let i = 0; i < this.currentRaceScores.length; i++) {
                if (this.currentRaceScores[i] > 0)
                    counter += 1;
            }
            this.currentRaceScores[laneNumber] = 4 - counter;
            this.renderButton = false;
            this.$nextTick(() => {
                this.renderButton = true;
            });
        },
        allScored() {
            for (let score in this.currentRaceScores) {
                if (this.currentRaceScores[score] < 1) {
                    return false;
                }
            }
            return true;
        },
        lastRace() {
            return this.Scorers.schedule.length - 1 === this.currentRaceId;
        },
        firstRace() {
            return this.currentRaceId === 0;
        },
        finish() {
            if (!this.currentRaceAlreadyScored) {
                this.submitRaceScore();
            }
            this.toHome();
        },
        async submitRaceScore() {
            await updateScore(this.user, this.scheduleName, this.currentRaceId, this.Scorers.schedule[this.currentRaceId]);
        },
    },
    components: { ChooseName }
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