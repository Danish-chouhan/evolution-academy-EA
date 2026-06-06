import { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import Content from '@/lib/models/Content';
import { ContentProvider } from '@/components/admin/ContentProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ResultsContent from '@/components/results/ResultsContent';

export const metadata: Metadata = {
  title: 'Results | Evolution Academy',
  description: 'Historic results 2024 from Evolution Academy.',
};

export const dynamic = 'force-dynamic';

export default async function ResultsPage() {
  await connectDB();
  const pageContent = await Content.find({ page: 'results', section: 'global' }).lean();
  
  const contentData = pageContent.length > 0 ? pageContent[0].data : {};

  return (
    <ContentProvider initialContent={contentData} page="results" isAdmin={false}>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
        <Navbar />

        <main className="flex-grow pt-[72px]">
          <ResultsContent />
        </main>

        <Footer />
      </div>
    </ContentProvider>
  );
}
