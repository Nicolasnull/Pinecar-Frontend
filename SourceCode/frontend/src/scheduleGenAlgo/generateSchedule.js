// translated from random_utilities.py
function getMinDiagonal(matrix,skipIndex){
    let minIndex = -1;
    for (let i = 0; i < matrix.length; i++){
        if(!skipIndex.includes(i)){
            if(minIndex == -1 || matrix[i][i] < matrix[minIndex][minIndex]){
                minIndex=i
            }
        }
    }
    return minIndex;
}

function getMaxDiagonal(matrix,skipIndex){
    let maxIndex = -1;
    for (let i = 0; i < matrix.length; i++){
        if(!skipIndex.includes(i)){
            if(maxIndex == -1 || matrix[i][i] > matrix[maxIndex][maxIndex]){
                maxIndex=i;
            }
        }
    }
    return maxIndex;
}

function getMinRow(matrix, alreadyRacing){
    let minIndex = -1;
    let minValue=Number.MAX_SAFE_INTEGER;
    for(let i=0; i < matrix.length; i++){
        if(alreadyRacing.includes(i)) continue;

        let tempColTotal = 0;
        for(let j=0; j < alreadyRacing.length;j++){
            tempColTotal += matrix[alreadyRacing[j]][i];
        }

        if((minIndex != -1 && tempColTotal == minValue && matrix[i][i] < matrix[minIndex][minIndex]) || tempColTotal < minValue){
            minIndex = i;
            minValue = tempColTotal;
        }
    }
    return minIndex;
}

function addRacersToMatrix(r1, r2, r3, r4, matrix){
    if(r4 != -1){
        matrix[r1][r1] = matrix[r1][r1]+1;
        matrix[r2][r2] = matrix[r2][r2]+1;
        matrix[r3][r3] = matrix[r3][r3]+1;
        matrix[r4][r4] = matrix[r4][r4]+1;
        matrix[r1][r2] = matrix[r1][r2]+1;
        matrix[r2][r1] = matrix[r2][r1]+1;
        matrix[r1][r3] = matrix[r1][r3]+1;
        matrix[r3][r1] = matrix[r3][r1]+1;
        matrix[r1][r4] = matrix[r1][r4]+1;
        matrix[r4][r1] = matrix[r4][r1]+1;
        matrix[r2][r3] = matrix[r2][r3]+1;
        matrix[r3][r2] = matrix[r3][r2]+1;
        matrix[r2][r4] = matrix[r2][r4]+1;
        matrix[r4][r2] = matrix[r4][r2]+1;
        matrix[r3][r4] = matrix[r3][r4]+1;
        matrix[r4][r3] = matrix[r4][r3]+1;
    }
    else{
        matrix[r1][r1] = matrix[r1][r1]+1;
        matrix[r2][r2] = matrix[r2][r2]+1;
        matrix[r3][r3] = matrix[r3][r3]+1;
        matrix[r1][r2] = matrix[r1][r2]+1;
        matrix[r2][r1] = matrix[r2][r1]+1;
        matrix[r1][r3] = matrix[r1][r3]+1;
        matrix[r3][r1] = matrix[r3][r1]+1;
        matrix[r2][r3] = matrix[r2][r3]+1;
        matrix[r3][r2] = matrix[r3][r2]+1;
    }
}

function removeRacersFromMatrix(r1,r2,r3,r4,matrix){
    matrix[r1][r1] = matrix[r1][r1]-1;
    matrix[r2][r2] = matrix[r2][r2]-1;
    matrix[r3][r3] = matrix[r3][r3]-1;
    matrix[r4][r4] = matrix[r4][r4]-1;
    matrix[r1][r2] = matrix[r1][r2]-1;
    matrix[r2][r1] = matrix[r2][r1]-1;
    matrix[r1][r3] = matrix[r1][r3]-1;
    matrix[r3][r1] = matrix[r3][r1]-1;
    matrix[r1][r4] = matrix[r1][r4]-1;
    matrix[r4][r1] = matrix[r4][r1]-1;
    matrix[r2][r3] = matrix[r2][r3]-1;
    matrix[r3][r2] = matrix[r3][r2]-1;
    matrix[r2][r4] = matrix[r2][r4]-1;
    matrix[r4][r2] = matrix[r4][r2]-1;
    matrix[r3][r4] = matrix[r3][r4]-1;
    matrix[r4][r3] = matrix[r4][r3]-1; 
}

