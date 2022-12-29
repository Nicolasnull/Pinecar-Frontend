<template>
  <v-app>
    <v-card>
      <v-row>
        <v-col>
          <h1>Schedule</h1>
        </v-col>
        <v-col>
          <v-btn 
            v-on:click="toHome"
            fab
            text
            color="grey darken-2"
          >
            <v-icon large>
              mdi-home
            </v-icon>
        </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <br>
    <v-card 
      class="my-card"
      elevation="5"
    >
      <v-form v-model="valid">
        <v-card
          class="my-row"
          elevation="2"
        >
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
        <hr class="thick-boy-line" />
        <div v-for="(racer, i) in racers" :key="i">
          <v-card
            class="my-row"
            elevation="2"
          >
            <v-row>
              <v-col sm="2">
                <v-text-field
                  v-model="racer.racerId"
                  :rules="racerIdRules"
                  label="Number"
                >
                </v-text-field>
              </v-col>
              <v-col sm="8">
                <v-text-field
                  v-model="racer.racerName"
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
          <v-col cols="0" sm="6" md="8"></v-col>
          <v-col sm="3" md="2">
            <v-btn
              color="error"
              v-on:click="toHome()"
            >
              Cancel
            </v-btn>
          </v-col>
          <v-col sm="3" md="2">
            <v-btn
              color="success"
              type="submit"
              :disabled="!valid"
              v-on:click="createSchedule()"
            >
              Accept
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-app>
</template>

<script>
import router from "@/router/index.js";
export default {
  name: "Schedule",
  components: {
  },
  data: ()=> ({
    numRacesRules: [
      v => v !="" || "Number of races is required.",
      v => Number.isInteger(+v) || "Value must be a number." ,
    ],
    racerNameRules: [
      v => v !="" || "Racer id is required.",
      v => v.length < 3 || "Can only have a racer id of length 2 or less."
    ],
    racerIdRules: [
      v => v !="" || "Field is required."
    ],
    valid: false,
    numRaces: "",
    racers:[{racerId: "", racerName: ""}],
  }),
  created() {

  },
  methods: {
    toHome() {
      router.push({
        path: "/",
      });
    },
    addRacer(){
      this.racers.push({racerId: "", racerName: ""});
    }, 
    removeRacer(index){
      this.racers.splice(index,1);
    },
    createSchedule(){
      console.log("accepted");
    },
  },
};
</script>

<style>
  .my-card{
    margin-left:2.5%;
    margin-right:2.5%;
  }
  .my-row{
    padding-left:2.5%;
    padding-right:2.5%;
    margin-left:2.5%;
    margin-right:2.5%;
    margin-top:15px;
    margin-bottom: 20px;
  }
  .thick-boy-line{
    border:0;
    border-top: 2px solid rgb(146, 146, 146)
  }
</style>
