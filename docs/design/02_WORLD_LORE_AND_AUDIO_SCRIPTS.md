# THIẾT KẾ THẾ GIỚI QUAN, LINH VẬT & KỊCH BẢN ÂM THANH (WORLD LORE & AUDIO SCRIPTS)
**Dự án:** Vương Quốc Tri Thức (KidsEdu)  
**Vai trò phụ trách:** Narrative & Audio Experience Designer  
**Tài liệu tham chiếu:**  
- `docs/project_management/05_QUALITY_AND_TECHNICAL_STANDARDS.md` (Chuẩn ES5 Safari iOS 12.5.8, Audio Sprites < 30ms, Audio Context Unlock, câu lệnh < 4 giây)  
- `docs/curriculum/01_CURRICULUM_AND_PEDAGOGY_SPEC.md` (5 Quy tắc vàng CCI & Ma trận 3 môn Lớp 1)

---

## 1. THẾ GIỚI QUAN: VƯƠNG QUỐC TRI THỨC (WORLD-BUILDING)

### 1.1. Bối cảnh & Cốt truyện chính
Ngày xửa ngày xưa, trên bầu trời rực rỡ cầu vồng có một vùng đất diệu kỳ mang tên **Vương Quốc Tri Thức**. Nơi đây được thắp sáng bởi **Cây Ánh Sáng** và **3 Viên Ngọc Tri Thức** cổ đại:
1. **Ngọc Pha Lê Số (Sapphire Xanh Dương)** – Tỏa sáng trên **Đảo Số Học**, giúp muôn loài biết đếm, tính toán và xây dựng những ngôi nhà cân đối.
2. **Ngọc Hồng Âm Vần (Ruby Đỏ Ấm)** – Tỏa sáng trên **Đảo Tiếng Việt**, giúp cỏ cây và các bạn nhỏ biết ghép vần, đọc thơ và kể những câu chuyện hay.
3. **Ngọc Lục Bảo Giao Tiếp (Emerald Xanh Lá)** – Tỏa sáng trên **Đảo Tiếng Anh**, giúp các bạn nhỏ kết nối và trò chuyện vui vẻ với bạn bè khắp năm châu.

Một ngày nọ, **Cơn Gió Nghịch Ngợm** thổi qua vương quốc, khiến các Viên Ngọc Tri Thức tách thành hàng trăm **Mảnh Sao Lấp Lánh** và ngủ quên trên khắp 3 hòn đảo. Không có quái vật đáng sợ hay hình phạt nặng nề—các mảnh ngọc chỉ đang chờ một **"Dũng Sĩ Tí Hon"** (chính là bé!) đến đánh thức bằng sự tò mò, lòng dũng cảm và niềm vui học tập.

### 1.2. Hành trình qua 3 Hòn Đảo Học Tập
| Hòn Đảo | Màu sắc chủ đạo | Không gian & Bối cảnh | Mục tiêu thu thập | Nhân vật đồng hành & SGK |
|---|---|---|---|---|
| **1. Đảo Số Học** *(Toán 1)* | Xanh dương tươi & Vàng nắng | Thung lũng cầu vồng, cầu thăng bằng bắc qua suối, xưởng mộc kỳ lân và bãi biển kho báu. | Thu thập các **Mảnh Ngọc Pha Lê Số** & mở **Rương Vàng Toán Học**. | **Bé Rồng Lửa Tí Nị** + **Bạn Robot Thông Thái** *(SGK Toán 1)* |
| **2. Đảo Tiếng Việt** *(Tiếng Việt 1)* | Cam san hô & Đỏ ấm áp | Nhà ga xe lửa chữ cái, khu vườn âm vần, góc thám tử và sân khấu Karaoke thơ. | Đánh thức **Mảnh Ngọc Hồng Âm Vần** & thắp sáng **Đèn Lồng Chữ Việt**. | **Bé Thỏ Trắng Thông Thái** + **Hà & Nam** *(SGK Tiếng Việt 1)* |
| **3. Đảo Tiếng Anh** *(Global Success 1)* | Xanh ngọc & Tím mộng mơ | Sân chơi trường học, tiệm bánh cá khoai, khu vườn bí mật và sở thú vui nhộn. | Sưu tầm **Mảnh Ngọc Lục Bảo** & nhận **Huy Hiệu Phonics Vinh Quang**. | **Bé Rồng Lửa** + **Bé Thỏ Trắng** + **Phonic Phil & Super Sue** *(SGK Tiếng Anh 1)* |

