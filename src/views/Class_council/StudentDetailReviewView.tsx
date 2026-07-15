'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, FileText, Loader2, Paperclip, Send } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import CouncilCriteriaReviewTable from '@/components/class_council/CouncilCriteriaReviewTable';
import EvidenceReviewModal, { type ReviewEvidence } from '@/components/class_council/EvidenceReviewModal';

interface ReviewStudent {
  id: string;
  code: string;
  fullName: string;
}

const mockStudents: Record<string, ReviewStudent> = {
  sv001: { id: 'sv001', code: '2251120001', fullName: 'Nguyễn An Bình' },
  sv002: { id: 'sv002', code: '2251120002', fullName: 'Trần Minh Châu' },
  sv004: { id: 'sv004', code: '2251120004', fullName: 'Phạm Hoàng Gia Hân' },
  sv005: { id: 'sv005', code: '2251120005', fullName: 'Võ Nhật Khang' },
  sv101: { id: 'sv101', code: '2251120101', fullName: 'Đỗ Thanh Mai' },
};

const mockEvidences: ReviewEvidence[] = [
  {
    id: 'ev-1',
    fileName: 'xac-nhan-khong-vi-pham.pdf',
    fileType: 'pdf',
    url: 'https://example.com/xac-nhan-khong-vi-pham.pdf',
    status: 'pending',
  },
  {
    id: 'ev-2',
    fileName: 'anh-hoat-dong-doan.jpg',
    fileType: 'image',
    url: 'https://example.com/anh-hoat-dong-doan.jpg',
    status: 'pending',
  },
];

const getParam = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value ?? '');

