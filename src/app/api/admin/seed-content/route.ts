import { connectDB } from '@/lib/db';
import Content from '@/lib/models/Content';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const defaultHeroContent = {
      titleLine1: "Bharat ka <span class='text-brand-purple'>Vishwast &</span><br />",
      titleLine2: "<span class='text-brand-purple'>Sasta</span> Educational<br />",
      titleLine3: "Platform",
      subtitle: "Apni shakti unlock karo Evolution Academy ke sath - Sabse sasta learning solution",
      button1Text: "Batches Dekho",
      button1Link: "/coming-soon?feature=Explore Batches",
      button2Text: "Video Dekho",
      button2Link: "/coming-soon?feature=Watch Video Demo",
      imageUrl: "/images/hero.png"
    };

    await Content.findOneAndUpdate(
      { page: 'home', section: 'HeroSection' },
      { data: defaultHeroContent },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Seed content injected successfully!' });
  } catch (error: any) {
    console.error('Seed content error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
