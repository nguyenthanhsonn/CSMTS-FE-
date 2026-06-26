'use client';

import { StudentEvidence } from '../../../views/Student/Evidence';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="student">
      <MainLayout>
        <StudentEvidence />
      </MainLayout>
    </ProtectedRoute>
  );
}
