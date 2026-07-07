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
  Clock,
  Loader2
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { API_Student } from '../../api/API_Student';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { uploadEvidenceFile } from '../../services/cloudinaryUpload';

// Sub-components
import { EvaluationTableGrid } from '../../components/student/EvaluationTableGrid';

export const EvaluationFormQD4185 = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [evaluationId, setEvaluationId] = useState<string | null>(null);
  // Timestamp (ISO string) của lần submit thành công gần nhất — null nếu chưa từng submit
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  // true khi phiếu đã được Lớp/GVCN phê duyệt (status = faculty_approved)
  const [isApproved, setIsApproved] = useState(false);
  const [note, setNote] = useState<string>('');

  // Simulating user role switcher for testing purposes
  const [currentUserRole, setCurrentUserRole] = useState<'student' | 'class'>('student');

  // (Accordion sections removed — replaced by EvaluationTableGrid)

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
  const [phoneNumber, setPhoneNumber] = useState((user as any)?.phoneNumber || '0987654321');
  const [semester, setSemester] = useState<'HK1' | 'HK2' | ''>('');
  const [academicYear, setAcademicYear] = useState<string>('');

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string[]>>({});
  const [uploadingEvidence, setUploadingEvidence] = useState<string | null>(null);
  
  const handleFileUpload = async (criteriaKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileList = Array.from(files);
    
    // Client-side validations (Size & Type)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    for (const file of fileList) {
      if (file.size > 10 * 1024 * 1024) {
        setValidationError(`Tệp "${file.name}" vượt quá giới hạn dung lượng 10MB.`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        e.target.value = '';
        return;
      }
      if (!allowedTypes.includes(file.type)) {
        setValidationError(`Tệp "${file.name}" không hợp lệ. Hệ thống chỉ chấp nhận định dạng PDF, JPG, PNG.`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        e.target.value = '';
        return;
      }
    }

    try {
      setUploadingEvidence(criteriaKey);
      setValidationError(null);

      const names: string[] = [];
      for (const file of fileList) {
        const { secureUrl, publicId } = await uploadEvidenceFile(file);
        await API_Student.linkEvidenceUrl({
          evaluationId: evaluationId || undefined,
          criteriaCode: criteriaKey,
          imageUrl: secureUrl,
          publicId,
          title: file.name,
        });
        names.push(file.name);
      }

      setUploadedFiles(prev => ({
        ...prev,
        [criteriaKey]: [...(prev[criteriaKey] || []), ...names]
      }));
    } catch (err: any) {
      setValidationError(err.message || 'Không thể tải minh chứng. Vui lòng thử lại.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setUploadingEvidence(null);
      e.target.value = '';
    }
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

  // Mapping Helpers
  const mapStudyAttitude = (val: string) => {
    const dict = {
      very_good: 'GTE_9',
      good: 'FROM_7_TO_9',
      fair: 'FROM_5_TO_7',
      average: 'FROM_4_TO_5',
      poor: 'FROM_1_TO_4',
      none: 'LT_1',
    };
    return dict[val as keyof typeof dict] || 'FROM_7_TO_9';
  };

  const reverseMapStudyAttitude = (val: string) => {
    const dict = {
      GTE_9: 'very_good',
      FROM_7_TO_9: 'good',
      FROM_5_TO_7: 'fair',
      FROM_4_TO_5: 'average',
      FROM_1_TO_4: 'poor',
      LT_1: 'none',
    };
    return dict[val as keyof typeof dict] || 'good';
  };

  const mapAcademicRank = (val: string) => {
    return val.toUpperCase();
  };

  const reverseMapAcademicRank = (val: string) => {
    return val.toLowerCase();
  };

  const mapActivity1 = (val: string) => {
    const dict = {
      active: 'GOOD_PARTICIPATION',
      full: 'MEDIUM_PARTICIPATION',
      excused: 'LOW_PARTICIPATION',
      unexcused: 'NO_PARTICIPATION',
    };
    return dict[val as keyof typeof dict] || 'GOOD_PARTICIPATION';
  };

  const reverseMapActivity1 = (val: string) => {
    const dict = {
      GOOD_PARTICIPATION: 'active',
      MEDIUM_PARTICIPATION: 'full',
      LOW_PARTICIPATION: 'excused',
      NO_PARTICIPATION: 'unexcused',
    };
    return dict[val as keyof typeof dict] || 'active';
  };

  const mapActivity2 = (val: string) => {
    const dict = {
      many: 'FULL_EFFECTIVE_PARTICIPATION',
      some: 'PARTIAL_PARTICIPATION',
      active: 'ACTIVE_PROMOTION',
      full: 'LOW_PARTICIPATION',
      none: 'NO_PARTICIPATION',
    };
    return dict[val as keyof typeof dict] || 'FULL_EFFECTIVE_PARTICIPATION';
  };

  const reverseMapActivity2 = (val: string) => {
    const dict = {
      FULL_EFFECTIVE_PARTICIPATION: 'many',
      PARTIAL_PARTICIPATION: 'some',
      ACTIVE_PROMOTION: 'active',
      LOW_PARTICIPATION: 'full',
      NO_PARTICIPATION: 'none',
    };
    return dict[val as keyof typeof dict] || 'some';
  };

  const mapActivity3 = (val: string) => {
    const dict = {
      prize_or_org: 'LEADER_OR_ORGANIZER',
      active: 'ACTIVE_MEMBER',
      some: 'MEMBER',
      full: 'LOW_PARTICIPATION',
      none: 'NO_PARTICIPATION',
    };
    return dict[val as keyof typeof dict] || 'MEMBER';
  };

  const reverseMapActivity3 = (val: string) => {
    const dict = {
      LEADER_OR_ORGANIZER: 'prize_or_org',
      ACTIVE_MEMBER: 'active',
      MEMBER: 'some',
      LOW_PARTICIPATION: 'full',
      NO_PARTICIPATION: 'none',
    };
    return dict[val as keyof typeof dict] || 'some';
  };

  const mapActivity4 = (val: string) => {
    const dict = {
      active: 'HIGH_COMPLIANCE_AND_REPORTING',
      full: 'ONE_EFFECTIVE_ACTIVITY',
      some: 'AWARENESS',
      none: 'VIOLATION_WARNING',
    };
    return dict[val as keyof typeof dict] || 'AWARENESS';
  };

  const reverseMapActivity4 = (val: string) => {
    const dict = {
      HIGH_COMPLIANCE_AND_REPORTING: 'active',
      ONE_EFFECTIVE_ACTIVITY: 'full',
      AWARENESS: 'some',
      VIOLATION_WARNING: 'none',
    };
    return dict[val as keyof typeof dict] || 'some';
  };

  const mapPolicy = (val: string) => {
    const dict = {
      very_good: 'EXCELLENT',
      good: 'GOOD',
      regular: 'FAIR',
      none: 'POOR',
    };
    return dict[val as keyof typeof dict] || 'GOOD';
  };

  const reverseMapPolicy = (val: string) => {
    const dict = {
      EXCELLENT: 'very_good',
      GOOD: 'good',
      FAIR: 'regular',
      POOR: 'none',
    };
    return dict[val as keyof typeof dict] || 'good';
  };

  const mapSolidarity = (val: string) => {
    const dict = {
      very_good: 'EXCELLENT',
      good: 'GOOD',
      regular: 'FAIR',
      none: 'POOR',
    };
    return dict[val as keyof typeof dict] || 'GOOD';
  };

  const reverseMapSolidarity = (val: string) => {
    const dict = {
      EXCELLENT: 'very_good',
      GOOD: 'good',
      FAIR: 'regular',
      POOR: 'none',
    };
    return dict[val as keyof typeof dict] || 'regular';
  };

  const mapLocality = (val: string) => {
    const dict = {
      very_good: 'EXCELLENT',
      good: 'GOOD',
      regular: 'FAIR',
      none: 'POOR',
    };
    return dict[val as keyof typeof dict] || 'GOOD';
  };

  const reverseMapLocality = (val: string) => {
    const dict = {
      EXCELLENT: 'very_good',
      GOOD: 'good',
      FAIR: 'regular',
      POOR: 'none',
    };
    return dict[val as keyof typeof dict] || 'good';
  };

  const mapCadrePerformance = (val: string) => {
    const dict = {
      excellent: 'EXCELLENT',
      good: 'GOOD',
      fair: 'FAIR',
      poor: 'POOR',
    };
    return dict[val as keyof typeof dict] || 'GOOD';
  };

  const reverseMapCadrePerformance = (val: string) => {
    const dict = {
      EXCELLENT: 'excellent',
      GOOD: 'good',
      FAIR: 'fair',
      POOR: 'poor',
    };
    return dict[val as keyof typeof dict] || 'good';
  };

  const mapManagementLevel = (val: string) => {
    const dict = {
      univ_level: 'UNIVERSITY_LEVEL',
      faculty_level: 'FACULTY_LEVEL',
      none: 'NONE',
    };
    return dict[val as keyof typeof dict] || 'NONE';
  };

  const reverseMapManagementLevel = (val: string) => {
    const dict = {
      UNIVERSITY_LEVEL: 'univ_level',
      FACULTY_LEVEL: 'faculty_level',
      NONE: 'none',
    };
    return dict[val as keyof typeof dict] || 'none';
  };

  const mapSpecialAchievement = (val: string) => {
    const dict = {
      national_intl: 'NATIONAL_OR_INTL',
      provincial: 'PROVINCIAL_LEVEL',
      none: 'NONE',
    };
    return dict[val as keyof typeof dict] || 'NONE';
  };

  const reverseMapSpecialAchievement = (val: string) => {
    const dict = {
      NATIONAL_OR_INTL: 'national_intl',
      PROVINCIAL_LEVEL: 'provincial',
      NONE: 'none',
    };
    return dict[val as keyof typeof dict] || 'none';
  };

  // Reset fields function for fresh evaluations
  const resetFormFields = () => {
    setSvStudyAttitude('good');
    setSvNckh(false);
    setSvOlympic(false);
    setSvCreative(false);
    setSvAcademicRank('good');
    setSvNoViolationScore(25);
    setSvDeductions([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setSvActivity1('active');
    setSvActivity2('some');
    setSvActivity3('some');
    setSvActivity4('some');
    setSvRewardPoints(0);
    setSvPolicy('good');
    setSvSolidarity('regular');
    setSvLocality('good');
    setSvRoleType('student');
    setSvSpecialAchievement('none');
    setNote('');
    setIsSuspended(false);
    setIsSubmittedLate(false);
    setIsSvViolationSec1(false);
    setIsSvViolationSec2(false);
    setIsSvViolationSec3(false);
    setIsSvViolationSec4(false);
    setIsSvViolationSec5(false);
  };

  // Helper method to load details of a specific evaluation
  const loadEvaluationDetails = async (accessToken: string, targetId: string) => {
    try {
      setEvaluationId(targetId);
      const detailRes = await API_Student.getEvaluationDetail(accessToken, targetId);
      const detail = detailRes.data || detailRes;
      if (detail.phone) setPhoneNumber(detail.phone);
      if (detail.note) setNote(detail.note);
      if (detail.semester) setSemester(detail.semester === 'SEMESTER_1' || detail.semester === 'HK1' ? 'HK1' : 'HK2');
      if (detail.academicYear) setAcademicYear(detail.academicYear);
      // Lấy timestamp lần submit gần nhất từ backend
      if (detail.submittedAt) setSubmittedAt(detail.submittedAt);
      else if (detail.updatedAt && detail.status && detail.status !== 'draft') setSubmittedAt(detail.updatedAt);

      // Fetch score details
      const [study, discipline, activity, community, role] = await Promise.all([
        API_Student.getStudyScore(accessToken, targetId),
        API_Student.getDisciplineScore(accessToken, targetId),
        API_Student.getActivityScore(accessToken, targetId),
        API_Student.getCommunityScore(accessToken, targetId),
        API_Student.getRoleScore(accessToken, targetId),
      ]);

      const studyData = study.data || study;
      const discData = discipline.data || discipline;
      const actData = activity.data || activity;
      const commData = community.data || community;
      const roleData = role.data || role;

      if (studyData.regularScoreLevel) setSvStudyAttitude(reverseMapStudyAttitude(studyData.regularScoreLevel));
      if (studyData.academicRank) setSvAcademicRank(reverseMapAcademicRank(studyData.academicRank));
      if (studyData.activities) {
        setSvNckh(studyData.activities.some((a: any) => a.code === 'RESEARCH'));
        setSvOlympic(studyData.activities.some((a: any) => a.code === 'OLYMPIC'));
        setSvCreative(studyData.activities.some((a: any) => a.code === 'CREATIVE'));
      }

      if (discData.baseScore !== undefined) setSvNoViolationScore(discData.baseScore);
      if (discData.violations) {
        const dec = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        discData.violations.forEach((v: any) => {
          const num = parseInt(v.code.replace('DEDUCT_', '')) - 1;
          if (num >= 0 && num < 9) {
            dec[num] = v.deductScore;
          }
        });
        setSvDeductions(dec);
      }

      if (actData.politicalActivityLevel) setSvActivity1(reverseMapActivity1(actData.politicalActivityLevel));
      if (actData.cultureSportLevel) setSvActivity2(reverseMapActivity2(actData.cultureSportLevel));
      if (actData.clubActivityLevel) setSvActivity3(reverseMapActivity3(actData.clubActivityLevel));
      if (actData.socialPreventionLevel) setSvActivity4(reverseMapActivity4(actData.socialPreventionLevel));
      if (actData.rewardScore !== undefined) setSvRewardPoints(actData.rewardScore);

      if (commData.lawComplianceLevel) setSvPolicy(reverseMapPolicy(commData.lawComplianceLevel));
      if (commData.volunteerActivityLevel) setSvSolidarity(reverseMapSolidarity(commData.volunteerActivityLevel));
      if (commData.communityRelationshipLevel) setSvLocality(reverseMapLocality(commData.communityRelationshipLevel));

      if (roleData.studentRoleType) setSvRoleType(roleData.studentRoleType === 'CLASS_OFFICER' ? 'cadre' : 'student');
      if (roleData.positionGroup) setSvCadrePosition(roleData.positionGroup === 'LEADER_GROUP' ? 'a1' : 'a2');
      if (roleData.taskCompletionLevel) setSvCadrePerformance(reverseMapCadrePerformance(roleData.taskCompletionLevel));
      if (roleData.managementSkillLevel) setSvManagementLevel(reverseMapManagementLevel(roleData.managementSkillLevel));
      if (roleData.normalStudentActivityScore !== undefined) setSvClassParticipation(roleData.normalStudentActivityScore);
      if (roleData.specialAchievementLevel) setSvSpecialAchievement(reverseMapSpecialAchievement(roleData.specialAchievementLevel));

    } catch (secErr) {
      console.error('Failed to load score sections:', secErr);
    }
  };

  // Sync helper methods for URL parameters
  const setUrlParams = (sem: string, year: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('semester', sem);
    params.set('year', year);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const clearUrlParams = () => {
    router.replace(pathname);
  };

  const [step, setStep] = useState<number>(1);
  const [evaluationsList, setEvaluationsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load evaluations list once on mount
  useEffect(() => {
    const loadMyEvals = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken && accessToken !== 'mock-access-token') {
        try {
          const res = await API_Student.getMyEvaluations(accessToken);
          const data = res.data || res;
          if (Array.isArray(data)) {
            setEvaluationsList(data);
          }
        } catch (err) {
          console.error('Failed to load evaluations list:', err);
        }
      }
    };
    loadMyEvals();
  }, []);

  const changeSemester = (sem: 'HK1' | 'HK2' | '') => {
    setSemester(sem);
  };

  const changeAcademicYear = (year: string) => {
    setAcademicYear(year);
  };

  // Check status and date gates before proceeding
  const handleCheckAndProceed = async (targetSem: 'HK1' | 'HK2' | '', targetYear: string) => {
    if (targetSem === '' || targetYear === '') return;
    // 1. Validate deadlines (Mocked: allow access to all evaluation periods)

    const accessToken = localStorage.getItem('accessToken');
    const apiSemester = targetSem === 'HK1' ? 'SEMESTER_1' : 'SEMESTER_2';

    // Check if an evaluation exists
    const match = evaluationsList.find((ev) => {
      const evSem = ev.semester && typeof ev.semester === 'object' ? ev.semester.semester : ev.semester;
      const evYear = ev.semester && typeof ev.semester === 'object' 
        ? `${ev.semester.year - 1}-${ev.semester.year}` 
        : ev.academicYear;
      return (evSem === apiSemester || evSem === targetSem) && (evYear === targetYear);
    });

    if (match) {
      if (match.status !== 'draft') {
        setIsReadOnly(true);
        setIsApproved(match.status === 'faculty_approved');
        // Nếu phiếu đã submit, lấy timestamp ngay từ danh sách nếu có
        if (match.submittedAt) setSubmittedAt(match.submittedAt);
        else if (match.updatedAt) setSubmittedAt(match.updatedAt);
        if (accessToken && accessToken !== 'mock-access-token') {
          try {
            setLoading(true);
            await loadEvaluationDetails(accessToken, match.id);
          } catch (err) {
            console.error('Failed to load details:', err);
          } finally {
            setLoading(false);
          }
        }
        setEvaluationId(match.id);
        setStep(2);
        setUrlParams(targetSem, targetYear);
      } else {
        setIsReadOnly(false);
        if (accessToken && accessToken !== 'mock-access-token') {
          try {
            setLoading(true);
            await loadEvaluationDetails(accessToken, match.id);
          } catch (err) {
            console.error('Failed to load details:', err);
          } finally {
            setLoading(false);
          }
        }
        setEvaluationId(match.id);
        setStep(2);
        setUrlParams(targetSem, targetYear);
      }
    } else {
      // Create new draft
      setIsReadOnly(false);
      if (accessToken && accessToken !== 'mock-access-token') {
        try {
          setLoading(true);
          const newEvalRes = await API_Student.createEvaluation(accessToken, apiSemester, targetYear);
          const newEval = newEvalRes.data || newEvalRes;
          setEvaluationId(newEval.id);
          resetFormFields();
          setStep(2);
          setUrlParams(targetSem, targetYear);
        } catch (err: any) {
          alert(err.message || 'Lỗi xảy ra khi tạo phiếu.');
          setStep(1);
          clearUrlParams();
        } finally {
          setLoading(false);
        }
      } else {
        resetFormFields();
        setStep(2);
        setUrlParams(targetSem, targetYear);
      }
    }
  };

  // Sync state with URL query parameters
  useEffect(() => {
    const semParam = searchParams.get('semester') as 'HK1' | 'HK2' | null;
    const yearParam = searchParams.get('year');
    const accessToken = localStorage.getItem('accessToken');
    const isMock = !accessToken || accessToken === 'mock-access-token';

    if (semParam && yearParam && (isMock || evaluationsList.length > 0)) {
      if (step === 1 || semester !== semParam || academicYear !== yearParam) {
        setSemester(semParam);
        setAcademicYear(yearParam);
        handleCheckAndProceed(semParam, yearParam);
      }
    } else if (!semParam || !yearParam) {
      if (step !== 1) {
        setStep(1);
      }
    }
  }, [searchParams, evaluationsList, step, semester, academicYear]);

  const handleStartEvaluation = () => {
    handleCheckAndProceed(semester, academicYear);
  };

  const handleGoBackToStep1 = () => {
    if (!isReadOnly) {
      if (confirm('Bạn có chắc chắn muốn đổi học kỳ/năm học khác? Mọi thay đổi chưa lưu sẽ bị mất.')) {
        clearUrlParams();
        setStep(1);
      }
    } else {
      clearUrlParams();
      setStep(1);
    }
  };

  // Periodic auto-save every 10s
  useEffect(() => {
    const timer = setInterval(() => {
      const draftData = {
        svStudyAttitude,
        svNoViolationScore,
        svDeductions,
        isSuspended,
        isSubmittedLate,
        isSvViolationSec1,
        isSvViolationSec2,
        isSvViolationSec3,
        isSvViolationSec4,
        isSvViolationSec5,
        note
      };
      localStorage.setItem('evaluation_draft_qd4185', JSON.stringify(draftData));
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      setLastAutoSaveTime(timeStr);
    }, 10000);

    return () => clearInterval(timer);
  }, [
    svStudyAttitude, svNoViolationScore, svDeductions,
    isSuspended, isSubmittedLate, isSvViolationSec1, isSvViolationSec2,
    isSvViolationSec3, isSvViolationSec4, isSvViolationSec5, note
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
      
      // TODO: Xác nhận lại với đội nghiệp vụ xem điểm Mục II có được phép âm hay bắt buộc áp floor tại 0.
      // Hiện tại theo yêu cầu, hệ thống đang giới hạn số lần vi phạm nhập vào ở stepper sao cho tổng điểm không âm,
      // và áp floor Math.max(0, ...) để điểm Mục II không bao giờ dưới 0.
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

  const handleSave = async () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setValidationError(errorMsg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken !== 'mock-access-token') {
      try {
        let currentId = evaluationId;
        if (!currentId) {
          // 1. Create evaluation first
          const createRes = await API_Student.createEvaluation(accessToken, semester, academicYear);
          const created = createRes.data || createRes;
          currentId = created.id;
          setEvaluationId(created.id);
        }
        // 2. Update draft
        await API_Student.updateEvaluationDraft(accessToken, currentId!, {
          phone: phoneNumber,
          note: note,
        });

        // 3. Save all 5 detailed score sections to the backend
        await Promise.all([
          API_Student.updateStudyScore(accessToken, currentId!, {
            regularScoreLevel: mapStudyAttitude(svStudyAttitude),
            academicRank: mapAcademicRank(svAcademicRank),
            activities: [
              { code: 'RESEARCH', checked: svNckh, score: 2 },
              { code: 'OLYMPIC', checked: svOlympic, score: 2 },
              { code: 'CREATIVE', checked: svCreative, score: 2 },
            ].filter(a => a.checked)
          }),
          API_Student.updateDisciplineScore(accessToken, currentId!, {
            baseScore: svNoViolationScore,
            violations: svDeductions.map((deduct, idx) => ({
              code: `DEDUCT_${idx + 1}`,
              count: deduct > 0 ? 1 : 0,
              deductScore: deduct
            })).filter(v => v.deductScore > 0)
          }),
          API_Student.updateActivityScore(accessToken, currentId!, {
            politicalActivityLevel: mapActivity1(svActivity1),
            cultureSportLevel: mapActivity2(svActivity2),
            clubActivityLevel: mapActivity3(svActivity3),
            socialPreventionLevel: mapActivity4(svActivity4),
            rewardScore: svRewardPoints
          }),
          API_Student.updateCommunityScore(accessToken, currentId!, {
            lawComplianceLevel: mapPolicy(svPolicy),
            volunteerActivityLevel: mapSolidarity(svSolidarity),
            communityRelationshipLevel: mapLocality(svLocality)
          }),
          API_Student.updateRoleScore(accessToken, currentId!, {
            studentRoleType: svRoleType === 'cadre' ? 'CLASS_OFFICER' : 'NORMAL_STUDENT',
            positionGroup: svCadrePosition === 'a1' ? 'LEADER_GROUP' : 'MEMBER_GROUP',
            taskCompletionLevel: mapCadrePerformance(svCadrePerformance),
            managementSkillLevel: mapManagementLevel(svManagementLevel),
            normalStudentActivityScore: svClassParticipation,
            specialAchievementLevel: mapSpecialAchievement(svSpecialAchievement)
          })
        ]);

        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } catch (err: any) {
        setValidationError(err.message || 'Lỗi lưu bản nháp phiếu đánh giá.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleSubmit = async () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setValidationError(errorMsg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken !== 'mock-access-token') {
      try {
        let currentId = evaluationId;
        if (!currentId) {
          const createRes = await API_Student.createEvaluation(accessToken, semester, academicYear);
          const created = createRes.data || createRes;
          currentId = created.id;
          setEvaluationId(created.id);
        }
        // Save latest updates to the draft
        await API_Student.updateEvaluationDraft(accessToken, currentId!, {
          phone: phoneNumber,
          note: note,
        });

        // Save detailed score sections
        await Promise.all([
          API_Student.updateStudyScore(accessToken, currentId!, {
            regularScoreLevel: mapStudyAttitude(svStudyAttitude),
            academicRank: mapAcademicRank(svAcademicRank),
            activities: [
              { code: 'RESEARCH', checked: svNckh, score: 2 },
              { code: 'OLYMPIC', checked: svOlympic, score: 2 },
              { code: 'CREATIVE', checked: svCreative, score: 2 },
            ].filter(a => a.checked)
          }),
          API_Student.updateDisciplineScore(accessToken, currentId!, {
            baseScore: svNoViolationScore,
            violations: svDeductions.map((deduct, idx) => ({
              code: `DEDUCT_${idx + 1}`,
              count: deduct > 0 ? 1 : 0,
              deductScore: deduct
            })).filter(v => v.deductScore > 0)
          }),
          API_Student.updateActivityScore(accessToken, currentId!, {
            politicalActivityLevel: mapActivity1(svActivity1),
            cultureSportLevel: mapActivity2(svActivity2),
            clubActivityLevel: mapActivity3(svActivity3),
            socialPreventionLevel: mapActivity4(svActivity4),
            rewardScore: svRewardPoints
          }),
          API_Student.updateCommunityScore(accessToken, currentId!, {
            lawComplianceLevel: mapPolicy(svPolicy),
            volunteerActivityLevel: mapSolidarity(svSolidarity),
            communityRelationshipLevel: mapLocality(svLocality)
          }),
          API_Student.updateRoleScore(accessToken, currentId!, {
            studentRoleType: svRoleType === 'cadre' ? 'CLASS_OFFICER' : 'NORMAL_STUDENT',
            positionGroup: svCadrePosition === 'a1' ? 'LEADER_GROUP' : 'MEMBER_GROUP',
            taskCompletionLevel: mapCadrePerformance(svCadrePerformance),
            managementSkillLevel: mapManagementLevel(svManagementLevel),
            normalStudentActivityScore: svClassParticipation,
            specialAchievementLevel: mapSpecialAchievement(svSpecialAchievement)
          })
        ]);
        
        // Lấy timestamp lần submit từ response, hoặc fallback lấy lại detail
        let submitTimestamp: string | null = null;
        try {
          const freshDetail = await API_Student.getEvaluationDetail(accessToken, currentId!);
          const freshData = freshDetail.data || freshDetail;
          submitTimestamp = freshData.submittedAt || freshData.updatedAt || null;
        } catch { /* fallback: dùng server time từ response headers nếu cần */ }
        if (submitTimestamp) setSubmittedAt(submitTimestamp);
        setIsSubmitting(false);
        setSaved(true);
        localStorage.removeItem('evaluation_draft_qd4185');
        setTimeout(() => setSaved(false), 3000);
      } catch (err: any) {
        setIsSubmitting(false);
        setValidationError(err.message || 'Lỗi gửi duyệt phiếu đánh giá.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Mock: dùng thời gian hiện tại làm timestamp submit
      setTimeout(() => {
        setIsSubmitting(false);
        setSaved(true);
        setSubmittedAt(new Date().toISOString());
        localStorage.removeItem('evaluation_draft_qd4185');
      }, 1200);
    }
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
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full pb-28">
      {step === 1 ? (
        /* Step 1: Chọn kỳ đánh giá */
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6 my-12 transition-all duration-300 transform ease-out animate-fade-in">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Calendar size={24} />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Chọn kỳ đánh giá rèn luyện</h2>
            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
              Vui lòng chọn học kỳ và năm học bạn muốn thực hiện tự đánh giá.
            </p>
          </div>

            {/* Dropdown: Năm học */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Năm học *</label>
              <select
                value={academicYear}
                onChange={(e) => changeAcademicYear(e.target.value)}
                className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-10 bg-white font-semibold ${
                  academicYear === '' ? 'text-gray-400 font-medium' : 'text-gray-700'
                }`}
              >
                <option value="" className="text-gray-400 font-medium">-- Chọn năm học --</option>
                <option value="2024-2025" className="text-gray-700">2024-2025</option>
                <option value="2023-2024" className="text-gray-700">2023-2024</option>
                <option value="2022-2023" className="text-gray-700">2022-2023</option>
              </select>
            </div>

          <div className="space-y-4">
            {/* Dropdown: Học kỳ */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Học kỳ đánh giá *</label>
              <select
                value={semester}
                onChange={(e) => changeSemester(e.target.value as 'HK1' | 'HK2' | '')}
                className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-10 bg-white font-semibold ${
                  semester === '' ? 'text-gray-400 font-medium' : 'text-gray-700'
                }`}
              >
                <option value="" className="text-gray-400 font-medium">-- Chọn học kỳ --</option>
                <option value="HK1" className="text-gray-700">Học kỳ I</option>
                <option value="HK2" className="text-gray-700">Học kỳ II</option>
                <option value="HKHE" className="text-gray-700">Học kỳ hè</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleStartEvaluation}
            disabled={loading || semester === '' || academicYear === ''}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-xl text-xs sm:text-sm font-bold transition duration-200 cursor-pointer shadow-sm min-h-[44px]"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Đang đối soát dữ liệu...
              </>
            ) : (
              'Tiếp tục bắt đầu đánh giá'
            )}
          </button>
        </div>
      ) : (
        /* Step 2: Form chi tiết */
        <div className="space-y-6 transition-all duration-300 transform ease-in animate-fade-in">
          
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

          {uploadingEvidence && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-blue-800">
              <Loader2 className="shrink-0 mt-0.5 animate-spin" />
              <div>
                <h4 className="font-bold text-sm">Đang tải minh chứng</h4>
                <p className="text-xs mt-1">Vui lòng chờ trong giây lát.</p>
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

          {/* Read-only Mode Indicator */}
          {isReadOnly && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-800">
              <Info className="shrink-0 mt-0.5 text-amber-600" />
              <div>
                <h4 className="font-bold text-sm">Chế độ Chỉ xem</h4>
                <p className="text-xs mt-1">Phiếu này đã được gửi hoặc phê duyệt, không thể chỉnh sửa.</p>
              </div>
            </div>
          )}

          {/* Compact details card + checkboxes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 border-t-4 border-t-red-600 p-5 space-y-4">
            {/* Title & Back Link */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="text-red-600 shrink-0" size={18} />
                <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wider">
                  Bảng đánh giá kết quả rèn luyện của sinh viên:{' '}
                  <span className="text-red-600">
                    Học kỳ {semester === 'HK1' ? 'I' : semester === 'HK2' ? 'II' : 'Hè'} — Năm học {academicYear}
                  </span>
                </h2>
              </div>
              <button
                onClick={handleGoBackToStep1}
                className="text-xs font-bold text-gray-500 hover:text-red-600 transition flex items-center gap-1 cursor-pointer underline decoration-dotted self-start sm:self-center"
              >
                ← Đổi học kỳ/năm học khác
              </button>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2.5 gap-x-8 text-xs sm:text-sm text-gray-600">
              <div className="space-y-2">
                <p className="font-semibold text-gray-800">
                  <span className="font-bold text-gray-950 inline-block w-16">Họ tên:</span>
                  {(user as any)?.fullName || 'Nguyễn Sinh Viên'}
                </p>
                <p className="font-semibold text-gray-800">
                  <span className="font-bold text-gray-950 inline-block w-16">MSSV:</span>
                  {(user as any)?.studentCode || 'SV99999'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-gray-800">
                  <span className="font-bold text-gray-950">Hạn đánh giá:</span> Từ 01/06/2026 đến 30/06/2026
                </p>
              </div>
              <div className="col-span-1 md:col-span-2 pt-1">
                <p className="font-semibold text-gray-800">
                  <span className="font-bold text-gray-950 inline-block w-16">Khoa:</span>
                  {(user as any)?.facultyName || (user as any)?.majorName || 'Khoa Công nghệ thông tin'}
                </p>
              </div>
            </div>

            {/* Special Compliance Flags */}
            <div className={`pt-3 border-t border-gray-100 flex flex-col sm:flex-row gap-4 ${isReadOnly ? 'pointer-events-none select-none opacity-80' : ''}`}>
              <label className="flex items-center gap-2 text-xs font-bold text-red-600 cursor-pointer min-h-[44px] sm:min-h-0">
                <input
                  type="checkbox"
                  checked={isSuspended}
                  onChange={(e) => setIsSuspended(e.target.checked)}
                  className="h-4.5 w-4.5 rounded text-red-600 focus:ring-red-500 cursor-pointer"
                />
                Bị đình chỉ học tập từ 30 ngày trở xuống (Xếp loại không quá Khá)
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-amber-600 cursor-pointer min-h-[44px] sm:min-h-0">
                <input
                  type="checkbox"
                  checked={isSubmittedLate}
                  onChange={(e) => setIsSubmittedLate(e.target.checked)}
                  className="h-4.5 w-4.5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                />
                Nộp phiếu trễ hạn / Không đúng hạn (Xếp loại Yếu/Kém)
              </label>
            </div>
          </div>

          {/* Submission Confirmation Banner */}
          {submittedAt && (
            <div className="text-center py-2 px-4 space-y-1">
              <p className="text-sm font-bold text-blue-600">
                BẠN ĐÃ ĐÁNH GIÁ THÀNH CÔNG LẦN CUỐI VÀO LÚC{' '}
                {(() => {
                  try {
                    return new Intl.DateTimeFormat('vi-VN', {
                      timeZone: 'Asia/Ho_Chi_Minh',
                      hour: '2-digit', minute: '2-digit', second: '2-digit',
                      day: '2-digit', month: '2-digit', year: 'numeric',
                      hour12: false,
                    }).format(new Date(submittedAt))
                      .replace(',', '');
                  } catch { return submittedAt; }
                })()}
              </p>
              {isApproved && (
                <p className="text-xs font-bold text-red-600">
                  Giảng viên/Lớp đã đánh giá. Sinh viên không được phép Đánh giá lại.
                </p>
              )}
              {!isApproved && currentUserRole === 'class' && (
                <p className="text-xs font-bold text-red-500">
                  Giảng viên/Lớp chưa lưu Điểm. Hãy nhấn nút <strong>Gửi đánh giá</strong> để lưu Điểm.
                </p>
              )}
            </div>
          )}

          <EvaluationTableGrid
            currentUserRole={currentUserRole}
            setIsClassEdited={setIsClassEdited}
            isReadOnly={isReadOnly}
            svScores={svScores}
            classScores={classScores}
            // Sec 1
            svStudyAttitude={svStudyAttitude} setSvStudyAttitude={setSvStudyAttitude}
            svNckh={svNckh} setSvNckh={setSvNckh}
            svOlympic={svOlympic} setSvOlympic={setSvOlympic}
            svCreative={svCreative} setSvCreative={setSvCreative}
            svAcademicRank={svAcademicRank} setSvAcademicRank={setSvAcademicRank}
            classStudyAttitude={classStudyAttitude} setClassStudyAttitude={setClassStudyAttitude}
            classNckh={classNckh} setClassNckh={setClassNckh}
            classOlympic={classOlympic} setClassOlympic={setClassOlympic}
            classCreative={classCreative} setClassCreative={setClassCreative}
            classAcademicRank={classAcademicRank} setClassAcademicRank={setClassAcademicRank}
            isSvViolationSec1={isSvViolationSec1} setIsSvViolationSec1={setIsSvViolationSec1}
            isClassViolationSec1={isClassViolationSec1} setIsClassViolationSec1={setIsClassViolationSec1}
            // Sec 2
            svNoViolationScore={svNoViolationScore} setSvNoViolationScore={setSvNoViolationScore}
            svDeductions={svDeductions} handleDeductionChange={handleDeductionChange}
            classNoViolationScore={classNoViolationScore} setClassNoViolationScore={setClassNoViolationScore}
            classDeductions={classDeductions} deductionLabels={deductionLabels}
            isSvViolationSec2={isSvViolationSec2} setIsSvViolationSec2={setIsSvViolationSec2}
            isClassViolationSec2={isClassViolationSec2} setIsClassViolationSec2={setIsClassViolationSec2}
            // Sec 3
            svActivity1={svActivity1} setSvActivity1={setSvActivity1}
            svActivity2={svActivity2} setSvActivity2={setSvActivity2}
            svActivity3={svActivity3} setSvActivity3={setSvActivity3}
            svActivity4={svActivity4} setSvActivity4={setSvActivity4}
            svRewardPoints={svRewardPoints} setSvRewardPoints={setSvRewardPoints}
            classActivity1={classActivity1} setClassActivity1={setClassActivity1}
            classActivity2={classActivity2} setClassActivity2={setClassActivity2}
            classActivity3={classActivity3} setClassActivity3={setClassActivity3}
            classActivity4={classActivity4} setClassActivity4={setClassActivity4}
            classRewardPoints={classRewardPoints} setClassRewardPoints={setClassRewardPoints}
            isSvViolationSec3={isSvViolationSec3} setIsSvViolationSec3={setIsSvViolationSec3}
            isClassViolationSec3={isClassViolationSec3} setIsClassViolationSec3={setIsClassViolationSec3}
            // Sec 4
            svPolicy={svPolicy} setSvPolicy={setSvPolicy}
            svSolidarity={svSolidarity} setSvSolidarity={setSvSolidarity}
            svLocality={svLocality} setSvLocality={setSvLocality}
            classPolicy={classPolicy} setClassPolicy={setClassPolicy}
            classSolidarity={classSolidarity} setClassSolidarity={setClassSolidarity}
            classLocality={classLocality} setClassLocality={setClassLocality}
            isSvViolationSec4={isSvViolationSec4} setIsSvViolationSec4={setIsSvViolationSec4}
            isClassViolationSec4={isClassViolationSec4} setIsClassViolationSec4={setIsClassViolationSec4}
            // Sec 5
            svRoleType={svRoleType} setSvRoleType={setSvRoleType}
            svCadrePosition={svCadrePosition} setSvCadrePosition={setSvCadrePosition}
            svCadrePerformance={svCadrePerformance} setSvCadrePerformance={setSvCadrePerformance}
            svManagementLevel={svManagementLevel} setSvManagementLevel={setSvManagementLevel}
            svClassParticipation={svClassParticipation} setSvClassParticipation={setSvClassParticipation}
            svSpecialAchievement={svSpecialAchievement} setSvSpecialAchievement={setSvSpecialAchievement}
            classRoleType={classRoleType} setClassRoleType={setClassRoleType}
            classCadrePosition={classCadrePosition} setClassCadrePosition={setClassCadrePosition}
            classCadrePerformance={classCadrePerformance} setClassCadrePerformance={setClassCadrePerformance}
            classManagementLevel={classManagementLevel} setClassManagementLevel={setClassManagementLevel}
            classClassParticipation={classClassParticipation} setClassClassParticipation={setClassClassParticipation}
            classSpecialAchievement={classSpecialAchievement} setClassSpecialAchievement={setClassSpecialAchievement}
            isSvViolationSec5={isSvViolationSec5} setIsSvViolationSec5={setIsSvViolationSec5}
            isClassViolationSec5={isClassViolationSec5} setIsClassViolationSec5={setIsClassViolationSec5}
            // File upload
            uploadedFiles={uploadedFiles}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
          />

          {/* Automatic rating summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Confirmation & dates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 border-b pb-3 border-gray-100">
                <Calendar size={16} className="text-blue-600" />
                Xác nhận thông tin
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
                {/* Student Note Input */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Ghi chú của sinh viên
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="Nhập ghi chú hoặc ý kiến của sinh viên gửi tới GV/Hội đồng (nếu có)..."
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white resize-none font-medium text-gray-800"
                  />
                </div>

                {/* Inline Action Buttons */}
                {!isReadOnly && (
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
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
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition cursor-pointer text-xs font-bold min-h-[44px] disabled:opacity-50 shadow-sm"
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
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationFormQD4185;
