import type { CompleteEvaluation } from '../types/student';

// Mục I: Tính điểm ý thức học tập (max 20 điểm)
export const calculateAcademicAwareness = (evaluation: CompleteEvaluation): number => {
  const { academicAwareness } = evaluation;
  
  // 1. Điểm ý thức chuyên cần (0-6)
  const attendanceMap = {
    'ge9': 6,
    '7to9': 5,
    '5to7': 4,
    '4to5': 2,
    '1to4': 1,
  };
  const attendancePoints = attendanceMap[academicAwareness.attendanceScore];
  
  // 2. Điểm hoạt động NCKH (0-6)
  let researchPoints = 0;
  if (academicAwareness.researchActivities.fullParticipation) researchPoints += 2;
  if (academicAwareness.researchActivities.hasPublication) researchPoints += 2;
  if (academicAwareness.researchActivities.hasAward) researchPoints += 2;
  
  // 3. Điểm xếp loại học tập (0-8)
  const rankMap = {
    'excellent': 8,
    'good': 7,
    'fair': 6,
    'average': 4,
    'weak': 2,
    'weak_warning': 1,
  };
  const rankPoints = rankMap[academicAwareness.academicRank];
  
  const total = attendancePoints + researchPoints + rankPoints;
  return Math.min(total, 20);
};

// Mục II: Tính điểm chấp hành nội quy (max 25 điểm)
export const calculateDiscipline = (evaluation: CompleteEvaluation): number => {
  const { violations } = evaluation.discipline;
  
  let deduction = 0;
  deduction += violations.weeklyMeetingAbsence * 10;
  deduction += violations.weeklyMeetingLate * 3;
  deduction += violations.classActivityAbsence * 5;
  deduction += violations.noStudentCard * 5;
  deduction += violations.facilityViolation * 5;
  deduction += violations.latePayment * 5;
  deduction += violations.examWarning * 5;
  deduction += violations.examViolation * 10;
  deduction += violations.examSuspension * 20;
  
  const finalPoints = Math.max(25 - deduction, 0);
  return finalPoints;
};

// Mục III: Tính điểm hoạt động chính trị xã hội (max 20 điểm)
export const calculatePoliticalSocial = (evaluation: CompleteEvaluation): number => {
  const { politicalSocial } = evaluation;
  
  // 1. Hoạt động chính trị (0-5)
  const politicalMap = {
    'full': 5,
    'absent1': 3,
    'absent2': 2,
    'absent3plus': 0,
  };
  const politicalPoints = politicalMap[politicalSocial.politicalActivities];
  
  // 2. Văn hóa thể thao (0-5)
  const culturalMap = {
    'full_effective': 5,
    'over50': 3,
    'encourage': 2,
    'under50': 1,
    'none': 0,
  };
  const culturalPoints = culturalMap[politicalSocial.culturalActivities];
  
  // 3. CLB (0-5)
  const clubMap = {
    'full_effective': 5,
    'active': 3,
    'member': 2,
    'under50': 1,
    'none': 0,
  };
  const clubPoints = clubMap[politicalSocial.clubActivities];
  
  // 4. Phòng chống TNXH (0-3)
  const antiSocialMap = {
    'very_active': 3,
    'active': 2,
    'aware': 1,
    'warned': 0,
  };
  const antiSocialPoints = antiSocialMap[politicalSocial.antiSocialEvils];
  
  // 5. Khen thưởng (0-2)
  const awardPoints = Math.min(politicalSocial.awards, 2);
  
  const total = politicalPoints + culturalPoints + clubPoints + antiSocialPoints + awardPoints;
  return Math.min(total, 20);
};

// Mục IV: Tính điểm ý thức công dân (max 25 điểm)
export const calculateCivicAwareness = (evaluation: CompleteEvaluation): number => {
  const { civicAwareness } = evaluation;
  
  // 1. Chính sách pháp luật (0-10)
  const policyMap = {
    'awarded': 10,
    'good_propaganda': 8,
    'comply': 5,
    'warned': 0,
  };
  const policyPoints = policyMap[civicAwareness.policyCompliance];
  
  // 2. Từ thiện (0-10)
  const charityMap = {
    'awarded': 10,
    'active': 8,
    'aware': 5,
    'disruptive': 0,
    'none': 0,
  };
  const charityPoints = charityMap[civicAwareness.charityWork];
  
  // 3. Xây dựng tập thể (0-5)
  const collectiveMap = {
    'good': 5,
    'warned1': 1,
    'warned2': 0,
  };
  const collectivePoints = collectiveMap[civicAwareness.collectiveBuilding];
  
  const total = policyPoints + charityPoints + collectivePoints;
  return Math.min(total, 25);
};

