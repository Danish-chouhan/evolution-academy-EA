"use client";

import Link from 'next/link';
import { PlayCircle } from 'lucide-react';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-brand-purple-light/50 to-white py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background shapes mimicking the image */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple-light rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange-light rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left pt-4 md:pt-8">
            <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-black text-gray-900 leading-[1.1] mb-6">
              <EditableText 
                contentKey="hero-title-1" 
                defaultText="Bharat ka <span class='text-brand-purple'>Vishwast &</span><br />" 
                allowHtml={true} 
              />
              <EditableText 
                contentKey="hero-title-2" 
                defaultText="<span class='text-brand-purple'>Sasta</span> Educational<br />" 
                allowHtml={true} 
              />
              <EditableText 
                contentKey="hero-title-3" 
                defaultText="Platform" 
                allowHtml={true} 
              />
            </h1>
            <p className="text-base sm:text-[1.1rem] text-gray-600 mb-8 sm:mb-10 max-w-xl font-medium leading-relaxed px-2 sm:px-0">
              <EditableText 
                contentKey="hero-subtitle" 
                defaultText="Apni shakti unlock karo Evolution Academy ke sath - Sabse sasta learning solution" 
              />
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
              <Link href="/coming-soon?feature=Explore Batches" className="bg-brand-purple text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#4a3bc0] transition-colors w-full sm:w-auto shadow-xl shadow-brand-purple/20 text-center">
                <EditableText contentKey="hero-btn1" defaultText="Batches Dekho" />
              </Link>
              <Link href="/coming-soon?feature=Watch Video Demo" className="flex items-center justify-center gap-2 text-gray-900 font-bold px-6 py-4 rounded-xl hover:bg-gray-50 transition-colors border-2 border-gray-100">
                <PlayCircle className="text-brand-orange" size={24} fill="currentColor" />
                <EditableText contentKey="hero-btn2" defaultText="Video Dekho" />
              </Link>
            </div>
          </div>

          {/* Right Image/Graphic Area - Achievement Seal */}
          <div className="flex-1 w-full relative h-[500px] md:h-[600px] flex justify-center items-center mt-8 md:mt-0">
            
            {/* Decorative glow background */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="absolute w-[450px] h-[450px] md:w-[550px] md:h-[550px] bg-brand-purple/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
              <div className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] bg-brand-orange/15 rounded-full filter blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
            </div>

            {/* Hero Image with professional animation */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="relative group">
                {/* Animated border ring */}
                <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-brand-purple via-brand-orange to-brand-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animation: 'spin 6s linear infinite' }}></div>
                
                {/* White background for image */}
                <div className="absolute -inset-2 md:-inset-4 bg-white rounded-full shadow-2xl"></div>
                
                {/* Main Image with floating animation */}
                <EditableImage 
                  contentKey="hero-image"
                  defaultSrc="/images/hero.png" 
                  alt="Hero Image" 
                  className="w-[320px] h-[320px] md:w-[500px] md:h-[500px] object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105" 
                  style={{
                    animation: 'float 4s ease-in-out infinite'
                  }}
                />
              </div>
            </div>

            {/* Small floating stat elements - positioned outside */}
            <div className="absolute top-[8%] md:top-[15%] right-[2%] md:right-[-5%] bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl z-20 flex items-center gap-2 md:gap-3 border-2 border-green-100 animate-bounce" style={{
              animationDuration: '2s'
            }}>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex justify-center items-center flex-shrink-0">
                 <div className="w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-bold text-gray-400">
                  <EditableText contentKey="hero-stat1-label" defaultText="Kaul Students" />
                </span>
                <span className="text-xs md:text-sm font-black text-gray-900">
                  <EditableText contentKey="hero-stat1-value" defaultText="1.5 Cr+" />
                </span>
              </div>
            </div>

            <div className="absolute bottom-[8%] md:bottom-[15%] left-[2%] md:left-[-5%] bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl z-20 flex items-center gap-2 md:gap-3 border-2 border-orange-100 animate-bounce" style={{
              animationDuration: '2s',
              animationDelay: '0.5s'
            }}>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-orange-light rounded-full flex justify-center items-center flex-shrink-0">
                 <div className="w-5 h-5 md:w-6 md:h-6 bg-brand-orange rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-bold text-gray-400">
                  <EditableText contentKey="hero-stat2-label" defaultText="Kaul Selections" />
                </span>
                <span className="text-xs md:text-sm font-black text-gray-900">
                  <EditableText contentKey="hero-stat2-value" defaultText="5 Lakh+" />
                </span>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
