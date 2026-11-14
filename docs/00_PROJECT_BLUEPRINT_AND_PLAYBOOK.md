# Bộ Khung Sườn & Cẩm Nang Nhân Bản Dự Án (Project Blueprint & Playbook)

Tài liệu này tổng hợp toàn bộ kiến trúc của dự án **Đảo Tri Thức (KidsEdu)** sau **44 phiên bản (v1 → v44)**, cung cấp **bộ khung sườn (Boilerplate)** để clone sang dự án mới, **bộ quy tắc (Instructions) phòng tránh 100% các lỗi/rủi ro đã gặp**, và **lộ trình cải thiện** để triển khai dự án tiếp theo với tốc độ nhanh nhất.

---

## 1. Tổng hợp Kiến trúc Dự án (Architecture Overview)

Dự án được thiết kế theo triết lý **Zero-Build Static SPA + Cloud Sync** (không cần Webpack/Vite/Node runtime phức tạp, chạy trực tiếp trên trình duyệt từ thiết bị cũ iPadOS 12.5.8 đến thiết bị mới, triển khai tức thì qua GitHub Pages).

### Các phân hệ cốt lõi đã hoàn thiện (v1 → v44)
| Phân hệ | File chính | Chức năng cốt lõi (Có thể tái sử dụng 100%) |
| :--- | :--- | :--- |
| **1. Core App & Router** | `index.html`, `js/app.js` | Chuyển cảnh mượt giữa 4 màn hình (`Home`, `Map Carousel`, `Game Room`, `Passage Reading`), quản lý đa hồ sơ (`profiles`), tự động lưu & khôi phục tiến độ. |
| **2. Game Engine (4 Modes)** | `js/app.js` | 4 cơ chế tương tác chuẩn EdTech: **Trắc nghiệm (Quiz)**, **Lật thẻ trí nhớ (Memory)**, **Đếm/Phản xạ nhanh (Tap-to-Count / Speed)**, **Nghe & Ghép đôi (Tap-to-Match / Listen)**. |
| **3. Kho Luyện Đọc & Học Liệu** | `js/data.js` | Cấu trúc phân cấp: `Môn học (Đảo) -> Chặng (Stages) -> Câu hỏi` + Kho `PASSAGES` (Từ vựng, Câu, Đoạn văn bấm-để-đọc từng từ). |
| **4. Hybrid Sound & TTS** | `js/app.js` (`Sound`) | Nhạc nền Bossa-nova tổng hợp bằng Web Audio API (`bgmGain` độc lập), hiệu ứng âm thanh (SFX), AudioSprite offline và giọng đọc `speechSynthesis` có bảng sửa lỗi phát âm tiếng Việt (`PHONETIC_FIX`). |
| **5. Gamification & Đổi Quà Thật** | `js/app.js` | Hệ thống **Sao theo từng chế độ chơi** (4 sao/chặng, đạt 3/4 sao mở chặng mới), **Xu vàng**, **Nhiệm vụ hằng ngày**, **Chuỗi ngày học (Streak 3/7/14/30 ngày)**, **Mục tiêu ghim ngoài trang chủ**, **Cửa hàng 2 tab** (Danh hiệu + Quà thật ngoài đời) và **Phiếu đổi quà**. |
| **6. Cổng Phụ Huynh (Parental Gate)** | `js/app.js` | Popup xác thực bằng **phép tính nhân ngẫu nhiên** khi: (1) Xác nhận bé đã đọc xong bài, (2) Duyệt đổi quà thật, (3) Xóa hồ sơ học tập. |

---

## 2. Bộ Khung Sườn Chuẩn (Boilerplate) Khi Clone Dự Án Mới

> **DÀNH CHO AI AGENT KHI DỰNG DỰ ÁN MỚI:**
> Nếu bạn (AI) được người dùng đưa file Playbook này trong một thư mục dự án mới còn trống, **TUYỆT ĐỐI KHÔNG tự viết lại code từ đầu**. Hãy chạy ngay lệnh dưới đây để lấy nguyên bản bộ khung sườn chuẩn từ dự án gốc về thư mục hiện tại:
> ```bash
> /Users/binhpham/Library/CloudStorage/OneDrive-Personal/01.Personal/05.Development/Projects/kidsedu/scripts/clone-new-project.sh . <ma_du_an_moi>
> ```
> *(Hoặc nếu chạy trên máy khác không có thư mục local, hãy chạy: `git clone --depth=1 https://github.com/phamvubinh123/kidsedu.git . && rm -rf .git sources/* && git init`)*

