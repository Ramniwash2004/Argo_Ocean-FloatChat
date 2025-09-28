// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// interface RegionData {
//   lat: number;
//   lon: number;
// }

// interface ChartData {
//   name: string;
//   temperature: number;
//   salinity: number;
//   pressure: number;
// }

// const OceanComparisonApp: React.FC = () => {
//   const [regionA, setRegionA] = useState<RegionData>({ lat: 34, lon: -120 });
//   const [regionB, setRegionB] = useState<RegionData>({ lat: -20, lon: 150 });

//   // Mock data for demonstration
//   const generateMockData = (region: RegionData): ChartData[] => {
//     const baseTemp = 15 + Math.abs(region.lat) * 0.5;
//     const baseSalinity = 35 + Math.random() * 2;
//     const basePressure = 1013 + Math.random() * 20;
    
//     return [
//       { name: 'Surface', temperature: baseTemp, salinity: baseSalinity, pressure: basePressure },
//       { name: 'Mid', temperature: baseTemp - 5, salinity: baseSalinity + 0.5, pressure: basePressure + 50 },
//       { name: 'Deep', temperature: baseTemp - 10, salinity: baseSalinity + 1, pressure: basePressure + 100 }
//     ];
//   };

//   const dataA = generateMockData(regionA);
//   const dataB = generateMockData(regionB);

//   const pieDataA = [
//     { name: 'Temperature', value: dataA[0].temperature, color: '#06B6D4' },
//     { name: 'Salinity', value: dataA[0].salinity, color: '#0EA5E9' },
//     { name: 'Pressure', value: dataA[0].pressure / 50, color: '#0284C7' }
//   ];

//   const pieDataB = [
//     { name: 'Temperature', value: dataB[0].temperature, color: '#06B6D4' },
//     { name: 'Salinity', value: dataB[0].salinity, color: '#0EA5E9' },
//     { name: 'Pressure', value: dataB[0].pressure / 50, color: '#0284C7' }
//   ];

//   const handleUpdateComparison = () => {
//     // Force re-render with new data
//     setRegionA({ ...regionA });
//     setRegionB({ ...regionB });
//   };

//   return (
//     <div className="min-h-screen bg-slate-900">

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         {/* Title Section */}
//         <div className="mb-12 text-center">
//           <h1 className="text-4xl font-bold text-white mb-4">Compare two ocean regions</h1>
//           <p className="text-slate-400 text-lg">
//             Enter two coordinates to compare temperature, salinity, and pressure. Visualized with Plotly bar and pie charts.
//           </p>
//         </div>

//         {/* Input Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Region A */}
//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <h3 className="text-xl font-semibold text-white mb-6">Region A</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-slate-400 text-sm font-medium mb-2">Lat</label>
//                 <input
//                   type="number"
//                   value={regionA.lat}
//                   onChange={(e) => setRegionA({ ...regionA, lat: parseFloat(e.target.value) || 0 })}
//                   className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-slate-400 text-sm font-medium mb-2">Lon</label>
//                 <input
//                   type="number"
//                   value={regionA.lon}
//                   onChange={(e) => setRegionA({ ...regionA, lon: parseFloat(e.target.value) || 0 })}
//                   className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Region B */}
//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <h3 className="text-xl font-semibold text-white mb-6">Region B</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-slate-400 text-sm font-medium mb-2">Lat</label>
//                 <input
//                   type="number"
//                   value={regionB.lat}
//                   onChange={(e) => setRegionB({ ...regionB, lat: parseFloat(e.target.value) || 0 })}
//                   className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-slate-400 text-sm font-medium mb-2">Lon</label>
//                 <input
//                   type="number"
//                   value={regionB.lon}
//                   onChange={(e) => setRegionB({ ...regionB, lon: parseFloat(e.target.value) || 0 })}
//                   className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Update Button */}
//         <div className="mb-12">
//           <button
//             onClick={handleUpdateComparison}
//             className="bg-cyan-500 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-medium transition-colors border border-slate-600 cursor-pointer"
//           >
//             Update Comparison
//           </button>
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Region A Charts */}
//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <h3 className="text-xl font-semibold text-white mb-6">Region A</h3>
            
