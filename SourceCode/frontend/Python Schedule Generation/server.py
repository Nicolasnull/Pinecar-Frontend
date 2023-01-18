import json
import socket
import threading

class Score:
    def __init__(self,race_number,places):
        self.race_number = race_number
        self.places = places
        

HOST = "127.0.0.1"
PORT = 2022
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = '!BYE_FELICIA'
HEADER = 64

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((HOST, PORT))

list_of_score_board_clients = []
list_of_updating_score_clients = []
list_of_current_and_next_race_clients = []

def score_board_clients(conn, addr):
    print("[NEW CONNECTION] score board client added")
    list_of_score_board_clients.append(conn)
    connected = True
    while connected:
        incoming_msg_header = conn.recv(HEADER).decode(FORMAT)
        if incoming_msg_header:
            msg_length = int(incoming_msg_header)
            message=conn.recv(msg_length).decode(FORMAT)
            if message == DISCONNECT_MESSAGE:
                connected= False
                list_of_score_board_clients.remove(conn)
    
def update_everyone():
    for client in list_of_score_board_clients:
        pass
    
    
def updating_score_clients(conn, addr):
    print("[NEW CONNECTION] Score Keepers added")
    
    connected = True
    while connected:
        incoming_msg_length = conn.recv(HEADER).decode(FORMAT)
        if not incoming_msg_length: # connection broken
            return
        incoming_msg_length = int(incoming_msg_length)
        message = conn.recv(incoming_msg_length).decode(FORMAT)
        if message == DISCONNECT_MESSAGE:
            connected = False
        
        # should be a json with racers and scores
        thread = threading.Thread(target=update_everyone)
    

def current_and_next_race(conn, addr):
    print("[NEW CONNECTION] Car-Father-Est added")

def figure_out_what_type_of_client(conn,addr):
    incoming_msg_length = conn.recv(HEADER).decode(FORMAT)
    if not incoming_msg_length:
        return
    incoming_msg_length = int(incoming_msg_length)
    msg = conn.recv(incoming_msg_length).decode(FORMAT)
    
    if msg == "SCORE_BOARD":
        score_board_clients(conn,addr)
    elif msg == "CAR_FATHER":
        current_and_next_race(conn,addr)
    elif msg == "SCORER":
        updating_score_clients(conn, addr)
    else:
        print(msg)
    

def start_server():
    server.listen()
    print(f"[LISTENING] Server started at {HOST}")
    while True:
        print("H")
        conn, addr = server.accept()
        print(f"{conn} {addr}")
        thread = threading.Thread(target=figure_out_what_type_of_client, args=(conn, addr))
        thread.start()
        print(f"[ACTIVE CONNECTIONS] {threading.activeCount() - 1}")
    
if __name__ == "__main__":
    start_server()