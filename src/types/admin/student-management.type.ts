export interface StudentManagementItem {
  id: string;
  username: string;
  fullName: string;
  role: 'student' | 'admin';
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  studentCode?: string;
  facultyId?: string;
  majorId?: string;
  classId?: string;
  admissionYear?: string;
  isActive: boolean;
}

export interface ClassListStudentItem {
  id: string;
  studentCode: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
}