function isDiagonalEqual(matrix){
    for(let i = 0; i < matrix.length; i++){
        if(matrix[i][i] != matrix[0][0]){
            return false;
        }
    }
    return true;
}

function getAllMinOnDiagonal(matrix){
    let minIndex = getMinDiagonal(matrix);
    let minIndexes = [];

    for(let i = 0; i < matrix.length; i++){
        if(matrix[i][i] == matrix[minIndex][minIndex]){
            minIndexes.push(i);
        }
    }
    return minIndexes;
}

function getAllMaxOnDiagonal(matrix){
    let maxIndex = getMaxDiagonal(matrix,[]);
    let maxIndexes = [];

    for(let i = 0; i < matrix.length; i++){
        if(matrix[i][i] == matrix[maxIndex][maxIndex]){
            maxIndexes.push(i);
        }
    }
    return maxIndexes;
}

function stealFromPreviousRace(matrix, schedule, lastRace){
    if(lastRace.length == 1){
        removeRacersFromMatrix(schedule[schedule.length-2][0],schedule[schedule.length-2][1],schedule[schedule.length-2][2],schedule[schedule.length-2][3],matrix);
        removeRacersFromMatrix(schedule[schedule.length-1][0],schedule[schedule.length-1][1],schedule[schedule.length-1][2],schedule[schedule.length-1][3],matrix);
    
        let tempStolen = schedule[schedule.length-2].pop();
        while(lastRace.includes(tempStolen)){
            schedule[schedule.length-2].unshift(tempStolen);
            tempStolen = schedule[schedule.length-2].pop();
        }
        lastRace.push(tempStolen);
        tempStolen = schedule[schedule.length-1].pop();

        while(lastRace.includes(tempStolen)){
            schedule[schedule.length-1].unshift(tempStolen);
            tempStolen = schedule[schedule.length-1].pop();
        }

        lastRace.push(tempStolen);
        schedule.push(lastRace);

        addRacersToMatrix(schedule[schedule.length-3][0],schedule[schedule.length-3][1],schedule[schedule.length-3][2],-1,matrix);
        addRacersToMatrix(schedule[schedule.length-2][0],schedule[schedule.length-2][1],schedule[schedule.length-2][2],-1,matrix);
        addRacersToMatrix(schedule[schedule.length-1][0],schedule[schedule.length-1][1],schedule[schedule.length-1][2],-1,matrix);
    }
    else if (lastRace.length == 2) {
        removeRacersFromMatrix(schedule[schedule.length-1][0],schedule[schedule.length-1][1],schedule[schedule.length-1][2],schedule[schedule.length-1][3],matrix);
        tempStolen = schedule[schedule.length-1].pop();
        while(lastRace.includes(tempStolen)){
            schedule[schedule.length-1].unshift(tempStolen);
            tempStolen = schedule[schedule.length-1].pop();
        }

        lastRace.push(tempStolen);
        schedule.push(lastRace);

        addRacersToMatrix(schedule[schedule.length-2][0],schedule[schedule.length-2][1],schedule[schedule.length-2][2],-1,matrix);
        addRacersToMatrix(schedule[schedule.length-1][0],schedule[schedule.length-1][1],schedule[schedule.length-1][2],-1,matrix);
    }
}

function getStatsFromSchedule(schedule, numRacers){
    let matrix = [];
    for(let i = 0; i < numRacers; i++){
        let temp = [];
        for(let j = 0; j < numRacers; j++){
            temp.push(0);
        }
        matrix.push(temp);
    }

    let twoRacesInARow=0;
    for(let i = 0; i < schedule.length; i++){
        let race = schedule[i];
        if(race.length == 4){
            addRacersToMatrix(race[0],race[1],race[2],race[3],matrix);
        }
        else{
            addRacersToMatrix(race[0],race[1],race[2],-1,matrix);
        }

        if(i>0 && containsSameRacer(race,schedule[i-1])){
            twoRacesInARow++;
        }
    }
    let lane = generateLaneMatrix(schedule,numRacers);
    let minLane = Number.MAX_SAFE_INTEGER;
    let maxLane = -1;
    for(let i = 0; i < lane.length; i++){
        for(let j = 0; j < lane[i].length; j++){
            if (lane[i][j] < minLane){
                minLane = lane[i][j];
            }
            if(lane[i][j] > maxLane){
                maxLane = lane[i][j];
            }
        }
    }
    return {
        matrix: getStatsFromMatrix(matrix),
        leastAppearancesInLane: minLane,
        mostAppearancesInLane: maxLane,
        numOfBack2BackAppearances: twoRacesInARow
    }
}