// Mục V: Tính điểm vai trò cán bộ (max 10 điểm)
export const calculateLeadership = (evaluation: CompleteEvaluation): number => {
  const { leadership } = evaluation;
  
  if (leadership.roleType === 'cadre' && leadership.cadreInfo) {
    const { cadreInfo } = leadership;
    
    // Điểm ý thức tinh thần (0-7)
    let performancePoints = 0;
    if (cadreInfo.position === 'main_leader') {
      const perfMap = { 'excellent': 7, 'good': 6, 'complete': 4, 'incomplete': 0 };
      performancePoints = perfMap[cadreInfo.performance];
    } else {
      const perfMap = { 'excellent': 7, 'good': 6, 'complete': 5, 'average': 3, 'incomplete': 0 };
      performancePoints = perfMap[cadreInfo.performance] || 0;
    }
    
    // Điểm kỹ năng tổ chức (0-3)
    const managementMap = { 'head': 3, 'deputy': 2, 'member': 1 };
    const managementPoints = managementMap[cadreInfo.managementLevel];
    
    return Math.min(performancePoints + managementPoints, 10);
  } else if (leadership.roleType === 'regular' && leadership.regularStudent) {
    const { regularStudent } = leadership;
    
    // Điểm tham gia hoạt động (0-3)
    const participationPoints = Math.min(Math.max(regularStudent.classParticipation, 0), 3);
    
    // Điểm thành tích đặc biệt (0-7)
    const achievementMap = {
      'university_level': 7,
      'faculty_level': 5,
      'none': 0,
    };
    const achievementPoints = regularStudent.specialAchievement 
      ? achievementMap[regularStudent.specialAchievement] 
      : 0;
    
    return Math.min(participationPoints + achievementPoints, 10);
  }
  
  return 0;
};

// Tính tổng điểm và xếp loại
export const calculateTotalScore = (evaluation: CompleteEvaluation): CompleteEvaluation => {
  const academicPoints = calculateAcademicAwareness(evaluation);
  const disciplinePoints = calculateDiscipline(evaluation);
  const politicalPoints = calculatePoliticalSocial(evaluation);
  const civicPoints = calculateCivicAwareness(evaluation);
  const leadershipPoints = calculateLeadership(evaluation);
  
  const totalScore = academicPoints + disciplinePoints + politicalPoints + civicPoints + leadershipPoints;
  
  // Xếp loại theo quy định
  let rating: CompleteEvaluation['rating'];
  if (totalScore >= 90) rating = 'excellent';
  else if (totalScore >= 80) rating = 'good';
  else if (totalScore >= 65) rating = 'fair';
  else if (totalScore >= 50) rating = 'average';
  else if (totalScore >= 35) rating = 'weak';
  else rating = 'poor';
  
  return {
    ...evaluation,
    academicAwareness: {
      ...evaluation.academicAwareness,
      totalPoints: academicPoints,
    },
    discipline: {
      ...evaluation.discipline,
      totalDeduction: 25 - disciplinePoints,
      finalPoints: disciplinePoints,
    },
    politicalSocial: {
      ...evaluation.politicalSocial,
      totalPoints: politicalPoints,
    },
    civicAwareness: {
      ...evaluation.civicAwareness,
      totalPoints: civicPoints,
    },
    leadership: {
      ...evaluation.leadership,
      totalPoints: leadershipPoints,
    },
    scores: {
      ...evaluation.scores,
      studentSelfScore: totalScore,
    },
    rating,
    updatedAt: new Date().toISOString(),
  };
};

// Validate evaluation form
export const validateEvaluation = (evaluation: CompleteEvaluation): string[] => {
  const errors: string[] = [];
  
  // Kiểm tra thông tin sinh viên
  if (!evaluation.studentInfo.studentCode) errors.push('Chưa nhập mã sinh viên');
  if (!evaluation.studentInfo.fullName) errors.push('Chưa nhập họ tên');
  if (!evaluation.studentInfo.dateOfBirth) errors.push('Chưa nhập ngày sinh');
  if (!evaluation.studentInfo.classId) errors.push('Chưa chọn lớp');
  if (!evaluation.studentInfo.majorId) errors.push('Chưa chọn ngành');
  if (!evaluation.studentInfo.facultyId) errors.push('Chưa chọn khoa');
  
  // Kiểm tra minh chứng bắt buộc
  if (evaluation.academicAwareness.researchActivities.hasAward && 
      evaluation.academicAwareness.researchEvidence.length === 0) {
    errors.push('Cần có minh chứng cho giải NCKH/Olympic');
  }
  
  if (evaluation.politicalSocial.awards > 0 && 
      evaluation.politicalSocial.awardEvidence.length === 0) {
    errors.push('Cần có minh chứng cho khen thưởng hoạt động');
  }
  
  return errors;
};
