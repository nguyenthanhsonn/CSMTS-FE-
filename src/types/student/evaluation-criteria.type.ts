export type EvaluationRating =
  | 'excellent'
  | 'good'
  | 'fair'
  | 'average'
  | 'below_average'
  | 'weak'
  | 'poor';

export interface AcademicPerformance {
  averageScore: number;
  academicRanking: 'excellent' | 'good' | 'average' | 'below_average';
  hasResearchActivity: boolean;
  hasCompetitionAward: boolean;
}

export interface AcademicAwareness {
  attendanceScore: 'ge9' | '7to9' | '5to7' | '4to5' | '1to4';
  attendancePoints: number;
  researchActivities: {
    fullParticipation: boolean;
    hasPublication: boolean;
    hasAward: boolean;
  };
  researchPoints: number;
  researchEvidence: string[];
  academicRank: 'excellent' | 'good' | 'fair' | 'average' | 'weak' | 'weak_warning';
  academicRankPoints: number;
  totalPoints: number;
}

export interface DisciplineViolation {
  lateAttendance: number;
  absenceWithoutPermission: number;
  otherViolations: number;
  penaltyPoints: number;
}

export interface DisciplineCompliance {
  basePoints: number;
  violations: {
    weeklyMeetingAbsence: number;
    weeklyMeetingLate: number;
    classActivityAbsence: number;
    noStudentCard: number;
    facilityViolation: number;
    latePayment: number;
    examWarning: number;
    examViolation: number;
    examSuspension: number;
  };
  totalDeduction: number;
  finalPoints: number;
}

export interface PoliticalSocialActivity {
  participationLevel: 'active' | 'regular' | 'occasional' | 'none';
  culturalSportsLevel: 'active' | 'regular' | 'occasional' | 'none';
  clubParticipation: 'leader' | 'member' | 'none';
  awards: string[];
}

export interface PoliticalSocialActivities {
  politicalActivities: 'full' | 'absent1' | 'absent2' | 'absent3plus';
  politicalPoints: number;
  culturalActivities: 'full_effective' | 'over50' | 'encourage' | 'under50' | 'none';
  culturalPoints: number;
  clubActivities: 'full_effective' | 'active' | 'member' | 'under50' | 'none';
  clubPoints: number;
  antiSocialEvils: 'very_active' | 'active' | 'aware' | 'warned';
  antiSocialPoints: number;
  awards: number;
  awardEvidence: string[];
  totalPoints: number;
}

export interface CommunityActivity {
  policyCompliance: 'excellent' | 'good' | 'average';
  charityParticipation: 'active' | 'regular' | 'occasional' | 'none';
  environmentalAwareness: 'excellent' | 'good' | 'average';
}

export interface CivicAwareness {
  policyCompliance: 'awarded' | 'good_propaganda' | 'comply' | 'warned';
  policyPoints: number;
  policyEvidence: string[];
  charityWork: 'awarded' | 'active' | 'aware' | 'disruptive' | 'none';
  charityPoints: number;
  charityEvidence: string[];
  collectiveBuilding: 'good' | 'warned1' | 'warned2';
  collectivePoints: number;
  totalPoints: number;
}

export interface LeadershipRole {
  roleType: 'class_leader' | 'union_leader' | 'club_leader' | 'regular_student' | 'cadre' | 'regular';
  performanceLevel?: 'excellent' | 'good' | 'average';
  classActivityLevel?: 'active' | 'regular' | 'occasional';
  cadreInfo?: {
    position: 'main_leader' | 'sub_leader';
    performance: 'excellent' | 'good' | 'complete' | 'incomplete';
    performancePoints: number;
    performanceEvidence: string[];
    managementLevel: 'head' | 'deputy' | 'member';
    managementPoints: number;
  };
  regularStudent?: {
    classParticipation: number;
    specialAchievement?: 'university_level' | 'faculty_level' | 'none';
    achievementPoints: number;
    achievementEvidence: string[];
  };
  totalPoints?: number;
}
