
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('...جاري التحميل');

  useEffect(() => {
    fetch('https://heartbridge-unified3.onrender.com/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage('فشل الاتصال بالخلفية 💔'));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Heartbridge Unified UI</h2>
      <p>{message}</p>
    </div>
  );
}

export default App;
