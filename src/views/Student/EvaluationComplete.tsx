'use client';

import { useState } from 'react';
import { Save, Send, Calculator, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { EvaluationPages345 } from './EvaluationPages345';

export const StudentEvaluationComplete = () => {
  const [showScores, setShowScores] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    page1: true,
    page2: false,
    page3: false,
    page4: false,
    page5: false,
  });
  
  // Mục I: Ý thức học tập (0-20 điểm)
  const [attendanceScore, setAttendanceScore] = useState<string>('ge9');
  const [hasFullParticipation, setHasFullParticipation] = useState(false);
  const [hasPublication, setHasPublication] = useState(false);
  const [hasAward, setHasAward] = useState(false);
  const [academicRank, setAcademicRank] = useState<string>('excellent');
  
  // Mục II: Nội quy (0-25 điểm)
  const [weeklyMeetingAbsence, setWeeklyMeetingAbsence] = useState(0);
  const [weeklyMeetingLate, setWeeklyMeetingLate] = useState(0);
  const [classActivityAbsence, setClassActivityAbsence] = useState(0);
  const [noStudentCard, setNoStudentCard] = useState(0);
  const [facilityViolation, setFacilityViolation] = useState(0);
  const [latePayment, setLatePayment] = useState(0);
  const [examWarning, setExamWarning] = useState(0);
  const [examViolation, setExamViolation] = useState(0);
  const [examSuspension, setExamSuspension] = useState(0);
  
  // Mục III: Hoạt động CT-XH (0-20 điểm)
  const [politicalActivity, setPoliticalActivity] = useState<string>('full');
  const [culturalActivity, setCulturalActivity] = useState<string>('full_effective');
  const [clubActivity, setClubActivity] = useState<string>('full_effective');
  const [antiSocial, setAntiSocial] = useState<string>('very_active');
  const [awardPoints, setAwardPoints] = useState(0);
  
  // Mục IV: Ý thức công dân (0-25 điểm)
  const [policyCompliance, setPolicyCompliance] = useState<string>('good_propaganda');
  const [charityWork, setCharityWork] = useState<string>('active');
  const [collectiveBuilding, setCollectiveBuilding] = useState<string>('good');
  
  // Mục V: Vai trò cán bộ (0-10 điểm)
  const [roleType, setRoleType] = useState<'cadre' | 'regular'>('regular');
  const [cadrePosition, setCadrePosition] = useState<string>('main_leader');
  const [cadrePerformance, setCadrePerformance] = useState<string>('excellent');
  const [managementLevel, setManagementLevel] = useState<string>('head');
  const [classParticipation, setClassParticipation] = useState(3);
  const [specialAchievement, setSpecialAchievement] = useState<string>('none');
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({...prev, [section]: !prev[section]}));
  };
  
  const calculateScores = () => {
    // Mục I
    const attendanceMap: {[key: string]: number} = {
      'ge9': 6, '7to9': 5, '5to7': 4, '4to5': 2, '1to4': 1
    };
    const researchPoints = (hasFullParticipation ? 2 : 0) + (hasPublication ? 2 : 0) + (hasAward ? 2 : 0);
    const rankMap: {[key: string]: number} = {
      'excellent': 8, 'good': 7, 'fair': 6, 'average': 4, 'weak': 2, 'weak_warning': 1
    };
    const score1 = attendanceMap[attendanceScore] + researchPoints + rankMap[academicRank];
    
    // Mục II
    const deduction = weeklyMeetingAbsence * 10 + weeklyMeetingLate * 3 + 
                     classActivityAbsence * 5 + noStudentCard * 5 + 
                     facilityViolation * 5 + latePayment * 5 + 
                     examWarning * 5 + examViolation * 10 + examSuspension * 20;
    const score2 = Math.max(25 - deduction, 0);
    
    // Mục III
    const politicalMap: {[key: string]: number} = {
      'full': 5, 'absent1': 3, 'absent2': 2, 'absent3plus': 0
    };
    const culturalMap: {[key: string]: number} = {
      'full_effective': 5, 'over50': 3, 'encourage': 2, 'under50': 1, 'none': 0
    };
    const clubMap: {[key: string]: number} = {
      'full_effective': 5, 'active': 3, 'member': 2, 'under50': 1, 'none': 0
    };
    const antiSocialMap: {[key: string]: number} = {
      'very_active': 3, 'active': 2, 'aware': 1, 'warned': 0
    };
    const score3 = politicalMap[politicalActivity] + culturalMap[culturalActivity] + 
                  clubMap[clubActivity] + antiSocialMap[antiSocial] + Math.min(awardPoints, 2);
    
    // Mục IV
    const policyMap: {[key: string]: number} = {
      'awarded': 10, 'good_propaganda': 8, 'comply': 5, 'warned': 0
    };
    const charityMap: {[key: string]: number} = {
      'awarded': 10, 'active': 8, 'aware': 5, 'disruptive': 0, 'none': 0
    };
    const collectiveMap: {[key: string]: number} = {
      'good': 5, 'warned1': 1, 'warned2': 0
    };
    const score4 = policyMap[policyCompliance] + charityMap[charityWork] + collectiveMap[collectiveBuilding];
    
    // Mục V
    let score5 = 0;
    if (roleType === 'cadre') {
      const perfMap: {[key: string]: number} = cadrePosition === 'main_leader' 
        ? { 'excellent': 7, 'good': 6, 'complete': 4, 'incomplete': 0 }
        : { 'excellent': 7, 'good': 6, 'complete': 5, 'incomplete': 0 };
      const mgmtMap: {[key: string]: number} = {
        'head': 3, 'deputy': 2, 'member': 1
      };
      score5 = perfMap[cadrePerformance] + mgmtMap[managementLevel];
    } else {
      const achieveMap: {[key: string]: number} = {
        'university_level': 7, 'faculty_level': 5, 'none': 0
      };
      score5 = Math.min(classParticipation, 3) + achieveMap[specialAchievement];
    }
    score5 = Math.min(score5, 10);
    
    return {
      score1: Math.min(score1, 20),
      score2,
      score3: Math.min(score3, 20),
      score4: Math.min(score4, 25),
      score5,
      total: Math.min(score1, 20) + score2 + Math.min(score3, 20) + Math.min(score4, 25) + score5,
      deduction
    };
  };
  
  const scores = showScores ? calculateScores() : null;
  
  const getRating = (total: number) => {
    if (total >= 90) return { text: 'Xuất sắc', color: 'text-green-600', bg: 'bg-green-50' };
    if (total >= 80) return { text: 'Tốt', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (total >= 65) return { text: 'Khá', color: 'text-purple-600', bg: 'bg-purple-50' };
    if (total >= 50) return { text: 'Trung bình', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (total >= 35) return { text: 'Yếu', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { text: 'Kém', color: 'text-red-600', bg: 'bg-red-50' };
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Phiếu đánh giá kết quả rèn luyện</h1>
          <p className="text-sm text-gray-600 mt-1">Tổng cộng: 100 điểm (5 mục đánh giá)</p>
        </div>
        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          <button
            onClick={() => setShowScores(true)}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer text-sm font-semibold w-full sm:w-auto"
          >
            <Calculator size={18} />
            Tính điểm
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer text-sm font-semibold w-full sm:w-auto">
            <Save size={18} />
            Lưu nháp
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer text-sm font-semibold w-full sm:w-auto">
            <Send size={18} />
            Nộp phiếu
          </button>
        </div>
      </div>

      {/* TRANG 1: Mục I - Ý thức học tập */}
      <div className="bg-white rounded-xl shadow-sm border mb-6">
        <div 
          className="p-4 sm:p-6 cursor-pointer flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl"
          onClick={() => toggleSection('page1')}
        >
          <div className="min-w-0 pr-4">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900">TRANG 1</h2>
            <h3 className="text-base sm:text-lg font-semibold text-blue-700 mt-1 leading-snug">
              I. Ý thức tham gia học tập (Tối đa 20 điểm)
            </h3>
          </div>
          {expandedSections.page1 ? <ChevronUp size={20} className="shrink-0" /> : <ChevronDown size={20} className="shrink-0" />}
        </div>

        {expandedSections.page1 && (
          <div className="p-6 space-y-6">
            {/* Mục 1 */}
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-4">
                1. Ý thức và thái độ học tập (ý thức chuyên cần) - Tối đa 6 điểm
              </h4>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Điểm TB đánh giá thường xuyên học kỳ <span className="text-red-500">*</span>
              </label>
              <select
                value={attendanceScore}
                onChange={(e) => setAttendanceScore(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="ge9">a) ≥9 (6 điểm)</option>
                <option value="7to9">b) Từ 7 đến cận 9 (5 điểm)</option>
                <option value="5to7">c) Từ 5 đến cận 7 (4 điểm)</option>
                <option value="4to5">d) Từ 4 đến cận 5 (2 điểm)</option>
                <option value="1to4">e) Từ 1 đến cận 4 (1 điểm)</option>
              </select>
            </div>

            {/* Mục 2 */}
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-4">
                2. Hoạt động học thuật, NCKH, Olympic - Tối đa 6 điểm
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                💡 Tất cả file đính kèm sẽ được AI kiểm tra đúng nội dung khen thưởng
              </p>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-white rounded-lg transition">
                  <input
                    type="checkbox"
                    checked={hasFullParticipation}
                    onChange={(e) => setHasFullParticipation(e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <span className="text-gray-900 font-medium">a) Tham gia đầy đủ hoạt động NCKH, học thuật (2 điểm)</span>
                    <p className="text-sm text-gray-600 mt-1">✅ Có minh chứng (file đính kèm)</p>
                    {hasFullParticipation && (
                      <button className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                        <Upload size={16} />
                        Tải minh chứng
                      </button>
                    )}
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-white rounded-lg transition">
                  <input
                    type="checkbox"
                    checked={hasPublication}
                    onChange={(e) => setHasPublication(e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <span className="text-gray-900 font-medium">b) Có công bố khoa học hoặc tham gia thi SV NCKH (2 điểm)</span>
                    <p className="text-sm text-gray-600 mt-1">✅ Có minh chứng - 🤖 AI kiểm tra</p>
                    {hasPublication && (
                      <button className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                        <Upload size={16} />
                        Tải minh chứng
                      </button>
                    )}
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-white rounded-lg transition">
                  <input
                    type="checkbox"
                    checked={hasAward}
                    onChange={(e) => setHasAward(e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <span className="text-gray-900 font-medium">c) Đạt giải trong cuộc thi SV NCKH, Olympic (2 điểm)</span>
                    <p className="text-sm text-gray-600 mt-1">✅ Có minh chứng - 🤖 AI kiểm tra</p>
                    {hasAward && (
                      <button className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                        <Upload size={16} />
                        Tải minh chứng
                      </button>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Mục 3 */}
            <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-4">
                3. Xếp loại học tập học kỳ - Tối đa 8 điểm
              </h4>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Căn cứ vào điểm TBCHT lần 1 <span className="text-red-500">*</span>
              </label>
              <select
                value={academicRank}
                onChange={(e) => setAcademicRank(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="excellent">a) Loại xuất sắc (8 điểm)</option>
                <option value="good">b) Loại Giỏi (7 điểm)</option>
                <option value="fair">c) Loại Khá (6 điểm)</option>
                <option value="average">d) Loại Trung bình (4 điểm)</option>
                <option value="weak">e) Loại Yếu chưa bị cảnh báo (2 điểm)</option>
                <option value="weak_warning">g) Loại Yếu bị cảnh báo lần 1 (1 điểm)</option>
              </select>
            </div>

            {showScores && scores && (
              <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl">
                <h4 className="text-lg font-bold mb-2">📊 Điểm tạm tính Mục I</h4>
                <p className="text-5xl font-bold mb-3">{scores.score1} <span className="text-2xl">/ 20 điểm</span></p>
                <div className="text-sm opacity-90 space-y-1">
                  <p>• Ý thức chuyên cần: {attendanceScore === 'ge9' ? 6 : attendanceScore === '7to9' ? 5 : attendanceScore === '5to7' ? 4 : attendanceScore === '4to5' ? 2 : 1} điểm</p>
                  <p>• Hoạt động NCKH: {(hasFullParticipation ? 2 : 0) + (hasPublication ? 2 : 0) + (hasAward ? 2 : 0)} điểm</p>
                  <p>• Xếp loại học tập: {academicRank === 'excellent' ? 8 : academicRank === 'good' ? 7 : academicRank === 'fair' ? 6 : academicRank === 'average' ? 4 : academicRank === 'weak' ? 2 : 1} điểm</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TRANG 2: Mục II - Chấp hành nội quy */}
      <div className="bg-white rounded-xl shadow-sm border mb-6">
        <div 
          className="p-4 sm:p-6 cursor-pointer flex items-center justify-between bg-gradient-to-r from-red-50 to-red-100 rounded-t-xl"
          onClick={() => toggleSection('page2')}
        >
          <div className="min-w-0 pr-4">
            <h2 className="text-xl sm:text-2xl font-bold text-red-900">TRANG 2</h2>
            <h3 className="text-base sm:text-lg font-semibold text-red-700 mt-1 leading-snug">
              II. Chấp hành nội quy, quy chế (Tối đa 25 điểm)
            </h3>
          </div>
          {expandedSections.page2 ? <ChevronUp size={20} className="shrink-0" /> : <ChevronDown size={20} className="shrink-0" />}
        </div>

        {expandedSections.page2 && (
          <div className="p-6 space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-semibold text-green-900">1. Phần cộng điểm</p>
              <p className="text-green-700 mt-1">Chấp hành tốt, không vi phạm: <span className="text-2xl font-bold">25 điểm</span></p>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="font-semibold text-red-900 mb-4">2. Phần trừ điểm (Nhập số lần/buổi vi phạm)</p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Không tham gia tuần sinh hoạt / bài thu hoạch điểm dưới 5
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={weeklyMeetingAbsence}
                      onChange={(e) => setWeeklyMeetingAbsence(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0"
                    />
                    <p className="text-xs text-red-600 mt-1">Trừ 10 điểm/lần</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nghỉ không lý do tuần sinh hoạt
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={weeklyMeetingLate}
                      onChange={(e) => setWeeklyMeetingLate(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0"
                    />
                    <p className="text-xs text-red-600 mt-1">Trừ 3 điểm/buổi</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Không tham gia sinh hoạt lớp, họp
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={classActivityAbsence}
                      onChange={(e) => setClassActivityAbsence(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0"
                    />
                    <p className="text-xs text-red-600 mt-1">Trừ 5 điểm/buổi</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Không đeo thẻ, không mặc đồng phục, hút thuốc
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={noStudentCard}
                      onChange={(e) => setNoStudentCard(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0"
                    />
                    <p className="text-xs text-red-600 mt-1">Trừ 5 điểm/lần</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vi phạm quy định giảng đường, thư viện
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={facilityViolation}
                      onChange={(e) => setFacilityViolation(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0"
                    />
                    <p className="text-xs text-red-600 mt-1">Trừ 5 điểm/lần</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chậm đóng học phí, lệ phí
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={latePayment}
                      onChange={(e) => setLatePayment(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0"
                    />
                    <p className="text-xs text-red-600 mt-1">Trừ 5 điểm/lần</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bị khiển trách, nhắc nhở trong phòng thi
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={examWarning}
                      onChange={(e) => setExamWarning(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0"
                    />
                    <p className="text-xs text-red-600 mt-1">Trừ 5 điểm/lần</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vi phạm quy chế thi (cảnh cáo hoặc trừ điểm)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={examViolation}
                      onChange={(e) => setExamViolation(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0"
                    />
                    <p className="text-xs text-red-600 mt-1">Trừ 10 điểm/lần</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bị lập biên bản đình chỉ thi
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={examSuspension}
                      onChange={(e) => setExamSuspension(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="0"
                    />
                    <p className="text-xs text-red-600 mt-1">Trừ 20 điểm/lần</p>
                  </div>
                </div>
              </div>
            </div>

            {showScores && scores && (
              <div className="p-6 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl">
                <h4 className="text-lg font-bold mb-2">📊 Điểm tạm tính Mục II</h4>
                <p className="text-5xl font-bold mb-3">{scores.score2} <span className="text-2xl">/ 25 điểm</span></p>
                <div className="text-sm opacity-90 space-y-1">
                  <p>• Điểm gốc: 25 điểm</p>
                  <p>• Tổng điểm trừ: -{scores.deduction} điểm</p>
                  <p className="text-yellow-200">⚠️ {scores.deduction > 0 ? `Bạn đã vi phạm ${scores.deduction} điểm` : 'Không có vi phạm, tốt lắm!'}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TRANG 3, 4, 5 */}
      <EvaluationPages345
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        politicalActivity={politicalActivity}
        setPoliticalActivity={setPoliticalActivity}
        culturalActivity={culturalActivity}
        setCulturalActivity={setCulturalActivity}
        clubActivity={clubActivity}
        setClubActivity={setClubActivity}
        antiSocial={antiSocial}
        setAntiSocial={setAntiSocial}
        awardPoints={awardPoints}
        setAwardPoints={setAwardPoints}
        policyCompliance={policyCompliance}
        setPolicyCompliance={setPolicyCompliance}
        charityWork={charityWork}
        setCharityWork={setCharityWork}
        collectiveBuilding={collectiveBuilding}
        setCollectiveBuilding={setCollectiveBuilding}
        roleType={roleType}
        setRoleType={setRoleType}
        cadrePosition={cadrePosition}
        setCadrePosition={setCadrePosition}
        cadrePerformance={cadrePerformance}
        setCadrePerformance={setCadrePerformance}
        managementLevel={managementLevel}
        setManagementLevel={setManagementLevel}
        classParticipation={classParticipation}
        setClassParticipation={setClassParticipation}
        specialAchievement={specialAchievement}
        setSpecialAchievement={setSpecialAchievement}
        showScores={showScores}
        scores={scores}
      />

      {/* TỔNG ĐIỂM */}
      {showScores && scores && (
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-8 mb-6 sticky bottom-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">TỔNG ĐIỂM RÈN LUYỆN</h2>
            <div className="text-8xl font-bold mb-4">{scores.total}</div>
            <div className="text-2xl mb-8">
              Xếp loại: <span className="font-bold">{getRating(scores.total).text}</span>
            </div>
            <div className="grid grid-cols-5 gap-4 text-sm bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <div>
                <p className="opacity-80 mb-1">Mục I</p>
                <p className="text-3xl font-bold">{scores.score1}</p>
                <p className="opacity-60 text-xs">/ 20</p>
              </div>
              <div>
                <p className="opacity-80 mb-1">Mục II</p>
                <p className="text-3xl font-bold">{scores.score2}</p>
                <p className="opacity-60 text-xs">/ 25</p>
              </div>
              <div>
                <p className="opacity-80 mb-1">Mục III</p>
                <p className="text-3xl font-bold">{scores.score3}</p>
                <p className="opacity-60 text-xs">/ 20</p>
              </div>
              <div>
                <p className="opacity-80 mb-1">Mục IV</p>
                <p className="text-3xl font-bold">{scores.score4}</p>
                <p className="opacity-60 text-xs">/ 25</p>
              </div>
              <div>
                <p className="opacity-80 mb-1">Mục V</p>
                <p className="text-3xl font-bold">{scores.score5}</p>
                <p className="opacity-60 text-xs">/ 10</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEvaluationComplete;