function getStatsFromMatrix(matrix){
    let numRacePerCar = matrix[0][0];
    let maxNumMatchup = -1;
    let minNumMatchup = Number.MAX_SAFE_INTEGER;

    let matrixDimensions = matrix.length;
    for(let i = 0; i < matrixDimensions; i++){
        for(let j = i+1; j < matrixDimensions; j++){
            if(matrix[i][j] > maxNumMatchup){
                maxNumMatchup = matrix[i][j];
            }
            if(matrix[i][j] < minNumMatchup){
                minNumMatchup = matrix[i][j];
            }
        }
    }

    let totalNumMatchupList = [];
    for(let i = 0; i <= maxNumMatchup; i++){
        totalNumMatchupList.push(0);
    }

    for(let i = 0; i < matrixDimensions; i++){
        for(let j = i+1; j < matrixDimensions; j++){
            totalNumMatchupList[matrix[i][j]]++;
        }
    }

    return {
        numberOfRacesPerCar: numRacePerCar,
        mostMatchUps:maxNumMatchup,
        leastMatchUps:minNumMatchup,
        matchupList:totalNumMatchupList
    }
}

function generateLaneMatrix(schedule, numRacers){
    let laneMatrix = [];
    for(let i = 0; i < numRacers; i++){
        let racer = [];
        for(let j = 0; j < schedule[0].length; j++){
            racer.push(0);
        }
        laneMatrix.push(racer);
    }

    return laneMatrix;
}

function possibleSwap(laneMatrix, raceArr, currentRacer, target){
    let currentRacerIndex = raceArr.indexOf(currentRacer);
    let bestHeuristic = 0;
    let lane1 = -1;
    let lane2 = -1;
    for(let i = 0; i < raceArr.length; i++){
        if(raceArr[i] === currentRacer){
            continue;
        }
        let tempHeuristic = calculateHeuristic(laneMatrix, currentRacer, currentRacerIndex, raceArr[i], i, target);
        if(tempHeuristic > bestHeuristic){
            bestHeuristic = tempHeuristic;
            lane1 = i;
            lane2 = currentRacerIndex;
        }
    }
    return {
        bestHeuristic: bestHeuristic,
        lane1: lane1,
        lane2: lane2
    }
}

function calculateHeuristic(laneMatrix, car1Index, car1Lane, car2Index, car2Lane, target){
    let currentState = Math.pow((laneMatrix[car1Index][car1Lane] - target), 2) + Math.pow((laneMatrix[car1Index][car2Lane] - target), 2) + Math.pow((laneMatrix[car2Index][car2Lane] - target), 2) + Math.pow((laneMatrix[car2Index][car1Lane] - target), 2)
    let newState = Math.pow((laneMatrix[car1Index][car1Lane] - target - 1), 2) + Math.pow((laneMatrix[car1Index][car2Lane] - target + 1), 2) + Math.pow((laneMatrix[car2Index][car2Lane] - target - 1), 2) + Math.pow((laneMatrix[car2Index][car1Lane] - target + 1), 2)
    return currentState - newState;
}

function racerSwap(schedule, laneMatrix, raceIndex, car1Index, car2Index){
    let car1 = schedule[raceIndex][car1Index];
    let car2 = schedule[raceIndex][car2Index];

    laneMatrix[car1][car1Index]--;
    laneMatrix[car1][car2Index]++;
    laneMatrix[car2][car1Index]++;
    laneMatrix[car2][car2Index]--;

    schedule[raceIndex][car1Index] = car2;
    schedule[raceIndex][car2Index] = car1;
}

function containsSameRacer(race1, race2){
    if(race2==undefined){
        console.log("ME");
    }
    for(let i = 0; i < race1.length; i++){
        if(race2.includes(race1[i])){
            return true;
        }
    }
    return false;
}

