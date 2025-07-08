import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  // الأسئلة عن المستخدم
  { id: 1, text: 'هل شعرت بالأمان العاطفي في طفولتك؟' },
  { id: 2, text: 'هل كنت قادرًا على التعبير عن مشاعرك أمام والديك؟' },
  { id: 3, text: 'هل عشت في منزل يغلب عليه الصراع أو التوتر؟' },
  { id: 4, text: 'هل شعرت أنك محبوب بدون شروط؟' },
  { id: 5, text: 'هل كنت تلجأ لأحد والديك عند الحزن؟' },
  { id: 6, text: 'هل كانت والدتك قريبة منك عاطفيًا؟' },
  { id: 7, text: 'هل كانت أمك تنتقدك كثيرًا؟' },
  { id: 8, text: 'هل شعرت أن حب أمك كان مرتبطًا بأدائك أو تصرفاتك؟' },

  // تكرار نفس الأسئلة عن الشريك (مع تغيير الصياغة)
  { id: 9, text: 'هل تشعر أن شريكك يعوضك عن غياب والدك/والدتك؟' },
  { id: 10, text: 'هل تشعر أن شريكك يُسمع مشاعرك بدون حكم؟' },
  { id: 11, text: 'هل تتجنب الخلافات مع شريكك خوفًا من فقدانه؟' },
  { id: 12, text: 'هل شعرت أن حب شريكك غير مشروط؟' },
  { id: 13, text: 'هل تلجأ لشريكك عندما تحزن؟' },
  { id: 14, text: 'هل تشعر أن شريكك قريب منك عاطفيًا؟' },
  { id: 15, text: 'هل ينتقدك شريكك كثيرًا؟' },
  { id: 16, text: 'هل شعرت أن شريكك يربط حبه لك بتصرفاتك؟' },

  // أسئلة عن التوقعات (مخصصة للمستخدم فقط)
  { id: 17, text: 'هل تؤمن أن التضحية الكاملة من طرف واحد تعني حبًا حقيقيًا؟' },
  { id: 18, text: 'هل تنتظر أن يحبك شريكك بنفس طريقة حبك له؟' }
];

const options = ['نادرًا', 'أحيانًا', 'غالبًا', 'دائمًا'];

function Quiz() {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert('يرجى الإجابة على جميع الأسئلة قبل المتابعة.');
      return;
    }

    // تحديد النمط بناءً على منطق بسيط مؤقت (لاحقًا يتم تحسينه)
    const totalScore = Object.values(answers).reduce((sum, val) => sum + options.indexOf(val), 0);
    let cluster = 'The Silent Doubter';
    if (totalScore > 45) cluster = 'The Rescuer';
    if (totalScore > 55) cluster = 'The Idealist';
    if (totalScore > 65) cluster = 'The Data-Lover';

    // حفظ في localStorage
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    localStorage.setItem('userCluster', cluster);

    // الانتقال إلى صفحة التحليل
    navigate('/analyze');
  };

  return (
    <div className="app-container">
      <h2>🧠 استبيان تحديد النمط العاطفي</h2>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: '20px' }}>
          <strong>{q.id}. {q.text}</strong>
          <div>
            {options.map((opt) => (
              <label key={opt} style={{ marginInlineEnd: '15px' }}>
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleChange(q.id, opt)}
                />
                {' '}{opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button className="analyze-button" onClick={handleSubmit}>
        التالي
      </button>
    </div>
  );
}

export default Quiz;
