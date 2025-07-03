import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Service } from "@/app/types/interfaces";

function Simulator() {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("Tous");

  const services: Service[] = [
    { name: 'Netflix Premium', price: 17.99, logo: '🎬', color: 'spliiit-red', category: 'SVOD' },
    { name: 'Disney+', price: 8.99, logo: '🏰', color: 'spliiit-purple', category: 'SVOD' },
    { name: 'Canal+', price: 22.99, logo: '📡', color: 'spliiit-black', category: 'SVOD' },
    { name: 'Prime Video', price: 6.99, logo: '📺', color: 'spliiit-blue', category: 'SVOD' },
    { name: 'Apple TV+', price: 6.99, logo: '🍎', color: 'spliiit-brown', category: 'SVOD' },
    { name: 'Crunchyroll', price: 4.99, logo: '�', color: 'spliiit-brown', category: 'SVOD' },
    { name: 'YouTube Premium', price: 11.99, logo: '📹', color: 'spliiit-red', category: 'SVOD' },
    { name: 'Spotify Premium', price: 9.99, logo: '🎵', color: 'spliiit-spotify', category: 'Musique' },
    { name: 'Deezer Premium', price: 10.99, logo: '🎼', color: 'spliiit-black', category: 'Musique' },
    { name: 'NordVPN', price: 11.95, logo: '🔒', color: 'spliiit-blue', category: 'Sécurité' },
  ];

  const categories = [
    "Tous", "SVOD", "Musique", "Sécurité", "Jeux vidéo", "Logiciel",
    "Lecture", "E-commerce", "Cloud", "Bien-être", "Education"
  ];

  const filteredServices = activeFilter === "Tous"
    ? services
    : services.filter(service => service.category === activeFilter);

  const addService = (service: Service) => {
    if (!selectedServices.find(s => s.name === service.name)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeService = (serviceName: string) => {
    setSelectedServices(selectedServices.filter(s => s.name !== serviceName));
  };

  const totalNormalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalSpliiitPrice = totalNormalPrice / 4;
  const totalSavings = totalNormalPrice - totalSpliiitPrice;

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap: Record<string, string> = {
      'spliiit-red': isSelected ? 'bg-spliiit-red text-white border-spliiit-red' : 'bg-white text-gray-700 border-gray-300 hover:border-spliiit-red',
      'spliiit-brown': isSelected ? 'bg-spliiit-brown text-white border-spliiit-brown' : 'bg-white text-gray-700 border-gray-300 hover:border-spliiit-brown',
      'spliiit-blue': isSelected ? 'bg-spliiit-blue text-white border-spliiit-blue' : 'bg-white text-gray-700 border-gray-300 hover:border-spliiit-blue',
      'spliiit-green': isSelected ? 'bg-spliiit-green text-white border-spliiit-green' : 'bg-white text-gray-700 border-gray-300 hover:border-spliiit-green',
      'spliiit-yellow': isSelected ? 'bg-spliiit-yellow text-white border-spliiit-yellow' : 'bg-white text-gray-700 border-gray-300 hover:border-spliiit-yellow',
      'spliiit-black': isSelected ? 'bg-spliiit-black text-white border-spliiit-black' : 'bg-white text-gray-700 border-gray-300 hover:border-spliiit-black',
      'spliiit-spotify': isSelected ? 'bg-spliiit-spotify text-white border-spliiit-spotify' : 'bg-white text-gray-700 border-gray-300 hover:border-spliiit-spotify',
      'spliiit-white': isSelected ? 'bg-gray-100 text-gray-800 border-gray-400' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400',
    };
    return colorMap[color] || 'bg-white text-gray-700 border-gray-300';
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg pricing-highlight">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center text-primary">
        Simulateur d'économies
      </h3>

      {/* Filtres par catégorie */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === category
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-gray-700 mb-4">Ajoutez vos abonnements :</h4>
          <div className="grid grid-cols-2 gap-3 mb-4 max-h-64 overflow-y-auto">
            {filteredServices.map((service) => {
              const isSelected = selectedServices.find(s => s.name === service.name);
              const colorClasses = getColorClasses(service.color, !!isSelected);

              return (
                <button
                  key={service.name}
                  onClick={() => isSelected ? removeService(service.name) : addService(service)}
                  className={`relative flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 min-h-[80px] ${colorClasses}`}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium">{service.name.split(' ')[0]}</div>
                    <div className="text-xs opacity-75">{service.price}€</div>
                  </div>

                  {/* Icône + ou - dans le coin */}
                  <div className="absolute top-1 right-1">
                    {isSelected ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
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
                const borderColorClasses: Record<string, string> = {
                  'spliiit-red': 'border-l-spliiit-red',
                  'spliiit-brown': 'border-l-spliiit-brown',
                  'spliiit-blue': 'border-l-spliiit-blue',
                  'spliiit-green': 'border-l-spliiit-green',
                  'spliiit-yellow': 'border-l-spliiit-yellow',
                  'spliiit-black': 'border-l-spliiit-black',
                  'spliiit-spotify': 'border-l-spliiit-spotify',
                  'spliiit-white': 'border-l-gray-400'
                };
                const borderClass = borderColorClasses[service.color] || 'border-l-gray-300';

                return (
                  <div key={service.name} className={`flex items-center justify-between p-3 border-l-4 ${borderClass}`}>
                    <span className="flex items-center">
                      <span className="font-medium">{service.name}</span>
                    </span>
                    <span className="text-sm text-gray-600">{service.price}€</span>
                  </div>
                );
              })}
            </div>
          )}

          {selectedServices.length > 0 && (
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Prix plein tarif :</span>
                  <span className="text-lg font-bold text-gray-800">{totalNormalPrice.toFixed(2)}€/mois</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Prix avec Spliiit :</span>
                  <span className="text-2xl font-bold text-spliiit-green">{totalSpliiitPrice.toFixed(2)}€/mois</span>
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