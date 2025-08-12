import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useParams, Link } from 'react-router-dom';

export default function FormPreview() {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    api.get(`/forms/${id}`).then(res => setForm(res.data));
  }, [id]);

  if (!form) return <div>Loading...</div>;

  return (
    <div>
      <h1>{form.title}</h1>
      {form.headerImage && <img src={`http://localhost:5000${form.headerImage}`} alt="header" className="max-h-48" />}
      <p>{form.description}</p>
      <Link to={`/fill/${form._id}`} className="bg-blue-500 text-white px-3 py-1 mt-2 inline-block">Fill Form</Link>
    </div>
  );
}
