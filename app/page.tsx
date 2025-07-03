'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import OtpForm from "@/components/OtpForm";
import { ChevronDown, ChevronUp, Play, Star, Shield, Users, Smartphone, Zap, Plus, Minus, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

import groupe from '../public/Personnages/proposer.webp';
import rejoindre from '../public/Personnages/rejoindre.webp';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import InfiniteDoubleSlider from '@/components/InfiniteDoubleSlider';
import { Service, FAQ, Review, ReassuranceItem } from './types/interfaces';
import Simulator from '@/components/Simulator';
import CasinoScroll from '@/components/CasinoScroll';
import Avatars from '@/components/LittleCharacters';

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

const slotMachineWords = [
  'Netflix', 'Disney+', 'Spotify', 'NordVPN', 'Nintendo Switch', 'Microsoft 365',
  'Le Monde', 'Amazon Prime', 'Apple One', 'Gaia', 'Duolingo', 'YouTube Premium',
  'Deezer', 'Canva', 'L\'Équipe', 'Dropbox', 'Headspace', 'Crunchyroll',
  'Tidal', 'Dashlane', 'Antidote', 'Le Figaro', 'Canal+', 'HBO Max',
  'Apple TV+', 'Apple Music', 'Qobuz', 'Cyber Ghost', 'Bitdefender',
  'PrimeVideo', 'Bayam', 'Google Play Pass', 'Apple Arcade', 'Setapp',
  'Proton', 'YNAB', 'Semrush', 'Cafeyn', 'Mediapart', 'Cdiscount',
  'iCloud', 'Google One', 'Drive', 'Strava', 'Calm', 'Headspace',
  'Simply', 'Hypnoledge'
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
      <section className="relative flex items-center justify-center bg-whitetext-center">
        <div className=" mx-auto px-6 grid items-center pt-10">
          {/* Left Content */}
          <div className="space-y-8 gap-12 text-center p-5">

            {/* Main Heading with Slot Machine Effect */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-spliiit-black leading-tight">
                
                <CasinoScroll />
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Économisez sur vos abonnements en rejoignant la plus grande communauté de co-abonnement.
              </p>

            </div>
          </div>
          </div>
      </section>

    <Avatars />
      {/* Section Proposer/Rejoindre + Simulateur */}
      <section className="py-10">
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
          <Simulator />
        </div>
      </section>
      {/* Section OTP */}
      <OtpForm />

      {/* Vidéo de présentation */}

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
      <section className="py-10">
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
              const colorClassMap: Record<string, string> = {
                'spliiit-green': 'bg-spliiit-green/20 text-spliiit-green',
                'spliiit-brown': 'bg-spliiit-brown/20 text-spliiit-brown',
                'spliiit-blue': 'bg-spliiit-blue/20 text-spliiit-blue',
                'spliiit-yellow': 'bg-spliiit-yellow/20 text-spliiit-yellow'
              };
              const colorClasses = colorClassMap[item.color] || 'bg-gray-100 text-gray-600';

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
                  <div className="p-6 pt-0">
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