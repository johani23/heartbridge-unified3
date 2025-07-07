import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });

  const handleInputChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleClusterSelect = (cluster) => {
    localStorage.setItem('userCluster', cluster);
    navigate('/analyze');
  };

  return (
    <div className="app-container">
      {step === 1 && (
        <>
          <h2>🧠 استبيان أولي لفهم نمطك</h2>

          <p>1. لما تواجه مشكلة... وش أول ردة فعل؟</p>
          <select name="q1" value={answers.q1} onChange={handleInputChange}>
            <option value="">اختر</option>
            <option value="silent">أصمت وأحلها بنفسي</option>
            <option value="ideal">أحاول أشرح مشاعري</option>
            <option value="burnt">أفقد أعصابي أو أنسحب</option>
            <option value="data">أبحث وأحلل وأفكر منطقيًا</option>
          </select>

          <p>2. وش أهم شيء في العلاقة؟</p>
          <select name="q2" value={answers.q2} onChange={handleInputChange}>
            <option value="">اختر</option>
            <option value="silent">الهدوء وعدم الإلحاح</option>
            <option value="ideal">التعبير والاحتواء</option>
            <option value="burnt">الشعور بالأمان</option>
            <option value="data">المنطق والتوافق الواقعي</option>
          </select>

          <p>3. إذا شفت الطرف الآخر متضايق؟</p>
          <select name="q3" value={answers.q3} onChange={handleInputChange}>
            <option value="">اختر</option>
            <option value="silent">أسحب نفسي</option>
            <option value="ideal">أحاول أواسيه</option>
            <option value="burnt">أتوتر أكثر</option>
            <option value="data">أسأل تحليل أو سبب</option>
          </select>

          <br /><br />
          <button className="analyze-button" onClick={handleNext}>التالي</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>💡 اختر أقرب نمط لك</h2>
          <button className="analyze-button" onClick={() => handleClusterSelect('The Idealist')}>مثالي</button>
          <button className="analyze-button" onClick={() => handleClusterSelect('The Burnt Survivor')}>محترق</button>
          <button className="analyze-button" onClick={() => handleClusterSelect('The Silent Doubter')}>صامت</button>
          <button className="analyze-button" onClick={() => handleClusterSelect('The Data-Lover')}>تحليلي</button>
        </>
      )}
    </div>
  );
}

export default Quiz;
