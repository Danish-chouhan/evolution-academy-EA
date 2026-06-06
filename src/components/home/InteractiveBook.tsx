"use client";

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Feather, BookOpen } from 'lucide-react';
import EditableText from '../admin/EditableText';

const library = [
  {
    id: 'physics',
    field: 'Physics / Natural Philosophy',
    coverTitle: 'PRINCIPIA',
    coverSubtitle: 'Mathematica',
    author: 'Isaaci Newtoni',
    coverColor: 'bg-[#2b1b17]',
    coverBorder: 'border-[#1f1310]',
    textColor: 'text-[#d4af37]',
    index: [
      { chapter: 'De Motu Corporum', page: 'III' },
      { chapter: 'De Mundi Systemate', page: 'XII' },
      { chapter: 'Theoria Gravitatis', page: 'XX' },
    ],
    contentTitle: 'Liber II: De Motu',
    contentParagraph1: 'Every body perseveres in its state of rest, or of uniform motion in a right line, unless it is compelled to change that state by forces impressed thereon.',
    contentParagraph2: 'The alteration of motion is ever proportional to the motive force impressed; and is made in the direction of the right line in which that force is impressed.'
  },
  {
    id: 'mathematics',
    field: 'Mathematics / Geometry',
    coverTitle: 'ELEMENTA',
    coverSubtitle: 'Geometriae',
    author: 'Euclidis Alexandrini',
    coverColor: 'bg-[#1a2c3a]',
    coverBorder: 'border-[#111f2a]',
    textColor: 'text-[#c0c0c0]',
    index: [
      { chapter: 'De Punctis et Lineis', page: 'I' },
      { chapter: 'De Triangulis', page: 'IV' },
      { chapter: 'De Circulis', page: 'XV' },
    ],
    contentTitle: 'Liber I: Definitiones',
    contentParagraph1: 'A point is that which has no part. A line is breadthless length. The extremities of a line are points.',
    contentParagraph2: 'A straight line is a line which lies evenly with the points on itself. A surface is that which has length and breadth only.'
  },
  {
    id: 'biology',
    field: 'Biology / Anatomy',
    coverTitle: 'DE HUMANI',
    coverSubtitle: 'Corporis Fabrica',
    author: 'Andreae Vesalii',
    coverColor: 'bg-[#3d1c1c]',
    coverBorder: 'border-[#291212]',
    textColor: 'text-[#e8c37d]',
    index: [
      { chapter: 'De Ossibus', page: 'I' },
      { chapter: 'De Musculis', page: 'V' },
      { chapter: 'De Corde et Vasis', page: 'IX' },
    ],
    contentTitle: 'Liber I: De Ossibus',
    contentParagraph1: 'Bone is the hardest and driest of all the parts of the body, and its function is to provide the foundation for the entire bodily fabric.',
    contentParagraph2: 'It supports the flesh, protects the vital organs, and serves as the structural framework upon which the muscles enact their motion.'
  }
];