### 1.3. Nhịp độ phiêu lưu (Micro-learning Loop)
Mỗi chặng phiêu lưu được thiết kế theo chu kỳ **3 - 5 phút** (Quy tắc vàng 3):
- **Bước 1 (Khởi hành):** Linh vật chào đón (< 4 giây), chạm nút bắt đầu (mở khóa AudioContext).
- **Bước 2 (Thử thách):** 3–5 tương tác ngắn (Visual Priming trước, giọng đọc ngắn sau, chỉ 2–3 lựa chọn to rõ).
- **Bước 3 (Ăn mừng):** Thu thập Sao/Mảnh Ngọc $\rightarrow$ mở Rương Vàng $\rightarrow$ lời khen ngẫu nhiên không trùng lặp.

---

## 2. HỒ SƠ LINH VẬT ĐỒNG HÀNH (MASCOTS) & TƯƠNG TÁC NHÂN VẬT SGK

### 2.1. Bé Rồng Lửa Tí Nị (Nino / Rồng Con)
- **Vai trò:** Người bạn cổ vũ dũng cảm, dẫn dắt các thử thách hành động, tính nhẩm và trò chơi phản xạ.
- **Ngoại hình gợi ý (tối ưu SVG/CSS trên iPad cũ):**
  - Chú rồng nhỏ tròn trịa, màu **cam rực rỡ (`#FF7A00`)** phối bụng **vàng kem (`#FFE082`)**, đôi cánh nhỏ xíu vỗ nhẹ (`transform: translate3d`), cặp sừng tròn an toàn và ngọn lửa nhỏ hình giọt nước trên đuôi.
  - Biểu cảm chính: *Hào hứng (nhảy cẫng)*, *Cổ vũ (giơ nắm đấm nhỏ)*, *Ngạc nhiên nhẹ khi bé chọn nhầm (nghiêng đầu gãi tai)*.
- **Tính cách & Phong cách giao tiếp:**
  - Năng động, ấm áp, thích thử thách, không bao giờ cáu gắt.
  - Câu cửa miệng: *"Khè khè, tuyệt quá!"*, *"Có Rồng Con đây rồi!"*, *"Thử lại chút xíu nào!"*.

### 2.2. Bé Thỏ Trắng Thông Thái (Mimi / Thỏ Kính)
- **Vai trò:** Người bạn hướng dẫn dịu dàng, giúp bé mẹo nhớ nhanh quy tắc chính tả, đánh vần chuẩn và phát âm Tiếng Anh rõ ràng.
- **Ngoại hình gợi ý:**
  - Cô thỏ trắng muốt (`#FFFDF9`), tai dài mềm màu hồng pastel (`#FFB3C6`), đeo **cặp kính tròn gọng xanh ngọc (`#00B4D8`)** hơi trễ xuống mũi rất ngộ nghĩnh, tay cầm cuốn sổ sao nhỏ.
  - Biểu cảm chính: *Hiền hòa (mỉm cười)*, *Gợi ý (chỉ tay lên kính)*, *Vỗ tay (khi bé đọc đúng)*.
- **Tính cách & Phong cách giao tiếp:**
  - Điềm tĩnh, kiên nhẫn, giọng nói truyền cảm, phát âm tròn vành rõ chữ.
  - Câu cửa miệng: *"Nhìn kỹ nhé bạn nhỏ!"*, *"Mẹo nhỏ nè!"*, *"Giỏi lắm luôn!"*.

