# CƠ CẤU PHÂN CHIA CÔNG VIỆC (WORK BREAKDOWN STRUCTURE - WBS) & TỪ ĐIỂN WBS
**Tiêu chuẩn áp dụng:** PMI PMBOK - Develop Scope Structure & WBS Dictionary  
**Dự án:** Vương Quốc Tri Thức (KidsEdu)  

---

## 1. CÂY PHÂN RÃ CÔNG VIỆC (WBS HIERARCHICAL TREE)

```
1.0 DỰ ÁN VƯƠNG QUỐC TRI THỨC (KIDSEDU)
│
├── 1.1 Quản trị dự án & Quy trình PMI (Lead by PM - Agent 1)
│   ├── 1.1.1 Tuyên ngôn dự án & RACI Matrix
│   ├── 1.1.2 Kế hoạch quản lý phạm vi & WBS Dictionary
│   ├── 1.1.3 Quản trị rủi ro (Risk Register) & Quản lý thay đổi
│   └── 1.1.4 Điều phối Sprint & Họp đồng bộ Sub-agents
│
├── 1.2 Phân tích nghiệp vụ & Sư phạm số hóa (Lead by BA - Agent 2 & Pedagogy)
│   ├── 1.2.1 Báo cáo đối chuẩn thị trường (Benchmarking EdTech)
│   ├── 1.2.2 Trích xuất & Số hóa chương trình Toán 1 (SGK 2026)
│   ├── 1.2.3 Trích xuất & Số hóa chương trình Tiếng Việt 1 (SGK 2026)
│   ├── 1.2.4 Trích xuất & Số hóa chương trình Tiếng Anh 1 (SGK 2026)
│   └── 1.2.5 Xây dựng Ma trận Truy vết Yêu cầu (RTM) & Core Game Loop
│
├── 1.3 Thiết kế Trải nghiệm Trẻ thơ & Gamification UI (Lead by UI/UX - Agent 3)
│   ├── 1.3.1 Kids Design System (Màu sắc, Typography, Nút chạm > 60px)
│   ├── 1.3.2 Thiết kế Bản đồ Đảo Thần Tiên (Interactive World Map)
│   ├── 1.3.3 Thiết kế Giao diện Trò chơi (Lật thẻ, Nối từ, Bắn bóng, Đố vui)
│   ├── 1.3.4 Hiệu ứng phần thưởng thị giác (Sao rơi, Hòm vàng bung quà, Cúp)
│   └── 1.3.5 Kiểm tra công thái học trên màn hình cảm ứng iPad cũ
│
├── 1.4 Lập trình Game Engine & Đảo Môn Học (Lead by Dev - Agent 4)
│   ├── 1.4.1 Tái cấu trúc Game Engine tuân thủ 100% chuẩn ES5
│   ├── 1.4.2 Xây dựng Đảo Toán 1 (Số học, Đếm hình, Phép tính 10)
│   ├── 1.4.3 Xây dựng Đảo Tiếng Việt 1 (Chữ cái, 5 Dấu thanh, Ghép âm)
│   ├── 1.4.4 Xây dựng Đảo Tiếng Anh 1 (Phonics, Từ vựng, Số đếm)
│   └── 1.4.5 Tối ưu hóa DOM và GPU CSS 3D transforms (Safari 12.5.8)
│
├── 1.5 Âm thanh, Lồng tiếng & Cốt truyện (Lead by Audio/Storyteller)
│   ├── 1.5.1 Xây dựng Cốt truyện Vương Quốc & 2 Linh vật Rồng - Thỏ
│   ├── 1.5.2 Kịch bản giọng đọc khích lệ & Voice prompt đa cảm xúc
│   ├── 1.5.3 Thiết kế gói Sound FX (Ting, Pop, Success Fanfare)
│   └── 1.5.4 Nhạc nền BGM vui tươi, chống mệt tai và tự động lặp mượt
│
├── 1.6 Hạ tầng Dữ liệu, Ngoại tuyến & Đánh giá Backend (Dev & Architect)
│   ├── 1.6.1 Cơ chế lưu trữ Offline-First (LocalStorage Cache)
│   ├── 1.6.2 Đồng bộ dữ liệu Firebase Realtime DB & Debounce
│   ├── 1.6.3 Cấu hình PWA (Manifest, Service Worker, Biểu tượng App)
│   └── 1.6.4 Đánh giá kiến trúc Serverless vs Custom Backend API
│
└── 1.7 Kiểm thử Chất lượng & Nghiệm thu (Lead by QC Tester - Agent 5)
    ├── 1.7.1 Kiểm thử tĩnh cú pháp ES5 tự động (CI/Linting chống ES6)
    ├── 1.7.2 Thực thi Test Cases chức năng theo RTM
    ├── 1.7.3 Kiểm thử thực chiến trên iPad iOS 12.5.8
    ├── 1.7.4 Đánh giá Usability Heuristic cho trẻ 6 tuổi
    └── 1.7.5 Báo cáo nghiệm thu & Biên bản đóng gói v1.0
```

---

## 2. TỪ ĐIỂN WBS (WBS DICTIONARY TÓM TẮT CÁC GÓI CÔNG VIỆC TRỌNG YẾU)

| Mã WBS | Tên gói công việc | Mô tả nội dung công việc | Người phụ trách (R) | Tiêu chí hoàn thành (DoD) |
|---|---|---|---|---|
| **1.2.2** | Số hóa Toán 1 SGK 2026 | Chuyển đổi 118 trang SGK Toán 1 thành ngân hàng câu hỏi tương tác chia theo cấp độ. | BA (Agent 2) | 100% dạng bài có câu hỏi, đáp án, giải thích trực quan. |
| **1.3.1** | Kids Design System | Bộ quy chuẩn UI dành riêng cho trẻ 6 tuổi: font chữ tròn trịa, nút bấm to, màu tương phản. | UI/UX (Agent 3) | File đặc tả CSS tokens và thư viện components mẫu. |
| **1.4.1** | ES5 Core Refactoring | Rà soát toàn bộ source code `js/*.js`, đảm bảo 0% cú pháp ES6+. | Dev (Agent 4) | `node -c` thành công 100%, không còn `let/const/=>`. |
| **1.5.3** | Gói Sound FX & BGM | Biên tập và nén tối ưu các file âm thanh tương tác. | Audio Designer | Dung lượng mỗi file < 50KB, định dạng tương thích iOS. |
| **1.6.4** | Báo cáo Đánh giá Backend | Phân tích ưu/nhược điểm việc dựng backend riêng so với Serverless Firebase. | Dev & Architect | Tài liệu kiến trúc phân tích chi phí, độ trễ và bảo mật. |
| **1.7.3** | iPad Field Testing | Chạy thử toàn bộ các màn chơi trên Safari iPad iOS 12.5.8. | QC (Agent 5) | 0 crash, âm thanh mở được, cảm ứng nhạy, không tràn layout. |
