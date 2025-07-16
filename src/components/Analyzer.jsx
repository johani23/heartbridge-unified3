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
        quizAnswers,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/dynamic-recommendation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResponse(data || { output: '⚠️ لم يتم الحصول على ناتج.', popups: [] });
    } catch (error) {
      setResponse({ output: '❌ حدث خطأ أثناء الاتصال بالسيرفر.', popups: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container" style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
      <h2>تحليل العلاقة {cluster && <span>- نمطك: {cluster}</span>}</h2>

      <textarea
        className="input-box"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="انسخ نص الحوار هنا..."
        rows={6}
        style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '20px' }}
      />

      <button
        className="analyze-button"
        onClick={handleAnalysis}
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        {loading ? '...جارٍ التحليل' : 'ابدأ التحليل'}
      </button>

      {response?.output && (
        <div className="result-box" style={{ marginTop: '30px', background: '#f9f9f9', padding: '20px' }}>
          <h3>📌 النتيجة:</h3>
          <pre className="output-text" style={{ whiteSpace: 'pre-wrap' }}>{response.output}</pre>
        </div>
      )}

      {response?.popups?.length > 0 && (
        <div className="popup-box" style={{ marginTop: '20px', background: '#fffbe6', padding: '15px' }}>
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

export default Analyzer;
