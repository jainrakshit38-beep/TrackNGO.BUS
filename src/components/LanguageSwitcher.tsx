import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLanguage: 'en' | 'es' | 'fr' | 'hi';
  onLanguageChange: (language: 'en' | 'es' | 'fr' | 'hi') => void;
  translations: any;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  translations
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="text-sm font-medium text-gray-700">{currentLang?.name}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  onLanguageChange(language.code as 'en' | 'es' | 'fr' | 'hi');
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 ${
                  currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
                {currentLanguage === language.code && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;