export function StudentDetailReviewView() {
  const router = useRouter();
  const params = useParams();
  const classId = getParam(params.classId);
  const studentId = getParam(params.studentId);
  const [loading, setLoading] = useState(true);
  const [hasEvaluation, setHasEvaluation] = useState(false);
  const [, setIsClassEdited] = useState(false);
  const [evidences, setEvidences] = useState<ReviewEvidence[]>(mockEvidences);
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [isSubmittedLate, setIsSubmittedLate] = useState(false);

  const [isSvViolationSec1, setIsSvViolationSec1] = useState(false);
  const [isClassViolationSec1, setIsClassViolationSec1] = useState(false);
  const [isSvViolationSec2, setIsSvViolationSec2] = useState(false);
  const [isClassViolationSec2, setIsClassViolationSec2] = useState(false);
  const [isSvViolationSec3, setIsSvViolationSec3] = useState(false);
  const [isClassViolationSec3, setIsClassViolationSec3] = useState(false);
  const [isSvViolationSec4, setIsSvViolationSec4] = useState(false);
  const [isClassViolationSec4, setIsClassViolationSec4] = useState(false);
  const [isSvViolationSec5, setIsSvViolationSec5] = useState(false);
  const [isClassViolationSec5, setIsClassViolationSec5] = useState(false);

  const [svStudyAttitude, setSvStudyAttitude] = useState('good');
  const [svNckh, setSvNckh] = useState(true);
  const [svOlympic, setSvOlympic] = useState(false);
  const [svCreative, setSvCreative] = useState(true);
  const [svAcademicRank, setSvAcademicRank] = useState('good');
  const [classStudyAttitude, setClassStudyAttitude] = useState('good');
  const [classNckh, setClassNckh] = useState(true);
  const [classOlympic, setClassOlympic] = useState(false);
  const [classCreative, setClassCreative] = useState(true);
  const [classAcademicRank, setClassAcademicRank] = useState('good');

  const [svNoViolationScore, setSvNoViolationScore] = useState(25);
  const [svDeductions, setSvDeductions] = useState([0, 1, 0, 0, 0, 0, 0, 0, 0]);
  const [classNoViolationScore, setClassNoViolationScore] = useState(25);
  const [classDeductions, setClassDeductions] = useState([0, 1, 0, 0, 0, 0, 0, 0, 0]);

  const [svActivity1, setSvActivity1] = useState('GOOD_PARTICIPATION');
  const [svActivity2, setSvActivity2] = useState('some');
  const [svActivity3, setSvActivity3] = useState('active');
  const [svActivity4, setSvActivity4] = useState('active');
  const [svRewardPoints, setSvRewardPoints] = useState(1);
  const [classActivity1, setClassActivity1] = useState('GOOD_PARTICIPATION');
  const [classActivity2, setClassActivity2] = useState('some');
  const [classActivity3, setClassActivity3] = useState('active');
  const [classActivity4, setClassActivity4] = useState('active');
  const [classRewardPoints, setClassRewardPoints] = useState(1);

  const [svPolicy, setSvPolicy] = useState('GOOD');
  const [svSolidarity, setSvSolidarity] = useState('regular');
  const [svLocality, setSvLocality] = useState('GOOD');
  const [classPolicy, setClassPolicy] = useState('GOOD');
  const [classSolidarity, setClassSolidarity] = useState('regular');
  const [classLocality, setClassLocality] = useState('GOOD');

  const [svRoleType, setSvRoleType] = useState<'cadre' | 'student'>('student');
  const [svCadrePosition, setSvCadrePosition] = useState<'a1' | 'a2'>('a2');
  const [svCadrePerformance, setSvCadrePerformance] = useState('good');
  const [svManagementLevel, setSvManagementLevel] = useState('none');
  const [svClassParticipation, setSvClassParticipation] = useState(2);
  const [svSpecialAchievement, setSvSpecialAchievement] = useState('provincial');
  const [classRoleType, setClassRoleType] = useState<'cadre' | 'student'>('student');
  const [classCadrePosition, setClassCadrePosition] = useState<'a1' | 'a2'>('a2');
  const [classCadrePerformance, setClassCadrePerformance] = useState('good');
  const [classManagementLevel, setClassManagementLevel] = useState('none');
  const [classClassParticipation, setClassClassParticipation] = useState(2);
  const [classSpecialAchievement, setClassSpecialAchievement] = useState('provincial');

  const student = useMemo(() => mockStudents[studentId], [studentId]);

  const deductionWeights = useMemo(() => [10, 3, 5, 5, 5, 5, 5, 10, 20], []);
  const deductionLabels = useMemo(() => [
    'Không tham gia nghiêm túc tuần sinh hoạt công dân / bài thu hoạch không đạt (TBCHT < 5) (Trừ 10đ)',
    'Nghỉ không lý do các chuyên đề tuần sinh hoạt công dân-SV (Trừ 3đ/buổi)',
    'Không tham gia sinh hoạt lớp, họp, hội nghị, giao ban, tập huấn... (Trừ 5đ/buổi)',
    'Không đeo thẻ SV / không mặc đồng phục GDTC / hút thuốc / xả rác (Trừ 5đ/lần)',
    'Vi phạm quy định giảng đường, thư viện, nơi cư trú (Trừ 5đ/lần)',
    'Chậm đóng học phí / lệ phí / BHYT / nộp hồ sơ (Trừ 5đ/lần)',
    'Bị khiển trách, nhắc nhở trong phòng thi (Trừ 5đ/lần)',
    'Vi phạm quy chế thi ở mức cảnh cáo / trừ điểm thi (Trừ 10đ/lần)',
    'Vi phạm quy chế thi bị đình chỉ thi (Trừ 20đ/lần)',
  ], []);

  const scoreMaps = useMemo(() => ({
    studyAttitude: { very_good: 6, good: 5, fair: 4, average: 2, poor: 1, none: 0 } as Record<string, number>,
    academicRank: { excellent: 8, good: 7, fair: 6, average: 4, weak_no_warn: 2, weak_warn: 1, none: 0 } as Record<string, number>,
    activity1: { GOOD_PARTICIPATION: 5, ABSENT_ONCE: 3, ABSENT_TWICE: 2, ABSENT_MORE_THAN_TWICE_OR_NOT_PARTICIPATED: 0, active: 5, full: 3, excused: 2, unexcused: 0 } as Record<string, number>,
    activity2: { many: 5, some: 3, active: 2, full: 1, none: 0 } as Record<string, number>,
    activity3: { prize_or_org: 5, active: 3, some: 2, full: 1, none: 0 } as Record<string, number>,
    activity4: { active: 3, full: 2, some: 1, none: 0 } as Record<string, number>,
    policy: { GOOD_WITH_REWARD: 10, GOOD: 8, AVERAGE: 5, VIOLATED: 0, excellent_propaganda: 10, good: 8, minor_violation: 5, none: 0 } as Record<string, number>,
    solidarity: { excellent_achievements: 10, regular: 8, some: 5, none: 0 } as Record<string, number>,
    locality: { GOOD: 5, ONE_WARNING: 1, TWO_WARNINGS: 0, good: 5, rewarded: 1, warned: 0 } as Record<string, number>,
  }), []);

  useEffect(() => {
    // TODO: nối API lấy chi tiết phiếu tự đánh giá của sinh viên và điểm từng tiêu chí con.
    setLoading(true);
    const timer = window.setTimeout(() => {
      setHasEvaluation(!!student);
      setLoading(false);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [student]);

  const clampScore = (value: number, max: number) => Math.min(max, Math.max(0, Number.isFinite(value) ? value : 0));

  const calculateTotalPoints = (isSv: boolean) => {
    const sec1Violation = isSv ? isSvViolationSec1 : isClassViolationSec1;
    const sec2Violation = isSv ? isSvViolationSec2 : isClassViolationSec2;
    const sec3Violation = isSv ? isSvViolationSec3 : isClassViolationSec3;
    const sec4Violation = isSv ? isSvViolationSec4 : isClassViolationSec4;
    const sec5Violation = isSv ? isSvViolationSec5 : isClassViolationSec5;

    const sec1 = sec1Violation
      ? 0
      : clampScore(
          (scoreMaps.studyAttitude[isSv ? svStudyAttitude : classStudyAttitude] || 0) +
            (isSv ? (svNckh ? 2 : 0) + (svOlympic ? 2 : 0) + (svCreative ? 2 : 0) : (classNckh ? 2 : 0) + (classOlympic ? 2 : 0) + (classCreative ? 2 : 0)) +
            (scoreMaps.academicRank[isSv ? svAcademicRank : classAcademicRank] || 0),
          20
        );

    const noViolationBase = isSv ? svNoViolationScore : classNoViolationScore;
    const deductions = isSv ? svDeductions : classDeductions;
    const totalDeduction = deductions.reduce((sum, count, index) => sum + count * deductionWeights[index], 0);
    const sec2 = sec2Violation ? 0 : clampScore(noViolationBase - totalDeduction, 25);

    const sec3 = sec3Violation
      ? 0
      : clampScore(
          (scoreMaps.activity1[isSv ? svActivity1 : classActivity1] || 0) +
            (scoreMaps.activity2[isSv ? svActivity2 : classActivity2] || 0) +
            (scoreMaps.activity3[isSv ? svActivity3 : classActivity3] || 0) +
            (scoreMaps.activity4[isSv ? svActivity4 : classActivity4] || 0) +
            (isSv ? svRewardPoints : classRewardPoints),
          20
        );

    const sec4 = sec4Violation
      ? 0
      : clampScore(
          (scoreMaps.policy[isSv ? svPolicy : classPolicy] || 0) +
            (scoreMaps.solidarity[isSv ? svSolidarity : classSolidarity] || 0) +
            (scoreMaps.locality[isSv ? svLocality : classLocality] || 0),
          25
        );

    let sec5 = 0;
    if (!sec5Violation) {
      const roleType = isSv ? svRoleType : classRoleType;
      if (roleType === 'cadre') {
        const position = isSv ? svCadrePosition : classCadrePosition;
        const performance = isSv ? svCadrePerformance : classCadrePerformance;
        const management = isSv ? svManagementLevel : classManagementLevel;
        const perfMap = position === 'a1'
          ? { excellent: 7, good: 6, average: 4, unsatisfactory: 0 }
          : { excellent: 6, good: 5, average: 3, unsatisfactory: 0 };
        const mgmtMap: Record<string, number> = { head: 3, deputy: 2, member: 1, none: 0 };
        sec5 = clampScore((perfMap[performance as keyof typeof perfMap] || 0) + (mgmtMap[management] || 0), 10);
      } else {
        const achievementMap: Record<string, number> = { national_intl: 7, provincial: 5, none: 0 };
        sec5 = clampScore((isSv ? svClassParticipation : classClassParticipation) + (achievementMap[isSv ? svSpecialAchievement : classSpecialAchievement] || 0), 10);
      }
    }

    return { sec1, sec2, sec3, sec4, sec5, total: clampScore(sec1 + sec2 + sec3 + sec4 + sec5, 100) };
  };

  const svScores = calculateTotalPoints(true);
  const classScores = calculateTotalPoints(false);

  const uploadedFiles = useMemo<Record<string, string[]>>(() => ({
    sv_nckh: ['xac-nhan-nckh.pdf'],
    sv_creative: ['clb-hoc-thuat.jpg'],
    sv_reward: ['giay-khen-doan-truong.pdf'],
    sv_special_ach: ['giai-thuong-cap-tinh.pdf'],
  }), []);

  const handleDeductionChange = (isSv: boolean, index: number, value: number) => {
    const baseScore = isSv ? svNoViolationScore : classNoViolationScore;
    const setter = isSv ? setSvDeductions : setClassDeductions;
    setter((current) => {
      const weight = deductionWeights[index] || 0;
      const sumOther = current.reduce((sum, count, idx) => idx === index ? sum : sum + (Number(count) || 0) * deductionWeights[idx], 0);
      const remainingScore = Math.max(0, baseScore - sumOther);
      const maxTimes = weight > 0 ? Math.ceil(remainingScore / weight) : 0;
      return current.map((count, idx) => (idx === index ? Math.min(maxTimes, Math.max(0, value)) : count));
    });
  };

  const handleFileUpload = () => {
    // TODO: nối API upload/duyệt minh chứng khi backend hỗ trợ luồng cố vấn lớp.
  };

  const removeFile = () => {
    // TODO: nối API xóa minh chứng khi backend hỗ trợ luồng cố vấn lớp.
  };

  const updateEvidence = (evidenceId: string, patch: Partial<ReviewEvidence>) => {
    setEvidences((current) =>
      current.map((evidence) => (evidence.id === evidenceId ? { ...evidence, ...patch } : evidence))
    );
  };

  const handleApprove = () => {
    // TODO: nối API duyệt phiếu điểm rèn luyện của sinh viên với chi tiết điểm từng tiêu chí con.
    router.push(`/class_council/${classId}`);
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => router.push(`/class_council/${classId}`)}
            className="mb-2 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#3B5BDB] hover:text-[#4C6EF5]"
          >
            <ArrowLeft size={16} />
            Quay lại danh sách sinh viên
          </button>
          <h1 className="ui-page-title">{student?.fullName ?? 'Sinh viên'}</h1>
          <p className="mt-1 text-sm text-[#868E96]">Mã SV: {student?.code ?? studentId}</p>
        </div>
        {!loading && hasEvaluation && (
          <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
            <div className="rounded-xl border border-[#E9ECEF] bg-white p-4">
              <p className="text-xs font-semibold text-[#868E96]">SV tự chấm</p>
              <p className="mt-1 text-2xl font-bold text-[#1A1B1E]">{svScores.total.toFixed(2)}</p>
            </div>
            <div className="rounded-xl border border-[#E9ECEF] bg-white p-4">
              <p className="text-xs font-semibold text-[#868E96]">Lớp/GVCN</p>
              <p className="mt-1 text-2xl font-bold text-[#3B5BDB]">{classScores.total.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center gap-2.5 rounded-xl border border-[#E9ECEF] bg-white p-6 shadow-sm">
          <Loader2 className="animate-spin text-[#3B5BDB]" size={34} />
          <p className="text-sm font-semibold text-[#868E96]">Đang tải phiếu đánh giá...</p>
        </div>
      ) : !student || !hasEvaluation ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-dashed border-[#DEE2E6] bg-white p-6 text-center">
          <FileText size={38} className="text-[#ADB5BD]" />
          <h2 className="mt-3 text-base font-bold text-[#1A1B1E]">Không có phiếu đánh giá</h2>
          <p className="mt-1 max-w-md text-sm text-[#868E96]">
            Sinh viên này chưa có phiếu đã nộp hoặc dữ liệu không còn khả dụng trong lớp phụ trách.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 rounded-xl border border-[#E9ECEF] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1A1B1E]">Bảng chấm chi tiết từng tiêu chí</h2>
              <p className="mt-1 text-xs text-[#868E96]">Cột Cá nhân đánh giá là điểm sinh viên đã tự chấm; Cố vấn lớp chỉ chỉnh cột Lớp/GVCN đánh giá.</p>
            </div>
            <button
              type="button"
              onClick={() => setEvidenceModalOpen(true)}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#DEE2E6] bg-white px-4 py-2.5 text-sm font-semibold text-[#3B5BDB] transition hover:bg-[#EDF2FF]"
            >
              <Paperclip size={16} />
              Xem minh chứng đính kèm
            </button>
          </div>

          {/* Special Compliance Flags */}
          <div className="flex flex-col sm:flex-row gap-4 p-4 bg-red-50/40 border border-red-100 rounded-xl">
            <label className="flex items-center gap-2 text-xs font-bold text-red-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isSuspended}
                onChange={(e) => setIsSuspended(e.target.checked)}
                className="h-4 w-4 rounded text-red-600 focus:ring-red-500 cursor-pointer"
              />
              Bị đình chỉ học tập từ 30 ngày trở xuống (Xếp loại không quá Khá)
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-amber-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isSubmittedLate}
                onChange={(e) => setIsSubmittedLate(e.target.checked)}
                className="h-4 w-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
              Nộp phiếu trễ hạn / Không đúng hạn (Xếp loại Yếu/Kém)
            </label>
          </div>

          <CouncilCriteriaReviewTable
            currentUserRole="class"
            setIsClassEdited={setIsClassEdited}
            isReadOnly={false}
            svScores={svScores}
            classScores={classScores}
            svStudyAttitude={svStudyAttitude}
            setSvStudyAttitude={setSvStudyAttitude}
            svNckh={svNckh}
            setSvNckh={setSvNckh}
            svOlympic={svOlympic}
            setSvOlympic={setSvOlympic}
            svCreative={svCreative}
            setSvCreative={setSvCreative}
            svAcademicRank={svAcademicRank}
            setSvAcademicRank={setSvAcademicRank}
            classStudyAttitude={classStudyAttitude}
            setClassStudyAttitude={setClassStudyAttitude}
            classNckh={classNckh}
            setClassNckh={setClassNckh}
            classOlympic={classOlympic}
            setClassOlympic={setClassOlympic}
            classCreative={classCreative}
            setClassCreative={setClassCreative}
            classAcademicRank={classAcademicRank}
            setClassAcademicRank={setClassAcademicRank}
            isSvViolationSec1={isSvViolationSec1}
            setIsSvViolationSec1={setIsSvViolationSec1}
            isClassViolationSec1={isClassViolationSec1}
            setIsClassViolationSec1={setIsClassViolationSec1}
            svNoViolationScore={svNoViolationScore}
            setSvNoViolationScore={setSvNoViolationScore}
            svDeductions={svDeductions}
            handleDeductionChange={handleDeductionChange}
            classNoViolationScore={classNoViolationScore}
            setClassNoViolationScore={setClassNoViolationScore}
            classDeductions={classDeductions}
            deductionLabels={deductionLabels}
            isSvViolationSec2={isSvViolationSec2}
            setIsSvViolationSec2={setIsSvViolationSec2}
            isClassViolationSec2={isClassViolationSec2}
            setIsClassViolationSec2={setIsClassViolationSec2}
            svActivity1={svActivity1}
            setSvActivity1={setSvActivity1}
            svActivity2={svActivity2}
            setSvActivity2={setSvActivity2}
            svActivity3={svActivity3}
            setSvActivity3={setSvActivity3}
            svActivity4={svActivity4}
            setSvActivity4={setSvActivity4}
            svRewardPoints={svRewardPoints}
            setSvRewardPoints={setSvRewardPoints}
            classActivity1={classActivity1}
            setClassActivity1={setClassActivity1}
            classActivity2={classActivity2}
            setClassActivity2={setClassActivity2}
            classActivity3={classActivity3}
            setClassActivity3={setClassActivity3}
            classActivity4={classActivity4}
            setClassActivity4={setClassActivity4}
            classRewardPoints={classRewardPoints}
            setClassRewardPoints={setClassRewardPoints}
            isSvViolationSec3={isSvViolationSec3}
            setIsSvViolationSec3={setIsSvViolationSec3}
            isClassViolationSec3={isClassViolationSec3}
            setIsClassViolationSec3={setIsClassViolationSec3}
            svPolicy={svPolicy}
            setSvPolicy={setSvPolicy}
            svSolidarity={svSolidarity}
            setSvSolidarity={setSvSolidarity}
            svLocality={svLocality}
            setSvLocality={setSvLocality}
            classPolicy={classPolicy}
            setClassPolicy={setClassPolicy}
            classSolidarity={classSolidarity}
            setClassSolidarity={setClassSolidarity}
            classLocality={classLocality}
            setClassLocality={setClassLocality}
            isSvViolationSec4={isSvViolationSec4}
            setIsSvViolationSec4={setIsSvViolationSec4}
            isClassViolationSec4={isClassViolationSec4}
            setIsClassViolationSec4={setIsClassViolationSec4}
            svRoleType={svRoleType}
            setSvRoleType={setSvRoleType}
            svCadrePosition={svCadrePosition}
            setSvCadrePosition={setSvCadrePosition}
            svCadrePerformance={svCadrePerformance}
            setSvCadrePerformance={setSvCadrePerformance}
            svManagementLevel={svManagementLevel}
            setSvManagementLevel={setSvManagementLevel}
            svClassParticipation={svClassParticipation}
            setSvClassParticipation={setSvClassParticipation}
            svSpecialAchievement={svSpecialAchievement}
            setSvSpecialAchievement={setSvSpecialAchievement}
            classRoleType={classRoleType}
            setClassRoleType={setClassRoleType}
            classCadrePosition={classCadrePosition}
            setClassCadrePosition={setClassCadrePosition}
            classCadrePerformance={classCadrePerformance}
            setClassCadrePerformance={setClassCadrePerformance}
            classManagementLevel={classManagementLevel}
            setClassManagementLevel={setClassManagementLevel}
            classClassParticipation={classClassParticipation}
            setClassClassParticipation={setClassClassParticipation}
            classSpecialAchievement={classSpecialAchievement}
            setClassSpecialAchievement={setClassSpecialAchievement}
            isSvViolationSec5={isSvViolationSec5}
            setIsSvViolationSec5={setIsSvViolationSec5}
            isClassViolationSec5={isClassViolationSec5}
            setIsClassViolationSec5={setIsClassViolationSec5}
            uploadedFiles={uploadedFiles}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
          />

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleApprove}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] shadow-sm min-h-[44px]"
            >
              <Send size={15} />
              Gửi phê duyệt
            </button>
          </div>
        </>
      )}

      <EvidenceReviewModal
        isOpen={evidenceModalOpen}
        evidences={evidences}
        onClose={() => setEvidenceModalOpen(false)}
        onApprove={(evidenceId) => updateEvidence(evidenceId, { status: 'approved', rejectReason: undefined })}
        onReject={(evidenceId, reason) => updateEvidence(evidenceId, { status: 'rejected', rejectReason: reason })}
      />
    </div>
  );
}
