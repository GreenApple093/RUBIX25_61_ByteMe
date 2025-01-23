import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Todo from './Pages/Todo';
import Treasure from './Pages/Treasure';
import Capsule from './Pages/Capsule';
import Signup from './Pages/Signup';
import MainWebsite from './Pages/MainWebsite';
import Chest from './Pages/Chest';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/to-do' element={<Todo />} />
        <Route path='/main' element={<MainWebsite />} />
        <Route path='/treasure' element={<Treasure />} />
        <Route path='/capsule' element={<Capsule />} />
        <Route path='/chest' element={<Chest />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