Khi bắt đầu một dự án mới (ví dụ: Toán Lớp 2, Tiếng Anh Mầm Non, Khoa Học Tự Nhiên, hoặc App Flashcard/Quiz bất kỳ), cấu trúc thư mục cần giữ nguyên như sau:

```text
new-project/
├── .gitignore                 # Chặn sources/*.pdf, .DS_Store, node_modules
├── .claudeignore / .cursorignore # Chặn đọc file PDF nặng gây tốn token AI
├── .agents/agents/            # Giữ nguyên 7 AI Sub-agents (PM, BA, Curriculum, UIUX, Audio, Dev, QC)
├── index.html                 # Khung giao diện chính (chỉ đổi tên App & ?v=1)
├── css/
│   └── style.css              # Design System & Layout chuẩn Mobile/iPad
├── js/
│   ├── firebase-config.js     # Thay thông tin Firebase project mới
│   ├── audio-manifest.js      # Giữ nguyên hoặc build lại từ scripts/
│   ├── data.js                # [THAY MỚI 100%] Dữ liệu môn học, chặng, câu hỏi, bài đọc
│   └── app.js                 # [GIỮ NGUYÊN 90%] Chỉ chỉnh hằng số cấu hình (Quà, Chuỗi ngày, Avatar)
├── assets/                    # [THAY MỚI] Ảnh nền, đảo, bản đồ (<200KB) và icon quà (<50KB)
├── scripts/
│   ├── build-audio-sprite.sh  # Script đóng gói âm thanh
│   └── verify-release.sh      # Script kiểm tra cú pháp ES5 & dung lượng ảnh trước khi push
├── docs/                      # Tài liệu quản lý dự án & đặc tả học liệu
└── sources/                   # Nơi bỏ sách PDF/tài liệu gốc để AI trích xuất vào data.js
```

### Quy trình 4 bước Clone sang dự án mới trong 30 phút
1. **Bước 1 — Nhân bản khung (`5 phút`)**:
   - Copy toàn bộ thư mục dự án (trừ `.git/` và `sources/*`), chạy `git init`.
   - Đổi `STORAGE_KEY` trong `js/app.js` (ví dụ từ `"math_6yo_v8_profiles"` sang `"new_app_v1_profiles"`) và đường dẫn nhánh Firebase để không đụng dữ liệu dự án cũ.
2. **Bước 2 — Cấu hình Kinh tế & Phần thưởng (`5 phút`)**:
   - Chỉnh sửa 3 mảng hằng số ở đầu `js/app.js`:
     - `DEFAULT_REAL_REWARDS`: Danh sách quà đổi xu, giá xu và đường dẫn ảnh `assets/rw-*.jpg`.
     - `STREAK_MILESTONES`: Mốc thưởng chuỗi ngày (`3, 7, 14, 30` ngày).
     - `SHOP_ITEMS` & `AVATARS`: Danh hiệu và bộ avatar nhân vật.
3. **Bước 3 — Thay Đồ họa (`10 phút`)**:
   - Tạo/thay thế các file ảnh trong `assets/` giữ nguyên tên file (`bg-sky.jpg`, `island-*.jpg`, `treasure-map-*.jpg`, `rw-*.jpg`) và chạy lệnh nén:
     ```bash
     sips -Z 900 assets/treasure-map*.jpg
     sips -Z 400 assets/rw-*.jpg assets/island-*.jpg
     ```
4. **Bước 4 — Nạp Học liệu mới vào `js/data.js` (`10–20 phút`)**:
   - Bỏ tài liệu PDF/Word vào `sources/`, dùng đội ngũ Sub-agents (`research` song song) trích xuất **100% bài học** theo đúng schema `DATA` và `PASSAGES` trong `js/data.js`.

---

## 3. Post-Mortem: Các Issue/Risk Đã Gặp (v1 → v44) & Instructions Phòng Tránh

### Rủi ro 1: AI làm dữ liệu "đại diện / làm mẫu" thay vì nạp toàn bộ (Gặp ở v38 → v39 → v40)
* **Hiện tượng**: Khi yêu cầu nạp sách giáo khoa (83 bài), AI chỉ tạo 15–20 bài đại diện hoặc mỗi chặng chỉ có vài câu hỏi lặp lại.
* **Instruction phòng tránh tuyệt đối**:
  > **[RULE-DATA-01] Full Curriculum Extraction (Cấm làm mẫu đại diện)**: Khi trích xuất học liệu từ thư mục `sources/`, bắt buộc phải phân rã công việc cho các `research` subagents chạy song song theo từng cụm bài để nạp **100% toàn bộ bài học** ngay trong lần đầu tiên. Mỗi chặng (`stage`) phải có tối thiểu **12–15 câu hỏi đa dạng** được lấy trực tiếp từ các bài thuộc chặng đó. Trước khi báo cáo hoàn thành, phải chạy lệnh đếm số lượng bài và số câu hỏi để chứng minh độ phủ 100%.

