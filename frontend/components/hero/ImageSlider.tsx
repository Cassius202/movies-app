"use client";

import { heroImages } from "@/constants/assets";
import Image from "next/image";
import { useState, useEffect } from "react";

export const ImageSlider = () => {
  const [idx, setIdx] = useState(0);

  const changeBackground = () => {
    setIdx((prevIdx) => (prevIdx + 1) % heroImages.length);
  };

  useEffect(() => {
    const intervalId = setInterval(changeBackground, 13000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-full -z-10">
      <div
        className="absolute inset-0 z-10 bg-black/30 "
      />

      <Image
        src={heroImages[idx]}
        alt={`Hero Image ${idx + 1}`}
        fill
        priority
        className="object-cover"
      />
    </div>
  );
};