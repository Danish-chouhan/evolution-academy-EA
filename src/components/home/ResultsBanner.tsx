import { Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import EditableText from '../admin/EditableText';

export default function ResultsBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 relative">
          
          {/* Decorative background sunburst (Light Version) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-50 via-transparent to-transparent opacity-80 mix-blend-multiply"></div>

          <div className="p-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="flex-1 max-w-md">
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-6 shadow-sm border border-yellow-200">
                <Trophy size={18} className="fill-current text-yellow-500" />
                <span className="font-extrabold text-sm tracking-widest uppercase">
                  <EditableText contentKey="results-badge" defaultText="Result 2024" />
                </span>
              </div>
              <h2 className="text-[2.5rem] font-black leading-tight mb-4 text-gray-900 drop-shadow-sm">
                <EditableText contentKey="results-title" defaultText="Selections jo<br />apne aap bolo" allowHtml={true} />
              </h2>
              <Link href="/coming-soon?feature=View All Results" className="inline-flex items-center gap-2 bg-brand-purple text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-purple/90 transition-colors shadow-md">
                <EditableText contentKey="results-btn" defaultText="Sab Results Dekho" /> <ArrowRight size={18} />
              </Link>
            </div>
            
            {/* Right Visuals - Trophy Grid */}
            <div className="flex-[1.5] w-full bg-gray-50/80 p-6 rounded-2xl border border-gray-100 backdrop-blur-md">
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {Array.from({length: 12}).map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-white rounded-lg shadow-sm overflow-hidden border border-yellow-200 relative group">
                    <div className="absolute top-0 inset-x-0 h-4 bg-yellow-400 flex items-center justify-center shadow-sm z-10">
                       <span className="text-[8px] font-black text-yellow-900">AIR {i+1}</span>
                    </div>
                    {/* Dummy photo for student */}
                    <img src={`https://ui-avatars.com/api/?name=St+${i}&background=random&color=fff&size=128`} className="w-full h-full object-cover pt-4 group-hover:scale-105 transition-transform" alt="Student" />
                    <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-white/90 to-transparent flex items-end justify-center pb-1">
                       <span className="text-[8px] text-gray-900 font-bold truncate px-1">Name</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
