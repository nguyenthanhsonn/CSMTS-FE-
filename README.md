# Hệ thống Đánh giá Rèn luyện Sinh viên

Hệ thống quản lý và đánh giá kết quả rèn luyện sinh viên toàn diện theo quy định chính thức, bao gồm cả phần ClientSite (dành cho sinh viên) và AdminSite (dành cho quản trị viên).

## 📋 Phiếu đánh giá theo quy định

Hệ thống được xây dựng dựa trên quy định chính thức về đánh giá rèn luyện sinh viên gồm 5 mục chính với tổng 100 điểm.

## 🎯 Tính năng chính

### A. Module ClientSite (Sinh viên)

#### 1. Module Quản lý thông tin cá nhân và tài khoản ✅
- ✅ Năm trúng tuyển: Chọn từ ComboBox (tự động theo năm học)
- ✅ Ngành/chuyên ngành: Chọn từ ComboBox (lọc theo khoa)
- ✅ Khoa: Chọn từ ComboBox
- ✅ Lớp: Chọn từ ComboBox (lọc theo ngành và khoa)
- ✅ Mã sinh viên: Nhập vào hoặc chọn từ ComboBox
- ✅ Họ tên: Tự động hiển thị hoặc nhập thủ công
- ✅ Ngày sinh: Tự động hiển thị hoặc nhập thủ công
- ✅ Số điện thoại: Cho phép cập nhật
- ✅ Chọn học kỳ: ComboBox (Kỳ I / Kỳ II)
- ✅ Chọn năm học: ComboBox
- ✅ Hiển thị trạng thái phiếu đánh giá

#### 2. Module Đánh giá - TRANG 1: Ý thức học tập (Tối đa 20 điểm) ✅
**Mục 1: Ý thức chuyên cần (0-6 điểm)**
- ✅ ComboBox chọn điểm TB: ≥9, 7-9, 5-7, 4-5, 1-4
- ✅ Tự động quy đổi: 6, 5, 4, 2, 1 điểm

**Mục 2: Hoạt động NCKH, Olympic (0-6 điểm)**
- ✅ CheckBox: Tham gia đầy đủ (2đ) + Upload minh chứng
- ✅ CheckBox: Có công bố (2đ) + Upload minh chứng + AI kiểm tra
- ✅ CheckBox: Đạt giải (2đ) + Upload minh chứng + AI kiểm tra

**Mục 3: Xếp loại học tập (0-8 điểm)**
- ✅ ComboBox: Xuất sắc (8đ), Giỏi (7đ), Khá (6đ), TB (4đ), Yếu (2đ), Yếu cảnh báo (1đ)
- ✅ Hiển thị điểm tạm tính realtime

#### 3. Module Đánh giá - TRANG 2: Chấp hành nội quy (Tối đa 25 điểm) ✅
**Điểm gốc: 25 điểm - Trừ theo vi phạm**
- ✅ 9 TextBox nhập số lần vi phạm:
  - Không tham gia tuần sinh hoạt: -10đ
  - Nghỉ không lý do: -3đ/buổi
  - Không tham gia sinh hoạt lớp: -5đ/buổi
  - Không đeo thẻ, không mặc đồng phục: -5đ/lần
  - Vi phạm giảng đường, thư viện: -5đ/lần
  - Chậm đóng học phí: -5đ/lần
  - Bị khiển trách trong thi: -5đ/lần
  - Vi phạm quy chế thi: -10đ/lần
  - Bị đình chỉ thi: -20đ/lần
- ✅ Tự động tính tổng điểm trừ
- ✅ Hiển thị điểm còn lại (25 - tổng trừ)

#### 4. Module Đánh giá - TRANG 3: Hoạt động CT-XH (Tối đa 20 điểm) ✅
**Mục 1: Hoạt động chính trị xã hội (0-5 điểm)**
- ✅ ComboBox: Tham gia tốt (5đ), Vắng 1 buổi (3đ), Vắng 2 buổi (2đ), Vắng ≥3 (0đ)

**Mục 2: Văn hóa, văn nghệ, thể thao (0-5 điểm)**
- ✅ ComboBox: Đầy đủ hiệu quả (5đ), ≥50% (3đ), Vận động (2đ), <50% (1đ), Không (0đ)

**Mục 3: CLB, Đội, Nhóm (0-5 điểm)**
- ✅ ComboBox: Đầy đủ (5đ), Tích cực (3đ), Thành viên (2đ), <50% (1đ), Không (0đ)

**Mục 4: Phòng chống TNXH (0-3 điểm)**
- ✅ ComboBox: Rất tích cực (3đ), Tích cực (2đ), Có ý thức (1đ), Bị nhắc nhở (0đ)

