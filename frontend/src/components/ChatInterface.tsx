// import { useState, useRef, useEffect } from 'react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Send, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'motion/react';

// interface ChatMessage {
//   id: string;
//   type: 'user' | 'bot';
//   content: string;
//   timestamp: Date;
// }

// interface ChatInterfaceProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const quickReplies = [
//   'Show Ocean Currents',
//   'How is this data collected?',
//   'Highlight Major Ecosystems'
// ];

// const botResponses = {
//   'Show Ocean Currents': 'I can display ocean current patterns across the Indian Ocean. The data shows major currents including the Indian Ocean Gyre and seasonal monsoon currents affecting the Bay of Bengal and Arabian Sea.',
//   'How is this data collected?': 'Ocean data is collected through various methods: Argo floats measure temperature, salinity, and pressure profiles; acoustic sensors detect marine life and water column properties; satellite observations provide surface conditions; and autonomous underwater vehicles gather detailed measurements.',
//   'Highlight Major Ecosystems': 'The Indian Ocean contains diverse ecosystems: coral reefs in the Maldives and Lakshadweep, mangrove forests along the coasts, deep-sea hydrothermal vents, and important fish migration routes through the Arabian Sea and Bay of Bengal.',
//   default: 'I understand you\'re interested in ocean data. I can help you explore float positions, analyze environmental patterns, and understand marine ecosystems in the Indian Ocean region. What specific aspect would you like to know more about?'
// };

// export default function ChatInterface({ isOpen, onClose }: ChatInterfaceProps) {
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: '1',
//       type: 'bot',
//       content: 'Hello! I\'m your Ocean Data AI assistant. I can help you explore and understand the ocean data visualized on this dashboard. What would you like to know?',
//       timestamp: new Date()
//     }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = (content: string) => {
//     if (!content.trim()) return;

//     const userMessage: ChatMessage = {
//       id: Date.now().toString(),
//       type: 'user',
//       content: content.trim(),
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputValue('');

//     // Simulate bot response
//     setTimeout(() => {
//       const botResponse: ChatMessage = {
//         id: (Date.now() + 1).toString(),
//         type: 'bot',
//         content: botResponses[content as keyof typeof botResponses] || botResponses.default,
//         timestamp: new Date()
//       };
//       setMessages(prev => [...prev, botResponse]);
//     }, 1000);
//   };

//   const handleQuickReply = (reply: string) => {
//     handleSendMessage(reply);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     handleSendMessage(inputValue);
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           transition={{ type: "spring", duration: 0.5 }}
//           className="bg-slate-900 rounded-lg w-full h-full max-w-5xl h-[70vh] flex flex-col border border-slate-700"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-6 border-b border-slate-700 ">
//             <div>
//               <h2 className="text-xl text-white">Ocean Data AI Assistant</h2>
//               <p className="text-slate-400 text-sm">Ask questions about ocean data and visualizations</p>
//             </div>
//             <Button
//               onClick={onClose}
//               variant="ghost"
//               size="sm"
//               className="text-slate-400 hover:text-white hover:bg-slate-800"
//             >
//               <X className="w-5 h-5" />
//             </Button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-6 space-y-4">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`max-w-[80%] p-4 rounded-lg ${
//                     message.type === 'user'
//                       ? 'bg-teal-600 text-white'
//                       : 'bg-slate-800 text-slate-200 border border-slate-700'
//                   }`}
//                 >
//                   <p>{message.content}</p>
//                   <p className={`text-xs mt-2 ${
//                     message.type === 'user' ? 'text-teal-100' : 'text-slate-500'
//                   }`}>
//                     {message.timestamp.toLocaleTimeString()}
//                   </p>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Quick Replies */}
//           <div className="px-6 py-2">
//             <div className="flex flex-wrap gap-2">
//               {quickReplies.map((reply) => (
//                 <Button
//                   key={reply}
//                   onClick={() => handleQuickReply(reply)}
//                   variant="outline"
//                   size="sm"
//                   className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
//                 >
//                   {reply}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* Input */}
//           <div className="p-6 border-t border-slate-700">
//             <form onSubmit={handleSubmit} className="flex space-x-4">
//               <Input
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 placeholder="Ask about ocean data, float positions, or marine ecosystems..."
//                 className="flex-1 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-teal-500"
//               />
//               <Button
//                 type="submit"
//                 disabled={!inputValue.trim()}
//                 className="bg-teal-600 hover:bg-teal-700 text-white px-6"
//               >
//                 <Send className="w-4 h-4" />
//               </Button>
//             </form>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }



