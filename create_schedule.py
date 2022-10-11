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

        
    
if __name__=="__main__":
    schedule, matrix = create_schedule(25,60)
    print(get_stats_from_matrix(matrix))
    