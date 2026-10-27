import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Predictions } from './pages/Predictions';
import { Screener } from './pages/Screener';
import { Watchlist } from './pages/Watchlist';
import { Portfolio } from './pages/Portfolio';
import { News } from './pages/News';
import { AI } from './pages/AI';
import { About } from './pages/About';
import { Settings } from './pages/Settings';
import { ModelPerformance } from './pages/ModelPerformance';

export const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/screener" element={<Screener />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/news" element={<News />} />
          <Route path="/ai-assistant" element={<AI />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/model-performance" element={<ModelPerformance />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

