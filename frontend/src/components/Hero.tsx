import { useState } from 'react';
import { Button } from './ui/button';
import ChatInterface from './ChatInterface';

export default function Hero() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleDeepDiveClick = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <div className="mb-8 ">
        <div className="flex flex-col items-center text-center space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl mb-4 text-white">
              Unlock the Ocean Data with AI
            </h1>
            <p className="text-xl text-slate-300">
              Talk to Ocean Data – ask questions, see results, visualize charts.
            </p>
          </div>
          <Button 
            onClick={handleDeepDiveClick}
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 ml-10"
          >
            Start your Deep Dive →
          </Button>
        </div>
      </div>

      <ChatInterface isOpen={isChatOpen} onClose={handleCloseChat} />
    </>
  );
}