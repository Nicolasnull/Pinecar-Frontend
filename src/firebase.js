import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, writeBatch, doc, runTransaction } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } from "firebase/auth";
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
//export async function replaceSchedule(scheduleId, schedule, racerList){
export async function replaceSchedule(userId, scheduleName, schedule){
    let originalSchedule = await getScheduleRaces(userId, scheduleName);
    const batch = writeBatch(db);
    // delete old schedule
    console.log("Inside Replace Schedule");
    originalSchedule.forEach((race) =>{
        let myRef = doc(db, "Users", userId, "MasterSchedules", scheduleName, "Schedule", race.dbId);
        batch.delete(myRef);
    });

    // save new schedule
    // Need to use counter for ID so Schedule saves in the correct order
    let counter = 0;
    schedule.forEach((race) =>{
        console.log("Races", race)
        counter++;
        // second parameter in doc is the id that we are going to use
        // leaving it blank will create an auto generated id
        // since we want to keep the races in the correct order, we are going to use the counter
        let myNewRef = doc(collection(db, "Users", userId, "MasterSchedules", scheduleName, "Schedule"),padId(counter));
        let racerScores = [];
        race.forEach(() =>
        {
            racerScores.push(0);
        });    
        console.log(race);
        batch.set(myNewRef, { racerIds: race, racerScores: racerScores});
    });
    
    await batch.commit();
}
function padId(intId){
    let stringId = ""+intId;
    while(stringId.length<5){
        stringId="0"+stringId
    }
    return stringId;
}

export async function getScheduleRaces(userId, scheduleName){
    let schedule = [];
    try{
        const query = await getDocs(collection(db, "Users", userId, "MasterSchedules", scheduleName, "Schedule"));
    
        query.forEach((doc)=> {
            let race = doc.data();
            race.dbId = doc.id;
            schedule.push(race);
        });
    } catch(e){
        console.log("No schedule");
    }
    return schedule;
}

export async function updateScore(userId, scheduleName, raceIndex, newRaceInfo){
    // get old race info
    let oldRaceInfo = (await getScheduleRaces(userId, scheduleName))[raceIndex];
    
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
                let racerRef = doc(db, "Users", userId, "MasterSchedules", scheduleName, "Racers", racer); 
                let newScore = await (await transaction.get(racerRef)).data().score+delta[i];
                racerRefs.push(racerRef);
                newScores.push(newScore);
            }
            for(let i = 0; i < newRaceInfo.racerIds.length; i++){
                transaction.update(racerRefs[i], {score: newScores[i]});
            }
            
            // update Schedule scores
            let scheduleRef = doc(db, "Users", userId, "MasterSchedules", scheduleName, "Schedule", ""+padId(raceIndex+1)); 
            transaction.update(scheduleRef, {racerScores: newRaceInfo.racerScores});
        });
    }
    catch(e){
        console.log("Transaction failed: ", e);
        alert("Scores not updated!!!");
    }
    
}
export const auth = getAuth();

export async function loginWithEmailAndPassword(email, password){
    await setPersistence(auth, browserSessionPersistence);
    return (await signInWithEmailAndPassword(auth, email, password)).user;
}

export async function forgotPasswordEmail(email){
    await sendPasswordResetEmail(auth,email);
}

export async function createUser(email,password){
    return (await createUserWithEmailAndPassword(auth, email, password)).user
}
export async function logOut(){
    if(auth.user!==""){
        await signOut(auth);
    }
    
}

export async function addScheduleName(userId, newName, namesArr){
    if(!namesArr.includes(newName)){
        namesArr.push(newName);
        await setDoc(doc(db,"Users", userId), {Names: namesArr});
    } 
}