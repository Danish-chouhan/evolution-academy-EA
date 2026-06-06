import { connectDB } from '@/lib/db';
import Content from '@/lib/models/Content';
import { ContentProvider } from '@/components/admin/ContentProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FreeLibraryContent from '@/components/free-library/FreeLibraryContent';

export const dynamic = 'force-dynamic';

export default async function FreeLibraryPage() {
  await connectDB();
  const pageContent = await Content.find({ page: 'free-library', section: 'global' }).lean();
  
  // Extract global data
  const contentData = pageContent.length > 0 ? pageContent[0].data : {};

  return (
    <ContentProvider initialContent={contentData} page="free-library" isAdmin={false}>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />

        <main className="flex-grow pt-[72px]">
          <FreeLibraryContent />
        </main>

        <Footer />
      </div>
    </ContentProvider>
  );
}
