import "./globals.css";
import { Poppins, Playfair_Display, Great_Vibes, Cormorant_Garamond, Noto_Sans_Telugu } from 'next/font/google';

const poppins = Poppins({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'], variable: '--font-hero' });
const cormorant = Cormorant_Garamond({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-splash' });
const notoSansTelugu = Noto_Sans_Telugu({ weight: ['400', '500', '700'], subsets: ['telugu'], variable: '--font-telugu' });

export const metadata = {
  title: "Naveen & Chandrika's Wedding",
  description: "Welcome to our beautiful beginning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable} ${greatVibes.variable} ${cormorant.variable} ${notoSansTelugu.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
