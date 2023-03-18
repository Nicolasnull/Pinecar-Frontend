<template>
    <div>
        <v-layout>
            <v-app-bar
            color="primary"
            density="compact"
        >
            <v-app-bar-title>Pine Car Derby</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn @click="goToHome" icon><v-icon>mdi-home</v-icon></v-btn>
            <v-menu
                left
                bottom
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    >
                    <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
        
                <v-list>
                    <v-list-item
                    key="Login"
                    @click="goToLogin"
                    >
                    <v-list-item-title>Login</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
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
            if(this.$route.path!=="/login"){
                router.push({
                    path: "/login",
                });
            }
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