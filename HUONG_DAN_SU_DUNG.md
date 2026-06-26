# Hướng dẫn sử dụng Hệ thống Đánh giá Rèn luyện Sinh viên

## 🎯 Dành cho SINH VIÊN

### Bước 1: Đăng nhập hệ thống

1. Truy cập hệ thống
2. Nhập tên đăng nhập (mã sinh viên hoặc username)
3. Nhập mật khẩu
4. Nhấn **Đăng nhập**

**Tài khoản demo:** `sv001` / `123456`

---

### Bước 2: Cập nhật thông tin cá nhân

Vào menu **Thông tin cá nhân**, điền đầy đủ các thông tin:

#### Thông tin sinh viên (bắt buộc)

1. **Năm trúng tuyển**: Chọn từ ComboBox (tự động theo năm học)
2. **Khoa**: Chọn khoa quản lý từ ComboBox
3. **Ngành/chuyên ngành**: Chọn ngành học từ ComboBox (lọc theo khoa)
4. **Lớp**: Chọn lớp từ ComboBox (lọc theo ngành và khoa)
5. **Mã sinh viên**: Nhập hoặc chọn từ ComboBox (nếu hỗ trợ)
6. **Họ và tên**: Tự động hiển thị (hoặc nhập nếu chưa có)
7. **Ngày sinh**: Tự động hiển thị (hoặc nhập nếu chưa có)
8. **Số điện thoại**: Nhập số điện thoại liên hệ

#### Kỳ đánh giá

1. **Học kỳ**: Chọn Kỳ I hoặc Kỳ II
2. **Năm học**: Chọn năm học từ ComboBox

Nhấn **Lưu thông tin** để lưu.

---

### Bước 3: Điền phiếu đánh giá rèn luyện

Vào menu **Phiếu đánh giá**, điền theo 5 mục:

---

## 📋 MỤC I: Ý thức tham gia học tập (0-20 điểm)

### 1. Ý thức và thái độ học tập (0-6 điểm)

**Cách làm:** Chọn 1 mức từ ComboBox

- ≥9 điểm → 6 điểm
- 7 đến cận 9 → 5 điểm
- 5 đến cận 7 → 4 điểm
- 4 đến cận 5 → 2 điểm
- 1 đến cận 4 → 1 điểm

### 2. Hoạt động NCKH, Olympic (0-6 điểm)

**Cách làm:** Tích CheckBox vào các hoạt động đã tham gia

- ☑ Tham gia đầy đủ hoạt động NCKH (2đ)
  - Cần có **minh chứng** (file đính kèm)
  
- ☑ Có công bố khoa học hoặc tham gia thi (2đ)
  - Cần có **minh chứng** (file đính kèm)
  - **AI sẽ kiểm tra** nội dung giấy khen
  
- ☑ Đạt giải Olympic/NCKH (2đ)
  - Cần có **minh chứng** (file đính kèm)
  - **AI sẽ kiểm tra** nội dung giấy khen

### 3. Xếp loại học tập (0-8 điểm)

**Cách làm:** Chọn 1 mức từ ComboBox

- Xuất sắc → 8 điểm
- Giỏi → 7 điểm
- Khá → 6 điểm
- Trung bình → 4 điểm
- Yếu (chưa cảnh báo) → 2 điểm
- Yếu (cảnh báo lần 1) → 1 điểm

---

## 📋 MỤC II: Chấp hành nội quy (0-25 điểm)

**Điểm gốc: 25 điểm** → Sẽ bị trừ theo vi phạm

**Cách làm:** Nhập số lần vi phạm vào TextBox

| Vi phạm | Trừ | Nhập số lần |
|---------|-----|-------------|
| Không tham gia tuần sinh hoạt / bài thu hoạch <5 | -10đ | [ ] |
| Nghỉ không lý do tuần sinh hoạt | -3đ/buổi | [ ] |
| Không tham gia sinh hoạt lớp, họp | -5đ/buổi | [ ] |
| Không đeo thẻ, không mặc đồng phục | -5đ/lần | [ ] |
| Vi phạm giảng đường, thư viện | -5đ/lần | [ ] |
| Chậm đóng học phí | -5đ/lần | [ ] |
| Bị khiển trách trong thi | -5đ/lần | [ ] |
| Vi phạm quy chế thi | -10đ/lần | [ ] |
| Bị đình chỉ thi | -20đ/lần | [ ] |

**Hệ thống sẽ tự động tính:** 25 - (tổng điểm trừ)

---

## 📋 MỤC III: Hoạt động CT-XH (0-20 điểm)

