import { MapPin, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';
import EditableText from '../admin/EditableText';

export default function StudyPrograms() {
  const programs = [
    { 
      id: 1, 
      title: 'Vidyapeeth', 
      type: 'Offline Centers',
      desc: 'Hamre physical centers mein join karo immersive offline learning experience ke liye top faculties ke saath.',
      icon: MapPin,
      color: 'bg-brand-purple',
      link: '/coming-soon?feature=Explore Vidyapeeth'
    },
    { 
      id: 2, 
      title: 'Pathshala', 
      type: 'Hybrid Centers',
      desc: 'Dono ki best. Physical classes attend karo with online streaming se master teachers.',
      icon: Users,
      color: 'bg-brand-orange',
      link: '/coming-soon?feature=Explore Pathshala'
    },
    { 
      id: 3, 
      title: 'Online Batches', 
      type: 'Live & Recorded',
      desc: 'Apne ghar se padho <span class="inline-flex items-center gap-1 align-middle"><img src="/images/logo.png" class="h-5 w-auto object-contain"/></span> App aur website ke through highly interactive experience.',
      icon: BookOpen,
      color: 'bg-blue-600',
      link: '/coming-soon?feature=Explore Online Batches'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] font-bold text-gray-900 mb-4 tracking-tight">
            <EditableText contentKey="programs-title" defaultText="Hamre Study Programs" />
          </h2>
          <p className="text-gray-500 font-medium text-lg">
            <EditableText contentKey="programs-subtitle" defaultText="Choose karo ki aap kaun tarah padna chahte ho" />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <div key={program.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-shadow flex flex-col h-full group cursor-pointer relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${program.color} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`}></div>
                
                <div className={`w-14 h-14 rounded-2xl ${program.color} text-white flex items-center justify-center mb-6 shadow-md`}>
                  <Icon size={28} />
                </div>
                
                <div className="mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <EditableText contentKey={`prog-type-${program.id}`} defaultText={program.type} />
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  <EditableText contentKey={`prog-title-${program.id}`} defaultText={program.title} />
                </h3>
                
                <p className="text-gray-600 font-medium text-sm leading-relaxed mb-8 flex-grow">
                  <EditableText contentKey={`prog-desc-${program.id}`} defaultText={program.desc} allowHtml={true} />
                </p>
                
                <Link href={program.link} className={`mt-auto w-full py-3 rounded-xl font-bold text-center border-2 transition-colors ${
                  program.color === 'bg-brand-purple' 
                    ? 'border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white' 
                    : program.color === 'bg-brand-orange'
                      ? 'border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white'
                      : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                }`}>
                  <EditableText contentKey={`prog-btn-${program.id}`} defaultText="Explore" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
