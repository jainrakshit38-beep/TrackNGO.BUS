import React from 'react';
import { Bus, Clock, Users, AlertCircle } from 'lucide-react';

interface BusListProps {
  buses: any[];
  translations: any;
}

const BusList: React.FC<BusListProps> = ({ buses, translations }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'text-green-600 bg-green-100';
      case 'delayed': return 'text-red-600 bg-red-100';
      case 'early': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return <Clock className="w-4 h-4" />;
      case 'delayed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Bus className="w-5 h-5 text-blue-600 mr-2" />
        {translations.availableBuses}
      </h3>

      <div className="space-y-4">
        {buses.map((bus) => (
          <div
            key={bus.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{translations.route} {bus.routeNumber}</h4>
                  <p className="text-sm text-gray-600">{translations.to} {bus.destination}</p>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(bus.status)}`}>
                {getStatusIcon(bus.status)}
                <span>{bus.status === 'on-time' ? translations.onTime : translations.delayed}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{translations.arrival}: <strong>{bus.estimatedTime}</strong></span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {bus.occupied}/{bus.capacity} {translations.passengers}
                </span>
              </div>
            </div>

            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    bus.occupied / bus.capacity > 0.8 ? 'bg-red-500' : 
                    bus.occupied / bus.capacity > 0.5 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(bus.occupied / bus.capacity) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((bus.occupied / bus.capacity) * 100)}% {translations.capacity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusList;