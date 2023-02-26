import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<HomePage/>} path={'/'} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
