import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import EditableText from '../admin/EditableText';

export default function YoutubeChannels() {
  const channels = [
    { id: 1, name: 'Evolution Academy - Alakh Pandey', subs: '11.8M', category: 'Foundation', bg: 'bg-red-50' },
    { id: 2, name: 'JEE Academy', subs: '1.2M', category: 'JEE', bg: 'bg-blue-50' },
    { id: 3, name: 'Competition Academy', subs: '2.5M', category: 'NEET', bg: 'bg-green-50' },
    { id: 4, name: 'NCERT Academy', subs: '1.5M', category: 'Boards', bg: 'bg-yellow-50' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              <EditableText contentKey="yt-title" defaultText="Popular YouTube Channels" />
            </h2>
            <p className="text-gray-500 font-medium">
              <EditableText contentKey="yt-subtitle" defaultText="Sabke liye free learning resources" />
            </p>
          </div>
          <Link href="/coming-soon?feature=View All Channels" className="flex items-center gap-2 bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 transition-colors shadow-md">
            <EditableText contentKey="yt-btn" defaultText="Sab Channels Dekho" /> <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((channel) => (
            <Link href={`/coming-soon?feature=${channel.name} Channel`} key={channel.id} className={`p-6 rounded-3xl ${channel.bg} border border-transparent hover:border-red-200 transition-colors group cursor-pointer block`}>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 w-6 h-6"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </div>
              <div className="mb-4">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/60 px-2 py-1 rounded">
                  <EditableText contentKey={`yt-cat-${channel.id}`} defaultText={channel.category} />
                </span>
              </div>
              <h3 className="font-extrabold text-gray-900 text-lg mb-2 leading-tight">
                <EditableText contentKey={`yt-name-${channel.id}`} defaultText={channel.name} />
              </h3>
              <p className="text-red-600 font-bold text-sm">
                <EditableText contentKey={`yt-subs-${channel.id}`} defaultText={channel.subs} /> Subscribers
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
