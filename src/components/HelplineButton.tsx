import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';

interface HelplineButtonProps {
  translations: any;
}

const HelplineButton: React.FC<HelplineButtonProps> = ({ translations }) => {
  const [showModal, setShowModal] = useState(false);

  const helplineNumbers = [
    { label: 'Emergency', number: '100', description: 'Police Emergency' },
    { label: 'Transport Helpline', number: '1073', description: 'Delhi Transport Corporation' },
    { label: 'Metro Helpline', number: '155370', description: 'Delhi Metro Rail Corporation' },
    { label: 'Tourist Helpline', number: '1363', description: 'Delhi Tourism' }
  ];

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm"
        title={translations.helpline || 'Helpline'}
      >
        <Phone className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">
          {translations.helpline || 'Helpline'}
        </span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-96 overflow-hidden">
            <div className="bg-green-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <h3 className="text-lg font-semibold">
                  {translations.helplineNumbers || 'Helpline Numbers'}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-green-700 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
              {helplineNumbers.map((helpline, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{helpline.label}</h4>
                    <button
                      onClick={() => handleCall(helpline.number)}
                      className="bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{translations.call || 'Call'}</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{helpline.description}</p>
                  <p className="text-lg font-mono text-green-600 font-bold">{helpline.number}</p>
                </div>
              ))}
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>{translations.note || 'Note'}:</strong> {translations.helplineNote || 'These numbers are for Delhi region. Contact your local transport authority for other cities.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelplineButton;