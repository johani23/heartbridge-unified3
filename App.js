import React, { useEffect, useState } from 'react';

function App() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetch('https://heartbridge-unified3.onrender.com/')
      .then(res => res.json())
      .then(data => setResponse(data.message))
      .catch(err => {
        console.error('Error fetching from backend:', err);
        setResponse('حدث خطأ في الاتصال بالخادم');
      });
  }, []);

  return (
    <div>
      <h2>Heartbridge Unified UI</h2>
      <p>الواجهة الأمامية المرتبطة بالـ API</p>
      <p><strong>رد السيرفر:</strong> {response}</p>
    </div>
  );
}

export default App;