function swapIndexForRacerNumber(schedule, racers){
    scheduleWithActualNumbers = []

    for(let i = 0; i < schedule.length; i++){
        let temp = [];
        for(let j = 0; j < schedule[i].length; j++){
            temp.push(racers[schedule[i].carNumber]);
        }
        scheduleWithActualNumbers.push(temp);
    }
    return scheduleWithActualNumbers;
}

function getRacerById(allRacers, id){
    for(let i = 0; i < allRacers.length; i++){
        if(allRacers[i].carNumber == id){
            return allRacers[i];
        }
    }
    return -1;
}


// translated from create_schedule.py
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
        let r1 = getMinDiagonal(racerMatrix,[]);
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
        racersWithFullSchedule.push(r4);
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
    let indexOfFailures = [];
    for(let i = 0; i < schedule.length; i++){
        if(i ==0){
            continue;
        }
        if(containsSameRacer(schedule[i], schedule[i-1])){
            indexOfFailures.push(i);
        }
    }

    // No shuffling required
    if(indexOfFailures.length == 0){
        return schedule;
    }

    let schedulePieces = [];
    schedulePieces.push(schedule.slice(0, indexOfFailures[0]));

    for(let i = 0; i < indexOfFailures.length-1; i++){
        schedulePieces.push([schedule[indexOfFailures[i]]]);
        if(indexOfFailures[i+1] - indexOfFailures[i] > 1){
            schedulePieces.push(schedule.slice(indexOfFailures[i]+1, indexOfFailures[i+1]));
        }
    }

    schedulePieces.push([schedule[indexOfFailures[indexOfFailures.length-1]]]);
    let temp1 = schedule.slice(indexOfFailures[indexOfFailures.length-1]+1);
    if(temp1.length > 0){
        schedulePieces.push(temp1);
    }
    
    let changeMade = true;
    while(changeMade){
        changeMade = false;
        for(let i = 0; i < schedulePieces.length; i++){
            let piece1 = schedulePieces[i];
            if(changeMade){
                break;
            }
            for(let j = 0; j < schedulePieces.length; j++){
                if(changeMade){
                    break;
                }
                let piece2 = schedulePieces[j];
                if(i==j){
                    continue;
                }
                // top of piece1 can be attached to bottom of piece2
                if(!containsSameRacer(piece1[0], piece2[piece2.length-1])){
                    let temp = piece2.concat(piece1);
                    schedulePieces.splice(schedulePieces.indexOf(piece1),1);
                    schedulePieces.splice(schedulePieces.indexOf(piece2),1);
                    schedulePieces.push(temp);
                    changeMade = true;
                    break;
                }

                // bottom of piece1 can be attached to top of piece 2
                if(!containsSameRacer(piece1[piece1.length-1], piece2[0])){
                    let temp = piece1.concat(piece2);
                    schedulePieces.splice(schedulePieces.indexOf(piece1),1);
                    schedulePieces.splice(schedulePieces.indexOf(piece2),1);
                    schedulePieces.push(temp);
                    changeMade = true;
                    break;
                }

                // top of piece1 can be attached to top of piece2
                if(!containsSameRacer(piece1[0], piece2[0])){
                    piece2.reverse();
                    let temp = piece1.concat(piece2);
                    schedulePieces.splice(schedulePieces.indexOf(piece1),1);
                    schedulePieces.splice(schedulePieces.indexOf(piece2),1);
                    schedulePieces.push(temp);
                    changeMade = true;
                    break;
                }
                // top of piece1 can be attached to top of piece2
                if(!containsSameRacer(piece1[piece1.length-1], piece2[piece2.length-1])){
                    piece2.reverse();
                    let temp = piece2.concat(piece1);
                    schedulePieces.splice(schedulePieces.indexOf(piece1),1);
                    schedulePieces.splice(schedulePieces.indexOf(piece2),1);
                    schedulePieces.push(temp);
                    changeMade = true;
                    break;
                }

                if(piece1.length > 1){
                    for(let k = 0; k < piece1.length-1; k++){
                        if(changeMade){
                            break;
                        }
                        if(!containsSameRacer(piece1[k], piece2[0]) && !containsSameRacer(piece1[k+1], piece2[piece2.length-1])){
                            let topHalfPiece1 = piece1.slice(0,k);
                            let bottomHalfPiece1 = piece1.slice(k);
                            let temp = topHalfPiece1.concat(piece2).concat(bottomHalfPiece1);
                            schedulePieces.splice(schedulePieces.indexOf(piece1),1);
                            schedulePieces.splice(schedulePieces.indexOf(piece2),1);
                            schedulePieces.push(temp);
                            changeMade = true;
                            break;
                        }
                        if(!containsSameRacer(piece1[k], piece2[piece2.length-1]) && !containsSameRacer(piece1[k+1], piece2[0])){
                            piece2.reverse();
                            let topHalfPiece1 = piece1.slice(0,k);
                            let bottomHalfPiece1 = piece1.slice(k);
                            let temp = topHalfPiece1.concat(piece2).concat(bottomHalfPiece1);
                            schedulePieces.splice(schedulePieces.indexOf(piece1),1);
                            schedulePieces.splice(schedulePieces.indexOf(piece2),1);
                            schedulePieces.push(temp);
                            changeMade = true;
                            break;
                        }

                    }
                }
            }
        }
    }

    let newSchedule = [];
    for(let i = 0; i < schedulePieces.length; i++){
        newSchedule = newSchedule.concat(schedulePieces[i]);
    }

    return newSchedule;
}

