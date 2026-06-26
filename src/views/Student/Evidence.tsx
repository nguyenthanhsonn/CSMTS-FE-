'use client';

import { useState } from 'react';
import { Upload, File, Trash2, Eye, CheckCircle, AlertCircle } from 'lucide-react';

interface EvidenceFile {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  criteriaId: string;
  uploadDate: string;
  aiVerification?: 'verified' | 'suspicious' | 'manual_review';
}

export const StudentEvidence = () => {
  const [evidences, setEvidences] = useState<EvidenceFile[]>([
    {
      id: '1',
      fileName: 'chung_nhan_hoc_tap.pdf',
      fileType: 'application/pdf',
      fileSize: 245000,
      criteriaId: 'academic',
      uploadDate: '2024-12-01',
      aiVerification: 'verified',
    },
    {
      id: '2',
      fileName: 'giay_khen_clb.jpg',
      fileType: 'image/jpeg',
      fileSize: 450000,
      criteriaId: 'club',
      uploadDate: '2024-12-05',
      aiVerification: 'verified',
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, criteriaId: string) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const newEvidence: EvidenceFile = {
        id: Date.now().toString() + Math.random(),
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        criteriaId,
        uploadDate: new Date().toISOString().split('T')[0],
        aiVerification: 'verified',
      };
      setEvidences((prev) => [...prev, newEvidence]);
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa minh chứng này?')) {
      setEvidences((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const criteriaGroups = [
    { id: 'academic', name: 'Học tập và nghiên cứu khoa học' },
    { id: 'political', name: 'Hoạt động chính trị - xã hội' },
    { id: 'club', name: 'Câu lạc bộ, đội nhóm' },
    { id: 'charity', name: 'Hoạt động từ thiện, tình nguyện' },
    { id: 'leadership', name: 'Vai trò cán bộ' },
  ];

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Quản lý minh chứng</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">Lưu ý khi tải minh chứng</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Hỗ trợ file: JPG, PNG, PDF</li>
          <li>• Dung lượng tối đa: 5MB/file</li>
          <li>• Hệ thống AI sẽ tự động kiểm tra tính hợp lệ của minh chứng</li>
          <li>• Vui lòng chụp rõ nét, đầy đủ thông tin</li>
        </ul>
      </div>

      {criteriaGroups.map((group) => {
        const groupEvidences = evidences.filter((e) => e.criteriaId === group.id);

        return (
          <div key={group.id} className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{group.name}</h2>
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition">
                <Upload size={20} />
                Tải lên
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload(e, group.id)}
                  className="hidden"
                />
              </label>
            </div>

            {groupEvidences.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <File size={48} className="mx-auto mb-2 opacity-50" />
                <p>Chưa có minh chứng</p>
              </div>
            ) : (
              <div className="space-y-3">
                {groupEvidences.map((evidence) => (
                  <div
                    key={evidence.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex-shrink-0">
                      {evidence.fileType.startsWith('image/') ? (
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                          <File className="text-blue-600" size={24} />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                          <File className="text-red-600" size={24} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{evidence.fileName}</p>
                      <p className="text-sm text-gray-600">
                        {formatFileSize(evidence.fileSize)} • {evidence.uploadDate}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {evidence.aiVerification === 'verified' && (
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle size={14} />
                            Đã kiểm tra
                          </span>
                        )}
                        {evidence.aiVerification === 'suspicious' && (
                          <span className="flex items-center gap-1 text-xs text-orange-600">
                            <AlertCircle size={14} />
                            Nghi ngờ không khớp
                          </span>
                        )}
                        {evidence.aiVerification === 'manual_review' && (
                          <span className="flex items-center gap-1 text-xs text-blue-600">
                            <AlertCircle size={14} />
                            Cần kiểm tra thủ công
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(evidence.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