### 2.3. Ma trận tương tác với Nhân vật SGK
| Nhân vật SGK | Xuất hiện tại | Cách phối hợp cùng Mascot |
|---|---|---|
| **Robot Thông Thái** *(Toán 1)* | Đảo Số Học | Robot đưa ra bài toán đếm/cộng trừ/lắp ghép; **Rồng Con** cổ vũ bé bấm chọn nhanh và ăn mừng khi xe Robot tăng tốc. |
| **Hà & Nam** *(Tiếng Việt 1)* | Đảo Tiếng Việt | Hà và Nam xuất hiện trong tranh minh họa tình huống (đi học, đi chợ, đọc thơ); **Thỏ Trắng** đóng vai cô giáo nhỏ hướng dẫn bé nối toa tàu chữ cái và tìm lỗi `c/k`, `g/gh`, `ng/ngh`. |
| **Phonic Phil & Super Sue** *(Global Success 1)* | Đảo Tiếng Anh | Phil & Sue nói mẫu câu tiếng Anh chuẩn bản ngữ (từ Audio Sprite); **Rồng Con** hoặc **Thỏ Trắng** gợi ý ngắn bằng tiếng Việt nếu bé cần trợ giúp (ví dụ: *"Chạm vào quả táo nhé!"*). |

---

## 3. KỊCH BẢN LỜI THOẠI & PHẢN HỒI TÍCH CỰC (VOICE PROMPT SCRIPTS)

> [!IMPORTANT]
> **Ràng buộc bộ nhớ làm việc (Working Memory Cap):** Tất cả lời thoại tiếng Việt bắt buộc **dưới 4 giây** (~6 đến 12 từ ở tốc độ đọc tự nhiên cho trẻ 6 tuổi), phát sau khi hình ảnh minh họa đã xuất hiện trên màn hình (**Visual Priming**).

### 3.1. Lời chào mở màn & Mở khóa Audio (< 4 giây)
| Cue ID | Ngữ cảnh | Nhân vật | Lời thoại chuẩn | Thời lượng mục tiêu |
|---|---|---|---|---|
| `vo_intro_unlock` | Màn hình chào ("Chạm để Bắt Đầu") | Rồng Con | *"Chào Dũng Sĩ Tí Hon! Chạm để phiêu lưu nào!"* | ~2.6s |
| `vo_intro_welcome` | Vào bản đồ 3 Hòn Đảo | Thỏ Trắng | *"Chào mừng bé đến Vương Quốc Tri Thức!"* | ~2.5s |
| `vo_island_math` | Chạm vào Đảo Số Học | Rồng Con | *"Đến Đảo Số Học thôi! Cùng đếm nào!"* | ~2.4s |
| `vo_island_vi` | Chạm vào Đảo Tiếng Việt | Thỏ Trắng | *"Đảo Tiếng Việt đây rồi! Mình cùng ghép vần nhé!"* | ~2.8s |
| `vo_island_en` | Chạm vào Đảo Tiếng Anh | Phil & Sue | *"Hello! Let's play on English Island!"* | ~2.5s |

### 3.2. Kho 12 Câu Khen Ngợi Ngẫu Nhiên (Khi trả lời đúng)
Hệ thống chọn ngẫu nhiên không lặp lại liên tiếp để giữ sự hào hứng cho trẻ:

| Cue ID | Nhân vật | Lời thoại khen thưởng | Thời lượng |
|---|---|---|---|
| `vo_win_01` | Rồng Con | *"Hoan hô! Tuyệt đỉnh luôn!"* | ~1.8s |
| `vo_win_02` | Rồng Con | *"Bé tính siêu quá!"* | ~1.5s |
| `vo_win_03` | Thỏ Trắng | *"Thông minh tuyệt vời!"* | ~1.6s |
| `vo_win_04` | Rồng Con | *"Bé gần mở được rương vàng rồi!"* | ~2.2s |
| `vo_win_05` | Thỏ Trắng | *"Chính xác! Bé giỏi lắm!"* | ~1.8s |
| `vo_win_06` | Rồng Con | *"Quá đỉnh! Thêm một ngôi sao nữa nè!"* | ~2.3s |
| `vo_win_07` | Thỏ Trắng | *"Đúng rồi! Thỏ Trắng vỗ tay khen bé!"* | ~2.4s |
| `vo_win_08` | Rồng Con | *"Khè khè! Dũng sĩ nhỏ cừ khôi quá!"* | ~2.3s |
| `vo_win_09` | Thỏ Trắng | *"Chuẩn không cần chỉnh! Tuyệt vời!"* | ~2.1s |
| `vo_win_10` | Rồng Con | *"Nhanh như chớp! Bé siêu thật đấy!"* | ~2.2s |
| `vo_win_11` | Thỏ Trắng | *"Tuyệt lắm! Mảnh ngọc sáng lên rồi kìa!"* | ~2.5s |
| `vo_win_12` | Rồng Con + Thỏ | *"Yeah! Mở rương kho báu thôi nào!"* *(Khi hoàn thành màn)* | ~2.2s |

