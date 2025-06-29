import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const callBack = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/predict');
      const data = await res.json();
      setResponse(data.output);
    } catch (err) {
      setResponse('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Heartbridge App</h1>
      <button onClick={callBack}>Run Analysis</button>
      <p>{loading ? 'Loading...' : response}</p>
    </div>
  );
}

export default App;