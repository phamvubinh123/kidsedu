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

### 1.3. Cơ chế âm thanh trên iOS (Audio Context Unlock)
Trình duyệt iOS Safari tự động đình chỉ (suspend) AudioContext và chặn phát thẻ `<audio>` nếu không được kích hoạt từ thao tác chạm trực tiếp của người dùng (`touchstart` hoặc `click`).
- **Quy chuẩn kỹ thuật:** Ngay tại màn hình chào đầu tiên hoặc nút "Chạm để Bắt Đầu", kích hoạt một âm thanh ngắn không tiếng (silent buffer) để mở khóa AudioContext toàn cầu.

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

---

## 3. TIÊU CHUẨN BẢO MẬT & QUYỀN RIÊNG TƯ (CHILD PRIVACY - COPPA)
1. **Không thu thập dữ liệu định danh cá nhân (PII):** Ứng dụng chỉ lưu tên gọi thân mật ở nhà (ví dụ "HOÀNG LONG"), không lưu họ tên đầy đủ, ngày sinh, địa chỉ hay email của bé.
2. **Không quảng cáo (Zero Ads):** Hoàn toàn không gắn mã theo dõi quảng cáo (Google Ads, Facebook Pixel...) để đảm bảo không gian học tập an toàn tuyệt đối.
3. **Phân quyền cổng phụ huynh:** Các thao tác xóa tiến trình, đổi profile, cấu hình âm thanh nâng cao phải được đặt trong khu vực cài đặt có cơ chế chống chạm nhầm của trẻ.
