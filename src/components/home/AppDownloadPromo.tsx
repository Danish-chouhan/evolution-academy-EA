'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

export default function AppDownloadPromo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const slides = [
    { id: 0, key: 'app-img-1', src: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80' },
    { id: 1, key: 'app-img-2', src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80' },
    { id: 2, key: 'app-img-3', src: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80' },
  ];

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 40) nextSlide();
    if (touchStart - touchEnd < -40) prevSlide();
  };

  return (
    <section className="py-16 bg-brand-purple-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          <div className="w-full lg:flex-1 lg:pr-12">
            <div className="bg-white text-brand-purple font-bold text-sm px-4 py-2 rounded-full inline-block mb-6 shadow-sm border border-purple-100 max-w-full">
              <EditableText contentKey="app-badge" defaultText="Naya: <span class='inline-flex items-center gap-1 align-middle'><img src='/images/logo.png' class='h-4 w-auto'/></span> App yahan hai!" allowHtml={true} className="inline break-words" />
            </div>
            <h2 className="text-3xl md:text-[2.5rem] font-black text-gray-900 leading-[1.2] md:leading-[1.1] mb-6 md:mb-8 break-words">
              <EditableText contentKey="app-title" defaultText="Kisi bhi samay, kisi bhi jagah padho <span class='inline-flex items-center gap-2 align-middle mx-2'><img src='/images/logo.png' class='h-8 md:h-12 w-auto object-contain'/></span> se" allowHtml={true} className="inline break-words" />
            </h2>
            <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 w-full">
              <li className="flex items-start sm:items-center gap-2 sm:gap-3 text-gray-700 font-semibold text-sm sm:text-lg">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-brand-orange fill-brand-orange/20 shrink-0 mt-0.5 sm:mt-0" />
                <EditableText contentKey="app-li1" defaultText="Har Din Live Classes" className="block break-words" />
              </li>
              <li className="flex items-start sm:items-center gap-2 sm:gap-3 text-gray-700 font-semibold text-sm sm:text-lg">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-brand-orange fill-brand-orange/20 shrink-0 mt-0.5 sm:mt-0" />
                <EditableText contentKey="app-li2" defaultText="Live Doubt Solving" className="block break-words" />
              </li>
              <li className="flex items-start sm:items-center gap-2 sm:gap-3 text-gray-700 font-semibold text-sm sm:text-lg">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-brand-orange fill-brand-orange/20 shrink-0 mt-0.5 sm:mt-0" />
                <EditableText contentKey="app-li3" defaultText="Faad Test Series" className="block break-words" />
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/coming-soon?feature=Google Play Store" className="w-full sm:w-auto bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-800 transition shadow-lg">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-white shrink-0"><path d="M4 3.003L4 21c0 .28.21.433.433.433L19 12l-14.567-9.433c-.224 0-.433.152-.433.433z"/></svg>
                <div className="text-left">
                  <div className="text-[9px] sm:text-[10px] text-gray-300">GET IT ON</div>
                  <div className="font-bold text-xs sm:text-sm">Google Play</div>
                </div>
              </Link>
              <Link href="/coming-soon?feature=Apple App Store" className="w-full sm:w-auto bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-800 transition shadow-lg">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-white shrink-0"><path d="M12 2C12 2 15 1 15 4C15 4 14.5 7 12 7C12 7 9 8 9 5C9 5 9.5 2 12 2ZM17.5 8C19 8 20.5 9.5 20.5 9.5C20.5 9.5 17 11.5 17 15C17 18.5 20 20.5 20 20.5C20 20.5 18 23 15 23C13 23 12.5 22 11.5 22C10.5 22 9.5 23 8 23C5.5 23 2.5 19 2.5 14.5C2.5 9.5 5.5 8.5 7.5 8.5C9 8.5 10.5 9.5 11 9.5C11.5 9.5 13 8 14.5 8C15.5 8 16.5 8 17.5 8Z"/></svg>
                <div className="text-left">
                  <div className="text-[9px] sm:text-[10px] text-gray-300">Download on the</div>
                  <div className="font-bold text-xs sm:text-sm">App Store</div>
                </div>
              </Link>
            </div>
          </div>
          
          <div 
            className="w-full lg:flex-1 flex justify-center relative mt-8 sm:mt-12 lg:mt-0 h-[380px] sm:h-[450px] lg:h-[550px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((slide, index) => {
              let offset = index - activeIndex;
              if (offset < -1) offset += slides.length;
              if (offset > 1) offset -= slides.length;

              const isFront = offset === 0;
              const isRight = offset > 0;
              const isLeft = offset < 0;

              let translateX = '-50%';
              let scale = 1;
              let zIndex = 30;
              let opacity = 1;

              if (isRight) {
                translateX = 'calc(-50% + 35%)';
                scale = 0.85;
                zIndex = 20;
                opacity = 0.7;
              } else if (isLeft) {
                translateX = 'calc(-50% - 35%)';
                scale = 0.85;
                zIndex = 20;
                opacity = 0.7;
              }

              return (
                <div 
                  key={slide.id}
                  onClick={() => {
                    if (isRight) nextSlide();
                    if (isLeft) prevSlide();
                  }}
                  className={`absolute bottom-0 lg:bottom-[-20px] left-1/2 w-[190px] sm:w-[230px] lg:w-[280px] h-[380px] sm:h-[460px] lg:h-[550px] bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-[4px] md:border-[6px] border-gray-900 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer select-none`}
                  style={{ 
                    transform: `translateX(${translateX}) scale(${scale})`, 
                    zIndex, 
                    opacity 
                  }}
                >
                   <div className="w-full h-full bg-brand-purple-light flex flex-col relative pointer-events-none">
                      <div className="h-4 md:h-6 w-20 md:w-32 bg-gray-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-lg md:rounded-b-xl z-20"></div>
                      <EditableImage 
                        contentKey={slide.key}
                        defaultSrc={slide.src} 
                        alt={`App UI ${index + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                   </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
