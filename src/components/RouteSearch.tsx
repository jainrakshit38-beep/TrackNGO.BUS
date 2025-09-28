import React, { useState } from 'react';
import { MapPin, Search, ArrowRight } from 'lucide-react';

interface RouteSearchProps {
  onRouteSelect: (route: any) => void;
  translations: any;
}

const RouteSearch: React.FC<RouteSearchProps> = ({ onRouteSelect, translations }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const locations = [
    'New Delhi Railway Station',
    'Connaught Place',
    'Indira Gandhi International Airport',
    'India Gate',
    'Red Fort',
    'Lotus Temple',
    'Qutub Minar',
    'Chandni Chowk',
    'Khan Market',
    'Karol Bagh',
    'Rajouri Garden Metro',
    'Dwarka Sector 21',
    'Gurgaon Cyber City',
    'Noida City Centre',
    'Faridabad Bus Stand'
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromLocation || !toLocation) return;
    
    setIsLoading(true);
    
    // Simulate API search
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const route = {
      from: fromLocation,
      to: toLocation,
      distance: '12.5 km',
      estimatedTime: '25 min'
    };
    
    onRouteSelect(route);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <MapPin className="w-6 h-6 text-blue-600 mr-2" />
        {translations.planRoute}
      </h2>

      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.from}
          </label>
          <select
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">{translations.selectOrigin}</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-6 h-6 text-gray-400" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {translations.to}
          </label>
          <select
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">{translations.selectDestination}</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !fromLocation || !toLocation}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>{translations.searchRoutes}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RouteSearch;