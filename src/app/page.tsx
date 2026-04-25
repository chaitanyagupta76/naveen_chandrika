import { getTranslations, getConfig, getImages } from '@/lib/fetchData';
import Header from '@/components/common/Header';
import Splash from '@/components/common/Splash';
import FallingLights from '@/components/common/FallingLights';
import Footer from '@/components/common/Footer';
import Hero from '@/components/sections/Hero';
import BrideGroom from '@/components/sections/BrideGroom';
import Venue from '@/components/sections/Venue';
import Countdown from '@/components/sections/Countdown';
import Timeline from '@/components/sections/Timeline';
import LiveStream from '@/components/sections/LiveStream';
import Gallery from '@/components/sections/Gallery';
import Presence from '@/components/sections/Presence';

export default async function WeddingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const lang = (resolvedParams.lang as string) || 'en';

  const translations = await getTranslations(lang);
  const config = await getConfig();
  const images = await getImages();

  const { sections, metadata } = config;

  return (
    <main className="min-h-screen bg-background-main">
      <FallingLights />
      <Splash translations={translations} />
      <Header lang={lang} translations={translations} />
      
      {sections.hero && (
        <Hero 
          translations={translations} 
          images={images} 
          metadata={metadata} 
        />
      )}
      
      {sections.brideGroom && (
        <BrideGroom 
          translations={translations} 
          images={images} 
        />
      )}
      
      {sections.venue && (
        <Venue 
          translations={translations} 
          images={images} 
        />
      )}
      
      {sections.countdown && (
        <Countdown 
          translations={translations} 
        />
      )}
      
      {sections.timeline && (
        <Timeline 
          translations={translations} 
          images={images}
        />
      )}
      
      {sections.livestream && (
        <LiveStream 
          translations={translations} 
          images={images} 
        />
      )}
      
      {sections.gallery && (
        <Gallery 
          translations={translations} 
          images={images} 
        />
      )}
      
      {sections.presence && (
        <Presence 
          translations={translations} 
          images={images} 
        />
      )}
      
      <Footer 
        translations={translations} 
        metadata={metadata} 
      />
    </main>
  );
}
