# NGÂN HÀNG CÂU HỎI TƯƠNG TÁC CHUẨN SGK LỚP 1 (TÁI BẢN 2026)
**Dự án:** Vương Quốc Tri Thức (KidsEdu)  
**Tiêu chuẩn áp dụng:** PMI PMBOK - Elicit and Analyze Requirements & RTM Baseline  
**Thẩm định học thuật:** Early Childhood Curriculum Specialist & EdTech BA  
**Nguồn ngữ liệu:** 3 cuốn SGK 2026 (`sources/`): Toán 1, Tiếng Việt 1, Tiếng Anh 1 (Global Success)  

---

## 1. NGUYÊN TẮC CẤU TRÚC DỮ LIỆU CÂU HỎI (DATA SCHEMA)
Để đảm bảo vận hành mượt mà trên trình duyệt cũ (Safari iPad iOS 12.5.8), toàn bộ ngân hàng câu hỏi tuân thủ cấu trúc Object chuẩn JavaScript ES5:

```javascript
{
  id: "M-01-01",              // Mã truy vết RTM
  subject: "math",           // "math" | "vietnamese" | "english"
  topic: "Tên chủ đề / Unit SGK",
  gameType: "count",         // "count" | "memory" | "quiz" | "bubble" | "balance" | "match"
  audioPrompt: "Câu dẫn giọng đọc ấm áp cho bé",
  displayContent: "Biểu tượng trực quan, phép tính hoặc hình ảnh",
  options: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
  correctAnswer: "Đáp án đúng",
  explanation: "Lời giải thích khích lệ sau khi hoàn thành",
  starsReward: 10            // Số sao thưởng
}
```

---

## 2. PHÂN HỆ TOÁN 1 (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG - 116 TRANG)
*Linh vật đồng hành: **Bạn Robot Thông Thái***

### Chủ đề 1: Các số từ 0 đến 10 & So sánh (Bài 1 - Bài 6)
```javascript
// MATH SET 1: Đếm số lượng trực quan 1-10
{
  id: "MATH-01",
  subject: "math",
  topic: "Chủ đề 1: Các số 0 đến 10",
  gameType: "count",
  audioPrompt: "Bé hãy đếm xem có mấy chú ong vàng chăm chỉ đang bay nhé?",
  displayContent: "🐝🐝🐝",
  options: ["2", "3", "4", "5"],
  correctAnswer: "3",
  explanation: "Hoan hô! Có 1, 2, 3 chú ong vàng!",
  starsReward: 10
},
{
  id: "MATH-02",
  subject: "math",
  topic: "Chủ đề 1: Các số 0 đến 10",
  gameType: "count",
  audioPrompt: "Trong giỏ của bạn Gấu có bao nhiêu quả táo đỏ mọng nào?",
  displayContent: "🍎🍎🍎🍎🍎",
  options: ["3", "4", "5", "6"],
  correctAnswer: "5",
  explanation: "Chính xác! Có đúng 5 quả táo đỏ!",
  starsReward: 10
},
{
  id: "MATH-03",
  subject: "math",
  topic: "Chủ đề 1: Các số 0 đến 10",
  gameType: "count",
  audioPrompt: "Bé đếm giúp bạn Thỏ xem có bao nhiêu củ cà rốt giòn ngọt?",
  displayContent: "🥕🥕🥕🥕🥕🥕🥕",
  options: ["5", "6", "7", "8"],
  correctAnswer: "7",
  explanation: "Tuyệt đỉnh! Có tất cả 7 củ cà rốt!",
  starsReward: 10
},
{
  id: "MATH-04",
  subject: "math",
  topic: "Chủ đề 1: Các số 0 đến 10",
  gameType: "count",
  audioPrompt: "Có bao nhiêu chú gà con lông vàng óng đang dạo chơi?",
  displayContent: "🐥🐥🐥🐥🐥🐥🐥🐥🐥🐥",
  options: ["8", "9", "10", "7"],
  correctAnswer: "10",
  explanation: "Siêu quá! Có tròn 10 chú gà con!",
  starsReward: 10
},

// MATH SET 2: So sánh số lượng & Dấu >, <, =
{
  id: "MATH-05",
  subject: "math",
  topic: "Chủ đề 1: So sánh số",
  gameType: "balance",
  audioPrompt: "Bên trái có 5 quả cam, bên phải có 3 quả cam. Bé chọn dấu nào để cầu thăng bằng?",
  displayContent: "5 [ ? ] 3",
  options: [">", "<", "="],
  correctAnswer: ">",
  explanation: "Chuẩn xác! 5 quả cam nhiều hơn 3 quả cam: 5 lớn hơn 3!",
  starsReward: 10
},
{
  id: "MATH-06",
  subject: "math",
  topic: "Chủ đề 1: So sánh số",
  gameType: "balance",
  audioPrompt: "Bên trái có 4 chú cá, bên phải có 7 chú cá. Bé điền dấu gì nào?",
  displayContent: "4 [ ? ] 7",
  options: [">", "<", "="],
  correctAnswer: "<",
  explanation: "Rất giỏi! 4 chú cá ít hơn 7 chú cá: 4 bé hơn 7!",
  starsReward: 10
},
{
  id: "MATH-07",
  subject: "math",
  topic: "Chủ đề 1: So sánh số",
  gameType: "balance",
  audioPrompt: "Bên trái có 6 bông hoa, bên phải cũng có 6 bông hoa. Bé chọn dấu nào?",
  displayContent: "6 [ ? ] 6",
  options: [">", "<", "="],
  correctAnswer: "=",
  explanation: "Hoan hô! Hai bên bằng nhau: 6 bằng 6!",
  starsReward: 10
},

// MATH SET 3: Tách - Gộp số "Mấy và mấy" (Bài 5 SGK)
{
  id: "MATH-08",
  subject: "math",
  topic: "Chủ đề 1: Tách gộp số",
  gameType: "quiz",
  audioPrompt: "Bạn Robot hỏi: 4 gồm 3 và mấy nào bé?",
  displayContent: "4 gồm 3 và [ ? ]",
  options: ["1", "2", "3", "0"],
  correctAnswer: "1",
  explanation: "Đúng rồi! 4 gồm 3 và 1; gộp 3 và 1 được 4!",
  starsReward: 10
},
{
  id: "MATH-09",
  subject: "math",
  topic: "Chủ đề 1: Tách gộp số",
  gameType: "quiz",
  audioPrompt: "3 và 2 gộp lại được mấy quả dâu tây?",
  displayContent: "🍓🍓🍓 + 🍓🍓 = [ ? ]",
  options: ["4", "5", "6", "3"],
  correctAnswer: "5",
  explanation: "Thông minh lắm! 3 và 2 gộp lại được 5!",
  starsReward: 10
}
```

