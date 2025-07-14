import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [cluster, setCluster] = useState('The Silent Doubter');
  const [result, setResult] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://127.0.0.1:8000/dynamic-recommendation', // ✅ updated
        {
          text,
          cluster,
          quizAnswers: {}
        }
      );
      setResult(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert('حدث خطأ في التحليل.');
    }
  };

  const askAI = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/analyze', // ✅ updated
        { prompt: text }
      );
      setAiResponse(response.data.response);
    } catch (err) {
      console.error(err);
      alert('فشل الاتصال بـ Chat AI');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2>تحليل العلاقة – Heartbridge</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        cols={70}
        placeholder="اكتب حوار العلاقة هنا..."
        style={{ padding: '10px', fontSize: '16px' }}
      />

      <br />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'يتم التحليل...' : 'ابدأ التحليل'}
      </button>{' '}
      <button onClick={askAI}>تحدث مع الذكاء الاصطناعي</button>

      {result && (
        <div style={{ marginTop: '30px' }}>
          <h3>🧠 التوصية:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {aiResponse && (
        <div style={{ marginTop: '30px', backgroundColor: '#f0f0f0', padding: '15px' }}>
          <h3>💬 رد الذكاء الاصطناعي:</h3>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default App;
