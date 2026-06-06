'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, Package, Truck, CheckCircle2, MapPin, XCircle } from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';
  const initialPhone = searchParams.get('phone') || '';

  const [orderId, setOrderId] = useState(initialOrderId);
  const [phone, setPhone] = useState(initialPhone);
  const [loading, setLoading] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<any>(null);
  const [error, setError] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [showFullTrack, setShowFullTrack] = useState(false);

  const fetchTracking = async (id: string, ph: string) => {
    setLoading(true);
    setError('');
    setTrackingInfo(null);
    setShowFullTrack(false);
    try {
      const res = await fetch('/api/track-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: id, phone: ph }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setTrackingInfo(data);
      }
    } catch (err) {
      setError('An error occurred while tracking your order.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialLoad && initialOrderId && initialPhone) {
      fetchTracking(initialOrderId, initialPhone);
    }
    setInitialLoad(false);
  }, [initialOrderId, initialPhone, initialLoad]);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(orderId, phone);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PICKED UP': return <Package className="text-white" size={20} />;
      case 'IN TRANSIT': return <Truck className="text-white" size={20} />;
      case 'OUT FOR DELIVERY': return <MapPin className="text-white" size={20} />;
      case 'DELIVERED': return <CheckCircle2 className="text-white" size={20} />;
      default: return <div className="w-3 h-3 rounded-full bg-white" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          {!initialOrderId && !initialPhone && (
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">Track Your Order</h1>
              <p className="text-slate-600 dark:text-slate-400">Enter your Order ID and Phone Number to check the real-time status of your shipment.</p>
            </div>
          )}

          {!initialOrderId && !initialPhone && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 mb-8">
              <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    required
                    placeholder="Order ID (e.g., 60f7a9...)" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="flex-1 relative">
                  <input 
                    type="tel" 
                    required
                    placeholder="Phone Number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <><Search size={20} /> Track</>
                  )}
                </button>
              </form>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3">
              <XCircle size={20} /> {error}
            </div>
          )}

          {trackingInfo && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              
              {/* Product Card / Toggle */}
              <div 
                onClick={() => setShowFullTrack(!showFullTrack)}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer hover:shadow-2xl transition-all mb-6 group relative"
              >
                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors z-10 pointer-events-none"></div>
                <div className="flex items-center p-4 sm:p-6 gap-6">
                  {trackingInfo.order.productImage ? (
                    <img src={trackingInfo.order.productImage} alt={trackingInfo.order.productName} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl shadow-sm" />
                  ) : (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center">
                      <Package size={40} className="text-slate-300" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1 line-clamp-2">{trackingInfo.order.productName}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">Ordered on {new Date(trackingInfo.order.date).toLocaleDateString()}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold rounded-lg text-sm">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                      Status: {trackingInfo.status}
                    </div>
                  </div>
                  <div className="hidden sm:flex text-indigo-600 font-medium text-sm group-hover:underline items-center gap-1">
                    {showFullTrack ? 'Hide Tracking' : 'View Full Track'}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 p-3 text-center sm:hidden text-indigo-600 text-sm font-bold">
                  {showFullTrack ? 'Hide Tracking' : 'View Full Track'}
                </div>
              </div>

              {/* Full Timeline */}
              {showFullTrack && (
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in slide-in-from-top-4 fade-in duration-300">
                  {trackingInfo.status === 'Processing' ? (
                    <div className="p-12 text-center">
                      <Package size={48} className="mx-auto text-slate-300 mb-4" />
                      <p className="text-lg font-medium text-slate-700 dark:text-slate-300">{trackingInfo.message}</p>
                    </div>
                  ) : (
                    <div className="p-8">
                      <div className="flex flex-col md:flex-row gap-8 mb-10">
                        <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Courier</p>
                          <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-2"><Truck size={16} className="text-indigo-500"/> {trackingInfo.courierName}</p>
                        </div>
                        <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tracking Number (AWB)</p>
                          <p className="font-semibold text-slate-900 dark:text-white">{trackingInfo.awbCode}</p>
                        </div>
                      </div>

                      <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
                        {trackingInfo.trackingDetails?.tracking_data?.shipment_track_activities?.map((activity: any, idx: number) => (
                          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-800 bg-indigo-500 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md absolute left-[-40px] md:relative md:left-auto">
                              {getStatusIcon(activity.status)}
                            </div>
                            
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                              <div className="flex flex-col mb-1">
                                <span className="text-xs font-bold tracking-wider text-indigo-500 uppercase">{activity.status}</span>
                                <span className="font-bold text-slate-900 dark:text-white text-lg">{activity.location}</span>
                              </div>
                              <div className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                                {activity.activity}
                              </div>
                              <time className="text-xs font-medium text-slate-400 block border-t border-slate-200 dark:border-slate-700 pt-3">
                                {new Date(activity.date).toLocaleString()}
                              </time>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><p>Loading tracking data...</p></div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
