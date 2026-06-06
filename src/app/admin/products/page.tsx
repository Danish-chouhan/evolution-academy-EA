'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export default function AdminProducts() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const adminUser = localStorage.getItem('admin_user');
    if (!token || !adminUser) {
      router.push('/auth/admin-login');
      return;
    }
    setUser(JSON.parse(adminUser));
    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = currentProduct._id ? 'PUT' : 'POST';
      await fetch('/api/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduct)
      });
      setIsEditing(false);
      setCurrentProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setCurrentProduct({...currentProduct, image: data.url});
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Upload Error:', err);
      alert('Upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const openEditor = (prod?: any) => {
    const defaultProduct = { 
      title: '', description: '', price: 0, originalPrice: 0, image: '', category: 'General', stock: 100, isActive: true,
      productType: 'Physical Book', isDigital: false, features: []
    };
    setCurrentProduct(prod || defaultProduct);
    setIsEditing(true);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading Products...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col md:flex-row">
      <AdminSidebar user={user} />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden w-full">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Products Management</h1>
              <p className="text-gray-500 mt-2 font-medium">Manage your store inventory</p>
            </div>
            <button onClick={() => openEditor()} className="flex items-center gap-2 bg-brand-purple text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-purple-500/20 hover:bg-brand-purple/90 transition-colors">
              <Plus size={20} /> Add Product
            </button>
          </header>

          {isEditing && currentProduct && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl mb-8 relative">
              <button onClick={() => setIsEditing(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold mb-6">{currentProduct._id ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-200 outline-none" value={currentProduct.title} onChange={e => setCurrentProduct({...currentProduct, title: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-200 outline-none" value={currentProduct.description} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Original Price (₹)</label>
                  <input type="number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-200 outline-none" value={currentProduct.originalPrice || ''} onChange={e => setCurrentProduct({...currentProduct, originalPrice: Number(e.target.value)})} placeholder="e.g. 1000" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Sale Price (₹)</label>
                  <input type="number" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-200 outline-none" value={currentProduct.price} onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})} placeholder="e.g. 800" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Image</label>
                  <div className="flex items-center gap-4">
                    {currentProduct.image && (
                      <img src={currentProduct.image} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
                    )}
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-200 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100 cursor-pointer" 
                      />
                      {isUploading && <p className="text-sm text-brand-purple mt-2 font-medium">Uploading image...</p>}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Type</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-200 outline-none" value={currentProduct.productType} onChange={e => setCurrentProduct({...currentProduct, productType: e.target.value})}>
                    <option value="Physical Book">Physical Book</option>
                    <option value="Digital PDF">Digital PDF</option>
                    <option value="Study Kit">Study Kit</option>
                    <option value="Merchandise">Merchandise</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Features (Comma separated)</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-200 outline-none" placeholder="e.g. 500 Pages, Video Solutions Included" value={currentProduct.features?.join(', ')} onChange={e => setCurrentProduct({...currentProduct, features: e.target.value.split(',').map(s => s.trim())})} />
                </div>
                <div className="md:col-span-2 flex items-center gap-3">
                  <input type="checkbox" id="isDigital" className="w-5 h-5 rounded border-gray-300 text-brand-purple focus:ring-brand-purple" checked={currentProduct.isDigital} onChange={e => setCurrentProduct({...currentProduct, isDigital: e.target.checked})} />
                  <label htmlFor="isDigital" className="text-sm font-bold text-gray-700">Digital Product (Skip Shipping Address)</label>
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" className="flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-500/20 hover:bg-green-600 transition-colors">
                    <Save size={20} /> Save Product
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-bold text-gray-500 text-sm">Product</th>
                  <th className="p-4 font-bold text-gray-500 text-sm">Price</th>
                  <th className="p-4 font-bold text-gray-500 text-sm">Stock</th>
                  <th className="p-4 font-bold text-gray-500 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 flex flex-col gap-1">
                      <div className="flex items-center gap-4">
                        <img src={p.image} alt={p.title} className="w-16 h-16 rounded-lg object-cover border border-gray-100" />
                        <div>
                          <span className="font-bold text-gray-900 block">{p.title}</span>
                          <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded-md mt-1 inline-block">{p.productType}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-brand-purple">₹{p.price}</div>
                      {p.originalPrice > p.price && (
                        <div className="text-xs text-gray-400 line-through">₹{p.originalPrice}</div>
                      )}
                    </td>
                    <td className="p-4 text-gray-500">{p.stock}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEditor(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(p._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500 font-medium">No products found. Click "Add Product" to create one.</td>
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
