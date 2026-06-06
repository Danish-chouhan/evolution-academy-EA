import React from 'react';
import { Target, Heart, Shield, Users } from 'lucide-react';
import EditableText from '@/components/admin/EditableText';
import EditableImage from '@/components/admin/EditableImage';

export default function AboutContent() {
  return (
    <>
      {/* Story Section */}
      <section className="bg-white py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                <EditableText contentKey="about-title-main" defaultText="Democratizing Education for <span class='text-brand-purple'>Bharat</span>" allowHtml={true} />
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <EditableText contentKey="about-desc-1" defaultText="Evolution Academy started with a simple belief: high-quality education shouldn't be a luxury. We are on a mission to provide the best curriculum, taught by the best faculty, to every student in India at the most affordable prices." />
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                <EditableText contentKey="about-desc-2" defaultText="From a small YouTube channel to India's most loved educational platform, our journey is fueled by the success and love of our students." />
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden relative shadow-2xl">
                <EditableImage contentKey="about-hero-img" defaultSrc="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="object-cover w-full h-full" alt="Students learning" />
                <div className="absolute inset-0 bg-brand-purple/20 mix-blend-multiply"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-black text-brand-orange mb-1">
                  <EditableText contentKey="about-stats-number" defaultText="20M+" />
                </p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                  <EditableText contentKey="about-stats-label" defaultText="Happy Students" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              <EditableText contentKey="about-values-title" defaultText="Our Core Values" />
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
              <Heart className="text-red-500 mx-auto mb-6" size={40} />
              <h3 className="text-xl font-black text-gray-900 mb-3"><EditableText contentKey="about-value-title-1" defaultText="Student First" /></h3>
              <p className="text-gray-500"><EditableText contentKey="about-value-desc-1" defaultText="Every decision we make starts and ends with what is best for our students." /></p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
              <Target className="text-brand-orange mx-auto mb-6" size={40} />
              <h3 className="text-xl font-black text-gray-900 mb-3"><EditableText contentKey="about-value-title-2" defaultText="Excellence" /></h3>
              <p className="text-gray-500"><EditableText contentKey="about-value-desc-2" defaultText="We settle for nothing less than the absolute best quality in our content." /></p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
              <Shield className="text-brand-purple mx-auto mb-6" size={40} />
              <h3 className="text-xl font-black text-gray-900 mb-3"><EditableText contentKey="about-value-title-3" defaultText="Integrity" /></h3>
              <p className="text-gray-500"><EditableText contentKey="about-value-desc-3" defaultText="Honesty and transparency in our pricing and promises." /></p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
              <Users className="text-blue-500 mx-auto mb-6" size={40} />
              <h3 className="text-xl font-black text-gray-900 mb-3"><EditableText contentKey="about-value-title-4" defaultText="Inclusivity" /></h3>
              <p className="text-gray-500"><EditableText contentKey="about-value-desc-4" defaultText="Education that reaches every corner, regardless of financial background." /></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