### 3.3. Kho 7 Câu Khích Lệ Dịu Dàng (Khi chọn nhầm - No Harsh Punishment)
Tuyệt đối **không dùng** từ ngữ phủ định nặng nề ("Sai rồi!", "Không được!"), phát kèm âm thanh `sfx_gentle_oops` êm ái:

| Cue ID | Nhân vật | Lời thoại khích lệ | Thời lượng |
|---|---|---|---|
| `vo_try_01` | Thỏ Trắng | *"Suýt đúng rồi, bé thử lại lần nữa nhé!"* | ~2.5s |
| `vo_try_02` | Rồng Con | *"Đừng lo, có Rồng Con ở đây cùng bạn!"* | ~2.4s |
| `vo_try_03` | Thỏ Trắng | *"Ồ, mình nhìn kỹ lại một chút nào!"* | ~2.2s |
| `vo_try_04` | Rồng Con | *"Gần trúng rồi đó! Chọn lại xem sao!"* | ~2.3s |
| `vo_try_05` | Thỏ Trắng | *"Không sao đâu, bé đếm chậm lại chút nhé!"* | ~2.5s |
| `vo_try_06` | Rồng Con | *"Cố lên nào Dũng Sĩ Tí Hon!"* | ~2.0s |
| `vo_try_07` | Thỏ Trắng | *"Nghe lại câu hỏi cùng Thỏ Trắng nhé!"* | ~2.3s |

### 3.4. Câu Dẫn Ngắn Gọn Cho Minigame (Visual Priming < 4 giây)
| Cue ID | Minigame & Hòn Đảo | Câu dẫn âm thanh | Thời lượng |
|---|---|---|---|
| `vo_cmd_math_count` | Đếm hình nhận ngọc (Toán) | *"Bé đếm xem có mấy quả trên cây nào?"* | ~2.4s |
| `vo_cmd_math_compare` | Cầu thăng bằng (Toán) | *"Chọn dấu đúng để bắc cầu qua suối nhé!"* | ~2.5s |
| `vo_cmd_math_split` | Khu vườn Tách - Gộp (Toán) | *"Gộp hai giỏ táo lại xem được mấy quả?"* | ~2.5s |
| `vo_cmd_math_shape` | Lật thẻ / Xếp hình (Toán) | *"Tìm hình giống với đồ vật này nhé!"* | ~2.3s |
| `vo_cmd_math_pos` | Tìm kho báu vị trí (Toán) | *"Chạm vào chiếc rương ở bên phải nhé!"* | ~2.3s |
| `vo_cmd_vi_train` | Nối toa tàu chữ cái (TV) | *"Chạm chữ cái để ghép thành tiếng mới nào!"* | ~2.6s |
| `vo_cmd_vi_spell` | Thám tử C/K, G/GH, NG/NGH (TV) | *"Chọn chữ đúng để giúp bạn Hà nhé!"* | ~2.3s |
| `vo_cmd_vi_poem` | Karaoke Đọc Thơ (TV) | *"Bé đọc to theo chữ sáng lên nhé!"* | ~2.3s |
| `vo_cmd_en_tap` | Chạm từ vựng / Đồ ăn (TA) | *"Listen and tap! Nghe và chạm hình đúng nhé!"* | ~2.8s |
| `vo_cmd_en_tpr` | Simon Says TPR (TA) | *"Touch your head! Chạm vào đầu nào!"* | ~2.5s |

