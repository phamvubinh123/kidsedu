/* Ngân hàng câu hỏi Học kỳ 1 - SGK Kết nối tri thức (Toán 1, Tiếng Việt 1) & Tiếng Anh 1 Global Success.
   Lưu ý: chỉ dùng cú pháp ES5 để chạy được trên Safari iPad đời cũ. */

var SUBJECTS = [
  { id: "math", name: "Đảo Toán Học", short: "TOÁN 1", img: "assets/island-math.jpg", emoji: "🏰" },
  { id: "viet", name: "Đảo Tiếng Việt", short: "TIẾNG VIỆT 1", img: "assets/island-viet.jpg", emoji: "📚" },
  { id: "eng", name: "Đảo Tiếng Anh", short: "TIẾNG ANH 1", img: "assets/island-eng.jpg", emoji: "🎈" }
];

var UNITS = {
  math: [
    { topic: "count", title: "Đếm số 0 - 10", icon: "🍎" },
    { topic: "compare", title: "So sánh số", icon: "⚖️" },
    { topic: "split", title: "Tách - Gộp số", icon: "🍒" },
    { topic: "plus", title: "Phép cộng", icon: "➕" },
    { topic: "minus", title: "Phép trừ", icon: "➖" },
    { topic: "shapes", title: "Hình & Vị trí", icon: "🔺" },
    { topic: "review", title: "Ôn tập HK1", icon: "🏆" }
  ],
  viet: [
    { topic: "letters", title: "Âm & Chữ cái", icon: "🔤" },
    { topic: "rhymes1", title: "Vần cơ bản", icon: "🎵" },
    { topic: "rhymes2", title: "Vần nâng cao", icon: "🎶" },
    { topic: "spelling", title: "Chính tả", icon: "✍️" },
    { topic: "passages", title: "Luyện đọc đoạn văn", icon: "📖" },
    { topic: "reading", title: "Đọc hiểu HK1", icon: "🏆" }
  ],
  eng: [
    { topic: "u1_4", title: "Unit 1 - 4", icon: "⚽" },
    { topic: "u5_8", title: "Unit 5 - 8", icon: "🐟" },
    { topic: "u9_12", title: "Unit 9 - 12", icon: "🐒" },
    { topic: "u13_16", title: "Unit 13 - 16", icon: "🐯" },
    { topic: "numbers_talk", title: "Numbers & Talk", icon: "🔢" }
  ]
};


var READING_PASSAGES = [
  {
    id: "t7",
    week: "Tuần 7",
    title: "Về quê thăm bà",
    source: "SGK Tiếng Việt 1 - Ôn tập",
    words: ["gắn bó", "chăm chỉ", "bến đỗ", "đầm ấm", "nhà sàn", "tre ngà"],
    sentences: [
      "Lá cờ đỏ thắm bên nhà sàn.",
      "Bàn ghế nhà bé làm từ tre ngà.",
      "Chú cún con mon men đến bên bé."
    ],
    paragraph: "Nghỉ lễ, mẹ cho Hà về quê thăm bà và bé Bin. Hà vừa về đến ngõ, bà và bé Bin đã ra đón. Bé Bin nhìn Hà, lon ton đến bên chị. Hà bế Bin và hôn lên má bé.",
    reward: 15
  },
  {
    id: "t5",
    week: "Tuần 5",
    title: "Quà của bà",
    source: "SGK Tiếng Việt 1 - Bài 25",
    words: ["khế ngọt", "thị thơm", "quà quê", "bà cháu", "bé bỏng", "san sẻ"],
    sentences: [
      "Bà cho bé giỏ khế ngọt.",
      "Bé chia quà cho cả nhà.",
      "Cả nhà vui vẻ ăn khế ngọt."
    ],
    paragraph: "Bà ở quê ra thăm bé. Bà cho bé bao nhiêu là quà quê. Nào là khế ngọt, thị thơm, nào là bánh đa giòn rụm. Bé sà vào lòng bà, cảm ơn bà ríu rít.",
    reward: 15
  },
  {
    id: "t10",
    week: "Tuần 10",
    title: "Đàn gà con",
    source: "SGK Tiếng Việt 1 - Bài 45",
    words: ["ríu rít", "mồi ngon", "tục tục", "vườn rau", "chăm chỉ", "xúm xít"],
    sentences: [
      "Gà mẹ dắt đàn con ra vườn tìm mồi.",
      "Đàn con lông vàng óng như tơ.",
      "Gà mẹ tục tục gọi con khi thấy giun."
    ],
    paragraph: "Buổi sớm, gà mẹ dắt đàn con ra vườn tìm mồi. Đàn con lon ton ríu rít chạy theo sau mẹ. Gặp mồi ngon, gà mẹ tục tục gọi con lại ăn. Cả đàn gà xúm xít quanh mẹ thật là vui vẻ.",
    reward: 15
  },
  {
    id: "t13",
    week: "Tuần 13",
    title: "Mùa thu quê em",
    source: "SGK Tiếng Việt 1 - Bài 60",
    words: ["trong xanh", "heo may", "xào xạc", "ngắm hoa", "dịu dàng", "thềm nhà"],
    sentences: [
      "Bầu trời mùa thu trong xanh cao vút.",
      "Gió heo may thổi nhè nhẹ mát lành.",
      "Lá vàng rơi xào xạc bên thềm nhà."
    ],
    paragraph: "Mùa thu sang, bầu trời ngày thêm trong xanh. Gió heo may nhè nhẹ thổi qua rặng cây. Lá vàng rơi xào xạc trên lối đi. Bé cùng mẹ ra công viên dạo chơi và ngắm những khóm hoa cúc vàng rực rỡ.",
    reward: 15
  },
  {
    id: "t15",
    week: "Tuần 15",
    title: "Ngày chủ nhật của bé",
    source: "SGK Tiếng Việt 1 - Bài 70",
    words: ["chủ nhật", "tưới cây", "nhặt rau", "quét nhà", "ấm cúng", "chung tay"],
    sentences: [
      "Chủ nhật, cả nhà cùng nhau làm việc.",
      "Bố tưới cây cảnh trước hiên nhà.",
      "Mẹ nấu bữa trưa thật ngon lành."
    ],
    paragraph: "Hôm nay là chủ nhật, cả nhà bé cùng chung tay làm việc nhà. Bố tưới những chậu hoa trước sân. Mẹ nấu những món ăn ngon. Chị Hà quét dọn nhà cửa, còn bé thì nhặt rau giúp mẹ. Cả nhà ngập tràn tiếng cười vui.",
    reward: 15
  },
  {
    id: "t17",
    week: "Tuần 17",
    title: "Chuyện bà kể",
    source: "SGK Tiếng Việt 1 - Bài 80",
    words: ["trầm ấm", "say sưa", "Hồ Gươm", "sự tích", "cây quất", "truyền thuyết"],
    sentences: [
      "Mỗi lần về quê, bé lại được nghe bà kể chuyện.",
      "Bà kể chuyện hồ Hoàn Kiếm và sự tích cây xoài.",
      "Giọng kể của bà trầm ấm yêu thương."
    ],
    paragraph: "Mỗi lần về quê, Hà lại được bà kể cho nghe nhiều câu chuyện hay. Nào là truyền thuyết về hồ Hoàn Kiếm, nào là sự tích cây quất, cây xoài. Giọng kể của bà trầm ấm. Hà ngồi bên bà, say sưa lắng nghe từng lời.",
    reward: 15
  },
  {
    id: "t18",
    week: "Tuần 18",
    title: "Mùa xuân đón Tết",
    source: "SGK Tiếng Việt 1 - Ôn tập cuối HK1",
    words: ["hoa đào", "lung linh", "áo mới", "chúc Tết", "ấm áp", "an lành"],
    sentences: [
      "Hoa đào trước ngõ nở rộ sắc hồng.",
      "Mẹ may cho bé chiếc áo mới đón xuân.",
      "Bé cùng bố mẹ đi chúc Tết ông bà."
    ],
    paragraph: "Tết đang đến gần, hoa đào trước ngõ cười tươi sáng hồng, hoa mai trong vườn lung linh cánh vàng. Mẹ may áo mới cho bé. Bé theo bố mẹ đi chúc Tết ông bà, mong một năm mới an lành và nhiều niềm vui.",
    reward: 15
  }
];

