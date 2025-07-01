iimport React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const total = Object.values(answers).reduce((acc, val) => acc + Number(val), 0);
    let cluster = 'The Idealist';

    if (total <= 5) cluster = 'The Silent Doubter';
    else if (total <= 8) cluster = 'The Idealist';
    else if (total <= 10) cluster = 'The Rescuer';
    else cluster = 'The Burnt Survivor';

    localStorage.setItem('userCluster', cluster);
    navigate('/analyze');
  };

  return (
    <div className="quiz">
      <h2>استبيان تحليل الشخصية</h2>
      <form onSubmit={handleSubmit}>
        <label>١. ما مدى تعبيرك عن مشاعرك؟</label>
        <input type="radio" name="q1" value="1" onChange={handleChange} /> نادرًا
        <input type="radio" name="q1" value="2" onChange={handleChange} /> أحيانًا
        <input type="radio" name="q1" value="3" onChange={handleChange} /> غالبًا
        <input type="radio" name="q1" value="4" onChange={handleChange} /> دائمًا

        <br />

        <label>٢. كيف تتعامل مع الخلافات؟</label>
        <input type="radio" name="q2" value="1" onChange={handleChange} /> أتجنب
        <input type="radio" name="q2" value="2" onChange={handleChange} /> أهدأ ثم أتكلم
        <input type="radio" name="q2" value="3" onChange={handleChange} /> أتكلم فورًا
        <input type="radio" name="q2" value="4" onChange={handleChange} /> أُصرّ دائمًا

        <br />

        <label>٣. حاجتك للاهتمام؟</label>
        <input type="radio" name="q3" value="1" onChange={handleChange} /> ضعيفة
        <input type="radio" name="q3" value="2" onChange={handleChange} /> متوسطة
        <input type="radio" name="q3" value="3" onChange={handleChange} /> عالية
        <input type="radio" name="q3" value="4" onChange={handleChange} /> مفرطة

        <br />
        <button type="submit">احسب النتيجة</button>
      </form>
    </div>
  );
}

export default Quiz;
