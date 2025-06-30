import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAnalysis = async () => {
    if (!input.trim()) {
      setResponse({ output: '❌ الرجاء إدخال نص لتحليله', popups: [] });
      return;
    }

    setLoading(true);
    setError(false);
    setResponse(null);

    try {
      const res = await fetch('https://heartbridge-unified3.onrender.com/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: input })
      });

      if (!res.ok) throw new Error('Request failed');

      const data = await res.json();
      setResponse(data || { output: '⚠️ لم يتم الحصول على ناتج.', popups: [] });
    } catch (err) {
      setError(true);
      setResponse({ output: '❌ حدث خطأ أثناء الاتصال بالسيرفر. حاول لاحقًا.', popups: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '2rem',
      maxWidth: '700px',
      margin: 'auto',
      textAlign: 'center'
    }}>
      <h1 style={{ marginBottom: '1rem' }}>نظام <strong>Heartbridge</strong> - تحليل مبدئي</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="ادخل نص الحوار هنا (مثلاً: كيف بدأ النقاش بينكم، أو موقف معين...)"
        rows={6}
        style={{
          width: '100%',
          padding: '1rem',
          fontSize: '1rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          marginBottom: '1.5rem',
          direction: 'rtl'
        }}
      />

      <button
        onClick={handleAnalysis}
        disabled={loading}
        style={{
          padding: '0.7rem 2rem',
          fontSize: '1rem',
          borderRadius: '6px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? '...جارٍ التحليل' : 'تشغيل التحليل'}
      </button>

      <div style={{ marginTop: '2rem', minHeight: '3rem', color: error ? '#b00020' : '#333' }}>
        {response?.output && (
          <pre style={{
            backgroundColor: '#f0f0f0',
            padding: '1rem',
            borderRadius: '6px',
            whiteSpace: 'pre-wrap',
            textAlign: 'right',
            direction: 'rtl'
          }}>{response.output}</pre>
        )}

        {response?.popups && response.popups.length > 0 && (
          <div style={{
            background: "#fff3cd",
            padding: "1rem",
            borderRadius: "8px",
            color: "#856404",
            marginTop: "1rem",
            textAlign: "right",
            direction: "rtl"
          }}>
            <strong>🧠 ملاحظات ذكية:</strong>
            <ul>
              {response.popups.map((popup, idx) => (
                <li key={idx}>{popup}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
