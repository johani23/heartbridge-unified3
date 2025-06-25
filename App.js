import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const response = await fetch("https://heartbridge-unified3.onrender.com/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Upload failed:", error);
      setResult({ error: "فشل الاتصال بالخادم" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Heartbridge Unified UI</h2>
      <p>ارفع ملف المحادثة (TXT أو JSON) لتحليل العلاقة:</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading} style={{ marginLeft: "10px" }}>
        {loading ? "جاري التحميل..." : "رفع وتحليل"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>📊 النتيجة:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
