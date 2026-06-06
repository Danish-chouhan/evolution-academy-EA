import EditableText from '../admin/EditableText';

export default function StatsBanner() {
  const stats = [
    { value: '15M+', label: 'Khush Students', bgColor: 'bg-[#fff3e0]', textColor: 'text-[#e65100]' },
    { value: '24000+', label: 'JEE/NEET Selections', bgColor: 'bg-[#ffebee]', textColor: 'text-[#c62828]' },
    { value: '14000+', label: 'Har Din Live Classes', bgColor: 'bg-[#e0f7fa]', textColor: 'text-[#006064]' },
    { value: '50000+', label: 'Video Lectures', bgColor: 'bg-[#ede7f6]', textColor: 'text-[#4527a0]' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-[1.8rem] font-extrabold text-gray-900 tracking-tight">
            <EditableText contentKey="stats-title" defaultText="Bharat ka sabse vishwast & sasta education platform" />
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`py-8 px-4 rounded-[2rem] text-center shadow-sm border border-gray-50 ${stat.bgColor}`}
            >
              <h3 className={`text-4xl md:text-5xl font-black mb-2 ${stat.textColor}`}>
                <EditableText contentKey={`stat-value-${i}`} defaultText={stat.value} />
              </h3>
              <p className="text-gray-700 font-bold text-sm tracking-wide">
                <EditableText contentKey={`stat-label-${i}`} defaultText={stat.label} />
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
