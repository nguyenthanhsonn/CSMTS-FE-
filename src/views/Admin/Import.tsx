'use client';

import { useState } from 'react';
import { Upload, FileSpreadsheet, FileText, CheckCircle, XCircle, Download } from 'lucide-react';

export const AdminImport = () => {
  const [importResult, setImportResult] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate import processing
    setTimeout(() => {
      setImportResult({
        success: 45,
        failed: 2,
        errors: [
          'Dòng 12: Thiếu thông tin ngày sinh - Nguyễn Văn X',
          'Dòng 28: Mã sinh viên đã tồn tại - Trần Thị Y',
        ],
      });
    }, 1500);
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Import danh sách lớp</h1>

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Tải file mẫu</h2>
        <p className="text-gray-600 mb-4">
          Vui lòng tải file mẫu và điền thông tin sinh viên theo đúng định dạng
        </p>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Download size={20} />
            Tải mẫu Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={20} />
            Tải mẫu Word
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Upload file danh sách</h2>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
          <div className="text-center">
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 mb-4">
              Kéo thả file vào đây hoặc click để chọn file
            </p>
            <input
              type="file"
              accept=".xlsx,.xls,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              <FileSpreadsheet size={20} />
              Chọn file
            </label>
            <p className="text-sm text-gray-500 mt-4">
              Hỗ trợ: Excel (.xlsx, .xls), Word (.doc, .docx)
            </p>
          </div>
        </div>
      </div>

      {importResult && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Kết quả import</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="text-green-600" size={24} />
                <span className="text-sm font-medium text-green-900">Thành công</span>
              </div>
              <p className="text-3xl font-bold text-green-600">{importResult.success}</p>
            </div>
            
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="text-red-600" size={24} />
                <span className="text-sm font-medium text-red-900">Thất bại</span>
              </div>
              <p className="text-3xl font-bold text-red-600">{importResult.failed}</p>
            </div>
          </div>

          {importResult.errors.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Chi tiết lỗi:</h3>
              <div className="space-y-2">
                {importResult.errors.map((error, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-red-600">
                    <FileText size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Xác nhận import {importResult.success} sinh viên
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Lưu ý quan trọng</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• File phải đúng định dạng theo mẫu</li>
          <li>• Mã sinh viên không được trùng lặp</li>
          <li>• Các trường bắt buộc: Mã SV, Họ tên, Ngày sinh, Lớp</li>
          <li>• Ngày sinh phải đúng định dạng DD/MM/YYYY</li>
          <li>• Hệ thống sẽ kiểm tra và báo lỗi nếu dữ liệu không hợp lệ</li>
        </ul>
      </div>
    </div>
  );
};
