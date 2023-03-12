<template>
<v-card data-app class="onTopOfEverything">
    <v-select
    label="Name of Schedule"
    :items="allScheduleNames"
    v-model="scheduleName"
    >
    </v-select>
</v-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "ChooseName",
    data: ()=> ({
        loaded: false,
        valid: true,
    }),
    computed:{
        ...mapState(["allScheduleNames"]),
        scheduleName :{
            get () { return this.$store.state.scheduleName},
            set(value) {this.$store.commit("updateScheduleName",{name: value})}
        }
    },
    async created(){
        console.log("HEYO", this.scheduleName)
        await this.$store.dispatch("getAllScheduleNames");
        this.loaded=true;
    },
    methods: {

    },
}
</script>

<style>
.onTopOfEverything{
  z-index: 99;
}
</style>