### Chủ đề 2 & 4: Hình phẳng và Hình khối thực tế (Bài 7 - 9 & Bài 14 - 16)
```javascript
{
  id: "MATH-10",
  subject: "math",
  topic: "Chủ đề 2: Hình phẳng",
  gameType: "quiz",
  audioPrompt: "Chiếc bánh chưng ngày Tết của bé có dạng hình gì?",
  displayContent: "🟩 Bánh chưng",
  options: ["Hình vuông", "Hình tròn", "Hình tam giác", "Hình chữ nhật"],
  correctAnswer: "Hình vuông",
  explanation: "Đúng rồi! Bánh chưng xanh vuông vắn mang dạng hình vuông!",
  starsReward: 10
},
{
  id: "MATH-11",
  subject: "math",
  topic: "Chủ đề 2: Hình phẳng",
  gameType: "quiz",
  audioPrompt: "Mặt chiếc đồng hồ treo tường hoặc ông mặt trời có dạng hình gì?",
  displayContent: "🟡 Mặt trời rực rỡ",
  options: ["Hình tam giác", "Hình tròn", "Hình vuông", "Hình chữ nhật"],
  correctAnswer: "Hình tròn",
  explanation: "Chuẩn xác! Ông mặt trời tròn xoe mang dạng hình tròn!",
  starsReward: 10
},
{
  id: "MATH-12",
  subject: "math",
  topic: "Chủ đề 4: Hình khối thực tế",
  gameType: "quiz",
  audioPrompt: "Hộp quà sinh nhật hoặc khối xúc xắc đổ xí ngầu có dạng khối gì?",
  displayContent: "🎲 Xúc xắc",
  options: ["Khối lập phương", "Khối hộp chữ nhật", "Hình tròn", "Hình tam giác"],
  correctAnswer: "Khối lập phương",
  explanation: "Hoan hô! Viên xúc xắc có 6 mặt vuông bằng nhau là khối lập phương!",
  starsReward: 10
},
{
  id: "MATH-13",
  subject: "math",
  topic: "Chủ đề 4: Hình khối thực tế",
  gameType: "quiz",
  audioPrompt: "Hộp sữa chua, bao diêm hoặc viên gạch xây nhà có dạng khối gì?",
  displayContent: "🧱 Hộp sữa / Viên gạch",
  options: ["Khối lập phương", "Khối hộp chữ nhật", "Hình vuông", "Hình chữ nhật"],
  correctAnswer: "Khối hộp chữ nhật",
  explanation: "Đúng rồi! Hộp sữa dài có dạng khối hộp chữ nhật!",
  starsReward: 10
}
```

