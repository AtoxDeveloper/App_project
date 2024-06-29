import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashView from './views/splash.view';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashView />} />
      </Routes>
    </Router>
  );
};

export default App;
