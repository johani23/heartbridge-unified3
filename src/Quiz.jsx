import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const [cluster, setCluster] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (cluster) {
      localStorage.setItem('userCluster', cluster);
      navigate('/analyze');
    } else {
      alert('يرجى اختيار نمطك أولًا');
    }
  };

  return (
    <div className="landing">
      <h2>اختر نمطك العاطفي</h2>
      <select value={cluster} onChange={(e) => setCluster(e.target.value)}>
        <option value="">-- اختر --</option>
        <option value="The Idealist">الحالم (The Idealist)</option>
        <option value="The Burnt Survivor">الناجي المجروح (The Burnt Survivor)</option>
        <option value="The Silent Doubter">المرتاب الصامت (The Silent Doubter)</option>
        <option value="The Data-Lover">محب البيانات (The Data-Lover)</option>
      </select>
      <br /><br />
      <button onClick={handleSubmit}>التالي</button>
    </div>
  );
}

export default Quiz;
