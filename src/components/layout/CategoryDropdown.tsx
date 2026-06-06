"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, BookOpen, GraduationCap, Globe, Building, Code, Laptop } from 'lucide-react';

export const CATEGORIES = [
  {
    id: 'competitive',
    title: 'Competitive Exams',
    subtitle: 'IIT JEE, NEET, ESE, GATE, AE/JE, Olympiad',
    items: [
      { icon: '⚛️', name: 'IIT JEE' },
      { icon: '🩺', name: 'NEET' },
      { icon: '🏗️', name: 'ESE / GATE' },
      { icon: '🏆', name: 'Olympiad' },
    ]
  },
  {
    id: 'ias',
    title: 'Only IAS',
    subtitle: 'UPSC, State PSC',
    items: [
      { icon: '🏛️', name: 'UPSC CSE' },
      { icon: '📜', name: 'State PSC' },
    ]
  },
  {
    id: 'school',
    title: 'School Preparation',
    subtitle: 'Foundation (Class 6-10), CuriousJr (1st - 8th)',
    items: [
      { icon: '🎒', name: 'Foundation (6-10)' },
      { icon: '🧩', name: 'CuriousJr (1-8)' },
    ]
  },
  {
    id: 'boards',
    title: 'School Boards',
    subtitle: 'CBSE Arts, CBSE Science, CBSE Commerce, ICSE, UP Board...',
    items: [
      { icon: '📚', name: 'CBSE Board' },
      { icon: '🏫', name: 'ICSE Board' },
      { icon: '🗺️', name: 'State Boards' },
    ]
  },
  {
    id: 'govt',
    title: 'Govt Exam',
    subtitle: 'Judiciary, SSC, Defence, Teaching, JAIIB & CAIIB...',
    items: [
      { icon: '⚖️', name: 'Judiciary' },
      { icon: '🛡️', name: 'Defence / SSC' },
      { icon: '👨‍🏫', name: 'Teaching' },
    ]
  },
  {
    id: 'ugpg',
    title: 'UG & PG Entrance Exams',
    subtitle: 'MBA, IPMAT, IIT JAM, LAW, CUET UG, UGC NET...',
    items: [
      { icon: '🎓', name: 'MBA Entrance' },
      { icon: '⚖️', name: 'LAW Entrance' },
      { icon: '🏛️', name: 'CUET UG / PG' },
    ]
  },
  {
    id: 'finance',
    title: 'FINANCE',
    subtitle: 'CA, CS, Finance Courses, ACCA, CFA',
    items: [
      { icon: '📈', name: 'CA Foundation' },
      { icon: '📊', name: 'CS / CFA' },
    ]
  },
  {
    id: 'earners',
    title: 'Earners (Upskilling)',
    subtitle: 'Mobile Courses',
    items: [
      { icon: '💻', name: 'Tech Skills' },
      { icon: '📱', name: 'Mobile Dev' },
    ]
  },
  {
    id: 'eatalk',
    title: <span className="inline-flex items-center gap-1"><img src="/images/logo.png" className="h-5 w-auto object-contain" /> Talk - Spoken English App</span>,
    subtitle: <span className="inline-flex items-center gap-1"><img src="/images/logo.png" className="h-4 w-auto object-contain" /> Talk - Spoken English</span>,
    items: [
      { icon: '🗣️', name: <span className="inline-flex items-center gap-1"><img src="/images/logo.png" className="h-4 w-auto object-contain" /> Talk - Spoken English</span> },
    ]
  },
  {
    id: 'online_degrees',
    title: 'Online Degrees',
    subtitle: 'Online Degrees',
    items: [
      { icon: '🎓', name: 'Online Degrees' },
    ]
  },
  {
    id: 'study_abroad',
    title: 'Study Abroad',
    subtitle: 'IELTS, TOEFL, Acadfly Study Abroad, Acadfly Career Abroad',
    items: [
      { icon: '🔤', name: 'IELTS' },
      { icon: '📝', name: 'TOEFL' },
      { icon: '✈️', name: 'Acadfly Study Abroad' },
      { icon: '💼', name: 'Acadfly Career Abroad' },
    ]
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    subtitle: 'Agriculture',
    items: [
      { icon: '🌱', name: 'Agriculture Courses' },
    ]
  },
  {
    id: 'eagulf',
    title: <span className="inline-flex items-center gap-1"><img src="/images/logo.png" className="h-5 w-auto object-contain" /> Gulf</span>,
    subtitle: 'Oman, UAE, Malaysia, Kuwait, Qatar, Saudi Arabia...',
    items: [
      { flag: '🇴🇲', name: 'Oman' },
      { flag: '🇦🇪', name: 'UAE' },
      { flag: '🇲🇾', name: 'Malaysia' },
      { flag: '🇰🇼', name: 'Kuwait' },
      { flag: '🇶🇦', name: 'Qatar' },
      { flag: '🇸🇦', name: 'Saudi Arabia' },
      { flag: '🇧🇭', name: 'Bahrain' },
      { flag: '🇺🇬', name: 'Uganda' },
      { flag: '🇳🇬', name: 'Nigeria' },
      { flag: '🇹🇿', name: 'Tanzania' },
      { flag: '🇸🇬', name: 'Singapore' },
    ]
  }
];

