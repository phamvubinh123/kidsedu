# TUYÊN NGÔN DỰ ÁN (PROJECT CHARTER)
**Dự án:** VƯƠNG QUỐC TRI THỨC (KidsEdu 1.0)  
**Tiêu chuẩn áp dụng:** PMI PMBOK Guide 7th/8th Edition - Hybrid PMI/Agile Framework  
**Ngày phê duyệt:** 13/11/2026  
**Chủ đầu tư / Project Sponsor:** Phụ huynh (Bố Mẹ)  
**Project Manager (PM):** Antigravity AI Project Coordinator  

---

## 1. TỔNG QUAN & LÝ DO ĐẦU TƯ (BUSINESS CASE)
Học sinh bước vào lớp 1 (6 tuổi) đối mặt với bước ngoặt tâm lý quan trọng từ "chơi là chính" ở mẫu giáo sang "học tập có kỷ luật". Các phương pháp học truyền thống (sách giấy thụ động) thường khiến trẻ nhanh chán, mất tập trung. Ngược lại, nhiều ứng dụng hiện nay chứa quá nhiều quảng cáo, nội dung xa rời khung sách giáo khoa chuẩn Việt Nam, hoặc đòi hỏi phần cứng đời mới đắt tiền.

**Vương Quốc Tri Thức (KidsEdu)** được khởi tạo với sứ mệnh:
1. Xây dựng một thế giới trò chơi giáo dục tương tác (Gamified EdTech) kỳ ảo, lôi cuốn trẻ tự giác học tập mỗi ngày.
2. Bám sát 100% chương trình Giáo dục Phổ thông 2018 theo bộ Sách Giáo Khoa thống nhất áp dụng từ năm 2026 (Toán 1, Tiếng Việt 1, Tiếng Anh 1).
3. Tương thích triệt để với các thiết bị công nghệ sẵn có trong gia đình (đặc biệt là máy tính bảng iPad cũ chạy iOS 12.5.8) và hỗ trợ chế độ ngoại tuyến (Offline-first).
4. Cung cấp cổng thông tin minh bạch cho phụ huynh giám sát tiến độ học tập và đồng bộ dữ liệu thời gian thực qua đám mây.

---

## 2. MỤC TIÊU DỰ ÁN & TIÊU CHÍ THÀNH CÔNG (PROJECT OBJECTIVES & SUCCESS CRITERIA)

| STT | Mục tiêu (SMART Objectives) | Chỉ số đo lường (KPI / Metrics) | Tiêu chí nghiệm thu (Acceptance Criteria) |
|---|---|---|---|
| **OBJ-01** | Bám sát khung chương trình SGK 2026 | Tỷ lệ phủ kiến thức SGK | 100% chủ đề cốt lõi của 3 cuốn SGK 2026 được mô phỏng thành tương tác học tập. |
| **OBJ-02** | Độ tương thích thiết bị di động cũ | Tỷ lệ crash trên iPad iOS 12.5.8 | 0% lỗi cú pháp; tải trang dưới 2 giây; âm thanh và tương tác chạm hoạt động trơn tru. |
| **OBJ-03** | Tính hấp dẫn và Gamification | Thời gian học tự giác của bé | Bé duy trì học 15-20 phút/ngày mà không bị áp lực; hoàn thành tối thiểu 1 đảo học tập/tuần. |
| **OBJ-04** | Tính liên tục & Bảo toàn dữ liệu | Tỷ lệ mất mát dữ liệu | 0% mất điểm số/vàng/tiến trình khi mất mạng; tự động đồng bộ lên Firebase khi có kết nối. |
| **OBJ-05** | Trải nghiệm an toàn cho trẻ em | Tiêu chuẩn an toàn nội dung (COPPA) | Hoàn toàn không quảng cáo, không thu thập dữ liệu nhạy cảm, bảo vệ quyền riêng tư 100%. |

---

## 3. PHẠM VI DỰ ÁN (PROJECT SCOPE)

