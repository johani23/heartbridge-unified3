import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>مرحبًا بك في <strong>Heartbridge</strong></h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>حلّل علاقتك بذكاء قبل ما تندم.</p>
      <button
        onClick={() => navigate('/quiz')}
        className="analyze-button"
        style={{ fontSize: '1.1rem' }}
      >
        ابدأ التحليل
      </button>
    </div>
  );
}

export default Landing;
