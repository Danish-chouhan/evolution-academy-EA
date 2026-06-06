"use client";

import { useState, useRef, MouseEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Stethoscope, Cog } from 'lucide-react';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

interface TiltProps {
  children: React.ReactNode;
}

function Hover3DCard({ children }: TiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Subtle rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-1000 w-full h-full group">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`w-full h-full relative preserve-3d transition-all duration-300 ease-out`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function CareerPaths() {
  return (
    <section className="py-24 bg-white overflow-hidden relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-[3rem] font-black text-gray-900 mb-4 tracking-tight leading-tight">
            <EditableText 
              contentKey="career-title" 
              defaultText="Apna <span class='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500'>Bhagya</span> Choose Karo" 
              allowHtml={true} 
            />
          </h2>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
            <EditableText 
              contentKey="career-subtitle" 
              defaultText="Chahe aapka sapna logs ki jaan bachana ho ya future banana ho, hamre specialized programs aapko wahan le jayenge." 
            />
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Medical / NEET Path */}
          <div className="flex-1">
            <Hover3DCard>
              <div className="bg-gradient-to-br from-teal-50 to-white rounded-[2rem] border border-teal-100 p-8 h-full flex flex-col relative overflow-hidden shadow-[0_8px_30px_rgb(20,184,166,0.12)]">
                
                {/* Background decorative glow */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-teal-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Stethoscope size={32} />
                  </div>
                  
                  <h3 className="text-3xl font-black text-gray-900 mb-2">
                    <EditableText contentKey="medical-title" defaultText="Medical (NEET)" />
                  </h3>
                  <p className="text-teal-700 font-bold mb-6">
                    <EditableText contentKey="medical-target" defaultText="Target: Bharat ke Top Medical Colleges" />
                  </p>
                  
                  <ul className="space-y-3 mb-8 text-gray-600 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-400"></span> 
                      <EditableText contentKey="medical-li1" defaultText="Anatomy & Physiology Mastery" />
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-400"></span> 
                      <EditableText contentKey="medical-li2" defaultText="3D Biology Virtual Labs" />
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-400"></span> 
                      <EditableText contentKey="medical-li3" defaultText="Elite Faculty Guidance" />
                    </li>
                  </ul>
                  
                  <Link href="/coming-soon?feature=Explore Medical Courses" className="mt-auto inline-flex items-center justify-center gap-2 bg-teal-600 text-white font-bold px-6 py-4 rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/30 w-full sm:w-auto self-start relative z-20">
                    <EditableText contentKey="medical-btn" defaultText="Medical Courses Dekho" /> <ArrowRight size={20} />
                  </Link>
                </div>
                
                {/* 3D Doctor Art */}
                <div className="absolute bottom-0 right-0 w-[200px] sm:w-[280px] h-[250px] sm:h-[350px] translate-z-20 translate-x-4 sm:translate-x-12 translate-y-8 sm:translate-y-12 drop-shadow-2xl pointer-events-none">
                  <EditableImage 
                    contentKey="medical-img"
                    defaultSrc="/images/doctor.png" 
                    alt="3D Medical Doctor" 
                    className="w-full h-full object-contain object-bottom scale-125 pointer-events-auto" 
                  />
                </div>
              </div>
            </Hover3DCard>
          </div>

          {/* Engineering / JEE Path */}
          <div className="flex-1">
            <Hover3DCard>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-[2rem] border border-blue-100 p-8 h-full flex flex-col relative overflow-hidden shadow-[0_8px_30px_rgb(37,99,235,0.12)]">
                
                {/* Background decorative glow */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Cog size={32} />
                  </div>
                  
                  <h3 className="text-3xl font-black text-gray-900 mb-2">
                    <EditableText contentKey="eng-title" defaultText="Engineering (JEE)" />
                  </h3>
                  <p className="text-blue-700 font-bold mb-6">
                    <EditableText contentKey="eng-target" defaultText="Target: IITs, NITs, aur IIITs" />
                  </p>
                  
                  <ul className="space-y-3 mb-8 text-gray-600 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span> 
                      <EditableText contentKey="eng-li1" defaultText="Advanced Mathematics & Physics" />
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span> 
                      <EditableText contentKey="eng-li2" defaultText="Complex Problem Solving" />
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span> 
                      <EditableText contentKey="eng-li3" defaultText="Real-time Doubt Engine" />
                    </li>
                  </ul>
                  
                  <Link href="/coming-soon?feature=Explore Engineering Courses" className="mt-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-6 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 w-full sm:w-auto self-start relative z-20">
                    <EditableText contentKey="eng-btn" defaultText="Engineering Courses Dekho" /> <ArrowRight size={20} />
                  </Link>
                </div>
                
                {/* 3D Engineer Art */}
                <div className="absolute bottom-0 right-0 w-[200px] sm:w-[280px] h-[250px] sm:h-[350px] translate-z-20 translate-x-4 sm:translate-x-12 translate-y-8 sm:translate-y-12 drop-shadow-2xl pointer-events-none">
                  <EditableImage 
                    contentKey="eng-img"
                    defaultSrc="/images/engineer.png" 
                    alt="3D Engineer" 
                    className="w-full h-full object-contain object-bottom scale-125 pointer-events-auto" 
                  />
                </div>
              </div>
            </Hover3DCard>
          </div>

        </div>
        
      </div>
    </section>
  );
}
