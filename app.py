from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# إعدادات CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# نقطة اختبار بسيطة
@app.get("/", include_in_schema=False)
def read_root():
    return {"message": "Heartbridge backend is running."}


# موديل تحليلي بسيط (placeholder logic)
def simple_analysis(text: str) -> str:
    if any(word in text.lower() for word in ["زعل", "ما صرت", "أحاول", "تضايقت"]):
        return "❗ فيه مؤشرات على ضيق شعوري أو تراجع في التواصل. نوصي بنقاش صريح."
    elif any(word in text.lower() for word in ["أحبك", "اشتقت", "حبيبي"]):
        return "💚 المؤشرات تعكس مشاعر إيجابية أو تقارب عاطفي."
    else:
        return "⚠️ لا يمكن تحديد نوع التحليل بدقة من النص الحالي."

# مسار التحليل
@app.post("/api/predict")
async def predict(request: Request):
    data = await request.json()
    text = data.get("text", "")
    result = simple_analysis(text)
    return {"output": result}
