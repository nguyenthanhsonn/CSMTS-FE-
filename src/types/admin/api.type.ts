import type { Class, Faculty, Major } from './academic.type';
import type { StudentManagementItem } from './student-management.type';

export type {
  AddStudentToClassPayload,
  AdminSemester,
  AdminEvaluationListQuery,
  AssignCouncilPayload,
  ConfirmImportPayload,
  CreateStudentPayload,
  CreateUserPayload,
  CreatedAccount,
  FinalizeEvaluationPayload,
  FacultyPayload,
  ImportFacultiesResult,
  ImportFacultyItem,
  ImportErrorItem,
  ImportMajorPreviewItem,
  ImportMajorsResult,
  ImportStudentPreviewItem,
  ImportStudentsPayload,
  ImportStudentsResult,
  MajorPayload,
  PaginatedResponse,
  PaginationQuery,
  PostPayload,
  ReopenEvaluationPayload,
  ReportQuery,
  ReportsOverview,
  ReviewEvaluationPayload,
  ReviewScoresPayload,
  SemesterPayload,
  SemesterQuery,
  StatusPayload,
  TrainingResultsReport,
  UserListQuery,
} from './api.interface';

/** Người dùng trong màn quản trị. */
export type AdminUser = StudentManagementItem;

/** Khoa trong màn quản trị. */
export type AdminFaculty = Faculty;

/** Ngành trong màn quản trị. */
export type AdminMajor = Major;

/** Lớp trong màn quản trị. */
export type AdminClass = Class;

/** Phiếu đánh giá trong danh sách quản trị. */
export type AdminEvaluationItem = {
  id: string;
  studentId: string;
  studentName?: string;
  status: string;
  semester?: string;
  academicYear?: string;
  totalScore?: number;
  updatedAt?: string;
};

/** Bài viết quản trị tạo hoặc đọc. */
export type Post = {
  id: string;
  title: string;
  content: string;
  authorId?: string;
  createdAt: string;
};
