import type { Metadata } from 'next';
import './globals.css';
import { BakeryProvider } from '@/context/BakeryContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sweet Crumbs Patisserie | Online Cake Ordering & Bakery Management',
  description: 'Order handcrafted custom celebration cakes, French macarons, and fresh pastries online. Complete with live kitchen prep tracking and owner admin dashboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[#faf7f2] text-stone-900 antialiased selection:bg-amber-200 selection:text-amber-900">
        <BakeryProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </BakeryProvider>
      </body>
    </html>
  );
}
