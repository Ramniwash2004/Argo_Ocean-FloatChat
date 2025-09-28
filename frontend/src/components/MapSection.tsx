import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Maximize2 } from 'lucide-react';
import mapImage from 'figma:asset/77147f6bc7ae96867ae05876c70eeb98aa0d7d55.png';

interface DataPoint {
  id: string;
  lat: number;
  lng: number;
  type: 'acoustic' | 'floating';
}

// Data points positioned to match the provided map image
const mockData: DataPoint[] = [
  { id: '1', lat: 28, lng: 76, type: 'floating' }, // North India
  { id: '2', lat: 19, lng: 73, type: 'acoustic' }, // West India
  { id: '3', lat: 13, lng: 80, type: 'floating' }, // South India
  { id: '4', lat: 22, lng: 88, type: 'floating' }, // East India
  { id: '5', lat: 15, lng: 74, type: 'acoustic' }, // West Coast India
  { id: '6', lat: 8, lng: 77, type: 'floating' }, // South India
  { id: '7', lat: 26, lng: 91, type: 'acoustic' }, // Northeast India
  { id: '8', lat: 11, lng: 78, type: 'floating' }, // Tamil Nadu
  { id: '9', lat: 20, lng: 86, type: 'acoustic' }, // Eastern India
  { id: '10', lat: 9, lng: 79, type: 'floating' }, // Southern India
  { id: '11', lat: 16, lng: 81, type: 'floating' }, // Andhra Pradesh
  { id: '12', lat: 12, lng: 75, type: 'acoustic' }, // Karnataka
  { id: '13', lat: 24, lng: 84, type: 'floating' }, // Central India
  { id: '14', lat: 18, lng: 84, type: 'acoustic' }, // Odisha
  { id: '15', lat: 27, lng: 88, type: 'floating' }, // West Bengal
  { id: '16', lat: 10, lng: 76, type: 'acoustic' }, // Kerala
];

export default function MapSection() {
  const navigate = useNavigate();
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  const handleFullscreenMap = () => {
    navigate('/fullscreen-map');
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 relative h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-400">
          <p>Floats position and data</p>
        </div>
        <Button
          onClick={handleFullscreenMap}
          variant="outline"
          size="sm"
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <Maximize2 className="color-black bg-cyan-500 hover:bg-cyan-600 text-white" />
          Fullscreen Map
        </Button>
      </div>
      
      <div className="relative rounded-lg overflow-hidden" style={{ height: '400px' }}>
        {/* Map background image */}
        <img 
          src={mapImage} 
          alt="Ocean Data Map" 
          className="w-full h-full object-cover"
        />
        
        {/* Data points overlay */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
          {mockData.map((point) => {
            // Convert lat/lng to SVG coordinates based on the map image
            // Adjusting for the India region visible in the provided image
            const x = (point.lng - 65) * 12 + 100; // Longitude mapping for India region
            const y = (35 - point.lat) * 12 + 50; // Latitude mapping (inverted)
            
            return (
              <g key={point.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={hoveredPoint === point.id ? 8 : 5}
                  fill={point.type === 'acoustic' ? '#f97316' : '#06b6d4'}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredPoint(point.id)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  stroke="#ffffff"
                  strokeWidth="1"
                />
                {hoveredPoint === point.id && (
                  <text
                    x={x}
                    y={y - 12}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    className="pointer-events-none font-medium"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                  >
                    {point.type === 'acoustic' ? 'Acoustic' : 'Floating'}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      {/* Legend - positioned at bottom left like in the image */}
        <div className="absolute bottom-4 left-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#06b6d4' }}></div>
              <span className="text-slate-300">Acoustic Node</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f97316' }}></div>
              <span className="text-slate-300">Floating Node</span>
            </div>
          </div>
        </div>
    </div>
  );
}