import '@/styles/globals.css';
import ClientLayout from '@/components/providers/ClientLayout';

export const metadata = {
  title: 'Review Genie',
  description: 'AI-powered review analysis platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body className='min-h-screen bg-gray-50 font-sans antialiased'>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
