
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ CORS (موجود مسبقًا)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ مسار الجذر (للتجربة)
@app.get("/")
def read_root():
    return {"message": "Heartbridge backend is running successfully."}

# ✅ مسار التحميل
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    text = content.decode("utf-8")

    # مؤقتًا: نعيد أول 200 حرف كمحتوى للتجربة
    snippet = text[:200] + "..." if len(text) > 200 else text

    return {"status": "success", "preview": snippet}
