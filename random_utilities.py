from operator import indexOf


def print_matrix(matrix):
    """
    displays the 2D matrix in an easier to read format
    
    Parameters:
        matrix: (2D int array) matrix to print
    """
    for row in matrix:
        print(row)
        

def get_min_diagonal(matrix,skip_index=[]):
    """
    gets the min index of the diagonal of a matrix (diagonals representing the total number of times that racer has raced thus far)
    
    Parameters:
        matrix: (2D int array) matrix to get min diagonal
        skip_index: (OPTIONAL) (1D int array) indexes to skip 
        
    Returns:
        index of the min excluding the skipped indexes
    """
    min_index = -1
    for i in range(len(matrix)):
        if i not in skip_index:
            if min_index == -1 or matrix[i][i] < matrix[min_index][min_index]:
                min_index=i
            
    return min_index


def get_max_diagonal(matrix,skip_index=[]):
    """
    gets the max index of the diagonal of a matrix (diagonals representing the total number of times that racer has raced thus far)
    
    Parameters:
        matrix: (2D int array) matrix to get min diagonal
        skip_index: (OPTIONAL) (1D int array) indexes to skip 
        
    Returns:
        index of the max excluding the skipped indexes
    """
    max_index = -1
    for i in range(len(matrix)):
        if i not in skip_index:
            if max_index == -1 or matrix[i][i] > matrix[max_index][max_index]:
                max_index=i
            
    return max_index


def get_min_row(matrix, already_racing=[]):
    """Finds the row of the racer that would has the minimum 
    number of combined races with the other racers in the race

    Args:
        matrix (2D Match-ups): matrix that represents the number of times 2 racers face each other in the schedule
        already_racing (list, optional): 1D array containing the racers already in the current race. Defaults to [].

    Returns:
        int: the index of the racer that is has the minimum number of match-ups with the racers in already_racing
    """
    min_index = -1
    min_value = 999
    for i in range(len(matrix)):
        if i in already_racing:
            continue
        temp_col_total=0
        for racer in already_racing:
            temp_col_total = temp_col_total + matrix[racer][i]
            
        if (min_index != -1 and temp_col_total == min_value and matrix[i][i] < matrix[min_index][min_index]) or temp_col_total < min_value:
            min_index = i
            min_value = temp_col_total
    
    return min_index


def add_racers_to_matrix(r1,r2,r3,r4,matrix):
    """
    Adds the racers to the matrix based on the match ups they face
    
    Parameters:
        r1: index of racer 1
        r2: index of racer 2
        r3: index of racer 3
        r4: index of racer 4, if -1 then do 3 racer addition
        matrix: 2D matrix of match ups 
    """
    # these could be nested for loops...
    if r4 != -1:
        matrix[r1][r1] = matrix[r1][r1]+1
        matrix[r2][r2] = matrix[r2][r2]+1
        matrix[r3][r3] = matrix[r3][r3]+1
        matrix[r4][r4] = matrix[r4][r4]+1
        matrix[r1][r2] = matrix[r1][r2]+1
        matrix[r2][r1] = matrix[r2][r1]+1
        matrix[r1][r3] = matrix[r1][r3]+1
        matrix[r3][r1] = matrix[r3][r1]+1
        matrix[r1][r4] = matrix[r1][r4]+1
        matrix[r4][r1] = matrix[r4][r1]+1
        matrix[r2][r3] = matrix[r2][r3]+1
        matrix[r3][r2] = matrix[r3][r2]+1
        matrix[r2][r4] = matrix[r2][r4]+1
        matrix[r4][r2] = matrix[r4][r2]+1
        matrix[r3][r4] = matrix[r3][r4]+1
        matrix[r4][r3] = matrix[r4][r3]+1
    else:
        matrix[r1][r1] = matrix[r1][r1]+1
        matrix[r2][r2] = matrix[r2][r2]+1
        matrix[r3][r3] = matrix[r3][r3]+1
        matrix[r1][r2] = matrix[r1][r2]+1
        matrix[r2][r1] = matrix[r2][r1]+1
        matrix[r1][r3] = matrix[r1][r3]+1
        matrix[r3][r1] = matrix[r3][r1]+1
        matrix[r2][r3] = matrix[r2][r3]+1
        matrix[r3][r2] = matrix[r3][r2]+1
    
    
def remove_racers_from_matrix(r1,r2,r3,r4,matrix):
    """
    Removes the racers from the matrix based on the match ups they face
    
    Parameters:
        r1: index of racer 1
        r2: index of racer 2
        r3: index of racer 3
        r4: index of racer 4
        matrix: 2D matrix of match ups 
    """
    # this could be a nested for loop...
    matrix[r1][r1] = matrix[r1][r1]-1
    matrix[r2][r2] = matrix[r2][r2]-1
    matrix[r3][r3] = matrix[r3][r3]-1
    matrix[r4][r4] = matrix[r4][r4]-1
    matrix[r1][r2] = matrix[r1][r2]-1
    matrix[r2][r1] = matrix[r2][r1]-1
    matrix[r1][r3] = matrix[r1][r3]-1
    matrix[r3][r1] = matrix[r3][r1]-1
    matrix[r1][r4] = matrix[r1][r4]-1
    matrix[r4][r1] = matrix[r4][r1]-1
    matrix[r2][r3] = matrix[r2][r3]-1
    matrix[r3][r2] = matrix[r3][r2]-1
    matrix[r2][r4] = matrix[r2][r4]-1
    matrix[r4][r2] = matrix[r4][r2]-1
    matrix[r3][r4] = matrix[r3][r4]-1
    matrix[r4][r3] = matrix[r4][r3]-1  
    
