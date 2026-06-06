import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { connectDB } from '@/lib/db';
import Product from '@/lib/models/Product';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function StorePage() {
  await connectDB();
  const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Our <span className="text-indigo-600 dark:text-indigo-400">Store</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover our exclusive collection of products designed to help you excel.
          </p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <p className="text-xl text-slate-600 dark:text-slate-400">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id.toString()} className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col transform hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img
                    src={product.image || 'https://via.placeholder.com/400'}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="absolute top-4 right-4 bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90 flex items-center gap-1">
                      <span>{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{product.title}</h3>
                  </div>
                  {product.productType && (
                    <span className="inline-block px-2.5 py-1 mb-3 text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-md w-max">
                      {product.productType}
                    </span>
                  )}
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-grow">{product.description}</p>
                  
                  {product.features && product.features.length > 0 && (
                    <ul className="mb-6 space-y-1">
                      {product.features.slice(0, 3).map((feature: string, idx: number) => (
                        <li key={idx} className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                      {product.features.length > 3 && (
                        <li className="text-xs text-indigo-500 italic ml-2.5">+ {product.features.length - 3} more</li>
                      )}
                    </ul>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">₹{product.price}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-400 line-through font-medium">₹{product.originalPrice}</span>
                          <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md dark:bg-rose-900/30">
                            Save ₹{product.originalPrice - product.price}
                          </span>
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/store/checkout/${product._id}`}
                      className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
