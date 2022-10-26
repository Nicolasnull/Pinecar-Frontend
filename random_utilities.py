from operator import indexOf
from xml.dom import minicompat


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
    for i in range(len(matrix)):
        if matrix[i][i] != matrix[0][0]:
            return False
    return True


def get_all_min_on_diagonal(matrix):
    min_index = get_min_diagonal(matrix)
    min_indexes = []
    for i in range(len(matrix)):
        if matrix[i][i] == matrix[min_index][min_index]:
            min_indexes.append(i)
            
    return min_indexes

def get_all_max_on_diagonal(matrix):
    max_index = get_max_diagonal(matrix)
    max_indexes = []
    for i in range(len(matrix)):
        if matrix[i][i] == matrix[max_index][max_index]:
            max_indexes.append(i)
            
    return max_indexes


def steal_from_previous_race(matrix, schedule, last_race):
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
    current_state = (lane_matrix[car1_index][car1_lane] - target)**2 + (lane_matrix[car1_index][car2_lane] - target)**2 + (lane_matrix[car2_index][car2_lane] - target)**2 + (lane_matrix[car2_index][car1_lane] - target)**2
    new_state = (lane_matrix[car1_index][car1_lane] - target - 1)**2 + (lane_matrix[car1_index][car2_lane] - target + 1)**2 + (lane_matrix[car2_index][car2_lane] - target - 1)**2 + (lane_matrix[car2_index][car1_lane] - target + 1)**2
    return current_state - new_state

def racer_swap(schedule, lane_matrix, race_index, car1_index, car2_index):
    car1 = schedule[race_index][car1_index]
    car2 = schedule[race_index][car2_index]
    
    lane_matrix[car1][car1_index] = lane_matrix[car1][car1_index] - 1
    lane_matrix[car1][car2_index] = lane_matrix[car1][car2_index] + 1
    lane_matrix[car2][car1_index] = lane_matrix[car2][car1_index] + 1
    lane_matrix[car2][car2_index] = lane_matrix[car2][car2_index] - 1
    
    schedule[race_index][car1_index] = car2
    schedule[race_index][car2_index] = car1
    
if __name__ == "__main__":
    steal_from_previous_race([[4,4,4,4],[4,4,4,4],[4,4,4,4],[4,4,4,4]],[[0,1,2,3],[1,2,3,0],[2,3,0,1],[3,0,1,2]],[1,3])