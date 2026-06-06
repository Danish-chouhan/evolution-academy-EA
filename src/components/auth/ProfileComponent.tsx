'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, User, Settings, BookOpen, Award, Heart } from 'lucide-react';

export default function ProfileComponent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login First</h1>
          <Link href="/auth/login" className="text-brand-purple hover:underline font-semibold">
            Login Karo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-brand-purple to-purple-700 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-brand-dark">{user.name || 'User'}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">Member since today</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-brand-dark mb-4">Account Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="text-brand-dark font-semibold">{user.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="text-brand-dark font-semibold">{user.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Account Status</p>
                <p className="text-green-600 font-semibold">✓ Active</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">User ID</p>
                <p className="text-brand-dark font-semibold text-sm">{user.id?.slice(0, 12)}...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Edit Profile */}
          <Link href="/auth/profile/edit" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-brand-purple">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <User size={24} className="text-brand-purple" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark">Edit Profile</h3>
                <p className="text-sm text-gray-600">Update apni details</p>
              </div>
            </div>
          </Link>

          {/* My Courses */}
          <Link href="/auth/profile/courses" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-blue-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark">Mere Courses</h3>
                <p className="text-sm text-gray-600">Apne courses dekho</p>
              </div>
            </div>
          </Link>

          {/* Learning Progress */}
          <Link href="/auth/profile/progress" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-green-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Award size={24} className="text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark">Learning Progress</h3>
                <p className="text-sm text-gray-600">Progress dekho</p>
              </div>
            </div>
          </Link>

          {/* Wishlist */}
          <Link href="/auth/profile/wishlist" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-red-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Heart size={24} className="text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark">Mera Wishlist</h3>
                <p className="text-sm text-gray-600">Saved courses</p>
              </div>
            </div>
          </Link>

          {/* Settings */}
          <Link href="/auth/profile/settings" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-yellow-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Settings size={24} className="text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark">Settings</h3>
                <p className="text-sm text-gray-600">Account settings</p>
              </div>
            </div>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-red-600 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <LogOut size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-dark">Logout</h3>
                <p className="text-sm text-gray-600">Apna account se logout karo</p>
              </div>
            </div>
          </button>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link href="/" className="text-brand-purple hover:underline font-semibold">
            ← Wapas Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
