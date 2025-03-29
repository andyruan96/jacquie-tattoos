import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import SideNav from '@/app/_components/sidenav/sidenav';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import GoogleRecaptchaWrapper from '@/app/_components/google-recaptcha-wrapper/goole-recaptcha-wrapper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/effect-coverflow';
import { Analytics } from '@vercel/analytics/next';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | jacquietattoos',
    default: 'jacquietattoos',
  },
  description:
    'A tattoo artist based in Vancouver, Canada. Jacquie’s style can be described as illustrative black work, strongly influenced by anime and fine-line tattoo artists. Favourite tattoo subjects include florals, anime-related tattoos, and all things cute/spooky. Established in 2019.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleRecaptchaWrapper>
          <div className="flex min-h-screen flex-col md:flex-row">
            <div className="w-full flex-none bg-summer-green text-white md:w-56 md:px-10 md:pt-5">
              <SideNav />
            </div>
            <div className="flex-grow p-8 md:overflow-y-auto md:px-24 md:py-12">
              {children}
            </div>
          </div>
          <div id="modal-root"></div>
        </GoogleRecaptchaWrapper>
        <Analytics />
      </body>
    </html>
  );
}
