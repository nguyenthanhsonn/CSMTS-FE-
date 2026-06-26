import { EvaluationForm } from '../types';

// Tính điểm học tập (max 30 điểm)
export const calculateAcademicScore = (form: EvaluationForm): number => {
  let score = 0;
  const { academicPerformance } = form;

  // Điểm trung bình (max 20 điểm)
  if (academicPerformance.averageScore >= 3.6) score += 20;
  else if (academicPerformance.averageScore >= 3.2) score += 18;
  else if (academicPerformance.averageScore >= 2.5) score += 16;
  else if (academicPerformance.averageScore >= 2.0) score += 14;
  else score += 10;

  // Xếp loại học tập (max 5 điểm)
  switch (academicPerformance.academicRanking) {
    case 'excellent': score += 5; break;
    case 'good': score += 4; break;
    case 'average': score += 3; break;
    default: score += 2;
  }

  // Hoạt động nghiên cứu khoa học (max 5 điểm)
  if (academicPerformance.hasResearchActivity) score += 3;
  if (academicPerformance.hasCompetitionAward) score += 2;

  return Math.min(score, 30);
};

// Tính điểm nội quy (max 25 điểm, có trừ điểm)
export const calculateDisciplineScore = (form: EvaluationForm): number => {
  const base = 25;
  const { discipline } = form;
  
  let penalty = 0;
  penalty += discipline.lateAttendance * 1; // Mỗi lần đi trễ trừ 1 điểm
  penalty += discipline.absenceWithoutPermission * 2; // Mỗi buổi vắng không phép trừ 2 điểm
  penalty += discipline.otherViolations * 3; // Vi phạm khác trừ 3 điểm

  return Math.max(base - penalty, 0);
};

// Tính điểm hoạt động chính trị xã hội (max 20 điểm)
export const calculatePoliticalSocialScore = (form: EvaluationForm): number => {
  let score = 0;
  const { politicalSocial } = form;

  // Tham gia hoạt động chính trị (max 10 điểm)
  switch (politicalSocial.participationLevel) {
    case 'active': score += 10; break;
    case 'regular': score += 7; break;
    case 'occasional': score += 5; break;
    default: score += 0;
  }

  // Văn hóa thể thao (max 5 điểm)
  switch (politicalSocial.culturalSportsLevel) {
    case 'active': score += 5; break;
    case 'regular': score += 3; break;
    case 'occasional': score += 2; break;
    default: score += 0;
  }

  // Câu lạc bộ (max 5 điểm)
  switch (politicalSocial.clubParticipation) {
    case 'leader': score += 5; break;
    case 'member': score += 3; break;
    default: score += 0;
  }

  return Math.min(score, 20);
};

// Tính điểm ý thức cộng đồng (max 15 điểm)
export const calculateCommunityScore = (form: EvaluationForm): number => {
  let score = 0;
  const { community } = form;

  // Chấp hành chính sách (max 5 điểm)
  switch (community.policyCompliance) {
    case 'excellent': score += 5; break;
    case 'good': score += 4; break;
    default: score += 3;
  }

  // Hoạt động từ thiện (max 5 điểm)
  switch (community.charityParticipation) {
    case 'active': score += 5; break;
    case 'regular': score += 4; break;
    case 'occasional': score += 3; break;
    default: score += 0;
  }

  // Ý thức môi trường (max 5 điểm)
  switch (community.environmentalAwareness) {
    case 'excellent': score += 5; break;
    case 'good': score += 4; break;
    default: score += 3;
  }

  return Math.min(score, 15);
};

// Tính điểm vai trò cán bộ (max 10 điểm)
export const calculateLeadershipScore = (form: EvaluationForm): number => {
  let score = 0;
  const { leadership } = form;

  switch (leadership.roleType) {
    case 'class_leader':
    case 'union_leader':
    case 'club_leader':
      if (leadership.performanceLevel === 'excellent') score = 10;
      else if (leadership.performanceLevel === 'good') score = 8;
      else score = 6;
      break;
    case 'regular_student':
      if (leadership.classActivityLevel === 'active') score = 5;
      else if (leadership.classActivityLevel === 'regular') score = 3;
      else if (leadership.classActivityLevel === 'occasional') score = 2;
      else score = 0;
      break;
  }

  return Math.min(score, 10);
};

// Tính tổng điểm và xếp loại
export const calculateTotalScore = (form: EvaluationForm): EvaluationForm => {
  const scores = {
    academic: calculateAcademicScore(form),
    discipline: calculateDisciplineScore(form),
    politicalSocial: calculatePoliticalSocialScore(form),
    community: calculateCommunityScore(form),
    leadership: calculateLeadershipScore(form),
    total: 0,
  };

  scores.total = 
    scores.academic + 
    scores.discipline + 
    scores.politicalSocial + 
    scores.community + 
    scores.leadership;

  let rating: EvaluationForm['rating'];
  if (scores.total >= 90) rating = 'excellent';
  else if (scores.total >= 80) rating = 'good';
  else if (scores.total >= 65) rating = 'average';
  else if (scores.total >= 50) rating = 'below_average';
  else rating = 'poor';

  return {
    ...form,
    scores,
    rating,
    updatedAt: new Date().toISOString(),
  };
};
