<template>
  <div>
    Dad
    <button v-on:click="toHome">Back to Home</button>
  </div>
</template>

<script>
import router from "@/router/index.js";
export default {
  name: "Dad",
  methods: {
    toHome() {
      router.push({
        path: "/",
      });
    },
  },
};
</script>

<style></style>
