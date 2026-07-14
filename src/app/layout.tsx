import type { Metadata } from 'next';
import { ToastProvider } from '@/components/common/ToastProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'CSMTS - Student Management System',
  description: 'Comprehensive Student Management and Training System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
