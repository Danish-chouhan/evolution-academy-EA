'use client';

import Link from 'next/link';
import { ArrowLeft, Award } from 'lucide-react';

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/auth/profile" className="flex items-center gap-2 text-brand-purple hover:underline mb-6">
          <ArrowLeft size={20} />
          Wapas Profile
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-brand-dark mb-6">Learning Progress</h1>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-brand-dark mb-4">Overall Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-brand-purple h-4 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">0% Complete</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-600">Videos Watched</p>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-sm text-gray-600">Tests Completed</p>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-brand-purple">
                <p className="text-sm text-gray-600">Certificates</p>
                <p className="text-2xl font-bold text-brand-purple">0</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-brand-purple p-12 text-center">
              <Award size={48} className="mx-auto text-brand-purple mb-4 opacity-50" />
              <p className="text-lg text-gray-600 mb-2">Abhi progress nahi hai</p>
              <p className="text-sm text-gray-500">Courses likho aur progress track karo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
