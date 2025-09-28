import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';

const statisticsData = [
  { time: '00:00', value: 65 },
  { time: '04:00', value: 72 },
  { time: '08:00', value: 68 },
  { time: '12:00', value: 85 },
  { time: '16:00', value: 92 },
  { time: '20:00', value: 78 },
  { time: '24:00', value: 70 },
];

const depthData = [
  { depth: 0, frequency: 10 },
  { depth: 500, frequency: 25 },
  { depth: 1000, frequency: 45 },
  { depth: 1500, frequency: 78 },
  { depth: 2000, frequency: 95 },
  { depth: 2500, frequency: 85 },
  { depth: 3000, frequency: 62 },
  { depth: 3500, frequency: 38 },
  { depth: 4000, frequency: 20 },
  { depth: 4500, frequency: 8 },
  { depth: 5000, frequency: 3 },
];

export default function Statistics() {
  return (
    <div className="space-y-6">
      {/* Statistics Chart */}
      <div className="bg-slate-800/50 rounded-lg p-6">
        <h3 className="text-lg mb-4 text-slate-300">Statistics</h3>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={statisticsData}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={false}
                strokeLinecap="round"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Depth Distribution Chart */}
      <div className="bg-slate-800/50 rounded-lg p-6">
        <h3 className="text-lg mb-4 text-slate-300">Depth Distribution</h3>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={depthData}>
              <XAxis 
                dataKey="depth" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis hide />
              <defs>
                <linearGradient id="depthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="frequency"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#depthGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}