---

## 4. BẢNG QUY HOẠCH AUDIO SPRITES (AUDIO CUE SHEET & PRODUCTION SPEC)

### 4.1. Thông số kỹ thuật nén & Tối ưu cho iOS 12.5.8
- **Định dạng chính:** `.mp3` (tương thích 100% Web Audio API & `<audio>` trên Safari iOS 12.5.8) hoặc `.m4a` (AAC-LC).
- **Thông số mã hóa mục tiêu:**
  - **Bitrate:** `32 kbps` (CBR hoặc VBR nhẹ).
  - **Kênh (Channels):** `Mono` (giảm 50% dung lượng so với Stereo mà vẫn rõ nét trên loa iPad).
  - **Sample Rate:** `22,050 Hz` (hoặc `24,000 Hz`).
  - **Khoảng lặng đệm (Padding):** `50 ms` giữa các cue trong cùng 1 Audio Sprite để tránh tràn tiếng (bleeding) khi giải mã MP3 trên iOS.
- **Ngân sách dung lượng (Size Budget):**
  - Mỗi hiệu ứng SFX đơn lẻ: **< 15–50 KB**.
  - Gói **Core Audio Sprite** (`core_sprite.mp3` gồm toàn bộ SFX + Lời chào + 12 câu khen + 7 câu khích lệ + 10 câu dẫn minigame, tổng thời lượng ~78 giây @ 32kbps mono): **~312 KB** (**đạt chuẩn < 500 KB**).
  - Nhạc nền BGM (`bgm_kingdom_loop.mp3`, loop 30 giây @ 32kbps mono): **~120 KB**.
  - **Tổng gói âm thanh lõi tải ban đầu:** **~432 KB (< 500 KB)**.

### 4.2. Danh mục Sound FX (SFX) & Nhạc nền (BGM)
| Cue ID | Tên hiệu ứng | Mô tả âm sắc thiết kế | Thời lượng | Dung lượng ước tính |
|---|---|---|---|---|
| `sfx_unlock` | Silent Unlock | Buffer im lặng 0.05s mở khóa AudioContext iOS | `50 ms` | < 1 KB |
| `sfx_tap` | Chạm nút (`tap`) | Tiếng giọt nước gỗ tròn ấm (marimba/woodblock nhẹ) | `120 ms` | ~4 KB |
| `sfx_pop` | Nảy bong bóng (`pop`) | Tiếng "bụp" vui tai khi chọn vật thể / hiện ngôi sao | `180 ms` | ~6 KB |
| `sfx_win_fanfare` | Chiến thắng (`win_fanfare`) | Hợp âm chuông glockenspiel + kèn nhỏ vui tươi (C-E-G-C) | `1,400 ms` | ~22 KB |
| `sfx_gentle_oops` | Nhầm nhẹ (`gentle_oops`) | Hai nốt marimba đi xuống nhẹ nhàng ("boing-boop" êm), **không rè/chói** | `450 ms` | ~10 KB |
| `sfx_chest_open` | Mở rương (`chest_open`) | Tiếng cọt kẹt gỗ nhẹ + chuỗi chuông lấp lánh | `1,200 ms` | ~20 KB |
| `sfx_coin_drop` | Rơi ngọc/xu (`coin_drop`) | Tiếng leng keng pha lê trong trẻo | `350 ms` | ~8 KB |
| `bgm_kingdom_loop` | Nhạc nền vương quốc | Giai điệu Pizzicato + Flute êm dịu, nhịp 90 BPM, dải tần cắt bớt vùng 1kHz–3kHz để nhường chỗ cho giọng đọc; tự động giảm âm lượng (ducking xuống `0.15`) khi phát Voice Prompt. | `30,000 ms` (Seamless Loop) | ~120 KB |

### 4.3. Cấu trúc Audio Sprite Map chuẩn ES5 (Tương thích Safari iOS 12.5.8)