//             {/* Bar Chart */}
//             <div className="mb-8">
//               <h4 className="text-lg text-slate-300 mb-4">Profiles</h4>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={dataA}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
//                     <XAxis dataKey="name" stroke="#94A3B8" />
//                     <YAxis stroke="#94A3B8" />
//                     <Tooltip 
//                       contentStyle={{ 
//                         backgroundColor: '#334155', 
//                         border: '1px solid #475569',
//                         borderRadius: '8px',
//                         color: '#F1F5F9'
//                       }} 
//                     />
//                     <Bar dataKey="temperature" fill="#06B6D4" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Pie Chart */}
//             <div>
//               <h4 className="text-lg text-slate-300 mb-4">Distribution</h4>
//               <div className="h-48">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={pieDataA}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={40}
//                       outerRadius={80}
//                       dataKey="value"
//                     >
//                       {pieDataA.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip 
//                       contentStyle={{ 
//                         backgroundColor: '#334155', 
//                         border: '1px solid #475569',
//                         borderRadius: '8px',
//                         color: '#F1F5F9'
//                       }} 
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Region B Charts */}
//           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
//             <h3 className="text-xl font-semibold text-white mb-6">Region B</h3>
            
//             {/* Bar Chart */}
            
//             <div className="mb-8">
//               <h4 className="text-lg text-slate-300 mb-4">Profiles</h4>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={dataB}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
//                     <XAxis dataKey="name" stroke="#94A3B8" />
//                     <YAxis stroke="#94A3B8" />
//                     <Tooltip 
//                       contentStyle={{
//                         backgroundColor: '#334155', 
//                         border: '1px solid #475569',
//                         borderRadius: '8px',
//                         color: '#F1F5F9'
//                       }} 
//                     />
//                     <Bar dataKey="temperature" fill="#06B6D4" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Pie Chart */}
//             <div>
//               <h4 className="text-lg text-slate-300 mb-4">Distribution</h4>
//               <div className="h-48">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={pieDataB}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={40}
//                       outerRadius={80}
//                       dataKey="value"
//                     >
//                       {pieDataB.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip 
//                       contentStyle={{ 
//                         backgroundColor: '#334155', 
//                         border: '1px solid #475569',
//                         borderRadius: '8px',
//                         color: '#F1F5F9'
//                       }} 
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default OceanComparisonApp;

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface RegionData {
  lat: number;
  lon: number;
}

interface ChartData {
  name: string;
  temperature: number;
  salinity: number;
  pressure: number;
}

