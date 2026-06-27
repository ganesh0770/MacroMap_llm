import io
# import asyncio
import os
import json
import base64
from fastapi import FastAPI, UploadFile, File, HTTPException,Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
import ollama
from PIL import Image
import fitz  


app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*","http://localhost:5173/"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Defined the schema for nutrition extraction
class NutritionFacts(BaseModel):
    calories: int | float| None = Field(None, description="Total calories per serving")
    protein: int | float | None = Field(None, description="Protein amount (e.g., '15g')")
    carbohydrates:int | float | None= Field(None, description="Total carbohydrates amount (e.g., '24g')")
    fat: int | float| None = Field(None, description="Total fat amount (e.g., '8g')")
    fiber: int | float| None = Field(None, description="Dietary fiber amount (e.g., '3g')")

@app.get("/")
async def check():
    return {"detail": "backend is running"}

@app.post("/api/extract", response_model=NutritionFacts)
async def extract_document_data(file: UploadFile = File(...)):
    
    support_extensions = (".jpeg", ".jpg", ".png", ".tiff", ".bmp", ".gif", ".pdf")
    filename_lower = file.filename.lower()

    if not filename_lower.endswith(support_extensions):
        raise HTTPException(
            status_code=400, 
            detail="Unsupported file format. Please upload an image or a PDF."
        )
    
    try:
        # Read raw file bytes
        file_bytes = await file.read()
        
        # --- File Processing Logic (PDF vs Image) ---
        if filename_lower.endswith(".pdf"):
            # Open PDF via PyMuPDF
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            if len(doc) == 0:
                raise HTTPException(status_code=400, detail="The uploaded PDF file is empty.")
            
            # Target the first page and convert to pixels (300接口 DPI layout)
            page = doc[0]
            pix = page.get_pixmap(matrix=fitz.Matrix(300/72, 300/72))
            img_data = pix.tobytes("png")
            img = Image.open(io.BytesIO(img_data))
            print("got pdf here")
        else:
            # Open directly as an image if it's already a regular graphic file
            img = Image.open(io.BytesIO(file_bytes))
            print("backend got image")


        # --- Base64 Buffer Conversion ---
        buffered = io.BytesIO()
        # Convert to RGB if saving as JPEG (handles PNG transparency/RGBA errors)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        
        img.save(buffered, format="JPEG")
        img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

 
        def get_optimal_model_and_threads():
            # 1. Check for NVIDIA GPU presence
            has_nvidia = os.path.exists("/dev/nvidia0")
            
            # 2. Check for AMD / Intel GPU presence (DRM Render nodes)
            has_amd_intel = os.path.exists("/dev/dri/renderD128")
            
            if has_nvidia or has_amd_intel:
                model_name = "qwen2.5vl:7b"
                threads = None 
                # print(f"--> GPU detected. Selected high-performance model: {model_name}")
                print(model_name)
            else:
                model_name = "llava-phi3:latest"
                
                cpu_cores = os.cpu_count() or 4
                threads = max(1, cpu_cores - 2)
                print(f"--> CPU Mode. Selected lightweight fallback model: {model_name} (Threads: {threads})")
                print(model_name,threads)
                
            return model_name, threads

        # Get system-optimized values
        selected_model, optimized_threads = get_optimal_model_and_threads()

        # Prepare your dynamic configuration options
        options_payload = {}
        if optimized_threads:
            options_payload["num_thread"] = optimized_threads

        selected_model = "llava-phi3:latest"

        prompt = (
            "Analyze the provided nutritional label image.\n"
            "1. Extract the data in grams.\n"
            "2. Extract raw data for: calories, protein, carbohydrates, total fat, and fiber.\n"
            "3. Calculate the values per 100 grams based on the label serving size.\n\n"
            "Respond ONLY with a raw JSON object. Do not include markdown block code formatting.\n"
            "Example format:\n"
            '{"calories": 0, "protein": 0, "carbohydrates": 0, "fat": 0, "fiber": 0}\n\n'
            "Values must be numbers (int), not strings."
        )

        response = ollama.chat(
            # model='qwen3-vl:2b',
            # model="qwen2.5:1.5b", 
            model=selected_model,  
            messages=[{
                'role': 'user',
                'content': prompt,
                'images': [img_base64]
            }],
            # format="json",  # Instructs Ollama to enforce structured JSON output
            options=options_payload
        )
        total_seconds = response['total_duration'] / 1e9
        print(f"Model took {total_seconds:.2f} seconds.")

        raw_content = response['message']['content'].strip()
        print("the raw",raw_content)
        
        # Strip markdown formatting safely
        if raw_content.startswith("```"):
            raw_content = raw_content.removeprefix("```json").removeprefix("```").strip()
            raw_content = raw_content.removesuffix("```").strip()

        # Parse output safely
        parsed_json = json.loads(raw_content)

        # Validate with Pydantic
        validated_data = NutritionFacts(**parsed_json)
        print("Returning to frontend:", validated_data.model_dump())
        print("the return typre",validated_data)

        return dict(validated_data)
        # return validated_data
    

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Model failed to return valid JSON. Raw output: " + str(raw_content))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")























