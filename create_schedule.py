from math import ceil
from random_utilities import *
def create_schedule(number_of_racers,minimum_number_races):
    """
    This takes a number of total racers and returns a 2D array of 
    nX4 for the race
    
    Parameters:
        number_of_racers: (int) the number of race cars for this schedule
        minimum_number_races_per_racer: (int) the lowest desired total number of races for each racer
    
    Returns:
        schedule: 2D array representing the generated schedule
        matrix: 2D array representing how many times each racer faced each other    
    """
    schedule = []
    racer_matrix = []
    
    # fill in empty matrix
    for _ in range(number_of_racers):
        temp_arr = []
        for _ in range(number_of_racers):
            temp_arr.append(0)
        racer_matrix.append(temp_arr)
    
    while(len(schedule) < minimum_number_races):
        r1 = get_min_diagonal(racer_matrix)
        r2 = get_min_row(racer_matrix, [r1])
        r3 = get_min_row(racer_matrix, [r1,r2])
        r4 = get_min_row(racer_matrix, [r1,r2,r3])
        
        add_racers_to_matrix(r1,r2,r3,r4,racer_matrix)
        schedule.append([r1,r2,r3,r4])
    
    
    while(True):
        racers_with_full_schedule = get_all_max_on_diagonal(racer_matrix)
        if len(racers_with_full_schedule) == len(racer_matrix):
            break
        r1 = get_min_diagonal(racer_matrix,racers_with_full_schedule)
        racers_with_full_schedule.append(r1)
        if len(racers_with_full_schedule) == len(racer_matrix):
            steal_from_previous_race(racer_matrix,schedule,[r1])
            break
        r2 = get_min_row(racer_matrix, racers_with_full_schedule)
        racers_with_full_schedule.append(r2)
        if len(racers_with_full_schedule) == len(racer_matrix):
            steal_from_previous_race(racer_matrix,schedule,[r1,r2])
            break
        r3 = get_min_row(racer_matrix, racers_with_full_schedule)
        racers_with_full_schedule.append(r3)
        if len(racers_with_full_schedule) == len(racer_matrix):
            add_racers_to_matrix(r1,r2,r3,-1,racer_matrix)
            break
        r4 = get_min_row(racer_matrix, racers_with_full_schedule)
        racers_with_full_schedule.append(r4)
        if len(racers_with_full_schedule) == len(racer_matrix):
            schedule.append([r1,r2,r3,r4])
            add_racers_to_matrix(r1,r2,r3,r4,racer_matrix)
            break
        
        schedule.append([r1,r2,r3,r4])
        add_racers_to_matrix(r1,r2,r3,r4,racer_matrix)
        
        
    return schedule, racer_matrix 

        
def equalize_racing_lanes(schedule,matrix):
    lane_matrix = [[0 for _ in range(len(schedule[0]))] for _ in range(len(matrix))]
    for race in schedule:
        for i in range(len(race)):
            lane_matrix[race[i]][i] = lane_matrix[race[i]][i] + 1
    
    ideal_min = matrix[0][0] // len(schedule[0])
          
    change_made = True  
    while(change_made):
        change_made = False
        for i,racer in enumerate(lane_matrix):
            max_lane = max(racer)
            min_lane = min(racer)
            while(max_lane - min_lane > 1):
                race_index, index1, index2 = possible_swap(schedule, lane_matrix, i, ideal_min)
                if race_index > -1:
                    racer_swap(schedule, lane_matrix, race_index, index1, index2)
                    change_made = True
                else:
                    break
                max_lane = max(racer)
                min_lane = min(racer)
            
    print_matrix(lane_matrix)
        
        
        
  
if __name__=="__main__":
    schedule, matrix = create_schedule(23,40)
    print(get_stats_from_matrix(matrix))
    equalize_racing_lanes(schedule,matrix)
    