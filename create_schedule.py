from numpy import matrix
from random_utilities import *
def create_schedule(number_of_racers,minimum_number_races_per_racer):
    """
    This takes a number of total racers and returns a 2D array of 
    nX4 for the race
    
    Parameters:
        number_of_racers: (int) the number of race cars for this schedule
        minimum_number_races_per_racer: (int) the lowest desired total number of races for each racer
    
    Returns:
        2D array representing the generated schedule
    """
    schedule = []
    racer_matrix = []
    
    # fill in empty matrix
    for i in range(number_of_racers):
        temp_arr = []
        for j in range(number_of_racers):
            temp_arr.append(0)
        racer_matrix.append(temp_arr)
    
    while(True):
        r1 = get_min_diagonal(racer_matrix)
        if racer_matrix[r1][r1] > minimum_number_races_per_racer:
            break
            
        r2 = get_min_row(racer_matrix, [r1])
        r3 = get_min_row(racer_matrix, [r1,r2])
        r4 = get_min_row(racer_matrix, [r1,r2,r3])
        
        add_racers_to_matrix(r1,r2,r3,r4,racer_matrix)
        schedule.append([r1,r2,r3,r4])
        
        print("---CURRENT SCHEDULE---")
        print_matrix(schedule)
        print("---RACER MATRIX---")
        print_matrix(racer_matrix)
        print("---Total Races---")
        print(len(schedule))
        # if input("quit? >").lower()=="y":
        #     break
        
    
if __name__=="__main__":
    create_schedule(25,15)