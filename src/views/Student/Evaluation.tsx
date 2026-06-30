import { useState } from 'react';
import { Save, Send, Calculator } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import type { EvaluationForm } from '../../types/student';
import { createMockEvaluationForm } from '../../services/mockData';
import { calculateTotalScore } from '../../services/scoreCalculator';

export const StudentEvaluation = () => {
  const user = useAuthStore((state) => state.user);
  const [form, setForm] = useState<EvaluationForm>(() => 
    createMockEvaluationForm(user?.id || '')
  );
  const [showScores, setShowScores] = useState(false);

  const updateForm = (updates: Partial<EvaluationForm>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const handleCalculate = () => {
    const updatedForm = calculateTotalScore(form);
    setForm(updatedForm);
    setShowScores(true);
  };

  const handleSaveDraft = () => {
    localStorage.setItem('evaluation_draft', JSON.stringify(form));
    alert('Đã lưu nháp thành công!');
  };

  const handleSubmit = () => {
    if (!form.academicPerformance.averageScore) {
      alert('Vui lòng nhập đầy đủ thông tin bắt buộc!');
      return;
    }
    const updatedForm = calculateTotalScore({ ...form, status: 'submitted', submittedAt: new Date().toISOString() });
    setForm(updatedForm);
    alert('Nộp phiếu thành công!');
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Phiếu đánh giá rèn luyện</h1>
        <div className="flex gap-3">
          <button
            onClick={handleCalculate}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Calculator size={20} />
            Tính điểm
          </button>
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <Save size={20} />
            Lưu nháp
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Send size={20} />
            Nộp phiếu
          </button>
        </div>
      </div>

      {/* Module 2: Đánh giá ý thức học tập */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6 text-blue-600">
          1. Đánh giá ý thức học tập (Tối đa 30 điểm)
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Điểm trung bình học tập *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={form.academicPerformance.averageScore}
              onChange={(e) => updateForm({
                academicPerformance: {
                  ...form.academicPerformance,
                  averageScore: parseFloat(e.target.value) || 0
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Nhập điểm TB (thang 4.0)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Xếp loại học tập học kỳ
            </label>
            <select
              value={form.academicPerformance.academicRanking}
              onChange={(e) => updateForm({
                academicPerformance: {
                  ...form.academicPerformance,
                  academicRanking: e.target.value as any
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="excellent">Xuất sắc</option>
              <option value="good">Giỏi</option>
              <option value="average">Khá</option>
              <option value="below_average">Trung bình</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.academicPerformance.hasResearchActivity}
                onChange={(e) => updateForm({
                  academicPerformance: {
                    ...form.academicPerformance,
                    hasResearchActivity: e.target.checked
                  }
                })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">Tham gia nghiên cứu khoa học</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.academicPerformance.hasCompetitionAward}
                onChange={(e) => updateForm({
                  academicPerformance: {
                    ...form.academicPerformance,
                    hasCompetitionAward: e.target.checked
                  }
                })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">Đạt giải Olympic hoặc cuộc thi chuyên môn</span>
            </label>
          </div>
        </div>

        {showScores && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-900">
              Điểm tạm tính: <span className="text-xl">{form.scores.academic}</span>/30
            </p>
          </div>
        )}
      </div>

      {/* Module 3: Đánh giá chấp hành nội quy */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6 text-blue-600">
          2. Chấp hành nội quy, quy chế (Tối đa 25 điểm)
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số lần đi trễ
            </label>
            <input
              type="number"
              min="0"
              value={form.discipline.lateAttendance}
              onChange={(e) => updateForm({
                discipline: {
                  ...form.discipline,
                  lateAttendance: parseInt(e.target.value) || 0
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-sm text-gray-600 mt-1">Mỗi lần đi trễ trừ 1 điểm</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số buổi vắng không phép
            </label>
            <input
              type="number"
              min="0"
              value={form.discipline.absenceWithoutPermission}
              onChange={(e) => updateForm({
                discipline: {
                  ...form.discipline,
                  absenceWithoutPermission: parseInt(e.target.value) || 0
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-sm text-gray-600 mt-1">Mỗi buổi vắng trừ 2 điểm</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số lần vi phạm khác
            </label>
            <input
              type="number"
              min="0"
              value={form.discipline.otherViolations}
              onChange={(e) => updateForm({
                discipline: {
                  ...form.discipline,
                  otherViolations: parseInt(e.target.value) || 0
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-sm text-gray-600 mt-1">Mỗi lần vi phạm trừ 3 điểm</p>
          </div>
        </div>

        {showScores && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-900">
              Điểm tạm tính: <span className="text-xl">{form.scores.discipline}</span>/25
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Điểm bị trừ: {25 - form.scores.discipline}
            </p>
          </div>
        )}
      </div>

      {/* Module 4: Hoạt động chính trị, xã hội */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6 text-blue-600">
          3. Hoạt động chính trị, xã hội, văn hóa, thể thao (Tối đa 20 điểm)
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mức độ tham gia hoạt động chính trị, xã hội
            </label>
            <select
              value={form.politicalSocial.participationLevel}
              onChange={(e) => updateForm({
                politicalSocial: {
                  ...form.politicalSocial,
                  participationLevel: e.target.value as any
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="none">Không tham gia</option>
              <option value="occasional">Thỉnh thoảng</option>
              <option value="regular">Thường xuyên</option>
              <option value="active">Tích cực</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Văn hóa, văn nghệ, thể thao
            </label>
            <select
              value={form.politicalSocial.culturalSportsLevel}
              onChange={(e) => updateForm({
                politicalSocial: {
                  ...form.politicalSocial,
                  culturalSportsLevel: e.target.value as any
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="none">Không tham gia</option>
              <option value="occasional">Thỉnh thoảng</option>
              <option value="regular">Thường xuyên</option>
              <option value="active">Tích cực</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Câu lạc bộ, đội, nhóm
            </label>
            <select
              value={form.politicalSocial.clubParticipation}
              onChange={(e) => updateForm({
                politicalSocial: {
                  ...form.politicalSocial,
                  clubParticipation: e.target.value as any
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="none">Không tham gia</option>
              <option value="member">Thành viên</option>
              <option value="leader">Cán bộ/Trưởng nhóm</option>
            </select>
          </div>
        </div>

        {showScores && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-900">
              Điểm tạm tính: <span className="text-xl">{form.scores.politicalSocial}</span>/20
            </p>
          </div>
        )}
      </div>

      {/* Module 5: Ý thức công dân */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6 text-blue-600">
          4. Ý thức công dân trong quan hệ cộng đồng (Tối đa 15 điểm)
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chấp hành chủ trương, chính sách, pháp luật
            </label>
            <select
              value={form.community.policyCompliance}
              onChange={(e) => updateForm({
                community: {
                  ...form.community,
                  policyCompliance: e.target.value as any
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="average">Trung bình</option>
              <option value="good">Tốt</option>
              <option value="excellent">Xuất sắc</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tham gia hoạt động nhân đạo, từ thiện, tình nguyện
            </label>
            <select
              value={form.community.charityParticipation}
              onChange={(e) => updateForm({
                community: {
                  ...form.community,
                  charityParticipation: e.target.value as any
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="none">Không tham gia</option>
              <option value="occasional">Thỉnh thoảng</option>
              <option value="regular">Thường xuyên</option>
              <option value="active">Tích cực</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ý thức xây dựng tập thể, giữ gìn môi trường
            </label>
            <select
              value={form.community.environmentalAwareness}
              onChange={(e) => updateForm({
                community: {
                  ...form.community,
                  environmentalAwareness: e.target.value as any
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="average">Trung bình</option>
              <option value="good">Tốt</option>
              <option value="excellent">Xuất sắc</option>
            </select>
          </div>
        </div>

        {showScores && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-900">
              Điểm tạm tính: <span className="text-xl">{form.scores.community}</span>/15
            </p>
          </div>
        )}
      </div>

      {/* Module 6: Vai trò cán bộ */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6 text-blue-600">
          5. Vai trò cán bộ lớp, đoàn hội, câu lạc bộ (Tối đa 10 điểm)
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vai trò
            </label>
            <select
              value={form.leadership.roleType}
              onChange={(e) => updateForm({
                leadership: {
                  ...form.leadership,
                  roleType: e.target.value as any
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="regular_student">Sinh viên thường</option>
              <option value="class_leader">Cán bộ lớp</option>
              <option value="union_leader">BCH Đoàn/Hội</option>
              <option value="club_leader">Cán bộ CLB/Đội/Nhóm</option>
            </select>
          </div>

          {form.leadership.roleType !== 'regular_student' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mức độ hoàn thành nhiệm vụ
              </label>
              <select
                value={form.leadership.performanceLevel || 'average'}
                onChange={(e) => updateForm({
                  leadership: {
                    ...form.leadership,
                    performanceLevel: e.target.value as any
                  }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="average">Trung bình</option>
                <option value="good">Tốt</option>
                <option value="excellent">Xuất sắc</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tham gia hoạt động lớp, khoa, Học viện
              </label>
              <select
                value={form.leadership.classActivityLevel || 'none'}
                onChange={(e) => updateForm({
                  leadership: {
                    ...form.leadership,
                    classActivityLevel: e.target.value as any
                  }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="none">Không tham gia</option>
                <option value="occasional">Thỉnh thoảng</option>
                <option value="regular">Thường xuyên</option>
                <option value="active">Tích cực</option>
              </select>
            </div>
          )}
        </div>

        {showScores && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-900">
              Điểm tạm tính: <span className="text-xl">{form.scores.leadership}</span>/10
            </p>
          </div>
        )}
      </div>

      {/* Tổng điểm */}
      {showScores && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Tổng điểm rèn luyện</h2>
            <div className="text-6xl font-bold mb-4">{form.scores.total}</div>
            <div className="text-xl mb-6">
              Xếp loại: {
                form.rating === 'excellent' ? 'Xuất sắc' :
                form.rating === 'good' ? 'Tốt' :
                form.rating === 'average' ? 'Khá' :
                form.rating === 'below_average' ? 'Trung bình' : 'Yếu'
              }
            </div>
            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>
                <p className="opacity-80">Học tập</p>
                <p className="text-2xl font-bold">{form.scores.academic}</p>
              </div>
              <div>
                <p className="opacity-80">Nội quy</p>
                <p className="text-2xl font-bold">{form.scores.discipline}</p>
              </div>
              <div>
                <p className="opacity-80">CT-XH</p>
                <p className="text-2xl font-bold">{form.scores.politicalSocial}</p>
              </div>
              <div>
                <p className="opacity-80">Cộng đồng</p>
                <p className="text-2xl font-bold">{form.scores.community}</p>
              </div>
              <div>
                <p className="opacity-80">Vai trò CB</p>
                <p className="text-2xl font-bold">{form.scores.leadership}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEvaluation;
