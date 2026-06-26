'use client';

import { StudentResults } from '../../../views/Student/Results';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="student">
      <MainLayout>
        <StudentResults />
      </MainLayout>
    </ProtectedRoute>
  );
}
