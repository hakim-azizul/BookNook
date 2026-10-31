"use client";

import Image from "next/image";
import React from "react";

const FeatureSection = () => {
  const features = [
    {
      id: 1,
      title: "Selection",
      description:
        "We have more than 13 million titles to choose from, from the earliest board books to the all-time classics.",
      image: "/feature_asset/decision.png",
    },
    {
      id: 2,
      title: "Purchasing Power",
      description:
        "With Wish Lists you can choose to be notified the instant we find a copy, see how often we find rare titles.",
      image: "/feature_asset/borrow.png",
    },
    {
      id: 3,
      title: "Used & New books",
      description:
        "If there is no demand for a book, we will donate it to charity, or we'll recycle it.",
      image: "/feature_asset/publish.png",
    },
    {
      id: 4,
      title: "Shipping & More",
      description:
        "When you've found the books you want we'll ship qualifying orders to your door for FREE.",
      image:"/feature_asset/GrowCommunity.png",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
        {features.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 group"
          >
            {/* Image / Illustration Box */}
            <div className="w-32 h-32 mb-6 flex items-center justify-center relative">
              <Image
                src={item.image}
                alt={item.title}
                width={300} // ছোট উইডথ দিন যেহেতু কন্টেইনার w-32 (128px)
                height={300} // ছোট হাইট দিন
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Title (#1a1a1a) */}
            <h3 className="text-xl font-extrabold text-[#1a1a1a] mb-3">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default FeatureSection;
