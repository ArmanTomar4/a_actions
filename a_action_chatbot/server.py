import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chatbot import Chatbot

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("server.log"),
        logging.StreamHandler()
    ]
)

app = FastAPI()

# Configure CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    page_id: str = None

bot = None
try:
    logging.info("Initializing Chatbot...")
    bot = Chatbot()
    logging.info("Chatbot initialized successfully.")
except Exception as e:
    logging.error(f"Fatal error initializing chatbot: {e}", exc_info=True)
    # The server will start, but the /chat endpoint will report an error.

@app.post("/chat")
def chat(request: ChatRequest):
    if not bot:
        return {"response": "Chatbot is not available due to a configuration error."}
    
    response = bot.send_message(request.message)
    return {"response": response}

@app.get("/")
def read_root():
    return {"message": "Chatbot API is running."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
