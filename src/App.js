import React, { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const callBack = async () => {
    if (!inputText.trim()) {
      setResponse('Please enter a message for analysis.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://heartbridge-unified3.onrender.com/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      setResponse(data.output || 'No response.');
    } catch (err) {
      setResponse('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '50px auto',
      padding: '2rem',
      fontFamily: 'sans-serif',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Heartbridge Analyzer</h2>

      <textarea
        rows="6"
        placeholder="📝 Write your message here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          marginBottom: '1rem',
          resize: 'vertical'
        }}
      />

      <button
        onClick={callBack}
        style={{
          backgroundColor: '#4a90e2',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        🔍 Analyze
      </button>

      <div style={{
        marginTop: '1.5rem',
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #eee',
        minHeight: '80px'
      }}>
        {loading ? '⏳ Analyzing...' : response}
      </div>
    </div>
  );
}

export default App;
