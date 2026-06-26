'use client';

import { StudentEvaluationComplete } from '../../../views/Student/EvaluationComplete';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="student">
      <MainLayout>
        <StudentEvaluationComplete />
      </MainLayout>
    </ProtectedRoute>
  );
}
