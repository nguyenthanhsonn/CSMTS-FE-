'use client';

import { StudentHistory } from '../../../views/Student/History';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="student">
      <MainLayout>
        <StudentHistory />
      </MainLayout>
    </ProtectedRoute>
  );
}
