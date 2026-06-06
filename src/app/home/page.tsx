import { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import Content from '@/lib/models/Content';
import { ContentProvider } from '@/components/admin/ContentProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BannerSlider from '@/components/home/BannerSlider';
import HeroSection from '@/components/home/HeroSection';
import CareerPaths from '@/components/home/CareerPaths';
import CategoryGrid from '@/components/home/CategoryGrid';
import StudyMaterialSection from '@/components/home/StudyMaterialSection';
import StatsBanner from '@/components/home/StatsBanner';
import ResultsBanner from '@/components/home/ResultsBanner';
import AppDownloadPromo from '@/components/home/AppDownloadPromo';
import StudyPrograms from '@/components/home/StudyPrograms';
import Testimonials from '@/components/home/Testimonials';
import YoutubeChannels from '@/components/home/YoutubeChannels';
import InteractiveBook from '@/components/home/InteractiveBook';
import ImmersiveStudy from '@/components/home/ImmersiveStudy';

export const metadata: Metadata = {
  title: 'Evolution Academy | Bharat ka Sabse Vishwast Educational Platform',
  description: 'Online learning platform jo comprehensive study materials, live classes, aur test series provide karta hai JEE, NEET, aur Boards ke liye.',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  await connectDB();
  const pageContent = await Content.find({ page: 'home', section: 'global' }).lean();
  
  // Extract global data
  const contentData = pageContent.length > 0 ? pageContent[0].data : {};

  return (
    <ContentProvider initialContent={contentData} page="home" isAdmin={false}>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        
        <main className="flex-grow">
          <BannerSlider />
          <HeroSection />
          <CareerPaths />
          <CategoryGrid />
          <StudyMaterialSection />
          <InteractiveBook />
          <ImmersiveStudy />
          <StatsBanner />
          <ResultsBanner />
          <AppDownloadPromo />
          <StudyPrograms />
          <Testimonials />
          <YoutubeChannels />
        </main>

        <Footer />
      </div>
    </ContentProvider>
  );
}
