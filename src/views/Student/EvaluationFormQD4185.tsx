'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Save, 
  Send, 
  CheckCircle, 
  AlertTriangle, 
  Shield, 
  FileText, 
  Calendar,
  Info,
  Clock
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

// Sub-components
import { EvaluationHeaderSection } from '../../components/student/EvaluationHeaderSection';
import { EvaluationSection1 } from '../../components/student/EvaluationSection1';
import { EvaluationSection2 } from '../../components/student/EvaluationSection2';
import { EvaluationSection3 } from '../../components/student/EvaluationSection3';
import { EvaluationSection4 } from '../../components/student/EvaluationSection4';
import { EvaluationSection5 } from '../../components/student/EvaluationSection5';

export const EvaluationFormQD4185 = () => {
  const { user } = useAuthStore();

  // Simulating user role switcher for testing purposes
  const [currentUserRole, setCurrentUserRole] = useState<'student' | 'class'>('student');

  // Collapsible Accordion Sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    header: true,
    sec1: true,
    sec2: true,
    sec3: true,
    sec4: true,
    sec5: true,
  });

  const toggleSection = (sec: string) => {
    setExpandedSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Compliance state variables
  const [isSuspended, setIsSuspended] = useState(false);
  const [isSubmittedLate, setIsSubmittedLate] = useState(false);

  // Section violation states (If true, that section score is 0)
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

  // Header State Values
  const [admissionYear, setAdmissionYear] = useState('2021');
  const [facultyId, setFacultyId] = useState('cntt');
  const [majorId, setMajorId] = useState('khmt');
  const [classId, setClassId] = useState('cntt-k18');
  const [studentCode, setStudentCode] = useState((user as any)?.studentCode || 'SV99999');
  const [fullName, setFullName] = useState((user as any)?.fullName || 'Nguyễn Sinh Viên');
  const [dateOfBirth, setDateOfBirth] = useState((user as any)?.dateOfBirth || '2003-01-01');
  const [phoneNumber, setPhoneNumber] = useState((user as any)?.phoneNumber || '0987654321');
  const [semester, setSemester] = useState<'HK1' | 'HK2'>('HK1');
  const [academicYear, setAcademicYear] = useState('2024-2025');

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string[]>>({});
  
  const handleFileUpload = (criteriaKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileList = Array.from(files);
    
    // Client-side validations (Size & Type)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    for (const file of fileList) {
      if (file.size > 5 * 1024 * 1024) {
        setValidationError(`Tệp "${file.name}" vượt quá giới hạn dung lượng 5MB.`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (!allowedTypes.includes(file.type)) {
        setValidationError(`Tệp "${file.name}" không hợp lệ. Hệ thống chỉ chấp nhận định dạng PDF, JPG, PNG.`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    setValidationError(null);
    const names = fileList.map(f => f.name);
    setUploadedFiles(prev => ({
      ...prev,
      [criteriaKey]: [...(prev[criteriaKey] || []), ...names]
    }));
  };

  const removeFile = (criteriaKey: string, index: number) => {
    setUploadedFiles(prev => {
      const copy = [...(prev[criteriaKey] || [])];
      copy.splice(index, 1);
      return { ...prev, [criteriaKey]: copy };
    });
  };

  // Score states for SV (Student)
  const [svStudyAttitude, setSvStudyAttitude] = useState<string>('good');
  const [svNckh, setSvNckh] = useState(false);
  const [svOlympic, setSvOlympic] = useState(false);
  const [svCreative, setSvCreative] = useState(false);
  const [svAcademicRank, setSvAcademicRank] = useState<string>('good');

  const [svNoViolationScore, setSvNoViolationScore] = useState<number>(25);
  const [svDeductions, setSvDeductions] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [svActivity1, setSvActivity1] = useState<string>('active');
  const [svActivity2, setSvActivity2] = useState<string>('some');
  const [svActivity3, setSvActivity3] = useState<string>('some');
  const [svActivity4, setSvActivity4] = useState<string>('some');
  const [svRewardPoints, setSvRewardPoints] = useState<number>(0);

  const [svPolicy, setSvPolicy] = useState<string>('good');
  const [svSolidarity, setSvSolidarity] = useState<string>('regular');
  const [svLocality, setSvLocality] = useState<string>('good');

  const [svRoleType, setSvRoleType] = useState<'cadre' | 'student'>('student');
  const [svCadrePosition, setSvCadrePosition] = useState<'a1' | 'a2'>('a2');
  const [svCadrePerformance, setSvCadrePerformance] = useState<string>('good');
  const [svManagementLevel, setSvManagementLevel] = useState<string>('none');
  const [svClassParticipation, setSvClassParticipation] = useState<number>(2);
  const [svSpecialAchievement, setSvSpecialAchievement] = useState<string>('none');

  // Score states for Class (Monitor/Lớp)
  const [classStudyAttitude, setClassStudyAttitude] = useState<string>('good');
  const [classNckh, setClassNckh] = useState(false);
  const [classOlympic, setClassOlympic] = useState(false);
  const [classCreative, setClassCreative] = useState(false);
  const [classAcademicRank, setClassAcademicRank] = useState<string>('good');

  const [classNoViolationScore, setClassNoViolationScore] = useState<number>(25);
  const [classDeductions, setClassDeductions] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [classActivity1, setClassActivity1] = useState<string>('active');
  const [classActivity2, setClassActivity2] = useState<string>('some');
  const [classActivity3, setClassActivity3] = useState<string>('some');
  const [classActivity4, setClassActivity4] = useState<string>('some');
  const [classRewardPoints, setClassRewardPoints] = useState<number>(0);

  const [classPolicy, setClassPolicy] = useState<string>('good');
  const [classSolidarity, setClassSolidarity] = useState<string>('regular');
  const [classLocality, setClassLocality] = useState<string>('good');

  const [classRoleType, setClassRoleType] = useState<'cadre' | 'student'>('student');
  const [classCadrePosition, setClassCadrePosition] = useState<'a1' | 'a2'>('a2');
  const [classCadrePerformance, setClassCadrePerformance] = useState<string>('good');
  const [classManagementLevel, setClassManagementLevel] = useState<string>('none');
  const [classClassParticipation, setClassClassParticipation] = useState<number>(2);
  const [classSpecialAchievement, setClassSpecialAchievement] = useState<string>('none');

  // Auto-propagate student inputs to class inputs if they haven't been edited
  const [isClassEdited, setIsClassEdited] = useState(false);
  useEffect(() => {
    if (!isClassEdited && currentUserRole === 'student') {
      setClassStudyAttitude(svStudyAttitude);
      setClassNckh(svNckh);
      setClassOlympic(svOlympic);
      setClassCreative(svCreative);
      setClassAcademicRank(svAcademicRank);
      setClassNoViolationScore(svNoViolationScore);
      setClassDeductions([...svDeductions]);
      setClassActivity1(svActivity1);
      setClassActivity2(svActivity2);
      setClassActivity3(svActivity3);
      setClassActivity4(svActivity4);
      setClassRewardPoints(svRewardPoints);
      setClassPolicy(svPolicy);
      setClassSolidarity(svSolidarity);
      setClassLocality(svLocality);
      setClassRoleType(svRoleType);
      setClassCadrePosition(svCadrePosition);
      setClassCadrePerformance(svCadrePerformance);
      setClassManagementLevel(svManagementLevel);
      setClassClassParticipation(svClassParticipation);
      setClassSpecialAchievement(svSpecialAchievement);
      
      setIsClassViolationSec1(isSvViolationSec1);
      setIsClassViolationSec2(isSvViolationSec2);
      setIsClassViolationSec3(isSvViolationSec3);
      setIsClassViolationSec4(isSvViolationSec4);
      setIsClassViolationSec5(isSvViolationSec5);
    }
  }, [
    svStudyAttitude, svNckh, svOlympic, svCreative, svAcademicRank,
    svNoViolationScore, svDeductions, svActivity1, svActivity2, svActivity3, svActivity4, svRewardPoints,
    svPolicy, svSolidarity, svLocality, svRoleType, svCadrePosition, svCadrePerformance,
    svManagementLevel, svClassParticipation, svSpecialAchievement,
    isSvViolationSec1, isSvViolationSec2, isSvViolationSec3, isSvViolationSec4, isSvViolationSec5,
    isClassEdited, currentUserRole
  ]);

  // Validation / Save / Loading states
  const [saved, setSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [lastAutoSaveTime, setLastAutoSaveTime] = useState<string>('');

  // Draft auto-save logic
  useEffect(() => {
    // Attempt to load from localStorage on mount
    const savedDraft = localStorage.getItem('evaluation_draft_qd4185');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (parsed.studentCode) setStudentCode(parsed.studentCode);
        if (parsed.fullName) setFullName(parsed.fullName);
        if (parsed.svStudyAttitude) setSvStudyAttitude(parsed.svStudyAttitude);
        if (parsed.svNoViolationScore !== undefined) setSvNoViolationScore(parsed.svNoViolationScore);
        if (parsed.svDeductions) setSvDeductions(parsed.svDeductions);
        if (parsed.isSuspended !== undefined) setIsSuspended(parsed.isSuspended);
        if (parsed.isSubmittedLate !== undefined) setIsSubmittedLate(parsed.isSubmittedLate);
        
        if (parsed.isSvViolationSec1 !== undefined) setIsSvViolationSec1(parsed.isSvViolationSec1);
        if (parsed.isSvViolationSec2 !== undefined) setIsSvViolationSec2(parsed.isSvViolationSec2);
        if (parsed.isSvViolationSec3 !== undefined) setIsSvViolationSec3(parsed.isSvViolationSec3);
        if (parsed.isSvViolationSec4 !== undefined) setIsSvViolationSec4(parsed.isSvViolationSec4);
        if (parsed.isSvViolationSec5 !== undefined) setIsSvViolationSec5(parsed.isSvViolationSec5);
      } catch (err) {
        console.error('Error parsing draft:', err);
      }
    }
  }, []);

  // Periodic auto-save every 10s
  useEffect(() => {
    const timer = setInterval(() => {
      const draftData = {
        studentCode,
        fullName,
        svStudyAttitude,
        svNoViolationScore,
        svDeductions,
        isSuspended,
        isSubmittedLate,
        isSvViolationSec1,
        isSvViolationSec2,
        isSvViolationSec3,
        isSvViolationSec4,
        isSvViolationSec5
      };
      localStorage.setItem('evaluation_draft_qd4185', JSON.stringify(draftData));
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      setLastAutoSaveTime(timeStr);
    }, 10000);

    return () => clearInterval(timer);
  }, [
    studentCode, fullName, svStudyAttitude, svNoViolationScore, svDeductions,
    isSuspended, isSubmittedLate, isSvViolationSec1, isSvViolationSec2,
    isSvViolationSec3, isSvViolationSec4, isSvViolationSec5
  ]);

  // Helper score constants
  const studyAttitudeScores = useMemo<Record<string, number>>(() => ({
    very_good: 6,
    good: 5,
    fair: 4,
    average: 2,
    poor: 1,
    none: 0
  }), []);

  const academicRankScores = useMemo<Record<string, number>>(() => ({
    excellent: 8,
    good: 7,
    fair: 6,
    average: 4,
    weak_no_warn: 2,
    weak_warn: 1,
    none: 0
  }), []);

  const activity1Scores = useMemo<Record<string, number>>(() => ({
    active: 5,
    full: 3,
    excused: 2,
    unexcused: 0
  }), []);

  const activity2Scores = useMemo<Record<string, number>>(() => ({
    many: 5,
    some: 3,
    active: 2,
    full: 1,
    none: 0
  }), []);

  const activity3Scores = useMemo<Record<string, number>>(() => ({
    prize_or_org: 5,
    active: 3,
    some: 2,
    full: 1,
    none: 0
  }), []);

  const activity4Scores = useMemo<Record<string, number>>(() => ({
    active: 3,
    full: 2,
    some: 1,
    none: 0
  }), []);

  const policyScores = useMemo<Record<string, number>>(() => ({
    excellent_propaganda: 10,
    good: 8,
    minor_violation: 5,
    none: 0
  }), []);

  const solidarityScores = useMemo<Record<string, number>>(() => ({
    excellent_achievements: 10,
    regular: 8,
    some: 5,
    none: 0
  }), []);

  const localityScores = useMemo<Record<string, number>>(() => ({
    good: 5,
    rewarded: 1,
    warned: 0
  }), []);

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

  // Scoring function
  const calculateTotalPoints = (isSv: boolean) => {
    // -------------------------------------------------------------
    // SECTION I (max 20)
    // -------------------------------------------------------------
    const isViolation = isSv ? isSvViolationSec1 : isClassViolationSec1;
    let sec1 = 0;

    if (!isViolation) {
      const attitude = isSv ? svStudyAttitude : classStudyAttitude;
      const rank = isSv ? svAcademicRank : classAcademicRank;
      const nckhVal = isSv ? svNckh : classNckh;
      const olympicVal = isSv ? svOlympic : classOlympic;
      const creativeVal = isSv ? svCreative : classCreative;

      const s1_att = studyAttitudeScores[attitude] || 0;
      const s1_act = (nckhVal ? 2 : 0) + (olympicVal ? 2 : 0) + (creativeVal ? 2 : 0);
      const s1_rank = academicRankScores[rank] || 0;
      sec1 = Math.min(s1_att + s1_act + s1_rank, 20);
    }

    // -------------------------------------------------------------
    // SECTION II (max 25)
    // -------------------------------------------------------------
    const isViolationSec2 = isSv ? isSvViolationSec2 : isClassViolationSec2;
    let sec2 = 0;

    if (!isViolationSec2) {
      const noViolationBase = isSv ? svNoViolationScore : classNoViolationScore;
      const currentDeductions = isSv ? svDeductions : classDeductions;
      const totalDeductionVal = currentDeductions.reduce((sum, count, idx) => sum + count * deductionWeights[idx], 0);
      sec2 = Math.max(0, Math.min(noViolationBase - totalDeductionVal, 25));
    }

    // -------------------------------------------------------------
    // SECTION III (max 20)
    // -------------------------------------------------------------
    const isViolationSec3 = isSv ? isSvViolationSec3 : isClassViolationSec3;
    let sec3 = 0;

    if (!isViolationSec3) {
      const act1 = isSv ? svActivity1 : classActivity1;
      const act2 = isSv ? svActivity2 : classActivity2;
      const act3 = isSv ? svActivity3 : classActivity3;
      const act4 = isSv ? svActivity4 : classActivity4;
      const reward = isSv ? svRewardPoints : classRewardPoints;

      const s3_act = (activity1Scores[act1] || 0) + (activity2Scores[act2] || 0) + (activity3Scores[act3] || 0) + (activity4Scores[act4] || 0);
      sec3 = Math.min(s3_act + reward, 20);
    }

    // -------------------------------------------------------------
    // SECTION IV (max 25)
    // -------------------------------------------------------------
    const isViolationSec4 = isSv ? isSvViolationSec4 : isClassViolationSec4;
    let sec4 = 0;

    if (!isViolationSec4) {
      const pol = isSv ? svPolicy : classPolicy;
      const sol = isSv ? svSolidarity : classSolidarity;
      const loc = isSv ? svLocality : classLocality;
      sec4 = Math.min((policyScores[pol] || 0) + (solidarityScores[sol] || 0) + (localityScores[loc] || 0), 25);
    }

    // -------------------------------------------------------------
    // SECTION V (max 10)
    // -------------------------------------------------------------
    const isViolationSec5 = isSv ? isSvViolationSec5 : isClassViolationSec5;
    let sec5 = 0;

    if (!isViolationSec5) {
      const roleType = isSv ? svRoleType : classRoleType;

      if (roleType === 'cadre') {
        const position = isSv ? svCadrePosition : classCadrePosition;
        const perf = isSv ? svCadrePerformance : classCadrePerformance;
        const management = isSv ? svManagementLevel : classManagementLevel;

        let score_pos_perf = 0;
        if (position === 'a1') {
          const perfMap: Record<string, number> = { excellent: 7, good: 6, average: 4, unsatisfactory: 0 };
          score_pos_perf = perfMap[perf] || 0;
        } else {
          const perfMap: Record<string, number> = { excellent: 6, good: 5, average: 3, unsatisfactory: 0 };
          score_pos_perf = perfMap[perf] || 0;
        }

        let score_mgmt = 0;
        const mgmtMap: Record<string, number> = { head: 3, deputy: 2, member: 1, none: 0 };
        score_mgmt = mgmtMap[management] || 0;

        sec5 = Math.min(score_pos_perf + score_mgmt, 10);
      } else {
        const part = isSv ? svClassParticipation : classClassParticipation;
        const ach = isSv ? svSpecialAchievement : classSpecialAchievement;

        const achMap: Record<string, number> = { national_intl: 7, provincial: 5, none: 0 };
        sec5 = Math.min(part + (achMap[ach] || 0), 10);
      }
    }

    return {
      sec1,
      sec2,
      sec3,
      sec4,
      sec5,
      total: sec1 + sec2 + sec3 + sec4 + sec5
    };
  };

  const svScores = calculateTotalPoints(true);
  const classScores = calculateTotalPoints(false);

  // Auto rating labels & compliance adjustments
  const getRatingLabel = (score: number) => {
    // Rule: SV không nộp phiếu đúng hạn → tự động xếp Yếu/Kém
    if (isSubmittedLate) {
      return score >= 35 ? 'Yếu' : 'Kém';
    }

    const baseRating = (() => {
      if (score >= 90) return 'Xuất sắc';
      if (score >= 80) return 'Tốt';
      if (score >= 65) return 'Khá';
      if (score >= 50) return 'Trung bình';
      if (score >= 35) return 'Yếu';
      return 'Kém';
    })();

    // Rule: SV bị đình chỉ học ≤ 30 ngày → xếp loại không vượt quá Khá
    if (isSuspended && (baseRating === 'Xuất sắc' || baseRating === 'Tốt')) {
      return 'Khá';
    }

    return baseRating;
  };

  const getRatingColor = (score: number) => {
    const rating = getRatingLabel(score);
    if (rating === 'Xuất sắc') return 'text-green-600 bg-green-50 border-green-200';
    if (rating === 'Tốt') return 'text-blue-600 bg-blue-50 border-blue-200';
    if (rating === 'Khá') return 'text-purple-600 bg-purple-50 border-purple-200';
    if (rating === 'Trung bình') return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  // Validation function for evidence attachments
  const validateForm = () => {
    setValidationError(null);
    setSaved(false);

    // Checks for SV
    if (svNckh && (!uploadedFiles['sv_nckh'] || uploadedFiles['sv_nckh'].length === 0)) {
      return 'Vui lòng tải minh chứng cho hoạt động Nghiên cứu khoa học.';
    }
    if (svOlympic && (!uploadedFiles['sv_olympic'] || uploadedFiles['sv_olympic'].length === 0)) {
      return 'Vui lòng tải minh chứng cho hoạt động thi Olympic học thuật.';
    }
    if (svCreative && (!uploadedFiles['sv_creative'] || uploadedFiles['sv_creative'].length === 0)) {
      return 'Vui lòng tải minh chứng cho hoạt động Câu lạc bộ học thuật.';
    }
    if (svRewardPoints > 0 && (!uploadedFiles['sv_reward'] || uploadedFiles['sv_reward'].length === 0)) {
      return 'Vui lòng tải minh chứng cho Khen thưởng hoạt động của sinh viên.';
    }
    if (svPolicy === 'excellent_propaganda' && (!uploadedFiles['sv_policy'] || uploadedFiles['sv_policy'].length === 0)) {
      return 'Vui lòng tải minh chứng cho việc Tuyên truyền chính sách pháp luật đạt xuất sắc.';
    }
    if (svSolidarity === 'excellent_achievements' && (!uploadedFiles['sv_solidarity'] || uploadedFiles['sv_solidarity'].length === 0)) {
      return 'Vui lòng tải minh chứng cho các thành tích đoàn kết giúp đỡ bạn bè đặc biệt.';
    }

    if (svRoleType === 'cadre' && svCadrePerformance === 'excellent') {
      const key = 'sv_cadre_perf';
      if (!uploadedFiles[key] || uploadedFiles[key].length === 0) {
        return 'Vui lòng tải minh chứng Hoàn thành xuất sắc nhiệm vụ của Lớp trưởng/Bí thư.';
      }
    }
    if (svRoleType === 'student' && (svSpecialAchievement === 'national_intl' || svSpecialAchievement === 'provincial')) {
      if (!uploadedFiles['sv_special_ach'] || uploadedFiles['sv_special_ach'].length === 0) {
        return 'Vui lòng tải minh chứng cho giải thưởng/thành tích đặc biệt.';
      }
    }

    return null;
  };

  const handleSave = () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setValidationError(errorMsg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSaved(true);
  };

  const handleSubmit = () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setValidationError(errorMsg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSaved(true);
      // Clear localStorage draft on successful send
      localStorage.removeItem('evaluation_draft_qd4185');
    }, 1200);
  };

  const handleDeductionChange = (isSv: boolean, index: number, value: number) => {
    if (!isSv) setIsClassEdited(true);
    const setDeductions = isSv ? setSvDeductions : setClassDeductions;
    setDeductions(prev => {
      const copy = [...prev];
      copy[index] = Math.max(0, value);
      return copy;
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6 pb-28">
      
      {/* Simulation Controller Topbar */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl shadow-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black flex items-center gap-2">
            <FileText className="animate-pulse" />
            Phiếu Đánh Giá Rèn Luyện
          </h1>
          <p className="text-xs text-blue-100 mt-1">Quyết định 4185/QĐ-HCQG — Thiết kế bảng điểm song song trực quan</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {lastAutoSaveTime && (
            <span className="text-[11px] bg-white/20 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold">
              <Clock size={12} className="animate-spin text-green-300" />
              Đã lưu nháp lúc {lastAutoSaveTime}
            </span>
          )}

          <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl flex items-center border border-white/20">
            <span className="text-xs font-bold px-3 py-1 flex items-center gap-1.5 shrink-0">
              <Shield size={14} /> Vai trò:
            </span>
            <button
              type="button"
              onClick={() => setCurrentUserRole('student')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition duration-200 cursor-pointer ${
                currentUserRole === 'student'
                  ? 'bg-white text-blue-900 shadow-md'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Sinh viên
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentUserRole('class');
                setIsClassEdited(true);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition duration-200 cursor-pointer ${
                currentUserRole === 'class'
                  ? 'bg-white text-indigo-900 shadow-md'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Lớp trưởng / BCS
            </button>
          </div>
        </div>
      </div>

      {/* Validation Message */}
      {validationError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-red-800 animate-shake">
          <AlertTriangle className="shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">Không thể nộp phiếu</h4>
            <p className="text-xs mt-1">{validationError}</p>
          </div>
        </div>
      )}

      {/* Save Success Message */}
      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3 text-green-800">
          <CheckCircle className="shrink-0 mt-0.5 text-green-600" />
          <div>
            <h4 className="font-bold text-sm">Gửi thông tin thành công!</h4>
            <p className="text-xs mt-1">Đã cập nhật kết quả tự đánh giá rèn luyện học kỳ này.</p>
          </div>
        </div>
      )}

      {/* Accordion Components */}
      <EvaluationHeaderSection
        expanded={expandedSections.header}
        onToggle={() => toggleSection('header')}
        admissionYear={admissionYear}
        setAdmissionYear={setAdmissionYear}
        facultyId={facultyId}
        setFacultyId={setFacultyId}
        majorId={majorId}
        setMajorId={setMajorId}
        classId={classId}
        setClassId={setClassId}
        studentCode={studentCode}
        setStudentCode={setStudentCode}
        fullName={fullName}
        setFullName={setFullName}
        dateOfBirth={dateOfBirth}
        setDateOfBirth={setDateOfBirth}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        semester={semester}
        setSemester={setSemester}
        academicYear={academicYear}
        setAcademicYear={setAcademicYear}
        isSuspended={isSuspended}
        setIsSuspended={setIsSuspended}
        isSubmittedLate={isSubmittedLate}
        setIsSubmittedLate={setIsSubmittedLate}
      />

      <EvaluationSection1
        expanded={expandedSections.sec1}
        onToggle={() => toggleSection('sec1')}
        currentUserRole={currentUserRole}
        setIsClassEdited={setIsClassEdited}
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
        uploadedFiles={uploadedFiles}
        handleFileUpload={handleFileUpload}
        removeFile={removeFile}
        svSec1Score={svScores.sec1}
        classSec1Score={classScores.sec1}
        isSvViolationSec1={isSvViolationSec1}
        setIsSvViolationSec1={setIsSvViolationSec1}
        isClassViolationSec1={isClassViolationSec1}
        setIsClassViolationSec1={setIsClassViolationSec1}
      />

      <EvaluationSection2
        expanded={expandedSections.sec2}
        onToggle={() => toggleSection('sec2')}
        currentUserRole={currentUserRole}
        setIsClassEdited={setIsClassEdited}
        svNoViolationScore={svNoViolationScore}
        setSvNoViolationScore={setSvNoViolationScore}
        svDeductions={svDeductions}
        handleDeductionChange={handleDeductionChange}
        classNoViolationScore={classNoViolationScore}
        setClassNoViolationScore={setClassNoViolationScore}
        classDeductions={classDeductions}
        deductionLabels={deductionLabels}
        svSec2Score={svScores.sec2}
        classSec2Score={classScores.sec2}
        isSvViolationSec2={isSvViolationSec2}
        setIsSvViolationSec2={setIsSvViolationSec2}
        isClassViolationSec2={isClassViolationSec2}
        setIsClassViolationSec2={setIsClassViolationSec2}
      />

      <EvaluationSection3
        expanded={expandedSections.sec3}
        onToggle={() => toggleSection('sec3')}
        currentUserRole={currentUserRole}
        setIsClassEdited={setIsClassEdited}
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
        uploadedFiles={uploadedFiles}
        handleFileUpload={handleFileUpload}
        removeFile={removeFile}
        svSec3Score={svScores.sec3}
        classSec3Score={classScores.sec3}
        isSvViolationSec3={isSvViolationSec3}
        setIsSvViolationSec3={setIsSvViolationSec3}
        isClassViolationSec3={isClassViolationSec3}
        setIsClassViolationSec3={setIsClassViolationSec3}
      />

      <EvaluationSection4
        expanded={expandedSections.sec4}
        onToggle={() => toggleSection('sec4')}
        currentUserRole={currentUserRole}
        setIsClassEdited={setIsClassEdited}
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
        uploadedFiles={uploadedFiles}
        handleFileUpload={handleFileUpload}
        removeFile={removeFile}
        svSec4Score={svScores.sec4}
        classSec4Score={classScores.sec4}
        isSvViolationSec4={isSvViolationSec4}
        setIsSvViolationSec4={setIsSvViolationSec4}
        isClassViolationSec4={isClassViolationSec4}
        setIsClassViolationSec4={setIsClassViolationSec4}
      />

      <EvaluationSection5
        expanded={expandedSections.sec5}
        onToggle={() => toggleSection('sec5')}
        currentUserRole={currentUserRole}
        setIsClassEdited={setIsClassEdited}
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
        uploadedFiles={uploadedFiles}
        handleFileUpload={handleFileUpload}
        removeFile={removeFile}
        svSec5Score={svScores.sec5}
        classSec5Score={classScores.sec5}
        isSvViolationSec5={isSvViolationSec5}
        setIsSvViolationSec5={setIsSvViolationSec5}
        isClassViolationSec5={isClassViolationSec5}
        setIsClassViolationSec5={setIsClassViolationSec5}
      />

      {/* Automatic rating summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-3 border-gray-100">
            <Info size={16} className="text-blue-600" />
            Tổng hợp và Xếp loại
          </h3>

          <div className="space-y-3">
            <div className={`p-4 border rounded-xl flex items-center justify-between ${getRatingColor(svScores.total)}`}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Sinh viên tự đánh giá</p>
                <p className="text-sm font-black mt-1">Xếp loại: {getRatingLabel(svScores.total)}</p>
              </div>
              <p className="text-2xl font-black">{svScores.total}đ</p>
            </div>

            <div className={`p-4 border rounded-xl flex items-center justify-between ${getRatingColor(classScores.total)}`}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Lớp đánh giá</p>
                <p className="text-sm font-black mt-1">Xếp loại: {getRatingLabel(classScores.total)}</p>
              </div>
              <p className="text-2xl font-black">{classScores.total}đ</p>
            </div>
          </div>
        </div>

        {/* Confirmation & signature dates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-3 border-gray-100">
            <Calendar size={16} className="text-blue-600" />
            Ký xác nhận
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                ✍️ Sinh viên tự đánh giá xếp loại: <span className="text-blue-600 font-bold">{getRatingLabel(svScores.total)}</span>
              </p>
              <p className="text-xs text-gray-600 leading-relaxed font-semibold mt-1">
                ✍️ Lớp đánh giá, xếp loại: <span className="text-indigo-600 font-bold">{getRatingLabel(classScores.total)}</span>
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold text-gray-700">Ngày lập phiếu:</span>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="px-3 py-1.5 text-xs border rounded-lg outline-none bg-white font-semibold text-gray-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-center pt-2 text-xs">
              <div className="p-2 border border-dashed rounded-lg border-gray-300">
                <p className="font-bold text-gray-800">T/M LỚP - LỚP TRƯỞNG</p>
                <p className="text-[10px] text-gray-500 mt-4">(Ký và ghi rõ họ tên)</p>
              </div>
              <div className="p-2 border border-dashed rounded-lg border-gray-300">
                <p className="font-bold text-gray-800">SINH VIÊN</p>
                <p className="text-[10px] text-gray-500 mt-4">(Ký và ghi rõ họ tên)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sticky Score Summary & Actions Bottom Bar */}
      <div className="fixed bottom-6 left-6 right-6 lg:left-[240px] z-50 bg-white/95 backdrop-blur-md shadow-2xl border border-gray-200 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in transition duration-300">
        <div className="flex items-center gap-6 divide-x divide-gray-200">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase">SV tự chấm</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-blue-600">{svScores.total}đ</span>
              <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold">{getRatingLabel(svScores.total)}</span>
            </div>
          </div>
          <div className="pl-6">
            <span className="text-[10px] font-bold text-gray-500 uppercase">Lớp chấm</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-indigo-600">{classScores.total}đ</span>
              <span className="text-xs bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold">{getRatingLabel(classScores.total)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl transition cursor-pointer text-xs font-bold min-h-[44px]"
          >
            <Save size={14} />
            Lưu nháp
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition cursor-pointer text-xs font-bold min-h-[44px] disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-1.5">
                <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"></span>
                Đang gửi...
              </span>
            ) : (
              <>
                <Send size={14} />
                Gửi phê duyệt
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};

export default EvaluationFormQD4185;
