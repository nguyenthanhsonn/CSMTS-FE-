'use client';

import { AdminUsers } from '../../../views/Admin/Users';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout>
        <AdminUsers />
      </MainLayout>
    </ProtectedRoute>
  );
}
