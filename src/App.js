import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const callBackend = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://heartbridge-unified3.onrender.com/');
      const data = await res.text(); // backend يرسل نص فقط
      setResponse(data);
    } catch (error) {
      setResponse('❌ Error connecting to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Heartbridge Unified UI</h1>
      <button onClick={callBackend} style={{ padding: '0.5rem 1rem' }}>
        Connect to Backend
      </button>
      <div style={{ marginTop: '1rem', minHeight: '2rem' }}>
        {loading ? '⏳ Loading...' : response}
      </div>
    </div>
  );
}

export default App;