const OceanComparisonApp: React.FC = () => {
  const [regionA, setRegionA] = useState<RegionData>({ lat: 34, lon: -120 });
  const [regionB, setRegionB] = useState<RegionData>({ lat: -20, lon: 150 });

  // Mock data for demonstration
  const generateMockData = (region: RegionData): ChartData[] => {
    const baseTemp = 15 + Math.abs(region.lat) * 0.5;
    const baseSalinity = 35 + Math.random() * 2;
    const basePressure = 1013 + Math.random() * 20;
    
    return [
      { name: 'Surface', temperature: baseTemp, salinity: baseSalinity, pressure: basePressure },
      { name: 'Mid', temperature: baseTemp - 5, salinity: baseSalinity + 0.5, pressure: basePressure + 50 },
      { name: 'Deep', temperature: baseTemp - 10, salinity: baseSalinity + 1, pressure: basePressure + 100 }
    ];
  };

  const dataA = generateMockData(regionA);
  const dataB = generateMockData(regionB);

  const pieDataA = [
    { name: 'Temperature', value: dataA[0].temperature, color: '#06B6D4' },
    { name: 'Salinity', value: dataA[0].salinity, color: '#0EA5E9' },
    { name: 'Pressure', value: dataA[0].pressure / 50, color: '#0284C7' }
  ];

  const pieDataB = [
    { name: 'Temperature', value: dataB[0].temperature, color: '#06B6D4' },
    { name: 'Salinity', value: dataB[0].salinity, color: '#0EA5E9' },
    { name: 'Pressure', value: dataB[0].pressure / 50, color: '#0284C7' }
  ];

  // Debug: Log data to console
  useEffect(() => {
    console.log('DataA:', dataA);
    console.log('PieDataA:', pieDataA);
    console.log('DataB:', dataB);
    console.log('PieDataB:', pieDataB);
  }, [regionA, regionB]);

  const handleUpdateComparison = () => {
    // Force re-render with new data
    setRegionA({ ...regionA });
    setRegionB({ ...regionB });
  };

  // Enhanced charts to match the original design
  const SimpleBarChart: React.FC<{ data: ChartData[], title: string }> = ({ data, title }) => {
    const maxValue = Math.max(...data.map(d => d.temperature));
    
    return (
      <div className="mb-8">
        <h4 className="text-lg text-slate-300 mb-4">{title}</h4>
        <div className="w-full h-64 bg-slate-700 rounded-lg p-4 relative">
          {/* Y-axis labels */}
          <div className="absolute left-2 top-4 bottom-4 flex flex-col justify-between text-xs text-slate-400">
            <span>{maxValue.toFixed(0)}</span>
            <span>{(maxValue * 0.75).toFixed(0)}</span>
            <span>{(maxValue * 0.5).toFixed(0)}</span>
            <span>{(maxValue * 0.25).toFixed(0)}</span>
            <span>0</span>
          </div>
          
          {/* Chart area */}
          <div className="ml-8 h-full flex items-end justify-around relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-slate-600 opacity-30"></div>
              ))}
            </div>
            
            {/* Bars */}
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center z-10 group">
                <div 
                  className="bg-gradient-to-t from-cyan-600 to-cyan-400 w-16 min-h-[4px] transition-all duration-300 hover:from-cyan-500 hover:to-cyan-300 cursor-pointer relative"
                  style={{ 
                    height: `${(item.temperature / maxValue) * 200}px` 
                  }}
                >
                  {/* Hover tooltip */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.temperature.toFixed(1)}°C
                  </div>
                </div>
                <span className="text-slate-300 text-sm mt-3 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const SimplePieChart: React.FC<{ data: any[], title: string }> = ({ data, title }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Calculate angles for pie slices
    let currentAngle = 0;
    const slices = data.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (item.value / total) * 360;
      const slice = {
        ...item,
        percentage,
        startAngle: currentAngle,
        endAngle: currentAngle + angle
      };
      currentAngle += angle;
      return slice;
    });

    const createPath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
      const start = polarToCartesian(centerX, centerY, radius, endAngle);
      const end = polarToCartesian(centerX, centerY, radius, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
    };

    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    };
    
    return (
      <div>
        <h4 className="text-lg text-slate-300 mb-4">{title}</h4>
        <div className="w-full h-48 bg-slate-700 rounded-lg p-4 flex">
          {/* SVG Pie Chart */}
          <div className="w-1/2 flex items-center justify-center">
            <svg width="120" height="120" className="transform -rotate-90">
              {slices.map((slice, index) => (
                <path
                  key={index}
                  d={createPath(60, 60, 50, slice.startAngle, slice.endAngle)}
                  fill={slice.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  stroke="#334155"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>
          
          {/* Legend */}
          <div className="w-1/2 flex flex-col justify-center space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-1 rounded hover:bg-slate-600 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2 flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-300 text-xs font-medium truncate">{item.name}</span>
                </div>
                <div className="text-right ml-2">
                  <span className="text-white text-xs font-semibold">
                    {item.value.toFixed(1)}
                  </span>
                  <div className="text-slate-400 text-xs">
                    {((item.value / total) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Compare two ocean regions</h1>
          <p className="text-slate-400 text-lg">
            Enter two coordinates to compare temperature, salinity, and pressure. Visualized with charts.
          </p>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Region A */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-6">Region A</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">Lat</label>
                <input
                  type="number"
                  value={regionA.lat}
                  onChange={(e) => setRegionA({ ...regionA, lat: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">Lon</label>
                <input
                  type="number"
                  value={regionA.lon}
                  onChange={(e) => setRegionA({ ...regionA, lon: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Region B */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-6">Region B</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">Lat</label>
                <input
                  type="number"
                  value={regionB.lat}
                  onChange={(e) => setRegionB({ ...regionB, lat: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-2">Lon</label>
                <input
                  type="number"
                  value={regionB.lon}
                  onChange={(e) => setRegionB({ ...regionB, lon: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div className="mb-12">
          <button
            onClick={handleUpdateComparison}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Update Comparison
          </button>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Region A Charts */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-6">Region A</h3>
            
            {/* Use Simple Charts instead of Recharts */}
            <SimpleBarChart data={dataA} title="Profiles" />
            <SimplePieChart data={pieDataA} title="Distribution" />
          </div>

          {/* Region B Charts */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-6">Region B</h3>
            
            {/* Use Simple Charts instead of Recharts */}
            <SimpleBarChart data={dataB} title="Profiles" />
            <SimplePieChart data={pieDataB} title="Distribution" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OceanComparisonApp;