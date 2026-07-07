import { buildQueryParams, del, get, patch, post } from './api';

import type {
  AcademicYear,
  Class,
  CreateEvaluationPayload,
  EvaluationStatusResponse,
  EvaluationSummary,
  Faculty,
  LinkEvidenceUrlPayload,
  Major,
  NotificationListQuery,
  NotificationListResponse,
  ScoreSectionPayload,
  ScoreSectionResponse,
  Semester,
  StudentEvaluation,
  StudentEvidence,
  StudentProfile,
  StudentProfileUpdatePayload,
  UpdateEvaluationNotePayload,
} from '../types';

/** Lấy hồ sơ sinh viên. */
async function getMyProfile(_accessToken?: string) {
  return get<StudentProfile>('/students/me');
}

/** Cập nhật hồ sơ sinh viên. */
async function updateMyProfile(payload: StudentProfileUpdatePayload) {
  return patch<StudentProfile>('/students/me', payload);
}

/** Lấy danh sách phiếu của sinh viên. */
async function getMyEvaluationList(_accessToken?: string) {
  return get<StudentEvaluation[]>('/students/me/evaluations');
}

/** Lấy danh sách học kỳ. */
async function getSemesters() {
  return get<Semester[]>('/semesters');
}

/** Lấy danh sách năm học. */
async function getAcademicYears() {
  return get<AcademicYear[]>('/academic-years');
}

/** Lấy danh sách khoa. */
async function getFaculties() {
  return get<Faculty[]>('/metadata/faculties');
}

/** Lấy danh sách ngành. */
async function getMajors(facultyId?: string) {
  return get<Major[]>('/metadata/majors', { params: buildQueryParams({ facultyId }) });
}

/** Lấy danh sách lớp. */
async function getClasses(majorId?: string) {
  return get<Class[]>('/metadata/classes', { params: buildQueryParams({ majorId }) });
}

/** Tạo phiếu đánh giá mới. */
async function createEvaluation(_accessTokenOrPayload: string | CreateEvaluationPayload, semester?: string, academicYear?: string) {
  const payload =
    typeof _accessTokenOrPayload === 'string'
      ? ({ semester: semester || '', academicYear: academicYear || '' } satisfies CreateEvaluationPayload)
      : _accessTokenOrPayload;

  return post<StudentEvaluation>('/training-evaluations', payload);
}

/** Lấy phiếu đánh giá của sinh viên. */
async function getMyEvaluations(_accessToken?: string) {
  return get<StudentEvaluation[]>('/training-evaluations/me');
}

/** Lấy chi tiết phiếu đánh giá. */
async function getEvaluationDetail(_accessTokenOrId: string, id?: string) {
  return get<StudentEvaluation>(`/training-evaluations/${id || _accessTokenOrId}`);
}

/** Cập nhật ghi chú phiếu đánh giá. */
async function updateEvaluationNote(
  _accessTokenOrId: string,
  idOrPayload: string | UpdateEvaluationNotePayload,
  payload?: UpdateEvaluationNotePayload
) {
  const id = typeof idOrPayload === 'string' ? idOrPayload : _accessTokenOrId;
  const data = typeof idOrPayload === 'string' ? payload : idOrPayload;

  return patch<StudentEvaluation>(`/training-evaluations/${id}`, data);
}

/** Lấy tổng hợp điểm của phiếu. */
async function getEvaluationSummary(id: string) {
  return get<EvaluationSummary>(`/training-evaluations/${id}/summary`);
}

/** Lấy trạng thái phiếu đánh giá. */
async function getEvaluationStatus(id: string) {
  return get<EvaluationStatusResponse>(`/training-evaluations/${id}/status`);
}

/** Lấy điểm học tập. */
async function getStudyScore(_accessTokenOrId: string, id?: string) {
  return getScoreSection(id || _accessTokenOrId, 'study-score');
}

/** Cập nhật điểm học tập. */
async function updateStudyScore(_accessTokenOrId: string, idOrPayload: string | ScoreSectionPayload, payload?: ScoreSectionPayload) {
  return updateScoreSection(_accessTokenOrId, idOrPayload, payload, 'study-score');
}

/** Lấy điểm chấp hành nội quy. */
async function getDisciplineScore(_accessTokenOrId: string, id?: string) {
  return getScoreSection(id || _accessTokenOrId, 'discipline-score');
}

/** Cập nhật điểm chấp hành nội quy. */
async function updateDisciplineScore(
  _accessTokenOrId: string,
  idOrPayload: string | ScoreSectionPayload,
  payload?: ScoreSectionPayload
) {
  return updateScoreSection(_accessTokenOrId, idOrPayload, payload, 'discipline-score');
}

