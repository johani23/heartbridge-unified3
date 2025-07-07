import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const questions = [
    // ✳️ محور الطفولة
    { id: 'q1', text: 'هل شعرت بالأمان العاطفي في طفولتك؟' },
    { id: 'q2', text: 'هل كنت قادرًا على التعبير عن مشاعرك أمام والديك؟' },
    { id: 'q3', text: 'هل عشت في منزل يغلب عليه الصراخ أو التوتر؟' },
    { id: 'q4', text: 'هل شعرت أنك محبوب بدون شروط؟' },
    { id: 'q5', text: 'هل كنت تلجأ لأحد والديك عند الحزن؟' },

    // ✳️ علاقة الأم
    { id: 'q6', text: 'هل كانت والدتك قريبة منك عاطفيًا؟' },
    { id: 'q7', text: 'هل كانت أمك تنتقدك كثيرًا؟' },
    { id: 'q8', text: 'هل شعرت أن حب أمك كان مرتبطًا بأدائك أو تصرفاتك؟' },
    { id: 'q9', text: 'هل كنت تثق بأن والدتك ستتفهم مشاعرك؟' },
    { id: 'q10', text: 'هل تخاف من تكرار نفس علاقة أمك في شريكتك؟' },

    // ✳️ الخلفية الاجتماعية
    { id: 'q11', text: 'هل نشأت في بيئة محافظة جدًا؟' },
    { id: 'q12', text: 'هل كانت قرارات الزواج في عائلتك تُتخذ جماعيًا؟' },
    { id: 'q13', text: 'هل تتأثر نظرتك للعلاقات برأي الأقارب أو المجتمع؟' },
    { id: 'q14', text: 'هل تربيت على فكرة أن الرجل لا يضعف؟' },
    { id: 'q15', text: 'هل ترى أن دور المرأة في العلاقة واضح ومحدد مسبقًا؟' },

    // ✳️ القراءة والثقافة
    { id: 'q16', text: 'كم كتابًا قرأت آخر سنة؟' },
    { id: 'q17', text: 'هل تهتم بفهم نفسك ونمطك العاطفي؟' },
    { id: 'q18', text: 'هل تميل لسماع بودكاست أو محتوى تطوير ذاتي؟' },
    { id: 'q19', text: 'هل سبق أن قرأت كتبًا عن العلاقات أو علم النفس؟' },
    { id: 'q20', text: 'هل تحب تحليل تصرفاتك ومشاعرك؟' }
  ];

  const handleChange = (qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalScore = Object.values(answers).reduce((acc, val) => acc + val, 0);

    let cluster = '';
    if (totalScore <= 25) cluster = 'The Silent Doubter';
    else if (totalScore <= 40) cluster = 'The Idealist';
    else if (totalScore <= 55) cluster = 'The Rescuer';
    else cluster = 'The Burnt Survivor';

    localStorage.setItem('userCluster', cluster);
    navigate('/analyze');
  };

  return (
    <div className="app-container">
      <h2>🧠 استبيان تحديد النمط العاطفي</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={q.id} className="question">
            <label>{index + 1}. {q.text}</label><br />
            <label><input type="radio" name={q.id} value="1" onChange={() => handleChange(q.id, 1)} /> نادرًا</label><br />
            <label><input type="radio" name={q.id} value="2" onChange={() => handleChange(q.id, 2)} /> أحيانًا</label><br />
            <label><input type="radio" name={q.id} value="3" onChange={() => handleChange(q.id, 3)} /> غالبًا</label><br /><br />
          </div>
        ))}

        <button type="submit" className="analyze-button">احسب نمطك</button>
      </form>
    </div>
  );
}

export default Quiz;
