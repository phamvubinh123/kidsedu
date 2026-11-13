# TIÊU CHUẨN CHẤT LƯỢNG & RÀNG BUỘC KỸ THUẬT (QUALITY MANAGEMENT PLAN)
**Tiêu chuẩn áp dụng:** PMI PMBOK - Manage Quality Assurance & Quality Metrics  
**Dự án:** Vương Quốc Tri Thức (KidsEdu)  

---

## 1. TIÊU CHUẨN KỸ THUẬT NỀN TẢNG (TECHNICAL BASELINE)

### 1.1. Ràng buộc tương thích ES5 (Safari iOS 12.5.8)
Thiết bị mục tiêu chính của dự án là các dòng iPad cũ gia đình (iPad Air 1, iPad Mini 2/3, iPad 4 chạy iOS 12.5.8). JavaScript engine (JavaScriptCore/Nitro) trên các phiên bản này gặp lỗi cú pháp nghiêm trọng (`SyntaxError: Unexpected token`) nếu gặp các cú pháp hiện đại:

| Cú pháp BỊ CẤM (ES6+) | Cú pháp THAY THẾ BẮT BUỘC (ES5) | Ghi chú & Lý do |
|---|---|---|
| `const x = 1; let y = 2;` | `var x = 1; var y = 2;` | Khai báo biến chuẩn ES5 có function scope. |
| `(a, b) => a + b` | `function(a, b) { return a + b; }` | Không dùng Arrow Functions. |
| `\`Xin chào ${name}\`` | `'Xin chào ' + name` | Không dùng Template Literals. |
| `async / await` | Callback function hoặc Promise chuẩn có polyfill | Không dùng async function native. |
| `class GameEngine {}` | `function GameEngine() {}` (Prototype) | Không dùng class declaration. |
| `obj?.prop?.sub` | `obj && obj.prop && obj.prop.sub` | Không dùng Optional Chaining. |
| `a ?? b` | `(a !== undefined && a !== null) ? a : b` | Không dùng Nullish Coalescing. |

### 1.2. Ràng buộc CSS cho Safari cũ
- **Tuyệt đối KHÔNG dùng Flexbox `gap`** (Safari 12 không hỗ trợ `gap` trong `display: flex`, chỉ hỗ trợ trong CSS Grid). Thay thế bằng `margin` hoặc bảng lưới định kích thước phần trăm.
- **Bắt buộc có tiền tố `-webkit-`** cho các thuộc tính:
  - `-webkit-backdrop-filter: blur(...)`
  - `-webkit-transform: ...`
  - `-webkit-animation: ...`
  - `-webkit-touch-callout: none`
  - `-webkit-user-select: none`
- **Không dùng CSS Nesting trực tiếp** (ví dụ `.parent { .child { ... } }`) mà phải viết tường minh `.parent .child { ... }`.

### 1.3. Cơ chế âm thanh trên iOS & Kiến trúc Audio Sprites
Trình duyệt iOS Safari tự động đình chỉ (suspend) AudioContext và chặn phát thẻ `<audio>` nếu không được kích hoạt từ thao tác chạm trực tiếp của người dùng (`touchstart` hoặc `click`). Ngoài ra, Web Speech API (`speechSynthesis`) trên iOS 12.5.8 thường xuyên bị treo sau 15 giây, xung đột âm lượng với nhạc nền và **mặc định thiếu gói giọng đọc Tiếng Việt**, dẫn đến đọc sai ngữ điệu tiếng Anh.
- **Audio Context Unlock:** Ngay tại màn hình chào đầu tiên hoặc nút "Chạm để Bắt Đầu", kích hoạt một âm thanh ngắn không tiếng (silent buffer) để mở khóa AudioContext toàn cầu.
- **Audio Sprites Strategy (Khuyến nghị bắt buộc cho câu lệnh lõi):** Các câu lệnh điều hướng dùng chung, âm chữ cái Tiếng Việt, câu khen ngợi và từ vựng Tiếng Anh chuẩn phải được đóng gói thành **Audio Sprites (MP3/M4A 32kbps mono)** nạp sẵn vào bộ nhớ đệm, phát theo mốc thời gian (timestamps) để đạt độ trễ $< 30\text{ms}$ và không phụ thuộc vào cài đặt TTS của thiết bị. `speechSynthesis` chỉ đóng vai trò fallback dự phòng.

### 1.4. Khóa cử chỉ chạm & Chống Zoom / Scroll trên Safari cũ (Gesture Lockdown)
Trẻ 6 tuổi thường tì lòng bàn tay lên mặt kính iPad khi thao tác, dễ kích hoạt nhầm tính năng Pinch-to-Zoom, Double-Tap Zoom hoặc cuộn trang đàn hồi (Rubber-band scroll) của Safari.
- **CSS Lockdown:**
  ```css
  html, body {
    touch-action: manipulation; /* hoặc none cho vùng game */
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    overscroll-behavior: none;
  }
  ```
- **JS Gesture Prevention:** Chặn triệt để cử chỉ đa điểm trên vùng chơi game bằng `gesturestart` và `touchmove` khi `e.touches.length > 1`.

