"use client";

import { useState, useRef, MouseEvent } from 'react';
import { Layers, Video, Microscope, Cpu, MessageSquare } from 'lucide-react';
import EditableText from '../admin/EditableText';

interface TiltCardProps {
  children: React.ReactNode;
  delay: string;
}

function TiltCard({ children, delay }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; // Max rotation 15deg
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-1000 w-full h-full" style={{ animationDelay: delay }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`w-full h-full relative preserve-3d transition-transform duration-200 ease-out animate-float rounded-2xl ${isHovered ? 'animate-glow' : 'shadow-xl'} bg-white border border-gray-200 p-8`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, 1)`,
        }}
      >
        <div className="translate-z-10 h-full flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ImmersiveStudy() {
  const features = [
    { id: 1, title: 'Time-Synced Live Classes', desc: 'Real-time mein latency-free broadcasting ke saath interact karo.', icon: Video, color: 'text-brand-orange', bg: 'bg-orange-100' },
    { id: 2, title: 'Interactive 3D Models', desc: 'Complex scientific concepts ko rotate aur dissect karo.', icon: Layers, color: 'text-brand-purple', bg: 'bg-purple-100' },
    { id: 3, title: 'Immersive Virtual Labs', desc: 'Physics & chemistry experiments ko 4D mein safely conduct karo.', icon: Microscope, color: 'text-green-600', bg: 'bg-green-100' },
    { id: 4, title: 'Dynamic AI Analytics', desc: 'Adaptive testing jo tumhara rank dynamically predict kare.', icon: Cpu, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 5, title: 'Holographic Doubt Engine', desc: 'Tumhare questions ka AR-powered solutions instantly.', icon: MessageSquare, color: 'text-pink-600', bg: 'bg-pink-100' },
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative border-t border-gray-100">
      {/* Background 4D ambient lights (Light Theme) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/10 rounded-full mix-blend-multiply filter blur-[100px] animate-float" style={{ animationDuration: '10s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-orange/10 rounded-full mix-blend-multiply filter blur-[120px] animate-float" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <EditableText contentKey="immersive-title" defaultText={'<span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple">4D Learning</span> ka Experience'} as="h2" className="text-[3rem] font-black text-gray-900 mb-4 tracking-tight" allowHtml={true} />
          <EditableText contentKey="immersive-desc" defaultText="Apne study material ke saath kabhi se pehle interact karo. Depth feel karo, real-time mein interact karo, aur education ke nayi dimension mein immerse ho jao." as="p" className="text-gray-600 font-medium text-lg max-w-2xl mx-auto" />
        </div>

        {/* 5 Card Layout: 3 on top, 2 on bottom centered */}
        <div className="flex flex-col gap-8">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-auto md:h-[300px]">
            {features.slice(0, 3).map((feat, i) => {
              const Icon = feat.icon;
              return (
                <TiltCard key={feat.id} delay={`${i * 0.2}s`}>
                  <div className={`w-16 h-16 rounded-xl ${feat.bg} flex items-center justify-center mb-6 shadow-sm`}>
                    <Icon size={32} className={feat.color} />
                  </div>
                  <div>
                    <EditableText contentKey={`immersive-feat-title-${feat.id}`} defaultText={feat.title} as="h3" className="text-xl font-extrabold text-gray-900 mb-2" />
                    <EditableText contentKey={`immersive-feat-desc-${feat.id}`} defaultText={feat.desc} as="p" className="text-sm font-semibold text-gray-500" />
                  </div>
                </TiltCard>
              );
            })}
          </div>
          
          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:w-2/3 mx-auto h-auto md:h-[300px]">
             {features.slice(3, 5).map((feat, i) => {
              const Icon = feat.icon;
              return (
                <TiltCard key={feat.id} delay={`${(i + 3) * 0.2}s`}>
                  <div className={`w-16 h-16 rounded-xl ${feat.bg} flex items-center justify-center mb-6 shadow-sm`}>
                    <Icon size={32} className={feat.color} />
                  </div>
                  <div>
                    <EditableText contentKey={`immersive-feat-title-${feat.id}`} defaultText={feat.title} as="h3" className="text-xl font-extrabold text-gray-900 mb-2" />
                    <EditableText contentKey={`immersive-feat-desc-${feat.id}`} defaultText={feat.desc} as="p" className="text-sm font-semibold text-gray-500" />
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
