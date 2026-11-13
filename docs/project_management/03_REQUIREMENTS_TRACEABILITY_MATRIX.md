# MA TRẬN TRUY VẾT YÊU CẦU (REQUIREMENTS TRACEABILITY MATRIX - RTM)
**Tiêu chuẩn áp dụng:** PMI PMBOK - Elicit and Analyze Requirements  
**Dự án:** Vương Quốc Tri Thức (KidsEdu)  
**Căn cứ nội dung:** Bộ 3 Sách Giáo Khoa thống nhất lớp 1 từ năm 2026 (`sources/`)  

---

## 1. PHÂN HỆ 1: ĐẢO SỐ HỌC DIỆU KỲ (TOÁN LỚP 1)
*Nguồn tham chiếu: `sources/sgk-toan-1-tu-nam-2026-tap-1.pdf` (118 trang)*

| Mã Yêu Cầu | Chương / Bài SGK | Mô tả chức năng học tập | Cơ chế Gamification tương ứng | Module phụ trách | Test Case ID | Ưu tiên |
|---|---|---|---|---|---|:---:|
| **REQ-M-01** | Chủ đề 1: Các số 0, 1, 2, ..., 10 | Đếm số lượng con vật, hoa quả, đồ vật trực quan từ 1 đến 10. | **Minigame Đếm hình nhận ngọc:** Hiện đàn ong, giỏ táo, bé chọn số đúng để rương bung quà. | `js/app.js`, `js/questions.js` | TC-M-01 | **P0** |
| **REQ-M-02** | Chủ đề 1: So sánh số (>, <, =) | So sánh số lượng hai nhóm vật thể; nhận biết nhiều hơn, ít hơn, bằng nhau. | **Cầu thăng bằng kỳ diệu:** Đặt các chú gấu lên bập bênh để bé chọn dấu >, <, = giúp cân bằng cầu. | `js/app.js`, `js/questions.js` | TC-M-02 | **P0** |
| **REQ-M-03** | Chủ đề 2: Hình học trực quan | Nhận biết hình vuông, hình tròn, hình tam giác, hình chữ nhật, khối lập phương. | **Lật thẻ hình khối (Memory):** Tìm cặp thẻ đồng dạng và phát âm tên hình học. | `js/app.js` (Memory Engine) | TC-M-03 | **P1** |
| **REQ-M-04** | Chủ đề 3: Phép cộng trong phạm vi 10 | Bản chất phép cộng (gộp lại); bảng cộng trong phạm vi 10. | **Bắn bóng phép tính:** Quả bóng mang kết quả bay lên, bé chọn súng bóng tương ứng để nổ pháo hoa. | `js/app.js`, `js/audio.js` | TC-M-04 | **P0** |
| **REQ-M-05** | Chủ đề 4: Phép trừ trong phạm vi 10 | Bản chất phép trừ (bớt đi, tách ra); bảng trừ trong phạm vi 10. | **Cho thú ăn quả:** Cây có 8 quả táo, khỉ ăn 3 quả, còn lại mấy quả? Hoạt ảnh rụng quả sinh động. | `js/app.js` | TC-M-05 | **P0** |
| **REQ-M-06** | Ôn tập học kỳ 1: Bài toán thực tế | Giải bài toán bằng hình vẽ trực quan đơn giản. | **Thử thách Vượt Đèo Tri Thức:** Chuỗi 5 câu đố liên hoàn nhận Cúp Thám Hiểm. | `js/app.js` (Quiz engine) | TC-M-06 | **P1** |

---

## 2. PHÂN HỆ 2: ĐẢO TIẾNG VIỆT THẦN TIÊN (TIẾNG VIỆT LỚP 1)
*Nguồn tham chiếu: `sources/sgk-tieng-viet-1-thong-nhat-tu-nam-2026-tap-1.pdf`*

