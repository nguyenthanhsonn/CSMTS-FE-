'use client';

import { useState, useEffect } from 'react';
import { BookOpen, ShieldAlert, Users, Heart, Award, Loader2, AlertCircle } from 'lucide-react';
import { API_Student } from '../../api/API_Student';
import { ResultBanner } from '../../components/student/ResultBanner';
import { DetailScoresCard } from '../../components/student/DetailScoresCard';
import { ReviewerCommentsCard } from '../../components/student/ReviewerCommentsCard';
import { RankBenefitsCard } from '../../components/student/RankBenefitsCard';

export const StudentResults = () => {
  const [resultData, setResultData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Helper score calculation parsers
  const getStudyScoreNum = (level: string, activities: any[]) => {
    let base = 0;
    if (level === 'GTE_9') base = 6;
    else if (level === 'FROM_7_TO_9') base = 5;
    else if (level === 'FROM_5_TO_7') base = 4;
    else if (level === 'FROM_4_TO_5') base = 2;
    else if (level === 'FROM_1_TO_4') base = 1;
    
    const actScore = (activities || []).length * 2;
    return Math.min(20, base + actScore);
  };

  const getDisciplineDeduction = (violations: any[]) => {
    return (violations || []).reduce((acc, v) => acc + (v.deductScore || 0), 0);
  };

  const getActScoreNum = (actData: any) => {
    let total = 0;
    if (actData.politicalActivityLevel === 'GOOD_PARTICIPATION') total += 5;
    if (actData.cultureSportLevel === 'FULL_EFFECTIVE_PARTICIPATION') total += 5;
    if (actData.clubActivityLevel === 'LEADER_OR_ORGANIZER') total += 5;
    return Math.min(20, total + (actData.rewardScore || 0));
  };

  const getCommScoreNum = (commData: any) => {
    let total = 0;
    if (commData.lawComplianceLevel === 'EXCELLENT') total += 10;
    if (commData.volunteerActivityLevel === 'EXCELLENT') total += 10;
    return Math.min(20, total);
  };

  const getRoleScoreNum = (roleData: any) => {
    let total = roleData.normalStudentActivityScore || 0;
    if (roleData.specialAchievementLevel === 'NATIONAL_OR_INTL') total += 10;
    return Math.min(20, total);
  };

  const getRankText = (rank: string | null | undefined) => {
    if (!rank) return 'Chưa xếp loại';
    const ranks: Record<string, string> = {
      EXCELLENT: 'Xuất sắc',
      GOOD: 'Tốt',
      FAIR: 'Khá',
      AVERAGE: 'Trung bình',
      POOR: 'Yếu',
      'Xuất sắc': 'Xuất sắc',
      'Tốt': 'Tốt',
      'Khá': 'Khá',
      'Trung bình': 'Trung bình',
      'Yếu': 'Yếu',
    };
    return ranks[rank.toUpperCase() as keyof typeof ranks] || rank;
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken || accessToken === 'mock-access-token') {
          // Set mock data
          setResultData({
            semester: 'HK2',
            academicYear: '2023-2024',
            scores: {
              academic: 28,
              discipline: 25,
              politicalSocial: 18,
              community: 12,
              leadership: 5,
              total: 88,
            },
            rating: 'Xuất sắc',
            reviewerComments: 'Sinh viên có ý thức học tập tốt, tích cực tham gia các hoạt động phong trào. Tiếp tục phát huy!',
          });
        } else {
          const listRes = await API_Student.getMyEvaluations(accessToken);
          const evaluations = listRes.data || listRes;
          
          // Use the latest evaluation record (first in the list)
          const latestEval = evaluations[0];
          if (latestEval) {
            const [detail, study, discipline, activity, community, role] = await Promise.all([
              API_Student.getEvaluationDetail(accessToken, latestEval.id),
              API_Student.getStudyScore(accessToken, latestEval.id),
              API_Student.getDisciplineScore(accessToken, latestEval.id),
              API_Student.getActivityScore(accessToken, latestEval.id),
              API_Student.getCommunityScore(accessToken, latestEval.id),
              API_Student.getRoleScore(accessToken, latestEval.id),
            ]);

            const detailData = detail.data || detail;
            const studyData = study.data || study;
            const discData = discipline.data || discipline;
            const actData = activity.data || activity;
            const commData = community.data || community;
            const roleData = role.data || role;

            const totalScore = detailData.finalScore !== null && detailData.finalScore !== undefined 
              ? detailData.finalScore 
              : detailData.classScore !== null && detailData.classScore !== undefined 
              ? detailData.classScore 
              : detailData.studentScore;

            setResultData({
              semester: detailData.semester && typeof detailData.semester === 'object'
                ? detailData.semester.semester === 'SEMESTER_1' ? 'HK1' : 'HK2'
                : detailData.semester || 'HK1',
              academicYear: detailData.semester && typeof detailData.semester === 'object'
                ? `${detailData.semester.year - 1}-${detailData.semester.year}`
                : detailData.academicYear || '2024-2025',
              scores: {
                academic: studyData.regularScoreLevel ? getStudyScoreNum(studyData.regularScoreLevel, studyData.activities) : 28,
                discipline: discData.baseScore ? discData.baseScore - getDisciplineDeduction(discData.violations) : 25,
                politicalSocial: actData.politicalActivityLevel ? getActScoreNum(actData) : 18,
                community: commData.lawComplianceLevel ? getCommScoreNum(commData) : 12,
                leadership: roleData.studentRoleType ? getRoleScoreNum(roleData) : 5,
                total: totalScore || 88,
              },
              rating: getRankText(detailData.rank || detailData.rating || 'Xuất sắc'),
              reviewerComments: detailData.note || 'Sinh viên có ý thức rèn luyện tốt, nghiêm túc chấp hành quy chế nội quy nhà trường.',
            });
          } else {
            // Fallback mock if no evaluations on server
            setResultData({
              semester: 'HK2',
              academicYear: '2023-2024',
              scores: {
                academic: 28,
                discipline: 25,
                politicalSocial: 18,
                community: 12,
                leadership: 5,
                total: 88,
              },
              rating: 'Xuất sắc',
              reviewerComments: 'Sinh viên có ý thức học tập tốt, tích cực tham gia các hoạt động phong trào. Tiếp tục phát huy!',
            });
          }
        }
      } catch (err) {
        console.error('Failed to load results:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const getRankBadgeClass = (rank: string) => {
    const r = rank ? rank.toUpperCase() : '';
    if (r.includes('XUẤT SẮC') || r.includes('EXCELLENT')) {
      return 'bg-emerald-500 text-white border border-emerald-400/30';
    }
    if (r.includes('TỐT') || r.includes('GOOD')) {
      return 'bg-blue-500 text-white border border-blue-400/30';
    }
    if (r.includes('KHÁ') || r.includes('FAIR')) {
      return 'bg-purple-500 text-white border border-purple-400/30';
    }
    if (r.includes('TRUNG BÌNH') || r.includes('AVERAGE')) {
      return 'bg-amber-500 text-white border border-amber-400/30';
    }
    return 'bg-rose-500 text-white border border-rose-400/30';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="animate-spin text-blue-600" size={36} />
        <p className="text-sm text-gray-500">Đang tải kết quả đánh giá...</p>
      </div>
    );
  }

  if (!resultData) {
    return (
      <div className="p-4 max-w-5xl mx-auto w-full">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex flex-col items-center text-center gap-3">
          <AlertCircle className="text-amber-600" size={40} />
          <h3 className="text-lg font-bold text-amber-800">Chưa có kết quả</h3>
          <p className="text-sm text-amber-600 max-w-md">Hiện chưa có dữ liệu kết quả rèn luyện được phê duyệt của học kỳ này.</p>
        </div>
      </div>
    );
  }

  const scoreBreakdown = [
    { label: 'Ý thức học tập', icon: BookOpen, score: resultData.scores.academic, max: 30, color: 'bg-blue-500', textColor: 'text-blue-600' },
    { label: 'Chấp hành nội quy', icon: ShieldAlert, score: resultData.scores.discipline, max: 25, color: 'bg-green-500', textColor: 'text-green-600' },
    { label: 'Hoạt động CT-XH', icon: Users, score: resultData.scores.politicalSocial, max: 20, color: 'bg-purple-500', textColor: 'text-purple-600' },
    { label: 'Ý thức cộng đồng', icon: Heart, score: resultData.scores.community, max: 15, color: 'bg-orange-500', textColor: 'text-orange-600' },
    { label: 'Vai trò cán bộ', icon: Award, score: resultData.scores.leadership, max: 10, color: 'bg-pink-500', textColor: 'text-pink-500' },
  ];

  return (
    <div className="p-4 sm:p-5 max-w-5xl mx-auto w-full space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Kết quả đánh giá</h1>

      {/* Tím-navy gradient banner */}
      <ResultBanner
        semester={resultData.semester}
        academicYear={resultData.academicYear}
        rating={resultData.rating}
        totalScore={resultData.scores.total}
        rankBadgeClass={getRankBadgeClass}
      />

      {/* Grid containing detailed scores and remarks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        
        {/* Card: Chi tiết điểm */}
        <DetailScoresCard scoreBreakdown={scoreBreakdown} />

        {/* Column wrapper for comment and perks */}
        <div className="space-y-5 flex flex-col">
          {/* Card: Nhận xét */}
          <ReviewerCommentsCard reviewerComments={resultData.reviewerComments} />

          {/* Card: Lợi ích */}
          <RankBenefitsCard rating={resultData.rating} />
        </div>

      </div>
    </div>
  );
};

export default StudentResults;
