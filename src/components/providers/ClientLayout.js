'use client';

import { StoreProvider } from './StoreProvider';
import Header from '@/components/common/Header';

export default function ClientLayout({ children }) {
  return (
    <StoreProvider>
      <Header />
      <main className='pt-16'>
        {children}
      </main>
    </StoreProvider>
  );
}
