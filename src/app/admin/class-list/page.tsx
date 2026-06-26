'use client';

import { AdminClassList } from '../../../views/Admin/ClassList';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout>
        <AdminClassList />
      </MainLayout>
    </ProtectedRoute>
  );
}
