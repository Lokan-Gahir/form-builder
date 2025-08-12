import React, { useState } from 'react';
import QuestionEditor from './QuestionEditor';
import { api, uploadApi } from '../api';
import { useNavigate } from 'react-router-dom';

export default function FormEditor() {
  const [title, setTitle] = useState('Untitled Form');
  const [description, setDescription] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const addQuestion = (type) => {
    const q = { type, text: '', image: '', meta: {} };
    setQuestions([...questions, q]);
  };

  const updateQuestion = (index, updated) => {
    const newQs = [...questions];
    newQs[index] = updated;
    setQuestions(newQs);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await uploadApi.post('/image', formData);
    return res.data.url;
  };

  const saveForm = async () => {
    const payload = { title, description, headerImage, questions };
    const res = await api.post('/forms', payload);
    navigate(`/preview/${res.data._id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Form Builder</h1>

        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Form Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter form title"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Write a short description..."
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Header Image</label>
            <input
              type="file"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const url = await uploadImage(file);
                  setHeaderImage(url);
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {headerImage && (
              <img
                src={`http://localhost:5000${headerImage}`}
                alt="Header"
                className="mt-3 rounded-lg shadow max-h-48 object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* Question Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions</h2>
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => addQuestion('categorize')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Categorize
          </button>
          <button
            onClick={() => addQuestion('cloze')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            + Cloze
          </button>
          <button
            onClick={() => addQuestion('comprehension')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            + Comprehension
          </button>
        </div>

        {questions.length === 0 && (
          <p className="text-gray-500 italic">No questions added yet. Click a button above to add one.</p>
        )}

        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
              <QuestionEditor
                question={q}
                onChange={(updated) => updateQuestion(i, updated)}
                uploadImage={uploadImage}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveForm}
          className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 shadow-md transition"
        >
          Save & Preview
        </button>
      </div>
    </div>
  );
}
