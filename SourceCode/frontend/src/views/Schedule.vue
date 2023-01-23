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
    <v-card>
        <v-card>
            <v-row>
                <v-col>
                    1
                </v-col>
                <v-col>
                    <v-card
                        color="red"
                    >
                        red
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        color="blue"
                    >
                        Blue
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        color="green"
                    >
                        Green
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        color="yellow"    
                    >
                        Yellow
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-card>
  </v-app>
</template>

<script>
import router from "@/router/index.js";
export default {
    name: "Schedule",
    components:{

    },
    data: ()=>({

    }),
    async created(){

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