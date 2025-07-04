"use client";
import Image from 'next/image';
import mamie from '@/public/gif/mamie.webp'
import perso from '@/public/gif/e-commerce.webp'
import persoBarbe from '@/public/gif/barbe.webp'
import persoCasque from '@/public/gif/casque.webp'
import persoVr from '@/public/gif/vr.webp'

export default function Avatars() {
  return (
    <div className="flex justify-center items-center gap-4 flex-wrap p-5">
      <div className="w-44 h-44 rounded-full bg-gray-200 overflow-hidden flex justify-center items-center ">
         <Image src={mamie} alt="avatar" width={44} height={44} className="w-full h-full object-cover" />
      </div>
      <div className="w-44 w-44 rounded-full bg-gray-200 overflow-hidden flex justify-center items-center -ml-24 lg:-ml-11">
        <Image src={perso} alt="avatar" width={44} height={44} className="w-full h-full object-cover" />
      </div>
      <div className="w-44 w-44 rounded-full bg-gray-200 overflow-hidden flex justify-center items-center -mt-10 lg:-ml-11 ">
        <Image src={persoBarbe} alt="avatar" width={44} height={44} className="w-full h-full object-cover" />
      </div>
      <div className="w-44 w-44 rounded-full bg-gray-200 overflow-hidden flex justify-center items-center -mt-10 -ml-24 lg:-ml-11">
        <Image src={persoCasque} alt="avatar" width={44} height={44} className="w-full h-full object-cover" /> 
      </div>
      <div className="w-44 w-44 rounded-full bg-gray-200 overflow-hidden flex justify-center items-center -mt-16 lg:-ml-11">
        <Image src={persoVr} alt="avatar" width={44} height={44} className="w-full h-full object-cover" /> 
      </div>
    </div>
  );
}
