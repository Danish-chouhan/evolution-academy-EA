import { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import Content from '@/lib/models/Content';
import { ContentProvider } from '@/components/admin/ContentProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StudyMaterialContent from '@/components/study-material/StudyMaterialContent';

export const metadata: Metadata = {
  title: 'Study Material | Evolution Academy',
  description: "Access India's largest collection of NCERT solutions, previous year papers, high-yield notes, and mock tests.",
};

export default async function StudyMaterialPage() {
  await connectDB();
  const pageContent = await Content.find({ page: 'study-material', section: 'global' }).lean();
  
  // Extract global data
  const contentData = pageContent.length > 0 ? pageContent[0].data : {};

  return (
    <ContentProvider initialContent={contentData} page="study-material" isAdmin={false}>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-[72px]">
          <StudyMaterialContent />
        </main>
        <Footer />
      </div>
    </ContentProvider>
  );
}
