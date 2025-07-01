'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Play, Star, Shield, Users, Smartphone, Zap, Plus, Minus, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import spliiitVod from '../public/Personnages/Spliiit_SVOD.png'
import groupe from '../public/Personnages/proposer.webp';
import rejoindre from '../public/Personnages/rejoindre.webp';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import InfiniteDoubleSlider from '@/components/InfiniteDoubleSlider';

// Types pour les données
interface Service {
  name: string;
  price: number;
  logo: string;
  color: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Review {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface ReassuranceItem {
  icon: any;
  text: string;
  description: string;
  color: string;
}

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

const faqs: FAQ[] = [
  {
    question: "Est-ce légal de partager ses abonnements ?",
    answer: "Oui, dans la plupart des cas, les plateformes autorisent le partage familial. Nous nous assurons que tous les partages respectent les conditions d'utilisation des services."
  },
  {
    question: "Comment fonctionne le paiement ?",
    answer: "Le titulaire du compte paie l'abonnement complet, puis les autres membres remboursent leur part via notre plateforme sécurisée. Tous les paiements sont protégés."
  },
  {
    question: "Puis-je quitter un groupe à tout moment ?",
    answer: "Absolument ! Vous pouvez quitter un groupe à tout moment avec un préavis de 7 jours. Aucun engagement sur la durée."
  },
  {
    question: "Quels services sont disponibles ?",
    answer: "Netflix, Disney+, Spotify, Prime Video, Canal+, Deezer, Crunchyroll, NordVPN et bien d'autres. Nous ajoutons régulièrement de nouveaux services."
  },
  {
    question: "Comment sont sélectionnés les membres d'un groupe ?",
    answer: "Nous vérifions tous les profils et utilisons un système de notation pour garantir la fiabilité des membres. Vous pouvez consulter les avis avant de rejoindre un groupe."
  }
];

const reviews: Review[] = [
  {
    name: "Marie L.",
    rating: 5,
    comment: "Super pratique et facile d'utilisation ! J'économise plus de 40€ par mois.",
    avatar: "👩‍💼"
  },
  {
    name: "Thomas K.",
    rating: 5,
    comment: "J'ai réduit mes dépenses sans effort. L'interface est intuitive.",
    avatar: "👨‍💻"
  },
  {
    name: "Sophie M.",
    rating: 5,
    comment: "Interface intuitive, je recommande vivement à tous mes amis !",
    avatar: "👩‍🎨"
  },
  {
    name: "Paul D.",
    rating: 4,
    comment: "Économies substantielles chaque mois. Service client réactif.",
    avatar: "👨‍🔬"
  },
  {
    name: "Emma R.",
    rating: 5,
    comment: "Parfait pour les étudiants ! Simple et sécurisé.",
    avatar: "👩‍🎓"
  },
  {
    name: "Lucas B.",
    rating: 5,
    comment: "Plus de 60€ d'économies par mois, c'est incroyable !",
    avatar: "👨‍🚀"
  }
];

const reassuranceItems: ReassuranceItem[] = [
  {
    icon: Shield,
    text: "Paiements sécurisés",
    description: "Transactions protégées par cryptage SSL",
    color: "spliiit-green"
  },
  {
    icon: Users,
    text: "Communauté vérifiée",
    description: "Plus de 50 000 utilisateurs de confiance",
    color: "spliiit-brown"
  },
  {
    icon: Smartphone,
    text: "100% mobile",
    description: "Application disponible iOS et Android",
    color: "spliiit-blue"
  },
  {
    icon: Zap,
    text: "Inscription rapide",
    description: "Créez votre compte en moins de 30 secondes",
    color: "spliiit-yellow"
  }
];

export default function SpliiitLanding() {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+33');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  const scrollToOTP = () => {
    document.getElementById('otp-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-spliiit-brown"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-black">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Spliiit: Où les
                <br />
                <span className="text-white/90">Économies</span>
                <br />
                Rencontrent la Simplicité
              </h1>

              <p className="text-xl text-white/80 mb-8 max-w-lg">
                Le compagnon intelligent qui apprend et s'adapte à vos habitudes de consommation.
              </p>

              <button
                onClick={scrollToOTP}
                className="group inline-flex items-center px-8 py-4 bg-white text-spliiit-pink rounded-full text-lg font-semibold hover:bg-spliiit-pink hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Commencer maintenant
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Content - 3D Robot/Character */}
            <div className="relative">
              <Image src={spliiitVod} alt='image hero split' width={500} height={500} className="w-full h-auto" />

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-float">
                <span className="text-2xl">💰</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float delay-1000">
                <span className="text-xl">⚠️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos partenaires avec Swiper */}
      <section className="py-16 bg-slate-50" >
        <div className="mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-spliiit-black mb-12 text-primary">
            Partagez vos services préférés
          </h2>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={'auto'}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={5000}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 6,
              },
              1024: {
                slidesPerView: 8,
              },
            }}
            className="services-swiper"
          >
            {services.map((service, index) => {
              const colorBgClasses = {
                'spliiit-purple': 'bg-spliiit-purple/20',
                'spliiit-brown': 'bg-spliiit-brown/20',
                'spliiit-blue': 'bg-spliiit-blue/20',
                'spliiit-green': 'bg-spliiit-green/20',
                'spliiit-yellow': 'bg-spliiit-yellow/20',
                'spliiit-red': 'bg-spliiit-red/20',
                'spliiit-spotify': 'bg-spliiit-spotify/20',
                'spliiit-white': 'bg-spliiit-white/20',
                'spliiit-black': 'bg-spliiit-dark/20',
                
              }[service.color] || 'bg-gray-100';

              return (
                <SwiperSlide key={index}>
                  <div className="text-center group cursor-pointer service-logo h-52 ">
                    <div className={`text-4xl mb-2 group-hover:scale-110 transition-transform duration-300 p-4 ${colorBgClasses} h-full rounded-xl flex flex-col items-center justify-center`}>
                      {service.logo}
                      <div className="text-sm text-gray-600 font-medium">{service.name.split(' ')[0]}</div>
                      <div className="text-xs text-gray-500">{service.price}€/mois</div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      {/* Section Proposer/Rejoindre + Simulateur */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 text-primary">
            Partagez un abonnement, rejoignez un groupe
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Proposez une place */}
            <div className="bg-white p-8 rounded-2xl shadow-lg card-hover">
              <div className="text-4xl mb-4">
                <Image src={groupe} alt="Groupe de personnages Spliiit" width={400} height={300} className="w-full h-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Proposez une place</h3>
              <p className="text-gray-600 mb-6">
                Vous avez une place libre ? Proposez-la en 2 clics et gagnez de l'argent.
              </p>
              <button className="bg-spliiit-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-spliiit-white hover:text-black hover:border hover:border-black transition-all duration-300 transform hover:scale-105">
                Proposer une place
              </button>
            </div>

            {/* Rejoignez un abonnement */}
            <div className="bg-white p-8 rounded-2xl shadow-lg card-hover">
              <div className="text-4xl mb-4">
                <Image src={rejoindre} alt="Groupe de personnages Spliiit" width={400} height={300} className="w-full h-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Rejoignez un abonnement</h3>
              <p className="text-gray-600 mb-6">
                Trouvez une offre qui vous correspond et économisez dès aujourd'hui.
              </p>
              <button className="bg-spliiit-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-spliiit-white hover:text-black hover:border hover:border-black transition-all duration-300 transform hover:scale-105">
                Voir les offres disponibles
              </button>
            </div>
          </div>

          {/* Simulateur */}
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
        </div>
      </section>
      {/* Section OTP */}
      <section id="otp-section" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-primary">
            Créez votre compte en 10 secondes
          </h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto hover-lift">
            <div className="flex mb-4">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-white border border-gray-300 rounded-l-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-spliiit-brown transition-all"
              >
                <option value="+33">🇫🇷 +33</option>
                <option value="+32">🇧🇪 +32</option>
                <option value="+41">🇨🇭 +41</option>
              </select>
              <input
                type="tel"
                placeholder="Numéro de téléphone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 border border-gray-300 rounded-r-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-spliiit-brown transition-all"
              />
            </div>
            <button className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Recevoir mon code
            </button>
          </div>
        </div>
      </section>

      {/* Avis Google avec Swiper */}
      <section className="py-20 bg-white">
        <div className=" mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-primary">Ce que disent nos utilisateurs</h2>
            <div className="flex items-center justify-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-700">4,9/5</span>
            </div>
            <p className="text-gray-600">Basé sur plus de 10,000 avis Google</p>
          </div>

          <InfiniteDoubleSlider />
        </div>
      </section>

      {/* Slider réassurance avec Swiper */}
      <section className="py-16 bg-gray-50">
        <div className=" mx-auto px-6">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="reassurance-swiper"
          >
            {reassuranceItems.map((item, index) => {
              const colorClasses = {
                'spliiit-green': 'bg-spliiit-green/20 text-spliiit-green',
                'spliiit-brown': 'bg-spliiit-brown/20 text-spliiit-brown',
                'spliiit-blue': 'bg-spliiit-blue/20 text-spliiit-blue',
                'spliiit-yellow': 'bg-spliiit-yellow/20 text-spliiit-yellow'
              }[item.color] || 'bg-gray-100 text-gray-600';

              return (
                <SwiperSlide key={index}>
                  <div className="text-center p-6 card-hover bg-white rounded-xl">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${colorClasses.split(' ')[0]}`}>
                      <item.icon className={`w-8 h-8 ${colorClasses.split(' ')[1]}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-spliiit-black mb-2">{item.text}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 text-primary">
            Questions fréquentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-left text-gray-800">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-spliiit-brown" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-spliiit-brown" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="p-6 pt-0 bg-gray-50">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à économiser sur vos abonnements ?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Rejoignez plus de 50,000 utilisateurs qui économisent déjà avec Spliiit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToOTP}
              className="bg-white text-spliiit-brown px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Commencer maintenant
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-spliiit-brown transition-all duration-300">
              En savoir plus
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-gray-300">Utilisateurs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">€2M+</div>
              <div className="text-gray-300">Économisés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-gray-300">Services</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-gray-300">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}