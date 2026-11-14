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
    "id": "b1",
    "week": "Tuần 1",
    "title": "Bài 1: A a",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 1",
    "words": [
      "a"
    ],
    "sentences": [
      "Nam và Hà ca hát."
    ],
    "paragraph": "Nam và Hà ca hát.",
    "reward": 15
  },
  {
    "id": "b2",
    "week": "Tuần 1",
    "title": "Bài 2: B b (dấu huyền)",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 2",
    "words": [
      "b",
      "ba",
      "bà",
      "ba ba"
    ],
    "sentences": [
      "Bà cho bé búp bê.",
      "A, bà."
    ],
    "paragraph": "Bà cho bé búp bê. A, bà.",
    "reward": 15
  },
  {
    "id": "b3",
    "week": "Tuần 1",
    "title": "Bài 3: C c (dấu sắc)",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 3",
    "words": [
      "c",
      "ca",
      "cà",
      "cá"
    ],
    "sentences": [
      "Nam và bố câu cá.",
      "A, cá."
    ],
    "paragraph": "Nam và bố câu cá. A, cá.",
    "reward": 15
  },
  {
    "id": "b4",
    "week": "Tuần 1",
    "title": "Bài 4: E e Ê ê",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 4",
    "words": [
      "e",
      "ê",
      "bè",
      "bé",
      "bế"
    ],
    "sentences": [
      "Bé kể mẹ nghe về bạn bè.",
      "Bà bế bé."
    ],
    "paragraph": "Bé kể mẹ nghe về bạn bè. Bà bế bé.",
    "reward": 15
  },
  {
    "id": "b5",
    "week": "Tuần 1",
    "title": "Bài 5: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 5",
    "words": [
      "ba bà",
      "be bé",
      "cá bé",
      "bè cá",
      "bế bé"
    ],
    "sentences": [
      "Bà bế bé.",
      "Búp bê làm những việc gì?",
      "Vì sao dế mèn hát tặng búp bê?",
      "Búp bê thấy thế nào khi nghe dế mèn hát?"
    ],
    "paragraph": "Bà bế bé. Búp bê và dế mèn: Búp bê làm những việc gì? Vì sao dế mèn hát tặng búp bê? Búp bê thấy thế nào khi nghe dế mèn hát?",
    "reward": 15
  },
  {
    "id": "b6",
    "week": "Tuần 2",
    "title": "Bài 6: O o (dấu hỏi)",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 6",
    "words": [
      "bò",
      "bó",
      "bỏ",
      "cò",
      "có",
      "cỏ"
    ],
    "sentences": [
      "Đàn bò gặm cỏ.",
      "Bê có cỏ."
    ],
    "paragraph": "Đàn bò gặm cỏ. Bê có cỏ.",
    "reward": 15
  },
  {
    "id": "b7",
    "week": "Tuần 2",
    "title": "Bài 7: Ô ô (dấu nặng)",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 7",
    "words": [
      "bố",
      "bổ",
      "bộ",
      "cô",
      "cổ",
      "cộ",
      "cô bé",
      "cổ cò"
    ],
    "sentences": [
      "Bố và Hà đi bộ trên hè phố.",
      "Bố bê bể cá."
    ],
    "paragraph": "Bố và Hà đi bộ trên hè phố. Bố bê bể cá.",
    "reward": 15
  },
  {
    "id": "b8",
    "week": "Tuần 2",
    "title": "Bài 8: D d Đ đ",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 8",
    "words": [
      "da",
      "dẻ",
      "dế",
      "đá",
      "đò",
      "đá dế",
      "đa đa",
      "ô đỏ"
    ],
    "sentences": [
      "Dưới gốc đa, các bạn chơi dung dăng dung dẻ.",
      "Bé có ô đỏ."
    ],
    "paragraph": "Dưới gốc đa, các bạn chơi dung dăng dung dẻ. Bé có ô đỏ.",
    "reward": 15
  },
  {
    "id": "b9",
    "week": "Tuần 2",
    "title": "Bài 9: Ơ ơ (dấu ngã)",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 9",
    "words": [
      "bờ",
      "bở",
      "cờ",
      "cỡ",
      "dỡ",
      "bờ đê",
      "cá cờ",
      "đỡ bé"
    ],
    "sentences": [
      "Tàu dỡ hàng ở cảng.",
      "Bố đỡ bé."
    ],
    "paragraph": "Tàu dỡ hàng ở cảng. Bố đỡ bé.",
    "reward": 15
  },
  {
    "id": "b10",
    "week": "Tuần 2",
    "title": "Bài 10: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 10",
    "words": [
      "bó cỏ",
      "cá cờ",
      "bờ đê",
      "đỡ bà",
      "cờ đỏ",
      "đỗ đỏ",
      "dỗ bé"
    ],
    "sentences": [
      "Bờ đê có dế.",
      "Bà có đỗ đỏ.",
      "Bà kiến sống ở đâu?",
      "Đàn kiến con dùng vật gì để khiêng bà kiến?"
    ],
    "paragraph": "Bờ đê có dế. Bà có đỗ đỏ. Đàn kiến con ngoan ngoãn: Bà kiến sống ở đâu? Đàn kiến con dùng vật gì để khiêng bà kiến? Đàn kiến con đưa bà kiến đến đâu? Được ở nhà mới, bà kiến nói gì với đàn kiến con?",
    "reward": 15
  },
  {
    "id": "b11",
    "week": "Tuần 3",
    "title": "Bài 11: I i K k",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 11",
    "words": [
      "kè",
      "kẻ",
      "kệ",
      "kí",
      "bí đỏ",
      "kẻ ô",
      "đi đò",
      "kì đà"
    ],
    "sentences": [
      "Nam vẽ kì đà.",
      "Kì đà bò ở kẽ đá."
    ],
    "paragraph": "Nam vẽ kì đà. Kì đà bò ở kẽ đá.",
    "reward": 15
  },
  {
    "id": "b12",
    "week": "Tuần 3",
    "title": "Bài 12: H h L l",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 12",
    "words": [
      "hé",
      "ho",
      "hổ",
      "li",
      "lá đỏ",
      "bờ hồ",
      "cá hố",
      "le le"
    ],
    "sentences": [
      "Le le bơi trên hồ.",
      "Bé bị ho. Bà đã có lá hẹ."
    ],
    "paragraph": "Le le bơi trên hồ. Bé bị ho. Bà đã có lá hẹ.",
    "reward": 15
  },
  {
    "id": "b13",
    "week": "Tuần 3",
    "title": "Bài 13: U u Ư ư",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 13",
    "words": [
      "dù",
      "đủ",
      "hũ",
      "cử",
      "dự",
      "lữ",
      "đu đủ",
      "hổ dữ"
    ],
    "sentences": [
      "Đu đủ chín ngọt lừ.",
      "Cá hổ là cá dữ."
    ],
    "paragraph": "Đu đủ chín ngọt lừ. Cá hổ là cá dữ.",
    "reward": 15
  },
  {
    "id": "b14",
    "week": "Tuần 3",
    "title": "Bài 14: Ch ch Kh kh",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 14",
    "words": [
      "chè",
      "chỉ",
      "chợ",
      "khế",
      "kho",
      "lá khô",
      "chú khỉ",
      "chợ cá"
    ],
    "sentences": [
      "Mấy chú khỉ ăn chuối.",
      "Chị có cá kho khế."
    ],
    "paragraph": "Mấy chú khỉ ăn chuối. Chị có cá kho khế.",
    "reward": 15
  },
  {
    "id": "b15",
    "week": "Tuần 3",
    "title": "Bài 15: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 15",
    "words": [
      "chú hề",
      "lá khô",
      "bờ hồ",
      "chợ cá",
      "cá dữ",
      "che ô",
      "lá hẹ"
    ],
    "sentences": [
      "Chị cho bé cá cờ.",
      "Dì Kha cho Hà đi chợ.",
      "Quạ nhìn thấy gì dưới gốc cây?",
      "Quạ đã nghĩ ra điều gì?"
    ],
    "paragraph": "Chị cho bé cá cờ. Dì Kha cho Hà đi chợ. Con quạ thông minh: Quạ nhìn thấy gì dưới gốc cây? Quạ có uống được nước trong bình không? Vì sao? Quạ đã nghĩ ra điều gì? Cuối cùng, quạ có uống được nước trong bình không? Vì sao?",
    "reward": 15
  },
  {
    "id": "b16",
    "week": "Tuần 4",
    "title": "Bài 16: M m N n",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 16",
    "words": [
      "má",
      "mẹ",
      "mỡ",
      "na",
      "cá mè",
      "lá me",
      "nơ đỏ",
      "ca nô"
    ],
    "sentences": [
      "Mẹ mua nơ cho Hà.",
      "Bố mẹ cho Hà đi ca nô."
    ],
    "paragraph": "Mẹ mua nơ cho Hà. Bố mẹ cho Hà đi ca nô.",
    "reward": 15
  },
  {
    "id": "b17",
    "week": "Tuần 4",
    "title": "Bài 17: G g Gi gi",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 17",
    "words": [
      "ga",
      "gỗ",
      "giá",
      "giò",
      "gà gô",
      "đồ gỗ",
      "giá đỗ",
      "cụ già"
    ],
    "sentences": [
      "Hà có giỏ trứng gà.",
      "Bà che gió cho ba chú gà."
    ],
    "paragraph": "Hà có giỏ trứng gà. Bà che gió cho ba chú gà.",
    "reward": 15
  },
  {
    "id": "b18",
    "week": "Tuần 4",
    "title": "Bài 18: Gh gh Nh nh",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 18",
    "words": [
      "ghế đá",
      "ghẹ đỏ",
      "nhà gỗ",
      "lá nho"
    ],
    "sentences": [
      "Hà ghé nhà bà.",
      "Nhà bà ở ngõ nhỏ.",
      "Mẹ nhờ Hà bê ghế nhỏ."
    ],
    "paragraph": "Mẹ nhờ Hà bê ghế nhỏ.",
    "reward": 15
  },
  {
    "id": "b19",
    "week": "Tuần 4",
    "title": "Bài 19: Ng ng Ngh ngh",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 19",
    "words": [
      "ngã ba",
      "ngõ nhỏ",
      "củ nghệ",
      "nghỉ hè"
    ],
    "sentences": [
      "Nghé theo mẹ ra ngõ.",
      "Nghé đã no cỏ.",
      "Nghé ngủ ở bờ đê."
    ],
    "paragraph": "Nghé đã no cỏ. Nghé ngủ ở bờ đê.",
    "reward": 15
  },
  {
    "id": "b20",
    "week": "Tuần 4",
    "title": "Bài 20: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 20",
    "words": [
      "nụ cà",
      "nhà ga",
      "nghỉ hè",
      "ngủ mơ",
      "bỡ ngỡ",
      "giá đỗ",
      "nho nhỏ",
      "ghế gỗ"
    ],
    "sentences": [
      "Mẹ ghé nhà bà.",
      "Nhà bà ở ngõ nhỏ."
    ],
    "paragraph": "Cô chủ không biết quý tình bạn: Cô bé nuôi con vật gì? Cô bé muốn đổi con vật đó lấy con vật nào? Cô bé đổi gà mái lấy con vật nào? Thấy chú chó nhỏ xinh xắn, cô bé đã làm gì? Cuối cùng, có con vật nào ở bên cô bé không? Vì sao?",
    "reward": 15
  },
  {
    "id": "b21",
    "week": "Tuần 5",
    "title": "Bài 21: R r S s",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 21",
    "words": [
      "rổ rá",
      "cá rô",
      "su su",
      "chữ số"
    ],
    "sentences": [
      "Bầy sẻ non ríu ra ríu rít bên mẹ.",
      "Chợ có gà ri, cá rô, su su.",
      "Chợ có cả rổ rá."
    ],
    "paragraph": "Chợ có gà ri, cá rô, su su. Chợ có cả rổ rá.",
    "reward": 15
  },
  {
    "id": "b22",
    "week": "Tuần 5",
    "title": "Bài 22: T t Tr tr",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 22",
    "words": [
      "ô tô",
      "sư tử",
      "cá trê",
      "tre ngà"
    ],
    "sentences": [
      "Nam tô bức tranh cây tre.",
      "Hà tả hồ cá.",
      "Hồ to, có cá mè, cá trê, cá rô."
    ],
    "paragraph": "Hà tả hồ cá. Hồ to, có cá mè, cá trê, cá rô.",
    "reward": 15
  },
  {
    "id": "b23",
    "week": "Tuần 5",
    "title": "Bài 23: Th th ia",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 23",
    "words": [
      "thủ đô",
      "lá thư",
      "thìa dĩa",
      "lá tía tô"
    ],
    "sentences": [
      "Trung thu, bé được chia quà.",
      "Bé chia thìa, chia dĩa cho cả nhà.",
      "Thìa dĩa to cho bố mẹ.",
      "Thìa dĩa nhỏ cho bé."
    ],
    "paragraph": "Bé chia thìa, chia dĩa cho cả nhà. Thìa dĩa to cho bố mẹ. Thìa dĩa nhỏ cho bé.",
    "reward": 15
  },
  {
    "id": "b24",
    "week": "Tuần 5",
    "title": "Bài 24: ua ưa",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 24",
    "words": [
      "cà chua",
      "múa ô",
      "dưa lê",
      "cửa sổ"
    ],
    "sentences": [
      "Mẹ đưa Hà đến lớp học múa.",
      "Mẹ đi chợ mua cá, mua cua.",
      "Mẹ mua cả sữa chua, dưa lê."
    ],
    "paragraph": "Mẹ đi chợ mua cá, mua cua. Mẹ mua cả sữa chua, dưa lê.",
    "reward": 15
  },
  {
    "id": "b25",
    "week": "Tuần 5",
    "title": "Bài 25: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 25",
    "words": [
      "củ sả",
      "lưa thưa",
      "lá mía",
      "rễ tre",
      "mùa thu",
      "cửa sổ",
      "khế chua",
      "tổ cò"
    ],
    "sentences": [
      "Mùa hè, nhà bà có dừa, có dưa lê.",
      "Mùa thu, nhà bà có na, có thị."
    ],
    "paragraph": "Chó sói và cừu non: Nhởn nhơ gặm cỏ, cừu non gặp phải chuyện gì? Cừu non nói gì với sói? Cừu non đã làm gì để thoát khỏi sói? Câu chuyện kết thúc như thế nào?",
    "reward": 15
  },
  {
    "id": "b26",
    "week": "Tuần 6",
    "title": "Bài 26: Ph ph Qu qu",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 26",
    "words": [
      "pha trà",
      "phố cổ",
      "quê nhà",
      "quả khế"
    ],
    "sentences": [
      "Cả nhà từ phố về thăm quê.",
      "Bà ra Thủ đô.",
      "Bà cho bé quà quê.",
      "Bố đưa bà đi Bờ Hồ, đi phố cổ."
    ],
    "paragraph": "Bà ra Thủ đô. Bà cho bé quà quê. Bố đưa bà đi Bờ Hồ, đi phố cổ.",
    "reward": 15
  },
  {
    "id": "b27",
    "week": "Tuần 6",
    "title": "Bài 27: V v X x",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 27",
    "words": [
      "vở vẽ",
      "vỉa hè",
      "xe lu",
      "thị xã"
    ],
    "sentences": [
      "Hà vẽ xe đạp.",
      "Nghỉ hè, bố mẹ cho Hà về quê.",
      "Quê Hà là xứ sở của dừa."
    ],
    "paragraph": "Nghỉ hè, bố mẹ cho Hà về quê. Quê Hà là xứ sở của dừa.",
    "reward": 15
  },
  {
    "id": "b28",
    "week": "Tuần 6",
    "title": "Bài 28: Y y",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 28",
    "words": [
      "y tá",
      "dã quỳ",
      "đá quý"
    ],
    "sentences": [
      "Thời gian quý hơn vàng bạc.",
      "Mẹ và Hà ghé nhà dì Kha.",
      "Dì kể cho Hà nghe về bà.",
      "Hà chú ý nghe dì kể."
    ],
    "paragraph": "Mẹ và Hà ghé nhà dì Kha. Dì kể cho Hà nghe về bà. Hà chú ý nghe dì kể.",
    "reward": 15
  },
  {
    "id": "b29",
    "week": "Tuần 6",
    "title": "Bài 29: Luyện tập chính tả",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 29",
    "words": [
      "cá cờ",
      "chữ kí",
      "gà gô",
      "ghế gỗ",
      "cá ngừ",
      "củ nghệ"
    ],
    "sentences": [
      "Phân biệt c với k",
      "Phân biệt g với gh",
      "Phân biệt ng với ngh"
    ],
    "paragraph": "Phân biệt c với k: k đi với i, e, ê; c đi với a, o, ... Phân biệt g với gh: gh đi với i, e, ê; g đi với a, o, ... Phân biệt ng với ngh: ngh đi với i, e, ê; ng đi với a, o, ...",
    "reward": 15
  },
  {
    "id": "b30",
    "week": "Tuần 6",
    "title": "Bài 30: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 30",
    "words": [
      "phố cổ",
      "qua phà",
      "vỉa hè",
      "đá quý",
      "cổ vũ",
      "xa xa",
      "xứ sở"
    ],
    "sentences": [
      "Nhà bé ở Thủ đô.",
      "Thủ đô có Bờ Hồ.",
      "Quê bé ở Phú Thọ.",
      "Xa nhà, bé nhớ mẹ. Xa quê, bé nhớ bà."
    ],
    "paragraph": "Nhà bé ở Thủ đô. Thủ đô có Bờ Hồ. Quê bé ở Phú Thọ. Phú Thọ có chè, có cọ. Xa nhà, bé nhớ mẹ. Xa quê, bé nhớ bà.",
    "reward": 15
  },
  {
    "id": "b31",
    "week": "Tuần 7",
    "title": "Bài 31: an ăn ân",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 31",
    "words": [
      "bạn thân",
      "khăn rằn",
      "quả mận"
    ],
    "sentences": [
      "Ngựa vằn và hươu cao cổ là đôi bạn thân.",
      "Đàn gà cứ tha thẩn gần chân mẹ.",
      "Đã có mẹ che chắn, cả đàn chả sợ gì lũ quạ dữ."
    ],
    "paragraph": "Đàn gà cứ tha thẩn gần chân mẹ. Đã có mẹ che chắn, cả đàn chả sợ gì lũ quạ dữ.",
    "reward": 15
  },
  {
    "id": "b32",
    "week": "Tuần 7",
    "title": "Bài 32: on ôn ơn",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 32",
    "words": [
      "nón lá",
      "con chồn",
      "sơn ca"
    ],
    "sentences": [
      "Sơn ca véo von: Mẹ ơi, con đã lớn khôn.",
      "Ve vẻ vè ve, vè bốn chú lợn.",
      "Nhởn nhơ nô giỡn, ăn ngủ vô tư."
    ],
    "paragraph": "Bốn chú lợn con: Ve vẻ vè ve / Vè bốn chú lợn / Nhởn nhơ nô giỡn / Ăn ngủ vô tư. / Hẳn họ nhà \"Trư\" / Là to tròn thế. / Ve vè nghe kể / Bốn chú lợn con. (Tiến Việt)",
    "reward": 15
  },
  {
    "id": "b33",
    "week": "Tuần 7",
    "title": "Bài 33: en ên in un",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 33",
    "words": [
      "ngọn nến",
      "đèn pin",
      "cún con"
    ],
    "sentences": [
      "Cún con nhìn thấy dế mèn trên tàu lá.",
      "Con gì tên có chữ \"ba\", ăn cua ăn cá, nhìn qua ngỡ rùa?",
      "Con gì quen vẻ già nua, bốn chân ngắn ngủn, thỏ thua chả ngờ?"
    ],
    "paragraph": "– Con gì tên có chữ \"ba\" / Ăn cua ăn cá, nhìn qua ngỡ rùa? / – Con gì quen vẻ già nua / Bốn chân ngắn ngủn, thỏ thua chả ngờ? (Phúc Định)",
    "reward": 15
  },
  {
    "id": "b34",
    "week": "Tuần 7",
    "title": "Bài 34: am ăm âm",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 34",
    "words": [
      "quả cam",
      "tăm tre",
      "củ sâm"
    ],
    "sentences": [
      "Nhện ngắm nghía tấm lưới vừa làm xong.",
      "Mùa hè, ve râm ran, sen nở thắm.",
      "Lũ trẻ nô đùa trên thảm cỏ ven hồ."
    ],
    "paragraph": "Mùa hè, ve râm ran, sen nở thắm. Lũ trẻ nô đùa trên thảm cỏ ven hồ.",
    "reward": 15
  },
  {
    "id": "b35",
    "week": "Tuần 7",
    "title": "Bài 35: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 35",
    "words": [
      "củ sắn",
      "tấm gỗ",
      "khôn lớn",
      "bàn chân",
      "mưa phùn",
      "bến đò",
      "đèn pin",
      "chăm chỉ"
    ],
    "sentences": [
      "Sen nở thắm hồ.",
      "Nhìn rùa, thỏ chê: \"Quả là chậm như rùa.\".",
      "Thế là, rùa đi xa hơn hẳn thỏ."
    ],
    "paragraph": "Thỏ và rùa\nNhìn rùa, thỏ chê: \"Quả là chậm như rùa.\". Rùa ôn tồn: \"Ta thi nhé.\". Thỏ hớn hở tham gia. Thỏ nhởn nhơ múa ca, rùa cứ bò cần mẫn. Thế là, rùa đi xa hơn hẳn thỏ.",
    "reward": 15
  },
  {
    "id": "b36",
    "week": "Tuần 8",
    "title": "Bài 36: om ôm ơm",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 36",
    "words": [
      "đom đóm",
      "chó đốm",
      "mâm cơm"
    ],
    "sentences": [
      "Hương cốm thơm thôn xóm.",
      "Hôm qua, cô Mơ ở xóm Hạ đến thăm nhà Hà.",
      "Hà chọn quả cam to phần bố."
    ],
    "paragraph": "Hôm qua, cô Mơ ở xóm Hạ đến thăm nhà Hà. Cô cho Hà giỏ cam. Hà chọn quả cam to phần bố. Mẹ khen và thơm lên má Hà.",
    "reward": 15
  },
  {
    "id": "b37",
    "week": "Tuần 8",
    "title": "Bài 37: em êm im um",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 37",
    "words": [
      "tem thư",
      "thềm nhà",
      "tủm tỉm"
    ],
    "sentences": [
      "Chị em Hà chơi trốn tìm. Hà tủm tỉm đếm: một, hai, ba,...",
      "Chim ri cần cù tìm cỏ khô về làm tổ.",
      "Chim ri cảm ơn sẻ và sơn ca."
    ],
    "paragraph": "Chim ri cần cù tìm cỏ khô về làm tổ. Đêm qua, nó bị ốm. Chim sẻ và chim sơn ca đến thăm, đem cho nó túm rơm. Chim ri cảm ơn sẻ và sơn ca.",
    "reward": 15
  },
  {
    "id": "b38",
    "week": "Tuần 8",
    "title": "Bài 38: ai ay ây",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 38",
    "words": [
      "chùm vải",
      "máy cày",
      "đám mây"
    ],
    "sentences": [
      "Hai bạn thi nhảy dây.",
      "Nai con nhìn thấy con gì bé nhỏ, thân đầy gai nhọn trên bãi cỏ.",
      "Nai mẹ tủm tỉm: \"Bạn nhím đấy, con ạ\"."
    ],
    "paragraph": "Nai con nhìn thấy con gì bé nhỏ, thân đầy gai nhọn trên bãi cỏ. Nó chạy về nhà, hổn hển kể cho mẹ nghe. Nai mẹ tủm tỉm: \"Bạn nhím đấy, con ạ\".",
    "reward": 15
  },
  {
    "id": "b39",
    "week": "Tuần 8",
    "title": "Bài 39: oi ôi ơi",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 39",
    "words": [
      "chim bói cá",
      "thổi còi",
      "đồ chơi"
    ],
    "sentences": [
      "Voi con mời bạn đi xem hội.",
      "Mẹ ơi, mạ lớn lên gọi là lúa.",
      "Lớn lên, con vẫn là con gái nhỏ của mẹ."
    ],
    "paragraph": "Hà hỏi mẹ:\n– Mẹ ơi, mạ lớn lên gọi là lúa. Bê lớn lên gọi là bò. Còn con lớn lên thì gọi là gì ạ?\nMẹ ôm Hà rồi nói:\n– Lớn lên, con vẫn là con gái nhỏ của mẹ.",
    "reward": 15
  },
  {
    "id": "b40",
    "week": "Tuần 8",
    "title": "Bài 40: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 40",
    "words": [
      "chói lọi",
      "cày cấy",
      "chúm chím",
      "sớm tối",
      "gió nồm",
      "lom khom",
      "ngõ hẻm",
      "bơi lội"
    ],
    "sentences": [
      "Voi con có vòi dài.",
      "Nhím con ra bãi cỏ tìm cái ăn.",
      "Cả hai quay lại, ăn đến no nê."
    ],
    "paragraph": "Nhím con ra bãi cỏ tìm cái ăn. Nó phấn chấn khi thấy vô số quả chín thơm ngon. Nhím vội chạy về gọi bạn chồn. Cả hai quay lại, ăn đến no nê.",
    "reward": 15
  },
  {
    "id": "b41",
    "week": "Tuần 9",
    "title": "Bài 41: ui ưi",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 41",
    "words": [
      "dãy núi",
      "bụi cỏ",
      "gửi thư"
    ],
    "sentences": [
      "Bà gửi cho Hà túi kẹo.",
      "Lan gửi thư cho Hà kể về quê Lan.",
      "Lan mời Hà lên thăm quê Lan."
    ],
    "paragraph": "Lan gửi thư cho Hà kể về quê Lan. Ở đó, có nhà sàn nằm ven đồi. Mùa này, chim ca rộn rã, sim nở rộ tím cả núi đồi. Lan mời Hà lên thăm quê Lan.",
    "reward": 15
  },
  {
    "id": "b42",
    "week": "Tuần 9",
    "title": "Bài 42: ao eo",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 42",
    "words": [
      "ngôi sao",
      "quả táo",
      "cái kẹo",
      "ao bèo"
    ],
    "sentences": [
      "Ao thu lạnh lẽo nước trong veo.",
      "Trên cây cao, đàn chào mào bay đi, bay lại.",
      "Chú tha rơm khô về khéo léo làm tổ."
    ],
    "paragraph": "Trên cây cao, đàn chào mào bay đi, bay lại. Mấy chú sáo đen vui ca véo von. Còn chim ri vẫn chăm chỉ. Chú tha rơm khô về khéo léo làm tổ.",
    "reward": 15
  },
  {
    "id": "b43",
    "week": "Tuần 9",
    "title": "Bài 43: au âu êu",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 43",
    "words": [
      "rau củ",
      "con trâu",
      "chú tễu"
    ],
    "sentences": [
      "Đàn sẻ nâu kêu ríu rít ở sau nhà.",
      "Nhà dì Tư ở quê có cây cau, giàn trầu.",
      "Sau nhà có rau cải, rau dền và cả dưa hấu."
    ],
    "paragraph": "Nhà dì Tư ở quê có cây cau, giàn trầu. Sau nhà có rau cải, rau dền và cả dưa hấu. Gần nhà dì có cây cầu tre nhỏ. Xa xa là dãy núi cao.",
    "reward": 15
  },
  {
    "id": "b44",
    "week": "Tuần 9",
    "title": "Bài 44: iu ưu",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 44",
    "words": [
      "cái rìu",
      "cái địu",
      "quả lựu",
      "con cừu"
    ],
    "sentences": [
      "Bà đã nghỉ hưu mà luôn bận bịu.",
      "Ngày ngày, bà đi chợ, nấu ăn và chăm lo cho con cháu.",
      "Mỗi lần đưa bé đi dạo, bà hay kể về ngày xưa."
    ],
    "paragraph": "Bà đã nghỉ hưu. Ngày ngày, bà đi chợ, nấu ăn và chăm lo cho con cháu. Mỗi lần đưa bé đi dạo, bà hay kể về ngày xưa. Lời bà dịu êm.",
    "reward": 15
  },
  {
    "id": "b45",
    "week": "Tuần 9",
    "title": "Bài 45: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 45",
    "words": [
      "khâu vá",
      "gửi quà",
      "ngôi sao",
      "kéo co",
      "vui vẻ",
      "kêu gọi",
      "chịu khó",
      "cây cau"
    ],
    "sentences": [
      "Tàu neo đậu ven bờ.",
      "Nghỉ hè, nhà Hà đi Tam Đảo.",
      "Mùa hè ở Tam Đảo quả là dễ chịu."
    ],
    "paragraph": "Nghỉ hè, nhà Hà đi Tam Đảo. Khi tán cây, ngọn cỏ còn thiu thiu ngủ, Hà đã dậy ngắm mây mù. Đến trưa, trời như vào thu. Mùa hè ở Tam Đảo quả là dễ chịu.",
    "reward": 15
  },
  {
    "id": "b46",
    "week": "Tuần 10",
    "title": "Bài 46: ac ăc âc",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 46",
    "words": [
      "bác sĩ",
      "mắc áo",
      "quả gấc"
    ],
    "sentences": [
      "Tây Bắc có ruộng bậc thang, có thác nước.",
      "Nếu lên Tây Bắc, bạn hãy đến Sa Pa.",
      "Vào mùa hè, mỗi ngày ở đây như có bốn mùa."
    ],
    "paragraph": "Nếu lên Tây Bắc, bạn hãy đến Sa Pa. Vào mùa hè, mỗi ngày ở đây như có bốn mùa. Sa Pa có Thác Bạc, có Cầu Mây, có các bản Tả Van, Tả Phìn, Sín Chải.",
    "reward": 15
  },
  {
    "id": "b47",
    "week": "Tuần 10",
    "title": "Bài 47: oc ôc uc ưc",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 47",
    "words": [
      "con sóc",
      "cái cốc",
      "máy xúc",
      "con mực"
    ],
    "sentences": [
      "Ở góc vườn, cạnh gốc cau, khóm cúc nở hoa vàng rực.",
      "Đi học về, Hà thấy mấy khóm cúc đã nở rực rỡ.",
      "Mẹ tấm tắc khen Hà khéo tay."
    ],
    "paragraph": "Đi học về, Hà thấy mấy khóm cúc đã nở rực rỡ. Hà hái cúc, cắm vào cốc rồi để ngay ngắn trên bàn học. Mẹ tấm tắc khen Hà khéo tay.",
    "reward": 15
  },
  {
    "id": "b48",
    "week": "Tuần 10",
    "title": "Bài 48: at ăt ât",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 48",
    "words": [
      "bãi cát",
      "mặt trời",
      "bật lửa"
    ],
    "sentences": [
      "Nam bắt nhịp cho tất cả các bạn hát.",
      "Hè đến, nhà Nam đi nghỉ mát ở Cát Bà.",
      "Nam rất vui khi đi chơi xa với cả nhà."
    ],
    "paragraph": "Hè đến, nhà Nam đi nghỉ mát ở Cát Bà. Mẹ và Nam bỏ áo bơi, bàn chải, khăn mặt vào ba lô. Nam rất vui khi đi chơi xa với cả nhà.",
    "reward": 15
  },
  {
    "id": "b49",
    "week": "Tuần 10",
    "title": "Bài 49: ot ôt ơt",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 49",
    "words": [
      "quả nhót",
      "lá lốt",
      "quả ớt"
    ],
    "sentences": [
      "Vườn nhà bà có ớt, rau ngót và cà rốt.",
      "Sớm nay thức dậy, Nam chợt thấy một chú chim sâu.",
      "Chim hớn hở như chào Nam."
    ],
    "paragraph": "Sớm nay thức dậy, Nam chợt thấy một chú chim sâu. Chim hớn hở như chào Nam. Nó nhảy nhót một hồi rồi bay qua bay lại, tìm bắt sâu bọ cho cây.",
    "reward": 15
  },
  {
    "id": "b50",
    "week": "Tuần 10",
    "title": "Bài 50: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 50",
    "words": [
      "bật lửa",
      "lọ mực",
      "cột mốc",
      "hạt thóc",
      "xúc xắc",
      "gót chân",
      "đôi mắt",
      "lác đác"
    ],
    "sentences": [
      "Hạt thóc nảy mầm.",
      "Gà mẹ dẫn đàn con đi ăn.",
      "Gà mẹ ủ ấm cho các con."
    ],
    "paragraph": "Gà mẹ dẫn đàn con đi ăn. Chốc chốc, tìm thấy mồi, gà mẹ \"tục... tục...\" gọi con. Đàn gà con chạy lại, chen chúc nhau ăn rồi rúc vào bên mẹ. Gà mẹ ủ ấm cho các con.",
    "reward": 15
  },
  {
    "id": "b51",
    "week": "Tuần 11",
    "title": "Bài 51: et êt it",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 51",
    "words": [
      "con vẹt",
      "bồ kết",
      "quả mít"
    ],
    "sentences": [
      "Đôi vẹt ríu rít mãi không hết chuyện.",
      "Tết đến thật gần.",
      "Mấy cây đào đã chi chít lộc non."
    ],
    "paragraph": "Tết đến thật gần. Cái rét vẫn đậm. Mấy cây đào đã chi chít lộc non. Vài nụ tròn đỏ thắm vừa hé nở. Rồi trời ấm dần, đàn én nhỏ lại ríu rít bay về, náo nức đón chào năm mới.",
    "reward": 15
  },
  {
    "id": "b52",
    "week": "Tuần 11",
    "title": "Bài 52: ut ưt",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 52",
    "words": [
      "bút chì",
      "mứt dừa",
      "nứt nẻ"
    ],
    "sentences": [
      "Cầu thủ số 7 thu hút khán giả bằng một cú sút dứt điểm.",
      "Trận đấu thật gay cấn.",
      "Phút chót, số 7 lại bứt phá ghi bàn."
    ],
    "paragraph": "Trận đấu thật gay cấn. Lúc đầu, đội bạn chơi rất hay, đội nhà bị dẫn một bàn. Bất ngờ, cầu thủ số 7 sút xa, tỉ số là một đều. Phút chót, số 7 lại bứt phá ghi bàn. Khán giả hò reo, nhảy múa.",
    "reward": 15
  },
  {
    "id": "b53",
    "week": "Tuần 11",
    "title": "Bài 53: ap ăp âp",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 53",
    "words": [
      "xe đạp",
      "cặp da",
      "cá mập"
    ],
    "sentences": [
      "Mẹ đạp xe đưa Hà đến lớp.",
      "Khắp phố tấp nập.",
      "Thức dậy, tôi có thể đưa bạn chu du khắp nơi, khám phá thế giới hấp dẫn, đầy ắp sắc màu."
    ],
    "paragraph": "Khi ngủ, tôi nằm im lìm, mặt đen sẫm. Thức dậy, tôi có thể đưa bạn chu du khắp nơi, khám phá thế giới hấp dẫn, đầy ắp sắc màu. Bạn có thể xem phim, nghe nhạc để có phút giây thư giãn, ấm áp. Tôi là ai?",
    "reward": 15
  },
  {
    "id": "b54",
    "week": "Tuần 11",
    "title": "Bài 54: op ôp ơp",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 54",
    "words": [
      "con cọp",
      "lốp xe",
      "tia chớp"
    ],
    "sentences": [
      "Mưa rào lộp độp, ếch nhái tụ họp thi hát, cá cờ há miệng đớp mưa.",
      "Họ nhà nhái tụ họp thi hát đón cơn mưa đầu mùa.",
      "Đàn cá cờ lóp ngóp bơi đến, lâu lâu lại ngoi lên đớp mưa."
    ],
    "paragraph": "Mưa rào lộp độp. Họ nhà nhái tụ họp thi hát đón cơn mưa đầu mùa. Mặt ao ran ran bài ca ì ọp, ì ọp. Đàn cá cờ lóp ngóp bơi đến, lâu lâu lại ngoi lên đớp mưa.",
    "reward": 15
  },
  {
    "id": "b55",
    "week": "Tuần 11",
    "title": "Bài 55: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 55",
    "words": [
      "nét chữ",
      "nết na",
      "gặp gỡ",
      "tấp nập",
      "xe đạp",
      "gom góp",
      "hồi hộp",
      "mứt sen"
    ],
    "sentences": [
      "Trời xám xịt, mưa sầm sập như trút.",
      "Một lúc sau, mưa lộp độp rồi dứt hẳn.",
      "Gần hồ có ngọn tháp cao vút."
    ],
    "paragraph": "Trời xám xịt, mưa sầm sập như trút. Sấm sét ì ầm xa xa. Cây cỏ ngả rạp vào nhau. Một lúc sau, mưa lộp độp rồi dứt hẳn. Mặt trời ló khỏi chân mây. Vạn vật như thức dậy, đầy ắp sắc màu.",
    "reward": 15
  },
  {
    "id": "b56",
    "week": "Tuần 12",
    "title": "Bài 56: ep êp ip up",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 56",
    "words": [
      "đôi dép",
      "đầu bếp",
      "bìm bịp",
      "búp sen"
    ],
    "sentences": [
      "Trong bếp, lũ cún con múp míp nép vào bên mẹ.",
      "Dịp nghỉ lễ, nhà Hà có chú Tư và cô Lan đến chơi.",
      "Hà giúp mẹ rửa rau quả và sắp xếp bát đĩa."
    ],
    "paragraph": "Dịp nghỉ lễ, nhà Hà có chú Tư và cô Lan đến chơi. Mẹ nấu súp gà, cơm nếp và rán cá chép. Hà giúp mẹ rửa rau quả và sắp xếp bát đĩa. Bố thì dọn dẹp nhà cửa. Nhà Hà hôm nay thật là vui.",
    "reward": 15
  },
  {
    "id": "b57",
    "week": "Tuần 12",
    "title": "Bài 57: anh ênh inh",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 57",
    "words": [
      "quả chanh",
      "bờ kênh",
      "kính râm"
    ],
    "sentences": [
      "Con kênh xinh xinh chảy qua cánh đồng.",
      "Nhà vịt ở gần một con kênh xinh xinh.",
      "Hôm nay trời đẹp, bố mẹ cho vịt con ra kênh tập bơi."
    ],
    "paragraph": "Nhà vịt ở gần một con kênh xinh xinh. Hôm nay trời đẹp, bố mẹ cho vịt con ra kênh tập bơi. Mới tập mà vịt con đã bơi rất nhanh. Vịt bố vịt mẹ vui quá, kêu cạp cạp. Gia đình vịt làm xôn xao cả mặt kênh.",
    "reward": 15
  },
  {
    "id": "b58",
    "week": "Tuần 12",
    "title": "Bài 58: ach êch ich",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 58",
    "words": [
      "sách vở",
      "chênh lệch",
      "tờ lịch"
    ],
    "sentences": [
      "Ếch con thích đọc sách.",
      "Có một hôm ếch cốm tinh nghịch nấp bờ ao.",
      "Mải rình bắt cào cào, quên sách bên bờ cỏ."
    ],
    "paragraph": "Ếch cốm\nCó một hôm ếch cốm\nTinh nghịch nấp bờ ao\nMải rình bắt cào cào\nQuên sách bên bờ cỏ.\nTới lớp cô hỏi nhỏ:\n– Sách đâu em học bài?\nCậu gãi đầu, gãi tai:\n– Thưa cô, em xin lỗi.\n(Mộc Miên)",
    "reward": 15
  },
  {
    "id": "b59",
    "week": "Tuần 12",
    "title": "Bài 59: ang ăng âng",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 59",
    "words": [
      "cá vàng",
      "măng tre",
      "nhà tầng"
    ],
    "sentences": [
      "Vầng trăng sáng lấp ló sau rặng tre.",
      "Hôm nay trời nắng chang chang, mèo con đi học chẳng mang thứ gì.",
      "Chỉ mang một cái bút chì và mang một mẩu bánh mì con con."
    ],
    "paragraph": "Mèo con đi học\nHôm nay trời nắng chang chang\nMèo con đi học chẳng mang thứ gì\nChỉ mang một cái bút chì\nVà mang một mẩu bánh mì con con.\n(Phan Thị Vàng Anh)",
    "reward": 15
  },
  {
    "id": "b60",
    "week": "Tuần 12",
    "title": "Bài 60: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 60",
    "words": [
      "xinh đẹp",
      "sạch sẽ",
      "thếp giấy",
      "kịp thời",
      "nhanh nhẹn",
      "vâng lời",
      "thích thú",
      "giúp đỡ"
    ],
    "sentences": [
      "Hà rất thích con gà bà cho.",
      "Sáng sáng, Hà dậy sớm chờ gà gáy ò ó o.",
      "Em vẽ vầng trăng sáng."
    ],
    "paragraph": "Hà rất thích con gà bà cho. Sáng sáng, Hà dậy sớm chờ gà gáy ò ó o. Vậy mà mãi nó chẳng gáy. Một hôm, Hà tỉnh giấc nghe gà cục ta cục tác. Giờ Hà đã rõ vì sao con gà chẳng gáy.",
    "reward": 15
  },
  {
    "id": "b61",
    "week": "Tuần 13",
    "title": "Bài 61: ong ông ung ưng",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 61",
    "words": [
      "chong chóng",
      "bông súng",
      "bánh chưng"
    ],
    "sentences": [
      "Những bông hồng rung rinh trong gió.",
      "Nam theo mẹ đi chợ.",
      "Nam thích lắm vì lần đầu cùng mẹ đi chợ."
    ],
    "paragraph": "Nam theo mẹ đi chợ. Chợ đông vui và bán đủ thứ. Ngay từ cổng là những dãy hàng đồ dùng gia đình. Bên trong là hàng rau, thịt và cá. Nam thích lắm vì lần đầu cùng mẹ đi chợ.",
    "reward": 15
  },
  {
    "id": "b62",
    "week": "Tuần 13",
    "title": "Bài 62: iêc iên iêp",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 62",
    "words": [
      "xanh biếc",
      "bờ biển",
      "sò điệp"
    ],
    "sentences": [
      "Biển xanh biếc. Những hòn đảo lớn nhỏ trùng điệp.",
      "Vịnh Hạ Long là một kì quan thiên nhiên.",
      "Du khách thích đến đây ngắm cảnh, tắm mát và đi dạo trên những bãi biển."
    ],
    "paragraph": "Vịnh Hạ Long là một kì quan thiên nhiên. Nơi đây có những hòn đảo lớn nhỏ trùng điệp, soi bóng trên mặt biển xanh biếc. Du khách thích đến đây ngắm cảnh, tắm mát và đi dạo trên những bãi biển.",
    "reward": 15
  },
  {
    "id": "b63",
    "week": "Tuần 13",
    "title": "Bài 63: iêng iêm yên",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 63",
    "words": [
      "sầu riêng",
      "cá kiếm",
      "tổ yến"
    ],
    "sentences": [
      "Yến phụng có bộ lông tím biêng biếc, trông rất diêm dúa.",
      "Hà theo bố đến sân chim.",
      "Sau một ngày đi kiếm ăn, từng đàn chim ríu rít về tổ, trông thật yên bình."
    ],
    "paragraph": "Hà theo bố đến sân chim. Sân chim có cò, diệc, sáo, bồ nông,... Hà chăm chú nhìn những đàn cò trắng, diệc xám bay liệng, đậu kín trên những ngọn cây. Sau một ngày đi kiếm ăn, từng đàn chim ríu rít về tổ, trông thật yên bình.",
    "reward": 15
  },
  {
    "id": "b64",
    "week": "Tuần 13",
    "title": "Bài 64: iêt iêu yêu",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 64",
    "words": [
      "nhiệt kế",
      "con diều",
      "yêu chiều"
    ],
    "sentences": [
      "Em yêu sách. Nhờ có sách, em biết nhiều điều hay.",
      "Bố cho Nam và em chơi thả diều.",
      "Hai anh em thích thú ngắm nhìn những cánh diều sặc sỡ, đáng yêu chao liệng trên bầu trời."
    ],
    "paragraph": "Bố cho Nam và em chơi thả diều. Bố dạy Nam biết cách vừa chạy vừa kéo căng dây và giật giật để con diều có thể bay cao. Hai anh em thích thú ngắm nhìn những cánh diều sặc sỡ, đáng yêu chao liệng trên bầu trời.",
    "reward": 15
  },
  {
    "id": "b65",
    "week": "Tuần 13",
    "title": "Bài 65: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 65",
    "words": [
      "xung phong",
      "hiểu biết",
      "xanh biếc",
      "trùng điệp",
      "yêu mến",
      "yên tĩnh",
      "khiêm tốn",
      "rong biển"
    ],
    "sentences": [
      "Trái đất của chúng ta vô cùng rộng lớn.",
      "Sự sống không ngừng sinh sôi, nảy nở.",
      "Cánh diều chao liệng trên bầu trời."
    ],
    "paragraph": "Trái đất của chúng ta vô cùng rộng lớn. Núi rừng trùng điệp. Đồng xanh bao la. Bầu trời cao rộng. Biển cả mênh mông. Sự sống không ngừng sinh sôi, nảy nở. Chúng ta cần biết yêu quý, giữ gìn và bảo vệ sự sống trên trái đất này.",
    "reward": 15
  },
  {
    "id": "b66",
    "week": "Tuần 14",
    "title": "Bài 66: uôi uôm",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 66",
    "words": [
      "con suối",
      "buổi sáng",
      "quả muỗm"
    ],
    "sentences": [
      "Thuyền buồm xuôi theo chiều gió.",
      "Buổi sớm mai, ông mặt trời nhô lên từ biển.",
      "Phía bến cảng, những chiếc tàu cá nối đuôi nhau vào bờ."
    ],
    "paragraph": "Buổi sớm mai, ông mặt trời nhô lên từ biển. Mặt biển sáng lấp lánh. Đàn hải âu sải cánh bay liệng trên bầu trời. Xa xa là những cánh buồm căng gió. Phía bến cảng, những chiếc tàu cá nối đuôi nhau vào bờ.",
    "reward": 15
  },
  {
    "id": "b67",
    "week": "Tuần 14",
    "title": "Bài 67: uôc uôt",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 67",
    "words": [
      "ngọn đuốc",
      "viên thuốc",
      "con chuột"
    ],
    "sentences": [
      "Mẹ vuốt tóc và buộc nơ cho Hà.",
      "Mẹ cho Hà đi công viên. Cô bé rất thích thú và háo hức.",
      "Mẹ bảo Hà khi đi chơi cần ăn mặc gọn gàng, lịch sự."
    ],
    "paragraph": "Mẹ cho Hà đi công viên. Cô bé rất thích thú và háo hức. Hà mặc váy trắng, đi giày màu hồng. Mẹ còn vuốt tóc và buộc nơ cho Hà. Mẹ bảo Hà khi đi chơi cần ăn mặc gọn gàng, lịch sự.",
    "reward": 15
  },
  {
    "id": "b68",
    "week": "Tuần 14",
    "title": "Bài 68: uôn uông",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 68",
    "words": [
      "cuộn chỉ",
      "buồng chuối",
      "quả chuông"
    ],
    "sentences": [
      "Chuồn chuồn bay qua các luống rau.",
      "Trời sắp mưa. Chuồn chuồn bay thấp.",
      "Mưa tạnh, những hạt mưa long lanh đọng trên các cuống lá."
    ],
    "paragraph": "Trời sắp mưa. Chuồn chuồn bay thấp. Bầu trời đen kịt. Gió thổi mạnh cuốn theo những đám lá khô. Rồi mưa ào ào trút xuống.\nMưa tạnh, những hạt mưa long lanh đọng trên các cuống lá. Bầu trời trong xanh, không khí mát mẻ.",
    "reward": 15
  },
  {
    "id": "b69",
    "week": "Tuần 14",
    "title": "Bài 69: ươi, ươu",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 69",
    "words": [
      "tươi cười",
      "quả bưởi",
      "ốc bươu"
    ],
    "sentences": [
      "Chim khướu biết bắt chước tiếng người.",
      "Lạc đà là con vật đặc biệt.",
      "Lạc đà giúp con người băng qua những vùng sa mạc khô cằn."
    ],
    "paragraph": "Lạc đà là con vật đặc biệt. Nó có cái bướu to trên lưng. Bướu của lạc đà là nơi dự trữ chất béo. Nhờ thế, nó có thể sống qua nhiều ngày mà không cần ăn uống. Lạc đà giúp con người băng qua những vùng sa mạc khô cằn.",
    "reward": 15
  },
  {
    "id": "b70",
    "week": "Tuần 14",
    "title": "Bài 70: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 70",
    "words": [
      "vuốt ve",
      "cưỡi ngựa",
      "tuổi thơ",
      "nhuộm vải",
      "nướu răng",
      "lem luốc",
      "luống cuống",
      "muôn màu"
    ],
    "sentences": [
      "Đôi chim khướu hót vang.",
      "Ông trồng nhiều cây ăn trái.",
      "Chú mèo cuộn tròn sưởi nắng bên thềm."
    ],
    "paragraph": "Ông trồng nhiều cây ăn trái. Khóm chuối xanh tươi đã trổ buồng. Hàng bưởi ra bông trắng muốt. Mấy cây đu đủ quả chín vàng ruộm. Ông còn nuôi nhiều con vật rất đáng yêu. Gà mẹ, gà con ríu rít. Đôi chim khướu hót vang. Chú mèo cuộn tròn sưởi nắng bên thềm.",
    "reward": 15
  },
  {
    "id": "b71",
    "week": "Tuần 15",
    "title": "Bài 71: ươc, ươt",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 71",
    "words": [
      "thước kẻ",
      "dược sĩ",
      "lướt ván"
    ],
    "sentences": [
      "Hà ước được lướt sóng biển.",
      "Lúc học hát, Nam ước làm ca sĩ.",
      "Nhìn lên bầu trời, Nam lại ước làm phi công."
    ],
    "paragraph": "Lúc học hát, Nam ước làm ca sĩ. Lúc nghe mẹ đọc thơ, Nam lại ước trở thành nhà thơ. Khi ra biển, Nam ước là người lái tàu, vượt qua những con sóng lớn. Nhìn lên bầu trời, Nam lại ước làm phi công. Nam tự hỏi: \"Bao giờ mình mới lớn nhỉ?\".",
    "reward": 15
  },
  {
    "id": "b72",
    "week": "Tuần 15",
    "title": "Bài 72: ươm, ươp",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 72",
    "words": [
      "con bướm",
      "nườm nượp",
      "giàn mướp"
    ],
    "sentences": [
      "Hoa mướp vàng ươm, bướm bay rập rờn.",
      "Nắng vàng ươm như mật trải khắp sân.",
      "Chú mèo mướp thảnh thơi nằm sưởi nắng bên thềm."
    ],
    "paragraph": "Nắng vàng ươm như mật trải khắp sân. Chú mèo mướp thảnh thơi nằm sưởi nắng bên thềm. Mắt chú lim dim ra điều thích thú. Mấy sợi ria mép rung rinh. Đừng thấy mèo ta hay nằm dài mà nghĩ chú lười. Sưởi nắng giúp mèo dẻo dai hơn đấy.",
    "reward": 15
  },
  {
    "id": "b73",
    "week": "Tuần 15",
    "title": "Bài 73: ươn, ương",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 73",
    "words": [
      "khu vườn",
      "hạt sương",
      "con đường"
    ],
    "sentences": [
      "Đường tới trường lượn theo sườn đồi.",
      "Buổi sáng, tiếng gà gọi mặt trời thức dậy.",
      "Làng quê rộn ràng những âm thanh của cuộc sống."
    ],
    "paragraph": "Buổi sáng, tiếng gà gọi mặt trời thức dậy. Bầu trời phía đông ửng hồng. Nắng xua tan màn sương. Cây lá bừng tỉnh sau một giấc ngủ dài, vươn mình đón những tia nắng đầu tiên của ngày mới. Làng quê rộn ràng những âm thanh của cuộc sống. Em tới lớp. Mẹ đi làm.",
    "reward": 15
  },
  {
    "id": "b74",
    "week": "Tuần 16",
    "title": "Bài 74: oa, oe",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 74",
    "words": [
      "đoá hoa",
      "váy xoè",
      "chích choè"
    ],
    "sentences": [
      "Các loài hoa đua nhau khoe sắc.",
      "Tết đến, hoa đào khoe sắc hồng tươi, hoa mai vàng nở rộ.",
      "Những sắc hoa, hương hoa làm đẹp thêm cho cuộc sống."
    ],
    "paragraph": "Tết đến, hoa đào khoe sắc hồng tươi, hoa mai vàng nở rộ. Hè sang, hoa phượng bừng lửa đỏ, cháy rực cả góc trời. Cuối thu, hương hoa sữa nồng nàn, ngát thơm từng góc phố. Cuối đông, hoa cải trải thảm vàng rực rỡ bên sông. Những sắc hoa, hương hoa làm đẹp thêm cho cuộc sống.",
    "reward": 15
  },
  {
    "id": "b75",
    "week": "Tuần 16",
    "title": "Bài 75: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 75",
    "words": [
      "lướt sóng",
      "ước mơ",
      "mèo mướp",
      "hạt cườm",
      "bay lượn",
      "nụ hoa",
      "vàng hoe",
      "toả hương"
    ],
    "sentences": [
      "Khắp vườn, hoa toả hương ngào ngạt.",
      "Mặt trời tỉnh giấc, hai má ửng hồng.",
      "Cô gió mang cả hương hoa ùa vào lớp học."
    ],
    "paragraph": "Buổi sớm\nMặt trời tỉnh giấc\nHai má ửng hồng,\nTung đám mây bông\nVươn vai thức dậy.\n\nCô gió thi chạy\nTrong cánh rừng xa,\nMang cả hương hoa\nÙa vào lớp học.\n(Hoàng Minh Ngọc)",
    "reward": 15
  },
  {
    "id": "b76",
    "week": "Tuần 16",
    "title": "Bài 76: oan, oăn, oat, oăt",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 76",
    "words": [
      "hoa xoan",
      "tóc xoăn",
      "hoạt hình",
      "nhọn hoắt"
    ],
    "sentences": [
      "Trên phim hoạt hình, voi bước khoan thai, thỏ chạy thoăn thoắt.",
      "Trong vườn, cây xoan và cây khế đã trổ hoa hàng loạt.",
      "Chúng thoăn thoắt nhảy từ cành này sang cành khác."
    ],
    "paragraph": "Trong vườn, cây xoan và cây khế đã trổ hoa hàng loạt. Vườn cây ngập tràn sắc tím. Mỗi buổi sáng, khu vườn rộn ràng với những tiếng lích ra lích rích của mấy chú chích bông. Chúng thoăn thoắt nhảy từ cành này sang cành khác. Vừa nhảy nhót, chúng vừa trêu đùa nhau, vui thật là vui.",
    "reward": 15
  },
  {
    "id": "b77",
    "week": "Tuần 16",
    "title": "Bài 77: oai, uê, uy",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 77",
    "words": [
      "khoai sọ",
      "vạn tuế",
      "tàu thuỷ"
    ],
    "sentences": [
      "Quê ngoại của Hà có luỹ tre xanh, có cây trái xum xuê.",
      "Ngày nghỉ, Hà thoải mái vui đùa với hoa trái vườn nhà.",
      "Em đưa tay vuốt ve những cánh thuỷ tiên đang thi nhau khoe sắc."
    ],
    "paragraph": "Ngày nghỉ, Hà thoải mái vui đùa với hoa trái vườn nhà. Hà thì thầm với cây xoài lúc lỉu quả. Hà cúi trêu đám dây khoai lang đang bò trên mặt đất. Em cùng gió nô giỡn bên những bông huệ trắng. Em đưa tay vuốt ve những cánh thuỷ tiên đang thi nhau khoe sắc.",
    "reward": 15
  },
  {
    "id": "b78",
    "week": "Tuần 16",
    "title": "Bài 78: uân, uât",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 78",
    "words": [
      "tuần tra",
      "mùa xuân",
      "võ thuật"
    ],
    "sentences": [
      "Chúng em xem chương trình nghệ thuật chào xuân.",
      "Gần Tết, bố và Hà đi chợ hoa mua đào và quất.",
      "Cả nhà cùng vui đón xuân."
    ],
    "paragraph": "Gần Tết, bố và Hà đi chợ hoa mua đào và quất. Cành đào chi chít lộc non, những nụ hoa phớt hồng đang e ấp nở. Cây quất xum xuê, quả vàng óng. Mẹ nhìn bố và Hà nói: \"Hai bố con đem cả mùa xuân về nhà rồi đấy\". Cả nhà cùng vui đón xuân.",
    "reward": 15
  },
  {
    "id": "b79",
    "week": "Tuần 16",
    "title": "Bài 79: uyên, uyêt",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 79",
    "words": [
      "con thuyền",
      "trăng khuyết",
      "truyền thuyết"
    ],
    "sentences": [
      "Bà kể chuyện hay tuyệt.",
      "Sân nhà em sáng quá / Nhờ ánh trăng sáng ngời.",
      "Những hôm nào trăng khuyết, / Trông giống con thuyền trôi."
    ],
    "paragraph": "Trăng sáng\nSân nhà em sáng quá\nNhờ ánh trăng sáng ngời.\nTrăng tròn như cái đĩa\nLơ lửng mà không rơi.\n\nNhững hôm nào trăng khuyết,\nTrông giống con thuyền trôi.\nEm đi trăng theo bước\nNhư muốn cùng đi chơi.\n(Nhược Thuỷ)",
    "reward": 15
  },
  {
    "id": "b80",
    "week": "Tuần 16",
    "title": "Bài 80: Ôn tập và kể chuyện",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 80",
    "words": [
      "ngoan ngoãn",
      "tuyệt vời",
      "thoăn thoắt",
      "lưu loát",
      "ngoái lại",
      "vành khuyên",
      "xum xuê",
      "tuần lễ"
    ],
    "sentences": [
      "Xuân về, đào nở thắm, quất trĩu quả.",
      "Mỗi lần về quê, Hà lại được bà kể cho nghe nhiều câu chuyện hay.",
      "Giọng kể của bà trầm ấm."
    ],
    "paragraph": "Mỗi lần về quê, Hà lại được bà kể cho nghe nhiều câu chuyện hay. Nào là truyền thuyết về Lạc Long Quân, truyền thuyết Thánh Gióng, truyền thuyết về hồ Hoàn Kiếm. Nào là sự tích cây quất, sự tích cây xoài,... Giọng kể của bà trầm ấm. Hà bị cuốn vào các câu chuyện suốt từ đầu cho đến cuối.",
    "reward": 15
  },
  {
    "id": "b81",
    "week": "Tuần 17",
    "title": "Bài 81: Ôn tập",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 81",
    "words": [
      "hoa đào",
      "hoa mai",
      "câu đối",
      "tranh gà",
      "tươi sáng",
      "nở hoa"
    ],
    "sentences": [
      "Hoa đào trước ngõ / Cười tươi sáng hồng.",
      "Mẹ phơi áo hoa / Em dán tranh gà / Ông treo câu đối",
      "Tết đang vào nhà / Sắp thêm một tuổi / Đất trời nở hoa."
    ],
    "paragraph": "Tết đang vào nhà\nHoa đào trước ngõ\nCười tươi sáng hồng\nHoa mai trong vườn\nLung linh cánh trắng\n\nSân nhà đầy nắng\nMẹ phơi áo hoa\nEm dán tranh gà\nÔng treo câu đối\n\nTết đang vào nhà\nSắp thêm một tuổi\nĐất trời nở hoa.\n(Nguyễn Hồng Kiên)",
    "reward": 15
  },
  {
    "id": "b82",
    "week": "Tuần 17",
    "title": "Bài 82: Ôn tập",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 82",
    "words": [
      "mùa xuân",
      "bầu trời",
      "nắng vàng",
      "hoa bưởi",
      "chích choè",
      "trầm ngâm"
    ],
    "sentences": [
      "Bầu trời ngày một thêm xanh.",
      "Vườn cây lại đâm chồi nảy lộc.",
      "Vườn cây lại rộn rã tiếng chim."
    ],
    "paragraph": "Mùa xuân đến\nBầu trời ngày một thêm xanh. Nắng vàng ngày càng rực rỡ. Vườn cây lại đâm chồi nảy lộc. Rồi vườn cây ra hoa. Hoa bưởi nồng nàn. Hoa nhãn ngọt. Hoa cau thơm dịu. Vườn cây lại rộn rã tiếng chim. Những anh chích choè nhanh nhảu. Những chú khướu lắm điều. Những bác cu gáy trầm ngâm.\n(Theo Nguyễn Kiên)",
    "reward": 15
  },
  {
    "id": "b83",
    "week": "Tuần 18",
    "title": "Bài 83: Ôn tập",
    "source": "SGK Tiếng Việt 1 Tập 1 - Bài 83",
    "words": [
      "thi tài",
      "lễ phép",
      "nắng hồng",
      "cầu vồng",
      "mênh mông",
      "luỹ tre"
    ],
    "sentences": [
      "Khỉ bày mưu giúp voi.",
      "Thấy voi to lớn mà sợ một con vật nhỏ bé, hổ sợ quá, liền bỏ chạy.",
      "Làng tôi có luỹ tre xanh / Có dòng sông nhỏ uốn quanh xóm làng."
    ],
    "paragraph": "Voi, hổ và khỉ\nThua hổ trong một cuộc thi tài, voi phải nộp mạng cho hổ. Khỉ bày mưu giúp voi. Khỉ cưỡi voi đi gặp hổ. Đến điểm hẹn, khỉ quát lớn:\n– Hổ ở đâu?\nVoi tỏ vẻ lễ phép:\n– Thưa ông, hổ sắp tới rồi ạ.\nHổ ngồi trong bụi cây nhìn ra. Thấy voi to lớn mà sợ một con vật nhỏ bé, hổ sợ quá, liền bỏ chạy.\n(Phỏng theo Truyện cổ dân gian Khơ-me)",
    "reward": 15
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
