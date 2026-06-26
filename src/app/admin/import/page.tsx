'use client';

import { AdminImport } from '../../../views/Admin/Import';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout>
        <AdminImport />
      </MainLayout>
    </ProtectedRoute>
  );
}
