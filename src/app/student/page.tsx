'use client';

import { StudentDashboard } from '../../views/Student/Dashboard';
import { MainLayout } from '../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="student">
      <MainLayout>
        <StudentDashboard />
      </MainLayout>
    </ProtectedRoute>
  );
}
