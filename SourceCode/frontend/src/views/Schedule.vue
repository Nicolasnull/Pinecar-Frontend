<template>
  <div>
    Schedule
    <button v-on:click="toHome">Back to home</button>
  </div>
</template>

<script>
import router from "@/router/index.js";
export default {
    name: "Schedule",
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