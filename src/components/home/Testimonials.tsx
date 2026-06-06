import { PlayCircle } from 'lucide-react';
import Link from 'next/link';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

export default function Testimonials() {
  const reviews = [
    { id: 1, name: 'Aman Kumar', exam: 'JEE Mains', text: 'Evolution Academy ne mujhe JEE clear karne ka swapna pura karne mein madad ki. Teachers amazing hain aur content top-notch hai.', img: 'https://ui-avatars.com/api/?name=Aman+Kumar&background=random' },
    { id: 2, name: 'Priya Sharma', exam: 'NEET', text: 'NEET preparation ke liye best platform. Test series actual exam ke liye bahut relevant hai. Mera success <span class="inline-flex items-center gap-1 align-middle"><img src="/images/logo.png" class="h-4 w-auto object-contain"/></span> ke kaaran hai.', img: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=random' },
    { id: 3, name: 'Rahul Singh', exam: 'NDA', text: 'Sasta aur best quality education. NDA prep ke liye se better platform hone nahi sakta.', img: 'https://ui-avatars.com/api/?name=Rahul+Singh&background=random' },
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
             <span className="text-gray-900 font-bold text-3xl">
               <EditableText contentKey="testim-title-1" defaultText="<span class='inline-flex items-center gap-2 align-middle'><img src='/images/logo.png' class='h-10 sm:h-12 w-auto object-contain'/></span>" allowHtml={true} />
             </span>
             <span className="text-red-500 font-bold text-3xl">❤</span>
             <span className="text-gray-900 font-bold text-3xl">
               <EditableText contentKey="testim-title-2" defaultText="Vidyarthio Ka Kehna" />
             </span>
          </div>
          <p className="text-gray-500 font-medium">
            <EditableText contentKey="testim-subtitle" defaultText="Hamre successful students ki baat suno" />
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Main Video Testimonial - Lightened */}
          <div className="lg:w-1/3">
            <Link href="/coming-soon?feature=Watch Full Story" className="bg-white rounded-3xl overflow-hidden h-full min-h-[300px] relative group cursor-pointer shadow-md border-2 border-gray-100 block">
              <EditableImage 
                contentKey="testim-video-img"
                defaultSrc="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80" 
                alt="Video Thumbnail" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                <PlayCircle size={64} className="text-brand-purple drop-shadow-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform bg-white/50 rounded-full backdrop-blur-sm pointer-events-auto" />
                <div className="text-gray-900 relative z-10 pointer-events-auto">
                  <div className="font-bold text-lg leading-tight mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                    <EditableText contentKey="testim-video-title" defaultText="2 Saal Mein Sirf 2 Hi Cheezain Ki!" />
                  </div>
                  <div className="text-xs text-brand-purple font-bold">
                    <EditableText contentKey="testim-video-subtitle" defaultText="Pura Story Dekho" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Text Testimonials Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative flex flex-col">
      <div className="text-[5rem] text-gray-100 leading-none absolute top-4 left-4 h-10 select-none">"</div>                <p className="text-gray-600 text-sm font-medium mb-8 mt-12 relative z-10 flex-grow">
                  <EditableText contentKey={`testim-text-${review.id}`} defaultText={review.text} allowHtml={true} />
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full border border-gray-200" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm leading-tight">
                      <EditableText contentKey={`testim-name-${review.id}`} defaultText={review.name} />
                    </div>
                    <div className="text-[10px] text-brand-purple font-bold uppercase tracking-wider">
                      <EditableText contentKey={`testim-exam-${review.id}`} defaultText={review.exam} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
        
      </div>
    </section>
  );
}
