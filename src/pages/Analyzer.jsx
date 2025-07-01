import React, { useState, useEffect } from 'react';

function Analyzer() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cluster, setCluster] = useState('');

  useEffect(() => {
    const savedCluster = localStorage.getItem('userCluster');
    if (savedCluster) setCluster(savedCluster);
  }, []);

  const handleAnalysis = async () => {
    if (!input.trim()) {
      setResponse({ output: '❌ الرجاء إدخال نص لتحليله', popups: [] });
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('https://heartbridge-unified3.onrender.com/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, cluster })
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
      <h2>تحليل العلاقة {cluster && `- نمطك: ${cluster}`}</h2>
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

      {response && (
        <div className={`result-box ${response.output.includes('❌') ? 'error' : ''}`}>
          <h3>🔍 التوصية النهائية:</h3>
          <div className="output-text">{response.output}</div>

          {response.popups?.length > 0 && (
            <div className="popup-box">
              <strong>ملاحظات إضافية:</strong>
              <ul>
                {response.popups.map((popup, i) => (
                  <li key={i}>{popup}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Analyzer;
