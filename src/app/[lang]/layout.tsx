import { Poppins, Playfair_Display, Great_Vibes, Cormorant_Garamond, Noto_Sans_Telugu } from 'next/font/google';
import '../globals.css';

const poppins = Poppins({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'], variable: '--font-hero' });
const cormorant = Cormorant_Garamond({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-splash' });
const notoSansTelugu = Noto_Sans_Telugu({ weight: ['400', '500', '700'], subsets: ['telugu'], variable: '--font-telugu' });

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'te' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  return (
    <html lang={lang} className={`${poppins.variable} ${playfair.variable} ${greatVibes.variable} ${cormorant.variable} ${notoSansTelugu.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
