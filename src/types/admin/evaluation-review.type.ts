import type { AdminEvaluationItem } from './api.type';

export type EvaluationReviewAction = 'review' | 'approve' | 'reject';

export interface EvaluationReviewPermission {
  adminId: string;
  facultyIds: string[];
  majorIds?: string[];
  classIds?: string[];
  allowedActions: EvaluationReviewAction[];
  isActive: boolean;
}

export type EvaluationRow = AdminEvaluationItem & {
  studentName: string;
  className: string;
  classId?: string;
  facultyId?: string;
  classScore: number | null;
  finalScore?: number | null;
  classification?: string | null;
  semester?: string;
  academicYear?: string;
  statusLabel?: string | null;
};

export interface ReviewStudent {
  id: string;
  code: string;
  fullName: string;
}
