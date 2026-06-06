import { UserPlus, Star, ShieldCheck, Check } from 'lucide-react';
import EditableText from '@/components/admin/EditableText';
import EditableImage from '@/components/admin/EditableImage';

export default function MentorshipContent() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gray-900 py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            <EditableText contentKey="mentorship-hero-title" defaultText="1-on-1 <span class='text-brand-orange'>Mentorship</span>" allowHtml={true} />
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium mb-10">
            <EditableText contentKey="mentorship-hero-subtitle" defaultText="Get personalized guidance from top rankers and expert faculty to crack your dream exam." />
          </p>
          <button className="bg-brand-orange hover:bg-orange-600 text-white font-black py-4 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
            <EditableText contentKey="mentorship-hero-button" defaultText="Book a Free Session" />
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900">
            <EditableText contentKey="mentorship-benefits-title" defaultText="Why Choose Our Mentorship?" />
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:border-brand-purple transition-colors">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="text-brand-purple" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">
              <EditableText contentKey="mentorship-benefit-1-title" defaultText="Top Ranker Mentors" />
            </h3>
            <p className="text-gray-500">
              <EditableText contentKey="mentorship-benefit-1-desc" defaultText="Learn directly from students who recently cracked the exam with top 100 ranks." />
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:border-brand-purple transition-colors">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-brand-orange" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">
              <EditableText contentKey="mentorship-benefit-2-title" defaultText="Personalized Strategy" />
            </h3>
            <p className="text-gray-500">
              <EditableText contentKey="mentorship-benefit-2-desc" defaultText="Get a custom study plan tailored to your weak points and daily schedule." />
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:border-brand-purple transition-colors">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserPlus className="text-green-500" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">
              <EditableText contentKey="mentorship-benefit-3-title" defaultText="24/7 Doubt Support" />
            </h3>
            <p className="text-gray-500">
              <EditableText contentKey="mentorship-benefit-3-desc" defaultText="Never get stuck. Direct WhatsApp access to your mentor anytime." />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
