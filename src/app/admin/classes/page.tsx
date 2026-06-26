'use client';

import { AdminClasses } from '../../../views/Admin/Classes';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout>
        <AdminClasses />
      </MainLayout>
    </ProtectedRoute>
  );
}
