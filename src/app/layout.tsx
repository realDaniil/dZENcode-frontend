import type { Metadata } from 'next';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopMenu from '@/components/top-menu/TopMenu';
import Navigation from '@/components/navigation/Navigation';
import ReduxProvider from '@/store/ReduxProvider';
import ReduxInitializer from '@/store/ReduxInitializer';

export const metadata: Metadata = {
  title: 'Inventory',
  description: 'Заказы и продукты'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <ReduxInitializer />
      <html lang="en">
        <body>
          <TopMenu />
          <div className="app-container">
            <Navigation />
            <main className="content">{children}</main>
          </div>
        </body>
      </html>
    </ReduxProvider>
  );
}
