<template>
  <div>
    Scoreboard <button v-on:click="toHome">Back to home</button>
  </div>
</template>

<script>
import router from '../router';
export default {
    name: "Scorers",
    methods:{
        toHome(){
            router.push({
                path:"/"
            })
        }
    },
}
</script>

<style>

</style>