**Mục 5: Khen thưởng (0-2 điểm)**
- ✅ TextBox nhập điểm + Upload file đính kèm

#### 5. Module Đánh giá - TRANG 4: Ý thức công dân (Tối đa 25 điểm) ✅
**Mục 1: Chấp hành chính sách pháp luật (0-10 điểm)**
- ✅ ComboBox: Khen thưởng (10đ) + File, Tuyên truyền tốt (8đ), Chấp hành (5đ), Bị nhắc (0đ)

**Mục 2: Hoạt động từ thiện, tình nguyện (0-10 điểm)**
- ✅ ComboBox: Khen thưởng (10đ) + File, Tích cực (8đ), Có ý thức (5đ), Mất đoàn kết (0đ), Không (0đ)

**Mục 3: Xây dựng tập thể, môi trường (0-5 điểm)**
- ✅ ComboBox: Tốt (5đ), Nhắc 1 lần (1đ), Nhắc 2 lần (0đ)

#### 6. Module Đánh giá - TRANG 5: Vai trò cán bộ (Tối đa 10 điểm) ✅
**⚠️ CheckBox chọn 1 trong 2 vai trò:**

**OPTION 1: Cán bộ lớp, BCH Đoàn, Hội, CLB**
- ✅ a) Ý thức, tinh thần (0-7 điểm):
  - ComboBox chọn chức vụ: Lớp trưởng/Bí thư hoặc Ủy viên/Tổ trưởng
  - ComboBox mức hoàn thành: Xuất sắc (7đ) + File, Tốt (6đ), Hoàn thành (4-5đ), Không (0đ)
- ✅ b) Kỹ năng tổ chức (0-3 điểm):
  - ComboBox: Cấp trưởng (3đ), Cấp phó (2đ), Ủy viên (1đ)

**OPTION 2: Sinh viên thường**
- ✅ a) Tham gia hoạt động (0-3 điểm):
  - TextBox nhập điểm từ 1-3
- ✅ b) Thành tích đặc biệt (0-7 điểm):
  - ComboBox: Học viện (7đ) + File, Khoa (5đ) + File, Không (0đ)

#### 7. Module Quản lý minh chứng
- Tải lên file minh chứng (hình ảnh, PDF)
- Gắn minh chứng với từng tiêu chí
- Xem trước, thay thế hoặc xóa minh chứng
- Kiểm tra định dạng và dung lượng file
- AI kiểm tra tính hợp lệ (demo)

#### 8. Module Tự động tính điểm
- Tính điểm từng tiêu chí tự động
- Tính tổng điểm rèn luyện
- Kiểm tra giới hạn điểm
- Tự động xếp loại (Xuất sắc, Tốt, Khá, Trung bình, Yếu)

#### 9. Module Nộp phiếu đánh giá
- Lưu nháp phiếu
- Kiểm tra dữ liệu bắt buộc
- Cảnh báo thiếu thông tin/minh chứng
- Nộp phiếu chính thức
- Khóa chỉnh sửa sau khi nộp

#### 10. Module Theo dõi trạng thái xét duyệt
- Hiển thị trạng thái: Nháp → Đã nộp → Lớp đánh giá → CVHT xét duyệt → Khoa phê duyệt
- Hiển thị nhận xét từ người xét duyệt
- Thông báo cần chỉnh sửa/bổ sung
- Xem kết quả điểm đã duyệt

#### 11. Module Thông báo và nhắc việc
- Thông báo lưu nháp, nộp phiếu thành công
- Thông báo thiếu minh chứng/dữ liệu
- Thông báo phản hồi từ người đánh giá
- Nhắc hạn nộp phiếu

### B. Module AdminSite (Quản trị viên)

#### 1. Dashboard tổng quan
- Tổng số tài khoản, sinh viên, admin
- Tổng số khoa, ngành, lớp
- Thống kê theo khoa, ngành, lớp
- Hoạt động gần đây

#### 2. Quản lý User
- Tạo tài khoản admin/sinh viên
- Chỉnh sửa thông tin tài khoản
- Cập nhật vai trò
- Khóa/mở khóa tài khoản
- Xóa/vô hiệu hóa tài khoản

#### 3. Quản lý Ngành học
- Thêm, sửa, xóa ngành học
- Nhập mã ngành, tên ngành
- Kiểm tra trùng mã ngành
- Ẩn/hiện ngành không còn sử dụng

#### 4. Quản lý Khoa
- Thêm, sửa, xóa khoa
- Nhập mã khoa, tên khoa
- Kiểm tra mã khoa
- Ẩn/hiện khoa không hoạt động

#### 5. Quản lý Lớp
- Thêm, sửa, xóa lớp
- Gán lớp vào khoa/ngành
- Ẩn/hiện lớp không sử dụng

#### 6. Quản lý Danh sách lớp
- Chọn ngành, khoa, lớp
- Xem danh sách sinh viên trong lớp
- Thêm, cập nhật, xóa sinh viên

#### 7. Import danh sách lớp
- Nhập danh sách bằng file Excel/Word
- Tải file mẫu
- Kiểm tra dữ liệu trong file
- Báo lỗi nếu sai định dạng
- Lưu danh sách vào CSDL

#### 8. Kiểm tra dữ liệu
- Kiểm tra dữ liệu bắt buộc
- Kiểm tra mã trùng lặp
- Kiểm tra file import
- Kiểm tra thông tin hợp lệ

#### 9. Thông báo kết quả
- Thông báo thêm/sửa/xóa thành công
- Thông báo dữ liệu không hợp lệ
- Thông báo import thành công/thất bại

## 🚀 Hướng dẫn sử dụng

### Tài khoản demo

**Sinh viên:**
- Username: `sv001`
- Password: `123456`

**Quản trị viên:**
- Username: `admin`
- Password: `123456`

### Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

## 📊 Cách tính điểm theo quy định chính thức

### Thang điểm (Tổng 100 điểm)

### Mục I: Ý thức tham gia học tập (0-20 điểm)

**1. Ý thức và thái độ học tập (0-6 điểm)** - ComboBox
- Điểm TB ≥9: 6 điểm
- Điểm TB 7 đến cận 9: 5 điểm
- Điểm TB 5 đến cận 7: 4 điểm
- Điểm TB 4 đến cận 5: 2 điểm
- Điểm TB 1 đến cận 4: 1 điểm

**2. Hoạt động học thuật, NCKH (0-6 điểm)** - CheckBox
- Tham gia đầy đủ hoạt động NCKH: 2 điểm (có minh chứng)
- Có công bố khoa học hoặc tham gia thi: 2 điểm (có minh chứng, AI kiểm tra)
- Đạt giải Olympic/NCKH: 2 điểm (có minh chứng, AI kiểm tra)

**3. Xếp loại học tập (0-8 điểm)** - ComboBox
- Xuất sắc: 8 điểm
- Giỏi: 7 điểm
- Khá: 6 điểm
- Trung bình: 4 điểm
- Yếu chưa cảnh báo: 2 điểm
- Yếu cảnh báo lần 1: 1 điểm

### Mục II: Chấp hành nội quy (0-25 điểm)

**Điểm cơ bản: 25 điểm** - Trừ điểm theo vi phạm (TextBox nhập)
- Không tham gia tuần sinh hoạt hoặc bài thu hoạch <5: -10 điểm
- Nghỉ không lý do tuần sinh hoạt: -3 điểm/buổi
- Không tham gia sinh hoạt lớp, họp: -5 điểm/buổi
- Không đeo thẻ, không mặc đồng phục, hút thuốc: -5 điểm/lần
- Vi phạm quy định giảng đường, thư viện: -5 điểm/lần
- Chậm đóng học phí, lệ phí: -5 điểm/lần
- Bị khiển trách trong phòng thi: -5 điểm/lần
- Vi phạm quy chế thi (cảnh cáo): -10 điểm/lần
- Bị đình chỉ thi: -20 điểm/lần

### Mục III: Hoạt động chính trị, xã hội, văn hóa, thể thao (0-20 điểm)

**1. Hoạt động chính trị, xã hội (0-5 điểm)** - ComboBox
- Tham gia và chấp hành tốt: 5 điểm
- Vắng 1 buổi không lý do: 3 điểm
- Vắng 2 buổi không lý do: 2 điểm
- Vắng từ 2 buổi trở lên hoặc không tham gia: 0 điểm

**2. Văn hóa, văn nghệ, thể thao (0-5 điểm)** - ComboBox
- Tham gia đầy đủ, có hiệu quả: 5 điểm
- Tham gia ≥50% hoạt động: 3 điểm
- Tích cực vận động mọi người: 2 điểm
- Vắng >50%: 1 điểm
- Không tham gia: 0 điểm

**3. Câu lạc bộ, Đội, Nhóm (0-5 điểm)** - ComboBox
- Tham gia đầy đủ, có hiệu quả: 5 điểm
- Tham gia tích cực ≥1 hoạt động: 3 điểm
- Là thành viên tích cực: 2 điểm
- Vắng >50%: 1 điểm
- Không tham gia: 0 điểm

**4. Phòng chống TNXH (0-3 điểm)** - ComboBox
- Tham gia tích cực hoặc có tố giác TNXH: 3 điểm
- Tham gia 1 hoạt động đạt hiệu quả: 2 điểm
- Có ý thức tham gia: 1 điểm
- Bị nhắc nhở do vi phạm TNXH: 0 điểm

