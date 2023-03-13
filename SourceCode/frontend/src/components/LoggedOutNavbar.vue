<template>
    <div>
        <v-layout>
            <v-app-bar
            color="primary"
            density="compact"
        >
            <v-app-bar-title>Pine Car Derby</v-app-bar-title>
            <v-btn @click="goToHome" icon><v-icon>mdi-home</v-icon></v-btn>
            <v-btn @click="goToLogin" icon><v-icon>mdi-login</v-icon></v-btn>
        </v-app-bar>
        </v-layout>
    </div>
</template>

<script>
import router from "@/router/index.js";
export default {
    name: "LoggedOutNavbar",
    methods:{
        goToLogin(){
            router.push({
        path: "/login",
      });
        },
        goToHome(){
            if(this.$route.path !="/"){
                router.push({
                path: "/",
                });
            }
        }
    },
}
</script>

<style>
</style>