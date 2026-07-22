'use client';

import { useState } from 'react';
import { Check, ExternalLink, FileImage, FileText, X } from 'lucide-react';
import type { ReviewEvidence, EvidenceReviewModalProps } from '@/types/admin';

export type { ReviewEvidence };

export default function EvidenceReviewModal({
  isOpen,
  evidences,
  onClose,
  onApprove,
  onReject,
}: EvidenceReviewModalProps) {
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleReject = (evidenceId: string) => {
    if (rejectingId !== evidenceId) {
      setRejectingId(evidenceId);
      setReason('');
      return;
    }
    if (!reason.trim()) return;
    onReject(evidenceId, reason.trim());
    setRejectingId(null);
    setReason('');
  };

  return (
    <>
      <div className="fixed inset-0 z-40 cursor-pointer bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative flex max-h-[88vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl">
          <div className="flex items-start justify-between gap-4 border-b border-[#E9ECEF] px-6 py-4">
            <div>
              <h2 className="text-base font-bold text-[#1A1B1E]">Minh chứng đính kèm</h2>
              <p className="mt-0.5 text-xs text-[#868E96]">Kiểm tra và xác nhận từng tệp minh chứng của sinh viên.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#868E96] transition hover:bg-[#F8F9FA] hover:text-[#1A1B1E]"
              aria-label="Đóng modal"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-3 overflow-y-auto px-6 py-5">
            {evidences.map((evidence) => {
              const FileIcon = evidence.fileType === 'pdf' ? FileText : FileImage;
              return (
                <div key={evidence.id} className="rounded-xl border border-[#E9ECEF] p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EDF2FF] text-[#3B5BDB]">
                        <FileIcon size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#1A1B1E]">{evidence.fileName}</p>
                        <p className="mt-0.5 text-xs text-[#868E96]">
                          {evidence.status === 'approved' ? 'Đã duyệt' : evidence.status === 'rejected' ? 'Đã từ chối' : 'Chờ duyệt'}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={evidence.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#DEE2E6] bg-white px-3 py-2 text-sm font-semibold text-[#495057] transition hover:bg-[#F8F9FA]"
                      >
                        <ExternalLink size={15} />
                        Xem
                      </a>
                      <button
                        type="button"
                        onClick={() => onApprove(evidence.id)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#2F9E44] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#2B8A3E]"
                      >
                        <Check size={15} />
                        Duyệt
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(evidence.id)}
                        disabled={rejectingId === evidence.id && !reason.trim()}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#C92A2A] bg-white px-3 py-2 text-sm font-semibold text-[#C92A2A] transition hover:bg-[#FFF5F5] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <X size={15} />
                        Từ chối
                      </button>
                    </div>
                  </div>

                  {rejectingId === evidence.id && (
                    <div className="mt-3">
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#868E96]">
                        Lý do từ chối <span className="text-[#C92A2A]">*</span>
                      </label>
                      <textarea
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        className="h-20 w-full rounded-lg border border-[#DEE2E6] p-2.5 text-sm text-[#1A1B1E] outline-none transition focus:border-[#C92A2A] focus:ring-2 focus:ring-[#C92A2A]/10"
                        placeholder="Nhập lý do từ chối minh chứng"
                      />
                    </div>
                  )}
                </div>
              );
            })}
            {evidences.length === 0 && (
              <div className="rounded-xl border border-dashed border-[#DEE2E6] px-4 py-10 text-center text-sm text-[#868E96]">
                Mục này chưa có minh chứng đính kèm.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
