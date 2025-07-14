import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ fontSize: '2.5rem' }}>مرحبًا بك في <span style={{ color: '#d63384' }}>Heartbridge</span></h1>
      <p style={{ fontSize: '1.2rem', marginTop: '20px' }}>
        حلّل علاقتك بذكاء قبل ما تندم.
      </p>

      <button
        className="analyze-button"
        onClick={() => navigate('/quiz')}
        style={{
          marginTop: '40px',
          padding: '12px 24px',
          fontSize: '1rem',
          backgroundColor: '#d63384',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        ابدأ التحليل
      </button>
    </div>
  );
}

export default Landing;
