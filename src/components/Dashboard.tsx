import React, { useState } from 'react';
import { LogOut, Search } from 'lucide-react';
import RouteSearch from './RouteSearch';
import BusList from './BusList';
import MapView from './MapView';

interface DashboardProps {
  user: any;
  onLogout: () => void;
  translations: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, translations }) => {
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [buses, setBuses] = useState<any[]>([]);

  const handleRouteSelect = (route: any) => {
    setSelectedRoute(route);
    // Simulate finding buses for the route
    const mockBuses = [
      {
        id: 'bus-001',
        routeNumber: '42A',
        destination: route.to,
        estimatedTime: '5 min',
        capacity: 75,
        occupied: 45,
        location: { lat: 40.7128, lng: -74.0060 },
        status: 'on-time'
      },
      {
        id: 'bus-002',
        routeNumber: '42B',
        destination: route.to,
        estimatedTime: '12 min',
        capacity: 80,
        occupied: 60,
        location: { lat: 40.7589, lng: -73.9851 },
        status: 'delayed'
      },
      {
        id: 'bus-003',
        routeNumber: '42C',
        destination: route.to,
        estimatedTime: '18 min',
        capacity: 70,
        occupied: 25,
        location: { lat: 40.7831, lng: -73.9712 },
        status: 'on-time'
      }
    ];
    setBuses(mockBuses);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TrackNGo</h1>
                <p className="text-sm text-gray-600">{translations.welcome}, {user.name}!</p>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>{translations.logout}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Route Search */}
          <div className="lg:col-span-1">
            <RouteSearch 
              onRouteSelect={handleRouteSelect}
              translations={translations}
            />
            
            {selectedRoute && buses.length > 0 && (
              <div className="mt-6">
                <BusList 
                  buses={buses}
                  translations={translations}
                />
              </div>
            )}
          </div>

          {/* Map View */}
          <div className="lg:col-span-2">
            <MapView 
              selectedRoute={selectedRoute}
              buses={buses}
              translations={translations}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;