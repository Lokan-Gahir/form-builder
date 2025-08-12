import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useParams } from 'react-router-dom';

export default function FormFill() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    api.get(`/forms/${id}`).then(res => setForm(res.data));
  }, [id]);

  const setAnswer = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const submit = async () => {
    await api.post(`/forms/${id}/responses`, { answers });
    alert('Submitted!');
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div>
      <h1>{form.title}</h1>
      {form.questions.map((q, i) => (
        <div key={i} className="border p-2 mt-2">
          <p>{q.text}</p>
          {q.type === 'categorize' && q.meta.items?.map((item, idx) => (
            <div key={idx}>
              {item}: <input onChange={(e) => setAnswer(`${i}-${idx}`, e.target.value)} placeholder="Bucket" />
            </div>
          ))}
          {q.type === 'cloze' && (
            <input onChange={(e) => setAnswer(i, e.target.value)} placeholder="Fill blank" />
          )}
          {q.type === 'comprehension' && q.meta.subquestions?.map((sq, idx) => (
            <div key={idx}>
              {sq.question} <input onChange={(e) => setAnswer(`${i}-${idx}`, e.target.value)} />
            </div>
          ))}
        </div>
      ))}
      <button onClick={submit} className="bg-green-500 text-white px-3 py-1 mt-3">Submit</button>
    </div>
  );
}
