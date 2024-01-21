// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import RandomUserPage from './pages/RandomUserPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="page-transition-container">
          <Routes>
            <Route path="/" element={<RandomUserPage />} />
            <Route path="/user/:username" element={<UserPage />} />
          </Routes>
          <div className="arrow-container">
            <Link to="/user/username1"> &lt; </Link>
            <Link to="/user/username2"> &gt; </Link>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
