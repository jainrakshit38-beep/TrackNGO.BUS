import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import LanguageSwitcher from './components/LanguageSwitcher';
import HelplineButton from './components/HelplineButton';
import { translations } from './utils/translations';

export interface User {
  id: string;
  email: string;
  name: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'en' | 'es' | 'fr' | 'hi'>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('transportUser');
    const storedLanguage = localStorage.getItem('transportLanguage') as 'en' | 'es' | 'fr' | 'hi';
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
    
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('transportUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('transportUser');
  };

  const handleLanguageChange = (newLanguage: 'en' | 'es' | 'fr' | 'hi') => {
    setLanguage(newLanguage);
    localStorage.setItem('transportLanguage', newLanguage);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute top-4 right-4 z-50 flex items-center space-x-3">
        <HelplineButton translations={translations[language]} />
        <LanguageSwitcher 
          currentLanguage={language} 
          onLanguageChange={handleLanguageChange}
          translations={translations[language]}
        />
      </div>
      
      {!user ? (
        <LoginForm 
          onLogin={handleLogin} 
          translations={translations[language]}
        />
      ) : (
        <Dashboard 
          user={user} 
          onLogout={handleLogout}
          translations={translations[language]}
        />
      )}
    </div>
  );
}

export default App;