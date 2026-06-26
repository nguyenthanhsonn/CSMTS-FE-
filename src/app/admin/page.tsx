'use client';

import { AdminDashboard } from '../../views/Admin/Dashboard';
import { MainLayout } from '../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout>
        <AdminDashboard />
      </MainLayout>
    </ProtectedRoute>
  );
}