### 1. Hoạt động chính trị, xã hội (0-5 điểm)

**Cách làm:** Chọn 1 mức từ ComboBox

- Tham gia và chấp hành tốt → 5 điểm
- Vắng 1 buổi không lý do → 3 điểm
- Vắng 2 buổi không lý do → 2 điểm
- Vắng ≥3 buổi hoặc không tham gia → 0 điểm

### 2. Văn hóa, văn nghệ, thể thao (0-5 điểm)

**Cách làm:** Chọn 1 mức từ ComboBox

- Tham gia đầy đủ, có hiệu quả → 5 điểm
- Tham gia ≥50% hoạt động → 3 điểm
- Tích cực vận động → 2 điểm
- Vắng >50% → 1 điểm
- Không tham gia → 0 điểm

### 3. Câu lạc bộ, Đội, Nhóm (0-5 điểm)

**Cách làm:** Chọn 1 mức từ ComboBox

- Tham gia đầy đủ, có hiệu quả → 5 điểm
- Tham gia tích cực ≥1 hoạt động → 3 điểm
- Là thành viên tích cực → 2 điểm
- Vắng >50% → 1 điểm
- Không tham gia → 0 điểm

### 4. Phòng chống TNXH (0-3 điểm)

**Cách làm:** Chọn 1 mức từ ComboBox

- Tham gia tích cực / có tố giác TNXH → 3 điểm
- Tham gia 1 hoạt động đạt hiệu quả → 2 điểm
- Có ý thức tham gia → 1 điểm
- Bị nhắc nhở do vi phạm → 0 điểm

### 5. Được khen thưởng (0-2 điểm)

**Cách làm:** Nhập điểm vào TextBox (tối đa 2 điểm)

- Cần **tải file đính kèm** giấy khen

---

## 📋 MỤC IV: Ý thức công dân (0-25 điểm)

### 1. Chấp hành chính sách pháp luật (0-10 điểm)

**Cách làm:** Chọn 1 mức từ ComboBox

- Chấp hành tốt + được khen thưởng → 10 điểm
  - Cần **file đính kèm** giấy khen
- Chấp hành tốt + tuyên truyền → 8 điểm
- Chấp hành đúng quy định → 5 điểm
- Bị nhắc nhở, lập biên bản → 0 điểm

### 2. Hoạt động từ thiện, tình nguyện (0-10 điểm)

**Cách làm:** Chọn 1 mức từ ComboBox

- Tích cực, được khen thưởng → 10 điểm
  - Cần **file đính kèm** giấy khen
- Tham gia tích cực → 8 điểm
- Có ý thức tham gia → 5 điểm
- Gây mất đoàn kết → 0 điểm
- Không tham gia → 0 điểm

### 3. Xây dựng tập thể (0-5 điểm)

**Cách làm:** Chọn 1 mức từ ComboBox

- Có ý thức xây dựng tập thể → 5 điểm
- Bị nhắc nhở 1 lần → 1 điểm
- Bị nhắc nhở 2 lần → 0 điểm

---

## 📋 MỤC V: Vai trò cán bộ (0-10 điểm)

### ⚠️ LƯU Ý: Chọn 1 trong 2 vai trò

**Cách làm:** Tích CheckBox vào vai trò của bạn

---

### ☑ OPTION 1: Là Cán bộ lớp, BCH Đoàn, Hội, CLB

#### a) Ý thức, tinh thần, thái độ (0-7 điểm)

**Nếu là Lớp trưởng, Bí thư, Chủ nhiệm:**

Chọn 1 mức từ ComboBox:
- Xuất sắc (được khen thưởng) → 7 điểm
  - Cần **file đính kèm** giấy khen
- Hoàn thành tốt → 6 điểm
- Hoàn thành → 4 điểm
- Không hoàn thành → 0 điểm

**Nếu là Ủy viên, Tổ trưởng:**

Chọn 1 mức từ ComboBox:
- Xuất sắc (được khen thưởng) → 7 điểm
  - Cần **file đính kèm** giấy khen
- Hoàn thành tốt → 6 điểm
- Hoàn thành → 5 điểm
- Không hoàn thành → 0 điểm

#### b) Kỹ năng tổ chức (0-3 điểm)

Chọn 1 mức từ ComboBox:
- Cấp trưởng → 3 điểm
- Cấp phó → 2 điểm
- Ủy viên → 1 điểm

---

### ☑ OPTION 2: Là Sinh viên thường

#### a) Tham gia hoạt động lớp, khoa (0-3 điểm)

