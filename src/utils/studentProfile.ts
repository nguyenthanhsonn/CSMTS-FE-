import type { Student } from '../types';

type StudentProfilePayload = Partial<Student> & {
  user?: Partial<Student> | null;
  studentCode?: string | null;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
};

export function normalizeStudentProfile(
  baseUser: Partial<Student> | null | undefined,
  profile: StudentProfilePayload | null | undefined,
): Student {
  const nestedUser = profile?.user || {};
  const merged = {
    ...(baseUser || {}),
    ...nestedUser,
    ...(profile || {}),
  } as StudentProfilePayload;

  return {
    ...merged,
    id: merged.id || nestedUser.id || baseUser?.id || '',
    username: merged.username || nestedUser.username || baseUser?.username || '',
    role: 'student',
    isActive: merged.isActive ?? nestedUser.isActive ?? baseUser?.isActive ?? true,
    studentCode: profile?.studentCode || nestedUser.studentCode || baseUser?.studentCode || '',
    fullName: profile?.fullName || nestedUser.fullName || baseUser?.fullName || '',
    email: profile?.email || nestedUser.email || baseUser?.email || '',
    phone: profile?.phone || nestedUser.phone || baseUser?.phone || '',
    phoneNumber: profile?.phoneNumber || nestedUser.phoneNumber || baseUser?.phoneNumber || '',
    dateOfBirth: profile?.dateOfBirth || nestedUser.dateOfBirth || baseUser?.dateOfBirth || '',
    class: profile?.class || baseUser?.class,
    major: profile?.major || baseUser?.major,
    faculty: profile?.faculty || baseUser?.faculty,
  } as Student;
}
