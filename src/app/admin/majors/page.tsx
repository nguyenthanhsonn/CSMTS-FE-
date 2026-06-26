'use client';

import { AdminMajors } from '../../../views/Admin/Majors';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout>
        <AdminMajors />
      </MainLayout>
    </ProtectedRoute>
  );
}
