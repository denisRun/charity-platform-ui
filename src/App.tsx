import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProposalEventItemPage from './pages/proposition-event/ProposalEventItemPage';
import ProposalEventsPage from './pages/proposition-event/ProposalEventsPage';
import HelpEventsPage from './pages/help-event/HelpEventsPage';
import HelpEventItemPage from './pages/help-event/HelpEventItemPage';
import StatisticsPage from './pages/StatisticsPage';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<HomePage/>} path={'/'} />
          <Route element={<ProposalEventItemPage/>} path={'/propositions/:id'} />
          <Route element={<ProposalEventsPage/>} path={'/propositions'} />
          <Route element={<HelpEventsPage/>} path={'/helps'} />
          <Route element={<HelpEventItemPage/>} path={'/helps/:id'} />
          <Route element={<StatisticsPage/>} path={'/statistics'} />
          <Route element={<HomePage/>} path={'/about'} />

          <Route element={<AdminPage/>} path={'/admin'} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
