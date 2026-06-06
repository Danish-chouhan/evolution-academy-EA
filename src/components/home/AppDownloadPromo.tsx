import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

export default function AppDownloadPromo() {
  return (
    <section className="py-16 bg-brand-purple-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 md:pr-12">
            <div className="bg-white text-brand-purple font-bold text-sm px-4 py-2 rounded-full inline-block mb-6 shadow-sm border border-purple-100">
              <EditableText contentKey="app-badge" defaultText="Naya: <span class='inline-flex items-center gap-1 align-middle'><img src='/images/logo.png' class='h-4 w-auto'/></span> App yahan hai!" allowHtml={true} />
            </div>
            <h2 className="text-[2.5rem] font-black text-gray-900 leading-[1.1] mb-8">
              <EditableText contentKey="app-title" defaultText="Kisi bhi samay, kisi bhi jagah padho <span class='inline-flex items-center gap-2 align-middle mx-2'><img src='/images/logo.png' class='h-12 w-auto object-contain'/></span> se" allowHtml={true} />
            </h2>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-gray-700 font-semibold text-lg">
                <CheckCircle2 size={24} className="text-brand-orange fill-brand-orange/20" />
                <EditableText contentKey="app-li1" defaultText="Har Din Live Classes" />
              </li>
              <li className="flex items-center gap-3 text-gray-700 font-semibold text-lg">
                <CheckCircle2 size={24} className="text-brand-orange fill-brand-orange/20" />
                <EditableText contentKey="app-li2" defaultText="Live Doubt Solving" />
              </li>
              <li className="flex items-center gap-3 text-gray-700 font-semibold text-lg">
                <CheckCircle2 size={24} className="text-brand-orange fill-brand-orange/20" />
                <EditableText contentKey="app-li3" defaultText="Faad Test Series" />
              </li>
            </ul>
            <div className="flex gap-4">
              <Link href="/coming-soon?feature=Google Play Store" className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition shadow-lg inline-flex">
                {/* SVG for Play Store (simplified) */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path d="M4 3.003L4 21c0 .28.21.433.433.433L19 12l-14.567-9.433c-.224 0-.433.152-.433.433z"/></svg>
                <div className="text-left">
                  <div className="text-[10px] text-gray-300">GET IT ON</div>
                  <div className="font-bold text-sm">Google Play</div>
                </div>
              </Link>
              <Link href="/coming-soon?feature=Apple App Store" className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition shadow-lg inline-flex">
                 {/* SVG for Apple (simplified) */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path d="M12 2C12 2 15 1 15 4C15 4 14.5 7 12 7C12 7 9 8 9 5C9 5 9.5 2 12 2ZM17.5 8C19 8 20.5 9.5 20.5 9.5C20.5 9.5 17 11.5 17 15C17 18.5 20 20.5 20 20.5C20 20.5 18 23 15 23C13 23 12.5 22 11.5 22C10.5 22 9.5 23 8 23C5.5 23 2.5 19 2.5 14.5C2.5 9.5 5.5 8.5 7.5 8.5C9 8.5 10.5 9.5 11 9.5C11.5 9.5 13 8 14.5 8C15.5 8 16.5 8 17.5 8Z"/></svg>
                <div className="text-left">
                  <div className="text-[10px] text-gray-300">Download on the</div>
                  <div className="font-bold text-sm">App Store</div>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center lg:justify-end relative h-[300px] md:h-[500px] w-full mt-8 md:mt-0">
            {/* Phone Mockup Image Placeholder */}
            <div className="absolute bottom-0 md:bottom-[-50px] w-[200px] md:w-[280px] h-[400px] md:h-[550px] bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-[4px] md:border-[6px] border-gray-900 overflow-hidden translate-y-1/4 md:translate-y-0">
               {/* Phone screen dummy content */}
               <div className="w-full h-full bg-brand-purple-light flex flex-col relative">
                  <div className="h-4 md:h-6 w-20 md:w-32 bg-gray-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-lg md:rounded-b-xl z-20"></div>
                  <EditableImage 
                    contentKey="app-phone-img"
                    defaultSrc="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80" 
                    alt="App UI" 
                    className="w-full h-full object-cover" 
                  />
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
