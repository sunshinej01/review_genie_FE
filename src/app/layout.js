import '@/styles/globals.css';
import Header from '@/components/common/Header';

export const metadata = {
  title: 'Review Genie',
  description: 'AI-powered review analysis platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body className='min-h-screen bg-gray-50 font-sans antialiased'>
        <Header />
        <main className='pt-16'>
          {children}
        </main>
      </body>
    </html>
  );
}
