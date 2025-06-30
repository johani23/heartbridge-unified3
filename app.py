from fastapi import FastAPI, File, UploadFile, Request
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
def read_root():
    return {"message": "Heartbridge backend is running successfully."}

# ✅ مسار تحليل النص من الواجهة
@app.post("/api/predict")
async def predict(request: Request):
    data = await request.json()
    text = data.get("text", "")
    if not text:
        return {"output": "⚠️ لم يتم إرسال أي نص."}

    # 🔁 تحليل وهمي (مؤقت) – غيّره لاحقًا بموديل فعلي
    preview = text[:200] + "..." if len(text) > 200 else text
    return {"output": f"✅ التحليل المبدئي جاهز:\n\n{preview}"}

# ✅ (اختياري) مسار رفع ملف – احتياطي
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    text = content.decode("utf-8")
    snippet = text[:200] + "..." if len(text) > 200 else text
    return {"status": "success", "preview": snippet}


