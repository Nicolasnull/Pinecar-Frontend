<template>
  <div>
    <br>
    <ChooseName @change_name_event="loadPageData()" />
    <br>
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
    </div>  
</template>

<script>
import router from "@/router/index.js";
import { mapState } from "vuex";
import ChooseName from "../components/ChooseName.vue";
export default {
    name: "Schedule",
    components:{
    ChooseName
},
    data: ()=>({
        rendered: false,
    }),
    computed: {
        ...mapState(["scheduleId", "Scorers", "racersId", "racersMap","user", "scheduleName"]),
    },
    async created(){
        this.loadPageData();
    },
    methods: {
        async loadPageData(){
            this.rendered=false;
            await this.$store.dispatch("getFullSchedule", {userId: this.user, scheduleId: this.scheduleName});
            await this.$store.dispatch("getAllRacers", {userId: this.user, scheduleName: this.scheduleName});
            this.rendered=true;
        },
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