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
        ...mapState(["allScheduleNames","user"]),
        scheduleName :{
            get () { return this.$store.state.scheduleName},
            set(value) {this.$store.commit("updateScheduleName",{name: value})}
        }
    },
    async created(){
        // don't load the schedule names until the user is defined
        // this is only going to happen on refresh where user is undefined until 
        // firebase auth authenticates
        while(this.user===""){
            await new Promise((res) => setTimeout(res, 50));
        }
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