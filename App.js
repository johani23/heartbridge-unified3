import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState("جاري التحميل...");

  useEffect(() => {
    fetch('https://heartbridge-unified3.onrender.com/status')
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || "تم الاتصال بنجاح!");
      })
      .catch((error) => {
        setMessage("فشل الاتصال بـ API");
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Heartbridge Unified UI</h2>
      <p>{message}</p>
    </div>
  );
}

export default App;
