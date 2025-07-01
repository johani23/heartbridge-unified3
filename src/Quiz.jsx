import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let cluster = '';
    if (score <= 5) cluster = 'The Silent Doubter';
    else if (score <= 8) cluster = 'The Idealist';
    else if (score <= 10) cluster = 'The Rescuer';
    else cluster = 'The Burnt Survivor';

    localStorage.setItem('userCluster', cluster);
    navigate('/analyze');
  };

  return (
    <div className="app-container">
      <h2>استبيان تحليل النمط العاطفي</h2>
      <form onSubmit={handleSubmit}>
        <div className="question">
          <label>١. ما مدى تعبيرك عن مشاعرك؟</label><br />
          <input type="radio" name="q1" value={1} onChange={(e) => setScore(score + +e.target.value)} /> نادرًا<br />
          <input type="radio" name="q1" value={2} onChange={(e) => setScore(score + +e.target.value)} /> أحيانًا<br />
          <input type="radio" name="q1" value={3} onChange={(e) => setScore(score + +e.target.value)} /> غالبًا<br />
        </div>
        <button className="analyze-button" type="submit">احسب نمطك</button>
      </form>
    </div>
  );
}

export default Quiz;
