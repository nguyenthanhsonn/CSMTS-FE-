'use client';

import { AdminFaculties } from '../../../views/Admin/Faculties';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout>
        <AdminFaculties />
      </MainLayout>
    </ProtectedRoute>
  );
}
