'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaArrowRight, FaStar, FaShieldAlt } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      badge: "EDITOR CHOICE ⭐",
      title: "Our Sci-Fi & Fantasy Picks",
      description: "Explore worlds beyond imagination with our handpicked collection of bestselling sci-fi and epic fantasy novels.",
      price: "$24.55",
      originalPrice: "$45.55",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
      bgClass: "bg-[#fff5f3]", 
    },
    {
      id: 2,
      badge: "🔥 BESTSELLER OF 2026",
      title: "Top 10 Books To Make It A Great Year",
      description: "Transform your daily habits, boost productivity, and master your mindset with these life-changing reads.",
      price: "$19.99",
      originalPrice: "$35.00",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
      bgClass: "bg-[#f8f6f0]",
    },
    {
      id: 3,
      badge: "✨ NEW ARRIVAL",
      title: "Discover The Best Novels Of The Season",
      description: "Immerse yourself in breathtaking storytelling, mystery thrillers, and award-winning masterpieces.",
      price: "$29.00",
      originalPrice: "$50.00",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
      bgClass: "bg-[#f2f6f8]",
    },
  ];

  return (
    <div className="w-full max-w-8xl mx-auto px-4 py-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        speed={800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className="rounded-3xl shadow-xl overflow-hidden bg-white border border-gray-100 hero-slider-custom"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`w-full min-h-115 md:min-h-125 ${slide.bgClass} flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 relative overflow-hidden transition-colors duration-500`}>
              
              {/* Background Decorative Soft Elements */}
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/60 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#ff5b49]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Left Side: Image with Frame & Rating Badge */}
              <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0 relative z-10">
                <div className="relative group">
                  {/* Rating Badge */}
                  <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-bold text-[#1a1a1a] z-20 border border-gray-100 animate-bounce">
                    <FaStar className="text-amber-400 text-xs" />
                    <span>4.9 Rating</span>
                  </div>

                  {/* Image Box */}
                  <div className="p-3 bg-white rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500 border border-gray-100">
                    <Image 
                      src={slide.image}
                      width={30}
                      height={30}
                      alt={slide.title} 
                      className="w-60 md:w-72 h-72 md:h-80 object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side: Text & Actions using #1a1a1a and #ff5b49 */}
              <div className="w-full md:w-1/2 flex flex-col items-start text-left space-y-4 relative z-10 pl-0 md:pl-6">
                
                {/* Badge */}
                <span className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full bg-white shadow-sm border border-gray-100 text-[#ff5b49]">
                  {slide.badge}
                </span>

                {/* Title in #1a1a1a */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1a1a1a] leading-tight">
                  {slide.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-lg">
                  {slide.description}
                </p>

                {/* Pricing Area */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-3xl font-extrabold text-[#1a1a1a]">
                    {slide.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through font-medium">
                    {slide.originalPrice}
                  </span>
                </div>

                {/* CTA Button in #ff5b49 */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <button className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#ff5b49] hover:bg-[#e04a3b] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <span>Shop Now</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <FaShieldAlt className="text-[#ff5b49]" />
                    <span>Secure Checkout</span>
                  </div>
                </div>

              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSlider;