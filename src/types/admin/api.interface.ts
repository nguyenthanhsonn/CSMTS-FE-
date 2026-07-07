import type { AdminEvaluationItem } from './api.type';

/** Thông tin chia trang danh sách. */
export interface PaginationQuery {
  page?: number;
  limit?: number;
}

/** Danh sách có chia trang. */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page?: number;
  limit?: number;
}

/** Thông tin tạo tài khoản. */
export interface CreateUserPayload {
  email: string;
  fullName: string;
  role: string;
  password?: string;
  username?: string;
}

/** Điều kiện xem danh sách người dùng. */
export interface UserListQuery extends PaginationQuery {
  role?: string;
  keyword?: string;
  isActive?: boolean;
}

/** Điều kiện xem danh sách phiếu đánh giá. */
export interface AdminEvaluationListQuery extends PaginationQuery {
  status?: string;
  semester?: string;
  academicYear?: string;
  classId?: string;
  facultyId?: string;
  keyword?: string;
}

/** Thông tin mở lại phiếu đánh giá. */
export interface ReopenEvaluationPayload {
  reason?: string;
}

/** Thông tin hội đồng lớp ghi điểm. */
export interface ReviewScoresPayload {
  scores?: Record<string, number>;
  note?: string;
  action?: 'review' | 'approve' | 'reject';
}

/** Thông tin duyệt hoặc từ chối phiếu. */
export interface ReviewEvaluationPayload {
  action: 'approve' | 'reject';
  note?: string;
}

/** Thông tin khoa. */
export interface FacultyPayload {
  code: string;
  name: string;
}

/** Thông tin ngành. */
export interface MajorPayload {
  code: string;
  name: string;
  facultyId: string;
}

/** Thông tin cập nhật trạng thái. */
export interface StatusPayload {
  isActive: boolean;
}

/** Thông tin thêm sinh viên vào lớp. */
export interface AddStudentToClassPayload {
  studentId: string;
}

/** Thông tin nhập danh sách sinh viên. */
export interface ImportStudentsPayload {
  file: File;
  classId?: string;
}

/** Kết quả nhập danh sách sinh viên. */
export interface ImportStudentsResult {
  total: number;
  success: number;
  failed: number;
  errors?: string[];
}

/** Thông tin phân công hội đồng. */
export interface AssignCouncilPayload {
  userId: string;
  classId?: string;
  facultyId?: string;
  semester?: string;
  academicYear?: string;
}

/** Điều kiện xem báo cáo. */
export interface ReportQuery {
  semester?: string;
  academicYear?: string;
  classId?: string;
  facultyId?: string;
}

/** Số liệu tổng quan báo cáo. */
export interface ReportsOverview {
  totalStudents: number;
  totalEvaluations: number;
  submittedCount: number;
  approvedCount: number;
}

/** Báo cáo kết quả rèn luyện. */
export interface TrainingResultsReport {
  items: AdminEvaluationItem[];
  total: number;
}

/** Thông tin tạo bài viết. */
export interface PostPayload {
  title: string;
  content: string;
  authorId?: string;
}
