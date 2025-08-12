import React from 'react';

export default function QuestionEditor({ question, onChange, uploadImage }) {
  const setField = (field, value) => {
    onChange({ ...question, [field]: value });
  };

  const setMeta = (field, value) => {
    onChange({ ...question, meta: { ...question.meta, [field]: value } });
  };

  return (
    <div className="border p-3 mt-4">
      <input value={question.text} onChange={(e) => setField('text', e.target.value)} placeholder="Question text" className="border p-2 w-full" />

      <input type="file" onChange={async (e) => {
        const file = e.target.files[0];
        if (file) {
          const url = await uploadImage(file);
          setField('image', url);
        }
      }} className="mt-2" />

      {question.image && <img src={`http://localhost:5000${question.image}`} alt="question" className="mt-2 max-h-48" />}

      {question.type === 'categorize' && (
        <>
          <input value={(question.meta.buckets || []).join(',')} onChange={(e) => setMeta('buckets', e.target.value.split(','))} placeholder="Buckets (comma separated)" className="border p-2 w-full mt-2" />
          <input value={(question.meta.items || []).join(',')} onChange={(e) => setMeta('items', e.target.value.split(','))} placeholder="Items (comma separated)" className="border p-2 w-full mt-2" />
        </>
      )}

      {question.type === 'cloze' && (
        <>
          <textarea value={question.meta.textWithBlanks || ''} onChange={(e) => setMeta('textWithBlanks', e.target.value)} placeholder="Text with [[blank]]" className="border p-2 w-full mt-2" />
          <input value={(question.meta.answers || []).join(',')} onChange={(e) => setMeta('answers', e.target.value.split(','))} placeholder="Answers (comma separated)" className="border p-2 w-full mt-2" />
        </>
      )}

      {question.type === 'comprehension' && (
        <>
          <textarea value={question.meta.passage || ''} onChange={(e) => setMeta('passage', e.target.value)} placeholder="Passage" className="border p-2 w-full mt-2" />
          <textarea value={(question.meta.subquestions || []).map(s => s.question).join('\n')} onChange={(e) => setMeta('subquestions', e.target.value.split('\n').map(q => ({ question: q })))} placeholder="Subquestions (one per line)" className="border p-2 w-full mt-2" />
        </>
      )}
    </div>
  );
}
