import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

export default function ComingSoon({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const featureName = typeof searchParams.feature === 'string' ? searchParams.feature : 'This feature';

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] font-serif items-center justify-center p-4">
      
      <div className="max-w-xl w-full bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#e6e2d3] p-10 text-center relative overflow-hidden">
        
        {/* Decorative corner borders */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-[#d4c3a3]"></div>
        <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-[#d4c3a3]"></div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-[#d4c3a3]"></div>
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-[#d4c3a3]"></div>

        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Clock size={40} className="text-[#a38d62]" />
        </div>

        <h1 className="text-3xl font-normal text-[#2c241b] mb-4">
          <span className="font-bold text-[#8a7a5c]">"{featureName}"</span><br />
          is arriving soon.
        </h1>
        
        <p className="text-[#6b6254] mb-10 leading-relaxed font-light">
          We are currently crafting this section of the Classical Archive. 
          Please return later to explore the foundational texts and materials associated with this feature.
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#fdfbf7] border border-[#d4c3a3] text-[#5c4f3c] hover:bg-[#d4c3a3]/20 hover:text-[#2c241b] transition-all rounded-sm uppercase tracking-widest text-xs font-bold"
        >
          <ArrowLeft size={16} /> Return to Archive
        </Link>
      </div>

    </div>
  );
}
