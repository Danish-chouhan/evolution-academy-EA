'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params);
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('ONLINE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      router.push(`/auth/login?redirect=/store/checkout/${id}`);
      return;
    }
    
    const user = JSON.parse(userStr);
    setForm(prev => ({
      ...prev,
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    }));
    setIsAuthenticated(true);
  }, [id, router]);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setProduct(data);
        }
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (paymentMethod === 'COD') {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: form,
            product: id,
            amount: product.price,
            paymentMethod: 'COD',
          }),
        });

        if (res.ok) {
          const data = await res.json();
          alert('Order placed successfully via Cash on Delivery!');
          router.push(`/track-order?orderId=${data._id}&phone=${encodeURIComponent(form.phone)}`);
        } else {
          alert('Failed to place order.');
        }
        setIsSubmitting(false);
      } else {
        // Online Payment
        const orderRes = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: form,
            product: id,
            amount: product.price,
            paymentMethod: 'ONLINE',
          }),
        });
        
        if (!orderRes.ok) {
          throw new Error('Failed to create order');
        }
        
        const orderData = await orderRes.json();
        const internalOrderId = orderData._id;

        const rzpRes = await fetch('/api/checkout/razorpay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: product.price }),
        });
        
        if (!rzpRes.ok) {
          throw new Error('Failed to initialize payment');
        }
        
        const rzpData = await rzpRes.json();

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mock',
          amount: rzpData.amount,
          currency: "INR",
          name: "Portfolio Store",
          description: `Payment for ${product.title}`,
          order_id: rzpData.id,
          handler: async function (response: any) {
            try {
              const verifyRes = await fetch('/api/checkout/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  internal_order_id: internalOrderId,
                }),
              });
              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                alert('Payment successful and verified!');
                router.push(`/track-order?orderId=${internalOrderId}&phone=${encodeURIComponent(form.phone)}`);
              } else {
                alert('Payment verification failed.');
              }
            } catch (err) {
              alert('Error verifying payment.');
            } finally {
              setIsSubmitting(false);
            }
          },
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },
          theme: {
            color: "#4f46e5",
          },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any){
          alert(`Payment Failed: ${response.error.description}`);
          setIsSubmitting(false);
        });
        rzp.open();
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during checkout.');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) return null; // Avoid flicker while redirecting

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-xl text-slate-600 dark:text-slate-400">Product not found.</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Secure <span className="text-indigo-600 dark:text-indigo-400">Checkout</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Please provide your details to complete the purchase.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Order Summary */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 order-2 lg:order-1 sticky top-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                <img src={product.image || 'https://via.placeholder.com/150'} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 mb-1">{product.title}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">₹{product.price}</p>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <p className="text-sm text-slate-400 line-through font-medium">₹{product.originalPrice}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4 text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900 dark:text-white">
                ₹{product.originalPrice && product.originalPrice > product.price ? product.originalPrice : product.price}
              </span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="flex justify-between items-center mb-4 text-rose-500">
                <span>Discount ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)</span>
                <span className="font-medium">-₹{product.originalPrice - product.price}</span>
              </div>
            )}
            <div className="flex justify-between items-center mb-6 text-slate-600 dark:text-slate-400">
              <span>Shipping</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                {product.isDigital ? 'Email Delivery' : 'Free'}
              </span>
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-700">
              <span className="text-xl font-bold text-slate-900 dark:text-white">Total</span>
              <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">₹{product.price}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 order-1 lg:order-2">
            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  {product.isDigital ? 'Contact Information' : 'Contact & Shipping Information'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                    <input required name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                    <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none" placeholder="+91 9876543210" />
                  </div>
                  {!product.isDigital && (
                    <>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Complete Address</label>
                        <textarea required name="address" value={form.address} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none resize-none" placeholder="123 Main St, Apartment 4B" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
                        <input required name="city" value={form.city} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none" placeholder="Mumbai" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">State</label>
                        <input required name="state" value={form.state} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none" placeholder="Maharashtra" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Pincode</label>
                        <input required name="pincode" value={form.pincode} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none" placeholder="400001" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Payment Method</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setPaymentMethod('ONLINE')}
                    className={`cursor-pointer border-2 rounded-2xl p-5 transition-all flex items-center gap-4 ${paymentMethod === 'ONLINE' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'ONLINE' ? 'border-indigo-600' : 'border-slate-400'}`}>
                      {paymentMethod === 'ONLINE' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Pay Online</h3>
                      <p className="text-xs text-slate-500 mt-1">Cards, UPI, NetBanking</p>
                    </div>
                  </div>
                  
                  <div 
                    onClick={() => setPaymentMethod('COD')}
                    className={`cursor-pointer border-2 rounded-2xl p-5 transition-all flex items-center gap-4 ${paymentMethod === 'COD' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'COD' ? 'border-indigo-600' : 'border-slate-400'}`}>
                      {paymentMethod === 'COD' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Cash on Delivery</h3>
                      <p className="text-xs text-slate-500 mt-1">Pay when you receive</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                >
                  {isSubmitting && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isSubmitting ? 'Processing...' : `Place Order • ₹${product.price}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
