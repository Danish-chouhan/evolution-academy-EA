'use client';

import { Book, Video, Download, PlayCircle } from 'lucide-react';
import EditableText from '@/components/admin/EditableText';
import EditableImage from '@/components/admin/EditableImage';

export default function FreeLibraryContent() {
  return (
    <>
      <div className="bg-gradient-to-r from-green-500 to-teal-500 py-20 text-center relative">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            <EditableText contentKey="free-library-hero-title" defaultText="Free Learning <span class=&quot;text-yellow-300&quot;>Library</span>" allowHtml={true} />
          </h1>
          <p className="text-green-50 text-lg md:text-xl font-medium">
            <EditableText contentKey="free-library-hero-subtitle" defaultText="Access thousands of free mini-courses, quizzes, and revision notes." />
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-black text-gray-900 mb-8">
          <EditableText contentKey="free-library-popular-title" defaultText="Popular Free Resources" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: '1', defaultTitle: 'Organic Chemistry Crash Course', defaultType: 'Video Series', icon: Video, color: 'text-red-500', bg: 'bg-red-50' },
            { id: '2', defaultTitle: 'NEET Biology Mind Maps', defaultType: 'PDF Download', icon: Download, color: 'text-blue-500', bg: 'bg-blue-50' },
            { id: '3', defaultTitle: 'Calculus Formula Sheet', defaultType: 'Revision Material', icon: Book, color: 'text-brand-purple', bg: 'bg-purple-50' },
            { id: '4', defaultTitle: 'Daily Current Affairs', defaultType: 'Daily Read', icon: Book, color: 'text-brand-orange', bg: 'bg-orange-50' },
            { id: '5', defaultTitle: 'Physics Numericals Practice', defaultType: 'Interactive Quiz', icon: PlayCircle, color: 'text-green-500', bg: 'bg-green-50' },
            { id: '6', defaultTitle: 'UPSC Strategy Seminar', defaultType: 'Recorded Live', icon: Video, color: 'text-teal-500', bg: 'bg-teal-50' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-purple transition-colors">
                <EditableText contentKey={`free-library-card-title-${item.id}`} defaultText={item.defaultTitle} />
              </h3>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                <EditableText contentKey={`free-library-card-type-${item.id}`} defaultText={item.defaultType} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
