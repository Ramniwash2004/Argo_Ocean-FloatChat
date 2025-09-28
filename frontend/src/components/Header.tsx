import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Waves } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();

  const handleTryNow = () => {
    navigate('/try-now');
  };

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-2 rounded-lg">
              <Waves className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">FloatChat</h1>
              <p className="text-slate-400 text-xs">Ocean Data AI</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/compare" className="text-cyan-400 hover:text-cyan-600 underline hover:underline transition-colors font-medium">
              compare
            </Link>
            <Link to="/features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <Button
            onClick={handleTryNow}
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            Try Now
          </Button>
        </div>
      </div>
    </header>
  );
}