### Rủi ro 2: Lỗi âm thanh Web Audio & Nút tắt loa không ăn (Gặp ở v16, v41, v43, v44)
* **Hiện tượng**:
  1. Bấm nút tắt loa (`.bgm-btn`) nhưng nhạc nền vẫn kêu (do các nốt nhạc đã được schedule trực tiếp vào `ctx.destination` hoặc do hàm `unlockAudio` bắt sự kiện `touchstart` toàn cục trên `document` tự động bật lại BGM ngay khi vừa chạm vào nút loa).
  2. Giọng đọc tiếng Việt (`speechSynthesis`) đọc sai các từ đơn như `"bè"` thành `"bờ e"`, hoặc bị chồng giọng khi bấm nhanh.
* **Instruction phòng tránh tuyệt đối**:
  > **[RULE-AUDIO-01] Dedicated BGM GainNode & Unlock Exclusion**:
  > 1. Toàn bộ nốt nhạc nền (BGM) bắt buộc phải đi qua một `Sound.bgmGain` (`GainNode`) riêng biệt thay vì nối thẳng vào `ctx.destination`. Khi gọi `stopBGM()`, phải lập tức hạ `bgmGain.gain.setValueAtTime(0, ctx.currentTime)` và `disconnect()` để ngắt âm thanh tức thì, đồng thời `clearTimeout(bgmTimer)` trước khi tạo timer mới.
  > 2. Hàm `unlockAudio` lắng nghe trên `document` bắt buộc phải kiểm tra `!isBgmBtnTarget(e.target)` và sự kiện tap của `.bgm-btn` phải có `e.stopPropagation()` để cú chạm vào nút Loa không bao giờ tự kích hoạt lại nhạc.
  > 3. Mọi lệnh đọc TTS phải đi qua bộ lọc từ điển phát âm `PHONETIC_FIX` và tăng biến đếm `ttsGeneration` để hủy các callback đọc cũ.

