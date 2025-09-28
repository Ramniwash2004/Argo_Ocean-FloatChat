import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import FullscreenMap from './components/FullscreenMap';
import OceanComparisonApp from './components/Compare';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';
import TryNow from './components/TryNow';
import Header from './components/Header';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fullscreen-map" element={<FullscreenMap />} />
          <Route path="/compare" element={<OceanComparisonApp />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/try-now" element={<TryNow />} />
          {/* Catch-all route to redirect any unmatched paths to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}