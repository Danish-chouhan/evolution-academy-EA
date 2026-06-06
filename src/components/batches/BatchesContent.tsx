'use client';

import { useState } from 'react';
import { Search, PlayCircle, Users, BookOpen, Clock, Tag, ArrowRight, Zap, Video, HelpCircle, FileCheck, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import EditableText from '@/components/admin/EditableText';
import EditableImage from '@/components/admin/EditableImage';

const EXAMS = ['JEE', 'NEET', 'UPSC', 'NDA', 'Foundation'];
const CLASSES = ['All', 'Class 11', 'Class 12', 'Dropper', 'Class 10'];

const BATCHES = [
  {
    id: 1,
    name: 'Arjuna JEE 2025',
    target: 'JEE Main & Advanced 2025',
    class: 'Class 11',
    exam: 'JEE',
    status: 'LIVE',
    language: 'Hinglish',
    oldPrice: 6000,
    newPrice: 4500,
    discount: '25% OFF',
    features: ['Daily Live Classes', 'DPPs with Video Solutions', 'All India Test Series'],
    instructors: [
      'https://ui-avatars.com/api/?name=Rajwant+Singh&background=random',
      'https://ui-avatars.com/api/?name=Sachin+Sharma&background=random',
      'https://ui-avatars.com/api/?name=Tarun+Kumar&background=random'
    ]
  },
  {
    id: 2,
    name: 'Lakshya NEET 2024',
    target: 'NEET UG 2024',
    class: 'Class 12',
    exam: 'NEET',
    status: 'LIVE',
    language: 'English',
    oldPrice: 5500,
    newPrice: 4000,
    discount: '27% OFF',
    features: ['3D Anatomy Labs', 'Interactive Doubt Engine', 'Previous Year Papers'],
    instructors: [
      'https://ui-avatars.com/api/?name=Pankaj+Sir&background=random',
      'https://ui-avatars.com/api/?name=Rakshita+Singh&background=random'
    ]
  },
  {
    id: 3,
    name: 'Yakeen JEE 2024',
    target: 'JEE Main 2024',
    class: 'Dropper',
    exam: 'JEE',
    status: 'RECORDED',
    language: 'Hinglish',
    oldPrice: 4000,
    newPrice: 2500,
    discount: '37% OFF',
    features: ['Fast-track Revision', 'Mock Test Analysis', 'Mentorship Sessions'],
    instructors: [
      'https://ui-avatars.com/api/?name=Alakh+Pandey&background=random',
      'https://ui-avatars.com/api/?name=Mohit+Dadhich&background=random',
      'https://ui-avatars.com/api/?name=Hitesh+Sharma&background=random'
    ]
  },
  {
    id: 4,
    name: 'Udaan Class 10',
    target: 'CBSE Board 2024',
    class: 'Class 10',
    exam: 'Foundation',
    status: 'LIVE',
    language: 'Hinglish',
    oldPrice: 3000,
    newPrice: 1999,
    discount: '33% OFF',
    features: ['NCERT Mastery', 'Subjective Test Checking', 'Career Guidance'],
    instructors: [
      'https://ui-avatars.com/api/?name=Sunil+Kumar&background=random',
      'https://ui-avatars.com/api/?name=Pooja+Sharma&background=random'
    ]
  }
];

export default function BatchesContent() {
  const [activeExam, setActiveExam] = useState('JEE');
  const [activeClass, setActiveClass] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBatches = BATCHES.filter(batch => {
    const matchesExam = activeExam === 'All' || batch.exam === activeExam;
    const matchesClass = activeClass === 'All' || batch.class === activeClass;
    const matchesSearch = batch.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesExam && matchesClass && matchesSearch;
  });

  return (
    <main className="flex-grow pt-[72px]">
      
      {/* Hero Section */}
      <div className="bg-gray-900 text-white relative overflow-hidden py-20">
        {/* Subtle Background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        {/* Glowing Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/20 rounded-full filter blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-purple/20 rounded-full filter blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            <EditableText contentKey="batches-hero-title" defaultText='Discover Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">Perfect Batch</span>' allowHtml={true} />
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10">
            <EditableText contentKey="batches-hero-desc" defaultText="Join India's most affordable live & recorded classes to crack JEE, NEET, and Board exams." />
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-orange transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="Search for 'Arjuna JEE' or 'Lakshya NEET'..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-gray-700 rounded-2xl py-4 pl-14 pr-6 text-lg text-white shadow-xl focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder:text-gray-500 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Exams Top Scrollable Tab */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
              <span className="text-gray-400 font-bold text-sm uppercase tracking-wider mr-2 shrink-0">
                <EditableText contentKey="batches-filter-exams-label" defaultText="Exams:" />
              </span>
              {['All', ...EXAMS].map(exam => (
                <button
                  key={exam}
                  onClick={() => setActiveExam(exam)}
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                    activeExam === exam 
                      ? 'bg-brand-purple text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {exam}
                </button>
              ))}
            </div>

            {/* Class Filter */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-bold text-sm uppercase tracking-wider mr-2">
                <EditableText contentKey="batches-filter-class-label" defaultText="Class:" />
              </span>
              <select 
                value={activeClass}
                onChange={(e) => setActiveClass(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm font-bold rounded-lg focus:ring-brand-purple focus:border-brand-purple block p-2.5 outline-none"
              >
                {CLASSES.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>
          
        </div>
      </div>

      {/* Batches Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900">
            {activeExam === 'All' ? 'All Batches' : `${activeExam} Batches`}
            {activeClass !== 'All' && <span className="text-gray-400 ml-2">({activeClass})</span>}
          </h2>
          <p className="text-gray-500 font-bold text-sm bg-gray-100 px-3 py-1 rounded-full">
            {filteredBatches.length} Results
          </p>
        </div>

        {filteredBatches.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              <EditableText contentKey="batches-no-results-title" defaultText="No batches found" />
            </h3>
            <p className="text-gray-500">
              <EditableText contentKey="batches-no-results-desc" defaultText="Try adjusting your filters or search query." />
            </p>
            <button 
              onClick={() => { setActiveExam('All'); setActiveClass('All'); setSearchQuery(''); }}
              className="mt-6 text-brand-purple font-bold hover:underline"
            >
              <EditableText contentKey="batches-clear-filters" defaultText="Clear all filters" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredBatches.map(batch => (
              <div key={batch.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
                
                {/* Top Header */}
                <div className={`p-6 relative overflow-hidden ${batch.exam === 'JEE' ? 'bg-blue-50' : batch.exam === 'NEET' ? 'bg-teal-50' : 'bg-brand-purple/5'}`}>
                  {/* Decorative shape */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                  
                  <div className="flex justify-between items-start relative z-10 mb-4">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded flex items-center gap-1 ${batch.status === 'LIVE' ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-700'}`}>
                      {batch.status === 'LIVE' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                      {batch.status}
                    </span>
                    <span className="bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                      {batch.language}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-1 leading-tight">{batch.name}</h3>
                  <p className="text-gray-600 text-sm font-bold flex items-center gap-1">
                    <Tag size={14} className="text-brand-orange" /> {batch.target}
                  </p>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-grow flex flex-col">
                  
                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {batch.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm font-medium text-gray-600">
                        <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Instructors */}
                  <div className="mb-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      <EditableText contentKey="batches-top-faculty-label" defaultText="Top Faculty" />
                    </p>
                    <div className="flex -space-x-3">
                      {batch.instructors.map((img, idx) => (
                        <EditableImage 
                          key={idx} 
                          contentKey={`batches-instructor-${batch.id}-${idx}`} 
                          defaultSrc={img} 
                          alt="Instructor" 
                          className="w-10 h-10 rounded-full border-2 border-white shadow-sm" 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mt-auto border-t border-gray-100 pt-6 flex items-end justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-400 line-through mb-0.5">₹{batch.oldPrice}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-black text-gray-900 leading-none">₹{batch.newPrice}</span>
                        <span className="text-[10px] font-black text-green-600 bg-green-100 px-2 py-0.5 rounded uppercase">{batch.discount}</span>
                      </div>
                    </div>
                    
                    <Link href={`/coming-soon?feature=Buy ${batch.name}`} className="bg-brand-purple hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors shadow-md shadow-brand-purple/20">
                      <EditableText contentKey="batches-explore-button" defaultText="Explore" /> <ArrowRight size={18} />
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Features Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              <EditableText contentKey="batches-features-title" defaultText="Why Choose Evolution Academy Batches?" />
            </h2>
            <p className="text-gray-500 font-medium">
              <EditableText contentKey="batches-features-desc" defaultText="Experience the revolution in online learning" />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Video, title: 'Interactive Live Classes', desc: 'Real-time learning with polls, leaderboards, and hand-raise features.', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: HelpCircle, title: '24/7 Doubt Engine', desc: 'Get your doubts solved instantly by our expert faculty and TA team.', color: 'text-brand-orange', bg: 'bg-orange-50' },
              { icon: FileCheck, title: 'Daily Practice Problems', desc: 'Topic-wise DPPs with detailed text and video solutions.', color: 'text-green-500', bg: 'bg-green-50' },
              { icon: Zap, title: 'All India Test Series', desc: 'Benchmark yourself against lakhs of students nationwide.', color: 'text-brand-purple', bg: 'bg-purple-50' },
            ].map((feat, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-16 h-16 ${feat.bg} ${feat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm`}>
                  <feat.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  <EditableText contentKey={`batches-feature-${idx}-title`} defaultText={feat.title} />
                </h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                  <EditableText contentKey={`batches-feature-${idx}-desc`} defaultText={feat.desc} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
