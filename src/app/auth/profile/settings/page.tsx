'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings, Lock, Bell, Eye } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    marketing: true,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/auth/profile" className="flex items-center gap-2 text-brand-purple hover:underline mb-6">
          <ArrowLeft size={20} />
          Wapas Profile
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-brand-dark mb-6">Settings</h1>

          {/* Privacy Settings */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye size={24} className="text-brand-purple" />
              <h2 className="text-xl font-semibold text-brand-dark">Privacy</h2>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded-lg transition">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-gray-700">Profile ko public rakho</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded-lg transition">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-gray-700">Leaderboard mein dikhao</span>
              </label>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="mb-8 border-t pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell size={24} className="text-blue-500" />
              <h2 className="text-xl font-semibold text-brand-dark">Notifications</h2>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer">
                <span className="text-gray-700">Email Notifications</span>
                <input 
                  type="checkbox" 
                  checked={notifications.email}
                  onChange={() => handleToggle('email')}
                  className="w-4 h-4" 
                />
              </label>
              <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer">
                <span className="text-gray-700">SMS Notifications</span>
                <input 
                  type="checkbox" 
                  checked={notifications.sms}
                  onChange={() => handleToggle('sms')}
                  className="w-4 h-4" 
                />
              </label>
              <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer">
                <span className="text-gray-700">Marketing Emails</span>
                <input 
                  type="checkbox" 
                  checked={notifications.marketing}
                  onChange={() => handleToggle('marketing')}
                  className="w-4 h-4" 
                />
              </label>
            </div>
          </div>

          {/* Security Settings */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock size={24} className="text-red-500" />
              <h2 className="text-xl font-semibold text-brand-dark">Security</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition">
                Change Password
              </button>
              <button className="w-full bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-2 px-4 rounded-lg transition">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
