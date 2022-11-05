class Racer:
    def __init__(self,car_number,racer_name):
       self.car_number=car_number
       self.racer_name=racer_name


    def __str__(self):
        return f"({self.car_number}) {self.racer_name}"
   
import csv
import json
from create_schedule import create_schedule
from menu_builder import menu_builder
from random_utilities import print_matrix, swap_index_for_racer_number 
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
        file_name=input("Enter the name of the file (must be saved in the same directory)> ")
        with open(file_name, 'r') as file:
            csvreader = csv.reader(file)
            for row in csvreader:
                racers.append(Racer(row[0],row[1]))
    return racers
        
            

       
def main():
    racers = get_racer_info_cmdline()
    schedule = create_schedule(len(racers),50)
    schedule = swap_index_for_racer_number(schedule,racers)
    with open("schedule.csv", "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerows(schedule)
    
if __name__ == "__main__":
    main()