'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/student/evaluation');
  }, [router]);

  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-xs text-gray-500 font-semibold">Đang chuyển hướng tới Phiếu đánh giá...</p>
      </div>
    </div>
  );
}
