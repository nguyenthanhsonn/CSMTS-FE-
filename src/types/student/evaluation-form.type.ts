import type { Evidence } from './evidence.type';
import type { StudentInfo } from './student-user.type';
import type {
  AcademicAwareness,
  AcademicPerformance,
  CivicAwareness,
  CommunityActivity,
  DisciplineCompliance,
  DisciplineViolation,
  EvaluationRating,
  LeadershipRole,
  PoliticalSocialActivities,
  PoliticalSocialActivity,
} from './evaluation-criteria.type';

export type EvaluationStatus =
  | 'draft'
  | 'submitted'
  | 'class_approved'
  | 'finalized'
  | 'rejected'
  | 'DRAFT'
  | 'SUBMITTED'
  | 'CLASS_APPROVED'
  | 'FINALIZED'
  | 'REJECTED';

export interface EvaluationPeriod {
  semester: string;
  academicYear: string;
  deadline?: string;
}

export interface EvaluationForm {
  id: string;
  studentId: string;
  phone?: string;
  note?: string;
  semester?: string | { semester: string; year: number };
  academicYear?: string;
  studentScore?: number | null;
  classScore?: number | null;
  finalScore?: number | null;
  totalScore?: number | null;
  classification?: string | null;
  rank?: string;
  period: EvaluationPeriod;
  status: EvaluationStatus;
  isLocked?: boolean;
  lockedAt?: string | null;
  semesterIsActive?: boolean;
  academicPerformance: AcademicPerformance;
  discipline: DisciplineViolation;
  politicalSocial: PoliticalSocialActivity;
  community: CommunityActivity;
  leadership: LeadershipRole;
  evidences: Evidence[];
  scores: {
    academic: number;
    discipline: number;
    politicalSocial: number;
    community: number;
    leadership: number;
    total: number;
  };
  rating: EvaluationRating;
  comments?: string;
  reviewerComments?: string;
  submittedAt?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompleteEvaluation {
  id: string;
  studentId: string;
  studentInfo: StudentInfo;
  period: EvaluationPeriod;
  academicAwareness: AcademicAwareness;
  discipline: DisciplineCompliance;
  politicalSocial: PoliticalSocialActivities;
  civicAwareness: CivicAwareness;
  leadership: LeadershipRole;
  scores: {
    studentSelfScore: number;
    classScore?: number;
  };
  rating: EvaluationRating;
  status: EvaluationStatus;
  studentNotes?: string;
  classNotes?: string;
  advisorNotes?: string;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
}