**Cách làm:** Nhập điểm vào TextBox (từ 1 đến 3)

#### b) Thành tích đặc biệt (0-7 điểm)

Chọn 1 mức từ ComboBox:
- Khen thưởng từ cấp Học viện trở lên → 7 điểm
  - Cần **file đính kèm** giấy khen
- Khen thưởng từ cấp Khoa trở lên → 5 điểm
  - Cần **file đính kèm** giấy khen
- Không có → 0 điểm

---

## 🎯 Bước 4: Quản lý minh chứng

Vào menu **Quản lý minh chứng**:

1. Chọn tiêu chí cần tải minh chứng
2. Click **Tải lên** hoặc kéo thả file
3. Hỗ trợ: JPG, PNG, PDF (max 5MB)
4. AI sẽ tự động kiểm tra:
   - ✅ Phù hợp
   - ⚠️ Nghi ngờ không khớp
   - 📝 Cần kiểm tra thủ công

---

## 💾 Bước 5: Lưu và nộp phiếu

### Lưu nháp
- Click **Lưu nháp** để lưu tạm
- Có thể chỉnh sửa sau

### Tính điểm
- Click **Tính điểm** để xem điểm tạm tính
- Kiểm tra từng mục

### Nộp phiếu chính thức
1. Kiểm tra đầy đủ thông tin
2. Kiểm tra đã tải minh chứng
3. Click **Nộp phiếu**
4. Xác nhận nộp

⚠️ **LƯU Ý:** Sau khi nộp sẽ KHÔNG thể chỉnh sửa!

---

## 📊 Bước 6: Theo dõi trạng thái

Vào menu **Lịch sử đánh giá** hoặc **Kết quả**:

### Trạng thái phiếu
1. **Nháp** - Chưa nộp
2. **Đã nộp** - Chờ lớp đánh giá
3. **Lớp đánh giá** - Chờ CVHT
4. **CVHT xét duyệt** - Chờ Khoa
5. **Khoa phê duyệt** - Hoàn tất

### Xem kết quả
- Tổng điểm
- Xếp loại: Xuất sắc / Tốt / Khá / TB / Yếu / Kém
- Nhận xét từ người đánh giá
- Chi tiết từng mục

---

## 📏 Xếp loại rèn luyện

| Điểm | Xếp loại |
|------|----------|
| 90-100 | Xuất sắc |
| 80-89 | Tốt |
| 65-79 | Khá |
| 50-64 | Trung bình |
| 35-49 | Yếu |
| <35 | Kém |

---

## ⚠️ QUY ĐỊNH ĐẶC BIỆT

1. **Những sinh viên đạt điểm ở nhiều nội dung, lấy nội dung điểm cao nhất**

2. **Sinh viên vi phạm trên mức quy định → điểm mục đó = 0**

3. **Sinh viên bị thông báo, nhắc nhở bằng văn bản hoặc đình chỉ ≤30 ngày**
   → Điểm rèn luyện **KHÔNG vượt quá loại Khá**

4. **Sinh viên không nộp phiếu đúng hạn**
   → Xếp loại **Yếu hoặc Kém**

---

## 🎁 Lợi ích của xếp loại cao

### Xuất sắc (≥90 điểm)
✅ Ưu tiên xét học bổng  
✅ Ưu tiên giới thiệu việc làm  
✅ Được xét khen thưởng cuối năm  
✅ Cộng điểm xét tuyển sau đại học  

### Tốt (80-89 điểm)
✅ Xét học bổng khuyến khích  
✅ Được khen thưởng  

---

## 📞 Hỗ trợ

- Nếu gặp vấn đề kỹ thuật: Liên hệ IT
- Nếu có thắc mắc về tiêu chí: Hỏi CVHT
- Nếu cần hỗ trợ minh chứng: Liên hệ Đoàn - Hội

---

## 💡 MẸO ĐÁNH GIÁ

✅ **Chuẩn bị trước:**
- Thu thập giấy khen, chứng nhận
- Chụp ảnh hoạt động (có logo trường)
- Lưu trữ minh chứng theo thư mục

✅ **Khi điền phiếu:**
- Đọc kỹ từng tiêu chí
- Chọn đúng mức độ thực tế
- Không khai khống
- Tải đủ minh chứng

✅ **Trước khi nộp:**
- Kiểm tra lại toàn bộ
- Xem điểm tạm tính
- Đảm bảo file minh chứng rõ ràng
- Lưu nháp nhiều lần

---

**Chúc các bạn đánh giá tốt! 🎓**