def is_diagonal_equal(matrix):
    """checks to see if all racers have participated in an equal number of races

    Args:
        matrix (2D Match-ups): matrix that represents the number of times 2 racers face each other in the schedule

    Returns:
        bool: True if all numbers on the diagonal are the same
    """
    for i in range(len(matrix)):
        if matrix[i][i] != matrix[0][0]:
            return False
    return True


def get_all_min_on_diagonal(matrix):
    """Gets a list of racer's indexes that are the minimum value

    Args:
        matrix (2D Match-ups): matrix that represents the number of times 2 racers face each other in the schedule

    Returns:
        1D array of integers: List of racers with the minimum number of races
    """
    min_index = get_min_diagonal(matrix)
    min_indexes = []
    for i in range(len(matrix)):
        if matrix[i][i] == matrix[min_index][min_index]:
            min_indexes.append(i)
            
    return min_indexes

def get_all_max_on_diagonal(matrix):
    """Gets a list of racer's indexes that are the maximum value

    Args:
        matrix (2D Match-ups): matrix that represents the number of times 2 racers face each other in the schedule

    Returns:
        1D array of integers: List of racers with the maximum number of races
    """
    max_index = get_max_diagonal(matrix)
    max_indexes = []
    for i in range(len(matrix)):
        if matrix[i][i] == matrix[max_index][max_index]:
            max_indexes.append(i)
            
    return max_indexes


def steal_from_previous_race(matrix, schedule, last_race):
    """Takes racers from previous races and adding them to the last race
    If the last race only has 1, will need to steal from the past 2 races to make a total of 3 races of 3 racers
    If the last race has 2 racers, will only need to steal from 1 race to make a total of 2 races of 2 racers

    Args:
        matrix (2D Match-ups): matrix that represents the number of times 2 racers face each other in the schedule
        schedule (2D schedule): schedule of races 
        last_race (1D array): last race
    """
    if len(last_race) == 1:
        # steal from last 2
        remove_racers_from_matrix(schedule[-2][0],schedule[-2][1],schedule[-2][2],schedule[-2][3],matrix)
        remove_racers_from_matrix(schedule[-1][0],schedule[-1][1],schedule[-1][2],schedule[-1][3],matrix)
        
        temp_stolen = schedule[-2].pop()
        
        while(temp_stolen in last_race):
            schedule[-2].insert(0,temp_stolen)
            temp_stolen = schedule[-2].pop()
        
        last_race.append(temp_stolen)
        
        temp_stolen = schedule[-1].pop()
        
        while(temp_stolen in last_race):
            schedule[-1].insert(0,temp_stolen)
            temp_stolen = schedule[-1].pop()
        
        last_race.append(temp_stolen)
        schedule.append(last_race)
        
        add_racers_to_matrix(schedule[-3][0],schedule[-3][1],schedule[-3][2],-1,matrix)
        add_racers_to_matrix(schedule[-2][0],schedule[-2][1],schedule[-2][2],-1,matrix)
        add_racers_to_matrix(schedule[-1][0],schedule[-1][1],schedule[-1][2],-1,matrix)
        
    elif len(last_race) == 2:
        #steal from 1
        remove_racers_from_matrix(schedule[-1][0],schedule[-1][1],schedule[-1][2],schedule[-1][3],matrix)
        temp_stolen = schedule[-1].pop()
        
        while(temp_stolen in last_race):
            schedule[-1].insert(0,temp_stolen)
            temp_stolen = schedule[-1].pop()
        
        last_race.append(temp_stolen)
        schedule.append(last_race)
        
        add_racers_to_matrix(schedule[-2][0],schedule[-2][1],schedule[-2][2],-1,matrix)
        add_racers_to_matrix(schedule[-1][0],schedule[-1][1],schedule[-1][2],-1,matrix)
        
        
def get_stats_from_matrix(matrix):
    """Gets some stats about the races based on the matrix

    Args:
        matrix (2D Match-ups): matrix that represents the number of times 2 racers face each other in the schedule

    Returns:
        int: number of races for each racer
        int: the max number of match-ups of a pair of racers
        int: the min number of match-ups of a pair of racers
        list: list representing the number of pairs of racers for each number of match-ups
    """
    num_race_per_car = matrix[0][0]
    max_num_matchup = -1
    min_num_matchup = 999
    
    matrix_dimensions = len(matrix)
    for i in range(matrix_dimensions):
        for j in range(i+1,matrix_dimensions):
            if matrix[i][j] > max_num_matchup:
                max_num_matchup = matrix[i][j]
            if matrix[i][j] < min_num_matchup:
                min_num_matchup = matrix[i][j]
    
    total_num_matchup_list = [0] * (max_num_matchup+1)
    for i in range(matrix_dimensions):
        for j in range(i+1,matrix_dimensions):
            total_num_matchup_list[matrix[i][j]] = total_num_matchup_list[matrix[i][j]] + 1
    
    
    
    return num_race_per_car, max_num_matchup, min_num_matchup, total_num_matchup_list
   
   
