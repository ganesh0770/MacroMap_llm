## Intelligent Form Auto-Filler

An intelligent AI-powered web application that analyzes food images to provide instant, accurate nutritional values, macronutrient breakdowns, and health insights.
## Core Architecture

   Frontend: React, Tailwind CSS 

   Backend: FastAPI (Python)

   Engine: ollama(AI engine)

   AI Extraction Engine: Ollama running qwen2.5:1.5b (JSON structured mode)

### Backend Setup & Installation
### Option A: Setup on Windows (Easiest Local Mode)

--- open this and install ollama in local system to use ollama AI  

   Install 1 : https://ollama.com/download/windows
    
   Bash :
     
     ollama pull qwen2.5:1.5b

note : Ensure Ollama is installed and running on your system, then pull the target model:

Install 2 :

    https://sourceforge.net/projects/tesseract-ocr.mirror/  

   note : copy the download location while installing and add it to environmental variable


1 . creating venv, Activate :
Bash:

    python -m venv .venv
    
    .venv\Scripts\activate


2 . Navigate to your backend folder and initialize your environment:
Bash:

    cd backend


3 . Install dependencies:
Bash:

    pip install "fastapi[standard]"

    pip install pytesseract Pillow docx python-docx PyPDF2 ollama
    
                                   or

    pip install -r requirements.txt


4 . Launch the FastAPI Endpoint:
Bash:

    uvicorn main:app --reload
            or
        fastapi dev 



### Frontend Setup & Installation for windows


1 . Activate the virtual environment which already created in new tab in terminal:
Bash:

    source .venv/bin/activate


2 . Navigate to your frontend root:
Bash:

    cd frontend
    npm install


3 . Run the Development Server:
Bash:

    npm run dev



### Option B: Setup on Nix / NixOS or any linux os

Nix isolates development hooks declaratively. Spin up your shell environment with native system paths exposed to Python.

 Initialize the Shell:
    Run ad-hoc inside your project root to provision Python, core runtime binaries, and path data:
    Bash

1 . Download the ollama:
Bash:

    curl -fsSL https://ollama.com/install.sh | sh


### setup backend 

2 . Download the project directory


3 . navigate to Macromap in terminal by and creating venv, Activate and Install Requirements:
Bash:

    python -m venv .venv
    source .venv/bin/activate


4 . navigate to backend in the terminal
Bash:

    cd backend


if you are in nix set-sys-env:


    nix-shell  # install tesseract engine to support c++ lib for pytesseract
    
    
3 . initialize the backend fastapi & Install dependencies:


    pip install "fastapi[standard]"
   
    pip install pytesseract Pillow docx python-docx PyPDF2 ollama
    
                                   or

    pip install -r requirements.txt



4 . run the fastpi server:
Bash:

    fastapi dev 



### Frontend Setup & Installation for linux


1 . Activate the virtual environment which already created in new tab in terminal:
Bash:

    source .venv/bin/activate


2 . Navigate to your frontend root:
Bash:

    cd frontend
    npm install


3 . Run the Development Server:
Bash:

    npm run dev

