import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          
          {/* Brand & Socials */}
          <div className="lg:w-1/4">
            <Link href="/" className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
              <img src="/images/logo.png" alt="Evolution Academy Logo" className="w-12 sm:w-16 h-auto object-contain" />
            </Link>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed font-medium">
              We understand that every student has different needs and capabilities, which is why we create such a wonderful and unique curriculum that is the best fit for every student.
            </p>
            <div className="flex gap-3">
              <Link href="/coming-soon?feature=Twitter Social" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-purple hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </Link>
              <Link href="/coming-soon?feature=Facebook Social" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-purple hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Link>
              <Link href="/coming-soon?feature=Instagram Social" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-purple hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Link>
              <Link href="/coming-soon?feature=LinkedIn Social" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-purple hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </Link>
              <Link href="/coming-soon?feature=Youtube Social" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-purple hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </Link>
            </div>
          </div>

          {/* Massive Link Farm */}
          <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-extrabold text-sm mb-6 text-gray-900 uppercase tracking-wider">Company</h3>
              <ul className="space-y-4">
                <li><Link href="/coming-soon?feature=About Us" className="text-gray-500 hover:text-brand-purple text-sm font-medium">About Us</Link></li>
                <li><Link href="/coming-soon?feature=Contact Us" className="text-gray-500 hover:text-brand-purple text-sm font-medium">Contact Us</Link></li>
                <li><Link href="/coming-soon?feature=Careers" className="text-gray-500 hover:text-brand-purple text-sm font-medium">Careers</Link></li>
                <li><Link href="/coming-soon?feature=Updates" className="text-gray-500 hover:text-brand-purple text-sm font-medium">Updates</Link></li>
                <li><Link href="/coming-soon?feature=Blogs" className="text-gray-500 hover:text-brand-purple text-sm font-medium">Blogs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-extrabold text-sm mb-6 text-gray-900 uppercase tracking-wider">Popular Exams</h3>
              <ul className="space-y-4">
                <li><Link href="/coming-soon?feature=IIT JEE" className="text-gray-500 hover:text-brand-purple text-sm font-medium">IIT JEE</Link></li>
                <li><Link href="/coming-soon?feature=NEET" className="text-gray-500 hover:text-brand-purple text-sm font-medium">NEET</Link></li>
                <li><Link href="/coming-soon?feature=GATE" className="text-gray-500 hover:text-brand-purple text-sm font-medium">GATE</Link></li>
                <li><Link href="/coming-soon?feature=NDA" className="text-gray-500 hover:text-brand-purple text-sm font-medium">NDA</Link></li>
                <li><Link href="/coming-soon?feature=UPSC" className="text-gray-500 hover:text-brand-purple text-sm font-medium">UPSC</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-extrabold text-sm mb-6 text-gray-900 uppercase tracking-wider">Classes</h3>
              <ul className="space-y-4">
                <li><Link href="/coming-soon?feature=Class 12" className="text-gray-500 hover:text-brand-purple text-sm font-medium">Class 12</Link></li>
                <li><Link href="/coming-soon?feature=Class 11" className="text-gray-500 hover:text-brand-purple text-sm font-medium">Class 11</Link></li>
                <li><Link href="/coming-soon?feature=Class 10" className="text-gray-500 hover:text-brand-purple text-sm font-medium">Class 10</Link></li>
                <li><Link href="/coming-soon?feature=Class 9" className="text-gray-500 hover:text-brand-purple text-sm font-medium">Class 9</Link></li>
                <li><Link href="/coming-soon?feature=Class 8" className="text-gray-500 hover:text-brand-purple text-sm font-medium">Class 8</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-extrabold text-sm mb-6 text-gray-900 uppercase tracking-wider">Study Material</h3>
              <ul className="space-y-4">
                <li><Link href="/coming-soon?feature=NCERT Solutions" className="text-gray-500 hover:text-brand-purple text-sm font-medium">NCERT Solutions</Link></li>
                <li><Link href="/coming-soon?feature=Previous Year Papers" className="text-gray-500 hover:text-brand-purple text-sm font-medium">Previous Year Papers</Link></li>
                <li><Link href="/coming-soon?feature=Reference Books" className="text-gray-500 hover:text-brand-purple text-sm font-medium">Reference Books</Link></li>
                <li><Link href="/coming-soon?feature=Revision Notes" className="text-gray-500 hover:text-brand-purple text-sm font-medium">Revision Notes</Link></li>
                <li><Link href="/coming-soon?feature=Mock Tests" className="text-gray-500 hover:text-brand-purple text-sm font-medium">Mock Tests</Link></li>
              </ul>
            </div>
          </div>
          
        </div>

        {/* Disclaimer / Bottom section */}
        <div className="border-t border-gray-100 pt-8 mt-8">
           <p className="text-xs text-gray-400 leading-relaxed text-justify mb-4">
             Evolution Academy is India's top online ed-tech platform that provides affordable and comprehensive learning experience to students of classes 6 to 12 and those preparing for JEE and NEET exams. We also provide extensive NCERT solutions, sample papers, NEET, JEE Mains, BITSAT previous year papers, which makes us a one-stop solution for all resources.
           </p>
           
           <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-100 pt-6">
            <p className="text-gray-500 text-xs font-medium">
              © 2024 Evolution Academy. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs font-bold text-gray-500">
              <Link href="/coming-soon?feature=Privacy Policy" className="hover:text-brand-purple transition-colors">Privacy Policy</Link>
              <Link href="/coming-soon?feature=Terms and Conditions" className="hover:text-brand-purple transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
