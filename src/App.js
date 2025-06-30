import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAnalysis = async () => {
    if (!input.trim()) {
      setResponse('❌ الرجاء إدخال نص لتحليله.');
      return;
    }

    setLoading(true);
    setError(false);
    setResponse('');

    try {
      const res = await fetch('https://heartbridge-unified3.onrender.com/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) throw new Error('Request failed');

      const data = await res.json();
      setResponse(data.output || 'لا يوجد ناتج متاح.');
    } catch (err) {
      setError(true);
      setResponse('❌ حدث خطأ أثناء الاتصال بالسيرفر. حاول لاحقًا.');
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
      <h1 style={{ marginBottom: '1rem' }}>نظام Heartbridge - تحليل مبدئي</h1>

      {/* Textarea لإدخال النص */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="📝 أدخل هنا نص المحادثة أو الرسائل بين الطرفين..."
        rows={5}
        style={{
          width: '100%',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          marginBottom: '1.5rem'
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
        {response && <pre style={{
          backgroundColor: '#f0f0f0',
          padding: '1rem',
          borderRadius: '6px',
          whiteSpace: 'pre-wrap'
        }}>{response}</pre>}
      </div>
    </div>
  );
}

export default App;
