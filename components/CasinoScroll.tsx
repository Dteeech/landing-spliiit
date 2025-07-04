"use client";
import { useEffect, useState } from "react";

export default function SlotMachine() {
  const items = [
    
    "Microsoft 365",
    "Le Monde",
    "Amazon Prime",
    "Apple One",
    "Gaia",
    "Duolingo",
    "YouTube Premium",
    "Deezer",
    "Canva",
    "L'Équipe",
    "Dropbox",
    "Headspace",
    "Crunchyroll",
    "Tidal",
    "Dashlane",
    "Antidote",
    "Le Figaro",
    "Canal+",
    "HBO Max",
    "Apple TV+",
    "Apple Music",
    "Qobuz",
    "Tidal",
    "Cyber Ghost",
    "Dashlane",
    "Bitdefender",
    "PrimeVideo",
    "Bayam",
    "Google Play Pass",
    "Apple Arcade",
    "Setapp",
    "Proton",
    "YNAB",
    "Semrush",
    "Cafeyn",
    "Mediapart",
    "Cdiscount",
    "Icloud",
    "Google one",
    "Drive",
    "Strava",
    "Calm",
    "Headscape",
    "Simply",
    "Hypnoledge",
    "Disney+",
    "Spotify",
    "NordVPN",
    "Nintendo",
    "Netflix",
    "vos abonnements !"
  ];
  const itemHeight = 125; // hauteur d'une ligne sans marge
  const gap = 16; // espace entre les mots (en px)
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    // Distance : nombre d'éléments * (hauteur + gap)
    const stopIndex = items.length - 1;
    const distance = stopIndex * (itemHeight + gap);
    setTranslateY(distance);
  }, []);

  return (
    <h1 className="text-5xl font-bold h-auto">
      Économisez sur le prix de <br />{" "}
      <span
        className="inline-block overflow-hidden align-bottom"
        style={{ height: `${itemHeight}px` }}
      >
        <span
          className="inline-block transition-transform ease-out"
          style={{
            transform: `translateY(-${translateY}px)`,
            transitionDuration: "10s", // ajuster durée si besoin
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                height: `${itemHeight}px`,
                
                marginBottom: `${idx === items.length - 1 ? 0 : gap}px`, // pas de gap après le dernier
              }}
            >
              {item}
            </div>
          ))}
        </span>
      </span>
    </h1>
  );
}
