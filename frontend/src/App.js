import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FormEditor from './components/FormEditor';
import FormPreview from './components/FormPreview';
import FormFill from './components/FormFill';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-blue-500 text-white">
        <Link to="/">Editor</Link>
      </nav>
      <Routes>
        <Route path="/" element={<FormEditor />} />
        <Route path="/preview/:id" element={<FormPreview />} />
        <Route path="/fill/:id" element={<FormFill />} />
      </Routes>
    </BrowserRouter>
  );
}
