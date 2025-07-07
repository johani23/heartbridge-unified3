// Quiz.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const navigate = useNavigate();

  const questions = [
    // الطفولة والأسرة (أسئلة المستخدم)
    "هل شعرت بالأمان العاطفي في طفولتك؟",
    "هل كنت قادرًا على التعبير عن مشاعرك أمام والديك؟",
    "هل عشت في منزل يغلب عليه الصراع أو التوتر؟",
    "هل شعرت أنك محبوب بدون شروط؟",
    "هل كنت تلجأ لأحد والديك عند الحزن؟",
    "هل كانت والدتك قريبة منك عاطفياً؟",
    "هل كانت أمك تنتقدك كثيرًا؟",
    "هل شعرت أن حب أمك كان مرتبطًا بأدائك أو تصرفاتك؟",

    // الطفولة والأسرة (أسئلة الشريك)
    "هل تعتقد أن شريكك نشأ في بيئة آمنة عاطفياً؟",
    "هل تلاحظ أن شريكك يواجه صعوبة في التعبير عن مشاعره؟",
    "هل ترى أن شريكك حساس جدًا للنقد أو الرفض؟",
    "هل تشعر أن شريكك يفضل العزلة عند الحزن أو التوتر؟",
    "هل يبدو أن شريكك يحمل مشاعر غير محلولة تجاه والديه؟",
    "هل لاحظت أن شريكك يبحث عن إثبات الحب باستمرار؟",
    "هل يميل شريكك إلى المثالية أو التوقع العالي من العلاقة؟",
    "هل شعرت أن شريكك عليه أن يعوضك عن غياب والدك/والدتك؟",

    // الدافع والتوقعات (أسئلة المستخدم فقط)
    "هل تؤمن أن التضحية الكاملة من طرف واحد تعني حباً حقيقياً؟",
    "هل تنتظر أن يحبك شريكك بنفس طريقة حبك له؟"
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(''));

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    if (answers.includes('')) {
      alert('يرجى الإجابة على جميع الأسئلة قبل المتابعة.');
      return;
    }

    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    navigate('/analyze');
  };

  return (
    <div className="app-container">
      <h2>🧠 استبيان تحديد النمط العاطفي</h2>
      {questions.map((q, idx) => (
        <div key={idx} className="question-block">
          <p><strong>{idx + 1}. {q}</strong></p>
          {['نادراً', 'أحياناً', 'غالباً', 'دائماً'].map((option) => (
            <label key={option} style={{ marginInlineEnd: '10px' }}>
              <input
                type="radio"
                name={`q-${idx}`}
                value={option}
                checked={answers[idx] === option}
                onChange={(e) => handleChange(idx, e.target.value)}
              /> {option}
            </label>
          ))}
        </div>
      ))}

      <button className="analyze-button" onClick={handleSubmit} style={{ marginTop: '20px' }}>
        التالي
      </button>
    </div>
  );
}

export default Quiz;
