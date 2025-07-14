// ✅ Analyzer.jsx + Landing.jsx (React components) — Local backend support
import React, { useState, useEffect } from 'react';

function Analyzer() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cluster, setCluster] = useState('');
  const [quizAnswers, setQuizAnswers] = useState(null);

  useEffect(() => {
    const savedCluster = localStorage.getItem('userCluster');
    if (savedCluster) setCluster(savedCluster);

    const savedAnswers = localStorage.getItem('quizAnswers');
    if (savedAnswers) setQuizAnswers(JSON.parse(savedAnswers));
  }, []);

  const handleAnalysis = async () => {
    if (!input.trim()) {
      setResponse({ output: '❌ الرجاء إدخال نص لتحليله', popups: [] });
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const payload = {
        text: input,
        cluster,
        quizAnswers
      };

      const res = await fetch('http://127.0.0.1:5000/dynamic-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setResponse(data || { output: '⚠️ لم يتم الحصول على ناتج.', popups: [] });
    } catch {
      setResponse({ output: '❌ حدث خطأ أثناء الاتصال بالسيرفر.', popups: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h2>تحليل العلاقة - {cluster && `نمطك: ${cluster}`}</h2>

      <textarea
        className="input-box"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="انسخ نص الحوار هنا..."
        rows={6}
      />

      <br />
      <button className="analyze-button" onClick={handleAnalysis} disabled={loading}>
        {loading ? '...جارٍ التحليل' : 'ابدأ التحليل'}
      </button>

      {response?.output && (
        <div className="result-box">
          <pre className="output-text">{response.output}</pre>
        </div>
      )}

      {response?.popups?.length > 0 && (
        <div className="popup-box">
          <strong>🧠 ملاحظات ذكية:</strong>
          <ul>
            {response.popups.map((popup, i) => (
              <li key={i}>{popup}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ✅ Landing.jsx example structure
export function Landing({ onStart }) {
  return (
    <div className="landing-container">
      <h1>مرحبًا بك في Heartbridge</h1>
      <p>نساعدك على تحليل علاقتك واكتشاف مدى التوافق العاطفي والنفسي.</p>
      <button className="start-button" onClick={onStart}>
        ابدأ الآن
      </button>
    </div>
  );
}

export default Analyzer;
