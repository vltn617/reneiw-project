import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DiscussionDetail from './pages/DiscussionDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discussion/:id" element={<DiscussionDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;