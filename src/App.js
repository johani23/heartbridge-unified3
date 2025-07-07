import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Analyzer from './components/Analyzer';
import Landing from './components/Landing';
import Quiz from './components/Quiz';

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