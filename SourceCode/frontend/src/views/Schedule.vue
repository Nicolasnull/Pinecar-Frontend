<template>
  <v-app>
    <v-card>
        <v-row>
            <v-col>
                Schedule
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
    <v-card v-if="rendered">
        <v-card v-for="(race, index) in Scorers.schedule" :key="index">
            <v-row>
                <v-col>
                    {{ index+1 }}
                </v-col>
                <v-col>
                    <v-card
                        color="red"
                    >
                        {{racersMap.get(race.racerIds[0]).id}} ({{ racersMap.get(race.racerIds[0]).name }})
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        color="blue"
                    >
                        {{ racersMap.get(race.racerIds[1]).id }} ({{ racersMap.get(race.racerIds[1]).name }})
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        color="green"
                    >
                        {{ racersMap.get(race.racerIds[2]).id }} ({{ racersMap.get(race.racerIds[2]).name }})
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        color="yellow"    
                    >
                        <div v-if="race.racerIds.length < 4">
                            Empty Lane
                        </div>
                        <div v-else>
                            {{ racersMap.get(race.racerIds[3]).id }} ({{ racersMap.get(race.racerIds[3]).name }})
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-card>
  </v-app>
</template>

<script>
import router from "@/router/index.js";
import { mapState } from "vuex";
export default {
    name: "Schedule",
    components:{

    },
    data: ()=>({
        rendered: false,
    }),
    computed: {
        ...mapState(["scheduleId", "Scorers", "racersId", "racersMap"]),
    },
    async created(){
        await this.$store.dispatch("getFullSchedule", {scheduleId: this.scheduleId});
        await this.$store.dispatch("getAllRacers", {racersId: this.racersId});
        this.rendered=true;
    },
    methods: {
        toHome() {
            router.push({
                path: "/",
            });
        }
    },

}
</script>

<style>

</style>