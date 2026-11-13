# CƠ CẤU ĐỘI NGŨ & MA TRẬN PHÂN CÔNG TRÁCH NHIỆM (RACI MATRIX)
**Tiêu chuẩn áp dụng:** PMI PMBOK - Plan Resources Management & Responsibility Assignment Matrix  
**Dự án:** Vương Quốc Tri Thức (KidsEdu)  

---

## 1. ĐỘI NGŨ SUB-AGENTS CHUYÊN BIỆT (SPECIALIZED SUB-AGENTS SQUAD)

```
                       ┌─────────────────────────────────────────┐
                       │       PROJECT SPONSOR (BỐ MẸ)           │
                       └────────────────────┬────────────────────┘
                                            │
                       ┌────────────────────▼────────────────────┐
                       │   AGENT 1: PROJECT MANAGER (AI LEAD)    │
                       │     (Điều phối, Kế hoạch & Quản trị)    │
                       └────────┬──────────────────────┬─────────┘
                                │                      │
           ┌────────────────────┴──────────┐           └─────────────────────┬───────────────────┐
           │                               │                                 │                   │
┌──────────▼──────────┐         ┌──────────▼──────────┐           ┌──────────▼──────────┐        │
│ AGENT 2: BUSINESS   │         │ AGENT 3: UI/UX      │           │ AGENT 4: FULLSTACK  │        │
│ ANALYST (BA)        │         │ DESIGNER            │           │ DEVELOPER (DEV)     │        │
│ Phân tích thị trường│         │ Trải nghiệm trẻ thơ │           │ Lập trình Engine,   │        │
│ & Khung SGK 2026    │         │ & Gamification UI   │           │ ES5 & Backend PWA   │        │
└──────────┬──────────┘         └──────────┬──────────┘           └──────────┬──────────┘        │
           │                               │                                 │                   │
           │        ┌──────────────────────┴──────────────┐                  │                   │
           │        │                                     │                  │                   │
┌──────────▼────────▼─┐                         ┌─────────▼─────────┐        │          ┌────────▼──────────┐
│ [CỐ VẤN BỔ SUNG 1]  │                         │ [CỐ VẤN BỔ SUNG 2]│        │          │ AGENT 5: QC TESTER│
│ CURRICULUM SPECIALIST│                        │ AUDIO STORYTELLER │        │          │ Kiểm thử chất     │
│ Cố vấn Sư phạm SGK  │                         │ Biên kịch & Nhạc  │        │          │ lượng & Tương     │
│ chuẩn GDPT 2018     │                         │ nền thế giới game │        │          │ thích thiết bị cũ │
└─────────────────────┘                         └───────────────────┘        │          └───────────────────┘
                                                                             │
                                                                             ▼
                                                                  [NGƯỜI DÙNG: BÉ LỚP 1]
```

### 1.1. Chi tiết phân vai và năng lực

| Tên Agent | Roster Name | Vai trò cốt lõi | Công cụ & Đầu ra chính (Deliverables) |
|---|---|---|---|
| **Agent 1: Project Manager** | `coordinator` | Quản trị tiến độ, phân bổ nguồn lực, theo dõi rủi ro và điều phối toàn bộ dự án theo chuẩn PMI. | Project Charter, WBS, Schedule, Sprint Backlog, Báo cáo tiến độ. |
| **Agent 2: Business Analyst** | `business-analyst` | Phân tích thị trường EdTech tương tác, đào sâu 3 cuốn SGK 2026 trong `sources/`, mô hình hóa yêu cầu và gamification. | Báo cáo đối chuẩn (Benchmarking), User Stories, Requirements Traceability Matrix (RTM). |
| **Agent 3: UI/UX Designer** | `uiux-designer` | Thiết kế giao diện trẻ thơ, visual feedback, màu sắc vui nhộn, nút to dễ chạm, luồng tương tác gamified. | Kids Design System, Wireframes, UI Specifications, Game Screen Flows. |
| **Agent 4: Fullstack Developer** | `fullstack-dev` | Lập trình logic game, xử lý âm thanh Web Audio, đồng bộ Firebase, đảm bảo nghiêm ngặt chuẩn ES5 và kiến trúc Backend/Cloud. | Source code (JS/CSS/HTML), Firebase Rules, PWA Service Worker, Engine tối ưu. |
| **Agent 5: QC Tester** | `qc-tester` | Kiểm thử toàn diện ứng dụng, phát hiện rò rỉ mã ES6, kiểm tra độ mượt trên iPad iOS 12.5.8, đánh giá độ dễ dùng cho trẻ 6 tuổi. | Test Plan, Test Cases, Báo cáo lỗi (Defect Log), Đánh giá Heuristic Usability. |
| *Cố vấn bổ sung 1: Curriculum* | `curriculum-pedagogy` | Cố vấn chuyên môn sư phạm lớp 1, rà soát cấu trúc âm vần tiếng Việt, tư duy trực quan toán học, phonics tiếng Anh. | Ma trận kiến thức theo tuần học, ngân hàng câu hỏi chuẩn SGK 2026. |
| *Cố vấn bổ sung 2: Storyteller* | `audio-storyteller` | Xây dựng cốt truyện vương quốc kỳ diệu, linh vật đồng hành (Rồng & Thỏ), kịch bản lồng tiếng khích lệ và danh mục âm thanh. | Thế giới quan (Lore), Kịch bản dẫn chuyện (Voice Prompts), Audio Cue Sheet. |

