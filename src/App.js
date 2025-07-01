import React, { useState } from 'react';
import './App.css';

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
    <div className="app-container">
      <h1>نظام <strong>Heartbridge</strong> - تحليل مبدئي</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="ادخل نص الحوار هنا (مثلاً: كيف بدأ النقاش بينكم، أو موقف معين...)"
        rows={6}
        className="input-box"
      />

      <button
        onClick={handleAnalysis}
        disabled={loading}
        className="analyze-button"
      >
        {loading ? '...جارٍ التحليل' : 'تشغيل التحليل'}
      </button>

      <div className={`result-box ${error ? 'error' : ''}`}>
        {response?.output && (
          <pre className="output-text">{response.output}</pre>
        )}

        {response?.popups && response.popups.length > 0 && (
          <div className="popup-box">
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
