import { useState } from "react";
import { Service } from "@/app/types/interfaces";
function Simulator() {
  
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const addService = (service: Service) => {
    if (!selectedServices.find(s => s.name === service.name)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeService = (serviceName: string) => {
    setSelectedServices(selectedServices.filter(s => s.name !== serviceName));
  };
  const services: Service[] = [
    { name: 'Netflix Premium', price: 17.99, logo: '🎬', color: 'spliiit-red' },
    { name: 'Disney+', price: 8.99, logo: '🏰', color: 'spliiit-brown' },
    { name: 'Canal+', price: 22.99, logo: '📡', color: 'spliiit-black' },
    { name: 'Spotify Premium', price: 9.99, logo: '🎵', color: 'spliiit-spotify' },
    { name: 'Prime Video', price: 6.99, logo: '📺', color: 'spliiit-blue' },
    { name: 'Deezer Premium', price: 10.99, logo: '🎼', color: 'spliiit-black' },
    { name: 'Crunchyroll', price: 4.99, logo: '🍿', color: 'spliiit-brown' },
    { name: 'NordVPN', price: 11.95, logo: '🔒', color: 'spliiit-blue' },
    { name: 'YouTube Premium', price: 11.99, logo: '📹', color: 'spliiit-red' },
    { name: 'Apple TV+', price: 6.99, logo: '🍎', color: 'spliiit-white' },
  ];

  const totalNormalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalSpliiitPrice = totalNormalPrice / 4;
  const totalSavings = totalNormalPrice - totalSpliiitPrice;
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg pricing-highlight">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center text-primary">
        Simulateur d'économies
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-gray-700 mb-4">Ajoutez vos abonnements :</h4>
          <div className="grid grid-cols-2 gap-3 mb-4 max-h-64 overflow-y-auto">
            {services.map((service) => {
              const isSelected = selectedServices.find(s => s.name === service.name);
              const borderColorClasses = {
                'spliiit-purple': 'border-spliiit-purple',
                'spliiit-brown': 'border-spliiit-brown',
                'spliiit-blue': 'border-spliiit-blue',
                'spliiit-green': 'border-spliiit-green',
                'spliiit-yellow': 'border-spliiit-yellow',
                'spliiit-red': 'border-spliiit-red',
                'spliiit-spotify': 'border-spliiit-spotify',
                'spliiit-white': 'border-spliiit-white'
              }[service.color] || 'border-gray-200';

              return (
                <button
                  key={service.name}
                  onClick={() => addService(service)}
                  className={`flex items-center justify-between p-3 border rounded-lg hover:border-spliiit-brown hover:bg-gray-50 transition-all duration-200 group ${isSelected ? borderColorClasses : 'border-gray-200'}`}
                >
                  <span className="flex items-center">
                    <span className="mr-2 text-lg">{service.logo}</span>
                    <div className="text-left">
                      <div className="text-sm font-medium">{service.name.split(' ')[0]}</div>
                      <div className="text-xs text-gray-500">{service.price}€</div>
                    </div>
                  </span>
                  <Plus className="w-4 h-4 text-spliiit-brown group-hover:scale-110 transition-transform" />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-4">Vos abonnements sélectionnés :</h4>
          {selectedServices.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">💡</div>
              <p className="text-gray-500 italic">Sélectionnez des abonnements pour voir vos économies</p>
            </div>
          ) : (
            <div className="space-y-2 mb-6">
              {selectedServices.map((service) => {
                const borderColorClasses = {
                  'spliiit-purple': 'border-l-spliiit-purple',
                  'spliiit-brown': 'border-l-spliiit-brown',
                  'spliiit-blue': 'border-l-spliiit-blue',
                  'spliiit-green': 'border-l-spliiit-green',
                  'spliiit-yellow': 'border-l-spliiit-yellow',
                  'spliiit-red': 'border-l-spliiit-red',
                  'spliiit-spotify': 'border-l-spliiit-spotify',
                  'spliiit-white': 'border-l-spliiit-white'
                }[service.color] || 'border-l-gray-300';

                return (
                  <div key={service.name} className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 ${borderColorClasses}`}>
                    <span className="flex items-center">
                      <span className="mr-2">{service.logo}</span>
                      <span className="font-medium">{service.name}</span>
                    </span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">{service.price}€</span>
                      <button
                        onClick={() => removeService(service.name)}
                        className="text-red-500 hover:text-red-700 hover:scale-110 transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {selectedServices.length > 0 && (
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Prix normal :</span>
                  <span className="text-lg font-bold text-gray-800">{totalNormalPrice.toFixed(2)}€/mois</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Prix avec Spliiit :</span>
                  <span className="text-2xl font-bold text-spliiit-green">{totalSpliiitPrice.toFixed(2)}€/mois</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-800">Économies :</span>
                    <span className="text-2xl font-bold text-spliiit-green">
                      -{totalSavings.toFixed(2)}€/mois
                    </span>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-sm text-gray-600">
                      Soit {(totalSavings * 12).toFixed(0)}€ d'économies par an ! 🎉
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Simulator;