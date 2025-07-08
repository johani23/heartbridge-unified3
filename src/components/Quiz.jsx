import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});

  const questions = [
    // المستخدم - الطفولة
    'هل شعرت بالأمان العاطفي في طفولتك؟',
    'هل كنت قادرًا على التعبير عن مشاعرك أمام والديك؟',
    'هل عشت في منزل يغلب عليه الصراع أو التوتر؟',
    'هل شعرت أنك محبوب بدون شروط؟',
    'هل كنت تلجأ لأحد والديك عند الحزن؟',
    'هل كانت والدتك قريبة منك عاطفياً؟',
    'هل كانت أمك تنتقدك كثيراً؟',
    'هل شعرت أن حب أمك كان مرتبطًا بأدائك أو تصرفاتك؟',

    // الشريك - بصيغة انعكاسية
    'هل تعتقد أن شريكك شعر بالأمان العاطفي في طفولته؟',
    'هل تظن أن شريكك كان قادرًا على التعبير أمام أهله؟',
    'هل تعتقد أنه نشأ في بيت فيه توتر أو صراخ؟',
    'هل تظنه شعر أنه محبوب بدون شروط؟',
    'هل كان له من يلجأ له وقت الحزن؟',
    'هل والدته كانت قريبة منه عاطفياً؟',
    'هل كانت أمه تنتقده كثيرًا؟',
    'هل تعتقد أن حبه مرتبط بأدائه أو تصرفه؟',

    // التوقعات من العلاقة
    'هل تؤمن أن التضحية الكاملة من طرف واحد تعني حباً حقيقياً؟',
    'هل تنتظر أن يحبك شريكك بنفس طريقة حبك له؟'
  ];

  const options = ['نادراً', 'أحياناً', 'غالباً', 'دائماً'];

  const handleSelect = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: value });
  };

  const calculatePattern = (sum) => {
    if (sum <= 14) return 'The Burnt Survivor';
    if (sum <= 20) return 'The Silent Doubter';
    if (sum <= 26) return 'The Rescuer';
    return 'The Idealist';
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert('يرجى الإجابة على جميع الأسئلة');
      return;
    }

    const userScore = [...Array(8).keys()].reduce((acc, i) => acc + (parseInt(answers[i]) || 0), 0);
    const partnerScore = [...Array(8).keys()].reduce((acc, i) => acc + (parseInt(answers[i + 8]) || 0), 0);

    const userPattern = calculatePattern(userScore);
    const partnerPattern = calculatePattern(partnerScore);

    localStorage.setItem('userPattern', userPattern);
    localStorage.setItem('partnerPattern', partnerPattern);

    navigate('/analyze');
  };

  return (
    <div className="app-container">
      <h2>🧠 استبيان تحديد النمط العاطفي</h2>
      {questions.map((q, i) => (
        <div key={i}>
          <p><strong>{i + 1}. {q}</strong></p>
          {options.map((opt, val) => (
            <label key={val} style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name={`q${i}`}
                value={val + 1}
                checked={answers[i] === String(val + 1)}
                onChange={(e) => handleSelect(i, e.target.value)}
              /> {opt}
            </label>
          ))}
        </div>
      ))}

      <br />
      <button className="analyze-button" onClick={handleSubmit}>التالي</button>
    </div>
  );
};

export default Quiz;

