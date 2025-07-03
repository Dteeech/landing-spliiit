import Image from "next/image";
import perso1 from "/public/Personnages/01-Spliiiter-SVOD_00046.png"
import perso2 from "/public/Personnages/02-Spliiiter-BienEtre_00000.png"
import perso3 from "/public/Personnages/03-Spliiiter-BlondVR_00022.png"
const YouTubePremiumCard = () => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg w-64 bg-white">
      {/* Top section */}
      <div className="bg-red-600 h-40 flex items-center justify-center">
        <span className="text-white text-2xl font-bold text-center leading-tight">
          YouTube<br />Premium
        </span>
      </div>

      {/* Avatars */}
      <div className="flex justify-center -mt-6 mb-4 space-x-2">
        <Image
          src={perso1}
          alt="avatar1"
          width={500}
          height={500}
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <Image
          src={perso2}
          alt="avatar2"
          className="w-10 h-10 rounded-full border-2 border-white"
          width={500}
          height={500}
        />
        <Image
          src={perso3}
          alt="avatar3"
          className="w-10 h-10 rounded-full border-2 border-white"
          width={500}
          height={500}
        />
      </div>

      {/* Price */}
      <div className="text-center pb-4">
        <p className="text-xl font-bold">5.19€/mois</p>
      </div>
    </div>
  );
};

export default YouTubePremiumCard;
