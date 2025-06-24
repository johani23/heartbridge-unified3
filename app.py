from fastapi import FastAPI
from pairwise_model_selector import get_pairwise_result
import pandas as pd
import joblib

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Heartbridge backend is running successfully."}

@app.post("/analyze/")
def analyze_pairwise(data: dict):
    result = get_pairwise_result(data)
    return result