```javascript
/* js/audio-manifest.js - Chuan ES5 cho Safari iOS 12.5.8 */
var AUDIO_SPRITE_CONFIG = {
  src: 'assets/audio/core_sprite.mp3',
  codec: 'mp3',
  bitrateKbps: 32,
  channels: 1,
  sampleRate: 22050,
  sprite: {
    /* Sound Effects (SFX) */
    sfx_unlock:      { start: 0.00,  duration: 0.05 },
    sfx_tap:         { start: 0.15,  duration: 0.12 },
    sfx_pop:         { start: 0.35,  duration: 0.18 },
    sfx_gentle_oops: { start: 0.60,  duration: 0.45 },
    sfx_coin_drop:   { start: 1.15,  duration: 0.35 },
    sfx_chest_open:  { start: 1.60,  duration: 1.20 },
    sfx_win_fanfare: { start: 2.90,  duration: 1.40 },

    /* Lời chào & Điều hướng (< 4s) */
    vo_intro_unlock:  { start: 4.40,  duration: 2.60 },
    vo_intro_welcome: { start: 7.10,  duration: 2.50 },
    vo_island_math:   { start: 9.70,  duration: 2.40 },
    vo_island_vi:     { start: 12.20, duration: 2.80 },
    vo_island_en:     { start: 15.10, duration: 2.50 },

    /* Khen ngợi ngẫu nhiên (12 câu) */
    vo_win_01: { start: 17.70, duration: 1.80 },
    vo_win_02: { start: 19.60, duration: 1.50 },
    vo_win_03: { start: 21.20, duration: 1.60 },
    vo_win_04: { start: 22.90, duration: 2.20 },
    vo_win_05: { start: 25.20, duration: 1.80 },
    vo_win_06: { start: 27.10, duration: 2.30 },
    vo_win_07: { start: 29.50, duration: 2.40 },
    vo_win_08: { start: 32.00, duration: 2.30 },
    vo_win_09: { start: 34.40, duration: 2.10 },
    vo_win_10: { start: 36.60, duration: 2.20 },
    vo_win_11: { start: 38.90, duration: 2.50 },
    vo_win_12: { start: 41.50, duration: 2.20 },

    /* Khích lệ dịu dàng (7 câu) */
    vo_try_01: { start: 43.80, duration: 2.50 },
    vo_try_02: { start: 46.40, duration: 2.40 },
    vo_try_03: { start: 48.90, duration: 2.20 },
    vo_try_04: { start: 51.20, duration: 2.30 },
    vo_try_05: { start: 53.60, duration: 2.50 },
    vo_try_06: { start: 56.20, duration: 2.00 },
    vo_try_07: { start: 58.30, duration: 2.30 }
  }
};

/* Quy trình Audio Context Unlock & Phát < 30ms trên iOS 12.5.8 */
function unlockAudioContext(audioCtx) {
  if (!audioCtx) { return; }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  var buffer = audioCtx.createBuffer(1, 1, 22050);
  var source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  if (typeof source.start === 'function') {
    source.start(0);
  } else {
    source.noteOn(0);
  }
}
```

### 4.4. Quy trình sản xuất & Kiểm thử âm thanh (Audio QA Checklist)
1. **Chuẩn hóa âm lượng (Loudness Normalization):** Tất cả giọng đọc đặt ở `-16 LUFS` (Peak `-1.5 dBTP`), SFX ở `-20 LUFS`, BGM ở `-28 LUFS` để bé nghe rõ lời hướng dẫn mà không bị giật mình.
2. **Đóng gói Audio Sprite:** Sử dụng `ffmpeg` hoặc `audiosprite` với khoảng nghỉ `50ms` và xuất kèm file JSON/JS map chuẩn ES5.
3. **Kiểm thử thực tế trên iPad iOS 12.5.8:**
   - Kiểm tra nút "Chạm để Bắt Đầu" mở khóa âm thanh thành công ngay lần chạm đầu tiên (`touchstart`).
   - Đo độ trễ phản hồi `sfx_tap` < 30ms khi chạm nhanh liên tục.
   - Đảm bảo không rò rỉ bộ nhớ (RAM tab < 150MB) khi chuyển qua lại giữa 3 hòn đảo.