### Chủ đề 3: Phép cộng và Phép trừ trong phạm vi 10 (Bài 10 - Bài 13)
```javascript
{
  id: "MATH-14",
  subject: "math",
  topic: "Chủ đề 3: Phép cộng phạm vi 10",
  gameType: "bubble",
  audioPrompt: "Trên cành có 2 chú chim, có thêm 3 chú chim bay tới đậu cùng. Có tất cả mấy chú chim?",
  displayContent: "2 + 3 = ?",
  options: ["4", "5", "6", "7"],
  correctAnswer: "5",
  explanation: "Tuyệt vời! 2 thêm 3 bằng 5: 2 + 3 = 5!",
  starsReward: 10
},
{
  id: "MATH-15",
  subject: "math",
  topic: "Chủ đề 3: Phép trừ phạm vi 10",
  gameType: "bubble",
  audioPrompt: "Trong đĩa có 6 quả chuối, bạn Khỉ đã ăn mất 2 quả. Còn lại mấy quả chuối?",
  displayContent: "6 - 2 = ?",
  options: ["3", "4", "5", "2"],
  correctAnswer: "4",
  explanation: "Chính xác! 6 bớt 2 còn 4: 6 - 2 = 4!",
  starsReward: 10
},
{
  id: "MATH-16",
  subject: "math",
  topic: "Chủ đề 3: Phép cộng trừ phạm vi 10",
  gameType: "bubble",
  audioPrompt: "Bé tính nhẩm giúp Robot: 7 cộng 0 bằng mấy?",
  displayContent: "7 + 0 = ?",
  options: ["0", "7", "8", "6"],
  correctAnswer: "7",
  explanation: "Thông minh lắm! Số nào cộng với 0 cũng bằng chính số đó: 7 + 0 = 7!",
  starsReward: 10
},
{
  id: "MATH-17",
  subject: "math",
  topic: "Chủ đề 3: Phép cộng trừ phạm vi 10",
  gameType: "bubble",
  audioPrompt: "Bé ơi: 5 trừ đi 5 bằng mấy?",
  displayContent: "5 - 5 = ?",
  options: ["0", "1", "5", "10"],
  correctAnswer: "0",
  explanation: "Tuyệt đỉnh! Hai số giống nhau trừ nhau bằng 0: 5 - 5 = 0!",
  starsReward: 10
}
```

---

## 3. PHÂN HỆ TIẾNG VIỆT 1 (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG - 186 TRANG)
*Nhân vật đồng hành: **Bạn Hà & Bạn Nam***

### Giai đoạn 1: Chữ cái, Dấu thanh & Âm ghép (Bài 1 - Bài 30)
```javascript
{
  id: "TV-01",
  subject: "vietnamese",
  topic: "Bài 1: Chữ a, b & Dấu thanh",
  gameType: "quiz",
  audioPrompt: "Bé hãy tìm chữ B trong các chữ sau đây nhé!",
  displayContent: "B",
  options: ["a", "b", "c", "d"],
  correctAnswer: "b",
  explanation: "Đúng rồi! Đây là chữ B (bê) trong từ 'ba' và 'bóng'!",
  starsReward: 10
},
{
  id: "TV-02",
  subject: "vietnamese",
  topic: "Bài 1: Ghép âm & Thanh điệu",
  gameType: "match",
  audioPrompt: "Âm B ghép với âm A và thêm dấu Sắc, ta được tiếng gì?",
  displayContent: "b + a + / = ?",
  options: ["ba", "bà", "bá", "bả"],
  correctAnswer: "bá",
  explanation: "Hoan hô! Bờ - a - ba - sắc - bá!",
  starsReward: 10
},
{
  id: "TV-03",
  subject: "vietnamese",
  topic: "Bài 2: 5 Dấu Thanh Tiếng Việt",
  gameType: "quiz",
  audioPrompt: "Tiếng 'MẸ' mang dấu thanh gì trong 5 dấu thanh tiếng Việt?",
  displayContent: "m + e + [ . ] = mẹ",
  options: ["Dấu ngã", "Dấu nặng", "Dấu hỏi", "Dấu sắc"],
  correctAnswer: "Dấu nặng",
  explanation: "Chính xác! Tiếng 'mẹ' mang dấu nặng đặt dưới con chữ e!",
  starsReward: 10
},
{
  id: "TV-04",
  subject: "vietnamese",
  topic: "Bài 29: Quy tắc chính tả C/K",
  gameType: "quiz",
  audioPrompt: "Đứng trước chữ i, e, ê, ta phải viết là chữ C hay chữ K?",
  displayContent: "[ ? ]ính mắt",
  options: ["c", "k", "q", "ch"],
  correctAnswer: "k",
  explanation: "Đúng rồi! Chữ K luôn đi cùng i, e, ê: kính mắt, cái kéo, quả kê!",
  starsReward: 10
},
{
  id: "TV-05",
  subject: "vietnamese",
  topic: "Bài 29: Quy tắc chính tả G/GH",
  gameType: "quiz",
  audioPrompt: "Từ 'cái ghế' thì chữ 'ghế' viết bằng chữ G đơn hay GH kép?",
  displayContent: "cái [ ? ]ế gỗ",
  options: ["g", "gh", "k", "ng"],
  correctAnswer: "gh",
  explanation: "Tuyệt vời! Đứng trước chữ ê phải viết là GH: cái ghế gỗ!",
  starsReward: 10
},
{
  id: "TV-06",
  subject: "vietnamese",
  topic: "Âm ghép: CH, KH, NH, TH",
  gameType: "match",
  audioPrompt: "Tiếng nào sau đây chứa âm ghép 'NH' (nhờ)?",
  displayContent: "Âm ghép: NH",
  options: ["nhà gỗ", "chú bé", "khỉ con", "thỏ trắng"],
  correctAnswer: "nhà gỗ",
  explanation: "Chuẩn xác! 'Nhà gỗ' bắt đầu bằng âm ghép NH!",
  starsReward: 10
}
```

