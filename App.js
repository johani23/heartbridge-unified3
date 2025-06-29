import React, { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [output, setOutput] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile); // اسم الحقل لازم يكون "file"

    try {
      const response = await fetch("https://heartbridge-unified3.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setOutput(result);
    } catch (error) {
      console.error("Upload error:", error);
      setOutput({ error: "فشل الاتصال بالخادم." });
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Heartbridge Unified UI</h2>
      <p>لتحليل العلاقة (TXT أو JSON) ارفع ملف المحادثة:</p>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "1rem" }}>
        رفع وتحليل
      </button>

      <div style={{ marginTop: "2rem" }}>
        <h3>📊 النتيجة:</h3>
        <pre>{output ? JSON.stringify(output, null, 2) : "لا شيء بعد."}</pre>
      </div>
    </div>
  );
}

export default App;

  
