import Link from 'next/link';
import EditableText from '../admin/EditableText';
import EditableImage from '../admin/EditableImage';

export default function StudyMaterialSection() {
  const materials = [
    { id: 1, title: 'NCERT', desc: 'Solutions', icon: 'bg-red-200' },
    { id: 2, title: 'CBSE', desc: 'Boards', icon: 'bg-blue-200' },
    { id: 3, title: 'State', desc: 'Boards', icon: 'bg-green-200' },
    { id: 4, title: 'ICSE', desc: 'Boards', icon: 'bg-orange-200' },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-white border-y border-gray-100">
      
      {/* Light background overlay simulating the building image in the screenshot but lightened */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 to-gray-50/95 z-10"></div>
      
      {/* Dummy building background image */}
      <div className="absolute inset-0 z-0">
         <EditableImage contentKey="study-material-bg" defaultSrc="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80" alt="Building" className="w-full h-full object-cover opacity-20" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        <div className="text-center mb-12">
          <EditableText contentKey="study-material-title" defaultText="Vidyapeeth Offline Centers ke liye Free Study Material Dekho" as="h2" className="text-3xl font-bold text-gray-900 mb-4" />
          <EditableText contentKey="study-material-desc" defaultText={'Bharat mein <span class="text-brand-orange font-bold">130+</span> centers hain'} as="p" className="text-gray-600 font-medium" allowHtml={true} />
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {materials.map((item) => (
              <Link href={`/coming-soon?feature=Material ${item.title}`} key={item.id} className="flex flex-col items-center justify-center p-6 rounded-2xl hover:bg-brand-purple-light transition-colors border border-transparent hover:border-brand-purple/20 cursor-pointer group">
                <div className={`w-16 h-16 rounded-2xl ${item.icon} mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                  <div className="w-8 h-8 bg-white/50 rounded-lg" />
                </div>
                <EditableText contentKey={`study-material-item-title-${item.id}`} defaultText={item.title} as="h3" className="font-extrabold text-gray-900 text-lg" />
                <EditableText contentKey={`study-material-item-desc-${item.id}`} defaultText={item.desc} as="p" className="text-sm text-gray-500 font-semibold" />
              </Link>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link href="/coming-soon?feature=Explore All Materials" className="bg-brand-purple text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-purple/90 transition-colors shadow-lg block text-center">
              <EditableText contentKey="study-material-btn" defaultText="Aur Dekho" />
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  );
}
