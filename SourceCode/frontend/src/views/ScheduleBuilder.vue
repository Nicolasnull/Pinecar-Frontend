<template>
  <div>
    <br>
    <v-row>
      <v-col>
        <v-select
        :items="['Update Existing Schedule','Create New']"
        v-model="scheduleType"
        @change="clearScreenData"
        >
      </v-select>
      </v-col>
      <v-col v-if="scheduleType==='Update Existing Schedule'">
        <choose-name @change_name_event="nameChange"/>
      </v-col>
      <v-col v-else>
        <v-text-field
        v-model="newName"
        label="New Schedule Name"
        >

        </v-text-field>
      </v-col>
    </v-row>
    
    <v-form v-model="valid">
      <v-card 
        class="my-card"
        elevation="5"
      >
      <v-card
        class="my-row">
          <v-row>
            <v-col>
              <v-text-field
                v-model="numRaces"
                :rules="numRacesRules"
                label="Number of Races"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card> 
      </v-card>
      <v-card
        class="my-card"
        elevation="5"
      >
      <v-row>
        <v-col>
          <v-btn
          v-on:click="sortRacersById()">Sort By Id</v-btn>
        </v-col>
        <v-col>
          <v-btn
          v-on:click="sortRacersByName()">Sort By Name</v-btn>
        </v-col>
      </v-row>
        <div v-for="(racer, i) in racers" :key="i">
          <v-card
            class="my-row"
            elevation="2"
          >
            <v-row>
              <v-col sm="2">
                <v-text-field
                  v-model="racer.id"
                  :rules="racerIdRules"
                  label="Number"
                >
                </v-text-field>
              </v-col>
              <v-col sm="8">
                <v-text-field
                  v-model="racer.name"
                  label="Name"
                  :rules="racerNameRules"
                >
                </v-text-field>
              </v-col>
              <v-col sm="2">
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="error"
                      fab
                      small
                      v-on:click="removeRacer(i)"
                    >
                      <v-icon>
                        mdi-minus
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Remove Racer</span>
                </v-tooltip> 
              </v-col>
            </v-row>
          </v-card>
        </div>
        <v-row>
          <v-col>
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="success"
                  fab
                  large
                  v-on:click="addRacer()"
                >
                  <v-icon>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </template>
              <span>Add Racer</span>
            </v-tooltip> 
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              color="error"
              v-on:click="toHome()"
            >
              Cancel
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="success"
              type="submit"
              :disabled="!valid"
              v-on:click="saveRacers()"
            >
              Save Racers
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              :disabled="!valid"
              v-on:click="createSchedule()"
            >
              Create Schedule
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {generateSchedule} from "../scheduleGenAlgo/generateSchedule"
import { replaceSchedule, addScheduleName } from "../firebase";
import ChooseName from '../components/ChooseName.vue';
export default {
  name: "ScheduleBuilder",
  components: {
    ChooseName,
  },
  computed:{
    ...mapState(["racersId", "scheduleId", "racers", "scheduleName","user","allScheduleNames"])
  },
  data: ()=> ({
    numRacesRules: [
      v => v !="" || "Number of races is required.",
      v => Number.isInteger(+v) || "Value must be a number." ,
    ],
    racerNameRules: [
      v => v !="" || "Racer id is required.",
    ],
    racerIdRules: [
      v => v !="" || "Field is required.",
      v => v.length < 3 || "Can only have a racer id of length 2 or less.",
    ],
    valid: false,
    numRaces: "",
    removedRacers: [],
    scheduleType: "Update Existing Schedule",
    newName: "",
  }),
  async created() {
    this.loadScreenData()
  },
  methods: {
    addRacer(){
      this.racers.push({dbId: undefined, id: "", name: "", score: 0});
    },
    sortRacersByName(){
      this.racers.sort((a,b) =>{
        return a.name.localeCompare(b.name);
      });
    }, 
    sortRacersById(){
      this.racers.sort((a,b) =>{
      if(!isNaN(a.id) && !isNaN(b.id)){
        return Number(a.id) - Number(b.id)
      }
        return a.id.localeCompare(b.id);
      });
    },
    removeRacer(index){
      this.removedRacers.push(this.racers[index]);
      this.racers.splice(index,1);
    },
    async saveRacers(){
      let racerIds = this.racers.map(racer => racer.id);
      if((new Set(racerIds)).size != racerIds.length){
        alert("DUPLICATE IDS! Cannot submit racers until all racers have a unique racer number."); // TODO: VALIDATE BETTER
        return;
      }
      if(this.scheduleType==="Update Existing Schedule"){
        await this.$store.dispatch("updateAllRacers",{userId: this.user, scheduleName: this.scheduleName, newRacerList:this.racers, removedRacers: this.removedRacers});
      }
      else if(this.newName!==""){
        await this.$store.dispatch("updateAllRacers",{userId: this.user, scheduleName: this.newName, newRacerList:this.racers, removedRacers: this.removedRacers});
        addScheduleName(this.user, this.newName, this.allScheduleNames);
      }
      
    },
    async createSchedule(){
      this.saveRacers()
      let racerIds = this.racers.map(racer => racer.id);
      if((new Set(racerIds)).size != racerIds.length){
        alert("DUPLICATE IDS! Cannot submit racers until all racers have a unique racer number."); // TODO: VALIDATE BETTER
        return;
      }
      let scheduleObject = generateSchedule(this.racers.length, this.numRaces, this.racers.map(racer => racer.dbId));
      console.log(scheduleObject);
      if(this.scheduleType==="Update Existing Schedule"){
        replaceSchedule(this.user, this.scheduleName, scheduleObject.schedule)
      }
      else if(this.newName!=="")
      {
        replaceSchedule(this.user, this.newName, scheduleObject.schedule)
        addScheduleName(this.user, this.newName, this.allScheduleNames);
      }
      //this.toHome();
    },
    nameChange(){
      this.loadScreenData()
    },
    async loadScreenData(){
      if(this.scheduleType==="Create New") this.clearScreenData();
      await this.$store.dispatch("getAllRacers",{userId: this.user, scheduleName: this.scheduleName});
      this.sortRacersById();
    },
    clearScreenData(){
      this.removedRacers=[];
      this.$store.commit("updateScheduleName",{name: ""});
      this.$store.commit("updateRacers",{racersArr: [], racersMap: new Map()});
    },
  },
};
</script>

<style>
  .my-card{
    margin-left:2.5%;
    margin-right:2.5%;
    margin-top:20px;
  }
  .my-row{
    padding-left:2.5%;
    padding-right:2.5%;
    margin-left:2.5%;
    margin-right:2.5%;
    margin-top:15px;
    margin-bottom: 20px;
  }
</style>
