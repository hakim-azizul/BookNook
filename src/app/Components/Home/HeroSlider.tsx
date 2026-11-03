"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  FaArrowRight,
  FaStar,
  FaBookOpen,
  FaHandHoldingHeart,
} from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      badge: "Curator's Anthology",
      badgeIcon: HiSparkles,
      title: "Where Every Page Whispers a New World",
      description:
        "Wander through a living sanctuary of timeless classics, evocative prose, and profound philosophy. Borrow circulating volumes with gentle ease and lose yourself in unforgettable stories.",
      rating: "4.9 Guild Rating",
      highlights: ["Frictionless Lending", "Zero Hidden Terms", "Community-Maintained"],
      primaryCta: { text: "Peruse the Shelves", href: "/books" },
      secondaryCta: { text: "Join the Fellowship", href: "/signup" },
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
      bgClass: "bg-[#fff7f5]",
    },
    {
      id: 2,
      badge: "The Communal Hearth",
      badgeIcon: FaHandHoldingHeart,
      title: "Bestow Your Bookshelf, Kindle Another Mind",
      description:
        "A cherished volume kept in solitude is a story paused in silence. Bequeath your favorites to our communal shelves and watch knowledge and wonder illuminate fellow seekers.",
      rating: "5.0 Contributor Trust",
      highlights: ["Swift Cataloging", "Enduring Impact", "Eco-Conscious Exchange"],
      primaryCta: { text: "Bestow a Volume", href: "/add-book" },
      secondaryCta: { text: "Explore the Commons", href: "/books" },
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
      bgClass: "bg-[#f8f6f0]",
    },
    {
      id: 3,
      badge: "The Living Canon",
      badgeIcon: FaBookOpen,
      title: "Profound Ideas Curated for Restless Minds",
      description:
        "From transformative science and enduring philosophical inquiries to delicate literary fiction, nurture your curiosity with works thoughtfully shared by our reader circle.",
      rating: "4.8 Readers' Choice",
      highlights: ["Curated Inquiries", "Diverse Voices", "Daily New Arrivals"],
      primaryCta: { text: "Browse Full Catalog", href: "/books" },
      secondaryCta: { text: "My Reading Desk", href: "/my-borrows" },
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
      bgClass: "bg-[#f2f6f8]",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        speed={800}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className="rounded-3xl shadow-xl overflow-hidden bg-white border border-neutral-100"
      >
        {slides.map((slide) => {
          const BadgeIcon = slide.badgeIcon;
          return (
            <SwiperSlide key={slide.id}>
              <div
                className={`w-full min-h-125 md:min-h-130 ${slide.bgClass} flex flex-col-reverse md:flex-row items-center justify-between px-6 sm:px-12 md:px-16 py-10 md:py-14 relative overflow-hidden transition-colors duration-500`}
              >
                {/* Background Decorative Soft Elements */}
                <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/70 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#ff5b49]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Left/Content Side */}
                <div className="w-full md:w-7/12 flex flex-col items-start text-left space-y-4 sm:space-y-5 relative z-10 pt-6 md:pt-0">
                  {/* Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full bg-white shadow-sm border border-neutral-200/80 text-[#ff5b49]">
                    <BadgeIcon className="w-3.5 h-3.5" />
                    <span>{slide.badge}</span>
                  </span>

                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1a1a] leading-tight tracking-tight">
                    {slide.title}
                  </h2>

                  {/* Description */}
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  {/* Highlight Feature Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {slide.highlights.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-3 py-1 bg-white/80 backdrop-blur-xs text-neutral-700 rounded-lg border border-neutral-200/60 shadow-2xs"
                      >
                        ✦ {item}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-3 w-full sm:w-auto">
                    <Link
                      href={slide.primaryCta.href}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-linear-to-r from-[#ff5b49] to-[#ff0018] hover:opacity-95 text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#ff5b49]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
                    >
                      <span>{slide.primaryCta.text}</span>
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href={slide.secondaryCta.href}
                      className="inline-flex items-center justify-center px-5 sm:px-6 py-3.5 bg-white hover:bg-neutral-100 text-[#1a1a1a] font-semibold text-sm rounded-2xl border border-neutral-200 shadow-sm transition-all cursor-pointer"
                    >
                      {slide.secondaryCta.text}
                    </Link>
                  </div>
                </div>

                {/* Right/Image Side */}
                <div className="w-full md:w-5/12 flex justify-center items-center relative z-10 mb-4 md:mb-0">
                  <div className="relative group">
                    {/* Rating Badge */}
                    <div className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-bold text-[#1a1a1a] z-20 border border-neutral-200/70">
                      <FaStar className="text-amber-400 text-xs" />
                      <span>{slide.rating}</span>
                    </div>

                    {/* Book Frame */}
                    <div className="p-3 bg-white rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500 border border-neutral-100">
                      <Image
                        src={slide.image}
                        width={320}
                        height={420}
                        alt={slide.title}
                        className="w-56 sm:w-64 md:w-72 h-64 sm:h-72 md:h-84 object-cover rounded-2xl shadow-inner"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
