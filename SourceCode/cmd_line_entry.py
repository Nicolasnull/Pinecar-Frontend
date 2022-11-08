class Racer:
    def __init__(self,car_number,racer_name):
       self.car_number=car_number
       self.name=racer_name
       self.score = 0
       self.appearances = 0


    def __str__(self):
        return f"({self.car_number}) {self.name} score {self.score} number of appearances {self.appearances}"
    
    # For sorting based on score
    def __lt__(self, other):
        return self.score < other.score
    
    def __le__(self, other):
        return self.score <= other.score
    
    def __gt__(self,other):
        return self.score > other.score
    
    def __ge__(self,other):
        return self.score >= other.score
    
    def __eq__(self,other):
        return self.score == other.score
   
import csv
import os
from scoring import race_day
from create_schedule import create_schedule
from menu_builder import menu_builder
from random_utilities import swap_index_for_racer_number,get_stats_from_schedule 
def get_racer_info_cmdline():
    # menu for entering racer info
    # 1 for manual input
    # 2 for spreadsheet
    # -1 for quit
    user_choice = menu_builder("Racer Info",['Manual Input', 'Spreadsheet'])
    racers = []
    if user_choice == 1:
        while(True):
            number = input("Racer Number> ")
            if number== "":
                break
            name = input("Racer Name> ")
            if name=="":
                break
            racers.append(Racer(number,name))
    if user_choice == 2:
        files_in_input = os.listdir("../CsvInputs")
        file_choice = menu_builder("Racer Chooser From CsvInputs Directory",files_in_input)
        if file_choice==-1:
            return []
        with open("../CsvInputs/"+files_in_input[file_choice-1], 'r') as file:
            csvreader = csv.reader(file)
            for row in csvreader:
                racers.append(Racer(row[0],row[1]))
    return racers


def main():
    racers = get_racer_info_cmdline()
    if len(racers)==0:
        print("Schedule creation aborted.")
        return
    schedule = create_schedule(len(racers),int(input("Minimum number of races> ")))
    official_schedule = swap_index_for_racer_number(schedule,racers)
    with open("../CsvOutputs/schedule.csv", "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerows(official_schedule)
    matchup_stats, min_lane, max_lane, repeat_sequential= get_stats_from_schedule(schedule,len(racers))
    print("Schedule successfully generated. Saved in schedule.csv")
    print("--------------------")
    print("Stats on this schedule")
    print(f"Number of times each racer races: {matchup_stats[0]}")
    print("Match up stats:")
    for i in range(len(matchup_stats[3])):
        print(f"Number of unique match-ups that raced each other {i} times: {matchup_stats[3][i]}")
    print("Lane Stats:")
    print(f"Min number of appearances in a lane: {min_lane}")
    print(f"Max number of appearances in a lane: {max_lane}")
    print(f"Number of sequential appearances by the same racer: {repeat_sequential}")
    
    race_day(official_schedule, racers)
    
if __name__ == "__main__":
    main()