### 1.5. Phòng ngừa sập bộ nhớ RAM 1GB (WebKit Jetsam OOM Prevention)
Các thiết bị iPad cũ (iPad Air 1, Mini 2, iPad 4) chỉ có 1GB RAM vật lý; Safari giới hạn mỗi tab khoảng 150-180MB trước khi tiến trình Jetsam tự động tải lại trang gây mất trải nghiệm:
- **DOM Recycling (Tái sử dụng DOM):** Không xóa và tạo mới toàn bộ cây DOM sau mỗi câu hỏi; tái sử dụng khung chứa cố định và chỉ cập nhật text/class/dataset.
- **Tối ưu hóa GPU CSS:** Hạn chế lạm dụng `backdrop-filter: blur()` và `box-shadow` đa tầng trên diện tích lớn; ưu tiên kích hoạt phần cứng nhẹ với `transform: translate3d(0,0,0)`.
- **Debounced Cloud Sync:** Không mở kết nối lắng nghe Firebase liên tục trong lúc bé chơi game; lưu trạng thái vào LocalStorage tức thì và đẩy lên Firebase theo đợt (batch) khi kết thúc màn chơi hoặc về trang chủ.

---

## 2. TIÊU CHUẨN TRẢI NGHIỆM TRẺ THƠ (CHILD-COMPUTER INTERACTION - CCI)
*Dựa trên tiêu chuẩn Nielsen Norman Group về thiết kế giao diện cho trẻ em 3-8 tuổi:*

1. **Vùng chạm ngón tay (Touch Target Size):**
   - Nút thao tác chính: $\ge 64 \times 64 \text{ px}$ (tối thiểu $48 \times 48 \text{ px}$).
   - Khoảng cách an toàn giữa 2 nút: $\ge 16 \text{ px}$ để tránh trẻ chạm trượt.
2. **Nguyên tắc phi ngôn ngữ (Iconography & Audio First):**
   - Trẻ 6 tuổi chưa đọc thành thạo: Mọi câu hỏi phải có nút "Loa phát âm" to rõ hoặc tự động đọc khi chuyển màn hình.
   - Hình ảnh trực quan (con vật, hoa quả, đồ chơi) phải sinh động, kích thước rõ nét, có đổ bóng nhẹ để tạo cảm giác 3D có thể ấn được.
3. **Phản hồi tức thì (Instant Visual & Haptic Feedback):**
   - Khi chạm vào nút: Phải có hiệu ứng lún xuống (`transform: scale(0.95)`), đổi màu hoặc nảy (`bounce`).
   - Khi chọn đúng: Hiệu ứng pháo hoa (`confetti`), sao rơi, âm thanh leng keng vui tươi và lời khen động viên.
   - Khi chọn sai: Hiệu ứng lắc lư nhẹ (`shake`), âm thanh nhẹ nhàng "Ủa, thử lại nhé!", tuyệt đối không dùng âm thanh còi hú tiêu cực gây sợ hãi.
4. **Cơ chế tương tác "Chạm nguồn $\to$ Chạm đích" (Tap-to-Select / Tap-to-Place):**
   - Hạn chế sử dụng kéo-thả (Drag & Drop) liên tục trên đường dài vì ngón tay trẻ 6 tuổi dễ bị trượt và dễ kích hoạt lỗi `touchcancel` trên Safari iOS 12. Thay vào đó, ưu tiên thao tác 2 nhịp: **Chạm chọn vật thể** (vật thể nảy sáng) $\to$ **Chạm vào ô đích** (vật thể tự bay vào vị trí).
5. **Giới hạn tải nhận thức (Visual Priming & Working Memory Cap):**
   - Trẻ 6 tuổi chỉ lưu giữ tối đa 2-3 đơn vị thông tin cùng lúc. Câu lệnh âm thanh phải ngắn gọn dưới 4 giây, hình ảnh minh họa xuất hiện trước lời thoại.
   - Với học kỳ 1 lớp 1, mỗi câu hỏi trắc nghiệm chỉ nên hiển thị **2 đến 3 phương án lựa chọn** to rõ để tránh quá tải thông tin khiến trẻ bấm bừa.

---

## 3. TIÊU CHUẨN BẢO MẬT & QUYỀN RIÊNG TƯ (CHILD PRIVACY - COPPA)
1. **Không thu thập dữ liệu định danh cá nhân (PII):** Ứng dụng chỉ lưu tên gọi thân mật ở nhà (ví dụ "HOÀNG LONG"), không lưu họ tên đầy đủ, ngày sinh, địa chỉ hay email của bé.
2. **Không quảng cáo (Zero Ads):** Hoàn toàn không gắn mã theo dõi quảng cáo (Google Ads, Facebook Pixel...) để đảm bảo không gian học tập an toàn tuyệt đối.
3. **Phân quyền cổng phụ huynh:** Các thao tác xóa tiến trình, đổi profile, cấu hình âm thanh nâng cao phải được đặt trong khu vực cài đặt có cơ chế chống chạm nhầm của trẻ.
