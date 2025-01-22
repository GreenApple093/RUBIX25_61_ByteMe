import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Todo from './Pages/Todo';
import Treasure from './Pages/Treasure';
import Capsule from './Pages/Capsule';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/to-do' element={<Todo />} />
        <Route path='/treasure' element={<Treasure />} />
        <Route path='/capsule' element={<Capsule />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
