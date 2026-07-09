'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import type { UserRole } from '../types/common';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const roleHome: Record<string, string> = {
      admin: '/admin',
      student: '/student',
      class_council: '/class_council',
    };

    if (!isAuthenticated) {
      router.replace('/login');
    } else if (requiredRole && user?.role !== requiredRole) {
      router.replace(user?.role ? roleHome[user.role] ?? '/login' : '/login');
    } else {
      setIsAuthorized(true);
    }
  }, [isAuthenticated, user, requiredRole, router]);

  if (!isAuthorized || !isAuthenticated || !user || (requiredRole && user.role !== requiredRole)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
};
