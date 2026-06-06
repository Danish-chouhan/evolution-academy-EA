import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import EditableText from '../admin/EditableText';

const categories = [
  { id: 1, title: 'Class 12', subtitle: 'Target Boards/JEE/NEET', color: 'bg-[#ffecec]', accent: 'bg-[#ffcdd2]', iconColor: 'bg-red-400' },
  { id: 2, title: 'Class 11', subtitle: 'Target Boards/JEE/NEET', color: 'bg-[#fff4e5]', accent: 'bg-[#ffe0b2]', iconColor: 'bg-orange-400' },
  { id: 3, title: 'JEE', subtitle: 'Target JEE Mains & Adv.', color: 'bg-[#e8f4fd]', accent: 'bg-[#bbdefb]', iconColor: 'bg-blue-400' },
  { id: 4, title: 'NEET', subtitle: 'Target NEET UG', color: 'bg-[#e8f5e9]', accent: 'bg-[#c8e6c9]', iconColor: 'bg-green-400' },
  { id: 5, title: 'UPSC', subtitle: 'Target UPSC CSE', color: 'bg-[#f3e5f5]', accent: 'bg-[#e1bee7]', iconColor: 'bg-purple-400' },
  { id: 6, title: 'CA Foundation', subtitle: 'Target CA Foundation', color: 'bg-[#fff8e1]', accent: 'bg-[#ffecb3]', iconColor: 'bg-yellow-400' },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <EditableText contentKey="category-grid-title" defaultText="Abhi Available Categories" as="h2" className="text-[2rem] font-bold text-gray-900 mb-3 tracking-tight" />
          <EditableText contentKey="category-grid-desc" defaultText="Apna class/category select karo aur learning shuru karo." as="p" className="text-gray-500 font-medium" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              href={`/coming-soon?feature=Category ${category.title}`}
              key={category.id} 
              className="group relative flex items-center justify-between h-[120px] rounded-3xl border border-gray-100 bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all cursor-pointer overflow-hidden block"
            >
              {/* The circular accent background on the right */}
              <div className={`absolute -right-4 -top-8 w-32 h-40 rounded-full ${category.color} transition-transform group-hover:scale-110`}></div>
              
              <div className="relative z-10 pl-6">
                <EditableText contentKey={`category-title-${category.id}`} defaultText={category.title} as="h3" className="text-[1.3rem] font-extrabold text-gray-900 mb-1 tracking-tight" />
                <EditableText contentKey={`category-subtitle-${category.id}`} defaultText={category.subtitle} as="p" className="text-xs text-gray-500 font-semibold" />
              </div>
              
              <div className="relative z-10 pr-6">
                 {/* Dummy Icon representing the category */}
                 <div className={`w-12 h-12 rounded-xl bg-white shadow-md flex justify-center items-center p-2`}>
                   <div className={`w-full h-full rounded-md ${category.iconColor} opacity-70`}></div>
                 </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Link href="/coming-soon?feature=All Categories" className="text-brand-purple font-bold text-sm hover:underline flex items-center gap-1">
            <EditableText contentKey="category-grid-see-all" defaultText="Sab Categories Dekho" /> <ChevronRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
