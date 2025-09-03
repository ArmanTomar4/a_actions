# A_Action Chatbot Backend

This document provides instructions on how to set up and run the backend server for the A_Action Chatbot.

## Prerequisites

- Python 3.8+
- pip

## Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd a_action_chatbot
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # On Windows
    python -m venv .venv
    .venv\Scripts\activate

    # On macOS/Linux
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure the API Key:**
    Open `config.ini` and add your Gemini API key under the `[GEMINI]` section:
    ```ini
    [GEMINI]
    API_KEY = YOUR_API_KEY_HERE
    ```

## Running the Server

You can run the server in two ways:

### 1. For Development

To run the server for development with hot-reloading, use the following command:

```bash
python server.py
```

The server will start on `http://127.0.0.1:8000`.

### 2. For Production (GCP)

For a production environment like Google Cloud Platform (GCP), it is recommended to use a production-grade ASGI server like Uvicorn. You can run the server with the following command:

```bash
python -m uvicorn server:app --host 0.0.0.0 --port 8080
```

- `--host 0.0.0.0` makes the server accessible from outside the container/VM.
- `--port 8080` is a common port used for web applications on GCP.
