"use client";

import Image from "next/image";
import React from "react";

const FeatureSection = () => {
  const features = [
    {
      id: 1,
      title: "An Infinite Alcove",
      description:
        "Wander through thousands of volumes spanning centuries of human inquiry, from gentle allegories to groundbreaking treatises.",
      image: "/feature_asset/decision.png",
    },
    {
      id: 2,
      title: "Frictionless Lending",
      description:
        "Borrow circulating titles with gentle ease, keep quiet track of your active reads, and return them when the final page is turned.",
      image: "/feature_asset/borrow.png",
    },
    {
      id: 3,
      title: "The Commonwealth of Letters",
      description:
        "Give back to the reading commons by bestowing your cherished books upon seeking hands across the community.",
      image: "/feature_asset/publish.png",
    },
    {
      id: 4,
      title: "A Living Fellowship",
      description:
        "Connect with fellow literary travelers, exchange profound perspectives, and nurture an enduring reverence for the printed word.",
      image: "/feature_asset/GrowCommunity.png",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {features.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-all duration-300 group"
          >
            {/* Image / Illustration Box */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 mb-5 flex items-center justify-center relative">
              <Image
                src={item.image}
                alt={item.title}
                width={128}
                height={128}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-extrabold text-[#1a1a1a] mb-2">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