### Rủi ro 3: Lỗi cú pháp ES6 & Tràn RAM trên iPad đời cũ (iPadOS 12.5.8 / Safari 12) (Gặp ở v10, v33, v35)
* **Hiện tượng**: Sử dụng `const`, `let`, arrow function `=>`, template string `` ` `` hoặc ảnh PNG không nén làm Safari 12 báo lỗi cú pháp trắng trang hoặc văng trình duyệt do tràn bộ nhớ 1GB RAM.
* **Instruction phòng tránh tuyệt đối**:
  > **[RULE-TECH-01] Strict ES5 & Low-Memory Budget**:
  > 1. Chỉ sử dụng cú pháp **ES5 thuần** (`var`, `function(){}`, nối chuỗi bằng `+`) trong toàn bộ thư mục `js/`.
  > 2. Trước mọi lệnh `git commit`, bắt buộc chạy `./scripts/verify-release.sh`.
  > 3. Mọi hình ảnh đưa vào `assets/` phải chuyển sang `.jpg` và resize qua `sips`: ảnh bản đồ `<= 900px` (< 200KB), ảnh icon/quà `<= 400px` (< 50KB).

### Rủi ro 4: Dính Cache trình duyệt khiến cập nhật xong nhưng giao diện không đổi
* **Hiện tượng**: Đã sửa JS/CSS hoặc thay ảnh nhưng trên iPad/điện thoại vẫn hiện giao diện cũ hoặc ảnh cũ.
* **Instruction phòng tránh tuyệt đối**:
  > **[RULE-DEPLOY-01] Mandatory Cache Busting**: Mỗi lần chỉnh sửa bất kỳ file `.js`, `.css` hoặc ảnh trong `assets/`, bắt buộc phải tăng hậu tố version `?v=XX` trong `index.html` trước khi commit & push.

### Rủi ro 5: Thiết kế UI/UX rườm rà, thừa thao tác hoặc thiếu đồng bộ (Gặp ở v20 → v33, v41 → v43)
* **Hiện tượng**:
  - Vẽ đường nối SVG đè lệch lên đường gạch đá có sẵn trên ảnh bản đồ 3D (tốn 8 phiên bản từ v20 đến v28 mới bỏ hẳn đường vẽ SVG thừa).
  - Tạo quá nhiều phần tử gây rối mắt trên Topbar (đám mây trang trí, dải huy hiệu chồng chéo, nút loa tách rời không nằm trong khung trắng).
  - Đồng xu chỗ màu vàng chỗ màu xám; hộp thoại chọn chế độ chơi bắt bấm chọn rồi lại phải bấm nút "Chơi ngay" (2 chạm thay vì 1 chạm).
* **Instruction phòng tránh tuyệt đối**:
  > **[RULE-UX-01] Clean Kid-Friendly UI & 1-Tap Flow**:
  > 1. **1-Tap Direct Launch**: Trẻ chạm vào chế độ chơi hoặc chặng học là vào thẳng, không tạo nút "Bắt đầu / Chơi ngay" trung gian.
  > 2. **Không vẽ SVG đè lên ảnh 3D có sẵn đường đi**: Nếu ảnh nền bản đồ đã có đường đá/đường mòn 3D, chỉ đặt tọa độ các nút (`STAGE_COORDS`) nằm trên đường đó, không vẽ thêm đường nối SVG chồng lên.
  > 3. **Topbar gọn gàng, đồng nhất**: Gom các chỉ số (Sao, Xu vàng, Chuỗi ngày, Quà mục tiêu) và nút Loa tròn xanh/đỏ vào các khung thuốc (white pill) đồng bộ ở cả Trang chủ lẫn Bản đồ; không thêm sticker trang trí thừa (như đám mây) trên thanh điều hướng.
  > 4. **Đồng bộ biểu tượng tiền tệ**: Luôn dùng biểu tượng đồng xu tròn màu vàng thống nhất ở mọi màn hình.

### Rủi ro 6: Trẻ tự bấm hoàn thành để "cày xu" (Farming) hoặc tự đổi quà (Gặp ở v34, v35, v42)
* **Hiện tượng**: Ở phần Luyện đọc hoặc Đổi quà, nếu chỉ có nút bấm thông thường, trẻ sẽ bấm liên tục mà không cần đọc bài hoặc tự ý bấm đổi quà.
* **Instruction phòng tránh tuyệt đối**:
  > **[RULE-PEDAGOGY-01] Parental Gate & Anti-Farming**:
  > 1. Mọi hành động cần người lớn kiểm chứng (**"Bé đã đọc xong"**, **Duyệt đổi quà thật**, **Xóa hồ sơ**) bắt buộc phải đi qua popup **Cổng Phụ Huynh (`openParentGate`)** yêu cầu giải phép tính nhân ngẫu nhiên (ví dụ `6 × 7 = ?`).
  > 2. Các nhiệm vụ thưởng xu phải gắn cờ chống cày lặp lại vô hạn trong cùng một phiên/ngày.

---

## 4. Mẫu Prompt Khởi Tạo Dự Án Mới (Copy & Paste)

```markdown
Dự án này được clone từ bộ khung chuẩn KidsEdu (v44). Trước khi thực hiện yêu cầu, bắt buộc tuân thủ tuyệt đối các quy tắc trong `docs/00_PROJECT_BLUEPRINT_AND_PLAYBOOK.md`:
1. STRICT ES5 ONLY: Toàn bộ code trong `js/` chỉ dùng `var` và `function`, tuyệt đối không dùng `let`, `const`, `=>`, hoặc template literals. Luôn chạy `./scripts/verify-release.sh` kiểm tra sau khi sửa.
2. FULL DATA EXTRACTION: Khi nạp dữ liệu từ `sources/` vào `js/data.js`, phải trích xuất đầy đủ 100% bài học (dùng subagents chạy song song nếu tài liệu dài), tuyệt đối không làm dữ liệu đại diện/mẫu.
3. AUDIO & BGM SAFETY: Giữ nguyên kiến trúc `Sound.bgmGain` tách biệt để nút tắt loa (`.bgm-btn`) ngắt nhạc tức thì và `unlockAudio` không tự bật lại nhạc khi bấm vào nút loa.
4. ASSET OPTIMIZATION: Mọi hình ảnh thêm vào `assets/` phải chuyển sang `.jpg` và resize bằng `sips -Z 400` (icon < 50KB) hoặc `sips -Z 900` (map < 200KB).
5. PARENTAL GATE: Mọi tính năng xác nhận hoàn thành bài đọc, duyệt đổi quà thật, hoặc xóa hồ sơ đều phải qua `openParentGate()` (phép tính nhân).
6. CACHE BUSTING: Luôn tăng `?v=XX` trong `index.html` mỗi khi sửa JS/CSS/Assets.
```
