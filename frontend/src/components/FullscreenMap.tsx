import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, ZoomIn, ZoomOut } from 'lucide-react';
import mapImage from 'figma:asset/77147f6bc7ae96867ae05876c70eeb98aa0d7d55.png';

interface DataPoint {
  id: string;
  lat: number;
  lng: number;
  type: 'acoustic' | 'floating';
  name: string;
  depth?: number;
  temperature?: number;
}

// Data points positioned to match the provided map image
const mockData: DataPoint[] = [
  { id: '1', lat: 28, lng: 76, type: 'floating', name: 'North India Station', depth: 2500, temperature: 18.5 },
  { id: '2', lat: 19, lng: 73, type: 'acoustic', name: 'West India Float', depth: 1800, temperature: 22.1 },
  { id: '3', lat: 13, lng: 80, type: 'floating', name: 'South India Station', depth: 3200, temperature: 16.8 },
  { id: '4', lat: 22, lng: 88, type: 'floating', name: 'East India Float', depth: 4100, temperature: 14.2 },
  { id: '5', lat: 15, lng: 74, type: 'acoustic', name: 'West Coast Station', depth: 2900, temperature: 19.6 },
  { id: '6', lat: 8, lng: 77, type: 'floating', name: 'Kerala Float', depth: 1500, temperature: 24.3 },
  { id: '7', lat: 26, lng: 91, type: 'acoustic', name: 'Northeast Station', depth: 3800, temperature: 15.7 },
  { id: '8', lat: 11, lng: 78, type: 'floating', name: 'Tamil Nadu Float', depth: 2200, temperature: 20.4 },
  { id: '9', lat: 20, lng: 86, type: 'acoustic', name: 'Eastern Station', depth: 2600, temperature: 20.8 },
  { id: '10', lat: 9, lng: 79, type: 'floating', name: 'Southern Float', depth: 3100, temperature: 17.2 },
  { id: '11', lat: 16, lng: 81, type: 'floating', name: 'Andhra Station', depth: 2800, temperature: 19.3 },
  { id: '12', lat: 12, lng: 75, type: 'acoustic', name: 'Karnataka Float', depth: 3500, temperature: 16.1 },
  { id: '13', lat: 24, lng: 84, type: 'floating', name: 'Central Station', depth: 4200, temperature: 13.8 },
  { id: '14', lat: 18, lng: 84, type: 'acoustic', name: 'Odisha Float', depth: 2300, temperature: 21.7 },
  { id: '15', lat: 27, lng: 88, type: 'floating', name: 'Bengal Station', depth: 3000, temperature: 18.9 },
  { id: '16', lat: 10, lng: 76, type: 'acoustic', name: 'Kerala Station', depth: 2700, temperature: 22.4 },
];

export default function FullscreenMap() {
  const navigate = useNavigate();
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  const [zoom, setZoom] = useState(1);

  const handleBack = () => {
    navigate('/');
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  return (
    <div className="h-[100%] bg-slate-900 text-white p-12">
      <div className="bg-slate-800/50 rounded-lg p-6 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleBack}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ArrowLeft className="bg-cyan-500 hover:bg-cyan-600 text-white"/>
              Back to Dashboard
            </Button>
            <h1 className="text-2xl">Ocean Data Map - Fullscreen View</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleZoomOut}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleZoomIn}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main map area */}
        <div className="relative rounded-lg overflow-hidden" style={{ height: 'calc(90vh - 12rem)' }}>
          <div 
            className="w-full h-full relative"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
          >
            {/* Map background image */}
            <img 
              src={mapImage} 
              alt="Ocean Data Map" 
              className="w-full h-full object-cover"
            />
            
            {/* Data points overlay */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500">
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
                      r={selectedPoint?.id === point.id ? 12 : 8}
                      fill={point.type === 'acoustic' ? '#f97316' : '#06b6d4'}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="cursor-pointer transition-all hover:scale-110"
                      onClick={() => setSelectedPoint(point)}
                    />
                    {selectedPoint?.id === point.id && (
                      <circle
                        cx={x}
                        cy={y}
                        r="20"
                        fill="none"
                        stroke={point.type === 'acoustic' ? '#f97316' : '#06b6d4'}
                        strokeWidth="2"
                        opacity="0.5"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="absolute bottom-6 left-6">
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#06b6d4' }}></div>
                <span className="font-medium bg-cyan-500 hover:bg-cyan-600 text-white">Acoustic Node</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f97316' }}></div>
                <span className=" font-medium bg-cyan-500 hover:bg-cyan-600 text-white">Floating Node</span>
              </div>
            </div>
          </div>

          {/* Data panel */}
          {selectedPoint && (
            <div className="absolute top-6 right-6 bg-slate-900/90 rounded-lg p-4 w-64">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm">Station Details</h4>
                <button
                  onClick={() => setSelectedPoint(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Name:</span>
                  <span>{selectedPoint.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Type:</span>
                  <span className="capitalize">{selectedPoint.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Position:</span>
                  <span>{selectedPoint.lat}°, {selectedPoint.lng}°</span>
                </div>
                {selectedPoint.depth && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Depth:</span>
                    <span>{selectedPoint.depth}m</span>
                  </div>
                )}
                {selectedPoint.temperature && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Temperature:</span>
                    <span>{selectedPoint.temperature}°C</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}