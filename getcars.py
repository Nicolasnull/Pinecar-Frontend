class Racer:
    def __init__(self,car_number,racer_name):
       self.car_number=car_number
       self.racer_name=racer_name


    def __str__(self):
        return f"({self.car_number}) {self.racer_name}"
   
from menu_builder import menu_builder 
def get_racer_info_cmdline():
    # menu for entering racer info
    # 1 for manual input
    # 2 for spreadsheet
    # -1 for quit
    user_choice = menu_builder("Racer Info",['Manual Input', 'Spreadsheet'])

       
def main():
    get_racer_info_cmdline()
    
if __name__ == "__main__":
    main()