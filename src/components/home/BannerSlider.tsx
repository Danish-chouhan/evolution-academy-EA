"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Arjuna JEE Fastrack',
      subtitle: 'Class 11th + 12th + JEE Target 2025',
      features: ['Live Classes', 'DPPs & Video Solutions', 'Test Series'],
      price: '₹2,500',
      originalPrice: '₹4,000',
      bgColor: 'bg-[#f0f4ff]',
      imgSrc: 'https://ui-avatars.com/api/?name=Physics&background=random',
    },
    {
      id: 2,
      title: 'Lakshya NEET 2025',
      subtitle: 'Complete 12th + NEET Preparation',
      features: ['Bharat ke Top Faculties', '3D Interactive Classes', 'Doubt Engine'],
      price: '₹3,000',
      originalPrice: '₹4,500',
      bgColor: 'bg-[#e8f5e9]',
      imgSrc: 'https://ui-avatars.com/api/?name=Biology&background=random',
    },
    {
      id: 3,
      title: 'Udaan Class 10th',
      subtitle: 'Board Exam Masterclass',
      features: ['Concept Clarity', 'Purane Year Questions', 'Mock Tests'],
      price: '₹1,500',
      originalPrice: '₹2,500',
      bgColor: 'bg-[#fff3e0]',
      imgSrc: 'https://ui-avatars.com/api/?name=Maths&background=random',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="w-full bg-white border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="overflow-hidden rounded-2xl relative shadow-sm border border-gray-100">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-[200px] md:h-[160px]"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className={`w-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between p-6 md:px-12 ${slide.bgColor}`}>
                
                <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                     <EditableText contentKey={`banner-slider-badge-${slide.id}`} defaultText="Bestseller" as="span" className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase" />
                     <EditableText contentKey={`banner-slider-title-${slide.id}`} defaultText={slide.title} as="h3" className="text-xl md:text-2xl font-black text-gray-900 tracking-tight" />
                  </div>
                  <EditableText contentKey={`banner-slider-subtitle-${slide.id}`} defaultText={slide.subtitle} as="p" className="text-sm font-semibold text-gray-600 mb-3" />
                  <ul className="hidden md:flex items-center gap-4 text-xs font-medium text-gray-500">
                    {slide.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span> <EditableText contentKey={`banner-slider-feature-${slide.id}-${i}`} defaultText={feature} />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <EditableText contentKey={`banner-slider-orig-price-${slide.id}`} defaultText={slide.originalPrice} as="div" className="text-xs text-gray-400 line-through font-bold" />
                    <EditableText contentKey={`banner-slider-price-${slide.id}`} defaultText={slide.price} as="div" className="text-2xl font-black text-gray-900" />
                  </div>
                  <Link href={`/coming-soon?feature=Join ${slide.title}`} className="bg-brand-orange text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md hover:bg-orange-600 transition-colors whitespace-nowrap block">
                    <EditableText contentKey={`banner-slider-btn-${slide.id}`} defaultText="Abhi Join Karo" />
                  </Link>
                  <div className="hidden lg:block w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <EditableImage contentKey={`banner-slider-img-${slide.id}`} defaultSrc={slide.imgSrc} alt="Subject" className="w-full h-full object-cover" />
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md text-gray-600 hover:text-brand-purple z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md text-gray-600 hover:text-brand-purple z-10"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {slides.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'bg-brand-purple w-4' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