---

## 2. MA TRẬN RACI THEO CÁC HẠNG MỤC DỰ ÁN

> **Quy ước:**
> - **R (Responsible):** Người trực tiếp thực hiện công việc.
> - **A (Accountable):** Người chịu trách nhiệm phê duyệt cuối cùng (PM hoặc Sponsor).
> - **C (Consulted):** Người được tham vấn chuyên môn hai chiều trước khi thực hiện.
> - **I (Informed):** Người được thông báo kết quả sau khi hoàn thành.

| Giai đoạn & Hạng mục bàn giao | Sponsor (Bố Mẹ) | PM (Agent 1) | BA (Agent 2) | UI/UX (Agent 3) | Dev (Agent 4) | QC (Agent 5) | Pedagogy (Opt) | Audio (Opt) |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **1. Khởi tạo & Quản trị** |
| Phê duyệt Tuyên ngôn Dự án (Charter) | **A** | **R** | C | I | I | I | C | I |
| Kế hoạch phân bổ nguồn lực & RACI | I | **A / R** | C | C | C | C | I | I |
| **2. Phân tích & Yêu cầu** |
| Nghiên cứu đối thủ EdTech (Duolingo, Khan...) | I | A | **R** | C | I | I | C | C |
| Phân tích 3 cuốn SGK 2026 (`sources/`) | I | A | **R** | I | I | I | **R** | I |
| Ma trận truy vết yêu cầu (RTM) | I | **A** | **R** | C | C | C | C | I |
| **3. Thiết kế Trải nghiệm & Giao diện** |
| Thiết kế linh vật & Cốt truyện phiêu lưu | C | A | C | **R** | I | I | C | **R** |
| Kids Design System & Wireframes giao diện | C | **A** | C | **R** | C | C | I | I |
| Danh mục hiệu ứng âm thanh & Nhạc nền | I | A | I | C | C | I | I | **R** |
| **4. Phát triển Kỹ thuật** |
| Kiến trúc Game Engine & Đánh giá Backend | I | **A** | C | C | **R** | C | I | I |
| Lập trình các đảo bài học (Toán, TV, Anh) | I | A | C | C | **R** | I | C | C |
| Tích hợp Web Audio & Giọng đọc phát âm | I | A | I | I | **R** | I | C | C |
| Đồng bộ dữ liệu Firebase & LocalStorage | I | A | I | I | **R** | I | I | I |
| **5. Kiểm thử & Đảm bảo chất lượng** |
| Bộ kiểm thử tĩnh ES5 & Chống rò rỉ cú pháp | I | A | I | I | C | **R** | I | I |
| Kiểm thử chức năng theo RTM | I | **A** | C | I | C | **R** | C | I |
| Kiểm thử trên thiết bị thật (iPad 12.5.8) | C | A | I | C | C | **R** | I | I |
| Đánh giá Heuristic trải nghiệm bé 6 tuổi | **A** | C | C | C | I | **R** | C | C |
| **6. Đóng gói & Phát hành** |
| Triển khai bản phát hành chính thức (Release) | **A** | **R** | I | I | **R** | C | I | I |