export default function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activeData = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="relative" ref={dropdownRef} onMouseLeave={() => setIsOpen(false)}>
      {/* Trigger Button */}
      <button 
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className={`hidden md:flex items-center gap-2 font-medium text-sm border-l border-gray-300 pl-8 h-10 transition-all duration-300 ${isOpen ? 'text-brand-purple' : 'text-gray-700 hover:text-brand-purple'}`}
      >
        <span className="font-serif text-[15px] tracking-wide">All Courses</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-purple' : 'text-gray-400'}`} />
      </button>

      {/* Mega Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-[calc(100%+0.5rem)] left-0 w-[1000px] bg-[#fdfbf7] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[#e8e4db] overflow-hidden flex z-50 min-h-[500px] animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Left Side: Categories List */}
          <div className="w-[340px] bg-[#fcfbf9] border-r border-[#e8e4db] overflow-y-auto max-h-[600px] custom-scrollbar py-3 shrink-0">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id}
                onMouseEnter={() => setActiveCategory(cat.id)}
                className={`w-full text-left px-6 py-4 cursor-pointer flex items-center justify-between transition-all duration-300 border-l-[3px] ${
                  activeCategory === cat.id 
                    ? 'bg-white border-brand-purple shadow-[2px_0_10px_rgba(0,0,0,0.02)] relative z-10' 
                    : 'border-transparent hover:bg-white/50'
                }`}
              >
                <div className="pr-4">
                  <h4 className={`text-[14px] font-serif tracking-wide ${activeCategory === cat.id ? 'text-brand-purple font-bold' : 'text-gray-800 font-semibold'}`}>
                    {cat.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-1 font-medium">{cat.subtitle}</p>
                </div>
                <ChevronRight size={16} className={`transition-transform duration-300 ${activeCategory === cat.id ? 'text-brand-purple translate-x-1' : 'text-gray-300'}`} />
              </div>
            ))}
          </div>

          {/* Right Side: Items Grid */}
          <div className="flex-1 bg-white p-10 overflow-y-auto max-h-[600px] custom-scrollbar relative">
            
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 rounded-full filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

            {activeData && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 relative z-10">
                  {activeData.items.map((item, idx) => (
                    <Link href={`/coming-soon?feature=${item.name}`} key={idx} className="bg-white border border-[#e8e4db] rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-brand-purple hover:-translate-y-0.5 transition-all duration-300 group">
                      {/* Icon or Flag */}
                      <div className="w-10 h-10 rounded-lg bg-[#fcfbf9] flex items-center justify-center text-xl shadow-inner border border-[#f0ece3] group-hover:bg-brand-purple/5 transition-colors shrink-0">
                        {'flag' in item ? item.flag : item.icon}
                      </div>
                      {/* Item Name */}
                      <span className="text-[14px] font-serif font-bold text-gray-800 group-hover:text-brand-purple transition-colors">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
