import React, { useEffect, useState } from 'react';
import { Map, Navigation, Bus, MapPin } from 'lucide-react';

interface MapViewProps {
  selectedRoute: any;
  buses: any[];
  translations: any;
}

const MapView: React.FC<MapViewProps> = ({ selectedRoute, buses, translations }) => {
  const [selectedBus, setSelectedBus] = useState<any>(null);

  // Mock map coordinates for demonstration
  const mapCenter = { lat: 28.6139, lng: 77.2090 }; // New Delhi coordinates

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Map className="w-5 h-5 text-blue-600 mr-2" />
          {translations.liveMap}
        </h3>
        {selectedRoute && (
          <p className="text-sm text-gray-600 mt-1">
            {selectedRoute.from} → {selectedRoute.to}
          </p>
        )}
      </div>

      <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-orange-200 to-green-200"></div>
          {/* Mock street lines */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-orange-600 opacity-30"></div>
            <div className="absolute top-2/4 left-0 right-0 h-0.5 bg-orange-600 opacity-30"></div>
            <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-orange-600 opacity-30"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-orange-600 opacity-30"></div>
            <div className="absolute left-2/4 top-0 bottom-0 w-0.5 bg-orange-600 opacity-30"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-orange-600 opacity-30"></div>
          </div>
        </div>

        {/* Route Path */}
        {selectedRoute && (
          <>
            {/* Start Point */}
            <div className="absolute top-16 left-16 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {selectedRoute.from}
              </div>
            </div>

            {/* End Point */}
            <div className="absolute bottom-16 right-16 transform translate-x-1/2 translate-y-1/2">
              <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {selectedRoute.to}
              </div>
            </div>

            {/* Route Line */}
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#138808" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path
                d={`M 64 64 Q 200 150 ${384 - 64} ${384 - 64}`}
                stroke="url(#routeGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            </svg>
          </>
        )}

        {/* Bus Icons */}
        {buses.map((bus, index) => (
          <div
            key={bus.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${
              selectedBus?.id === bus.id ? 'scale-125' : ''
            }`}
            style={{
              left: `${25 + index * 20}%`,
              top: `${30 + index * 15}%`
            }}
            onClick={() => setSelectedBus(selectedBus?.id === bus.id ? null : bus)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
              bus.status === 'on-time' ? 'bg-green-500' : 'bg-red-500'
            }`}>
              <Bus className="w-4 h-4 text-white" />
            </div>
            
            {selectedBus?.id === bus.id && (
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-48 z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Bus className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">{translations.route} {bus.routeNumber}</span>
                </div>
                <div className="text-sm space-y-1">
                  <p><strong>{translations.arrival}:</strong> {bus.estimatedTime}</p>
                  <p><strong>{translations.passengers}:</strong> {bus.occupied}/{bus.capacity}</p>
                  <p>
                    <strong>{translations.status}:</strong> 
                    <span className={`ml-1 ${bus.status === 'on-time' ? 'text-green-600' : 'text-red-600'}`}>
                      {bus.status === 'on-time' ? translations.onTime : translations.delayed}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
            <Navigation className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
            <MapPin className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {!selectedRoute && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white bg-opacity-90 rounded-lg p-6 text-center">
              <Map className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">{translations.selectRouteToView}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;