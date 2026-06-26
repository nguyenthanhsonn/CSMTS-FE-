// Evaluation Form Types based on official criteria

export interface StudentInfo {
  admissionYear: string; // Năm trúng tuyển
  majorId: string; // Ngành/chuyên ngành
  facultyId: string; // Khoa
  classId: string; // Lớp
  studentCode: string; // Mã sinh viên
  fullName: string; // Họ và tên
  dateOfBirth: string; // Ngày sinh
  phoneNumber: string; // Số điện thoại
}

export interface EvaluationPeriod {
  semester: 'HK1' | 'HK2'; // Học kỳ
  academicYear: string; // Năm học
}

// Mục I: Ý thức tham gia học tập (0-20 điểm)
export interface AcademicAwareness {
  // 1. Ý thức và thái độ học tập (0-6 điểm)
  attendanceScore: 'ge9' | '7to9' | '5to7' | '4to5' | '1to4'; // ≥9, 7-9, 5-7, 4-5, 1-4
  attendancePoints: number; // 6, 5, 4, 2, 1
  
  // 2. Hoạt động học thuật, NCKH (0-6 điểm)
  researchActivities: {
    fullParticipation: boolean; // Tham gia đầy đủ (2 điểm)
    hasPublication: boolean; // Có công bố (2 điểm)
    hasAward: boolean; // Đạt giải (2 điểm)
  };
  researchPoints: number;
  researchEvidence: string[]; // File đính kèm
  
  // 3. Xếp loại học tập (0-8 điểm)
  academicRank: 'excellent' | 'good' | 'fair' | 'average' | 'weak' | 'weak_warning';
  academicRankPoints: number; // 8, 7, 6, 4, 2, 1
  
  totalPoints: number; // Tổng 1+2+3 (max 20)
}

// Mục II: Chấp hành nội quy (0-25 điểm)
export interface DisciplineCompliance {
  basePoints: number; // 25 điểm
  
  violations: {
    weeklyMeetingAbsence: number; // Không tham gia tuần sinh hoạt (-10)
    weeklyMeetingLate: number; // Nghỉ không lý do (-3/buổi)
    classActivityAbsence: number; // Không tham gia sinh hoạt lớp (-5/buổi)
    noStudentCard: number; // Không đeo thẻ, không mặc đồng phục (-5/lần)
    facilityViolation: number; // Vi phạm giảng đường, thư viện (-5/lần)
    latePayment: number; // Chậm đóng học phí (-5/lần)
    examWarning: number; // Bị khiển trách trong thi (-5/lần)
    examViolation: number; // Vi phạm quy chế thi (-10/lần)
    examSuspension: number; // Bị đình chỉ thi (-20/lần)
  };
  
  totalDeduction: number;
  finalPoints: number; // basePoints - totalDeduction
}

// Mục III: Hoạt động chính trị, xã hội (0-20 điểm)
export interface PoliticalSocialActivities {
  // 1. Hoạt động chính trị xã hội (0-5 điểm)
  politicalActivities: 'full' | 'absent1' | 'absent2' | 'absent3plus';
  politicalPoints: number; // 5, 3, 2, 0
  
  // 2. Văn hóa văn nghệ thể thao (0-5 điểm)
  culturalActivities: 'full_effective' | 'over50' | 'encourage' | 'under50' | 'none';
  culturalPoints: number; // 5, 3, 2, 1, 0
  
  // 3. CLB, Đội, Nhóm (0-5 điểm)
  clubActivities: 'full_effective' | 'active' | 'member' | 'under50' | 'none';
  clubPoints: number; // 5, 3, 2, 1, 0
  
  // 4. Phòng chống TNXH (0-3 điểm)
  antiSocialEvils: 'very_active' | 'active' | 'aware' | 'warned';
  antiSocialPoints: number; // 3, 2, 1, 0
  
  // 5. Khen thưởng (0-2 điểm)
  awards: number; // Tự nhập
  awardEvidence: string[]; // File đính kèm
  
  totalPoints: number; // Max 20
}

// Mục IV: Ý thức công dân (0-25 điểm)
export interface CivicAwareness {
  // 1. Chấp hành chính sách pháp luật (0-10 điểm)
  policyCompliance: 'awarded' | 'good_propaganda' | 'comply' | 'warned';
  policyPoints: number; // 10, 8, 5, 0
  policyEvidence: string[]; // File đính kèm nếu được khen thưởng
  
  // 2. Hoạt động từ thiện (0-10 điểm)
  charityWork: 'awarded' | 'active' | 'aware' | 'disruptive' | 'none';
  charityPoints: number; // 10, 8, 5, 0, 0
  charityEvidence: string[]; // File đính kèm
  
  // 3. Xây dựng tập thể (0-5 điểm)
  collectiveBuilding: 'good' | 'warned1' | 'warned2';
  collectivePoints: number; // 5, 1, 0
  
  totalPoints: number; // Max 25
}

// Mục V: Vai trò cán bộ (0-10 điểm)
export interface LeadershipRole {
  roleType: 'cadre' | 'regular'; // Cán bộ hoặc sinh viên thường
  
  // Nếu là cán bộ
  cadreInfo?: {
    // a) Ý thức, tinh thần (0-7 điểm)
    position: 'main_leader' | 'sub_leader'; // Cấp trưởng hoặc ủy viên
    performance: 'excellent' | 'good' | 'complete' | 'incomplete';
    performancePoints: number; // 7,6,4,0 (main) hoặc 7,6,5,3,0 (sub)
    performanceEvidence: string[]; // File đính kèm
    
    // b) Kỹ năng tổ chức (0-3 điểm)
    managementLevel: 'head' | 'deputy' | 'member';
    managementPoints: number; // 3, 2, 1
  };
  
  // Nếu là sinh viên thường
  regularStudent?: {
    // a) Tham gia hoạt động (0-3 điểm)
    classParticipation: number; // Tự nhập 1-3 điểm
    
    // b) Thành tích đặc biệt (0-7 điểm)
    specialAchievement?: 'university_level' | 'faculty_level' | 'none';
    achievementPoints: number; // 7, 5, 0
    achievementEvidence: string[]; // File đính kèm
  };
  
  totalPoints: number; // Max 10
}

export interface CompleteEvaluation {
  id: string;
  studentId: string;
  studentInfo: StudentInfo;
  period: EvaluationPeriod;
  
  // 5 mục đánh giá
  academicAwareness: AcademicAwareness; // Mục I (0-20)
  discipline: DisciplineCompliance; // Mục II (0-25)
  politicalSocial: PoliticalSocialActivities; // Mục III (0-20)
  civicAwareness: CivicAwareness; // Mục IV (0-25)
  leadership: LeadershipRole; // Mục V (0-10)
  
  // Điểm tổng
  scores: {
    studentSelfScore: number; // Điểm SV tự đánh giá
    classScore?: number; // Điểm lớp đánh giá
  };
  
  // Xếp loại
  rating: 'excellent' | 'good' | 'fair' | 'average' | 'weak' | 'poor';
  // Xuất sắc (90-100), Tốt (80-89), Khá (65-79), TB (50-64), Yếu (35-49), Kém (<35)
  
  // Trạng thái
  status: 'draft' | 'submitted' | 'class_reviewed' | 'advisor_reviewed' | 'faculty_approved';
  
  // Ghi chú
  studentNotes?: string;
  classNotes?: string;
  advisorNotes?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
}
