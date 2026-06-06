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
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 shrink-0">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Admin <span className="text-brand-purple">Panel</span></h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">Welcome, {user?.name}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${
                  isActive 
                    ? 'bg-brand-purple/10 text-brand-purple' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <link.icon size={20} />
                {link.name}
              </a>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-gray-100 space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4">Coming Soon</span>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 rounded-xl font-medium transition-colors cursor-not-allowed opacity-60">
              <BookOpen size={20} /> Batches
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 rounded-xl font-medium transition-colors cursor-not-allowed opacity-60">
              <Users size={20} /> Users
            </a>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-100">
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
