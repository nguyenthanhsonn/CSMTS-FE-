export interface EvidenceFile {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  criteriaId: string;
  uploadDate: string;
  aiVerification?: 'verified' | 'suspicious' | 'manual_review';
}
