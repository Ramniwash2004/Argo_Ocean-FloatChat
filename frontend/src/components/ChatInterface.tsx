import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickReplies = [
  'Show Ocean Currents',
  'How is this data collected?',
  'Highlight Major Ecosystems'
];

const botResponses = {
  'Show Ocean Currents': 'I can display ocean current patterns across the Indian Ocean. The data shows major currents including the Indian Ocean Gyre and seasonal monsoon currents affecting the Bay of Bengal and Arabian Sea.',
  'How is this data collected?': 'Ocean data is collected through various methods: Argo floats measure temperature, salinity, and pressure profiles; acoustic sensors detect marine life and water column properties; satellite observations provide surface conditions; and autonomous underwater vehicles gather detailed measurements.',
  'Highlight Major Ecosystems': 'The Indian Ocean contains diverse ecosystems: coral reefs in the Maldives and Lakshadweep, mangrove forests along the coasts, deep-sea hydrothermal vents, and important fish migration routes through the Arabian Sea and Bay of Bengal.',
  default: 'I understand you\'re interested in ocean data. I can help you explore float positions, analyze environmental patterns, and understand marine ecosystems in the Indian Ocean region. What specific aspect would you like to know more about?'
};

export default function ChatInterface({ isOpen, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your Ocean Data AI assistant. I can help you explore and understand the ocean data visualized on this dashboard. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponses[content as keyof typeof botResponses] || botResponses.default,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-slate-900 rounded-lg w-full h-full max-w-5xl h-[70vh] flex flex-col border border-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700 ">
            <div>
              <h2 className="text-xl text-white">Ocean Data AI Assistant</h2>
              <p className="text-slate-400 text-sm">Ask questions about ocean data and visualizations</p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-teal-100' : 'text-slate-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-6 py-2">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <Button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-6 border-t border-slate-700">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about ocean data, float positions, or marine ecosystems..."
                className="flex-1 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-teal-500"
              />
              <Button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


// import React, { useState, useRef, useEffect } from 'react';
// import { Send, X } from 'lucide-react';

// interface ChatMessage {
//   id: number;
//   text: string;
//   isUser: boolean;
//   timestamp: string;
// }

// interface ChartData {
//   name: string;
//   value: number;
//   color: string;
// }

// const SplitOceanDashboard: React.FC = () => {
//   const [currentView, setCurrentView] = useState<'temperature' | 'currents' | 'ecosystems' | 'salinity' | 'pressure'>('temperature');
//   const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: 1,
//       text: "Hello! I'm your Ocean Data AI assistant. I can help you explore and understand the ocean data visualized on this dashboard. What would you like to know?",
//       isUser: false,
//       timestamp: "11:41:44 PM"
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (inputMessage.trim()) {
//       const userMessage: ChatMessage = {
//         id: messages.length + 1,
//         text: inputMessage,
//         isUser: true,
//         timestamp: new Date().toLocaleTimeString()
//       };
      
//       setMessages([...messages, userMessage]);
      
//       // Determine visualization based on message
//       const message = inputMessage.toLowerCase();
//       let responseText = "";
      
//       if (message.includes('current') || message.includes('flow')) {
//         setCurrentView('currents');
//         responseText = "I've updated the visualization to show ocean currents. The charts display current velocities and directional patterns.";
//       } else if (message.includes('ecosystem') || message.includes('marine') || message.includes('species')) {
//         setCurrentView('ecosystems');
//         responseText = "Now showing marine ecosystem data with biomass distribution and species diversity patterns.";
//       } else if (message.includes('salinity') || message.includes('salt')) {
//         setCurrentView('salinity');
//         responseText = "Salinity analysis is displayed, showing salt concentration variations with depth.";
//       } else if (message.includes('pressure') || message.includes('depth')) {
//         setCurrentView('pressure');
//         responseText = "Pressure profile visualization shows how hydrostatic pressure changes with ocean depth.";
//       } else if (message.includes('temperature') || message.includes('temp')) {
//         setCurrentView('temperature');
//         responseText = "Temperature analysis displayed, showing thermal stratification in the ocean column.";
//       } else {
//         responseText = "I can show different ocean data types. Try asking about 'temperature', 'currents', 'salinity', 'pressure', or 'marine ecosystems'.";
//       }
      
//       // Extract coordinates if present
//       const coordMatch = message.match(/([-+]?\d*\.?\d+)[,\s]+([-+]?\d*\.?\d+)/);
//       if (coordMatch) {
//         setCoordinates({
//           lat: parseFloat(coordMatch[1]),
//           lon: parseFloat(coordMatch[2])
//         });
//         responseText += ` Updated location to ${parseFloat(coordMatch[1]).toFixed(2)}, ${parseFloat(coordMatch[2]).toFixed(2)}.`;
//       }
      
//       setTimeout(() => {
//         const aiResponse: ChatMessage = {
//           id: messages.length + 2,
//           text: responseText,
//           isUser: false,
//           timestamp: new Date().toLocaleTimeString()
//         };
//         setMessages(prev => [...prev, aiResponse]);
//       }, 1000);
      
//       setInputMessage('');
//     }
//   };

//   // Generate data based on current view
//   const getViewData = () => {
//     const base = Math.abs(coordinates.lat) + Math.abs(coordinates.lon) + 15;
    
//     switch (currentView) {
//       case 'currents':
//         return {
//           title: 'Ocean Currents',
//           pieTitle: 'Current Direction',
//           barData: [
//             { name: '0m', value: base * 0.8, color: '#3B82F6' },
//             { name: '500m', value: base * 0.5, color: '#3B82F6' },
//             { name: '2000m', value: base * 0.2, color: '#3B82F6' }
//           ],
//           pieData: [
//             { name: 'North', value: 45, color: '#3B82F6' },
//             { name: 'East', value: 30, color: '#1D4ED8' },
//             { name: 'West', value: 25, color: '#1E3A8A' }
//           ],
//           unit: 'cm/s'
//         };
//       case 'ecosystems':
//         return {
//           title: 'Marine Ecosystem',
//           pieTitle: 'Biodiversity Mix',
//           barData: [
//             { name: 'Phytoplankton', value: base * 1.2, color: '#10B981' },
//             { name: 'Zooplankton', value: base * 0.8, color: '#10B981' },
//             { name: 'Fish', value: base * 0.4, color: '#10B981' }
//           ],
//           pieData: [
//             { name: 'Producers', value: 50, color: '#10B981' },
//             { name: 'Primary', value: 30, color: '#059669' },
//             { name: 'Secondary', value: 20, color: '#047857' }
//           ],
//           unit: 'mg/m³'
//         };
//       case 'salinity':
//         return {
//           title: 'Salinity Profile',
//           pieTitle: 'Water Mass Distribution',
//           barData: [
//             { name: '0m', value: 35 + base * 0.05, color: '#0891B2' },
//             { name: '500m', value: 35.2 + base * 0.05, color: '#0891B2' },
//             { name: '2000m', value: 35.5 + base * 0.05, color: '#0891B2' }
//           ],
//           pieData: [
//             { name: 'Surface', value: 35, color: '#06B6D4' },
//             { name: 'Intermediate', value: 40, color: '#0891B2' },
//             { name: 'Deep', value: 25, color: '#0E7490' }
//           ],
//           unit: 'PSU'
//         };
//       case 'pressure':
//         return {
//           title: 'Pressure Analysis',
//           pieTitle: 'Pressure Distribution',
//           barData: [
//             { name: '0m', value: 1, color: '#7C3AED' },
//             { name: '500m', value: 51, color: '#7C3AED' },
//             { name: '2000m', value: 201, color: '#7C3AED' }
//           ],
//           pieData: [
//             { name: 'Surface', value: 5, color: '#A78BFA' },
//             { name: 'Hydrostatic', value: 85, color: '#7C3AED' },
//             { name: 'Dynamic', value: 10, color: '#5B21B6' }
//           ],
//           unit: 'atm'
//         };
//       default:
//         return {
//           title: 'Temperature Profile',
//           pieTitle: 'Surface Mix',
//           barData: [
//             { name: '0m', value: 25 + base * 0.2, color: '#EF4444' },
//             { name: '500m', value: 15 + base * 0.1, color: '#EF4444' },
//             { name: '2000m', value: 5 + base * 0.05, color: '#EF4444' }
//           ],
//           pieData: [
//             { name: 'Temp', value: 44.3, color: '#F87171' },
//             { name: 'Salinity', value: 34.1, color: '#06B6D4' },
//             { name: 'Pressure', value: 21.6, color: '#10B981' }
//           ],
//           unit: '°C'
//         };
//     }
//   };

//   const data = getViewData();

//   // Chart Components
//   const BarChart = () => {
//     const maxValue = Math.max(...data.barData.map(d => d.value));
    
//     return (
//       <div className="bg-white rounded-lg p-6 shadow-lg">
//         <h3 className="text-gray-800 font-semibold text-lg mb-4">
//           {data.title} @ {coordinates.lat.toFixed(2)}, {coordinates.lon.toFixed(2)}
//         </h3>
//         <div className="h-64 relative">
//           <div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-xs text-gray-500 w-12">
//             <span>{maxValue.toFixed(0)}</span>
//             <span>{(maxValue * 0.75).toFixed(0)}</span>
//             <span>{(maxValue * 0.5).toFixed(0)}</span>
//             <span>{(maxValue * 0.25).toFixed(0)}</span>
//             <span>0</span>
//           </div>
          
//           <div className="absolute left-12 right-0 top-0 bottom-12 flex items-end justify-around">
//             {data.barData.map((item, index) => (
//               <div key={index} className="flex flex-col items-center group">
//                 <div 
//                   className="w-16 transition-all duration-300 hover:opacity-80 cursor-pointer relative rounded-t"
//                   style={{ 
//                     height: `${(item.value / maxValue) * 100}%`,
//                     backgroundColor: item.color,
//                     minHeight: '8px'
//                   }}
//                 >
//                   <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                     {item.value.toFixed(1)} {data.unit}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="absolute left-12 right-0 bottom-0 flex justify-around">
//             {data.barData.map((item, index) => (
//               <span key={index} className="text-sm text-gray-600 font-medium">{item.name}</span>
//             ))}
//           </div>
//         </div>
        
//         <div className="flex items-center mt-4 text-sm">
//           <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: data.barData[0].color }} />
//           <span className="text-gray-700">{data.unit === '°C' ? 'Temperature' : data.unit === 'cm/s' ? 'Current Speed' : data.unit === 'PSU' ? 'Salinity' : data.unit === 'atm' ? 'Pressure' : 'Biomass'} ({data.unit})</span>
//         </div>
//       </div>
//     );
//   };

//   const PieChart = () => {
//     const createPath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
//       const start = polarToCartesian(centerX, centerY, radius, endAngle);
//       const end = polarToCartesian(centerX, centerY, radius, startAngle);
//       const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
//       return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
//     };

//     const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
//       const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
//       return {
//         x: centerX + (radius * Math.cos(angleInRadians)),
//         y: centerY + (radius * Math.sin(angleInRadians))
//       };
//     };

//     const total = data.pieData.reduce((sum, item) => sum + item.value, 0);
//     let currentAngle = 0;
//     const slices = data.pieData.map((item) => {
//       const percentage = (item.value / total) * 100;
//       const angle = (percentage / 100) * 360;
//       const slice = {
//         ...item,
//         percentage,
//         startAngle: currentAngle,
//         endAngle: currentAngle + angle
//       };
//       currentAngle += angle;
//       return slice;
//     });

//     return (
//       <div className="bg-white rounded-lg p-6 shadow-lg">
//         <h3 className="text-gray-800 font-semibold text-lg mb-4">{data.pieTitle}</h3>
//         <div className="flex items-center">
//           <div className="flex-1 flex justify-center">
//             <svg width="140" height="140">
//               <circle cx="70" cy="70" r="25" fill="white" />
//               {slices.map((slice, index) => (
//                 <path
//                   key={index}
//                   d={createPath(70, 70, 60, slice.startAngle, slice.endAngle)}
//                   fill={slice.color}
//                   className="hover:opacity-80 transition-opacity cursor-pointer"
//                   stroke="white"
//                   strokeWidth="2"
//                 />
//               ))}
//             </svg>
//           </div>
          
//           <div className="flex-1 space-y-3">
//             {slices.map((item, index) => (
//               <div key={index} className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: item.color }} />
//                   <span className="text-sm text-gray-700">{item.name}</span>
//                 </div>
//                 <span className="text-sm font-semibold text-gray-900">
//                   {item.percentage.toFixed(1)}%
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex">
      
//       {/* LEFT SIDE - CHAT */}
//       <div className="w-1/2 bg-slate-800 flex flex-col border-r border-slate-700">
//         {/* Chat Header */}
//         <div className="border-b border-slate-700 p-6">
//           <div className="flex justify-between items-start">
//             <div>
//               <h2 className="text-xl font-bold text-white mb-2">Ocean Data AI Assistant</h2>
//               <p className="text-slate-400">Ask questions about ocean data and visualizations</p>
//             </div>
//             <X className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white" />
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4">
//           {messages.map((message) => (
//             <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
//               <div className={`max-w-sm px-4 py-3 rounded-lg ${
//                 message.isUser 
//                   ? 'bg-cyan-600 text-white' 
//                   : 'bg-slate-700 text-slate-100 border border-slate-600'
//               }`}>
//                 <p className="text-sm">{message.text}</p>
//                 <p className="text-xs opacity-70 mt-2">{message.timestamp}</p>
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Suggested Questions */}
//         <div className="p-6 border-t border-slate-700 space-y-4">
//           <div className="flex flex-wrap gap-2">
//             {['Show Ocean Currents', 'How is this data collected?', 'Highlight Major Ecosystems'].map((question, index) => (
//               <button
//                 key={index}
//                 onClick={() => setInputMessage(question)}
//                 className="px-3 py-2 bg-slate-700 text-slate-300 text-sm rounded-full hover:bg-slate-600 transition-colors"
//               >
//                 {question}
//               </button>
//             ))}
//           </div>

//           {/* Message Input */}
//           <div className="flex space-x-3">
//             <input
//               type="text"
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               placeholder="Ask about ocean data, float positions, or marine ecosystems..."
//               className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
//             />
//             <button
//               onClick={handleSendMessage}
//               className="bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-lg transition-colors"
//             >
//               <Send className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE - DIAGRAMS */}
//       <div className="w-1/2 bg-gray-100 p-6 overflow-y-auto">
//         <div className="space-y-6">
//           {/* Header */}
//           <div className="bg-white rounded-lg p-4 shadow-sm">
//             <h1 className="text-2xl font-bold text-gray-800 mb-2">OceaScope</h1>
//             <div className="flex space-x-6 text-sm">
//               <span className="text-gray-600">Home</span>
//               <span className="text-cyan-600 font-medium">Interactive</span>
//               <span className="text-gray-600">Compare</span>
//             </div>
//           </div>

//           {/* Assistant Info */}
//           <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//             <h4 className="font-medium text-gray-800 mb-2">ASSISTANT</h4>
//             <p className="text-sm text-gray-600">
//               Hi! Ask about ocean conditions. Try including coordinates like 34.5N, 120.2W.
//             </p>
//           </div>

//           {/* Charts */}
//           <BarChart />
//           <PieChart />

//           {/* Coordinate Input */}
//           <div className="bg-white rounded-lg p-4 shadow-sm">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
//                 <input
//                   type="number"
//                   value={coordinates.lat}
//                   onChange={(e) => setCoordinates({ ...coordinates, lat: parseFloat(e.target.value) || 0 })}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
//                 <input
//                   type="number"
//                   value={coordinates.lon}
//                   onChange={(e) => setCoordinates({ ...coordinates, lon: parseFloat(e.target.value) || 0 })}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SplitOceanDashboard;