/** Lấy điểm hoạt động. */
async function getActivityScore(_accessTokenOrId: string, id?: string) {
  return getScoreSection(id || _accessTokenOrId, 'activity-score');
}

/** Cập nhật điểm hoạt động. */
async function updateActivityScore(_accessTokenOrId: string, idOrPayload: string | ScoreSectionPayload, payload?: ScoreSectionPayload) {
  return updateScoreSection(_accessTokenOrId, idOrPayload, payload, 'activity-score');
}

/** Lấy điểm ý thức cộng đồng. */
async function getCommunityScore(_accessTokenOrId: string, id?: string) {
  return getScoreSection(id || _accessTokenOrId, 'community-score');
}

/** Cập nhật điểm ý thức cộng đồng. */
async function updateCommunityScore(
  _accessTokenOrId: string,
  idOrPayload: string | ScoreSectionPayload,
  payload?: ScoreSectionPayload
) {
  return updateScoreSection(_accessTokenOrId, idOrPayload, payload, 'community-score');
}

/** Lấy điểm vai trò và thành tích. */
async function getRoleScore(_accessTokenOrId: string, id?: string) {
  return getScoreSection(id || _accessTokenOrId, 'role-score');
}

/** Cập nhật điểm vai trò và thành tích. */
async function updateRoleScore(_accessTokenOrId: string, idOrPayload: string | ScoreSectionPayload, payload?: ScoreSectionPayload) {
  return updateScoreSection(_accessTokenOrId, idOrPayload, payload, 'role-score');
}

/** Nộp phiếu đánh giá. */
async function submitEvaluation(id: string) {
  return post<StudentEvaluation>(`/training-evaluations/${id}/submit`);
}

/** Thêm minh chứng bằng đường dẫn. */
async function linkEvidenceUrl(payload: LinkEvidenceUrlPayload) {
  return post<StudentEvidence>('/evidences/link-url', payload);
}

/** Lấy minh chứng của sinh viên. */
async function getMyEvidences() {
  return get<StudentEvidence[]>('/evidences/my');
}

/** Xóa minh chứng. */
async function deleteEvidence(id: string) {
  return del<null>(`/evidences/${id}`);
}

/** Lấy danh sách thông báo. */
async function getNotifications(query?: NotificationListQuery) {
  return get<NotificationListResponse>('/notifications', { params: buildQueryParams(query) });
}

/** Lấy số thông báo chưa đọc. */
async function getUnreadCount() {
  return get<{ count: number }>('/notifications/unread-count');
}

/** Đánh dấu một thông báo đã đọc. */
async function markAsRead(id: string) {
  return patch<null>(`/notifications/${id}/read`);
}

/** Đánh dấu tất cả thông báo đã đọc. */
async function markAllAsRead() {
  return patch<null>('/notifications/read-all');
}

function getScoreSection(id: string, section: string) {
  return get<ScoreSectionResponse>(`/training-evaluations/${id}/${section}`);
}

function updateScoreSection(
  accessTokenOrId: string,
  idOrPayload: string | ScoreSectionPayload,
  payload: ScoreSectionPayload | undefined,
  section: string
) {
  const id = typeof idOrPayload === 'string' ? idOrPayload : accessTokenOrId;
  const data = typeof idOrPayload === 'string' ? payload : idOrPayload;

  return patch<ScoreSectionResponse>(`/training-evaluations/${id}/${section}`, data);
}

/** Lấy hồ sơ sinh viên cho màn cũ. */
async function getProfile(_accessToken?: string) {
  return getMyProfile();
}

/** Cập nhật hồ sơ sinh viên cho màn cũ. */
async function updateProfile(_accessToken: string, phone: string) {
  return updateMyProfile({ phone });
}

/** Lấy danh sách phiếu cho màn cũ. */
async function getEvaluations(_accessToken?: string) {
  return getMyEvaluationList();
}

export const API_Student = {
  getMyProfile,
  updateMyProfile,
  getMyEvaluationList,
  getSemesters,
  getAcademicYears,
  getFaculties,
  getMajors,
  getClasses,
  createEvaluation,
  getMyEvaluations,
  getEvaluationDetail,
  updateEvaluationNote,
  updateEvaluationDraft: updateEvaluationNote,
  getEvaluationSummary,
  getEvaluationStatus,
  getStudyScore,
  updateStudyScore,
  getDisciplineScore,
  updateDisciplineScore,
  getActivityScore,
  updateActivityScore,
  getCommunityScore,
  updateCommunityScore,
  getRoleScore,
  updateRoleScore,
  submitEvaluation,
  linkEvidenceUrl,
  getMyEvidences,
  deleteEvidence,
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  getProfile,
  updateProfile,
  getEvaluations,
};
