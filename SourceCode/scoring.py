from random_utilities import get_racer_by_id


def post_new_score_race(racer_ids, scores, list_of_all_racers):
    for i,racer_id in enumerate(racer_ids):
        racer = get_racer_by_id(list_of_all_racers,racer_id)
        print(f"racer: {racer}")
        racer.score += scores[i]
        racer.appearances += 1
        
def get_top_scores(list_of_all_racers, number):
    """Sorts the racers by score, then returns sub array of top <number> of racers

    Args:
        list_of_all_racers (1D array of Racer Objects): The list of all of the racer objects
        number (int): How many of the top racers you want returned

    Returns:
        1D Array: List of the top number of racers
    """
    list_of_all_racers = sorted(list_of_all_racers, reverse=True) # want to sort from highest score to lowest
    return list_of_all_racers[:number]

def race_day(schedule, racers):
    for race in schedule:
        race_score = []
        for racer in race:
            print(racer)
            race_score.append(int(input("Score> ")))
        post_new_score_race(race,race_score,racers)
        podium = get_top_scores(racers, 10)
        print("-------Podium-----------")
        for i in range(10):
            print(f"{i+1} place: {podium[i]}")
            

if __name__ == "__main__":
    pass