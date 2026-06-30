export interface Evidence {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  criteriaId: string;
  uploadDate: string;
  aiVerification?: 'verified' | 'suspicious' | 'manual_review';
}
