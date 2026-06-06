'use client';

import { Target, Clock, BarChart } from 'lucide-react';
import EditableText from '@/components/admin/EditableText';
import EditableImage from '@/components/admin/EditableImage';

const TEST_SERIES = [
  { id: 1, title: 'AITS for JEE Advanced 2025', exam: 'JEE', questions: 120, duration: '6 Hours', tags: ['Live Rank', 'Tough'] },
  { id: 2, title: 'NEET Full Syllabus Mock 1', exam: 'NEET', questions: 200, duration: '3 Hours 20 Mins', tags: ['NCERT Based'] },
  { id: 3, title: 'UPSC Prelims Abhyas Test', exam: 'UPSC', questions: 100, duration: '2 Hours', tags: ['Current Affairs'] },
  { id: 4, title: 'CBSE Class 12 Physics Term 1', exam: 'Boards', questions: 50, duration: '1.5 Hours', tags: ['Chapter-wise'] }
];

export default function TestSeriesContent() {
  return (
    <>
      {/* Hero */}
      <div className="bg-brand-purple py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            <EditableText 
              contentKey="test-series-hero-title" 
              defaultText="All India <span class='text-brand-orange'>Test Series</span>" 
              allowHtml={true} 
            />
          </h1>
          <p className="text-purple-200 text-lg md:text-xl font-medium mb-8">
            <EditableText 
              contentKey="test-series-hero-subtitle" 
              defaultText="Benchmark your preparation with India's most authentic mock tests designed by expert faculty." 
            />
          </p>
        </div>
      </div>

      {/* Test Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {TEST_SERIES.map(test => (
            <div key={test.id} className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">{test.exam}</span>
                <div className="flex gap-2">
                  {test.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-500 font-bold px-2 py-1 rounded text-xs">{tag}</span>
                  ))}
                </div>
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-4">{test.title}</h3>
              
              <div className="flex items-center gap-6 mb-8 text-sm font-bold text-gray-500">
                <span className="flex items-center gap-1">
                  <Target size={16} className="text-brand-orange" /> {test.questions} <EditableText contentKey="test-series-questions-label" defaultText="Questions" />
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} className="text-brand-purple" /> {test.duration}
                </span>
              </div>
              
              <div className="flex gap-4">
                <button className="flex-1 bg-gray-900 hover:bg-brand-purple text-white font-bold py-3 rounded-xl transition-colors">
                  <EditableText contentKey="test-series-attempt-btn" defaultText="Attempt Now" />
                </button>
                <button className="w-12 h-12 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors">
                  <BarChart size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
