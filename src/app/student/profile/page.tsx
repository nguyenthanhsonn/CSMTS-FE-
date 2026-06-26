'use client';

import { StudentProfile } from '../../../views/Student/Profile';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute requiredRole="student">
      <MainLayout>
        <StudentProfile />
      </MainLayout>
    </ProtectedRoute>
  );
}
