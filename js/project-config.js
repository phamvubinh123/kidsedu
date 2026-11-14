/* =========================================================
   CẤU HÌNH DỰ ÁN (PROJECT CONFIG) - Tách biệt khỏi Core Engine
   Khi clone sang dự án mới, chỉ cần chỉnh sửa file này + js/data.js + assets/
   CHỈ dùng cú pháp ES5 (var, function) để tương thích Safari iPad cũ.
   ========================================================= */
var PROJECT_CONFIG = {
  // 1. Định danh dự án & Bộ nhớ lưu trữ (Đổi storagePrefix khi tạo dự án mới để không trùng dữ liệu)
  appTitle: "Đảo Tri Thức",
  appVersion: "v51 (14/11/2026) · SGK: Kết Nối Tri Thức 2026 — Đảo Tri Thức: AI Tracking hành vi, đánh giá độ khó ZPD & Trợ lý AI Ba Mẹ.",
  storagePrefix: "vqtt",
  firebaseRoot: "kidsedu_vqtt",

  // 2. Hồ sơ mặc định ban đầu
  defaultProfileId: "hoanglong",
  defaultProfiles: [
    { id: "hoanglong", name: "HOÀNG LONG", avatar: "hero" }
  ],

  // 3. Cấu hình 4 Chế độ chơi & Phần thưởng xu mỗi ván
  modes: [
    { id: "quiz", name: "Phiến Đá Bí Ẩn", icon: "📜", reward: 10, desc: "Chọn đáp án đúng" },
    { id: "match", name: "Ghép Đôi Nhanh", icon: "🧩", reward: 15, desc: "Chạm nối cặp đúng" },
    { id: "memory", name: "Lật Thẻ Thần Kỳ", icon: "🃏", reward: 15, desc: "Tìm cặp giống nhau" },
    { id: "balloon", name: "Bóng Bay Tri Thức", icon: "🎈", reward: 20, desc: "Bắn bóng đáp án" }
  ],

  // 4. Hệ thống Huy hiệu & Cấp độ theo Tổng số Sao (tối đa 54 sao)
  badges: [
    { icon: "🌱", name: "Mầm Non", need: 4 },
    { icon: "🥉", name: "Huy Hiệu Đồng", need: 12 },
    { icon: "🥈", name: "Huy Hiệu Bạc", need: 22 },
    { icon: "🥇", name: "Huy Hiệu Vàng", need: 32 },
    { icon: "🏆", name: "Cúp Vô Địch", need: 42 },
    { icon: "👑", name: "Vua Tri Thức", need: 50 }
  ],
  levels: [
    "Mầm Non Chăm Chỉ",
    "Bé Ngoan Hiếu Học",
    "Ong Nhỏ Thông Thái",
    "Nhà Thám Hiểm Nhí",
    "Ngôi Sao Lớp 1",
    "Kiện Tướng Tri Thức",
    "Siêu Trí Tuệ Nhí"
  ],

  // 5. Cửa hàng Nhân vật (Tab 1)
  avatars: [
    { id: "hero", name: "Hiệp Sĩ Nhí", price: 0, img: "assets/mascot.jpg", emoji: "🛡️" },
    { id: "sword", name: "Hiệp Sĩ Kiếm Bạc", price: 20, emoji: "⚔️" },
    { id: "shield", name: "Hiệp Sĩ Khiên Vàng", price: 30, emoji: "🛡️" },
    { id: "archer", name: "Hiệp Sĩ Cung Thủ", price: 40, emoji: "🏹" },
    { id: "fire", name: "Hiệp Sĩ Lửa Đỏ", price: 50, emoji: "🔥" },
    { id: "ice", name: "Hiệp Sĩ Băng Giá", price: 60, emoji: "❄️" },
    { id: "thunder", name: "Hiệp Sĩ Sấm Sét", price: 80, emoji: "⚡" },
    { id: "ninja", name: "Hiệp Sĩ Bóng Đêm", price: 100, emoji: "🥷" },
    { id: "mecha", name: "Hiệp Sĩ Rô-Bốt", price: 120, emoji: "🤖" },
    { id: "mage", name: "Hiệp Sĩ Phép Thuật", price: 150, emoji: "🧙" },
    { id: "star", name: "Hiệp Sĩ Ánh Sao", price: 180, emoji: "🌟" },
    { id: "king", name: "Vua Hiệp Sĩ", price: 220, emoji: "👑" }
  ],

  // 6. Cửa hàng Đổi Quà Thật (Tab 2) & Quà mục tiêu mặc định
  defaultPinnedRewardId: "rw_icecream",
  realRewards: [
    { id: "rw_icecream", icon: "🍦", img: "assets/rw-icecream.jpg", name: "Kem / Bánh kẹo", cost: 150 },
    { id: "rw_swim", icon: "🏊", name: "Đi bơi / Chơi nhà banh", cost: 450 },
    { id: "rw_car", icon: "🏎️", img: "assets/rw-car.jpg", name: "Xe đồ chơi", cost: 600 },
    { id: "rw_watch", icon: "⌚", img: "assets/rw-watch.jpg", name: "Đồng hồ trẻ em", cost: 1000 }
  ],

  // 7. Mốc thưởng Chuỗi ngày học liên tiếp (Streak)
  streakMilestones: [
    { days: 3, coins: 15, label: "3 ngày liên tiếp" },
    { days: 7, coins: 45, label: "7 ngày chăm chỉ" },
    { days: 14, coins: 60, label: "14 ngày siêu sao" },
    { days: 30, coins: 120, label: "30 ngày quán quân" }
  ],

  // 8. Tọa độ các chặng (Nodes) trên ảnh bản đồ 3D của từng Đảo (%)
  mapPointsBySubj: {
    math: [
      { x: 60, y: 30 },
      { x: 24, y: 36, via: [[46, 29], [31, 31]] },
      { x: 38, y: 45.5 },
      { x: 75, y: 45.5 },
      { x: 62, y: 60.5 },
      { x: 25, y: 63, via: [[46, 58], [30, 59]] },
      { x: 51, y: 74, via: [[23, 68], [34, 72]] }
    ],
    viet: [
      { x: 43, y: 30 },
      { x: 62, y: 38, via: [[56, 32], [63, 35]] },
      { x: 30, y: 48, via: [[52, 41], [36, 43]] },
      { x: 53, y: 56, via: [[36, 52], [44, 54]] },
      { x: 69, y: 67, via: [[67, 58], [74, 63]] },
      { x: 49, y: 77, via: [[60, 71], [52, 74]] }
    ],
    eng: [
      { x: 50, y: 23 },
      { x: 31, y: 34, via: [[36, 26], [28, 30]] },
      { x: 69, y: 42, via: [[48, 36], [66, 38]] },
      { x: 24, y: 53, via: [[54, 45], [32, 47]] },
      { x: 59, y: 68, via: [[34, 57], [58, 59], [68, 63]] }
    ]
  },

  // 9. Lời khen & Động viên
  praiseMessages: [
    "Hoan hô! Tuyệt đỉnh luôn! 🎉",
    "Bé tính siêu quá! 🌟",
    "Thông minh tuyệt vời! 💯",
    "Bé gần mở được rương vàng rồi! 🏆",
    "Chính xác! Bé giỏi lắm! ✨",
    "Quá đỉnh! Thêm một ngôi sao nữa nè! ⭐",
    "Đúng rồi! Thỏ Trắng vỗ tay khen bé! 🐰👏",
    "Khè khè! Dũng sĩ nhỏ cừ khôi quá! 🐲🔥",
    "Chuẩn không cần chỉnh! Tuyệt vời! 👍",
    "Nhanh như chớp! Bé siêu thật đấy! ⚡",
    "Tuyệt lắm! Mảnh ngọc sáng lên rồi kìa! 💎",
    "Yeah! Mở rương kho báu thôi nào! 🎁"
  ],
  retryMessages: [
    "Suýt đúng rồi, bé thử lại lần nữa nhé! 💪",
    "Đừng lo, có Rồng Con ở đây cùng bạn! 🐲",
    "Ồ, mình nhìn kỹ lại một chút nào! 👀",
    "Gần trúng rồi đó! Chọn lại xem sao! ✨",
    "Không sao đâu, bé đếm chậm lại chút nhé! 🐢",
    "Cố lên nào Dũng Sĩ Tí Hon! 🌟",
    "Nghe lại câu hỏi cùng Thỏ Trắng nhé! 🐰"
  ]
};