### 3.1. Nằm trong phạm vi (In-Scope)
- **Đảo Số Học Diệu Kỳ (Toán 1):** Số đếm 1-100, so sánh lớn bé, hình học trực quan, phép cộng/trừ trong phạm vi 10 và 20, bài toán thực tế.
- **Đảo Tiếng Việt Thần Tiên (Tiếng Việt 1):** Bảng chữ cái, thanh điệu, ghép vần âm đầu - vần chính, đọc từ ứng dụng, câu văn đơn giản.
- **Đảo Tiếng Anh Vui Nhộn (Tiếng Anh 1):** Từ vựng Phonics, chủ đề đồ vật, màu sắc, động vật, gia đình, luyện nghe và phát âm.
- **Thung Lũng Trò Chơi (Minigames):** Lật thẻ trí nhớ (Memory Card), Nối từ ghép tranh, Bắn bong bóng chữ số, Thử thách đố vui phản xạ.
- **Hệ thống Gamification:** Vàng (Coins), Sao (Stars), Cúp vô địch, Hệ thống thăng cấp level, Cửa hàng đổi quà ảo.
- **Cổng Phụ Huynh (Parent Dashboard & Settings):** Báo cáo thời lượng học, điểm số từng môn, quản lý âm thanh (BGM/SFX/TTS), chuyển đổi hồ sơ học sinh, đồng bộ mã đám mây Firebase.

### 3.2. Nằm ngoài phạm vi (Out-of-Scope)
- Thanh toán tiền thật (IAP - In-App Purchases) - hoàn toàn phi thương mại, miễn phí cho trẻ.
- Tính năng chat trực tiếp giữa các học sinh (đảm bảo an toàn tuyệt đối cho trẻ lớp 1).
- Tích hợp mạng xã hội của bên thứ ba (Facebook, TikTok...).

---

## 4. MA TRẬN RỦI RO & RÀNG BUỘC BAN ĐẦU (HIGH-LEVEL RISKS & CONSTRAINTS)

### 4.1. Ràng buộc kỹ thuật nghiêm ngặt (Constraints)
1. **ES5 Syntax Constraint:** Mọi mã JavaScript chạy trên trình duyệt client phải tuân thủ chuẩn ECMAScript 5 (`var`, `function`), tuyệt đối không dùng cú pháp ES6+ (`const`, `let`, arrow functions, template strings) để tránh lỗi trắng màn hình trên Safari iOS 12.5.8.
2. **Audio Autoplay Restriction:** Safari và Chrome chặn tự động phát âm thanh nếu người dùng chưa tương tác. Phải có cơ chế chạm mở khóa audio (Audio Context Unlock) ngay thao tác đầu tiên.
3. **Static Hosting:** Ứng dụng triển khai trên GitHub Pages (Jamstack static CDN), kết nối Firebase Realtime Database qua Client SDK.

### 4.2. Rủi ro trọng yếu (Key Risks)
- **R-01:** Trẻ mất hứng thú nếu bài tập lặp đi lặp lại hoặc thiếu hiệu ứng thị giác/âm thanh lôi cuốn. (Giảm thiểu: Đầu tư mạnh vào UI/UX Game, nhân vật dẫn đường, âm thanh vui nhộn).
- **R-02:** Lỗi tràn giao diện (UI Overflow) trên các màn hình có tỷ lệ dị biệt. (Giảm thiểu: Thiết kế lưới thích ứng CSS, kiểm thử tự động nhiều kích thước viewport).
- **R-03:** Gián đoạn mạng gây mất tiến trình. (Giảm thiểu: Kiến trúc Offline-First lưu LocalStorage trước, đồng bộ ngầm khi trực tuyến).

---

## 5. CÁC MỐC TIẾN ĐỘ CHÍNH (MILESTONES ROADMAP)

| Cột mốc | Tên giai đoạn | Mục tiêu bàn giao |
|---|---|---|
| **M0** | Project Governance & Sub-Agents Setup | Hoàn thiện chuẩn PMI, khởi tạo 5 Sub-Agents chuyên trách, ban hành Charter & RTM. |
| **M1** | Analysis & Curriculum Mapping (Sprint 1) | BA & Sư phạm số hóa chi tiết 3 cuốn SGK 2026, hoàn thiện bộ User Stories & RTM. |
| **M2** | UI/UX & Gamification Overhaul (Sprint 2) | Bàn giao Design System trẻ thơ, mockup bản đồ đảo, hiệu ứng âm thanh và flow chơi. |
| **M3** | Core Game Engine & Island Development (Sprint 3) | Lập trình các đảo môn học theo chuẩn ES5, cơ chế PWA, tích hợp âm thanh & Firebase. |
| **M4** | QA/QC & Cross-Device Field Testing (Sprint 4) | Kiểm thử nghiệm thu trên iPad thật, quét lỗi cú pháp, tinh chỉnh luồng chơi và đóng gói v1.0. |

---

## 6. PHÊ DUYỆT & CAM KẾT (APPROVAL & COMMITMENT)
Tuyên ngôn dự án này chính thức kích hoạt giai đoạn lập kế hoạch chi tiết và phân bổ nguồn lực cho các Sub-Agents thực thi theo quy trình PMI chuẩn hóa.
