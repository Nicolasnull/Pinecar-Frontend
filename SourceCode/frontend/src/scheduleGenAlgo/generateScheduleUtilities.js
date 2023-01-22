// copied into generateSchedule.js
function getMinDiagonal(matrix,skipIndex){
    let minIndex = -1;
    for (let i = 0; i < matrix.length; i++){
        if(!skipIndex.includes(i)){
            if(minIndex == -1 || matrix[i][i] < matrix[minIndex][minIndex]){
                minIndex=i
            }
        }
    }
}

function getMinDiagonal(matrix,skipIndex){
    let minIndex = -1;
    for (let i = 0; i < matrix.length; i++){
        if(!skipIndex.includes(i)){
            if(minIndex == -1 || matrix[i][i] < matrix[minIndex][minIndex]){
                minIndex=i;
            }
        }
    }
}

function getMaxDiagonal(matrix,skipIndex){
    let maxIndex = -1;
    for (let i = 0; i < matrix.length; i++){
        if(!skipIndex.includes(i)){
            if(ma>Index == -1 || matrix[i][i] > matrix[maxIndex][maxIndex]){
                maxIndex=i;
            }
        }
    }
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

function addRacerToMatrix(r1, r2, r3, r4, matrix){
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
    let maxIndex = getMaxDiagonal(matrix);
    let maxIndexes = [];

    for(let i = 0; i < matrix.length; i++){
        if(matrix[i][i] == matrix[maxIndex][maxIndex]){
            maxIndexes.push(i);
        }
    }
    return maxIndexes;
}

function stealFromPreviousRace(matrix, schedule, lastRace){
    let scheduleLen = schedule.length;
    if(lastRace.length == 1){
        removeRacersFromMatrix(schedule[scheduleLen-2][0],schedule[scheduleLen-2][1],schedule[scheduleLen-2][2],schedule[scheduleLen-2][3],matrix);
        removeRacersFromMatrix(schedule[scheduleLen-1][0],schedule[scheduleLen-1][1],schedule[scheduleLen-1][2],schedule[scheduleLen-1][3],matrix);
    
        let tempStolen = schedule[scheduleLen-2].pop();
        while(lastRace.includes(tempStolen)){
            schedule[scheduleLen-2].unshift(tempStolen);
            tempStolen = schedule[scheduleLen-2].pop();
        }
        lastRace.push(tempStolen);
        tempStolen = schedule[scheduleLen-1].pop();

        while(lastRace.includes(tempStolen)){
            schedule[scheduleLen-1].unshift(tempStolen);
            tempStolen = schedule[scheduleLen-1].pop();
        }

        lastRace.push(tempStolen);
        schedule.append(lastRace);

        addRacerToMatrix(schedule[scheduleLen-3][0],schedule[scheduleLen-3][1],schedule[scheduleLen-3][2],schedule[scheduleLen-3][2],-1,matrix);
        addRacerToMatrix(schedule[scheduleLen-2][0],schedule[scheduleLen-2][1],schedule[scheduleLen-2][2],schedule[scheduleLen-2][2],-1,matrix);
        addRacerToMatrix(schedule[scheduleLen-1][0],schedule[scheduleLen-1][1],schedule[scheduleLen-1][2],schedule[scheduleLen-1][2],-1,matrix);
    }
    else if (lastRace.length == 2) {
        removeRacersFromMatrix(schedule[scheduleLen-1][0],schedule[scheduleLen-1][1],schedule[scheduleLen-1][2],schedule[scheduleLen-1][3],matrix);
        tempStolen = schedule[scheduleLen-1].pop();
        while(lastRace.includes(tempStolen)){
            schedule[scheduleLen-1].unshift(tempStolen);
            tempStolen = schedule[scheduleLen-1].pop();
        }

        lastRace.append(tempStolen);
        schedule.append(lastRace);

        addRacerToMatrix(schedule[scheduleLen-2][0],schedule[scheduleLen-2][1],schedule[scheduleLen-2][2],schedule[scheduleLen-2][2],-1,matrix);
        addRacerToMatrix(schedule[scheduleLen-1][0],schedule[scheduleLen-1][1],schedule[scheduleLen-1][2],schedule[scheduleLen-1][2],-1,matrix);
    }
}

function getStatsFromSchedule(schedule, numRacers){
    let matrix = [];
    for(let i = 0; i < numRacers; i++){
        let temp = [];
        for(let j = 0; j < numRacers; j++){
            temp.push(0);
        }
        matrix.append(temp);
    }

    let twoRacesInARow=0;
    for(let i = 0; i < schedule.length; i++){
        let race = schedule[i];
        if(race.length == 4){
            addRacerToMatrix(race[0],race[1],race[2],race[3],matrix);
        }
        else{
            addRacerToMatrix(race[0],race[1],race[2],-1,matrix);
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
    for(let i = 0; i < maxNumMatchup; i++){
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