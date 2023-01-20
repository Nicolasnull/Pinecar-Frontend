function createInitialSchedule(numberOfRacers, minimumNumberRaces){
    let schedule = [];
    let racerMatrix = [];

    for(let i = 0; i < numberOfRacers; i++){
        let tempArr = [];
        for(let j = 0; j < numberOfRacers; j++){
            tempArr.push(0);
        }
        racerMatrix.push(tempArr);
    }

    while(schedule.length < minimumNumberRaces){
        let r1 = getMinDiagonal(racerMatrix);
        let r2 = getMinRow(racerMatrix, [r1]);
        let r3 = getMinRow(racerMatrix, [r1,r2]);
        let r4 = getMinRow(racerMatrix, [r1,r2,r3]);

        addRacersToMatrix(r1,r2,r3,r4,racerMatrix);
        schedule.push([r1,r2,r3,r4]);
    }

    while(true){
        let racersWithFullSchedule = getAllMaxOnDiagonal(racerMatrix);
        if(racersWithFullSchedule.length == racerMatrix.length){
            break;
        }
        let r1 = getMinDiagonal(racerMatrix, racersWithFullSchedule);
        racersWithFullSchedule.push(r1);
        if(racersWithFullSchedule.length == racerMatrix.length){
            stealFromPreviousRace(racerMatrix,schedule,[r1]);
            break;
        }   
        let r2 = getMinRow(racerMatrix, racersWithFullSchedule);
        racersWithFullSchedule.push(r2);
        if(racersWithFullSchedule.length == racerMatrix.length){
            stealFromPreviousRace(racerMatrix,schedule, [r1,r2]);
            break;
        }
        let r3 = getMinRow(racerMatrix, racersWithFullSchedule);
        racersWithFullSchedule.push(r3);
        if(racersWithFullSchedule.length == racerMatrix.length){
            addRacersToMatrix(r1,r2,r3,-1,racerMatrix);
            schedule.push([r1,r2,r3]);
            break;
        }
        let r4 = getMinRow(racerMatrix, racersWithFullSchedule);
        racersWithFullSchedule.append(r4);
        if(racersWithFullSchedule.length == racerMatrix.length){
            schedule.push([r1,r2,r3,r4]);
            addRacersToMatrix(r1,r2,r3,r4,racerMatrix);
            break;
        }

        schedule.push([r1,r2,r3,r4]);
        addRacersToMatrix(r1,r2,r3,r4,racerMatrix);
    }

    return {
        schedule: schedule,
        racerMatrix: racerMatrix,
    }
}

function equalizeRacingLanes(schedule,numRacers,numRacesPerRacer){
    let laneMatrix = generateLaneMatrix(schedule, numRacers);
    let targetAppearancesPerLane = Math.floor(numRacesPerRacer / schedule[0].length);
    let changeMade = true;
    while(changeMade){
        changeMade = false;

        for(let racerIndex = 0; racerIndex < laneMatrix.length; racerIndex++){
            let maxHeuristic = -1;
            let scheduleIndex = -1;
            let laneIndex1 = -1;
            let laneIndex2 = -1;
            for(let raceIndex = 0; raceIndex < schedule.length; raceIndex++){
                let race = schedule[raceIndex];
                if(race.includes(racerIndex)){
                    let swapResult = possibleSwap(laneMatrix, race, racerIndex, targetAppearancesPerLane);
                    if(swapResult.bestHeuristic> maxHeuristic){
                        maxHeuristic = swapResult.bestHeuristic;
                        scheduleIndex = raceIndex;
                        laneIndex1 = swapResult.lane1;
                        laneIndex2 = swapResult.lane2;
                    }
                }
            }
            if(maxHeuristic > 0){
                changeMade = true;
                racerSwap(schedule, laneMatrix, scheduleIndex, laneIndex1,laneIndex2);
            }
        }
    }
    return laneMatrix;
}

function shuffleRaces(schedule){
    // You ended here :)
}