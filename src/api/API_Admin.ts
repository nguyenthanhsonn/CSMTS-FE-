import { axiosInstance, buildQueryParams, del, get, patch, post } from './api';

import type {
  AddStudentToClassPayload,
  AdminClass,
  AdminEvaluationItem,
  AdminEvaluationListQuery,
  AdminFaculty,
  AdminMajor,
  AdminUser,
  AssignCouncilPayload,
  CreateUserPayload,
  FacultyPayload,
  ImportStudentsPayload,
  ImportStudentsResult,
  MajorPayload,
  PaginatedResponse,
  Post,
  PostPayload,
  ReopenEvaluationPayload,
  ReportQuery,
  ReportsOverview,
  ReviewEvaluationPayload,
  ReviewScoresPayload,
  StatusPayload,
  TrainingResultsReport,
  UserListQuery,
} from '../types';

/** Tạo tài khoản người dùng. */
async function createUser(_accessTokenOrPayload: string | CreateUserPayload, payload?: CreateUserPayload) {
  return post<AdminUser>('/users', payload || _accessTokenOrPayload);
}

/** Lấy danh sách người dùng. */
async function getUsers(_accessTokenOrQuery?: string | UserListQuery, query?: UserListQuery) {
  return get<PaginatedResponse<AdminUser> | AdminUser[]>('/users', {
    params: buildQueryParams(query || (typeof _accessTokenOrQuery === 'object' ? _accessTokenOrQuery : undefined)),
  });
}

/** Lấy thông tin người dùng. */
async function getUserById(_accessTokenOrId: string, id?: string) {
  return get<AdminUser>(`/users/${id || _accessTokenOrId}`);
}

/** Lấy danh sách phiếu đánh giá. */
async function getAdminEvaluationList(query?: AdminEvaluationListQuery) {
  return get<PaginatedResponse<AdminEvaluationItem>>('/training-evaluations', { params: buildQueryParams(query) });
}

/** Mở lại phiếu đánh giá. */
async function reopenEvaluation(id: string, payload?: ReopenEvaluationPayload) {
  return post<AdminEvaluationItem>(`/training-evaluations/${id}/reopen`, payload);
}

/** Ghi nhận điểm hội đồng lớp. */
async function reviewScoresByClassCouncil(id: string, payload: ReviewScoresPayload) {
  return patch<AdminEvaluationItem>(`/training-evaluations/${id}/class-council-review`, payload);
}

/** Duyệt hoặc từ chối phiếu đánh giá. */
async function reviewEvaluation(id: string, payload: ReviewEvaluationPayload) {
  return post<AdminEvaluationItem>(`/training-evaluations/${id}/review`, payload);
}

/** Lấy danh sách khoa. */
async function getFaculties() {
  return get<AdminFaculty[]>('/admin/faculties');
}

/** Lấy thông tin khoa. */
async function getFacultyById(id: string) {
  return get<AdminFaculty>(`/admin/faculties/${id}`);
}

/** Tạo khoa mới. */
async function createFaculty(payload: FacultyPayload) {
  return post<AdminFaculty>('/admin/faculties', payload);
}

/** Cập nhật khoa. */
async function updateFaculty(id: string, payload: Partial<FacultyPayload>) {
  return patch<AdminFaculty>(`/admin/faculties/${id}`, payload);
}

/** Cập nhật trạng thái khoa. */
async function updateFacultyStatus(id: string, payload: StatusPayload) {
  return patch<AdminFaculty>(`/admin/faculties/${id}/status`, payload);
}

/** Xóa khoa. */
async function deleteFaculty(id: string) {
  return del<null>(`/admin/faculties/${id}`);
}

/** Lấy danh sách ngành. */
async function getMajors() {
  return get<AdminMajor[]>('/admin/majors');
}

/** Lấy thông tin ngành. */
async function getMajorById(id: string) {
  return get<AdminMajor>(`/admin/majors/${id}`);
}

/** Tạo ngành mới. */
async function createMajor(payload: MajorPayload) {
  return post<AdminMajor>('/admin/majors', payload);
}

/** Cập nhật ngành. */
async function updateMajor(id: string, payload: Partial<MajorPayload>) {
  return patch<AdminMajor>(`/admin/majors/${id}`, payload);
}

/** Cập nhật trạng thái ngành. */
async function updateMajorStatus(id: string, payload: StatusPayload) {
  return patch<AdminMajor>(`/admin/majors/${id}/status`, payload);
}

/** Xóa ngành. */
async function deleteMajor(id: string) {
  return del<null>(`/admin/majors/${id}`);
}

/** Lấy danh sách lớp. */
async function getClasses() {
  return get<AdminClass[]>('/admin/classes');
}

