import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Mainpage from './pages/mainpage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path (/) to /signin */}
        <Route path="/" element={<Navigate to="/signin" />} />
        
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mainpage" element={<Mainpage />} />
      </Routes>
    </Router>
  );
}

export default App;
