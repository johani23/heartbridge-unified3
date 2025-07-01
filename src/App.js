import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import Analyzer from './pages/Analyzer';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/analyze" element={<Analyzer />} />
      </Routes>
    </Router>
  );
}

export default App;
