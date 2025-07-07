import React from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const navigate = useNavigate();

  const handleClusterSelect = (cluster) => {
    localStorage.setItem('userCluster', cluster);
    navigate('/analyze');
  };

  return (
    <div className="app-container">
      <h2>اختر النمط الأقرب لك</h2>
      <button className="analyze-button" onClick={() => handleClusterSelect('The Idealist')}>مثالي</button>
      <button className="analyze-button" onClick={() => handleClusterSelect('The Burnt Survivor')}>مجروح</button>
      <button className="analyze-button" onClick={() => handleClusterSelect('The Silent Doubter')}>متردد</button>
      <button className="analyze-button" onClick={() => handleClusterSelect('The Data-Lover')}>تحليلي</button>
    </div>
  );
}

export default Quiz;