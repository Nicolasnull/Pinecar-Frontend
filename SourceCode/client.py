import socket
from server import Score

HOST = "127.0.0.1"
PORT = 2022
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = '!BYE_FELICIA'
HEADER = 64

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect((HOST, PORT))

def send(msg):
    message = msg.encode(FORMAT)
    msg_length = len(message)
    
    send_length = str(msg_length).encode(FORMAT)
    # padding the send length to be size of header
    send_length += b' ' * (HEADER - len(send_length))
    client.send(send_length)
    client.send(message)
  
while True:    
    usr_input = input("> ")
    if usr_input == "":
        break
    else:
        send(usr_input)
send(DISCONNECT_MESSAGE)