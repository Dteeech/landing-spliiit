import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            className: 'bg-white text-gray-800 shadow-lg',
            style: {
              borderRadius: '8px',
              padding: '16px',
              fontSize: '16px',
            },
          }}
        />
      </body>
    </html>
  );
}
