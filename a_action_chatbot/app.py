from chatbot import Chatbot

def main():
    print("Welcome to the A_Action Chatbot!")
    print("Type 'exit' to end the conversation.")
    
    try:
        bot = Chatbot()
    except ValueError as e:
        print(e)
        return

    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            print("Goodbye!")
            break
        
        response = bot.send_message(user_input)
        print(f"Chatbot: {response}")

if __name__ == "__main__":
    main()
