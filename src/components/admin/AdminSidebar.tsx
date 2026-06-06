'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BarChart3, Edit3, Users, BookOpen, LogOut, Package, ShoppingCart } from 'lucide-react';

export default function AdminSidebar({ user }: { user: { name: string, email: string } | null }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/auth/admin-login');
  };

  const navLinks = [
    { name: 'Pages Content', href: '/admin/dashboard', icon: Edit3 },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  ];

  return (
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col shadow-sm z-10 shrink-0">
        <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center md:block">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Admin <span className="text-brand-purple">Panel</span></h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">Welcome, {user?.name}</p>
          </div>
        </div>
        
        <nav className="flex-1 p-2 md:p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible items-center md:items-stretch">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl font-bold transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'bg-brand-purple/10 text-brand-purple' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <link.icon size={18} className="md:w-5 md:h-5 shrink-0" />
                <span className="text-sm md:text-base">{link.name}</span>
              </a>
            );
          })}
          
          <button 
            onClick={handleLogout}
            className="md:hidden flex items-center gap-2 px-3 py-2 text-red-500 bg-red-50 rounded-xl font-bold whitespace-nowrap ml-auto"
          >
            <LogOut size={18} /> Logout
          </button>
          
          <div className="hidden md:block pt-4 mt-4 border-t border-gray-100 space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4">Coming Soon</span>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 rounded-xl font-medium transition-colors cursor-not-allowed opacity-60">
              <BookOpen size={20} /> Batches
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 rounded-xl font-medium transition-colors cursor-not-allowed opacity-60">
              <Users size={20} /> Users
            </a>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-100 hidden md:block">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-xl transition-colors font-bold border border-gray-200 hover:border-red-200"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
  );
}
