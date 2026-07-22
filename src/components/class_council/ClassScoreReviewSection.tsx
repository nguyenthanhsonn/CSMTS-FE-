'use client';

import { AlertCircle, Paperclip } from 'lucide-react';
import CustomSelect from '../common/CustomSelect';
import type { ClassScoreReviewSectionProps } from '@/types/admin';

const buildScoreOptions = (maxScore: number) =>
  Array.from({ length: maxScore + 1 }, (_, value) => ({
    id: String(value),
    name: `${value} điểm`,
  }));

export default function ClassScoreReviewSection({
  section,
  hasError,
  onScoreChange,
  onOpenEvidence,
}: ClassScoreReviewSectionProps) {
  return (
    <section className={`rounded-xl border bg-white p-4 shadow-sm ${hasError ? 'border-[#C92A2A] ring-2 ring-[#C92A2A]/10' : 'border-[#E9ECEF]'}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#1A1B1E]">{section.title}</h2>
          <p className="mt-1 text-xs text-[#868E96]">Thang điểm tối đa: {section.maxScore}</p>
        </div>
        {section.evidences.length > 0 && (
          <button
            type="button"
            onClick={() => onOpenEvidence(section)}
            className="inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-[#DEE2E6] bg-white px-3 py-2 text-sm font-semibold text-[#3B5BDB] transition hover:bg-[#EDF2FF]"
          >
            <Paperclip size={15} />
            Xem minh chứng đính kèm
          </button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#868E96]">Điểm SV tự đánh giá</label>
          <input
            value={`${section.selfScore} điểm`}
            disabled
            className="h-10 w-full rounded-lg border border-[#DEE2E6] bg-[#F8F9FA] px-3 text-sm font-semibold text-[#868E96]"
          />
        </div>
        <div>
          <CustomSelect
            label="Điểm Lớp đánh giá"
            required
            value={section.classScore}
            onChange={(value) => onScoreChange(section.id, value)}
            options={buildScoreOptions(section.maxScore)}
          />
          {hasError && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-[#C92A2A]">
              <AlertCircle size={13} />
              Vui lòng nhập điểm Lớp đánh giá.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
