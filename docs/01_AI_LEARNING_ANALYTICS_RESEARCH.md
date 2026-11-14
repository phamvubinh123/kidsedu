# Nghiên Cứu Nhúng AI Theo Dõi Hành Vi Học Tập & Hỗ Trợ Ba Mẹ (Learning Analytics & AI Coach)

Tài liệu này phân tích kiến trúc tối ưu để nhúng **AI theo dõi hành vi học (Telemetry)**, **đánh giá độ khó bài tập (Adaptive Difficulty / ZPD)** và **trợ lý tư vấn cho Ba Mẹ** vào nền tảng **Đảo Tri Thức (KidsEdu)** — đảm bảo tương thích **iPadOS 12.5.8 (ES5)**, bảo mật API Key trên **GitHub Pages (Static SPA)** và chi phí vận hành bằng **0đ**.

---

## 1. Kiến Trúc Đề Xuất: Mô Hình Lai 2 Tầng (Hybrid 2-Tier AI)

Do app chạy thuần Static SPA trên GitHub Pages (không có backend riêng), **tuyệt đối không nhúng cứng API Key (Gemini/OpenAI) vào JS frontend** vì sẽ bị lộ key công khai. Thay vào đó, chia làm 2 tầng:

```text
[Hành vi bé khi chơi]
   ├── Thời gian trả lời từng câu (responseTimeMs)
   ├── Đúng/Sai & số lần nghe lại loa (replayAudioCount)
   ├── Thoát giữa chừng (abandonCount) & Khung giờ học
   └── Nhóm kỹ năng / chủ đề (topic + lesson tag)
          │
          ▼
[Tầng 1: On-Device Statistical AI Engine (Chạy 100% trên máy, 0đ, Offline)]
   ├── Tính chỉ số Độ Khó Phù Hợp (ZPD: Quá dễ / Vừa sức / Quá khó)
   ├── Tự động điều chỉnh nhịp học (Adaptive Difficulty)
   └── Xuất báo cáo "Insights cho Ba Mẹ" ngay trong tab Báo cáo
          │
          ▼ (Tùy chọn nâng cao - Khi ba mẹ bấm "Hỏi Trợ Lý AI")
[Tầng 2: Generative AI Coach (Gemini API qua Cloudflare Worker hoặc BYOK)]
   ├── Gửi JSON tóm tắt ẩn danh (không gửi tên thật/thông tin cá nhân)
   └── Sinh lời khuyên sư phạm cá nhân hóa & gợi ý cách ba mẹ kèm con tại nhà
```

---

## 2. Thiết Kế Bộ Thu Thập Hành Vi (Behavior Telemetry Schema)

Mỗi khi bé hoàn thành (hoặc thoát) một ván chơi, lưu thêm một bản ghi gọn vào `state.telemetry` (giới hạn 100 phiên gần nhất để không nặng `localStorage` & Firebase):

```javascript
// Ví dụ 1 bản ghi telemetry chuẩn ES5
{
  ts: 1794640000000,       // Thời điểm học (phân tích khung giờ vàng tập trung)
  subj: "viet",            // Môn học: math | viet | eng
  topic: "g_gh_ng_ngh",    // Chặng / Kỹ năng cụ thể
  mode: "quiz",            // Chế độ chơi: quiz | match | memory | balloon
  correct: 6,              // Số câu đúng
  total: 8,                // Tổng số câu
  avgMs: 4200,             // Thời gian phản hồi trung bình (ms/câu)
  fastGuessCount: 2,       // Số câu bấm quá nhanh (< 1200ms) -> dấu hiệu đoán mò
  audioReplays: 3,         // Số lần bấm nghe lại câu hỏi -> dấu hiệu chưa hiểu đề
  completed: true          // false nếu thoát ngang giữa chừng -> dấu hiệu chán/quá khó
}
```

---

## 3. Thuật Toán Đánh Giá Độ Khó Bài Tập (ZPD - Zone of Proximal Development)

Dựa trên lý thuyết sư phạm **Vùng Phát Triển Gần Nhất (Vygotsky)** kết hợp 3 tín hiệu: **Tỉ lệ đúng (`accuracy`)**, **Tốc độ phản hồi (`avgMs`)**, và **Tỉ lệ bỏ dở (`abandonRate`)**:

| Trạng thái độ khó | Điều kiện nhận diện | Hành động / Đề xuất của hệ thống |
| :--- | :--- | :--- |
| **🟢 Quá Dễ (Cần TĂNG độ khó)** | `accuracy >= 90%` **VÀ** `avgMs < 3500ms` trong ≥ 2 phiên liên tiếp | • Đề xuất ba mẹ cho bé nhảy chặng / bật thử thách tốc độ (Bóng Bay).<br>• Hệ thống tự tăng tỉ lệ câu hỏi nâng cao trong chặng sau. |
| **🟡 Vừa Sức (Vùng Vàng - Tối ưu)** | `accuracy` từ `65% – 89%` **VÀ** `avgMs` từ `3500ms – 9000ms` | • Duy trì lộ trình hiện tại, khen ngợi bé giữ phong độ ổn định. |
| **🔴 Quá Khó (Cần GIẢM độ khó)** | `accuracy < 55%` **HOẶC** `avgMs > 12000ms` **HOẶC** bỏ dở > 30% | • Đề xuất giảm tốc độ đọc (0.8x), gợi ý bé quay lại chơi **Ghép Đôi / Phiến Đá** (không áp lực thời gian).<br>• Hệ thống ưu tiên chọn câu hỏi nền tảng dễ trước trong 3 câu đầu để bé lấy tự tin. |
| **⚠️ Dấu hiệu Đoán Mò (Clicking Fast)** | `accuracy < 50%` **VÀ** `avgMs < 1500ms` (`fastGuessCount` cao) | • Cảnh báo nhẹ cho Ba Mẹ: *"Bé đang bấm rất nhanh chưa kịp nghe hết câu hỏi — ba mẹ nhắc bé nghe hết loa rồi hãy chọn nhé!"* |

---

## 4. Các Tính Năng Hỗ Trợ Ba Mẹ Kèm Con Học

### A. Trên Dashboard Báo Cáo (Tầng 1 - Miễn phí 100%)
1. **Thẻ "Độ Khó & Nhịp Học Hiện Tại" theo từng môn (Toán / Tiếng Việt / Tiếng Anh):**
   - Hiển thị trực quan: `Toán: Vừa sức 🟡` | `Tiếng Việt: Cần giảm nhẹ 🔴 (hay nhầm g/gh)` | `Tiếng Anh: Quá dễ 🟢 (nên tăng tốc)`.
2. **Khung Giờ Vàng Của Bé:**
   - Tự thống kê khung giờ bé làm đúng cao nhất (ví dụ: *19h–20h tối đạt 88%, tốt hơn buổi trưa 64%*).
3. **Top 3 Điểm Yếu Cần Ba Mẹ Kèm (Error Hotspots):**
   - Liệt kê đúng tên bài/quy tắc bé hay sai kèm **1 mẹo dạy nhanh tại nhà** (viết sẵn theo chuẩn sư phạm lớp 1).

### B. Trợ Lý AI Tư Vấn Cho Ba Mẹ (Tầng 2 - Generative AI)
* **Cách hoạt động:** Trong **Cài đặt cho Bố Mẹ** hoặc nút **"🤖 AI Phân Tích & Gợi Ý"** ở Báo cáo học tập:
  - Gửi bản tóm tắt JSON đã ẩn danh lên Gemini Flash (`gemini-2.5-flash` — rất nhanh và gần như miễn phí).
  - AI trả về 3 phần ngắn gọn cho ba mẹ:
    1. **Nhận xét tuần qua** (điểm mạnh & điểm cần chú ý).
    2. **Điều chỉnh độ khó khuyến nghị** (nên tăng/giảm phần nào).
    3. **Hoạt động 5 phút ngoài đời** để ba mẹ chơi cùng con củng cố đúng chỗ bé đang yếu.
* **2 Phương án bảo mật API Key:**
  - **Phương án 1 (Khuyên dùng - An toàn tuyệt đối):** Tạo 1 **Cloudflare Worker** miễn phí (~30 dòng code) giữ `GEMINI_API_KEY` ở biến môi trường; app chỉ gọi URL Worker.
  - **Phương án 2 (Nhanh nhất - Không cần server):** Thêm ô nhập `Gemini API Key` trong **Cài đặt Dành Cho Bố Mẹ** (qua cổng phép tính nhân), lưu cục bộ trong `localStorage` của trình duyệt ba mẹ.

---

## 5. Lộ Trình Triển Khai Đề Xuất (2 Bước Gọn Nhẹ)

1. **Pha 1 (Triển khai ngay - Không cần API Key, 0đ):**
   - Ghi nhận `avgMs`, `fastGuessCount`, `audioReplays`, `completed` trong engine game (`js/app.js`).
   - Xây dựng bộ phân tích **ZPD Difficulty Fit** & thẻ **AI Insights cho Ba Mẹ** ngay trong tab **Báo cáo học tập**.
   - Bật **Adaptive Question Ordering** (nếu ván trước bé sai nhiều, ván sau tự xếp câu dễ lên đầu để lấy lại tự tin; nếu quá dễ, ưu tiên câu nâng cao).
2. **Pha 2 (Tùy chọn - Kết nối Gemini AI Coach):**
   - Thêm nút **"🤖 Nhờ AI Tư Vấn Sâu"** trong Báo cáo (hỗ trợ cả Cloudflare Worker URL hoặc nhập key cá nhân trong Cài đặt Bố Mẹ).
