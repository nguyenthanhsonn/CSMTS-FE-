// User Types
export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  isActive: boolean;
}

export interface Student extends User {
  role: 'student';
  studentCode: string;
  fullName: string;
  dateOfBirth: string;
  className: string;
  major: string;
  faculty: string;
  admissionYear: number;
  phoneNumber?: string;
}

export interface Admin extends User {
  role: 'admin';
  fullName: string;
  email: string;
}

// Academic Types
export interface Faculty {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
}

export interface Major {
  id: string;
  code: string;
  name: string;
  facultyId: string;
  isActive: boolean;
}

export interface Class {
  id: string;
  code: string;
  name: string;
  majorId: string;
  facultyId: string;
  isActive: boolean;
}

// Evaluation Types
export type EvaluationStatus = 
  | 'draft' 
  | 'submitted' 
  | 'class_reviewed' 
  | 'advisor_reviewed' 
  | 'faculty_approved'
  | 'rejected';

export interface EvaluationPeriod {
  semester: string;
  academicYear: string;
  deadline: string;
}

export interface AcademicPerformance {
  averageScore: number;
  academicRanking: 'excellent' | 'good' | 'average' | 'below_average';
  hasResearchActivity: boolean;
  hasCompetitionAward: boolean;
}

export interface DisciplineViolation {
  lateAttendance: number;
  absenceWithoutPermission: number;
  otherViolations: number;
  penaltyPoints: number;
}

export interface PoliticalSocialActivity {
  participationLevel: 'active' | 'regular' | 'occasional' | 'none';
  culturalSportsLevel: 'active' | 'regular' | 'occasional' | 'none';
  clubParticipation: 'leader' | 'member' | 'none';
  awards: string[];
}

export interface CommunityActivity {
  policyCompliance: 'excellent' | 'good' | 'average';
  charityParticipation: 'active' | 'regular' | 'occasional' | 'none';
  environmentalAwareness: 'excellent' | 'good' | 'average';
}

export interface LeadershipRole {
  roleType: 'class_leader' | 'union_leader' | 'club_leader' | 'regular_student';
  performanceLevel?: 'excellent' | 'good' | 'average';
  classActivityLevel?: 'active' | 'regular' | 'occasional';
}

export interface Evidence {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  criteriaId: string;
  uploadDate: string;
  aiVerification?: 'verified' | 'suspicious' | 'manual_review';
}

export interface EvaluationForm {
  id: string;
  studentId: string;
  period: EvaluationPeriod;
  status: EvaluationStatus;
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
  rating: 'excellent' | 'good' | 'average' | 'below_average' | 'poor';
  comments?: string;
  reviewerComments?: string;
  submittedAt?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalUsers: number;
  totalStudents: number;
  totalAdmins: number;
  totalFaculties: number;
  totalMajors: number;
  totalClasses: number;
}