| Mã Yêu Cầu | Bài học SGK | Mô tả chức năng học tập | Cơ chế Gamification tương ứng | Module phụ trách | Test Case ID | Ưu tiên |
|---|---|---|---|---|---|:---:|
| **REQ-TV-01** | Bài 1 - Bài 10: Chữ cái và âm đầu | Làm quen bảng chữ cái tiếng Việt (a, b, c, d, đ, e, ê, g, h...). | **Đập chuột chữ cái:** Nghe giọng đọc "Tìm chữ Bờ (b)", chuột chũi cầm chữ nhô lên để bé chạm nhanh. | `js/app.js`, `js/audio.js` | TC-TV-01 | **P0** |
| **REQ-TV-02** | Bài 11 - Bài 25: 5 Dấu Thanh | Dấu sắc (´), huyền (`), hỏi (?), ngã (~), nặng (.) và vị trí đặt dấu. | **Tàu lượn siêu tốc dấu thanh:** Xe trượt dốc theo hình dáng dấu thanh kèm âm thanh vui nhộn. | `js/app.js`, `css/style.css` | TC-TV-02 | **P0** |
| **REQ-TV-03** | Bài 26 - Bài 50: Ghép âm & Vần đơn | Ghép phụ âm đầu + nguyên âm (b + a = ba; c + a + sắc = cá). | **Nối toa tàu ghép chữ:** Kéo các toa chữ cái lại gần nhau để đầu tàu nhả khói và đọc vang từ vừa ghép. | `js/app.js` | TC-TV-03 | **P0** |
| **REQ-TV-04** | Bài 51 - Bài 70: Vần kép & Vần có âm cuối | Nhận biết vần an, at, am, ap, ong, oc, uong, uoc... | **Lật thẻ từ vựng & hình ảnh:** Ghép từ "con ong" với hình ảnh chú ong vàng. | `js/app.js` (Memory Engine) | TC-TV-04 | **P1** |
| **REQ-TV-05** | Tập đọc từ và câu ứng dụng | Đọc to câu văn ngắn (3-5 từ) có hỗ trợ giọng đọc mẫu truyền cảm. | **Karaoke Đọc Thơ:** Chữ sáng dần theo giọng đọc mẫu để bé đọc theo, tích lũy microphone vàng. | `js/audio.js` (TTS) | TC-TV-05 | **P1** |

---

## 3. PHÂN HỆ 3: ĐẢO TIẾNG ANH VUI NHỘN (ENGLISH 1)
*Nguồn tham chiếu: `sources/sgk-tieng-anh-lop-1-thong-nhat-tu-nam-2026.pdf`*

| Mã Yêu Cầu | Unit SGK | Mô tả chức năng học tập | Cơ chế Gamification tương ứng | Module phụ trách | Test Case ID | Ưu tiên |
|---|---|---|---|---|---|:---:|
| **REQ-ENG-01** | Unit 1: In the school playground | Chào hỏi (Hello, Goodbye) và từ vựng trường học. | **Chào bạn mới:** Bé chạm nhân vật để nghe đàm thoại bản xứ và phát âm lại. | `js/questions.js`, `js/audio.js`| TC-ENG-01 | **P0** |
| **REQ-ENG-02** | Unit 2: In the dining room | Từ vựng thức ăn, đồ uống (apple, banana, cake, milk). | **Đầu bếp nhí:** Nghe order tiếng Anh và chọn đúng món ăn bày lên đĩa cho các bạn thú. | `js/app.js` | TC-ENG-02 | **P1** |
| **REQ-ENG-03** | Unit 3: At the street market | Số đếm tiếng Anh (One to Ten) kết hợp danh từ số nhiều. | **Đi chợ cùng Rồng Con:** Nhặt đúng số lượng trái cây vào giỏ theo lời dặn tiếng Anh. | `js/app.js` | TC-ENG-03 | **P0** |
| **REQ-ENG-04** | Unit 4: In the bedroom / Toys | Màu sắc (Red, Blue, Yellow, Green) và Đồ chơi (Ball, Car, Doll). | **Pha màu diệu kỳ:** Bắn bóng màu tiếng Anh vào ô tương ứng. | `js/app.js` | TC-ENG-04 | **P1** |
| **REQ-ENG-05** | Phonics Sounds: A, B, C, D... | Phát âm chuẩn Phonics chuẩn quốc tế cho trẻ 6 tuổi. | **Vòng quay may mắn ngữ âm:** Quay trúng âm nào, đọc chuẩn nhận 50 xu. | `js/audio.js` (US/UK Voice) | TC-ENG-05 | **P0** |

---

## 4. PHÂN HỆ 4: GAMIFICATION & TRẢI NGHIỆM HỆ THỐNG
| Mã Yêu Cầu | Hạng mục | Tiêu chí kỹ thuật & Thiết kế | Module | Ưu tiên |
|---|---|---|---|:---:|
| **REQ-SYS-01** | ES5 Strict Compliance | 100% JS chạy được trên Safari iOS 12.5.8 (iPad cũ), không lỗi cú pháp. | Toàn bộ `js/*.js` | **P0** |
| **REQ-SYS-02** | Offline-First (PWA) | Chơi game bình thường không cần Internet, lưu cache LocalStorage. | `index.html`, `js/app.js` | **P0** |
| **REQ-SYS-03** | Cloud Sync Firebase | Tự động đồng bộ tiến độ điểm, xu, cúp khi có mạng, bảo mật API. | `js/firebase-config.js` | **P0** |
| **REQ-SYS-04** | Audio Resilience | Mở khóa âm thanh iOS một chạm, tự động fallback nếu thiết bị thiếu giọng đọc Việt. | `js/audio.js` | **P0** |
| **REQ-SYS-05** | Cổng phụ huynh & Báo cáo | Báo cáo chi tiết số phút học, số bài hoàn thành, chuyển đổi hồ sơ bé. | `js/app.js` (Modal Settings) | **P1** |
