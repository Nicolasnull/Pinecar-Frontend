<template>
  <div>
    Scorers <button v-on:click="toHome">Back to home</button>
    <br/>
    <v-card elevation="10">
        hello?
    </v-card>
    <button v-on:click="previousRace">Previous Race</button>
    <button v-on:click="nextRace">Next Race</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import router from '../router';
export default {
    name: "Scorers",
    data: () =>({
        schedule: [],
        currentRaceId: null,
        currentRaceRacers: [],
        currentRaceScores: [],
    }),
    computed:{
        ...mapState(["Scorers"])
    },
    async created(){
        window.scrollTo(0,0)
        await this.$store.dispatch("getFullSchedule")
        this.schedule=this.Scorers.schedule
        this.currentRaceId=0
        this.currentRaceRacers=this.schedule[this.currentRaceId].racers
        this.currentRaceScores=this.schedule[this.currentRaceId].scores
    },
    methods:{
        toHome(){
            router.push({
                path:"/"
            })
        },
        nextRace(){
            if(this.currentRaceId < this.schedule.length-1){
                this.currentRaceId++
                this.currentRaceRacers=this.schedule[this.currentRaceId].racers
                this.currentRaceScores=this.schedule[this.currentRaceId].scores
            }
            
        },
        previousRace(){
            if(this.currentRaceId > 0){
                this.currentRaceId--
                this.currentRaceRacers=this.schedule[this.currentRaceId].racers
                this.currentRaceScores=this.schedule[this.currentRaceId].scores
            }
            
        },
    },
}
</script>

<style>

</style>