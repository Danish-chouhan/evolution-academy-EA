'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { CheckCircle2, Package, Truck, XCircle } from 'lucide-react';

export default function AdminOrders() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const adminUser = localStorage.getItem('admin_user');
    if (!token || !adminUser) {
      router.push('/auth/admin-login');
      return;
    }
    setUser(JSON.parse(adminUser));
    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, statusType: 'orderStatus' | 'paymentStatus', value: string) => {
    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id, [statusType]: value })
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const pushToShiprocket = async (orderId: string) => {
    if (!confirm('Are you sure you want to create a shipment in Shiprocket for this order?')) return;
    try {
      const res = await fetch('/api/admin/orders/shiprocket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });
      const data = await res.json();
      if (data.error) {
        alert('Shiprocket Error: ' + data.error);
      } else {
        alert('Shipment created successfully! AWB: ' + data.order.awbCode);
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to Shiprocket.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': case 'Paid': return 'bg-green-100 text-green-700';
      case 'Processing': case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Failed': case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading Orders...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col md:flex-row">
      <AdminSidebar user={user} />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden w-full">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Order Management</h1>
            <p className="text-gray-500 mt-1 md:mt-2 font-medium">Process and fulfill customer orders</p>
          </header>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-bold text-gray-500 text-sm">Order Info</th>
                  <th className="p-4 font-bold text-gray-500 text-sm">Customer</th>
                  <th className="p-4 font-bold text-gray-500 text-sm">Amount</th>
                  <th className="p-4 font-bold text-gray-500 text-sm">Payment</th>
                  <th className="p-4 font-bold text-gray-500 text-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-gray-900 line-clamp-1">{order.product?.title || 'Unknown Product'}</p>
                      <p className="text-xs text-gray-400 mt-1">ID: {order._id.substring(order._id.length - 6).toUpperCase()}</p>
                      <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{order.customer.name}</p>
                      <p className="text-sm text-gray-500">{order.customer.phone}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{order.customer.city}, {order.customer.state}</p>
                    </td>
                    <td className="p-4 font-bold text-brand-purple">
                      ₹{order.amount}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-2 items-start">
                        <span className="text-xs font-bold text-gray-500 border border-gray-200 px-2 py-1 rounded-md">{order.paymentMethod}</span>
                        <select 
                          value={order.paymentStatus} 
                          onChange={(e) => updateStatus(order._id, 'paymentStatus', e.target.value)}
                          className={`text-xs font-bold px-2 py-1 rounded-full outline-none cursor-pointer border-transparent ${getStatusColor(order.paymentStatus)}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Failed">Failed</option>
                        </select>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col items-start gap-2">
                        <select 
                          value={order.orderStatus} 
                          onChange={(e) => updateStatus(order._id, 'orderStatus', e.target.value)}
                          className={`text-sm font-bold px-3 py-1.5 rounded-full outline-none cursor-pointer border border-transparent shadow-sm ${getStatusColor(order.orderStatus)}`}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        
                        {!order.product?.isDigital && (
                          <div className="mt-2 w-full">
                            {order.awbCode ? (
                              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-2 text-xs">
                                <p className="font-bold text-indigo-700 mb-1 flex items-center gap-1"><Truck size={14} /> Shiprocket</p>
                                <p className="text-indigo-600">AWB: {order.awbCode}</p>
                                <p className="text-indigo-500 mt-0.5">{order.courierName}</p>
                              </div>
                            ) : (
                              <button 
                                onClick={() => pushToShiprocket(order._id)}
                                className="text-xs bg-gray-900 text-white font-bold px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-800 transition-colors w-full justify-center"
                              >
                                <Package size={14} /> Push to Shiprocket
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500 font-medium">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
