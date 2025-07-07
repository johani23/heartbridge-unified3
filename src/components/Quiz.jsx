import React, { useState } from 'react';

function Quiz({ onComplete }) {
  const sectionOneQuestions = [
    "هل شعرت بالأمان العاطفي في طفولتك؟",
    "هل كنت قادراً على التعبير عن مشاعرك أمام والديك؟",
    "هل عشت في منزل يغلب عليه الصراع أو التوتر؟",
    "هل شعرت أنك محبوب بدون شروط؟",
    "هل كنت تلجأ لأحد والديك عند الحزن؟",
    "هل كانت والدتك قريبة منك عاطفياً؟",
    "هل كانت أمك تنتقدك كثيراً؟",
    "هل شعرت أن حب أمك كان مرتبطاً بأدائك أو تصرفاتك؟"
  ];

  const sectionTwoQuestions = [
    "هل تعتقد أن شريكك سيؤثر على قراراتك المصيرية؟",
    "هل تخاف أن تُهمل في العلاقة إذا لم تُبادر دائماً؟",
    "هل تتوقع من شريكك أن يفهمك بدون أن تشرح؟",
    "هل ترى أن الطرف الآخر يجب أن يعالج جروحك القديمة؟",
    "هل تغار بسهولة أو تحلل سلوك الطرف الآخر بشكل مفرط؟",
    "هل تتوقع من شريكك أن يتحمّل انفجارك العاطفي؟",
    "هل تعتقد أن العلاقة الحقيقية يجب أن تنقذك من وحدتك؟",
    "هل تشعر أن شريكك عليه أن يعوّضك عن غياب والدك/والدتك؟",
    "هل تؤمن أن التضحية الكاملة من طرف واحد تعني حباً حقيقياً؟",
    "هل تنتظر أن يحبك شريكك بنفس طريقة حبك له؟"
  ];

  const allQuestions = [...sectionOneQuestions, ...sectionTwoQuestions];
  const [answers, setAnswers] = useState(Array(allQuestions.length).fill(""));

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    if (answers.includes("")) {
      alert("يرجى الإجابة على جميع الأسئلة.");
      return;
    }

    localStorage.setItem("userQuizAnswers", JSON.stringify(answers));
    onComplete && onComplete();
  };

  const renderQuestion = (question, index) => (
    <div key={index} style={{ marginBottom: '20px' }}>
      <p><strong>{index + 1}. {question}</strong></p>
      {["نادراً", "أحياناً", "غالباً", "دائماً"].map((option, i) => (
        <label key={i} style={{ marginRight: '10px' }}>
          <input
            type="radio"
            name={`q-${index}`}
            value={option}
            checked={answers[index] === option}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          /> {option}
        </label>
      ))}
    </div>
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧠 استبيان تحديد النمط العاطفي</h2>
      {allQuestions.map((q, i) => renderQuestion(q, i))}
      <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px 20px' }}>
        التالي
      </button>
    </div>
  );
}

export default Quiz;
