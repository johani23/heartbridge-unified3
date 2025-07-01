import { useState } from "react";

export default function Quiz() {
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = ["q1", "q2", "q3"].reduce((sum, key) => sum + Number(answers[key] || 0), 0);

    let resultText = "";
    if (total <= 5) resultText = "🕊️ نمطك: The Silent Doubter – تفضل الصمت وتُخفي مشاعرك.";
    else if (total <= 8) resultText = "🌿 نمطك: The Idealist – توازن نسبي لكن تحتاج وضوح أكبر.";
    else if (total <= 10) resultText = "💗 نمطك: The Rescuer – تبذل كثيرًا وتحتاج تأكيدًا دائمًا.";
    else resultText = "🔥 نمطك: The Burnt Survivor – مررت بخيبة أو صدمة وتخشى التكرار.";

    setResult(resultText);
    localStorage.setItem("heartbridge_cluster", resultText);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">استبيان تحليل الشخصية</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label>١. ما مدى تعبيرك عن مشاعرك؟</label>
          <select name="q1" onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">اختر...</option>
            <option value="1">نادرًا</option>
            <option value="2">أحيانًا</option>
            <option value="3">غالبًا</option>
            <option value="4">دائمًا</option>
          </select>
        </div>

        <div>
          <label>٢. كيف تتعامل مع الخلاف؟</label>
          <select name="q2" onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">اختر...</option>
            <option value="1">أتجنب المواجهة</option>
            <option value="2">أهدأ ثم أتكلم</option>
            <option value="3">أتكلم فورًا</option>
            <option value="4">أُصرّ على موقفي</option>
          </select>
        </div>

        <div>
          <label>٣. ما مدى حاجتك للاهتمام؟</label>
          <select name="q3" onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">اختر...</option>
            <option value="1">ضعيفة</option>
            <option value="2">متوسطة</option>
            <option value="3">عالية</option>
            <option value="4">مفرطة</option>
          </select>
        </div>

        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
          احسب النتيجة
        </button>
      </form>

      {result && <div className="mt-6 bg-gray-100 p-4 rounded shadow">{result}</div>}
    </div>
  );
}