/** Lấy sinh viên trong lớp. */
async function getClassStudents(classId: string) {
  return get<AdminUser[]>(`/admin/classes/${classId}/students`);
}

/** Thêm sinh viên vào lớp. */
async function addStudentToClass(classId: string, payload: AddStudentToClassPayload) {
  return post<AdminUser>(`/admin/classes/${classId}/students`, payload);
}

/** Xóa sinh viên khỏi lớp. */
async function removeStudentFromClass(classId: string, studentId: string) {
  return del<null>(`/admin/classes/${classId}/students/${studentId}`);
}

/** Tải file mẫu nhập sinh viên. */
async function downloadImportTemplate() {
  const res = await axiosInstance.get<Blob>('/admin/students/import-template', {
    responseType: 'blob',
  });
  return res.data;
}

/** Nhập danh sách sinh viên. */
async function importStudents(payload: ImportStudentsPayload) {
  const formData = new FormData();
  formData.append('file', payload.file);
  if (payload.classId) {
    formData.append('classId', payload.classId);
  }

  return post<ImportStudentsResult>('/admin/students/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

/** Nhập sinh viên vào lớp theo cách cũ. */
async function importStudentsToClass(classId: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return post<ImportStudentsResult>(`/admin/classes/${classId}/students/import`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

/** Phân công hội đồng lớp. */
async function assignClassCouncil(payload: AssignCouncilPayload) {
  return post<unknown>('/council-assignments/class', payload);
}

/** Xóa phân công hội đồng lớp. */
async function removeClassCouncilAssignment(id: string) {
  return del<null>(`/council-assignments/class/${id}`);
}

/** Phân công hội đồng khoa. */
async function assignFacultyCouncil(payload: AssignCouncilPayload) {
  return post<unknown>('/council-assignments/faculty', payload);
}

/** Xóa phân công hội đồng khoa. */
async function removeFacultyCouncilAssignment(id: string) {
  return del<null>(`/council-assignments/faculty/${id}`);
}

/** Lấy số liệu báo cáo tổng quan. */
async function getReportsOverview(query?: ReportQuery) {
  return get<ReportsOverview>('/admin/reports/overview', { params: buildQueryParams(query) });
}

/** Lấy báo cáo kết quả rèn luyện. */
async function getTrainingResultsReport(query?: ReportQuery) {
  return get<TrainingResultsReport>('/admin/reports/training-results', { params: buildQueryParams(query) });
}

/** Lấy báo cáo theo lớp. */
async function getReportsByClass(query?: ReportQuery) {
  return get<TrainingResultsReport>('/admin/reports/classes', { params: buildQueryParams(query) });
}

/** Lấy báo cáo theo khoa. */
async function getReportsByFaculty(query?: ReportQuery) {
  return get<TrainingResultsReport>('/admin/reports/faculties', { params: buildQueryParams(query) });
}

/** Xuất báo cáo Excel. */
async function exportReportExcel(query?: ReportQuery) {
  const res = await axiosInstance.get<Blob>('/admin/reports/export/excel', {
    params: buildQueryParams(query),
    responseType: 'blob',
  });
  return res.data;
}

/** Xuất báo cáo PDF. */
async function exportReportPdf(query?: ReportQuery) {
  const res = await axiosInstance.get<Blob>('/admin/reports/export/pdf', {
    params: buildQueryParams(query),
    responseType: 'blob',
  });
  return res.data;
}

/** Tạo bài viết. */
async function createPost(_accessTokenOrPayload: string | PostPayload, payload?: PostPayload) {
  return post<Post>('/posts', payload || _accessTokenOrPayload);
}

/** Lấy danh sách bài viết. */
async function getPosts(_accessToken?: string) {
  return get<Post[]>('/posts');
}

export const API_Admin = {
  createUser,
  getUsers,
  getUserById,
  getAdminEvaluationList,
  reopenEvaluation,
  reviewScoresByClassCouncil,
  reviewEvaluation,
  getFaculties,
  getFacultyById,
  createFaculty,
  updateFaculty,
  updateFacultyStatus,
  deleteFaculty,
  getMajors,
  getMajorById,
  createMajor,
  updateMajor,
  updateMajorStatus,
  deleteMajor,
  getClasses,
  getClassStudents,
  addStudentToClass,
  removeStudentFromClass,
  downloadImportTemplate,
  importStudents,
  importStudentsToClass,
  assignClassCouncil,
  removeClassCouncilAssignment,
  assignFacultyCouncil,
  removeFacultyCouncilAssignment,
  getReportsOverview,
  getTrainingResultsReport,
  getReportsByClass,
  getReportsByFaculty,
  exportReportExcel,
  exportReportPdf,
  createPost,
  getPosts,
};
