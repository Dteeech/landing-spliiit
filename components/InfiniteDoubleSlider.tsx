// components/InfiniteDoubleSlider.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

interface Review {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

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


export default function InfiniteDoubleSlider() {
  return (
    <div className="py-10 w-full">
      <style>
        {`
          .swiper-wrapper {
          padding:25px;
        }
        `}
      </style>
      {/* Ligne 1 : vers la droite */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView="auto"
        autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: false }}
        speed={5000}
        loop={true}
      >
        {reviews.concat(reviews).map((review, index) => (
          <SwiperSlide key={`top-${index}`} style={{ width: 'auto' }} className="bg-white p-4 rounded-lg shadow-md">
            <div className=" mx-2 min-w-[300px] py-10">
              <div className="flex items-center mb-2">
                
                <div>
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-yellow-400">{'★'.repeat(review.rating)}</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">"{review.comment}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Ligne 2 : vers la gauche */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView="auto"
        autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true }}
        speed={5000}
        loop={true}
      >
        {reviews.concat(reviews).map((review, index) => (
          <SwiperSlide key={`top-${index}`} style={{ width: 'auto' }} className="bg-white p-4 rounded-lg shadow-md" >
            <div className="mx-2 min-w-[300px] my-10">
              <div className="flex items-center mb-2">
                
                <div>
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-yellow-400">{'★'.repeat(review.rating)}</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">"{review.comment}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
