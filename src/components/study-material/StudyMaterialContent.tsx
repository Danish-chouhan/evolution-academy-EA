"use client";

import { useState } from 'react';
import { Search, FileText, Download, Clock, BookOpen, CheckCircle, ChevronRight, Filter } from 'lucide-react';
import Link from 'next/link';
import EditableText from '@/components/admin/EditableText';
import EditableImage from '@/components/admin/EditableImage';

// Dummy Data
const CATEGORIES = ['JEE Main & Advanced', 'NEET UG', 'Class 12 Boards', 'Class 11', 'Class 10', 'CUET UG', 'NDA'];
const SUBJECTS = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];

const NCERT_SOLUTIONS = [
  { id: 1, title: 'NCERT Class 12 Physics Part 1', size: '12 MB', downloads: '1.2M+' },
  { id: 2, title: 'NCERT Class 12 Chemistry Part 1', size: '14 MB', downloads: '900K+' },
  { id: 3, title: 'NCERT Class 12 Mathematics Part 1', size: '18 MB', downloads: '1.5M+' },
  { id: 4, title: 'NCERT Class 12 Biology', size: '22 MB', downloads: '2.1M+' },
];

const PYQS = [
  { id: 1, year: '2023', exam: 'JEE Main (All Shifts)', format: 'PDF + Video Solutions' },
  { id: 2, year: '2022', exam: 'JEE Main (All Shifts)', format: 'PDF + Video Solutions' },
  { id: 3, year: '2021', exam: 'JEE Main', format: 'PDF' },
  { id: 4, year: '2020', exam: 'JEE Main', format: 'PDF' },
];

const MOCK_TESTS = [
  { id: 1, title: 'All India Mega Mock - Target JEE 2024', duration: '3 Hours', questions: 90 },
  { id: 2, title: 'Chapter-wise: Electrostatics', duration: '1 Hour', questions: 30 },
  { id: 3, title: 'Full Syllabus Revision Test 1', duration: '3 Hours', questions: 90 },
];

export default function StudyMaterialContent() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [activeSubject, setActiveSubject] = useState(SUBJECTS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Hero Header */}
      <div className="bg-brand-purple relative overflow-hidden pt-16 pb-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            <EditableText contentKey="study-material-hero-title" defaultText="Premium Study Material Archive" />
          </h1>
          <p className="text-purple-200 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10">
            <EditableText contentKey="study-material-hero-desc" defaultText="Access India's largest collection of NCERT solutions, previous year papers, high-yield notes, and mock tests." />
          </p>
          
          {/* Global Search */}
          <div className="max-w-3xl mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-orange transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="Search for 'Class 12 Physics Chapter 1 Notes'..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white rounded-2xl py-4 pl-14 pr-6 text-lg text-gray-900 shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-orange/30 transition-all placeholder:text-gray-400"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-orange text-white font-bold px-6 py-2 rounded-xl hover:bg-orange-600 transition-colors">
              <EditableText contentKey="study-material-search-btn" defaultText="Search" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Filters */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-[100px]">
              <div className="flex items-center gap-2 mb-6 text-gray-900 font-black text-lg">
                <Filter size={20} />
                <span><EditableText contentKey="study-material-sidebar-categories" defaultText="Categories" /></span>
              </div>
              
              <div className="space-y-1 mb-8">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-colors ${
                      activeCategory === cat 
                        ? 'bg-brand-purple/10 text-brand-purple' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-6 text-gray-900 font-black text-lg">
                <BookOpen size={20} />
                <span><EditableText contentKey="study-material-sidebar-subjects" defaultText="Subjects" /></span>
              </div>

              <div className="space-y-1">
                {SUBJECTS.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubject(sub)}
                    className={`w-full text-left px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                      activeSubject === sub 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-12">
            
            {/* Dynamic Header */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-gray-900">{activeCategory}</h2>
                <p className="text-brand-orange font-bold text-sm">{activeSubject} <EditableText contentKey="study-material-dynamic-materials" defaultText="Materials" /></p>
              </div>
              <div className="hidden sm:block text-sm font-medium text-gray-400 bg-gray-50 px-4 py-2 rounded-lg">
                <EditableText contentKey="study-material-dynamic-showing" defaultText="Showing 142 resources" />
              </div>
            </div>

            {/* NCERT Solutions Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <FileText className="text-brand-purple" />
                  <EditableText contentKey="study-material-ncert-title" defaultText="NCERT Solutions & Books" />
                </h3>
                <Link href="#" className="text-sm font-bold text-brand-purple hover:underline flex items-center gap-1">
                  <EditableText contentKey="study-material-ncert-view-all" defaultText="View All" /> <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {NCERT_SOLUTIONS.map((item) => (
                  <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-purple/30 transition-all flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-14 bg-red-50 rounded-lg flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-110 transition-transform">
                      <span className="text-red-500 font-black text-xs">PDF</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1 leading-tight group-hover:text-brand-purple transition-colors">{item.title}</h4>
                      <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                        <span>{item.size}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>{item.downloads} downloads</span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-brand-purple bg-gray-50 hover:bg-purple-50 p-2 rounded-lg transition-colors">
                      <Download size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Previous Year Papers Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Clock className="text-brand-orange" />
                  <EditableText contentKey="study-material-pyq-title" defaultText="Previous Year Papers (PYQs)" />
                </h3>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                      <th className="p-4 pl-6"><EditableText contentKey="study-material-pyq-th-year" defaultText="Year" /></th>
                      <th className="p-4"><EditableText contentKey="study-material-pyq-th-exam" defaultText="Exam Name" /></th>
                      <th className="p-4"><EditableText contentKey="study-material-pyq-th-format" defaultText="Format" /></th>
                      <th className="p-4 pr-6 text-right"><EditableText contentKey="study-material-pyq-th-action" defaultText="Action" /></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {PYQS.map((pyq) => (
                      <tr key={pyq.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                        <td className="p-4 pl-6 font-black text-gray-900">{pyq.year}</td>
                        <td className="p-4 font-bold text-gray-700">{pyq.exam}</td>
                        <td className="p-4">
                          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                            {pyq.format}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <button className="text-brand-purple font-bold text-sm hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                            <EditableText contentKey="study-material-pyq-action-download" defaultText="Download" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Mock Tests Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <CheckCircle className="text-green-500" />
                  <EditableText contentKey="study-material-mock-title" defaultText="Mock Tests & Sample Papers" />
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {MOCK_TESTS.map((test) => (
                  <div key={test.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <BookOpen size={20} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{test.title}</h4>
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-6">
                      <span className="flex items-center gap-1"><Clock size={14} /> {test.duration}</span>
                      <span className="flex items-center gap-1"><FileText size={14} /> {test.questions} Qs</span>
                    </div>
                    <button className="mt-auto w-full py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-brand-purple transition-colors">
                      <EditableText contentKey="study-material-mock-attempt" defaultText="Attempt Now" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