### Giai đoạn 2: Hệ thống Vần có âm cuối & Từ ứng dụng (Bài 31 - Bài 80)
```javascript
{
  id: "TV-07",
  subject: "vietnamese",
  topic: "Vần có âm cuối N: an, ăn, ân",
  gameType: "quiz",
  audioPrompt: "Từ 'khăn quàng' chứa vần gì bé ơi?",
  displayContent: "🧣 chiếc khăn",
  options: ["an", "ăn", "ân", "on"],
  correctAnswer: "ăn",
  explanation: "Rất giỏi! Khờ - ăn - khăn: chứa vần ăn!",
  starsReward: 10
},
{
  id: "TV-08",
  subject: "vietnamese",
  topic: "Vần có âm cuối M: am, om, em",
  gameType: "quiz",
  audioPrompt: "Chú ong vàng thích mật hoa, từ 'con ong' chứa vần gì nào?",
  displayContent: "🐝 con ong",
  options: ["ong", "ông", "ung", "ăng"],
  correctAnswer: "ong",
  explanation: "Đúng rồi! O - ngờ - ong, cờ - ong - cong, o - ngờ - ong!",
  starsReward: 10
},
{
  id: "TV-09",
  subject: "vietnamese",
  topic: "Lật thẻ Memory Từ vựng & Hình ảnh",
  gameType: "memory",
  audioPrompt: "Bé hãy lật tìm các cặp thẻ từ ngữ và hình ảnh tương ứng nhé!",
  displayContent: "Lật thẻ Tiếng Việt",
  pairs: [
    { text: "Cá vàng", match: "🐟" },
    { text: "Quả táo", match: "🍎" },
    { text: "Bé thỏ", match: "🐰" },
    { text: "Quyển vở", match: "📖" }
  ],
  explanation: "Hoan hô! Bé đã ghép đôi từ ngữ và hình ảnh xuất sắc!",
  starsReward: 15
}
```

---

## 4. PHÂN HỆ TIẾNG ANH 1 (GLOBAL SUCCESS - MACMILLAN - 78 TRANG)
*Nhân vật đồng hành: **Phonic Phil & Super Sue***

