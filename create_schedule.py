import csv
import sys
from random_utilities import *


def create_initial_schedule(number_of_racers,minimum_number_races):  
    # TODO: Make this work for any number of lanes currently only works for 4 lanes
    """ Creates a schedule that attempts to equalize the number of each possible matchup
        The algorithm will go until until it hits the minimum number of races entered
        Then it will just fill in the rest so that each racer will race an equal number
        of times

    Args:
        number_of_racers (int): The number of racers participating
        minimum_number_races (int): The cutoff for the first algorithm

    Returns:
        2D Array of integers: The schedule generated
        2D Array of integers: The matrix storing the number of times each racer raced against another
    """

    schedule = []
    racer_matrix = []
    
    # fill in empty matrix
    for _ in range(number_of_racers):
        temp_arr = []
        for _ in range(number_of_racers):
            temp_arr.append(0)
        racer_matrix.append(temp_arr)
    
    # original algorithm
    # first racer is chosen as the racer with the lowest number of appearances
    # following racers are chosen based on the fewest number of match-ups combined with others racing
    while(len(schedule) < minimum_number_races):
        r1 = get_min_diagonal(racer_matrix)
        r2 = get_min_row(racer_matrix, [r1])
        r3 = get_min_row(racer_matrix, [r1,r2])
        r4 = get_min_row(racer_matrix, [r1,r2,r3])
        
        add_racers_to_matrix(r1,r2,r3,r4,racer_matrix)
        schedule.append([r1,r2,r3,r4])
    
    # finishes out by just adding the racers until they all have the same number of appearances
    # basically same algorithm but will not allow adding of racers that have already appeared the max number of times
    # If uneven number, will have some trailing races with only 3 racers in them
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

        
def equalize_racing_lanes(schedule, num_racers, num_races_per_racer):
    """Shuffles around racers into different lanes so each racer has similar number of appearances in each lane

    Args:
        schedule (2D array of integers: num_races X num_lanes): The current racing schedule
        num_racers (int): The number of racers in the schedule
        num_racer_per_racer (int): The number of total appearances of each racer

    Returns:
        2D array of integers num_racers X num_lanes: A matrix containing the stats on how many time each racer uses each lane
    """
    # matrix to keep track of how many times each racer appears in each lane
    lane_matrix = [[0 for _ in range(len(schedule[0]))] for _ in range(num_racers)]
    for race in schedule:
        for i in range(len(race)):
            lane_matrix[race[i]][i] = lane_matrix[race[i]][i] + 1
    
    # This is the target used for the heuristic
    # the closer the number of appearances is to this target, the better the heuristic
    target_appearances_per_lane = num_races_per_racer // len(schedule[0])
         
    # loops until no lanes were shuffled
    change_made = True  
    while(change_made):
        change_made = False
        # loops through each racer and finds the best possible lane swap to make for the entire schedule
        # the heuristic for a swap is a score assigned based on how good a swap is 
        # (the end goal being as close to the target as possible)
        # This loop finds the highest scoring swap for each racer and then makes the swap.
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
            
            # if best score is <= 0 that means that all swaps will result in making the lanes more uneven. 
            # So, no swap will be made
            if max_heuristic > 0:
                change_made = True
                racer_swap(schedule, lane_matrix, schedule_index, lane_index1, lane_index2)
        
    return lane_matrix
        
        
