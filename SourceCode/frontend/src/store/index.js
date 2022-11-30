import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // socket stuff

    //Scorers
    Scorers: {
      schedule: [],
      currentRaceId: null,
      currentRaceRacers: [],
      currentRaceScores: [],
    },
  },
  mutations: {
    // Scorers
    updateSchedule(state, { schedule }) {
      state.Scorers.schedule = schedule;
    },
    updateCurrentRace(
      state,
      { currentRaceId, currentRaceRacers, currentRaceScores }
    ) {
      state.Scorers.currentRaceId = currentRaceId;
      state.Scorers.currentRaceRacers = currentRaceRacers;
      state.Scorers.currentRaceScores = currentRaceScores;
    },
  },
  getters: {},
  actions: {
    //Scorers
    async getFullSchedule() {
      let mySchedule = [
        { raceId: 1, racers: [1, 2, 3, 4], scores: [0, 0, 0, 0] },
        { raceId: 2, racers: [2, 3, 4, 1], scores: [0, 0, 0, 0] },
        { raceId: 3, racers: [3, 4, 1, 2], scores: [0, 0, 0, 0] },
        { raceId: 4, racers: [4, 1, 2, 3], scores: [0, 0, 0, 0] },
      ];
      this.commit("updateSchedule", { schedule: mySchedule });
      this.commit("updateCurrentRace", {
        currentRaceId: 1,
        racers: [1, 2, 3, 4],
        scores: [0, 0, 0, 0],
      });
    },
  },
});
