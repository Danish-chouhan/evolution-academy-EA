'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/auth/profile" className="flex items-center gap-2 text-brand-purple hover:underline mb-6">
          <ArrowLeft size={20} />
          Wapas Profile
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-brand-dark mb-6">Mere Courses</h1>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-brand-purple p-12 text-center">
            <BookOpen size={48} className="mx-auto text-brand-purple mb-4 opacity-50" />
            <p className="text-lg text-gray-600 mb-2">Abhi koi course nahi likha hai</p>
            <p className="text-sm text-gray-500 mb-6">Naiye courses dekho aur enroll karo</p>
            <Link href="/" className="inline-block bg-brand-purple hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition">
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