function createSchedule(numRacers, minRaces){
    let initialScheduleObject = createInitialSchedule(numRacers, minRaces);
    equalizeRacingLanes(initialScheduleObject.schedule,numRacers,initialScheduleObject.racerMatrix[0][0]);
    return shuffleRaces(initialScheduleObject.schedule);
}


// testing
function testing(arg1, arg2){
    let object = createInitialSchedule(arg1, arg2);
    //console.log("Stats", getStatsFromMatrix(object.racerMatrix));
    //console.log("Racer Matrix",object.racerMatrix);
    equalizeRacingLanes(object.schedule, object.racerMatrix.length, object.racerMatrix[0][0]);
    //console.log("Schedule before shuffle races", object.schedule);
    let counter = 0; 
    for(let i = 0; i < object.schedule.length - 1; i++){
        if(containsSameRacer(object.schedule[i], object.schedule[i+1])){
            counter++;
        }
    }
    //console.log("Count before shuffle", counter);

    let newSchedule = shuffleRaces(object.schedule);
    counter = 0;

    for(let i = 0; i < newSchedule.length - 1; i++){
        if(containsSameRacer(newSchedule[i], newSchedule[i+1])){
            counter++;
        }
    }
    //console.log("Count After Shuffle", counter);


    let gutCheck = [];
    for(let i = 0; i < object.racerMatrix.length; i++){
        gutCheck.push(0);
    }
    for(let i = 0; i < newSchedule.length; i++){
        for(let j=0; j<newSchedule[i].length; j++){
            gutCheck[newSchedule[i][j]]++;
        }
        let set = new Set(newSchedule[i])
        if((set.size !== newSchedule[i].length)){
            console.log("THERE WAS A DUPLICATE");
        }
    }
    let sos;
    for(let i=0; i < gutCheck.length; i++){
        if(gutCheck[i] != gutCheck[0]){
            sos = "SOS THIS IS BAD";
            console.log(sos);
        }
    }

    let ogGutCheck = [];
    for(let i = 0; i < object.racerMatrix.length; i++){
        ogGutCheck.push(0);
    }
    for(let i = 0; i < object.schedule.length; i++){
        for(let j=0; j<object.schedule[i].length; j++){
            ogGutCheck[object.schedule[i][j]]++;
        }
    }
    let ogsos;
    for(let i=0; i < ogGutCheck.length; i++){
        if(ogGutCheck[i] != ogGutCheck[0]){
            ogsos = "SOS THIS IS BAD";
            console.log(ogsos);
        }
    }
}

// ALL COMBINATIONS BETWEEN 4-100 racers and between 5 and 250 races 
// at the bare minimum all race the same number of times as everyone else:)
// for(let i = 4; i < 100; i++){
//     for(let j = 5; j < 250; j++){
//         testing(i,j);
//     }
// }