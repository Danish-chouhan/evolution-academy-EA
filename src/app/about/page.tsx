import { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import Content from '@/lib/models/Content';
import { ContentProvider } from '@/components/admin/ContentProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutContent from '@/components/about/AboutContent';

export const metadata: Metadata = {
  title: 'About Evolution Academy',
  description: 'Democratizing Education for Bharat',
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  await connectDB();
  const pageContent = await Content.find({ page: 'about', section: 'global' }).lean();
  
  // Extract global data
  const contentData = pageContent.length > 0 ? pageContent[0].data : {};

  return (
    <ContentProvider initialContent={contentData} page="about" isAdmin={false}>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />

        <main className="flex-grow pt-[72px]">
          <AboutContent />
        </main>

        <Footer />
      </div>
    </ContentProvider>
  );
}
