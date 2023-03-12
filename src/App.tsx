import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProposalEventsPage from './pages/proposition-event/ProposalEventsPage';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<HomePage/>} path={'/'} />
          <Route element={<ProposalEventsPage/>} path={'/propositions'} />
          <Route element={<HomePage/>} path={'/help'} />
          <Route element={<HomePage/>} path={'/statistics'} />
          <Route element={<HomePage/>} path={'/about'} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
