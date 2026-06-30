import type { Faculty, Major, Class, EvaluationForm, DashboardStats } from '../types';

export const mockFaculties: Faculty[] = [
  { id: '1', code: 'CNTT', name: 'Công nghệ thông tin', isActive: true },
  { id: '2', code: 'KTDL', name: 'Kinh tế - Du lịch', isActive: true },
  { id: '3', code: 'NNNN', name: 'Ngoại ngữ', isActive: true },
  { id: '4', code: 'GDTH', name: 'Giáo dục thể chất', isActive: true },
];

export const mockMajors: Major[] = [
  { id: '1', code: 'CNTT', name: 'Công nghệ thông tin', facultyId: '1', isActive: true },
  { id: '2', code: 'KTPM', name: 'Kỹ thuật phần mềm', facultyId: '1', isActive: true },
  { id: '3', code: 'QTKD', name: 'Quản trị kinh doanh', facultyId: '2', isActive: true },
  { id: '4', code: 'TA', name: 'Tiếng Anh', facultyId: '3', isActive: true },
];

export const mockClasses: Class[] = [
  { id: '1', code: 'CNTT-K18', name: 'CNTT K18', majorId: '1', facultyId: '1', isActive: true },
  { id: '2', code: 'KTPM-K18', name: 'KTPM K18', majorId: '2', facultyId: '1', isActive: true },
  { id: '3', code: 'QTKD-K18', name: 'QTKD K18', majorId: '3', facultyId: '2', isActive: true },
];

export const mockDashboardStats: DashboardStats = {
  totalUsers: 1250,
  totalStudents: 1200,
  totalAdmins: 50,
  totalFaculties: 4,
  totalMajors: 15,
  totalClasses: 48,
};

export const createMockEvaluationForm = (studentId: string): EvaluationForm => ({
  id: `eval-${Date.now()}`,
  studentId,
  period: {
    semester: 'HK1',
    academicYear: '2024-2025',
    deadline: '2025-12-31',
  },
  status: 'draft',
  academicPerformance: {
    averageScore: 0,
    academicRanking: 'average',
    hasResearchActivity: false,
    hasCompetitionAward: false,
  },
  discipline: {
    lateAttendance: 0,
    absenceWithoutPermission: 0,
    otherViolations: 0,
    penaltyPoints: 0,
  },
  politicalSocial: {
    participationLevel: 'none',
    culturalSportsLevel: 'none',
    clubParticipation: 'none',
    awards: [],
  },
  community: {
    policyCompliance: 'average',
    charityParticipation: 'none',
    environmentalAwareness: 'average',
  },
  leadership: {
    roleType: 'regular_student',
  },
  evidences: [],
  scores: {
    academic: 0,
    discipline: 100,
    politicalSocial: 0,
    community: 0,
    leadership: 0,
    total: 0,
  },
  rating: 'average',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
