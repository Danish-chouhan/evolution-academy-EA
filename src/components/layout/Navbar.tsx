"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Grid, ChevronDown, User, Search, Menu, X, LogOut, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CategoryDropdown from './CategoryDropdown';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isMoreMobileOpen, setIsMoreMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowProfileDropdown(false);
    router.push('/');
  };

  return (
    <>
      {/* Top Banner */}
      <Link href="/coming-soon?feature=Arjuna NEET 2025" className="block w-full bg-[#f4f7ff] hover:bg-[#e8edff] transition-colors border-b border-gray-200 py-2 cursor-pointer">
        <div className="w-full px-4 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="bg-brand-purple text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded">NEW</span>
            <span className="text-xs sm:text-sm text-gray-700 font-medium truncate">Arjuna NEET 2025</span>
          </div>
          <div className="hidden sm:flex text-sm text-gray-500 font-medium">
            India's most trusted education platform
          </div>
        </div>
      </Link>

      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full px-4 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            
            {/* Logo & Category Dropdown */}
            <div className="flex items-center gap-4 sm:gap-8">
              
              {/* Mobile Hamburger Toggle */}
              <button 
                className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <Link href="/" className="flex items-center gap-3">
                <img src="/images/logo.png" alt="Evolution Academy Logo" className="w-10 sm:w-12 h-auto object-contain" />
                <img src="/images/name.jpeg" alt="Evolution Academy" className="h-6 sm:h-8 w-auto object-contain" />
              </Link>
              
              <CategoryDropdown />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <Link href="/batches" className="text-gray-600 hover:text-brand-purple font-semibold">Batches</Link>
              <Link href="/results" className="text-gray-600 hover:text-brand-purple font-semibold">Results</Link>
              <Link href="/store" className="text-gray-600 hover:text-brand-purple font-semibold">Products</Link>
              <Link href="/free-library" className="text-gray-600 hover:text-brand-purple font-semibold">Free Library</Link>
              <Link href="/mentorship" className="text-gray-600 hover:text-brand-purple font-semibold">Mentorship</Link>
              <Link href="/about" className="text-gray-600 hover:text-brand-purple font-semibold">About Us</Link>
              
              {/* More Dropdown */}
              <div className="relative group">
                <button className="text-gray-600 hover:text-brand-purple font-semibold flex items-center gap-1 py-4">
                  More <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2 -mt-2">
                  {user ? (
                    <>
                      <Link href="/study-material" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-brand-purple font-semibold transition-colors">Study Material</Link>
                      <Link href="/test-series" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-brand-purple font-semibold transition-colors">Test Series</Link>
                      <Link href="/track-order" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-brand-purple font-semibold transition-colors">Track Order</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" className="flex items-center justify-between px-4 py-2.5 text-sm text-brand-purple bg-purple-50/40 hover:bg-purple-50 font-semibold transition-colors">
                        Study Material <span className="text-[10px] bg-brand-purple text-white px-2 py-0.5 rounded shadow-sm font-bold">Login</span>
                      </Link>
                      <Link href="/auth/login" className="flex items-center justify-between px-4 py-2.5 text-sm text-brand-purple bg-purple-50/40 hover:bg-purple-50 font-semibold transition-colors">
                        Test Series <span className="text-[10px] bg-brand-purple text-white px-2 py-0.5 rounded shadow-sm font-bold">Login</span>
                      </Link>
                      <Link href="/auth/login" className="flex items-center justify-between px-4 py-2.5 text-sm text-brand-purple bg-purple-50/40 hover:bg-purple-50 font-semibold transition-colors">
                        Track Order <span className="text-[10px] bg-brand-purple text-white px-2 py-0.5 rounded shadow-sm font-bold">Login</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4 relative">
              <button onClick={() => setIsContactPopupOpen(true)} className="hidden xl:flex items-center gap-2 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg px-4 py-2 border border-gray-200">
                <Phone size={16} className="text-gray-500" />
                <span className="text-sm font-semibold text-gray-900">Contact</span>
              </button>
              
              <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2 border border-gray-200 relative group">
                <Search size={18} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none outline-none text-sm ml-2 w-20 lg:w-32 placeholder-gray-400"
                />
                <Link href="/coming-soon?feature=Search" className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 cursor-text"></Link>
              </div>


              {/* Profile Dropdown (when logged in) */}
              {user && (
                <div className="relative group">
                  <button 
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="bg-brand-purple hover:bg-purple-700 text-white px-3 sm:px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors text-xs sm:text-sm shadow-sm"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-5 h-5 rounded-full object-cover hidden sm:block" />
                    ) : (
                      <User size={18} className="hidden sm:block" />
                    )}
                    <span className="truncate max-w-[100px]">{user.name?.split(' ')[0]}</span>
                    <ChevronDown size={16} />
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <Link 
                        href="/auth/profile" 
                        onClick={() => setShowProfileDropdown(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <User size={16} />
                        View Profile
                      </Link>
                      <Link 
                        href="/auth/profile/edit" 
                        onClick={() => setShowProfileDropdown(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Edit Profile
                      </Link>
                      <Link 
                        href="/auth/profile/courses" 
                        onClick={() => setShowProfileDropdown(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Mere Courses
                      </Link>
                      <div className="border-t my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Login Button (when not logged in) */}
              {!user && (
                <Link href="/auth/login" className="bg-brand-purple hover:bg-brand-purple/90 text-white px-3 sm:px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors text-xs sm:text-sm shadow-sm">
                  <User size={18} className="hidden sm:block" />
                  <span>Login</span>
                </Link>
              )}

              {/* Hidden Admin Button */}
              <Link href="/auth/admin-login" className="w-2 h-2 opacity-0 hover:opacity-100 bg-red-500 rounded-full transition-opacity absolute -right-2 top-0 cursor-pointer" title="Admin Access">
                <span className="sr-only">Admin Login</span>
              </Link>
            </div>
            
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[72px] left-0 w-full bg-white border-b border-gray-200 shadow-xl overflow-hidden animate-in slide-in-from-top-2">
            <div className="flex flex-col px-4 pt-2 pb-6 space-y-1">
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/coming-soon?feature=Categories Dropdown" className="flex items-center justify-between py-3 px-4 rounded-xl text-gray-700 font-bold hover:bg-gray-50">
                <div className="flex items-center gap-3"><Grid size={20} className="text-gray-400"/> Categories</div>
                <ChevronDown size={18} className="text-gray-400" />
              </Link>
              <div className="h-px bg-gray-100 my-1 mx-4"></div>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/batches" className="block py-3 px-4 rounded-xl text-gray-700 font-bold hover:bg-gray-50">Batches</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/results" className="block py-3 px-4 rounded-xl text-gray-700 font-bold hover:bg-gray-50">Results</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/store" className="block py-3 px-4 rounded-xl text-gray-700 font-bold hover:bg-gray-50">Products</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/free-library" className="block py-3 px-4 rounded-xl text-gray-700 font-bold hover:bg-gray-50">Free Library</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/mentorship" className="block py-3 px-4 rounded-xl text-gray-700 font-bold hover:bg-gray-50">Mentorship</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/about" className="block py-3 px-4 rounded-xl text-gray-700 font-bold hover:bg-gray-50">About Us</Link>
              
              <button onClick={() => setIsMoreMobileOpen(!isMoreMobileOpen)} className="flex items-center justify-between w-full py-3 px-4 rounded-xl text-gray-700 font-bold hover:bg-gray-50">
                <span>More</span>
                <ChevronDown size={18} className={`text-gray-400 transition-transform ${isMoreMobileOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isMoreMobileOpen && (
                <div className="pl-4 ml-4 border-l-2 border-gray-100 flex flex-col space-y-1 mb-2">
                  {user ? (
                    <>
                      <Link onClick={() => setIsMobileMenuOpen(false)} href="/study-material" className="block py-2.5 px-4 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 hover:text-brand-purple">Study Material</Link>
                      <Link onClick={() => setIsMobileMenuOpen(false)} href="/test-series" className="block py-2.5 px-4 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 hover:text-brand-purple">Test Series</Link>
                      <Link onClick={() => setIsMobileMenuOpen(false)} href="/track-order" className="block py-2.5 px-4 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 hover:text-brand-purple">Track Order</Link>
                    </>
                  ) : (
                    <>
                      <Link onClick={() => setIsMobileMenuOpen(false)} href="/auth/login" className="flex items-center justify-between py-2.5 px-4 rounded-xl text-brand-purple font-semibold bg-purple-50/40 hover:bg-purple-50 border border-purple-100/50">
                        Study Material <span className="text-[10px] bg-brand-purple text-white px-2 py-0.5 rounded shadow-sm font-bold">Login</span>
                      </Link>
                      <Link onClick={() => setIsMobileMenuOpen(false)} href="/auth/login" className="flex items-center justify-between py-2.5 px-4 rounded-xl text-brand-purple font-semibold bg-purple-50/40 hover:bg-purple-50 border border-purple-100/50">
                        Test Series <span className="text-[10px] bg-brand-purple text-white px-2 py-0.5 rounded shadow-sm font-bold">Login</span>
                      </Link>
                      <Link onClick={() => setIsMobileMenuOpen(false)} href="/auth/login" className="flex items-center justify-between py-2.5 px-4 rounded-xl text-brand-purple font-semibold bg-purple-50/40 hover:bg-purple-50 border border-purple-100/50">
                        Track Order <span className="text-[10px] bg-brand-purple text-white px-2 py-0.5 rounded shadow-sm font-bold">Login</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
              
              <div className="h-px bg-gray-100 my-2 mx-4"></div>
              
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/coming-soon?feature=Search" className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-700 font-bold hover:bg-gray-50">
                <Search size={20} className="text-gray-400" /> Search Courses
              </Link>
              <button onClick={() => { setIsContactPopupOpen(true); setIsMobileMenuOpen(false); }} className="w-full text-left flex items-center gap-3 py-3 px-4 rounded-xl text-brand-purple font-bold bg-brand-purple/5">
                <Phone size={20} /> Contact Us
              </button>

              <div className="h-px bg-gray-100 my-2 mx-4"></div>

              {user ? (
                <>
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/auth/profile" className="flex items-center gap-3 py-3 px-4 rounded-xl text-brand-purple font-bold hover:bg-gray-50">
                    <User size={20} /> My Profile
                  </Link>
                  <Link onClick={() => setIsMobileMenuOpen(false)} href="/auth/profile/courses" className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-700 font-bold hover:bg-gray-50">
                    <BookOpen size={20} /> Mere Courses
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-3 py-3 px-4 rounded-xl text-red-600 font-bold hover:bg-red-50"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </>
              ) : (
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/auth/login" className="flex items-center gap-3 py-3 px-4 rounded-xl bg-brand-purple text-white font-bold hover:bg-purple-700">
                  <User size={20} /> Login Karo
                </Link>
              )}
            </div>
          </div>
        )}
        
        {isContactPopupOpen && (
          <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsContactPopupOpen(false)}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md border border-gray-100 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Contact Us</h3>
                <button onClick={() => setIsContactPopupOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Phone size={24} className="text-brand-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Toll Free Helpline</p>
                    <p className="text-xl font-bold text-gray-900">1800-000-0000</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Have a query? Drop us an email:</p>
                  <a href="mailto:support@evolutionacademy.com" className="text-brand-purple font-bold hover:underline">
                    support@evolutionacademy.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
