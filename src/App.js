import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [comfort, setComfort] = useState('');
  const [motivation, setMotivation] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setResponse('❌ الرجاء إدخال نص الحوار.');
      return;
    }

    setLoading(true);
    setError(false);
    setResponse('');

    try {
      const res = await fetch('https://heartbridge-unified3.onrender.com/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `${text}\nالإجابات:\n- شعور الراحة: ${comfort}\n- الدافع: ${motivation}`
        })
      });

      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setResponse(data.output || '⚠️ لم يتم الحصول على رد.');
    } catch (err) {
      setError(true);
      setResponse('❌ حدث خطأ أثناء الاتصال بالسيرفر.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '2rem', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>💬 نظام Heartbridge</h1>

      <label style={{ display: 'block', marginBottom: '0.5rem' }}>📝 نص الحوار أو الموقف:</label>
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="اكتب هنا..."
        style={{ width: '100%', padding: '1rem', marginBottom: '1.5rem', borderRadius: '8px' }}
      />

      <label>🌿 هل شعرت براحة عند الحديث معه؟</label>
      <select
        value={comfort}
        onChange={(e) => setComfort(e.target.value)}
        style={{ width: '100%', padding: '0.6rem', marginBottom: '1rem' }}
      >
        <option value="">اختر...</option>
        <option value="نعم">نعم</option>
        <option value="لا">لا</option>
        <option value="أحيانًا">أحيانًا</option>
      </select>

      <label>💡 ما هو دافعك الرئيسي للدخول في العلاقة؟</label>
      <select
        value={motivation}
        onChange={(e) => setMotivation(e.target.value)}
        style={{ width: '100%', padding: '0.6rem', marginBottom: '1.5rem' }}
      >
        <option value="">اختر...</option>
        <option value="بحث عن شريك ناضج">بحث عن شريك ناضج</option>
        <option value="الهروب من ضغط اجتماعي">الهروب من ضغط اجتماعي</option>
        <option value="احتياج عاطفي قوي">احتياج عاطفي قوي</option>
        <option value="انجذاب أو فضول">انجذاب أو فضول</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '0.8rem 2rem',
          borderRadius: '6px',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '1rem'
        }}
      >
        {loading ? '...جارٍ التحليل' : 'تشغيل التحليل'}
      </button>

      <div style={{ marginTop: '2rem', background: '#f7f7f7', padding: '1rem', borderRadius: '8px' }}>
        {response && (
          <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'right', direction: 'rtl', color: error ? 'red' : 'black' }}>
            {response}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
