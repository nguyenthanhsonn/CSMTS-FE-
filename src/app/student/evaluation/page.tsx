'use client';

import { EvaluationFormQD4185 } from '../../../views/Student/EvaluationFormQD4185';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="student">
      <MainLayout>
        <EvaluationFormQD4185 />
      </MainLayout>
    </ProtectedRoute>
  );
}
