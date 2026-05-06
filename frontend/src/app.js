import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DiscussionDetail from './pages/DiscussionDetail';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} /> {/* 추가 */}
        <Route path="/discussion/:id" element={<DiscussionDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;