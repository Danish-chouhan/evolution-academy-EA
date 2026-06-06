import { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import Content from '@/lib/models/Content';
import { ContentProvider } from '@/components/admin/ContentProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MentorshipContent from '@/components/mentorship/MentorshipContent';

export const metadata: Metadata = {
  title: 'Mentorship | Evolution Academy',
  description: '1-on-1 Mentorship programs for competitive exams.',
};

export const dynamic = 'force-dynamic';

export default async function MentorshipPage() {
  await connectDB();
  const pageContent = await Content.find({ page: 'mentorship', section: 'global' }).lean();
  
  // Extract global data
  const contentData = pageContent.length > 0 ? pageContent[0].data : {};

  return (
    <ContentProvider initialContent={contentData} page="mentorship" isAdmin={false}>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />

        <main className="flex-grow pt-[72px]">
          <MentorshipContent />
        </main>

        <Footer />
      </div>
    </ContentProvider>
  );
}
