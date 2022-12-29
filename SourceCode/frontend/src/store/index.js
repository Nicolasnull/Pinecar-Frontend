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
    ScoreBoard:{
      scoreBoard:[]
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
    //Score Board
    updateScoreBoard(state, {scoreBoard}){
      state.ScoreBoard.scoreBoard=scoreBoard;
    },
  },
  getters: {},
  actions: {
    //Scorers
    async getFullSchedule() {
      let mySchedule = [
        { raceId: 1, racers: [12, 2, 3, 42], scores: [0, 0, 0, 0] },
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
    async getScoreBoard(){
      let myScoreBoard = [
        {racerNumber: 3, racerName: "Julia N.", racerScore:12, numberOfRaces: 3},
        {racerNumber: 2, racerName: "Nate N.", racerScore:9, numberOfRaces: 3},
        {racerNumber: 4, racerName: "Kate N.", racerScore:6, numberOfRaces: 3},
        {racerNumber: 1, racerName: "Nic N.", racerScore:3, numberOfRaces: 3},
      ];
      this.commit("updateScoreBoard", { scoreBoard: myScoreBoard });
    },
  },
});
