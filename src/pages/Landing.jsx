import React from 'react';
import './App.css';

function Landing() {
  return (
    <div className="app-container" style={{
      background: 'linear-gradient(to bottom right, #f5f7fa, #c3cfe2)',
      minHeight: '100vh',
      paddingTop: '4rem',
      textAlign: 'center'
    }}>
      {/* شعار */}
      <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>
        ❤️ Heartbridge
      </h1>

      {/* وصف ترحيبي */}
      <p style={{
        fontSize: '1.2rem',
        maxWidth: '600px',
        margin: 'auto',
        marginBottom: '2.5rem',
        color: '#333',
        lineHeight: '1.6'
      }}>
        أهلاً بك في نظام Heartbridge، وجهتك الأولى لتحليل التوافق العاطفي بشكل ذكي وعميق.
        ابدأ الرحلة لتكتشف ما وراء الكلمات.
      </p>

      {/* زر بدء الاستبيان */}
      <a href="/quiz">
        <button className="analyze-button" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
          🚀 ابدأ التحليل الآن
        </button>
      </a>
    </div>
  );
}

export default Landing;