### Units 1 - 4: Chào hỏi, Bàn tiệc, Đi chợ, Phòng ngủ
```javascript
{
  id: "ENG-01",
  subject: "english",
  topic: "Unit 1: In the school playground (Bb)",
  gameType: "quiz",
  audioPrompt: "Which word starts with letter B?",
  displayContent: "Letter Bb /b/",
  options: ["ball", "cat", "apple", "dog"],
  correctAnswer: "ball",
  explanation: "Great job! B is for ball, bike, book and Bill!",
  starsReward: 10
},
{
  id: "ENG-02",
  subject: "english",
  topic: "Unit 1: In the school playground",
  gameType: "match",
  audioPrompt: "Khi gặp bạn Bill, chúng ta chào bạn bằng tiếng Anh như thế nào?",
  displayContent: "👋 Say hello to Bill",
  options: ["Hi, I'm Bill.", "Goodbye, Bill.", "Thank you.", "I have a car."],
  correctAnswer: "Hi, I'm Bill.",
  explanation: "Awesome! 'Hi, I'm Bill!' nghĩa là 'Chào bạn, tớ là Bill!'",
  starsReward: 10
},
{
  id: "ENG-03",
  subject: "english",
  topic: "Unit 2: In the dining room (Cc)",
  gameType: "quiz",
  audioPrompt: "What is this? Con mèo kêu meo meo trong tiếng Anh đọc là gì?",
  displayContent: "🐱 Cat",
  options: ["cat", "car", "cake", "cup"],
  correctAnswer: "cat",
  explanation: "Super! C is for Cat: /k/ - cat!",
  starsReward: 10
},
{
  id: "ENG-04",
  subject: "english",
  topic: "Unit 3: At the street market (Aa)",
  gameType: "quiz",
  audioPrompt: "Look at the red fruit: Quả táo thơm ngon tiếng Anh là gì?",
  displayContent: "🍎 Apple",
  options: ["apple", "bag", "hat", "can"],
  correctAnswer: "apple",
  explanation: "Well done! A is for Apple: /æ/ - apple!",
  starsReward: 10
},
{
  id: "ENG-05",
  subject: "english",
  topic: "Unit 4: In the bedroom (Dd)",
  gameType: "quiz",
  audioPrompt: "Chú vịt bơi dưới ao cạc cạc, tiếng Anh là gì bé ơi?",
  displayContent: "🦆 Duck",
  options: ["duck", "dog", "desk", "door"],
  correctAnswer: "duck",
  explanation: "Brilliant! D is for Duck: /d/ - duck!",
  starsReward: 10
}
```

### Units 5 - 8: Món ăn, Lớp học, Khu vườn, Cơ thể
```javascript
{
  id: "ENG-06",
  subject: "english",
  topic: "Unit 5: At the fish and chip shop (Ii)",
  gameType: "quiz",
  audioPrompt: "Bé rất thích uống sữa tươi mát lành, 'sữa tươi' tiếng Anh là gì?",
  displayContent: "🥛 Milk",
  options: ["milk", "fish", "chips", "chicken"],
  correctAnswer: "milk",
  explanation: "Terrific! I like milk! /ɪ/ - milk!",
  starsReward: 10
},
{
  id: "ENG-07",
  subject: "english",
  topic: "Unit 6: In the classroom (Ee)",
  gameType: "quiz",
  audioPrompt: "Chiếc bút chì viết nét chữ thẳng tắp của bé, tiếng Anh là gì?",
  displayContent: "✏️ Pencil",
  options: ["pencil", "pen", "bell", "red"],
  correctAnswer: "pencil",
  explanation: "Excellent! E is for Pencil: It's a pencil!",
  starsReward: 10
},
{
  id: "ENG-08",
  subject: "english",
  topic: "Unit 8: In the park (Hh - TPR)",
  gameType: "quiz",
  audioPrompt: "Siêu anh hùng Phil bảo: 'Touch your hair!' Bé chạm vào đâu?",
  displayContent: "💇 Touch your hair",
  options: ["Mái tóc", "Bàn tay", "Khuôn mặt", "Bàn chân"],
  correctAnswer: "Mái tóc",
  explanation: "Hooray! 'Hair' chính là mái tóc xinh của bé đấy!",
  starsReward: 10
},
{
  id: "ENG-09",
  subject: "english",
  topic: "Unit 9 & 16: Numbers 1 - 10",
  gameType: "quiz",
  audioPrompt: "How many windows can you see? Bé đếm xem có mấy cửa sổ?",
  displayContent: "🪟🪟🪟🪟🪟🪟",
  options: ["four", "five", "six", "seven"],
  correctAnswer: "six",
  explanation: "Perfect! 1, 2, 3, 4, 5, 6 - I can see six windows!",
  starsReward: 10
},
{
  id: "ENG-10",
  subject: "english",
  topic: "Lật thẻ Memory Tiếng Anh Phonics",
  gameType: "memory",
  audioPrompt: "Find the matching word and picture cards!",
  displayContent: "English Phonics Pairs",
  pairs: [
    { text: "Car", match: "🚗" },
    { text: "Cat", match: "🐱" },
    { text: "Duck", match: "🦆" },
    { text: "Dog", match: "🐶" }
  ],
  explanation: "You did it! You are a super English explorer!",
  starsReward: 15
}
```
