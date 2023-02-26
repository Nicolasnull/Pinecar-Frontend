import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc,  writeBatch, doc, runTransaction } from "firebase/firestore";

const config= {
    apiKey: "AIzaSyC7nygfHugm6ynTHRcNM3XSxmtXy85wrg0",
    authDomain: "pine-care-derby.firebaseapp.com",
    projectId: "pine-care-derby",
    storageBucket: "pine-care-derby.appspot.com",
    messagingSenderId: "55090232340",
    appId: "1:55090232340:web:1f1a866e83463647a0bb01",
    measurementId: "G-BB7TBNHDCJ"
  };

const firebaseApp = initializeApp(config);
export const db = getFirestore(firebaseApp)

// CRUD Functions


/* ---RACER--- */
// Update/Create Racers 
export async function updateAllRacers(racersId, newList, removedRacers){
    // create batch to update racer if already in collection
    // also add racer if not already in db
    const batch = writeBatch(db);
    for(let i = 0; i < newList.length; i++){
        if(newList[i].dbId === undefined){
            // gets autogenerated ref
            let myNewRef = doc(collection(db, "MasterRacers", racersId, "Racers"));
            batch.set(myNewRef, { name: newList[i].name, id: newList[i].id, score: newList[i].score });
        }
        else{
            const myRef = doc(db, "MasterRacers", racersId, "Racers", newList[i].dbId);
            batch.update(myRef, { name: newList[i].name, id: newList[i].id, score: newList[i].score });
        }
    }
    for(let i = 0; i < removedRacers.length; i++){
        if(removedRacers[i].dbId === undefined) continue;

        let myRemRef = doc(db, "MasterRacers", racersId, "Racers", removedRacers[i].dbId);
        batch.delete(myRemRef);
    }
    
    await batch.commit();
}

export async function getAllRacers(racersId){
    const query = await getDocs(collection(db, "MasterRacers", racersId, "Racers"));
    let allRacers = [];
    let allRacersMap = new Map();
    query.forEach((doc)=> {
        let racer = doc.data();
        allRacersMap.set(doc.id, racer);
        racer.dbId = doc.id;
        allRacers.push(racer);
    });

    return {
        array: allRacers,
        map: allRacersMap
    };
}

/* ---Schedule--- */
// Create 
export async function replaceSchedule(scheduleId, schedule, racerList){
    let originalSchedule = await getScheduleRaces(scheduleId);
    const batch = writeBatch(db);
    let racerListRef = doc(db,"MasterSchedules",scheduleId);
    batch.set(racerListRef, {RacerList: racerList, Name: "OG Test Race"})

    // delete old schedule
    originalSchedule.forEach((race) =>{
        let myRef = doc(db, "MasterSchedules", scheduleId, "Races", race.dbId);
        batch.delete(myRef);
    });

    // save new schedule
    // Need to use counter for ID so Schedule saves in the correct order
    let counter = 0;
    schedule.forEach((race) =>{
        counter++;
        // second parameter in doc is the id that we are going to use
        // leaving it blank will create an auto generated id
        // since we want to keep the races in the correct order, we are going to use the counter
        let myNewRef = doc(collection(db, "MasterSchedules", scheduleId, "Races"),("" + counter));
        let racerScores = [];
        race.forEach(() =>
        {
            racerScores.push(0);
        });    
        batch.set(myNewRef, { racerIds: race, racerScores: racerScores});
    });
    await batch.commit();
}

export async function getScheduleRaces(scheduleId){
    const query = await getDocs(collection(db, "MasterSchedules", scheduleId, "Races"));
    let schedule = [];
    query.forEach((doc)=> {
        let race = doc.data();
        race.dbId = doc.id;
        schedule.push(race);
    });
    return schedule;
}
export async function getScheduleNameAndRacerList(scheduleId){
    let docRef = doc(db,"MasterSchedules",scheduleId);
    let returnObject = (await getDoc(docRef)).data();
    return {Name: returnObject.Name, RacerList: returnObject.RacerList}
}

export async function updateScore(scheduleId, racerListId, raceIndex, newRaceInfo){
    // get old race info
    let oldRaceInfo = (await getScheduleRaces(scheduleId))[raceIndex];
    
    // calculate delta
    let delta = [];
    for(let i = 0; i < newRaceInfo.racerIds.length; i++)
    {
        delta.push(newRaceInfo.racerScores[i]-oldRaceInfo.racerScores[i]);
    }

    // apply new scores to database (do it in transaction so to avoid race conditions)
    try{
        await runTransaction(db, async (transaction)=>
        {
            let racerRefs = [];
            let newScores = [];
            // update Racer Scores
            for(let i = 0; i < newRaceInfo.racerIds.length; i++){
                let racer = newRaceInfo.racerIds[i];
                let racerRef = doc(db, "MasterRacers", racerListId, "Racers", racer); 
                let newScore = await (await transaction.get(racerRef)).data().score+delta[i];
                racerRefs.push(racerRef);
                newScores.push(newScore);
            }
            for(let i = 0; i < newRaceInfo.racerIds.length; i++){
                transaction.update(racerRefs[i], {score: newScores[i]});
            }
            
            // update Schedule scores
            let scheduleRef = doc(db, "MasterSchedules", scheduleId, "Races", ""+(raceIndex+1)); 
            transaction.update(scheduleRef, {racerScores: newRaceInfo.racerScores});
        });
    }
    catch(e){
        console.log("Transaction failed: ", e);
        alert("Scores not updated!!!");
    }
    
}