import React, { useState } from 'react';
import { Send,X, Activity, Droplet, Gauge } from 'lucide-react';
import { PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  text: string;
  data: DemoChat | null;
}

interface PieDataItem {
  name: string;
  value: number;
  color: string;
}

interface Stats {
  [key: string]: number;
}

interface DemoChat {
  id: number;
  question: string;
  answer: string;
  lineData: Array<{ [key: string]: string | number }>;
  pieData: PieDataItem[];
  stats: Stats;
}
interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      text: 'Welcome to Ocean Analytics! I can help you analyze marine data. What would you like to explore?',
      data: null
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [activeChat, setActiveChat] = useState<DemoChat | null>(null);

  const demoChats: DemoChat[] = [
    {
      id: 2,
      question: 'Show me Region A temperature analysis',
      answer: 'Region A shows temperature ranging from 22°C to 32°C across different depths. The surface temperature is highest at 32°C, decreasing to 22°C in deep waters.',
      lineData: [
        { depth: 'Surface', temp: 32, salinity: 36.1, pressure: 20.4 },
        { depth: 'Mid', temp: 27, salinity: 36.5, pressure: 45.2 },
        { depth: 'Deep', temp: 22, salinity: 37.2, pressure: 78.6 }
      ],
      pieData: [
        { name: 'Temperature', value: 36, color: '#06b6d4' },
        { name: 'Salinity', value: 41, color: '#3b82f6' },
        { name: 'Pressure', value: 23, color: '#1e40af' }
      ],
      stats: { temp: 32.0, salinity: 36.1, pressure: 20.4 }
    },
    {
      id: 3,
      question: 'Compare Region A vs Region B',
      answer: 'Region A has higher average temperatures (27°C) compared to Region B (20°C). Region B shows higher salinity levels at 35.8 PSU versus Region A at 36.1 PSU.',
      lineData: [
        { region: 'Surface A', value: 32 },
        { region: 'Mid A', value: 27 },
        { region: 'Deep A', value: 22 },
        { region: 'Surface B', value: 25 },
        { region: 'Mid B', value: 20 },
        { region: 'Deep B', value: 15 }
      ],
      pieData: [
        { name: 'Region A Temp', value: 45, color: '#06b6d4' },
        { name: 'Region B Temp', value: 55, color: '#3b82f6' }
      ],
      stats: { tempA: 27.0, tempB: 20.0, diff: 7.0 }
    },
    {
      id: 4,
      question: 'Analyze salinity distribution',
      answer: 'Salinity levels are highest in deep waters at 37.2 PSU for Region A and 35.8 PSU for Region B. This indicates stable stratification in both regions.',
      lineData: [
        { layer: 'Surface', regionA: 36.1, regionB: 35.8 },
        { layer: 'Mid', regionA: 36.5, regionB: 35.9 },
        { layer: 'Deep', regionA: 37.2, regionB: 36.2 }
      ],
      pieData: [
        { name: 'Low Salinity', value: 25, color: '#06b6d4' },
        { name: 'Medium', value: 45, color: '#3b82f6' },
        { name: 'High Salinity', value: 30, color: '#1e40af' }
      ],
      stats: { avgA: 36.1, avgB: 35.8, maxA: 37.2 }
    },
    {
      id: 5,
      question: 'What about pressure profiles?',
      answer: 'Pressure increases with depth as expected. Region A shows 20.4 dbar at surface, 45.2 at mid-depth, and 78.6 at deep levels. Region B has similar patterns with slightly lower values.',
      lineData: [
        { depth: '0m', pressure: 20.4 },
        { depth: '50m', pressure: 45.2 },
        { depth: '100m', pressure: 78.6 },
        { depth: '150m', pressure: 105.3 },
        { depth: '200m', pressure: 132.7 }
      ],
      pieData: [
        { name: 'Surface Zone', value: 15, color: '#06b6d4' },
        { name: 'Mid Zone', value: 35, color: '#3b82f6' },
        { name: 'Deep Zone', value: 50, color: '#1e40af' }
      ],
      stats: { surface: 20.4, mid: 45.2, deep: 78.6 }
    },
    {
      id: 6,
      question: 'Show overall data trends',
      answer: 'Overall analysis shows consistent thermal stratification across both regions with temperature gradients of approximately 10°C from surface to deep waters. Salinity remains relatively stable.',
      lineData: [
        { month: 'Jan', temp: 24, sal: 35.5 },
        { month: 'Feb', temp: 25, sal: 35.7 },
        { month: 'Mar', temp: 27, sal: 36.0 },
        { month: 'Apr', temp: 29, sal: 36.2 },
        { month: 'May', temp: 31, sal: 36.4 },
        { month: 'Jun', temp: 32, sal: 36.5 }
      ],
      pieData: [
        { name: 'Temp Variance', value: 40, color: '#06b6d4' },
        { name: 'Sal Variance', value: 30, color: '#3b82f6' },
        { name: 'Stable', value: 30, color: '#1e40af' }
      ],
      stats: { avgTemp: 28.0, avgSal: 36.1, variance: 0.8 }
    }
  ];

  const handleSendMessage = (): void => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      type: 'user',
      text: input,
      data: null
    };

    const matchedDemo = demoChats.find(demo => 
      input.toLowerCase().includes('region') || 
      input.toLowerCase().includes('temperature') ||
      input.toLowerCase().includes('salinity') ||
      input.toLowerCase().includes('pressure') ||
      input.toLowerCase().includes('compare') ||
      input.toLowerCase().includes('trend')
    );

    const botResponse = matchedDemo || demoChats[Math.floor(Math.random() * demoChats.length)];

    setTimeout(() => {
      setMessages(prev => [...prev, userMsg, {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponse.answer,
        data: botResponse
      }]);
      setActiveChat(botResponse);
    }, 500);

    setInput('');
  };

  const handleDemoClick = (demo: DemoChat): void => {
    const userMsg: Message = {
      id: Date.now(),
      type: 'user',
      text: demo.question,
      data: null
    };

    setTimeout(() => {
      setMessages(prev => [...prev, userMsg, {
        id: Date.now() + 1,
        type: 'bot',
        text: demo.answer,
        data: demo
      }]);
      setActiveChat(demo);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="max-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 mt-10 flex">

      {/* Left Chat Section */}
      <div className="w-1/2 flex p-6 flex-col border border-slate-700 overflow-y-auto">

        {/* Header */}
        <div className="flex-none bg-slate-800 p-6 border-b border-slate-700">
          <h2 className="text-xl text-white font-bold">Ocean Data AI Assistant</h2>
          <p className="text-slate-400 text-sm">Ask questions about ocean data and visualizations</p>
        </div>

        {/* Demo Buttons */}
        <div className="bg-slate-800/50 p-4 border-b border-slate-700">
          <p className="text-xs text-slate-400 mb-2">Quick Analysis:</p>
          <div className="flex flex-wrap gap-2">
            {demoChats.slice(0, 3).map(demo => (
              <button
                key={demo.id}
                onClick={() => handleDemoClick(demo)}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-full text-xs transition-colors"
              >
                {demo.question.substring(0, 20)}...
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="w-1/2 flex p-6 flex-col border-r border-slate-700 overflow-y-auto">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.type === 'user'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-700 text-slate-100'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-800 border-t border-slate-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about ocean data..."
              className="flex-1 bg-slate-700 text-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-xl transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Visualization Section */}
      <div className="fixed-w-1/2 flex p-4 flex-col border-l border-slate-700 overflow-y-auto">
        {activeChat ? (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="text-cyan-400" size={20} />
                  <span className="text-slate-400 text-xs">Temperature</span>
                </div>
                <p className="text-2xl font-bold text-cyan-400">
                  {activeChat.stats.temp || activeChat.stats.tempA || activeChat.stats.avgTemp}°C
                </p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Droplet className="text-blue-400" size={20} />
                  <span className="text-slate-400 text-xs">Salinity</span>
                </div>
                <p className="text-2xl font-bold text-blue-400">
                  {activeChat.stats.salinity || activeChat.stats.avgA || activeChat.stats.avgSal} PSU
                </p>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="text-indigo-400" size={20} />
                  <span className="text-slate-400 text-xs">Pressure</span>
                </div>
                <p className="text-2xl font-bold text-indigo-400">
                  {activeChat.stats.pressure || activeChat.stats.deep || activeChat.stats.variance} dbar
                </p>
              </div>
            </div>

            {/* Line/Area Chart */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-slate-300 font-semibold mb-4">Data Trends</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={activeChat.lineData}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey={Object.keys(activeChat.lineData[0])[0]} stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#cbd5e1' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={Object.keys(activeChat.lineData[0])[1]} 
                    stroke="#06b6d4" 
                    fillOpacity={1} 
                    fill="url(#colorTemp)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart & Map */}
            <div className="grid grid-cols-2 gap-4">
              {/* Pie Chart */}
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-slate-300 font-semibold mb-4">Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={activeChat.pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {activeChat.pieData.map((entry: PieDataItem, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {activeChat.pieData.map((item: PieDataItem, idx: number) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                        <span className="text-slate-400">{item.name}</span>
                      </div>
                      <span className="text-slate-300 font-semibold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative overflow-hidden">
                <h3 className="text-slate-300 font-semibold mb-4">Region Map</h3>
                <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg relative">
                  {/* Simple map visualization */}
                  <div className="absolute top-8 left-8 w-12 h-12 bg-cyan-500 rounded-full opacity-70 animate-pulse"></div>
                  <div className="absolute top-16 right-12 w-10 h-10 bg-blue-500 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-12 left-16 w-8 h-8 bg-indigo-500 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-slate-600 text-xs">Interactive Map View</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-slate-400">Region A</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-400">Region B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Select a query to view visualizations</p>
              <p className="text-slate-600 text-sm mt-2">Charts and maps will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;

// import React, { useState } from 'react';
// import { Send, Activity, Droplet, Gauge } from 'lucide-react';
// import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

// const OceanAnalyticsChat = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: 'bot',
//       text: 'Welcome to Ocean Analytics! I can help you analyze marine data. What would you like to explore?',
//       data: null
//     }
//   ]);
//   const [input, setInput] = useState('');
//   const [activeChat, setActiveChat] = useState(null);

//   const demoChats = [
//     {
//       id: 2,
//       question: 'Show me Region A temperature analysis',
//       answer: 'Region A shows temperature ranging from 22°C to 32°C across different depths. The surface temperature is highest at 32°C, decreasing to 22°C in deep waters.',
//       lineData: [
//         { depth: 'Surface', temp: 32, salinity: 36.1, pressure: 20.4 },
//         { depth: 'Mid', temp: 27, salinity: 36.5, pressure: 45.2 },
//         { depth: 'Deep', temp: 22, salinity: 37.2, pressure: 78.6 }
//       ],
//       pieData: [
//         { name: 'Temperature', value: 36, color: '#06b6d4' },
//         { name: 'Salinity', value: 41, color: '#3b82f6' },
//         { name: 'Pressure', value: 23, color: '#1e40af' }
//       ],
//       stats: { temp: 32.0, salinity: 36.1, pressure: 20.4 }
//     },
//     {
//       id: 3,
//       question: 'Compare Region A vs Region B',
//       answer: 'Region A has higher average temperatures (27°C) compared to Region B (20°C). Region B shows higher salinity levels at 35.8 PSU versus Region A at 36.1 PSU.',
//       lineData: [
//         { region: 'Surface A', value: 32 },
//         { region: 'Mid A', value: 27 },
//         { region: 'Deep A', value: 22 },
//         { region: 'Surface B', value: 25 },
//         { region: 'Mid B', value: 20 },
//         { region: 'Deep B', value: 15 }
//       ],
//       pieData: [
//         { name: 'Region A Temp', value: 45, color: '#06b6d4' },
//         { name: 'Region B Temp', value: 55, color: '#3b82f6' }
//       ],
//       stats: { tempA: 27.0, tempB: 20.0, diff: 7.0 }
//     },
//     {
//       id: 4,
//       question: 'Analyze salinity distribution',
//       answer: 'Salinity levels are highest in deep waters at 37.2 PSU for Region A and 35.8 PSU for Region B. This indicates stable stratification in both regions.',
//       lineData: [
//         { layer: 'Surface', regionA: 36.1, regionB: 35.8 },
//         { layer: 'Mid', regionA: 36.5, regionB: 35.9 },
//         { layer: 'Deep', regionA: 37.2, regionB: 36.2 }
//       ],
//       pieData: [
//         { name: 'Low Salinity', value: 25, color: '#06b6d4' },
//         { name: 'Medium', value: 45, color: '#3b82f6' },
//         { name: 'High Salinity', value: 30, color: '#1e40af' }
//       ],
//       stats: { avgA: 36.1, avgB: 35.8, maxA: 37.2 }
//     },
//     {
//       id: 5,
//       question: 'What about pressure profiles?',
//       answer: 'Pressure increases with depth as expected. Region A shows 20.4 dbar at surface, 45.2 at mid-depth, and 78.6 at deep levels. Region B has similar patterns with slightly lower values.',
//       lineData: [
//         { depth: '0m', pressure: 20.4 },
//         { depth: '50m', pressure: 45.2 },
//         { depth: '100m', pressure: 78.6 },
//         { depth: '150m', pressure: 105.3 },
//         { depth: '200m', pressure: 132.7 }
//       ],
//       pieData: [
//         { name: 'Surface Zone', value: 15, color: '#06b6d4' },
//         { name: 'Mid Zone', value: 35, color: '#3b82f6' },
//         { name: 'Deep Zone', value: 50, color: '#1e40af' }
//       ],
//       stats: { surface: 20.4, mid: 45.2, deep: 78.6 }
//     },
//     {
//       id: 6,
//       question: 'Show overall data trends',
//       answer: 'Overall analysis shows consistent thermal stratification across both regions with temperature gradients of approximately 10°C from surface to deep waters. Salinity remains relatively stable.',
//       lineData: [
//         { month: 'Jan', temp: 24, sal: 35.5 },
//         { month: 'Feb', temp: 25, sal: 35.7 },
//         { month: 'Mar', temp: 27, sal: 36.0 },
//         { month: 'Apr', temp: 29, sal: 36.2 },
//         { month: 'May', temp: 31, sal: 36.4 },
//         { month: 'Jun', temp: 32, sal: 36.5 }
//       ],
//       pieData: [
//         { name: 'Temp Variance', value: 40, color: '#06b6d4' },
//         { name: 'Sal Variance', value: 30, color: '#3b82f6' },
//         { name: 'Stable', value: 30, color: '#1e40af' }
//       ],
//       stats: { avgTemp: 28.0, avgSal: 36.1, variance: 0.8 }
//     }
//   ];

//   const handleSendMessage = () => {
//     if (!input.trim()) return;

//     const userMsg = {
//       id: Date.now(),
//       type: 'user',
//       text: input,
//       data: null
//     };

//     const matchedDemo = demoChats.find(demo => 
//       input.toLowerCase().includes('region') || 
//       input.toLowerCase().includes('temperature') ||
//       input.toLowerCase().includes('salinity') ||
//       input.toLowerCase().includes('pressure') ||
//       input.toLowerCase().includes('compare') ||
//       input.toLowerCase().includes('trend')
//     );

//     const botResponse = matchedDemo || demoChats[Math.floor(Math.random() * demoChats.length)];

//     setTimeout(() => {
//       setMessages(prev => [...prev, userMsg, {
//         id: Date.now() + 1,
//         type: 'bot',
//         text: botResponse.answer,
//         data: botResponse
//       }]);
//       setActiveChat(botResponse);
//     }, 500);

//     setInput('');
//   };

//   const handleDemoClick = (demo) => {
//     const userMsg = {
//       id: Date.now(),
//       type: 'user',
//       text: demo.question,
//       data: null
//     };

//     setTimeout(() => {
//       setMessages(prev => [...prev, userMsg, {
//         id: Date.now() + 1,
//         type: 'bot',
//         text: demo.answer,
//         data: demo
//       }]);
//       setActiveChat(demo);
//     }, 500);
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//       {/* Left Chat Section */}
//       <div className="w-1/2 flex flex-col border-r border-slate-700">
//         {/* Header */}
//         <div className="bg-slate-800 p-6 border-b border-slate-700">
//           <h1 className="text-2xl font-bold text-cyan-400 mb-2">Ocean Analytics AI</h1>
//           <p className="text-slate-400 text-sm">Marine Data Analysis Assistant</p>
//         </div>

//         {/* Demo Buttons */}
//         <div className="bg-slate-800/50 p-4 border-b border-slate-700">
//           <p className="text-xs text-slate-400 mb-2">Quick Analysis:</p>
//           <div className="flex flex-wrap gap-2">
//             {demoChats.slice(0, 3).map(demo => (
//               <button
//                 key={demo.id}
//                 onClick={() => handleDemoClick(demo)}
//                 className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-full text-xs transition-colors"
//               >
//                 {demo.question.substring(0, 20)}...
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4">
//           {messages.map(msg => (
//             <div
//               key={msg.id}
//               className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-[80%] p-4 rounded-2xl ${
//                   msg.type === 'user'
//                     ? 'bg-cyan-600 text-white'
//                     : 'bg-slate-700 text-slate-100'
//                 }`}
//               >
//                 <p className="text-sm">{msg.text}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="p-4 bg-slate-800 border-t border-slate-700">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               placeholder="Ask about ocean data..."
//               className="flex-1 bg-slate-700 text-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
//             />
//             <button
//               onClick={handleSendMessage}
//               className="bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-xl transition-colors"
//             >
//               <Send size={20} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Right Visualization Section */}
//       <div className="w-1/2 p-6 overflow-y-auto">
//         {activeChat ? (
//           <div className="space-y-6">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-3 gap-4">
//               <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Activity className="text-cyan-400" size={20} />
//                   <span className="text-slate-400 text-xs">Temperature</span>
//                 </div>
//                 <p className="text-2xl font-bold text-cyan-400">
//                   {activeChat.stats.temp || activeChat.stats.tempA || activeChat.stats.avgTemp}°C
//                 </p>
//               </div>
//               <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Droplet className="text-blue-400" size={20} />
//                   <span className="text-slate-400 text-xs">Salinity</span>
//                 </div>
//                 <p className="text-2xl font-bold text-blue-400">
//                   {activeChat.stats.salinity || activeChat.stats.avgA || activeChat.stats.avgSal} PSU
//                 </p>
//               </div>
//               <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Gauge className="text-indigo-400" size={20} />
//                   <span className="text-slate-400 text-xs">Pressure</span>
//                 </div>
//                 <p className="text-2xl font-bold text-indigo-400">
//                   {activeChat.stats.pressure || activeChat.stats.deep || activeChat.stats.variance} dbar
//                 </p>
//               </div>
//             </div>

//             {/* Line/Area Chart */}
//             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
//               <h3 className="text-slate-300 font-semibold mb-4">Data Trends</h3>
//               <ResponsiveContainer width="100%" height={250}>
//                 <AreaChart data={activeChat.lineData}>
//                   <defs>
//                     <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
//                       <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                   <XAxis dataKey={Object.keys(activeChat.lineData[0])[0]} stroke="#94a3b8" />
//                   <YAxis stroke="#94a3b8" />
//                   <Tooltip 
//                     contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
//                     labelStyle={{ color: '#cbd5e1' }}
//                   />
//                   <Area 
//                     type="monotone" 
//                     dataKey={Object.keys(activeChat.lineData[0])[1]} 
//                     stroke="#06b6d4" 
//                     fillOpacity={1} 
//                     fill="url(#colorTemp)" 
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Pie Chart & Map */}
//             <div className="grid grid-cols-2 gap-4">
//               {/* Pie Chart */}
//               <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
//                 <h3 className="text-slate-300 font-semibold mb-4">Distribution</h3>
//                 <ResponsiveContainer width="100%" height={200}>
//                   <PieChart>
//                     <Pie
//                       data={activeChat.pieData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={50}
//                       outerRadius={80}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {activeChat.pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip 
//                       contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//                 <div className="mt-4 space-y-2">
//                   {activeChat.pieData.map((item, idx) => (
//                     <div key={idx} className="flex items-center justify-between text-xs">
//                       <div className="flex items-center gap-2">
//                         <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
//                         <span className="text-slate-400">{item.name}</span>
//                       </div>
//                       <span className="text-slate-300 font-semibold">{item.value}%</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Map Placeholder */}
//               <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 relative overflow-hidden">
//                 <h3 className="text-slate-300 font-semibold mb-4">Region Map</h3>
//                 <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg relative">
//                   {/* Simple map visualization */}
//                   <div className="absolute top-8 left-8 w-12 h-12 bg-cyan-500 rounded-full opacity-70 animate-pulse"></div>
//                   <div className="absolute top-16 right-12 w-10 h-10 bg-blue-500 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
//                   <div className="absolute bottom-12 left-16 w-8 h-8 bg-indigo-500 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="text-slate-600 text-xs">Interactive Map View</div>
//                   </div>
//                 </div>
//                 <div className="mt-4 flex gap-4 text-xs">
//                   <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
//                     <span className="text-slate-400">Region A</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//                     <span className="text-slate-400">Region B</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="h-full flex items-center justify-center">
//             <div className="text-center">
//               <Activity className="w-16 h-16 text-slate-700 mx-auto mb-4" />
//               <p className="text-slate-500 text-lg">Select a query to view visualizations</p>
//               <p className="text-slate-600 text-sm mt-2">Charts and maps will appear here</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OceanAnalyticsChat;