var QUESTION_BANK = {
      // ---------------- MÔN TOÁN 1 - TẬP 1 ----------------
      math: [
        // Chủ đề 1: Các số từ 0 đến 10 (Bài 1 - Bài 2)
        { topic: "count", lesson: "Bài 1: Các số 0, 1, 2, 3, 4, 5", prompt: "Bé đếm xem có bao nhiêu củ cà rốt?", visualType: "icons", visual: "🥕 🥕 🥕", options: ["2", "3", "4", "5"], answer: "3" },
        { topic: "count", lesson: "Bài 1: Các số 0, 1, 2, 3, 4, 5", prompt: "Có bao nhiêu chú vịt đang bơi dưới hồ?", visualType: "icons", visual: "🦆 🦆 🦆 🦆 🦆", options: ["3", "4", "5", "6"], answer: "5" },
        { topic: "count", lesson: "Bài 1: Số 0", prompt: "Trong giỏ không còn quả táo nào. Ta dùng số mấy?", visualType: "icons", visual: "🧺 (Trống không)", options: ["0", "1", "2", "3"], answer: "0" },
        { topic: "count", lesson: "Bài 1: Các số 1, 2, 3, 4, 5", prompt: "Có bao nhiêu chú mèo con đang chơi?", visualType: "icons", visual: "🐱 🐱 🐱 🐱", options: ["2", "3", "4", "5"], answer: "4" },
        { topic: "count", lesson: "Bài 2: Các số 6, 7, 8, 9, 10", prompt: "Đếm số chiếc bánh ngọt trên đĩa:", visualType: "icons", visual: "🧁 🧁 🧁 🧁 🧁 🧁", options: ["5", "6", "7", "8"], answer: "6" },
        { topic: "count", lesson: "Bài 2: Các số 6, 7, 8, 9, 10", prompt: "Đếm số ổ bánh mì trong giỏ:", visualType: "icons", visual: "🥖 🥖 🥖 🥖 🥖 🥖 🥖", options: ["6", "7", "8", "9"], answer: "7" },
        { topic: "count", lesson: "Bài 2: Các số 6, 7, 8, 9, 10", prompt: "Đếm số chú ong chăm chỉ:", visualType: "icons", visual: "🐝 🐝 🐝 🐝 🐝 🐝 🐝 🐝", options: ["7", "8", "9", "10"], answer: "8" },
        { topic: "count", lesson: "Bài 2: Các số 6, 7, 8, 9, 10", prompt: "Có bao nhiêu bông hoa hướng dương?", visualType: "icons", visual: "🌻 🌻 🌻 🌻 🌻 🌻 🌻 🌻 🌻", options: ["7", "8", "9", "10"], answer: "9" },
        { topic: "count", lesson: "Bài 2: Các số 6, 7, 8, 9, 10", prompt: "Bé đếm xem có tất cả bao nhiêu quả táo đỏ?", visualType: "icons", visual: "🍎🍎🍎🍎🍎\n🍎🍎🍎🍎🍎", options: ["8", "9", "10", "7"], answer: "10" },
        { topic: "count", lesson: "Bài 2: Dãy số tự nhiên", prompt: "Điền số còn thiếu vào đoàn tàu: 5 , 6 , [ ? ] , 8 , 9", visualType: "formula", visual: "🚂 5 - 6 - ? - 8 - 9", options: ["4", "7", "10", "3"], answer: "7" },

        // Bài 3 & 4: Nhiều hơn, ít hơn, bằng nhau & So sánh số
        { topic: "compare", lesson: "Bài 3: Nhiều hơn, ít hơn", prompt: "Bên nào có NHIỀU HƠN: 4 quả dâu hay 2 quả chuối?", visualType: "icons", visual: "🍓🍓🍓🍓  |  🍌🍌", options: ["Dâu nhiều hơn", "Chuối nhiều hơn", "Bằng nhau", "Không biết"], answer: "Dâu nhiều hơn" },
        { topic: "compare", lesson: "Bài 3: Nhiều hơn, ít hơn", prompt: "3 chú thỏ và 3 củ cà rốt, số lượng thế nào?", visualType: "icons", visual: "🐰🐰🐰  =  🥕🥕🥕", options: ["Bằng nhau", "Thỏ nhiều hơn", "Cà rốt ít hơn", "Thỏ ít hơn"], answer: "Bằng nhau" },
        { topic: "compare", lesson: "Bài 4: So sánh số (> , < , =)", prompt: "Điền dấu thích hợp vào ô trống: 5 ... 2", visualType: "formula", visual: "5 [ ? ] 2", options: [">", "<", "=", "+"], answer: ">" },
        { topic: "compare", lesson: "Bài 4: So sánh số (> , < , =)", prompt: "Điền dấu thích hợp vào ô trống: 3 ... 7", visualType: "formula", visual: "3 [ ? ] 7", options: [">", "<", "=", "-"], answer: "<" },
        { topic: "compare", lesson: "Bài 4: So sánh số (> , < , =)", prompt: "Điền dấu thích hợp vào ô trống: 8 ... 8", visualType: "formula", visual: "8 [ ? ] 8", options: [">", "<", "=", "+"], answer: "=" },
        { topic: "compare", lesson: "Bài 4: So sánh số", prompt: "Chọn số thích hợp để phép so sánh đúng: ? > 6", visualType: "formula", visual: "[ ? ] > 6", options: ["4", "5", "6", "8"], answer: "8" },
        { topic: "compare", lesson: "Bài 4: So sánh số", prompt: "Số nào BÉ NHẤT trong các số sau?", visualType: "formula", visual: "8 , 3 , 9 , 5", options: ["8", "3", "9", "5"], answer: "3" },
        { topic: "compare", lesson: "Bài 4: So sánh số", prompt: "Số nào LỚN NHẤT trong các số sau?", visualType: "formula", visual: "4 , 10 , 7 , 6", options: ["4", "10", "7", "6"], answer: "10" },
        { topic: "compare", lesson: "Bài 6: Luyện tập chung", prompt: "Sắp xếp các số 7, 2, 5, 9 theo thứ tự từ BÉ đến LỚN:", visualType: "formula", visual: "7 , 2 , 5 , 9", options: ["2, 5, 7, 9", "9, 7, 5, 2", "2, 7, 5, 9", "5, 2, 7, 9"], answer: "2, 5, 7, 9" },

        // Bài 5: Mấy và mấy (Tách - Gộp số)
        { topic: "split", lesson: "Bài 5: Mấy và mấy", prompt: "Gộp 3 quả bóng và 2 quả bóng được mấy quả bóng?", visualType: "icons", visual: "🎈🎈🎈 + 🎈🎈", options: ["4", "5", "6", "7"], answer: "5" },
        { topic: "split", lesson: "Bài 5: Mấy và mấy", prompt: "5 gồm 1 và mấy?", visualType: "split", visualData: { top: "5", left: "1", right: "?" }, options: ["3", "4", "2", "5"], answer: "4" },
        { topic: "split", lesson: "Bài 5: Mấy và mấy", prompt: "6 gồm 3 và mấy?", visualType: "split", visualData: { top: "6", left: "3", right: "?" }, options: ["2", "3", "4", "5"], answer: "3" },
        { topic: "split", lesson: "Bài 5: Mấy và mấy", prompt: "7 gồm mấy và 2?", visualType: "split", visualData: { top: "7", left: "?", right: "2" }, options: ["4", "5", "6", "3"], answer: "5" },
        { topic: "split", lesson: "Bài 5: Mấy và mấy", prompt: "8 gồm 5 và mấy?", visualType: "split", visualData: { top: "8", left: "5", right: "?" }, options: ["2", "3", "4", "5"], answer: "3" },
        { topic: "split", lesson: "Bài 5: Mấy và mấy", prompt: "9 gồm 4 và mấy?", visualType: "split", visualData: { top: "9", left: "4", right: "?" }, options: ["4", "5", "6", "3"], answer: "5" },
        { topic: "split", lesson: "Bài 5: Mấy và mấy", prompt: "10 gồm 6 và mấy?", visualType: "split", visualData: { top: "10", left: "6", right: "?" }, options: ["3", "4", "5", "2"], answer: "4" },

        // Chủ đề 3: Phép cộng trong phạm vi 10 (Bài 10, 12, 13)
        { topic: "plus", lesson: "Bài 10: Phép cộng trong phạm vi 10", prompt: "3 con gà thêm 2 con gà là mấy con gà?", visualType: "formula", visual: "🐥🐥🐥 + 🐥🐥 = ?", options: ["4", "5", "6", "7"], answer: "5" },
        { topic: "plus", lesson: "Bài 10: Phép cộng trong phạm vi 10", prompt: "Tính kết quả phép cộng:", visualType: "formula", visual: "4 + 3 = ?", options: ["6", "7", "8", "9"], answer: "7" },
        { topic: "plus", lesson: "Bài 10: Số 0 trong phép cộng", prompt: "Số nào cộng với 0 cũng bằng chính nó:", visualType: "formula", visual: "8 + 0 = ?", options: ["0", "7", "8", "9"], answer: "8" },
        { topic: "plus", lesson: "Bài 12: Bảng cộng trong phạm vi 10", prompt: "Tính nhẩm nhanh:", visualType: "formula", visual: "6 + 4 = ?", options: ["8", "9", "10", "7"], answer: "10" },
        { topic: "plus", lesson: "Bài 12: Bảng cộng trong phạm vi 10", prompt: "Tính nhẩm nhanh:", visualType: "formula", visual: "5 + 4 = ?", options: ["8", "9", "10", "7"], answer: "9" },
        { topic: "plus", lesson: "Bài 12: Tìm số còn thiếu", prompt: "Số nào cần điền vào dấu hỏi chấm?", visualType: "formula", visual: "3 + [ ? ] = 8", options: ["4", "5", "6", "3"], answer: "5" },
        { topic: "plus", lesson: "Bài 13: Luyện tập chung", prompt: "Tính phép cộng có 3 số:", visualType: "formula", visual: "2 + 3 + 4 = ?", options: ["7", "8", "9", "10"], answer: "9" },

        // Bài 11, 12, 13: Phép trừ trong phạm vi 10
        { topic: "minus", lesson: "Bài 11: Phép trừ trong phạm vi 10", prompt: "Có 5 quả bóng, bay mất 2 quả. Còn lại mấy quả?", visualType: "formula", visual: "5 - 2 = ?", options: ["2", "3", "4", "1"], answer: "3" },
        { topic: "minus", lesson: "Bài 11: Phép trừ trong phạm vi 10", prompt: "Tính nhẩm kết quả:", visualType: "formula", visual: "7 - 3 = ?", options: ["3", "4", "5", "2"], answer: "4" },
        { topic: "minus", lesson: "Bài 11: Số 0 trong phép trừ", prompt: "Tính kết quả khi trừ đi 0:", visualType: "formula", visual: "9 - 0 = ?", options: ["0", "8", "9", "10"], answer: "9" },
        { topic: "minus", lesson: "Bài 11: Hai số bằng nhau trừ nhau", prompt: "7 bông hoa bớt 7 bông hoa còn mấy bông?", visualType: "formula", visual: "7 - 7 = ?", options: ["0", "1", "7", "14"], answer: "0" },
        { topic: "minus", lesson: "Bài 12: Bảng trừ trong phạm vi 10", prompt: "Tính kết quả phép trừ:", visualType: "formula", visual: "10 - 4 = ?", options: ["5", "6", "7", "4"], answer: "6" },
        { topic: "minus", lesson: "Bài 12: Bảng trừ trong phạm vi 10", prompt: "Tìm số thích hợp vào ô trống:", visualType: "formula", visual: "8 - [ ? ] = 3", options: ["4", "5", "6", "3"], answer: "5" },
        { topic: "minus", lesson: "Bài 13: Luyện tập chung", prompt: "Tính dãy phép tính sau:", visualType: "formula", visual: "9 - 3 - 2 = ?", options: ["3", "4", "5", "6"], answer: "4" },

        // Chủ đề 2 & 4: Hình phẳng, Hình khối & Vị trí định hướng (Bài 7, 8, 14, 15)
        { topic: "shapes", lesson: "Bài 7: Hình phẳng", prompt: "Mặt đồng hồ treo tường tròn xoe có dạng hình gì?", visualType: "icons", visual: "⏰ 🔵", options: ["Hình tròn", "Hình vuông", "Hình tam giác", "Hình chữ nhật"], answer: "Hình tròn" },
        { topic: "shapes", lesson: "Bài 7: Hình phẳng", prompt: "Lá cờ thưởng màu đỏ có 3 cạnh là hình gì?", visualType: "icons", visual: "🚩 🔺", options: ["Hình tam giác", "Hình vuông", "Hình tròn", "Hình chữ nhật"], answer: "Hình tam giác" },
        { topic: "shapes", lesson: "Bài 7: Hình phẳng", prompt: "Chiếc khăn tay có 4 cạnh bằng nhau là hình gì?", visualType: "icons", visual: "🟧", options: ["Hình vuông", "Hình tròn", "Hình tam giác", "Khối trụ"], answer: "Hình vuông" },
        { topic: "shapes", lesson: "Bài 7: Hình phẳng", prompt: "Cánh cửa ra vào hoặc quyển vở có dạng hình gì?", visualType: "icons", visual: "🚪 📗", options: ["Hình chữ nhật", "Hình tròn", "Hình tam giác", "Hình cầu"], answer: "Hình chữ nhật" },
        { topic: "shapes", lesson: "Bài 14: Khối lập phương & Hộp chữ nhật", prompt: "Viên xúc xắc (xí ngầu) có dạng hình khối gì?", visualType: "icons", visual: "🎲 🧊", options: ["Khối lập phương", "Khối hộp chữ nhật", "Hình tròn", "Hình tam giác"], answer: "Khối lập phương" },
        { topic: "shapes", lesson: "Bài 14: Khối lập phương & Hộp chữ nhật", prompt: "Hộp sữa giấy hoặc viên gạch xây nhà có dạng khối gì?", visualType: "icons", visual: "📦 🧱", options: ["Khối hộp chữ nhật", "Khối lập phương", "Hình tròn", "Hình vuông"], answer: "Khối hộp chữ nhật" },
        { topic: "shapes", lesson: "Bài 15: Vị trí trong không gian", prompt: "Quan sát hàng thú: 🐶 - 🐱 - 🐰. Con vật nào ở GIỮA?", visualType: "icons", visual: "🐶  ➡️  🐱  ➡️  🐰", options: ["Con mèo 🐱", "Con chó 🐶", "Con thỏ 🐰", "Không có"], answer: "Con mèo 🐱" },
        { topic: "shapes", lesson: "Bài 15: Trên - Dưới, Trước - Sau", prompt: "Đèn giao thông có 3 màu: 🔴 ở trên, 🟡 ở giữa, 🟢 ở dưới. Đèn nào ở TRÊN CÙNG?", visualType: "icons", visual: "🔴 ⬆️\n🟡 ↔️\n🟢 ⬇️", options: ["Đèn đỏ 🔴", "Đèn vàng 🟡", "Đèn xanh 🟢", "Đèn tím"], answer: "Đèn đỏ 🔴" },

        // Chủ đề 5: Ôn tập Học kỳ 1 (Bài 17, 18, 19, 20)
        { topic: "review", lesson: "Bài 17: Ôn tập các số phạm vi 10", prompt: "Cách đọc đúng của số 9 là gì?", visualType: "formula", visual: "Số 9", options: ["chín", "tám", "bảy", "mười"], answer: "chín" },
        { topic: "review", lesson: "Bài 18: Ôn tập phép cộng, trừ", prompt: "Phép tính nào dưới đây có kết quả bằng 5?", visualType: "formula", visual: "🌸 Kết quả = 5", options: ["3 + 2", "10 - 6", "2 + 4", "8 - 2"], answer: "3 + 2" },
        { topic: "review", lesson: "Bài 18: Ôn tập phép cộng, trừ", prompt: "Điền dấu >; <; = thích hợp: 4 + 3 ... 7", visualType: "formula", visual: "4 + 3 [ ? ] 7", options: ["=", ">", "<", "+"], answer: "=" },
        { topic: "review", lesson: "Bài 19: Ôn tập hình học", prompt: "Tìm hình tiếp theo của quy luật: 🔺 🔵 🔺 🔵 🔺 [ ? ]", visualType: "icons", visual: "🔺 🔵 🔺 🔵 🔺 ❓", options: ["🔵 Hình tròn", "🔺 Tam giác", "🟧 Hình vuông", "⭐ Ngôi sao"], answer: "🔵 Hình tròn" },
        { topic: "review", lesson: "Bài 20: Ôn tập chung Học kỳ 1", prompt: "Trên cành có 6 con chim, bay thêm 4 con chim tới. Có tất cả bao nhiêu con chim?", visualType: "icons", visual: "🐦🐦🐦🐦🐦🐦 + 🐦🐦🐦🐦", options: ["10 con chim", "8 con chim", "9 con chim", "2 con chim"], answer: "10 con chim" },
        { topic: "review", lesson: "Bài 20: Ôn tập chung Học kỳ 1", prompt: "Mẹ mua 10 quả cam, biếu bà 5 quả cam. Mẹ còn lại mấy quả cam?", visualType: "icons", visual: "🍊x10  ➖  🍊x5", options: ["5 quả cam", "4 quả cam", "6 quả cam", "10 quả cam"], answer: "5 quả cam" }
      ],

      // ---------------- MÔN TIẾNG VIỆT 1 - TẬP 1 ----------------
      viet: [
        // Âm & Chữ cái đơn / ghép (Bài 1 - Bài 28)
        { topic: "letters", lesson: "Bài 1 & 2: Âm A a, B b, C c", prompt: "Con vật nào dưới đây có tên bắt đầu bằng âm 'c'?", readPrompt: "Con vật nào dưới đây có tên bắt đầu bằng âm cờ?", visualType: "word", visual: "🐟", word: "cá vàng", pairAnswer: "cá vàng", speakText: "cá vàng", options: ["cá vàng", "bá vàng", "lá vàng", "má vàng"], answer: "cá vàng" },
        { topic: "letters", lesson: "Bài 4 & 6: Âm E e, Ê ê, O o", prompt: "Tiếng 'lê' trong từ 'quả lê' có chứa âm gì?", readPrompt: "Tiếng lê trong từ quả lê có chứa âm gì?", visualType: "word", visual: "🍐", word: "quả lê", pairAnswer: "quả lê", speakText: "quả lê", options: ["ê", "a", "o", "u"], answer: "ê" },
        { topic: "letters", lesson: "Bài 7 & 8: Âm Ô ô, Ơ ơ, D d, Đ đ", prompt: "Hình ảnh chiếc lá cờ có tiếng 'cờ' chứa âm gì?", readPrompt: "Hình ảnh chiếc lá cờ có tiếng cờ chứa âm gì?", visualType: "word", visual: "🇻🇳", word: "lá cờ", pairAnswer: "lá cờ", speakText: "lá cờ", options: ["ơ", "ô", "o", "a"], answer: "ơ" },
        { topic: "letters", lesson: "Bài 12 & 14: Âm H h, L l, Ch ch, Kh kh", prompt: "Con vật nào thích ăn chuối, bắt đầu bằng âm 'kh'?", readPrompt: "Con vật nào thích ăn chuối, bắt đầu bằng âm khờ?", visualType: "word", visual: "🐒", word: "con khỉ", pairAnswer: "con khỉ", speakText: "con khỉ", options: ["khỉ", "chỉ", "hỉ", "ngỉ"], answer: "khỉ" },
        { topic: "letters", lesson: "Bài 17 & 18: Âm G g, Gi gi, Gh gh, Nh nh", prompt: "Ngôi nhà thân yêu của bé có tiếng 'nhà' bắt đầu bằng âm gì?", readPrompt: "Ngôi nhà thân yêu của bé có tiếng nhà bắt đầu bằng âm gì?", visualType: "word", visual: "🏠", word: "ngôi nhà", pairAnswer: "ngôi nhà", speakText: "ngôi nhà", options: ["nh", "ng", "ch", "th"], answer: "nh" },
        { topic: "letters", lesson: "Bài 22 & 23: Âm T t, Tr tr, Th th, ia", prompt: "Con vật có hai tai dài, thích ăn cà rốt là con gì?", readPrompt: "Con vật có hai tai dài, thích ăn cà rốt là con gì?", visualType: "word", visual: "🐰", word: "con thỏ", pairAnswer: "con thỏ", speakText: "con thỏ", options: ["thỏ", "trỏ", "tỏ", "nhỏ"], answer: "thỏ" },
        { topic: "letters", lesson: "Bài 24: Vần ua, ưa", prompt: "Tiếng 'dưa' trong từ 'dưa hấu' có chứa vần gì?", readPrompt: "Tiếng dưa trong từ dưa hấu có chứa vần gì?", visualType: "word", visual: "🍉", word: "dưa hấu", pairAnswer: "dưa hấu", speakText: "quả dưa hấu", options: ["ưa", "ua", "ia", "oa"], answer: "ưa" },
        { topic: "letters", lesson: "Bài 26: Âm Ph ph, Qu qu", prompt: "Món ăn sáng nổi tiếng của Việt Nam bắt đầu bằng âm 'ph' là gì?", readPrompt: "Món ăn sáng nổi tiếng của Việt Nam bắt đầu bằng âm phờ là gì?", visualType: "word", visual: "🍜", word: "bát phở", pairAnswer: "bát phở", speakText: "bát phở", options: ["phở", "quở", "thở", "chở"], answer: "phở" },

        // Vần cơ bản (Bài 31 - Bài 59)
        { topic: "rhymes1", lesson: "Bài 31 & 32: Vần an, ăn, ân, on, ôn, ơn", prompt: "Tiếng 'lợn' trong từ 'con lợn' có chứa vần gì?", readPrompt: "Tiếng lợn trong từ con lợn có chứa vần gì?", visualType: "word", visual: "🐷", word: "con lợn", pairAnswer: "con lợn", speakText: "con lợn", options: ["ơn", "on", "ôn", "ăn"], answer: "ơn" },
        { topic: "rhymes1", lesson: "Bài 33: Vần en, ên, in, un", prompt: "Tiếng 'đèn' trong từ 'cái đèn' có chứa vần gì?", readPrompt: "Tiếng đèn trong từ cái đèn có chứa vần gì?", visualType: "word", visual: "🔦", word: "cái đèn", pairAnswer: "cái đèn", speakText: "cái đèn", options: ["en", "ên", "in", "un"], answer: "en" },
        { topic: "rhymes1", lesson: "Bài 34 & 36: Vần am, ăm, âm, om, ôm, ơm", prompt: "Tiếng 'cam' trong từ 'quả cam' có chứa vần gì?", readPrompt: "Tiếng cam trong từ quả cam có chứa vần gì?", visualType: "word", visual: "🍊", word: "quả cam", pairAnswer: "quả cam", speakText: "quả cam", options: ["am", "ăm", "âm", "om"], answer: "am" },
        { topic: "rhymes1", lesson: "Bài 38 & 39: Vần ai, ay, ây, oi, ôi, ơi", prompt: "Tiếng 'máy' trong từ 'máy bay' có chứa vần gì?", readPrompt: "Tiếng máy trong từ máy bay có chứa vần gì?", visualType: "word", visual: "✈️", word: "máy bay", pairAnswer: "máy bay", speakText: "máy bay", options: ["ay", "ai", "ây", "oi"], answer: "ay" },
        { topic: "rhymes1", lesson: "Bài 42 & 43: Vần ao, eo, au, âu, êu", prompt: "Tiếng 'sao' trong từ 'ngôi sao' có chứa vần gì?", readPrompt: "Tiếng sao trong từ ngôi sao có chứa vần gì?", visualType: "word", visual: "⭐", word: "ngôi sao", pairAnswer: "ngôi sao", speakText: "ngôi sao", options: ["ao", "eo", "au", "âu"], answer: "ao" },
        { topic: "rhymes1", lesson: "Bài 46 & 47: Vần ac, ăc, âc, oc, ôc, uc, ưc", prompt: "Tiếng 'sóc' trong từ 'con sóc' có chứa vần gì?", readPrompt: "Tiếng sóc trong từ con sóc có chứa vần gì?", visualType: "word", visual: "🐿️", word: "con sóc", pairAnswer: "con sóc", speakText: "con sóc", options: ["oc", "ôc", "uc", "ac"], answer: "oc" },
        { topic: "rhymes1", lesson: "Bài 57: Vần anh, ênh, inh", prompt: "Tiếng 'xanh' trong từ 'màu xanh' có chứa vần gì?", readPrompt: "Tiếng xanh trong từ màu xanh có chứa vần gì?", visualType: "word", visual: "🌤️", word: "màu xanh", pairAnswer: "màu xanh", speakText: "màu xanh", options: ["anh", "ênh", "inh", "ang"], answer: "anh" },
        { topic: "rhymes1", lesson: "Bài 58: Vần ach, êch, ich", prompt: "Tiếng 'sách' trong từ 'quyển sách' có chứa vần gì?", readPrompt: "Tiếng sách trong từ quyển sách có chứa vần gì?", visualType: "word", visual: "📕", word: "quyển sách", pairAnswer: "quyển sách", speakText: "quyển sách", options: ["ach", "êch", "ich", "anh"], answer: "ach" },
        { topic: "rhymes1", lesson: "Bài 59: Vần ang, ăng, âng", prompt: "Tiếng 'trăng' trong từ 'ánh trăng' có chứa vần gì?", readPrompt: "Tiếng trăng trong từ ánh trăng có chứa vần gì?", visualType: "word", visual: "🌕", word: "ánh trăng", pairAnswer: "ánh trăng", speakText: "ánh trăng", options: ["ăng", "ang", "âng", "ông"], answer: "ăng" },

        // Vần nâng cao (Bài 61 - Bài 79)
        { topic: "rhymes2", lesson: "Bài 61: Vần ong, ông, ung, ưng", prompt: "Tiếng 'ong' trong từ 'con ong' có chứa vần gì?", readPrompt: "Tiếng ong trong từ con ong có chứa vần gì?", visualType: "word", visual: "🐝", word: "con ong", pairAnswer: "con ong", speakText: "con ong", options: ["ong", "ông", "ung", "ưng"], answer: "ong" },
        { topic: "rhymes2", lesson: "Bài 63 & 64: Vần iêng, iêm, yên, iêt, iêu, yêu", prompt: "Tiếng 'diều' trong từ 'cánh diều' có chứa vần gì?", readPrompt: "Tiếng diều trong từ cánh diều có chứa vần gì?", visualType: "word", visual: "🎏", word: "cánh diều", pairAnswer: "cánh diều", speakText: "cánh diều", options: ["iêu", "iêm", "yên", "iêng"], answer: "iêu" },
        { topic: "rhymes2", lesson: "Bài 68 & 69: Vần uôn, uông, uôi, ươi", prompt: "Tiếng 'chuối' trong từ 'quả chuối' có chứa vần gì?", readPrompt: "Tiếng chuối trong từ quả chuối có chứa vần gì?", visualType: "word", visual: "🍌", word: "quả chuối", pairAnswer: "quả chuối", speakText: "quả chuối", options: ["uôi", "ươi", "uôn", "uông"], answer: "uôi" },
        { topic: "rhymes2", lesson: "Bài 71 & 72: Vần ươt, ươm, ươp", prompt: "Tiếng 'bướm' trong từ 'con bướm' có chứa vần gì?", readPrompt: "Tiếng bướm trong từ con bướm có chứa vần gì?", visualType: "word", visual: "🦋", word: "con bướm", pairAnswer: "con bướm", speakText: "con bướm", options: ["ươm", "ươp", "ươt", "ương"], answer: "ươm" },
        { topic: "rhymes2", lesson: "Bài 74: Vần oa, oe", prompt: "Tiếng 'hoa' trong từ 'bông hoa' có chứa vần gì?", readPrompt: "Tiếng hoa trong từ bông hoa có chứa vần gì?", visualType: "word", visual: "🌸", word: "bông hoa", pairAnswer: "bông hoa", speakText: "bông hoa", options: ["oa", "oe", "ua", "ia"], answer: "oa" },
        { topic: "rhymes2", lesson: "Bài 76 & 78: Vần oan, oăn, uân, uât", prompt: "Tiếng 'ngoan' trong từ 'bé ngoan' có chứa vần gì?", readPrompt: "Tiếng ngoan trong từ bé ngoan có chứa vần gì?", visualType: "word", visual: "👧", word: "bé ngoan", pairAnswer: "bé ngoan", speakText: "bé ngoan", options: ["oan", "oăn", "uân", "ang"], answer: "oan" },
        { topic: "rhymes2", lesson: "Bài 78 & 79: Vần uân, uât, uyên, uyêt", prompt: "Tiếng 'xuân' trong từ 'mùa xuân' có chứa vần gì?", readPrompt: "Tiếng xuân trong từ mùa xuân có chứa vần gì?", visualType: "word", visual: "🌺", word: "mùa xuân", pairAnswer: "mùa xuân", speakText: "mùa xuân", options: ["uân", "uât", "uyên", "oăn"], answer: "uân" },
        { topic: "rhymes2", lesson: "Bài 79: Vần uyên, uyêt", prompt: "Tiếng 'thuyền' trong từ 'con thuyền' có chứa vần gì?", readPrompt: "Tiếng thuyền trong từ con thuyền có chứa vần gì?", visualType: "word", visual: "⛵", word: "con thuyền", pairAnswer: "con thuyền", speakText: "con thuyền", options: ["uyên", "uyêt", "uân", "iên"], answer: "uyên" },

        // Quy tắc chính tả (Bài 29, 82 & Đánh giá cuối HK1)
        { topic: "spelling", lesson: "Bài 29 & 82: Chính tả c hay k", prompt: "Chọn chữ 'c' hay 'k' thích hợp để hoàn thành từ: 'con kiến'", readPrompt: "Chọn chữ cờ hay ca thích hợp để có từ con kiến", visualType: "word", visual: "🐜", word: "con ...iến", pairAnswer: "con kiến", speakText: "con kiến", options: ["k", "c", "q", "ch"], answer: "k" },
        { topic: "spelling", lesson: "Bài 29 & 82: Chính tả c hay k", prompt: "Chọn chữ 'c' hay 'k' thích hợp để hoàn thành từ: 'con cua'", readPrompt: "Chọn chữ cờ hay ca thích hợp để có từ con cua", visualType: "word", visual: "🦀", word: "con ...ua", pairAnswer: "con cua", speakText: "con cua", options: ["c", "k", "qu", "kh"], answer: "c" },
        { topic: "spelling", lesson: "Bài 29 & 82: Chính tả g hay gh", prompt: "Chọn 'g' hay 'gh' thích hợp để hoàn thành từ: 'cái ghế'", readPrompt: "Chọn gờ đơn hay gờ kép thích hợp để có từ cái ghế", visualType: "word", visual: "🪑", word: "cái ...ế", pairAnswer: "cái ghế", speakText: "cái ghế", options: ["gh", "g", "gi", "ng"], answer: "gh" },
        { topic: "spelling", lesson: "Bài 29 & 82: Chính tả g hay gh", prompt: "Chọn 'g' hay 'gh' thích hợp để hoàn thành từ: 'con gà'", readPrompt: "Chọn gờ đơn hay gờ kép thích hợp để có từ con gà", visualType: "word", visual: "🐓", word: "con ...à", pairAnswer: "con gà", speakText: "con gà", options: ["g", "gh", "nh", "kh"], answer: "g" },
        { topic: "spelling", lesson: "Bài 29 & 82: Chính tả ng hay ngh", prompt: "Chọn 'ng' hay 'ngh' thích hợp để hoàn thành từ: 'con nghé'", readPrompt: "Chọn ngờ đơn hay ngờ kép thích hợp để có từ con nghé", visualType: "word", visual: "🐃", word: "con ...é", pairAnswer: "con nghé", speakText: "con nghé", options: ["ngh", "ng", "nh", "gh"], answer: "ngh" },
        { topic: "spelling", lesson: "Bài 29 & 82: Chính tả ng hay ngh", prompt: "Chọn 'ng' hay 'ngh' thích hợp để hoàn thành từ: 'con ngựa'", readPrompt: "Chọn ngờ đơn hay ngờ kép thích hợp để có từ con ngựa", visualType: "word", visual: "🐴", word: "con ...ựa", pairAnswer: "con ngựa", speakText: "con ngựa", options: ["ng", "ngh", "nh", "g"], answer: "ng" },

        // Đọc hiểu & Ôn tập Học kỳ 1 (Bài 80 - 83 & Đề tham khảo SGK)
        { topic: "reading", lesson: "Bài 81: Ôn tập - Tết đang vào nhà", prompt: "Đọc khổ thơ và cho biết: Hoa gì nở trước ngõ khi Tết đến?", readPrompt: "Hoa gì nở trước ngõ khi Tết đến?", visualType: "poem", visual: "Hoa đào trước ngõ\nCười tươi sáng hồng\nHoa mai trong vườn\nLung linh cánh trắng.", options: ["Hoa đào", "Hoa hồng", "Hoa sen", "Hoa cúc"], answer: "Hoa đào" },
        { topic: "reading", lesson: "Bài 80: Ôn tập - Trăng sáng", prompt: "Trong bài thơ 'Trăng sáng', trăng tròn được so sánh giống cái gì?", readPrompt: "Trong bài thơ Trăng sáng, trăng tròn được so sánh giống cái gì?", visualType: "poem", visual: "Sân nhà em sáng quá\nNhờ ánh trăng sáng ngời\nTrăng tròn như cái đĩa\nLơ lửng mà không rơi.", options: ["Như cái đĩa", "Như quả bóng", "Như cái thuyền", "Như ngọn đèn"], answer: "Như cái đĩa" },
        { topic: "reading", lesson: "Bài 82: Từ cùng vần & Chữ số", prompt: "Tiếng nào dưới đây CÙNG VẦN với tiếng 'một'?", readPrompt: "Tiếng nào dưới đây cùng vần với tiếng một?", visualType: "word", visual: "1️⃣", word: "một - ...", options: ["tốt", "mát", "mứt", "mười"], answer: "tốt" },
        { topic: "reading", lesson: "Bài 83: Voi, hổ và khỉ", prompt: "Trong truyện 'Voi, hổ và khỉ', con vật nào đã nhanh trí giúp voi thắng hổ?", readPrompt: "Trong truyện Voi hổ và khỉ, con vật nào đã nhanh trí giúp voi thắng hổ?", visualType: "poem", visual: "Khỉ bày mưu giúp voi. Khỉ cưỡi voi đi gặp hổ và quát lớn: 'Hổ ở đâu?'. Hổ sợ quá liền bỏ chạy.", options: ["Con khỉ 🐒", "Con thỏ 🐰", "Con sóc 🐿️", "Con mèo 🐱"], answer: "Con khỉ 🐒" },
        { topic: "reading", lesson: "Đánh giá cuối HK1: Đàn kiến", prompt: "Khi phát hiện mẩu bánh rơi, các chú kiến báo tin cho nhau bằng cách nào?", readPrompt: "Khi phát hiện mẩu bánh rơi, các chú kiến báo tin cho nhau bằng cách nào?", visualType: "poem", visual: "Gặp những con kiến trong đàn, nó chạm râu để báo tin. Lát sau, cả đàn kiến xúm xít khiêng được mẩu bánh.", options: ["Chạm râu vào nhau", "Kêu thật to", "Vẫy cánh", "Gõ chân"], answer: "Chạm râu vào nhau" }
      ],

      // ---------------- MÔN TIẾNG ANH 1 (GLOBAL SUCCESS) ----------------
      eng: [
        // Unit 1 - 4: Bb, Cc, Aa, Dd
        { topic: "u1_4", lesson: "Unit 1: In the school playground (Bb)", prompt: "Look and choose the correct word for ⚽:", visualType: "eng", visual: "⚽", word: "b _ l l", speakText: "ball", options: ["ball", "book", "bike", "bag"], answer: "ball" },
        { topic: "u1_4", lesson: "Unit 1: In the school playground (Bb)", prompt: "What is this? It has two wheels 🚲:", visualType: "eng", visual: "🚲", word: "This is a ...", speakText: "bike", options: ["bike", "ball", "book", "bus"], answer: "bike" },
        { topic: "u1_4", lesson: "Unit 1: In the school playground (Bb)", prompt: "What do you read at school? 📘", visualType: "eng", visual: "📘", word: "b o o k", speakText: "book", options: ["book", "pen", "bag", "cup"], answer: "book" },
        { topic: "u1_4", lesson: "Unit 2: In the dining room (Cc)", prompt: "Look at the picture! What pet says 'Meow'? 🐱", visualType: "eng", visual: "🐱", word: "I have a ...", speakText: "cat", options: ["cat", "dog", "duck", "goat"], answer: "cat" },
        { topic: "u1_4", lesson: "Unit 2: In the dining room (Cc)", prompt: "I have a sweet birthday ... 🎂", visualType: "eng", visual: "🎂", word: "c a k e", speakText: "cake", options: ["cake", "car", "cup", "can"], answer: "cake" },
        { topic: "u1_4", lesson: "Unit 2: In the dining room (Cc)", prompt: "Beep beep! I have a red ... 🚗", visualType: "eng", visual: "🚗", word: "I have a ...", speakText: "I have a car", options: ["car", "cup", "cat", "bus"], answer: "car" },
        { topic: "u1_4", lesson: "Unit 3: At the street market (Aa)", prompt: "What red fruit starts with letter 'A'? 🍎", visualType: "eng", visual: "🍎", word: "_ p p l e", speakText: "apple", options: ["apple", "banana", "mango", "lemon"], answer: "apple" },
        { topic: "u1_4", lesson: "Unit 3: At the street market (Aa)", prompt: "This is my school ... 🎒", visualType: "eng", visual: "🎒", word: "This is my ...", speakText: "This is my bag", options: ["bag", "hat", "can", "box"], answer: "bag" },
        { topic: "u1_4", lesson: "Unit 3: At the street market (Aa)", prompt: "You wear it on your head on sunny days 👒:", visualType: "eng", visual: "👒", word: "h a t", speakText: "hat", options: ["hat", "bag", "cap", "hair"], answer: "hat" },
        { topic: "u1_4", lesson: "Unit 4: In the bedroom (Dd)", prompt: "Woof woof! This is a ... 🐶", visualType: "eng", visual: "🐶", word: "This is a ...", speakText: "This is a dog", options: ["dog", "duck", "desk", "door"], answer: "dog" },
        { topic: "u1_4", lesson: "Unit 4: In the bedroom (Dd)", prompt: "Quack quack! Look at the yellow ... 🦆", visualType: "eng", visual: "🦆", word: "d u c k", speakText: "duck", options: ["duck", "dog", "door", "desk"], answer: "duck" },

        // Unit 5 - 8: Ii, Ee, Gg, Hh
        { topic: "u5_8", lesson: "Unit 5: At the fish and chip shop (Ii)", prompt: "What swims in the water? 🐟", visualType: "eng", visual: "🐟", word: "f i s h", speakText: "fish", options: ["fish", "milk", "chicken", "chips"], answer: "fish" },
        { topic: "u5_8", lesson: "Unit 5: At the fish and chip shop (Ii)", prompt: "I like drinking white ... 🥛", visualType: "eng", visual: "🥛", word: "I like ...", speakText: "I like milk", options: ["milk", "fish", "chips", "chicken"], answer: "milk" },
        { topic: "u5_8", lesson: "Unit 6: In the classroom (Ee)", prompt: "It's a red ... ✏️", visualType: "eng", visual: "✏️", word: "p e n c i l", speakText: "It is a pencil", options: ["pencil", "bell", "book", "desk"], answer: "pencil" },
        { topic: "u5_8", lesson: "Unit 6: In the classroom (Ee)", prompt: "Ring ring! Listen to the school ... 🔔", visualType: "eng", visual: "🔔", word: "b e l l", speakText: "bell", options: ["bell", "pen", "red", "bed"], answer: "bell" },
        { topic: "u5_8", lesson: "Unit 7: In the garden (Gg)", prompt: "There's a ... eating grass in the garden 🐐", visualType: "eng", visual: "🐐", word: "g o a t", speakText: "goat", options: ["goat", "girl", "gate", "garden"], answer: "goat" },
        { topic: "u5_8", lesson: "Unit 8: In the park (Hh)", prompt: "Touch your ...! ✋ (Bàn tay của bé)", visualType: "eng", visual: "✋", word: "Touch your ...", speakText: "Touch your hand", options: ["hand", "hair", "head", "horse"], answer: "hand" },
        { topic: "u5_8", lesson: "Unit 8: In the park (Hh)", prompt: "What animal can run very fast? 🐴", visualType: "eng", visual: "🐴", word: "h o r s e", speakText: "horse", options: ["horse", "goat", "monkey", "tiger"], answer: "horse" },

        // Unit 9 - 12: Oo, Mm, Uu, Ll
        { topic: "u9_12", lesson: "Unit 9: In the shop (Oo)", prompt: "Tick tock! How many ...? ⏰⏰", visualType: "eng", visual: "⏰ ⏰", word: "Two ...", speakText: "clocks", options: ["clocks", "locks", "mops", "pots"], answer: "clocks" },
        { topic: "u9_12", lesson: "Unit 9: In the shop (Oo)", prompt: "What is used to lock the door? 🔒", visualType: "eng", visual: "🔒", word: "l o c k", speakText: "lock", options: ["lock", "clock", "mop", "pot"], answer: "lock" },
        { topic: "u9_12", lesson: "Unit 10: At the zoo (Mm)", prompt: "That's a funny ... at the zoo! 🐒", visualType: "eng", visual: "🐒", word: "That's a ...", speakText: "That is a monkey", options: ["monkey", "mouse", "mother", "mango"], answer: "monkey" },
        { topic: "u9_12", lesson: "Unit 10: At the zoo (Mm)", prompt: "Squeak squeak! A small gray ... 🐭", visualType: "eng", visual: "🐭", word: "m o u s e", speakText: "mouse", options: ["mouse", "monkey", "mango", "cat"], answer: "mouse" },
        { topic: "u9_12", lesson: "Unit 11: At the bus stop (Uu)", prompt: "Look at the bright yellow ... in the sky ☀️", visualType: "eng", visual: "☀️", word: "s u n", speakText: "sun", options: ["sun", "bus", "truck", "run"], answer: "sun" },
        { topic: "u9_12", lesson: "Unit 11: At the bus stop (Uu)", prompt: "We go to school by ... 🚌", visualType: "eng", visual: "🚌", word: "b u s", speakText: "bus", options: ["bus", "car", "bike", "truck"], answer: "bus" },
        { topic: "u9_12", lesson: "Unit 12: At the lake (Ll)", prompt: "Look at the yellow sour ... 🍋", visualType: "eng", visual: "🍋 🍋", word: "Look at the ...", speakText: "Look at the lemons", options: ["lemons", "leaf", "lake", "locks"], answer: "lemons" },
        { topic: "u9_12", lesson: "Unit 12: At the lake (Ll)", prompt: "A green ... on the tree 🍃", visualType: "eng", visual: "🍃", word: "l e a f", speakText: "leaf", options: ["leaf", "lake", "lemon", "tree"], answer: "leaf" },

        // Unit 13 - 16: Nn, Tt, Ff, Ww
        { topic: "u13_16", lesson: "Unit 13: In the school canteen (Nn)", prompt: "She's having yummy ... 🍜", visualType: "eng", visual: "🍜", word: "She's having ...", speakText: "She is having noodles", options: ["noodles", "bananas", "nuts", "milk"], answer: "noodles" },
        { topic: "u13_16", lesson: "Unit 13: In the school canteen (Nn)", prompt: "Monkeys love eating yellow ... 🍌", visualType: "eng", visual: "🍌 🍌", word: "b a n a n a s", speakText: "bananas", options: ["bananas", "apples", "lemons", "nuts"], answer: "bananas" },
        { topic: "u13_16", lesson: "Unit 14: In the toy shop (Tt)", prompt: "I can see a cute brown ... 🧸", visualType: "eng", visual: "🧸", word: "t e d d y   b e a r", speakText: "teddy bear", options: ["teddy bear", "tiger", "turtle", "top"], answer: "teddy bear" },
        { topic: "u13_16", lesson: "Unit 14: In the toy shop (Tt)", prompt: "Roar! I can see a big striped ... 🐯", visualType: "eng", visual: "🐯", word: "I can see a ...", speakText: "I can see a tiger", options: ["tiger", "turtle", "cat", "dog"], answer: "tiger" },
        { topic: "u13_16", lesson: "Unit 14: In the toy shop (Tt)", prompt: "What slow animal has a hard shell? 🐢", visualType: "eng", visual: "🐢", word: "_ u r t l e", speakText: "turtle", options: ["turtle", "tiger", "top", "duck"], answer: "turtle" },
        { topic: "u13_16", lesson: "Unit 15: At the football match (Ff)", prompt: "Fill in the missing letter: '_ o o t b a l l' ⚽", visualType: "eng", visual: "⚽🏃", word: "_ o o t b a l l", speakText: "football", options: ["f", "t", "b", "w"], answer: "f" },
        { topic: "u13_16", lesson: "Unit 16: At home (Ww)", prompt: "Drink pure ... every day! 💧🥤", visualType: "eng", visual: "💧 🥤", word: "w a t e r", speakText: "water", options: ["water", "window", "wash", "milk"], answer: "water" },
        { topic: "u13_16", lesson: "Unit 16: At home (Ww)", prompt: "Open the ... to let fresh air in 🏠", visualType: "eng", visual: "🏠 ⬜", word: "_ i n d o w", speakText: "window", options: ["window", "door", "water", "gate"], answer: "window" },

        // Numbers & Sentence Patterns (Glossary & Review 1-4)
        { topic: "numbers_talk", lesson: "English Numbers (1 - 10)", prompt: "Count the stars and choose the English number: ⭐⭐⭐⭐⭐", visualType: "eng", visual: "⭐ ⭐ ⭐ ⭐ ⭐", word: "How many stars?", speakText: "five", options: ["five", "four", "six", "seven"], answer: "five" },
        { topic: "numbers_talk", lesson: "English Numbers (1 - 10)", prompt: "How many windows can you see?", visualType: "eng", visual: "⬜ ⬜ ⬜ ⬜ ⬜ ⬜", word: "I can see ...", speakText: "I can see six", options: ["six", "seven", "eight", "five"], answer: "six" },
        { topic: "numbers_talk", lesson: "English Numbers (1 - 10)", prompt: "What number is 'EIGHT'?", visualType: "eng", visual: "🔢", word: "e i g h t", speakText: "eight", options: ["8", "6", "7", "9"], answer: "8" },
        { topic: "numbers_talk", lesson: "English Numbers (1 - 10)", prompt: "What number comes after NINE (9)?", visualType: "eng", visual: "9️⃣ ➡️ 🔟", word: "n i n e  ->  ...", speakText: "ten", options: ["ten", "eight", "seven", "one"], answer: "ten" },
        { topic: "numbers_talk", lesson: "Greetings & Communication", prompt: "When you meet your friend Bill, you say: '..., Bill!' 👋", visualType: "eng", visual: "👋😊", word: "..., Bill!", speakText: "Hi Bill", options: ["Hi", "Book", "Ball", "Car"], answer: "Hi" },
        { topic: "numbers_talk", lesson: "Colors & Objects", prompt: "What color is the apple? 🍎 'It's ...'", visualType: "eng", visual: "🍎 🔴", word: "It's ...", speakText: "It is red", options: ["red", "blue", "green", "black"], answer: "red" }
      ]
    };
