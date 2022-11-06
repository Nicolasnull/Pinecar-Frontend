import os
def menu_builder(title, options):
    """
    creates a menu and returns the choice
    
    Arguments:
        title: (str) Will be the header of the menu
        options: (str array) will be the list of options in the menu
    Returns:
        The number of the option chosen (ex if the first item in the chosen, returns 1)
        Will return -1 if user quits
    """
    
    while(True):
        os.system('cls')
        print(f"-----{title}-----")
        
        for i, choice in enumerate(options):
            print(f"{i+1}) {choice}")
        print("or enter \"quit\" to exit menu")
        user_input = input("> ")
        
        if user_input.lower()=="quit":
            return -1
        
        if user_input.isnumeric():
            # cast to int
            user_input = int(user_input)
            if user_input > 0 and user_input <= len(options):
                return user_input
        
        
        