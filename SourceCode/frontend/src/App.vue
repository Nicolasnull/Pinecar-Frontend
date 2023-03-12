<template>
  <div id="app">
    <v-app>
      <LoggedInNavbar v-if="user!==''"/>
      <LoggedOutNavbar v-else/>   
      <router-view />
      </v-app>
  </div>
</template>

<script>
import LoggedInNavbar from '@/components/LoggedInNavbar.vue';
import LoggedOutNavbar from '@/components/LoggedOutNavbar.vue';
import { mapState } from 'vuex';
  export default {
    name: "App",
    components: {
      LoggedInNavbar,
      LoggedOutNavbar,
    },
    async created(){
      await this.$store.dispatch("subscribeToUser");
      console.log(this.user)
    },
    computed: {
    ...mapState(["user"]),
  },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
