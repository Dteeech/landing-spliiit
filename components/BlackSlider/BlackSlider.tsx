import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import { Autoplay, FreeMode } from 'swiper/modules';
import NordVPNCard from './cards/NordVPNCard';
import PrimeCard from './cards/Prime';
import YouTubePremiumCard from './cards/YoutubeCard';
import SpotifyCard from './cards/SpotifyCard';

const AbonnementSlider = () => {
  return (
    <div className="bg-black rounded-2xl p-6 m-auto flex align-center justify-center mx-[45px]">
      <div className="mb-6 w-1/2 p-5">
        <h2 className="text-white text-3xl font-bold mb-4">Plus de 300 abonnements partageables</h2>
        <button className="bg-white text-black rounded-full px-4 py-2 font-semibold">
          Voir tous les abonnements
        </button>
      </div>
      <div className='w-2/3 p-5'>

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={20}
          freeMode={true}
          slidesPerView={"auto"}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={5000}
        >
          <SwiperSlide style={{ width: '250px' }}>
            {/* NordVPN Card */}
            <NordVPNCard />
          </SwiperSlide>
          <SwiperSlide style={{ width: '250px' }}>
            <PrimeCard />
          </SwiperSlide>
          <SwiperSlide style={{ width: '250px' }}>
            <YouTubePremiumCard />
          </SwiperSlide>
          <SwiperSlide style={{ width: '250px' }}>
            <SpotifyCard />
          </SwiperSlide>
          <SwiperSlide style={{ width: '250px' }}>
            <YouTubePremiumCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}
export { AbonnementSlider }