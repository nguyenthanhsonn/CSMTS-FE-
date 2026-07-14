'use client';

import { ReactNode, useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1B1E]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen flex-col lg:pl-[220px]">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 flex flex-col bg-[#F8F9FA] overflow-x-hidden max-w-full">
          {children}
        </main>
        {/* Minimal footer */}
        <footer className="border-t border-[#E9ECEF] bg-white px-6 py-3 lg:pl-0">
          <p className="text-center text-[11px] text-[#ADB5BD]">
            © 2024 Hệ thống Đánh giá Rèn luyện Sinh viên — CSMTS
          </p>
        </footer>
      </div>
    </div>
  );
};
