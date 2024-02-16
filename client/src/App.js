import './App.css';
import React from 'react';
import Home from 'pages/Home';
import NoPage from 'pages/NoPage';
import SignUp from 'pages/SignUp';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
