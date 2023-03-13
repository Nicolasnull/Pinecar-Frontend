<template>
<v-card data-app>
    <v-select
    label="Name of Schedule"
    :items="allScheduleNames"
    v-model="scheduleName"
    @change="nameChanged"
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
        await this.$store.dispatch("getAllScheduleNames");
        this.loaded=true;
    },
    methods: {
        nameChanged(){
            this.$emit("change_name_event");
        }
    },
}
</script>

<style>

</style>