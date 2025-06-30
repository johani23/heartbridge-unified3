from fastapi import FastAPI, Request, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ إعدادات CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ نقطة اختبار HEAD
@app.get("/", include_in_schema=False)
@app.head("/", include_in_schema=False)
async def read_root():
    return {"message": "Heartbridge backend is running successfully."}

# ✅ مسار رفع الملفات (موجود سابقًا)
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    text = content.decode("utf-8")
    snippet = text[:200] + "..." if len(text) > 200 else text
    return {"status": "success", "preview": snippet}

# ✅ موديل تحليلي مبسط (الخيار B)
@app.post("/api/predict")
async def analyze_text(request: Request):
    data = await request.json()
    text = data.get("text", "").lower()

    if any(word in text for word in ["ضايق", "ما اعرف", "تعبت", "تردد", "انسحب", "تجاهل"]):
        output = "⚠️ المؤشرات توحي بوجود ارتباك عاطفي أو تردد في العلاقة."
    elif any(word in text for word in ["احب", "ارتحت", "تواصل", "اطمئن", "فهمني", "مريح"]):
        output = "💚 المؤشرات الأولية تعكس نوع من التفاهم أو الشعور الإيجابي."
    else:
        output = "❔ لم أتعرف على نمط واضح من النص. يمكن إضافة المزيد من الحوار."

    return {"output": output}
