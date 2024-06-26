import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginView from './views/login.view';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
      </Routes>
    </Router>
  );
};

export default App;
