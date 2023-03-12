<template>
  <div>
    <v-card>
      <v-row>
        <v-col>
          logged in
        </v-col>
        <v-col>
          <ChooseName />
        </v-col>
      </v-row>
    </v-card>
    <br>
    <br>
  </div>
</template>

<script>
import ChooseName from './ChooseName.vue';
export default {
    name: "LoggedInNavbar",
    components:{
      ChooseName,
    }
  // subscribe to all the names
}
</script>

<style>

</style>