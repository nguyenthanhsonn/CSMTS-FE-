export type EvaluationReviewAction = 'review' | 'approve' | 'reject';

export interface EvaluationReviewPermission {
  adminId: string;
  facultyIds: string[];
  majorIds?: string[];
  classIds?: string[];
  allowedActions: EvaluationReviewAction[];
  isActive: boolean;
}