export default function InteractiveBook() {
  const [flippedPages, setFlippedPages] = useState<number[]>([]);
  const [selectedField, setSelectedField] = useState(library[0].id);

  useEffect(() => {
    setFlippedPages([]);
  }, [selectedField]);

  const activeBook = library.find(b => b.id === selectedField) || library[0];

  const turnPageNext = () => {
    const nextToFlip = [0, 1, 2].find(p => !flippedPages.includes(p));
    if (nextToFlip !== undefined) {
      setFlippedPages(prev => [...prev, nextToFlip]);
    }
  };

  const turnPagePrev = () => {
    if (flippedPages.length > 0) {
      const highestFlipped = Math.max(...flippedPages);
      setFlippedPages(prev => prev.filter(p => p !== highestFlipped));
    }
  };

  const isFlipped = (pageIndex: number) => flippedPages.includes(pageIndex);

  return (
   <section className="py-24 bg-[#faf8f5] border-t border-[#e8e4d9] overflow-hidden relative">      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4 text-[#8a7a5c]">
            <div className="w-12 h-[1px] bg-[#d4c3a3]"></div>
            <Feather size={24} />
            <div className="w-12 h-[1px] bg-[#d4c3a3]"></div>
          </div>
          <EditableText contentKey="interactive-book-title" defaultText="Classical Archive" as="h2" className="text-[2.5rem] text-[#2c241b] mb-2 tracking-wide font-normal drop-shadow-sm" />
          <EditableText contentKey="interactive-book-subtitle" defaultText="Koi bhi academic discipline select karo aur uska foundational text explore karo." as="p" className="text-[#6b6254] font-light text-lg italic mb-8" />

          {/* Academic Field Selector (Light Theme) */}
          <div className="relative inline-block w-full max-w-sm">
            <select 
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="appearance-none w-full bg-white border-2 border-[#d4c3a3] text-[#5c4f3c] py-3 px-6 pr-12 rounded shadow-sm italic text-lg cursor-pointer outline-none focus:border-[#a38d62] transition-colors"            >
              {library.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.field}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#a38d62]">
               <BookOpen size={20} />
            </div>
          </div>

        </div>

        {/* The 3D Book Container */}
        <div className="flex justify-center items-center perspective-1000 my-16 scale-90 sm:scale-100">
          
          <div className="relative w-[280px] sm:w-[400px] h-[400px] sm:h-[550px] preserve-3d" style={{ transform: 'rotateX(15deg) rotateY(-5deg)' }}>
            
            {/* Page 2 (Back Page) */}
            <div 
              className={`absolute top-0 right-0 w-full h-full preserve-3d origin-left transition-transform duration-1000 ease-in-out shadow-[-10px_10px_20px_rgba(0,0,0,0.15)]`}
              style={{ transform: isFlipped(2) ? 'rotateY(-180deg)' : 'rotateY(0deg)', zIndex: isFlipped(2) ? 3 : 1 }}
            >
              <div className="absolute inset-0 bg-[#fdfbf7] backface-hidden border-l border-[#e6e2d3] p-10 flex flex-col shadow-inner rounded-r-md">
                <h3 className="text-2xl text-[#2c241b] mb-4 text-center border-b border-[#d4c3a3] pb-4">
                  {activeBook.contentTitle.split(':').map((part, i) => (
                    <span key={i}>
                      {i === 0 ? part : <><br/><span className="text-sm text-[#7c6f5a] italic">{part}</span></>}
                    </span>
                  ))}
                </h3>
 <EditableText contentKey={`interactive-book-p1-${activeBook.id}`} defaultText={activeBook.contentParagraph1} as="p" className="text-[#4a4135] text-sm leading-relaxed text-justify" />
                <div className="mt-8 mx-auto w-16 h-[1px] bg-[#d4c3a3]"></div>
                <EditableText contentKey={`interactive-book-p2-${activeBook.id}`} defaultText={activeBook.contentParagraph2} as="p" className="text-[#4a4135] text-sm leading-relaxed text-justify mt-6" />
                <div className="mt-auto text-center text-xs text-[#a39a83]">III</div>
              </div>
              <div 
                className={`absolute inset-0 ${activeBook.coverColor} backface-hidden rounded-l-md border-r-8 ${activeBook.coverBorder} shadow-[inset_-5px_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/leather.png')] transition-colors duration-1000`}
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="w-[80%] h-[90%] border border-black/30 opacity-30 flex items-center justify-center">
                   <div className="w-8 h-8 rounded-full border border-black/30"></div>
                </div>
              </div>
            </div>

            {/* Page 1 (Middle Page) */}
            <div 
              className={`absolute top-0 right-0 w-full h-full preserve-3d origin-left transition-transform duration-1000 ease-in-out shadow-[-5px_5px_15px_rgba(0,0,0,0.1)]`}
              style={{ transform: isFlipped(1) ? 'rotateY(-180deg)' : 'rotateY(0deg)', zIndex: isFlipped(1) ? 2 : 2 }}
            >
              <div className="absolute inset-0 bg-[#fdfbf7] backface-hidden border-l border-[#e6e2d3] p-10 flex flex-col shadow-inner rounded-r-md">
                <EditableText contentKey="interactive-book-index-title" defaultText="Index Rerum" as="h3" className="text-xl text-[#2c241b] mb-6 border-b border-[#d4c3a3] pb-2 text-center uppercase tracking-widest text-sm" />
                <ul className="space-y-6 flex-grow mt-4">
                  {activeBook.index.map((item, i) => (
                    <li key={i} className="flex justify-between text-sm text-[#4a4135] border-b border-dotted border-[#c8bba3] pb-1">
                         <EditableText contentKey={`interactive-book-index-${activeBook.id}-chap-${i}`} defaultText={item.chapter} as="span" className="text-xs" />
                          <EditableText contentKey={`interactive-book-index-${activeBook.id}-page-${i}`} defaultText={item.page} as="span" className="font-mono text-xs" />
                    </li>
                  ))}
                </ul>
                <div className="text-center text-xs text-[#a39a83]">I</div>
              </div>
              <div 
                className="absolute inset-0 bg-[#fdfbf7] backface-hidden p-10 flex flex-col shadow-inner rounded-l-md"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <EditableText contentKey="interactive-book-praefatio-title" defaultText="Praefatio" as="h3" className="text-xl text-[#2c241b] mb-6 text-center italic" />
                <EditableText contentKey={`interactive-book-praefatio-text-${activeBook.id}`} defaultText={`<span class="float-left text-4xl mr-2 mt-[-6px] font-normal text-[#2c241b] leading-none">S</span>tudying the foundations of ${activeBook.field.split(' / ')[0].toLowerCase()} is of greatest importance in the investigation of natural things, leading the student to understand the immutable laws that govern our reality through rigorous inquiry.`} as="p" className="text-[#4a4135] text-sm leading-relaxed text-justify relative" allowHtml={true} />
                <div className="mt-auto text-center text-xs text-[#a39a83]">II</div>
              </div>
            </div>

            {/* Page 0 (Cover Page) */}
            <div 
              className={`absolute top-0 right-0 w-full h-full preserve-3d origin-left transition-transform duration-1000 ease-in-out shadow-[-5px_5px_15px_rgba(0,0,0,0.25)] ${flippedPages.length === 0 ? 'cursor-pointer' : ''}`}
              onClick={() => flippedPages.length === 0 && turnPageNext()}
              style={{ transform: isFlipped(0) ? 'rotateY(-180deg)' : 'rotateY(0deg)', zIndex: isFlipped(0) ? 1 : 3 }}
            >
              <div className={`absolute inset-0 ${activeBook.coverColor} backface-hidden rounded-r-md border-l-8 ${activeBook.coverBorder} p-6 flex flex-col items-center justify-center ${activeBook.textColor} shadow-2xl relative bg-[url('https://www.transparenttextures.com/patterns/leather.png')] transition-colors duration-1000`}>
                
                <div className={`absolute inset-4 border-2 border-current opacity-60 rounded-sm`}></div>
                <div className={`absolute inset-5 border border-current opacity-30 rounded-sm`}></div>
                
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-current"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-current"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-current"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-current"></div>

                <div className="text-center z-10 px-8">
                  <EditableText contentKey={`interactive-book-author-${activeBook.id}`} defaultText={activeBook.author} as="h2" className="text-xs tracking-[0.2em] uppercase mb-8 opacity-80" />
                  <EditableText contentKey={`interactive-book-cover-${activeBook.id}`} defaultText={`${activeBook.coverTitle} <br/> <span class="text-xl italic">${activeBook.coverSubtitle}</span>`} as="h1" className="text-4xl font-normal leading-tight mb-8 drop-shadow-md" allowHtml={true} />
                  
                  <div className="w-16 h-16 mx-auto mb-8 border border-current opacity-40 rotate-45 flex items-center justify-center">
                    <div className="w-12 h-12 border border-current opacity-20 flex items-center justify-center">
                       <Feather size={20} className="-rotate-45 opacity-70" />
                    </div>
                  </div>
                  
                  <EditableText contentKey="interactive-book-editio" defaultText="Editio Princeps" as="p" className="text-[10px] tracking-widest uppercase opacity-60" />
                </div>
                
                <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-r from-black/60 to-transparent"></div>
              </div>
              
              <div 
                className="absolute inset-0 bg-[#e0d6c8] backface-hidden rounded-l-md border-r border-[#c4b5a2] shadow-[inset_5px_0_15px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')]"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="border-4 border-double border-[#7c6f5a]/30 p-6 flex flex-col items-center max-w-[200px] bg-white/40">
                  <EditableText contentKey="interactive-book-ex-libris" defaultText="Ex Libris" as="div" className="text-[#4a4135] text-[10px] tracking-widest uppercase mb-2" />
                  <div className="w-full h-[1px] bg-[#7c6f5a]/50 mb-2"></div>
  <EditableText contentKey={`interactive-book-field2-${activeBook.id}`} defaultText={activeBook.field.split(' / ')[1]} as="div" className="italic text-lg text-[#2c241b] text-center" />                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Classical Controls (Light Theme) */}
        <div className="flex justify-center items-center gap-8 mt-12">
          <button 
            onClick={turnPagePrev}
            disabled={flippedPages.length === 0}
            className={`flex items-center gap-2 px-6 py-2 border transition-all ${flippedPages.length === 0 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-[#d4c3a3] text-[#8a7a5c] hover:bg-[#d4c3a3]/20 bg-white shadow-sm'}`}
          >
            <ChevronLeft size={16} /> <EditableText contentKey="interactive-book-btn-prev" defaultText="Voltare" as="span" className="uppercase tracking-widest text-xs font-bold" />
          </button>
          
          <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">
            <EditableText contentKey="interactive-book-page-text" defaultText="Pagina" as="span" /> {flippedPages.length} / 3
          </div>

          <button 
            onClick={turnPageNext}
            disabled={flippedPages.length === 3}
            className={`flex items-center gap-2 px-6 py-2 border transition-all ${flippedPages.length === 3 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-[#d4c3a3] text-[#8a7a5c] hover:bg-[#d4c3a3]/20 bg-white shadow-sm'}`}
          >
            <EditableText contentKey="interactive-book-btn-next" defaultText="Procedere" as="span" className="uppercase tracking-widest text-xs font-bold" /> <ChevronRight size={16} />
          </button>
        </div>
        
      </div>
    </section>
  );
}
