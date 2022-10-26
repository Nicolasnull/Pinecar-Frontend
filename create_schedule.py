import csv
from math import ceil
import sys
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
            schedule.append([r1,r2,r3])
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
    
    target_appearances_per_lane = matrix[0][0] // len(schedule[0])
          
    change_made = True  
    while(change_made):
        change_made = False
        for racer_index, _ in enumerate(lane_matrix):
            max_heuristic = -1
            schedule_index = -1
            lane_index1 = -1
            lane_index2 = -1
            for race_index, race in enumerate(schedule):
                if racer_index in race:
                    temp_heuristic, temp_lane_index1, temp_lane_index2 = possible_swap(lane_matrix, race, racer_index, target_appearances_per_lane)
                    if temp_heuristic > max_heuristic:
                        max_heuristic = temp_heuristic
                        schedule_index = race_index
                        lane_index1 = temp_lane_index1
                        lane_index2 = temp_lane_index2
            if max_heuristic > 0:
                change_made = True
                racer_swap(schedule, lane_matrix, schedule_index, lane_index1, lane_index2)
        
    print_matrix(lane_matrix)
        
        
        
  
if __name__=="__main__":
    schedule, matrix = create_schedule(13, 60)
    print(get_stats_from_matrix(matrix))
    print("----------------------------------")
    print_matrix(matrix)
    print("----------------------------------")
    equalize_racing_lanes(schedule,matrix)
    print("----------------------------------")
    print_matrix(schedule)
    
    
    with open("after.csv", "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerows(schedule)