def shuffle_races(schedule):
    """Attempts to shuffle around the race schedule so that there are the minimum number
    of racers that appear in 2 sequential races in a row
    Current algorithm: 
    break schedule into pieces that have no racers appearing in sequential races
    Try to put pieces on top, bellow, or in between other pieces if possible to do so
    without having sequential races with the same racer. The goal ideal goal being ending up with only
    1 piece having no sequential races with same racer. If that is not possible, it will still stich together
    the remaining pieces and return the new schedule

    Args:
        schedule (2D array): current schedule

    Returns:
        2D array: new schedule either with less or an equal number of sequential races with same racer
    """
    index_of_failures = []
    
    for i,race in enumerate(schedule):
        if i == 0:
            continue
        if contains_same_racer(race, schedule[i-1]):
            index_of_failures.append(i)
     
    # no shuffling required!!!
    if len(index_of_failures) == 0:
        return schedule
    
           
    schedule_pieces = []
    schedule_pieces.append(schedule[ : index_of_failures[0]])
    
    for i in range(len(index_of_failures)-1):
        schedule_pieces.append([schedule[index_of_failures[i]]])
        if index_of_failures[i+1] - index_of_failures[i] > 1:
            schedule_pieces.append(schedule[ (index_of_failures[i]+1) : (index_of_failures[i+1]) ])
        
    schedule_pieces.append([schedule[index_of_failures[-1]]])
    schedule_pieces.append(schedule[index_of_failures[-1]+1 : ])
    change_made = True
    while(change_made):
        change_made = False
        for piece1 in schedule_pieces:
            if change_made:
                break
            for piece2 in schedule_pieces:
                if piece1 is piece2:
                    continue
                # top of piece1 can be attached to bottom of piece 2
                if not contains_same_racer(piece1[0],piece2[-1]):
                    temp = piece2 + piece1
                    schedule_pieces.remove(piece1)
                    schedule_pieces.remove(piece2)
                    schedule_pieces.append(temp)
                    change_made = True
                    break
                # bottom of piece1 can be attached to top of piece 2
                if not contains_same_racer(piece1[-1],piece2[0]):
                    temp = piece1 + piece2
                    schedule_pieces.remove(piece1)
                    schedule_pieces.remove(piece2)
                    schedule_pieces.append(temp)
                    change_made = True
                    break
                # top of piece1 can be attached to top of piece 2
                if not contains_same_racer(piece1[0],piece2[0]):
                    piece2.reverse()
                    temp = piece1 + piece2
                    schedule_pieces.remove(piece1)
                    schedule_pieces.remove(piece2)
                    schedule_pieces.append(temp)
                    change_made = True
                    break
                # bottom of piece1 can be attached to bottom of piece 2
                if not contains_same_racer(piece1[0],piece2[0]):
                    piece2.reverse()
                    temp = piece2 + piece1
                    schedule_pieces.remove(piece1)
                    schedule_pieces.remove(piece2)
                    schedule_pieces.append(temp)
                    change_made = True
                    break
                
                # see if piece2 can be inserted in between piece1 somewhere
                if len(piece1) > 1:
                    for i in range(len(piece1)-1):
                        if change_made:
                            break
                        # try with piece2 forwards
                        if not contains_same_racer(piece1[i], piece2[0]) and not contains_same_racer(piece1[i+1], piece2[-1]):
                            piece1[i:i]=piece2
                            schedule_pieces.remove(piece2)
                            change_made = True
                            break
                        # try with piece2 backwards
                        if not contains_same_racer(piece1[i], piece2[-1]) and not contains_same_racer(piece1[i+1], piece2[0]):
                            piece2.reverse()
                            piece1[i:i]=piece2
                            schedule_pieces.remove(piece2)
                            change_made = True
                            break
    #print(len(schedule_pieces))
    new_schedule=[]
    for piece in schedule_pieces:
        new_schedule.extend(piece)
        
    return new_schedule
        
            
def create_schedule(num_racers, min_races):
    """Create a schedule that has similar number of match-ups, equalized number of lanes for each racer 
    and the least number of occurrences of repeat racers on sequential races

    Args:
        num_racers (integer): Number of racers
        min_races (_type_): The lower bound of how many races desired

    Returns:
        2D array of integers: _description_
    """
    schedule,matrix = create_initial_schedule(num_racers,min_races)
    equalize_racing_lanes(schedule,num_racers,matrix[0][0])
    return shuffle_races(schedule)

        
  
if __name__=="__main__":
    schedule, matrix = create_initial_schedule(26, 50)
    print(get_stats_from_matrix(matrix))
    print("----------------------------------")
    print_matrix(matrix)
    print("----------------------------------")
    equalize_racing_lanes(schedule, len(matrix), matrix[0][0])
    print("----------------------------------")
    print_matrix(schedule)
    print("----------------------------------")
    counter=0
    for i in range(len(schedule)-1):
        if contains_same_racer(schedule[i],schedule[i+1]):
            counter=counter+1
            
    
    new_schedule = shuffle_races(schedule)
    print(f"HELLO: {counter}")
    counter=0
    for i in range(len(new_schedule)-1):
        if contains_same_racer(new_schedule[i],new_schedule[i+1]):
            counter=counter+1
    print(f"HELLO: {counter}")
    # print_matrix(new_schedule)
    # with open("after.csv", "w", newline="") as f:
    #     writer = csv.writer(f)
    #     writer.writerows(new_schedule)