**5. Khen thưởng (0-2 điểm)** - TextBox nhập + File đính kèm

### Mục IV: Ý thức công dân (0-25 điểm)

**1. Chấp hành chính sách pháp luật (0-10 điểm)** - ComboBox
- Chấp hành đúng và tuyên truyền tốt, được khen thưởng: 10 điểm (có file đính kèm)
- Chấp hành đúng và tuyên truyền tốt: 8 điểm
- Chấp hành đúng các quy định: 5 điểm
- Bị nhắc nhở, lập biên bản: 0 điểm

**2. Hoạt động từ thiện, tình nguyện (0-10 điểm)** - ComboBox
- Tích cực, được khen thưởng: 10 điểm (có file đính kèm)
- Tham gia tích cực: 8 điểm
- Có ý thức tham gia: 5 điểm
- Gây mất đoàn kết: 0 điểm
- Không tham gia: 0 điểm

**3. Xây dựng tập thể, giữ gìn môi trường (0-5 điểm)** - ComboBox
- Có ý thức xây dựng tập thể, văn minh: 5 điểm
- Bị nhắc nhở hoặc kiểm điểm 1 lần: 1 điểm
- Bị nhắc nhở hoặc kiểm điểm 2 lần: 0 điểm

### Mục V: Vai trò cán bộ (0-10 điểm)

**CheckBox chọn 1 trong 2:**

**Nếu là Cán bộ lớp, BCH Đoàn, Hội, CLB:**

a) **Ý thức, tinh thần (0-7 điểm)** - ComboBox
- Lớp trưởng, Bí thư, Chủ nhiệm:
  - Xuất sắc (khen thưởng): 7 điểm (file đính kèm)
  - Hoàn thành tốt: 6 điểm
  - Hoàn thành: 4 điểm
  - Không hoàn thành: 0 điểm

- Ủy viên, Tổ trưởng:
  - Xuất sắc (khen thưởng): 7 điểm (file đính kèm)
  - Hoàn thành tốt: 6 điểm
  - Hoàn thành: 5 điểm
  - Không hoàn thành: 0 điểm

b) **Kỹ năng tổ chức (0-3 điểm)** - ComboBox
- Cấp trưởng: 3 điểm
- Cấp phó: 2 điểm
- Ủy viên: 1 điểm

**Nếu là Sinh viên thường:**

a) **Tham gia hoạt động lớp (0-3 điểm)** - TextBox nhập 1-3

b) **Thành tích đặc biệt (0-7 điểm)** - ComboBox
- Khen thưởng từ cấp Học viện trở lên: 7 điểm (file đính kèm)
- Khen thưởng từ cấp Khoa trở lên: 5 điểm (file đính kèm)

### Xếp loại

- **Xuất sắc**: ≥ 90 điểm
- **Tốt**: 80-89 điểm
- **Khá**: 65-79 điểm
- **Trung bình**: 50-64 điểm
- **Yếu**: < 50 điểm

## 🛠️ Công nghệ sử dụng

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Zustand** - State management
- **Lucide React** - Icons
- **Date-fns** - Date utilities

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Shared components
│   ├── Layout/         # Layout components
│   └── ProtectedRoute.tsx
├── pages/              # Page components
│   ├── Student/        # Student pages
│   └── Admin/          # Admin pages
├── services/           # Business logic
│   ├── mockData.ts
│   └── scoreCalculator.ts
├── store/              # State management
│   └── authStore.ts
├── types/              # TypeScript types
│   └── index.ts
└── App.tsx            # Main app component
```

## 🎨 Tính năng nổi bật

✅ Giao diện thân thiện, dễ sử dụng
✅ Tự động tính điểm thời gian thực
✅ Kiểm tra dữ liệu đầu vào
✅ Quản lý minh chứng đầy đủ
✅ Phân quyền rõ ràng (Student/Admin)
✅ Responsive design
✅ Mock AI verification cho minh chứng
✅ Thông báo và nhắc việc
✅ Lịch sử và theo dõi trạng thái
✅ Import danh sách hàng loạt

## 📝 Lưu ý

- Đây là bản demo với mock data
- Trong production cần kết nối backend API thực tế
- Cần thêm validation chặt chẽ hơn
- Cần implement upload file thực tế
- Cần thêm AI verification thực tế cho minh chứng
- Cần thêm export báo cáo Excel/PDF

## 📞 Liên hệ

Hệ thống được xây dựng để phục vụ công tác quản lý và đánh giá rèn luyện sinh viên tại các cơ sở giáo dục đại học.