def possible_swap(lane_matrix, race_arr, current_racer, target):
    """Loops through a race and assigns scores to swapping each index with the current racer.
    Will return the highest scoring swap (The higher the score, the better the swap is for equalizing the lanes)

    Args:
        lane_matrix (2D array): Matrix keeping track of the number of times each racer appears in each lane
        race_arr (2D arr): List of racers in the current race
        current_racer (int): racer that we are using to swap lanes
        target (int): The goal number of times each racer should appear in each lane

    Returns:
        int: Highest score possible for this race
        int: the first lane of which should be swapped
        int: the second lane of which should be swapped
    """
    current_racer_index = race_arr.index(current_racer)
    best_heuristic = 0
    lane1 = -1
    lane2 = -1
    for racer_index, racer in enumerate(race_arr):
        if racer is current_racer:
            continue
        temp_heuristic = calculate_heuristic(lane_matrix, current_racer, current_racer_index, racer, racer_index, target)
        if temp_heuristic > best_heuristic:
            best_heuristic = temp_heuristic
            lane1 = racer_index
            lane2 = current_racer_index
    return best_heuristic, lane1, lane2
            
def calculate_heuristic(lane_matrix, car1_index, car1_lane, car2_index, car2_lane, target):
    """Calculates the score of swapping 2 racers within a race
    The goal is to get each racer's lane appearance as close to the target parameter
    The overall score is calculated by subtracting the current score and the new score
    The score for each lane and racer combo would be added together
    this includes racer1 and its current lane, racer1 and the lane it would be swapped to, and the same for racer 2
    these are subtracted from the target (how far away from the end goal are they) and then squared
    squaring does 2 things:
         1) keeps all distances from the goal positive
         2) prioritizes fixing appearances in races that are far from the goal
    If the overall score is negative, that particular swap actually obtained a worse score than before
    If the overall score is positive, that particular swap helped get the lanes closer to the goal
    If the overall score is 0, there was no benefit to the swap
    
    Args:
        lane_matrix (2D array): Matrix keeping track of the number of times each racer appears in each lane
        car1_index (int): racer 1
        car1_lane (int): the lane racer 1 is in for this particular race
        car2_index (int): racer 2
        car2_lane (int): the lane racer 2 is in for this particular race
        target (int): The goal number of times each racer should appear in each lane

    Returns:
        int: the score of this swap
    """
    current_state = (lane_matrix[car1_index][car1_lane] - target)**2 + (lane_matrix[car1_index][car2_lane] - target)**2 + (lane_matrix[car2_index][car2_lane] - target)**2 + (lane_matrix[car2_index][car1_lane] - target)**2
    new_state = (lane_matrix[car1_index][car1_lane] - target - 1)**2 + (lane_matrix[car1_index][car2_lane] - target + 1)**2 + (lane_matrix[car2_index][car2_lane] - target - 1)**2 + (lane_matrix[car2_index][car1_lane] - target + 1)**2
    return current_state - new_state

def racer_swap(schedule, lane_matrix, race_index, car1_index, car2_index):
    """Swaps 2 racers that are in the <race_index> race
    Will swap them in the schedule and update the lane_matrix

    Args:
        schedule (2D Array): The current schedule
        lane_matrix (2D array): Matrix keeping track of the number of times each racer appears in each lane
        race_index (int): the index of the race stored in schedule
        car1_index (int): the lane of car 1
        car2_index (int): the lane of car 2
    """
    car1 = schedule[race_index][car1_index]
    car2 = schedule[race_index][car2_index]
    
    lane_matrix[car1][car1_index] = lane_matrix[car1][car1_index] - 1
    lane_matrix[car1][car2_index] = lane_matrix[car1][car2_index] + 1
    lane_matrix[car2][car1_index] = lane_matrix[car2][car1_index] + 1
    lane_matrix[car2][car2_index] = lane_matrix[car2][car2_index] - 1
    
    schedule[race_index][car1_index] = car2
    schedule[race_index][car2_index] = car1
    
def contains_same_racer(race1, race2):
    """Checks to see if race1 and race 2 contain any of the same racers

    Args:
        race1 (1D array): list of the indexes of racers in race 1
        race2 (1D array): list of the indexes of racers in race 2

    Returns:
        bool: True if they contain any of the same racers, else False
    """
    for racer in race1:
        if racer in race2:
            return True
    return False
    
if __name__ == "__main__":
    steal_from_previous_race([[4,4,4,4],[4,4,4,4],[4,4,4,4],[4,4,4,4]],[[0,1,2,3],[1,2,3,0],[2,3,0,1],[3,0,1,2]],[1,3])