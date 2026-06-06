"use client";

import { useState } from 'react';
import { Trophy, Star, Medal, Play, Award, MapPin, TrendingUp, Users, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import EditableText from '@/components/admin/EditableText';
import EditableImage from '@/components/admin/EditableImage';

const EXAMS = ['JEE Advanced', 'NEET UG', 'UPSC CSE', 'CBSE Class 12'];
const YEARS = ['2024', '2023', '2022'];

const RANKERS = [
  { id: 1, name: 'Rahul Sharma', air: 'AIR 1', score: '345/360', exam: 'JEE Advanced', year: '2024', batch: 'Lakshya JEE', image: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=random&size=200' },
  { id: 2, name: 'Priya Patel', air: 'AIR 3', score: '715/720', exam: 'NEET UG', year: '2024', batch: 'Yakeen NEET', image: 'https://ui-avatars.com/api/?name=Priya+Patel&background=random&size=200' },
  { id: 3, name: 'Amit Kumar', air: 'AIR 5', score: '338/360', exam: 'JEE Advanced', year: '2024', batch: 'Arjuna JEE', image: 'https://ui-avatars.com/api/?name=Amit+Kumar&background=random&size=200' },
  { id: 4, name: 'Sneha Reddy', air: 'AIR 7', score: '710/720', exam: 'NEET UG', year: '2024', batch: 'Lakshya NEET', image: 'https://ui-avatars.com/api/?name=Sneha+Reddy&background=random&size=200' },
  { id: 5, name: 'Vikram Singh', air: 'AIR 12', score: '1024/2025', exam: 'UPSC CSE', year: '2023', batch: 'Only IAS', image: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=random&size=200' },
  { id: 6, name: 'Anjali Verma', air: 'AIR 2', score: '99.8%', exam: 'CBSE Class 12', year: '2024', batch: 'Udaan', image: 'https://ui-avatars.com/api/?name=Anjali+Verma&background=random&size=200' },
  { id: 7, name: 'Rohan Gupta', air: 'AIR 14', score: '320/360', exam: 'JEE Advanced', year: '2024', batch: 'Prayas JEE', image: 'https://ui-avatars.com/api/?name=Rohan+Gupta&background=random&size=200' },
  { id: 8, name: 'Kavya Iyer', air: 'AIR 11', score: '705/720', exam: 'NEET UG', year: '2024', batch: 'Yakeen NEET', image: 'https://ui-avatars.com/api/?name=Kavya+Iyer&background=random&size=200' },
  { id: 9, name: 'Siddharth Bose', air: 'AIR 1', score: '350/360', exam: 'JEE Advanced', year: '2023', batch: 'Lakshya JEE', image: 'https://ui-avatars.com/api/?name=Siddharth+Bose&background=random&size=200' },
  { id: 10, name: 'Megha Nair', air: 'AIR 2', score: '716/720', exam: 'NEET UG', year: '2023', batch: 'Yakeen NEET', image: 'https://ui-avatars.com/api/?name=Megha+Nair&background=random&size=200' },
  { id: 11, name: 'Ayaan Khan', air: 'AIR 8', score: '1030/2025', exam: 'UPSC CSE', year: '2022', batch: 'Only IAS', image: 'https://ui-avatars.com/api/?name=Ayaan+Khan&background=random&size=200' },
  { id: 12, name: 'Neha Sharma', air: 'AIR 24', score: '310/360', exam: 'JEE Advanced', year: '2024', batch: 'Arjuna JEE', image: 'https://ui-avatars.com/api/?name=Neha+Sharma&background=random&size=200' },
  { id: 13, name: 'Arjun Das', air: 'AIR 19', score: '700/720', exam: 'NEET UG', year: '2024', batch: 'Lakshya NEET', image: 'https://ui-avatars.com/api/?name=Arjun+Das&background=random&size=200' },
  { id: 14, name: 'Simran Kaur', air: 'AIR 5', score: '99.5%', exam: 'CBSE Class 12', year: '2023', batch: 'Udaan', image: 'https://ui-avatars.com/api/?name=Simran+Kaur&background=random&size=200' },
  { id: 15, name: 'Karan Patel', air: 'AIR 31', score: '305/360', exam: 'JEE Advanced', year: '2023', batch: 'Lakshya JEE', image: 'https://ui-avatars.com/api/?name=Karan+Patel&background=random&size=200' },
  { id: 16, name: 'Divya Desai', air: 'AIR 15', score: '702/720', exam: 'NEET UG', year: '2023', batch: 'Yakeen NEET', image: 'https://ui-avatars.com/api/?name=Divya+Desai&background=random&size=200' },
  { id: 17, name: 'Manoj Tiwari', air: 'AIR 4', score: '340/360', exam: 'JEE Advanced', year: '2022', batch: 'Prayas JEE', image: 'https://ui-avatars.com/api/?name=Manoj+Tiwari&background=random&size=200' },
  { id: 18, name: 'Pooja Joshi', air: 'AIR 9', score: '708/720', exam: 'NEET UG', year: '2022', batch: 'Lakshya NEET', image: 'https://ui-avatars.com/api/?name=Pooja+Joshi&background=random&size=200' },
  { id: 19, name: 'Aditya Raj', air: 'AIR 22', score: '1010/2025', exam: 'UPSC CSE', year: '2024', batch: 'Only IAS', image: 'https://ui-avatars.com/api/?name=Aditya+Raj&background=random&size=200' },
  { id: 20, name: 'Tanya Agarwal', air: 'AIR 8', score: '99.4%', exam: 'CBSE Class 12', year: '2024', batch: 'Udaan', image: 'https://ui-avatars.com/api/?name=Tanya+Agarwal&background=random&size=200' },
];

const STATE_TOPPERS = [
  { state: 'Rajasthan', name: 'Kartik Meena', exam: 'JEE Advanced', score: '330/360' },
  { state: 'Maharashtra', name: 'Riya Kadam', exam: 'NEET UG', score: '710/720' },
  { state: 'Uttar Pradesh', name: 'Shubham Singh', exam: 'UPSC CSE', score: '1040/2025' },
  { state: 'Karnataka', name: 'Akash Gowda', exam: 'JEE Advanced', score: '325/360' },
];

export default function ResultsContent() {
  const [activeExam, setActiveExam] = useState(EXAMS[0]);
  const [activeYear, setActiveYear] = useState(YEARS[0]);

  const filteredRankers = RANKERS.filter(ranker => ranker.exam === activeExam && ranker.year === activeYear);

  return (
    <>
      {/* Celebratory Hero Section */}
      <div className="bg-gray-900 relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-4 py-2 rounded-full font-bold text-sm mb-6 animate-pulse">
            <Trophy size={18} /> <EditableText contentKey="results-hero-badge" defaultText="Historic Results 2024" />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
            <EditableText contentKey="results-hero-title" defaultText="A Legacy of <br/><span class='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-brand-orange to-red-500'>Champions</span>" allowHtml={true} />
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl font-medium max-w-3xl mx-auto mb-12">
            <EditableText contentKey="results-hero-subtitle" defaultText="Over <strong class='text-white'>50,000+</strong> Evolution Academy students have secured their dream colleges across India over the last 3 years." allowHtml={true} />
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { labelKey: 'results-stat-1-label', labelDefault: 'Total Selections (2024)', valueKey: 'results-stat-1-val', valueDefault: '15,000+' },
              { labelKey: 'results-stat-2-label', labelDefault: 'Top 100 AIRs', valueKey: 'results-stat-2-val', valueDefault: '142' },
              { labelKey: 'results-stat-3-label', labelDefault: '99+ Percentilers', valueKey: 'results-stat-3-val', valueDefault: '5,000+' },
              { labelKey: 'results-stat-4-label', labelDefault: 'State Toppers', valueKey: 'results-stat-4-val', valueDefault: '28' }
            ].map((stat, idx) => (
             <div key={idx} className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform hover:-translate-y-1 transition-transform">
               <h3 className="text-3xl md:text-5xl font-black text-white mb-2"><EditableText contentKey={stat.valueKey} defaultText={stat.valueDefault} /></h3>
               <p className="text-yellow-500 text-sm font-bold uppercase tracking-widest"><EditableText contentKey={stat.labelKey} defaultText={stat.labelDefault} /></p>
             </div> 
            ))}
          </div>
        </div>
      </div>

      {/* Selection Analytics Infographic Banner */}
      <div className="bg-gradient-to-r from-brand-purple to-purple-900 py-12 border-b-8 border-brand-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-around gap-8 text-white">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/10 rounded-full"><TrendingUp size={32} className="text-yellow-400" /></div>
              <div>
                <h4 className="text-2xl font-black"><EditableText contentKey="results-info-1-val" defaultText="1 in every 5" /></h4>
                <p className="text-purple-200 font-medium"><EditableText contentKey="results-info-1-desc" defaultText="Doctors in India studied at <span class='inline-flex items-center gap-1 align-middle'><img src='/images/logo.png' class='h-5 w-auto object-contain'/></span>" allowHtml={true} /></p>
              </div>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/20"></div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/10 rounded-full"><Users size={32} className="text-brand-orange" /></div>
              <div>
                <h4 className="text-2xl font-black"><EditableText contentKey="results-info-2-val" defaultText="2.5 Lakh+" /></h4>
                <p className="text-purple-200 font-medium"><EditableText contentKey="results-info-2-desc" defaultText="Students mentored yearly" /></p>
              </div>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/20"></div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/10 rounded-full"><BookOpen size={32} className="text-green-400" /></div>
              <div>
                <h4 className="text-2xl font-black"><EditableText contentKey="results-info-3-val" defaultText="98%" /></h4>
                <p className="text-purple-200 font-medium"><EditableText contentKey="results-info-3-desc" defaultText="Success Rate in Boards" /></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Exam Tabs */}
          <div className="flex overflow-x-auto custom-scrollbar w-full md:w-auto gap-2">
            {EXAMS.map(exam => (
              <button
                key={exam}
                onClick={() => setActiveExam(exam)}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all duration-300 ${
                  activeExam === exam 
                    ? 'bg-brand-purple text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-brand-purple'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>

          {/* Year Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="font-bold text-gray-400 uppercase tracking-wider text-sm">Year:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {YEARS.map(year => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-4 py-2 rounded-md font-bold text-sm transition-all ${
                    activeYear === year 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* The Wall of Fame (Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Medal className="text-brand-orange" size={48} /> <EditableText contentKey="results-wall-title" defaultText="Wall of Fame" /> ({activeYear})
          </h2>
          <p className="text-gray-500 font-medium text-lg"><EditableText contentKey="results-wall-subtitle" defaultText="Meet the students who made Evolution Academy proud" /> in {activeExam}</p>
        </div>

        {filteredRankers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Award size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Results are being compiled</h3>
            <p className="text-gray-500">Check back soon for the latest {activeExam} toppers for {activeYear}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRankers.map(ranker => (
              <div key={ranker.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
                <div className="h-64 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10"></div>
                  <EditableImage contentKey={`results-ranker-img-${ranker.id}`} defaultSrc={ranker.image} alt={ranker.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  <div className="absolute bottom-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-xl shadow-lg border border-yellow-300/50 flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                    <Trophy size={16} />
                    <span className="font-black tracking-wider text-lg">{ranker.air}</span>
                  </div>
                </div>

                <div className="p-6 relative">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{ranker.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-purple-50 text-brand-purple text-xs font-bold px-3 py-1 rounded-full border border-purple-100">Score: {ranker.score}</span>
                    <span className="bg-orange-50 text-brand-orange text-xs font-bold px-3 py-1 rounded-full border border-orange-100">{ranker.batch}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-400 flex items-center gap-1 uppercase tracking-wider">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" /> {ranker.exam} {ranker.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* State Toppers Section */}
      <section className="bg-gray-100 py-24 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4"><EditableText contentKey="results-state-title" defaultText="Dominating Across the Nation" /></h2>
            <p className="text-gray-500 font-medium"><EditableText contentKey="results-state-subtitle" defaultText="Evolution Academy students securing State Rank 1." /></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATE_TOPPERS.map((topper, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center hover:border-brand-orange transition-colors">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-brand-orange" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-1">{topper.state} Topper</h3>
                <p className="text-brand-purple font-bold mb-2">{topper.name}</p>
                <p className="text-sm text-gray-500">{topper.exam} | Score: {topper.score}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Mentions / Press Coverage */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-12"><EditableText contentKey="results-press-title" defaultText="Making National Headlines" /></h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Dummy logos for newspapers */}
            <div className="text-2xl font-serif font-bold border-b-2 border-black pb-1"><EditableText contentKey="results-press-1" defaultText="The Times of India" /></div>
            <div className="text-2xl font-serif font-black italic"><EditableText contentKey="results-press-2" defaultText="The Hindu" /></div>
            <div className="text-2xl font-black tracking-tighter"><EditableText contentKey="results-press-3" defaultText="Hindustan Times" /></div>
            <div className="text-2xl font-serif font-bold uppercase tracking-widest text-red-600"><EditableText contentKey="results-press-4" defaultText="NDTV" /></div>
          </div>
          <p className="mt-12 text-gray-500 italic max-w-2xl mx-auto text-lg">
            "<EditableText contentKey="results-press-quote" defaultText="Evolution Academy has completely disrupted the EdTech space by producing unprecedented results from tier-2 and tier-3 cities." />"
          </p>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2"><EditableText contentKey="results-video-title" defaultText="Success Stories" /></h2>
              <p className="text-gray-400"><EditableText contentKey="results-video-subtitle" defaultText="Watch the inspiring journeys of our top rankers." /></p>
            </div>
            <button className="bg-brand-purple hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-brand-purple/20">
              <EditableText contentKey="results-video-btn" defaultText="View All Interviews" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-800 mb-4 border border-gray-700 shadow-xl">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
                  <EditableImage contentKey={`results-video-thumb-${item}`} defaultSrc={`https://picsum.photos/seed/${item * 20}/600/400`} alt="Video Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center z-20 shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={24} className="ml-1 fill-white" />
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg group-hover:text-brand-orange transition-colors"><EditableText contentKey={`results-video-title-${item}`} defaultText={`"From Village to IIT Bombay: My Journey"`} /></h3>
                <p className="text-gray-400 text-sm mt-2"><EditableText contentKey={`results-video-desc-${item}`} defaultText="Rahul Sharma • 120K Views • 2 months ago" /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join The League CTA */}
      <section className="relative py-24 overflow-hidden bg-brand-purple">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6"><EditableText contentKey="results-cta-title" defaultText="Want to see your face here next year?" /></h2>
          <p className="text-xl font-medium text-purple-200 mb-10 max-w-2xl mx-auto">
            <EditableText contentKey="results-cta-subtitle" defaultText="Join Evolution Academy today and get mentored by India's top faculty. The next success story could be yours." />
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/batches" className="bg-brand-orange hover:bg-orange-600 text-white font-black py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 shadow-xl shadow-brand-orange/30 text-lg">
              <EditableText contentKey="results-cta-btn1" defaultText="Explore Batches" /> <ArrowRight size={20} />
            </Link>
            <Link href="/study-material" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center transition-colors text-lg backdrop-blur-sm">
              <EditableText contentKey="results-cta-btn2" defaultText="View Free Study Material" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
