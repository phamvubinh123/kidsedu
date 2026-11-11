/* =========================================================
   VƯƠNG QUỐC TRI THỨC - Logic ứng dụng
   CHỈ dùng cú pháp ES5 (var, function) để chạy được trên Safari iPad cũ.
   ========================================================= */
(function () {
  "use strict";

  // ---------------------------------------------------------
  // 1. ÂM THANH (Web Audio API) & GIỌNG ĐỌC
  // ---------------------------------------------------------
  var Sound = {
    ctx: null,
    init: function () {
      if (!this.ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (AC) { try { this.ctx = new AC(); } catch (e) {} }
      }
      if (this.ctx && this.ctx.state === "suspended") { this.ctx.resume(); }
    },
    tone: function (freq, type, start, dur, vol, slideTo) {
      if (!state.sound) return;
      this.init();
      if (!this.ctx) return;
      var t = this.ctx.currentTime + (start || 0);
      var o = this.ctx.createOscillator();
      var g = this.ctx.createGain();
      o.type = type || "sine";
      o.frequency.setValueAtTime(freq, t);
      if (slideTo) { o.frequency.exponentialRampToValueAtTime(slideTo, t + dur); }
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol || 0.25, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(this.ctx.destination);
      o.start(t); o.stop(t + dur + 0.02);
    },
    click: function () { this.tone(880, "sine", 0, 0.07, 0.15, 1200); },
    flip: function () { this.tone(500, "triangle", 0, 0.12, 0.18, 900); },
    pop: function () { this.tone(320, "square", 0, 0.08, 0.15, 1400); this.tone(1600, "sine", 0.03, 0.08, 0.1); },
    coin: function () { this.tone(988, "square", 0, 0.08, 0.12); this.tone(1319, "square", 0.08, 0.22, 0.12); },
    good: function () {
      var n = [523.25, 659.25, 783.99, 1046.5];
      for (var i = 0; i < n.length; i++) { this.tone(n[i], "triangle", i * 0.08, 0.2, 0.25); }
      this.tone(2093, "sine", 0.32, 0.25, 0.08);
    },
    bad: function () { this.tone(330, "sawtooth", 0, 0.15, 0.12, 250); this.tone(247, "sawtooth", 0.15, 0.25, 0.12, 180); },
    fanfare: function () {
      var n = [523.25, 523.25, 659.25, 783.99, 659.25, 783.99, 1046.5];
      var d = [0, 0.12, 0.24, 0.36, 0.52, 0.64, 0.8];
      for (var i = 0; i < n.length; i++) { this.tone(n[i], "triangle", d[i], i === n.length - 1 ? 0.6 : 0.16, 0.25); this.tone(n[i] / 2, "sine", d[i], 0.16, 0.12); }
    },
    speak: function (text, lang) {
      if (!state.sound || !("speechSynthesis" in window) || !text) return;
      try {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(text);
        u.lang = lang || "vi-VN";
        u.rate = lang === "en-US" ? 0.8 : 0.95;
        window.speechSynthesis.speak(u);
      } catch (e) {}
    },
    stopSpeak: function () { try { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); } catch (e) {} }
  };

  // ---------------------------------------------------------
  // 2. DỮ LIỆU GAME: chế độ chơi, huy hiệu, nhân vật cửa hàng
  // ---------------------------------------------------------
  var MODES = [
    { id: "quiz", name: "Phiến Đá Bí Ẩn", icon: "📜", reward: 10, desc: "Chọn đáp án đúng" },
    { id: "memory", name: "Lật Thẻ Thần Kỳ", icon: "🃏", reward: 15, desc: "Tìm cặp giống nhau" },
    { id: "balloon", name: "Bóng Bay Tri Thức", icon: "🎈", reward: 20, desc: "Bắn bóng đáp án" }
  ];

  var BADGES = [
    { icon: "🌱", name: "Mầm Non", need: 3 },
    { icon: "🥉", name: "Huy Hiệu Đồng", need: 10 },
    { icon: "🥈", name: "Huy Hiệu Bạc", need: 20 },
    { icon: "🥇", name: "Huy Hiệu Vàng", need: 35 },
    { icon: "🏆", name: "Cúp Vô Địch", need: 45 },
    { icon: "👑", name: "Vua Tri Thức", need: 51 }
  ];

  var LEVELS = ["Mầm Non Chăm Chỉ", "Bé Ngoan Hiếu Học", "Ong Nhỏ Thông Thái", "Nhà Thám Hiểm Nhí", "Ngôi Sao Lớp 1", "Kiện Tướng Tri Thức", "Siêu Trí Tuệ Nhí"];

  var AVATARS = [
    { id: "hero", name: "Hiệp Sĩ Nhí", price: 0, img: "assets/mascot.jpg", emoji: "🧒" },
    { id: "cat", name: "Mèo Mướp", price: 20, emoji: "🐱" },
    { id: "dog", name: "Cún Con", price: 20, emoji: "🐶" },
    { id: "bunny", name: "Thỏ Ngọc", price: 30, emoji: "🐰" },
    { id: "panda", name: "Gấu Trúc", price: 40, emoji: "🐼" },
    { id: "fox", name: "Cáo Đỏ", price: 50, emoji: "🦊" },
    { id: "koala", name: "Koala", price: 60, emoji: "🐨" },
    { id: "tiger", name: "Hổ Vàng", price: 70, emoji: "🐯" },
    { id: "lion", name: "Sư Tử", price: 80, emoji: "🦁" },
    { id: "frog", name: "Ếch Xanh", price: 90, emoji: "🐸" },
    { id: "robot", name: "Rô-bốt", price: 110, emoji: "🤖" },
    { id: "unicorn", name: "Kỳ Lân", price: 130, emoji: "🦄" },
    { id: "princess", name: "Công Chúa", price: 150, emoji: "👸" },
    { id: "dragon", name: "Rồng Thần", price: 200, emoji: "🐲" },
    { id: "alien", name: "Bạn Ngoài Hành Tinh", price: 250, emoji: "👽" }
  ];

  var PRAISE = ["Giỏi quá! 🎉", "Xuất sắc luôn! 🌟", "Đúng rồi! Bé thông minh ghê! 💯", "Tuyệt vời! 🏆", "Siêu quá đi! ✨", "Chuẩn không cần chỉnh! 👍"];
  var RETRY = ["Gần đúng rồi! Thử lại nhé 💪", "Ối, chưa đúng! Bé nghĩ thêm chút nha 🤔", "Cố lên! Chọn lại nào 😊"];

  // ---------------------------------------------------------
  // 3. TRẠNG THÁI & LƯU TRỮ (localStorage)
  // ---------------------------------------------------------
  var STORE_KEY = "vqtt_state_v1";
  var state = {
    name: "BÉ YÊU",
    coins: 0,
    avatar: "hero",
    owned: ["hero"],
    progress: {},      // "math|count" -> { quiz: 2, memory: 0, balloon: 3 }
    sound: true,
    autoRead: true,
    unlockAll: false
  };

  function loadState() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var s = JSON.parse(raw);
        for (var k in s) { if (s.hasOwnProperty(k)) state[k] = s[k]; }
      } else {
        // Chuyển sao từ bản cũ sang xu
        var oldStars = parseInt(localStorage.getItem("edu1_stars"), 10);
        if (oldStars > 0) state.coins = oldStars;
      }
    } catch (e) {}
  }
  function saveState() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function unitKey(subj, topic) { return subj + "|" + topic; }
  function unitStars(subj, topic) {
    var p = state.progress[unitKey(subj, topic)];
    if (!p) return 0;
    var m = 0;
    for (var k in p) { if (p.hasOwnProperty(k) && p[k] > m) m = p[k]; }
    return m;
  }
  function subjectStars(subj) {
    var units = UNITS[subj], t = 0;
    for (var i = 0; i < units.length; i++) t += unitStars(subj, units[i].topic);
    return t;
  }
  function totalStars() {
    var t = 0;
    for (var i = 0; i < SUBJECTS.length; i++) t += subjectStars(SUBJECTS[i].id);
    return t;
  }
  function maxTotalStars() {
    var t = 0;
    for (var i = 0; i < SUBJECTS.length; i++) t += UNITS[SUBJECTS[i].id].length * 3;
    return t;
  }
  function isUnlocked(subj, idx) {
    if (state.unlockAll || idx === 0) return true;
    return unitStars(subj, UNITS[subj][idx - 1].topic) >= 1;
  }
  function getAvatar(id) {
    for (var i = 0; i < AVATARS.length; i++) if (AVATARS[i].id === id) return AVATARS[i];
    return AVATARS[0];
  }

  // ---------------------------------------------------------
  // 4. TIỆN ÍCH
  // ---------------------------------------------------------
  function $(id) { return document.getElementById(id); }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function hasClass(el, c) { return (" " + el.className + " ").indexOf(" " + c + " ") > -1; }
  function addClass(el, c) { if (!hasClass(el, c)) el.className = (el.className + " " + c).replace(/^\s+/, ""); }
  function removeClass(el, c) { el.className = (" " + el.className + " ").replace(" " + c + " ", " ").replace(/^\s+|\s+$/g, ""); }
  function onTap(el, fn) { el.addEventListener("click", fn, false); }
  function setTransform(el, v) { el.style.webkitTransform = v; el.style.transform = v; }
  function setTransition(el, v) { el.style.webkitTransition = v.replace(/transform/g, "-webkit-transform"); el.style.transition = v; }

  function avatarHTML(id) {
    var a = getAvatar(id);
    if (a.img) {
      return '<img class="avatar-img" src="' + a.img + '" alt="" onerror="this.parentNode.innerHTML=\'' + a.emoji + '\'">';
    }
    return a.emoji;
  }
  function mascotHTML() {
    return '<img src="assets/mascot.jpg" alt="" onerror="this.parentNode.innerHTML=\'🧒\'">';
  }

  function confetti(n) {
    var box = $("confettiBox");
    var items = ["⭐", "🌟", "🎉", "✨", "🎈", "💖", "🍬"];
    for (var i = 0; i < (n || 18); i++) {
      var el = document.createElement("div");
      el.className = "confetti";
      el.innerHTML = pick(items);
      el.style.left = Math.floor(Math.random() * 96) + "%";
      el.style.webkitAnimationDelay = el.style.animationDelay = (Math.random() * 0.6) + "s";
      el.style.fontSize = (20 + Math.floor(Math.random() * 20)) + "px";
      box.appendChild(el);
      (function (node) { setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); }, 2600); })(el);
    }
  }
  function floatPoints(text, el) {
    var r = el.getBoundingClientRect();
    var f = document.createElement("div");
    f.className = "float-pts";
    f.innerHTML = text;
    f.style.left = (r.left + r.width / 2 - 30) + "px";
    f.style.top = (r.top - 10) + "px";
    document.body.appendChild(f);
    setTimeout(function () { if (f.parentNode) f.parentNode.removeChild(f); }, 1100);
  }

  // ---------------------------------------------------------
  // 5. ĐIỀU HƯỚNG MÀN HÌNH & OVERLAY
  // ---------------------------------------------------------
  function showScreen(id) {
    var screens = document.querySelectorAll(".screen");
    for (var i = 0; i < screens.length; i++) removeClass(screens[i], "active");
    addClass($(id), "active");
    window.scrollTo(0, 0);
  }
  function openOverlay(id) { addClass($(id), "open"); }
  function closeOverlay(id) { removeClass($(id), "open"); }

  // ---------------------------------------------------------
  // 6. MÀN HÌNH CHÍNH
  // ---------------------------------------------------------
  function renderHome() {
    $("homeAvatar").innerHTML = avatarHTML(state.avatar);
    $("kidName").innerHTML = esc(state.name);
    $("coinCount").innerHTML = state.coins;
    var ts = totalStars();
    var lv = Math.min(LEVELS.length - 1, Math.floor(ts / 8));
    $("kidLevel").innerHTML = "Cấp " + (lv + 1) + " • " + LEVELS[lv] + " • " + ts + "⭐";

    var html = "";
    for (var i = 0; i < BADGES.length; i++) {
      html += '<span class="' + (ts >= BADGES[i].need ? "" : "locked") + '">' + BADGES[i].icon + "</span>";
    }
    $("badgeStripItems").innerHTML = html;

    var map = "";
    for (var s = 0; s < SUBJECTS.length; s++) {
      var sj = SUBJECTS[s];
      map += '<div class="island" data-subj="' + sj.id + '">' +
        '<div class="island-pic"><div class="island-fallback">' + sj.emoji + '</div>' +
        '<img src="' + sj.img + '" alt="" onerror="this.style.display=\'none\'"></div>' +
        '<div class="island-label">' + sj.name + '<small>⭐ ' + subjectStars(sj.id) + "/" + (UNITS[sj.id].length * 3) + "</small></div>" +
        "</div>";
    }
    $("islandMap").innerHTML = map;
    var isl = $("islandMap").querySelectorAll(".island");
    for (var k = 0; k < isl.length; k++) {
      onTap(isl[k], function () {
        Sound.click();
        openSubject(this.getAttribute("data-subj"));
      });
    }
  }

  // ---------------------------------------------------------
  // 7. BẢN ĐỒ BÀI HỌC CỦA TỪNG ĐẢO
  // ---------------------------------------------------------
  var curSubj = "math", curUnitIdx = 0, curMode = "quiz";

  function subjectById(id) {
    for (var i = 0; i < SUBJECTS.length; i++) if (SUBJECTS[i].id === id) return SUBJECTS[i];
    return SUBJECTS[0];
  }

  function openSubject(subj) {
    curSubj = subj;
    renderMap();
    showScreen("screenMap");
  }

  function starsHTML(n) {
    var h = "";
    for (var i = 0; i < 3; i++) h += '<span class="' + (i < n ? "" : "off") + '">⭐</span>';
    return h;
  }

  function renderMap() {
    var sj = subjectById(curSubj);
    var units = UNITS[curSubj];
    $("mapSubjName").innerHTML = "ĐẢO: " + sj.short;
    $("mapStars").innerHTML = subjectStars(curSubj) + "/" + (units.length * 3);
    var html = "", nextMarked = false;
    for (var i = 0; i < units.length; i++) {
      var u = units[i];
      var unlocked = isUnlocked(curSubj, i);
      var st = unitStars(curSubj, u.topic);
      var cls = "unit-node " + (i % 2 === 0 ? "left" : "right");
      if (!unlocked) cls += " locked";
      if (unlocked && st === 0 && !nextMarked) { cls += " next"; nextMarked = true; }
      html += '<div class="' + cls + '" data-idx="' + i + '">' +
        '<div class="unit-stars">' + starsHTML(st) + "</div>" +
        '<div class="unit-no">BÀI ' + (i + 1) + "</div>" +
        '<div class="unit-sign"><div class="unit-trophy">🏆 ' + bestScoreText(curSubj, u.topic) + '</div>' +
        '<div class="unit-title"><span class="unit-icon">' + u.icon + "</span>" + u.title + "</div></div>" +
        '<div class="mini-island"><div class="mi-top"></div><div class="mi-rock"></div><div class="mi-cloud l"></div><div class="mi-cloud r"></div></div>' +
        (unlocked ? "" : '<div class="unit-lock">🔒</div>') +
        "</div>";
    }
    $("unitPath").innerHTML = html;
    var nodes = $("unitPath").querySelectorAll(".unit-node");
    for (var k = 0; k < nodes.length; k++) {
      onTap(nodes[k], function () {
        var idx = parseInt(this.getAttribute("data-idx"), 10);
        if (!isUnlocked(curSubj, idx)) {
          Sound.bad();
          addClass(this, "shake-it");
          showToastBubble("Bé cần đạt ít nhất 1 ⭐ ở bài trước để mở khóa bài này nhé!");
          return;
        }
        Sound.click();
        curUnitIdx = idx;
        openModePicker();
      });
    }
  }

  function bestScoreText(subj, topic) {
    var p = state.progress[unitKey(subj, topic)];
    var n = 0;
    if (p) { for (var k in p) if (p.hasOwnProperty(k) && p[k] > 0) n++; }
    return n + "/3";
  }

  function showToastBubble(msg) {
    $("infoTitle").innerHTML = "🔒 Chưa mở khóa";
    $("infoBody").innerHTML = '<div class="guide-item"><span class="gi-ic">🧒</span><div>' + msg + "</div></div>";
    openOverlay("infoOverlay");
  }

  // ---------------------------------------------------------
  // 8. CHỌN CHẾ ĐỘ CHƠI
  // ---------------------------------------------------------
  function openModePicker() {
    var u = UNITS[curSubj][curUnitIdx];
    $("modeTitle").innerHTML = "Bài " + (curUnitIdx + 1) + ": " + u.icon + " " + u.title;
    var p = state.progress[unitKey(curSubj, u.topic)] || {};
    var html = "";
    for (var i = 0; i < MODES.length; i++) {
      var m = MODES[i];
      html += '<div class="mode-card' + (m.id === curMode ? " sel" : "") + '" data-mode="' + m.id + '">' +
        '<div class="mc-head"><div class="mc-name">' + m.name + '</div><div class="mc-best">' + starsMini(p[m.id] || 0) + "</div></div>" +
        '<div class="mc-body"><div class="mc-icon">' + m.icon + '</div><div class="mc-reward">x' + m.reward + ' <i class="coin sm"></i></div>' +
        '<div class="mc-desc">' + m.desc + "</div></div></div>";
    }
    $("modeCards").innerHTML = html;
    var cards = $("modeCards").querySelectorAll(".mode-card");
    for (var k = 0; k < cards.length; k++) {
      onTap(cards[k], function () {
        Sound.flip();
        curMode = this.getAttribute("data-mode");
        var all = $("modeCards").querySelectorAll(".mode-card");
        for (var j = 0; j < all.length; j++) removeClass(all[j], "sel");
        addClass(this, "sel");
      });
    }
    openOverlay("modeOverlay");
  }
  function starsMini(n) {
    var h = "";
    for (var i = 0; i < 3; i++) h += i < n ? "★" : "☆";
    return h;
  }

  // ---------------------------------------------------------
  // 9. ENGINE TRÒ CHƠI
  // ---------------------------------------------------------
  var game = null;
  var timers = [];
  function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
  function clearTimers() { for (var i = 0; i < timers.length; i++) clearTimeout(timers[i]); timers = []; }

  function unitQuestions(subj, topic) {
    var bank = QUESTION_BANK[subj] || [], out = [];
    for (var i = 0; i < bank.length; i++) if (bank[i].topic === topic) out.push(bank[i]);
    return out;
  }

  function startGame() {
    clearTimers();
    Sound.stopSpeak();
    var u = UNITS[curSubj][curUnitIdx];
    var qs = shuffle(unitQuestions(curSubj, u.topic).slice());
    game = { subj: curSubj, topic: u.topic, mode: curMode, score: 0, max: 0, idx: 0, list: [], tries: 0, locked: false, lang: curSubj === "eng" ? "en-US" : "vi-VN" };

    $("mascotImg").innerHTML = mascotHTML();
    $("hudScore").innerHTML = "0";
    $("hudBar").style.width = "0%";
    $("boardLesson").innerHTML = u.icon + " " + u.title;

    if (curMode === "memory") {
      var pairs = buildPairs(qs);
      if (pairs.length < 3) {
        // Không đủ cặp trong bài -> lấy thêm từ cả môn
        pairs = buildPairs(shuffle((QUESTION_BANK[curSubj] || []).slice()));
      }
      game.pairs = pairs.slice(0, pairs.length >= 6 ? 6 : Math.min(4, pairs.length));
      game.max = game.pairs.length * 10;
      showScreen("screenGame");
      renderMemory();
    } else {
      game.list = qs.slice(0, curMode === "balloon" ? 6 : 8);
      game.max = game.list.length * 10;
      showScreen("screenGame");
      nextQuestion();
    }
  }

  function updateHud() {
    $("hudScore").innerHTML = game.score;
    var pct = game.max ? Math.min(100, Math.round(game.score / game.max * 100)) : 0;
    $("hudBar").style.width = pct + "%";
  }

  function say(msg, kind) {
    var b = $("mascotBubble");
    b.className = "bubble" + (kind ? " " + kind : "");
    b.innerHTML = msg;
    void b.offsetWidth;
    addClass(b, "pulse");
  }

  function readPrompt(q) {
    if (!state.autoRead || !q) return;
    if (game.lang === "en-US") {
      Sound.speak(q.speakText || q.answer, "en-US");
    } else {
      Sound.speak(q.prompt.replace(/\.\.\./g, " gì "), "vi-VN");
    }
  }

  // ----- Hiển thị minh họa câu hỏi -----
  function visualHTML(q, compact) {
    if (q.visualType === "icons") return '<div class="v-icons">' + esc(q.visual) + "</div>";
    if (q.visualType === "formula") return '<div class="v-formula">' + esc(q.visual) + "</div>";
    if (q.visualType === "split") {
      return '<div class="split-tree"><div class="split-top">' + q.visualData.top + '</div>' +
        '<div class="split-lines">↙&nbsp;&nbsp;&nbsp;&nbsp;↘</div>' +
        '<div class="split-row"><span class="split-bottom">' + q.visualData.left + '</span><span class="split-bottom">' + q.visualData.right + "</span></div></div>";
    }
    if (q.visualType === "word") return '<div class="v-icons">' + esc(q.visual) + '</div><div class="v-word">' + esc(q.word) + "</div>";
    if (q.visualType === "eng") return '<div class="v-icons">' + esc(q.visual) + '</div><div class="v-word v-eng">' + esc(q.word) + "</div>";
    if (q.visualType === "poem") return '<div class="v-poem">' + esc(q.visual) + "</div>";
    return "";
  }

  function nextQuestion() {
    clearTimers();
    if (game.idx >= game.list.length) { finishGame(); return; }
    var q = game.list[game.idx];
    game.tries = 0;
    game.locked = false;
    $("boardHead").innerHTML = "Câu " + (game.idx + 1) + "/" + game.list.length;
    $("boardPrompt").innerHTML = esc(q.prompt);
    if (game.mode === "balloon") renderBalloon(q); else renderQuiz(q);
    readPrompt(q);
  }

  // ===== CHẾ ĐỘ 1: PHIẾN ĐÁ BÍ ẨN (trắc nghiệm) =====
  function renderQuiz(q) {
    say(game.idx === 0 ? "Bé chọn phiến đá có đáp án đúng nhé!" : pick(["Câu tiếp theo nè!", "Cố lên bé ơi! 💪", "Bé làm được mà! 😊"]));
    var opts = shuffle(q.options.slice());
    var html = '<div class="visual-card">' + visualHTML(q) + '</div><div class="stone-grid">';
    for (var i = 0; i < opts.length; i++) {
      var longCls = String(opts[i]).length > 9 ? " long" : "";
      html += '<button class="stone' + longCls + '" style="-webkit-animation-delay:' + (i * 0.06) + 's;animation-delay:' + (i * 0.06) + 's" data-val="' + esc(opts[i]) + '">' + esc(opts[i]) + "</button>";
    }
    html += "</div>";
    $("gameStage").innerHTML = html;
    var stones = $("gameStage").querySelectorAll(".stone");
    for (var k = 0; k < stones.length; k++) {
      onTap(stones[k], function () { answerQuiz(this, q); });
    }
  }

  function answerQuiz(btn, q) {
    if (game.locked || hasClass(btn, "disabled")) return;
    var val = btn.getAttribute("data-val");
    if (val === q.answer) {
      game.locked = true;
      addClass(btn, "correct");
      var pts = game.tries === 0 ? 10 : 5;
      game.score += pts;
      updateHud();
      floatPoints("+" + pts, btn);
      Sound.good();
      if (game.lang === "en-US" && q.speakText) later(function () { Sound.speak(q.speakText, "en-US"); }, 450);
      say(pick(PRAISE), "good");
      if (game.tries === 0 && Math.random() < 0.35) confetti(8);
      later(function () { game.idx++; nextQuestion(); }, 1500);
    } else {
      game.tries++;
      addClass(btn, "wrong");
      addClass(btn, "disabled");
      Sound.bad();
      if (game.tries >= 2) {
        game.locked = true;
        var all = $("gameStage").querySelectorAll(".stone");
        for (var i = 0; i < all.length; i++) if (all[i].getAttribute("data-val") === q.answer) addClass(all[i], "correct");
        say("Đáp án đúng là: <b>" + esc(q.answer) + "</b>. Lần sau bé nhớ nhé! 😉", "bad");
        later(function () { game.idx++; nextQuestion(); }, 2300);
      } else {
        say(pick(RETRY), "bad");
      }
    }
  }

  // ===== CHẾ ĐỘ 2: BÓNG BAY TRI THỨC =====
  var BALLOON_COLORS = ["b-red", "b-blue", "b-green", "b-purple", "b-orange"];
  function renderBalloon(q) {
    say(game.idx === 0 ? "Chạm vào quả bóng có đáp án đúng trước khi nó bay mất nhé! 🎈" : "Bóng đang bay lên kìa! Nhanh tay nào!");
    var mini = "";
    if (q.visualType === "split") mini = q.visualData.top + " gồm " + q.visualData.left + " và " + q.visualData.right;
    else if (q.visualType === "word" || q.visualType === "eng") mini = q.visual + "  " + q.word;
    else if (q.visualType === "poem") mini = "";
    else mini = q.visual;
    var html = '<div class="balloon-arena" id="arena">' + (mini ? '<div class="mini-visual">' + esc(mini) + "</div>" : "") + "</div>";
    if (q.visualType === "poem") html = '<div class="visual-card">' + visualHTML(q) + "</div>" + html;
    $("gameStage").innerHTML = html;

    var arena = $("arena");
    var opts = shuffle(q.options.slice());
    var colors = shuffle(BALLOON_COLORS.slice());
    var h = arena.offsetHeight || 340;
    var n = opts.length;
    var duration = 7.5;   // giây bay hết màn hình (chậm, phù hợp bé 6 tuổi)
    var correctEnd = 0;
    for (var i = 0; i < n; i++) {
      var b = document.createElement("div");
      b.className = "balloon " + colors[i % colors.length];
      b.style.left = (i * (100 / n) + (100 / n - 24) / 2) + "%";
      b.setAttribute("data-val", opts[i]);
      var longCls = String(opts[i]).length > 7 ? " long" : "";
      b.innerHTML = '<div class="balloon-body' + longCls + '">' + esc(opts[i]) + '</div><div class="balloon-string"></div>';
      arena.appendChild(b);
      var delay = i * 0.5 + Math.random() * 0.4;
      var dur = duration + Math.random() * 1.5;
      if (opts[i] === q.answer) correctEnd = (delay + dur) * 1000;
      (function (el, d, du) {
        void el.offsetHeight;
        setTransition(el, "transform " + du + "s linear " + d + "s");
        setTransform(el, "translateY(-" + (h + 170) + "px)");
      })(b, delay, dur);
      onTap(b, function () { answerBalloon(this, q); });
    }
    // Nếu bóng đúng bay mất mà bé chưa bắn -> cho bay lại 1 lần, rồi mới hiện đáp án
    later(function () {
      if (game.locked) return;
      game.tries++;
      if (game.tries >= 2) {
        game.locked = true;
        say("Bóng bay mất rồi! Đáp án là: <b>" + esc(q.answer) + "</b> 😉", "bad");
        Sound.bad();
        later(function () { game.idx++; nextQuestion(); }, 2200);
      } else {
        say("Ôi bóng bay mất rồi! Thả lại lần nữa nhé 🎈", "bad");
        later(function () { var t = game.tries; renderBalloon(q); game.tries = t; }, 900);
      }
    }, correctEnd + 200);
  }

  function answerBalloon(el, q) {
    if (game.locked || hasClass(el, "popped")) return;
    var val = el.getAttribute("data-val");
    var arena = $("arena");
    var r = el.getBoundingClientRect(), ar = arena.getBoundingClientRect();
    var star = document.createElement("div");
    star.className = "pop-star";
    star.style.left = (r.left - ar.left + r.width / 2 - 20) + "px";
    star.style.top = (r.top - ar.top + 20) + "px";
    if (val === q.answer) {
      game.locked = true;
      star.innerHTML = "🌟";
      arena.appendChild(star);
      addClass(el, "ok");
      Sound.pop();
      later(function () { addClass(el, "popped"); Sound.good(); }, 150);
      var pts = game.tries === 0 ? 10 : 5;
      game.score += pts;
      updateHud();
      floatPoints("+" + pts, el);
      say(pick(PRAISE), "good");
      if (game.lang === "en-US" && q.speakText) later(function () { Sound.speak(q.speakText, "en-US"); }, 500);
      later(function () { game.idx++; nextQuestion(); }, 1600);
    } else {
      star.innerHTML = "💨";
      arena.appendChild(star);
      addClass(el, "popped");
      Sound.pop(); later(function () { Sound.bad(); }, 100);
      game.tries = Math.max(game.tries, 1);
      say(pick(RETRY), "bad");
    }
  }

  // ===== CHẾ ĐỘ 3: LẬT THẺ THẦN KỲ =====
  function isEmojiOnly(s) { return !/[A-Za-z0-9À-ỹ]/.test(s); }

  function buildPairs(qs) {
    var pairs = [], usedA = {}, usedL = {};
    for (var i = 0; i < qs.length; i++) {
      var q = qs[i], left = null, right = q.answer;
      if (q.visualType === "word" || q.visualType === "eng") {
        left = String(q.visual).split(" ")[0];
      } else if (q.visualType === "formula") {
        var f = String(q.visual).replace(/\s*=\s*\?\s*$/, "");
        if (f.indexOf("?") === -1 && f.length <= 11 && /[+\-]/.test(f)) left = f;
      } else if (q.visualType === "icons") {
        var v = String(q.visual).replace(/\n/g, "");
        if (v.length <= 24 && /^\d+$/.test(q.answer)) left = v;
      } else if (q.visualType === "split") {
        if (q.visualData.left === "?") left = q.visualData.top + " = ? + " + q.visualData.right;
        else left = q.visualData.top + " = " + q.visualData.left + " + ?";
      }
      if (!left || String(right).length > 12) continue;
      if (usedA[right] || usedL[left]) continue;
      usedA[right] = true; usedL[left] = true;
      pairs.push({ a: left, b: right, speak: q.speakText || right });
      if (pairs.length >= 6) break;
    }
    return pairs;
  }

  function renderMemory() {
    clearTimers();
    var pairs = game.pairs;
    game.flipped = []; game.matched = 0; game.misses = 0; game.locked = false;
    $("boardHead").innerHTML = "Lật thẻ";
    $("boardPrompt").innerHTML = "Lật 2 thẻ để tìm cặp <b>hình - đáp án</b> đi cùng nhau!";
    say("Bé hãy nhớ vị trí các thẻ nhé! 🧠");

    var cards = [];
    for (var i = 0; i < pairs.length; i++) {
      cards.push({ id: i, text: pairs[i].a });
      cards.push({ id: i, text: pairs[i].b });
    }
    shuffle(cards);
    var cols3 = cards.length <= 6 || cards.length === 9 ? " cols3" : "";
    var html = '<div class="memory-board' + cols3 + '">';
    for (var k = 0; k < cards.length; k++) {
      var emo = isEmojiOnly(String(cards[k].text)) ? " emo" : "";
      html += '<div class="mcard" data-id="' + cards[k].id + '"><div class="mcard-inner">' +
        '<div class="mface back">✦</div><div class="mface front' + emo + '">' + esc(cards[k].text) + "</div></div></div>";
    }
    html += "</div>";
    $("gameStage").innerHTML = html;
    var els = $("gameStage").querySelectorAll(".mcard");
    for (var j = 0; j < els.length; j++) onTap(els[j], function () { flipCard(this); });
    if (state.autoRead) Sound.speak("Lật hai thẻ để tìm cặp đi cùng nhau", "vi-VN");
  }

  function flipCard(el) {
    if (game.locked || hasClass(el, "flipped") || hasClass(el, "matched")) return;
    Sound.flip();
    addClass(el, "flipped");
    game.flipped.push(el);
    if (game.flipped.length < 2) return;
    game.locked = true;
    var a = game.flipped[0], b = game.flipped[1];
    if (a.getAttribute("data-id") === b.getAttribute("data-id")) {
      later(function () {
        removeClass(a, "flipped"); removeClass(b, "flipped");
        addClass(a, "matched"); addClass(b, "matched");
        game.matched++;
        game.score += 10;
        updateHud();
        floatPoints("+10", b);
        Sound.good();
        var p = game.pairs[parseInt(a.getAttribute("data-id"), 10)];
        if (game.lang === "en-US") later(function () { Sound.speak(p.speak, "en-US"); }, 400);
        say(pick(PRAISE), "good");
        game.flipped = []; game.locked = false;
        if (game.matched >= game.pairs.length) later(function () {
          // trừ điểm nhẹ nếu lật sai nhiều
          game.score = Math.max(Math.round(game.max * 0.4), game.score - Math.max(0, game.misses - game.pairs.length) * 3);
          finishGame();
        }, 1200);
      }, 450);
    } else {
      game.misses++;
      later(function () {
        Sound.bad();
        say(pick(["Chưa khớp rồi! Thử lại nha 🙂", "Nhớ vị trí thẻ nhé bé!", "Gần đúng rồi đó! 💪"]), "bad");
        removeClass(a, "flipped"); removeClass(b, "flipped");
        game.flipped = []; game.locked = false;
      }, 1000);
    }
  }

  // ===== KẾT THÚC & PHẦN THƯỞNG =====
  function finishGame() {
    clearTimers();
    var ratio = game.max ? game.score / game.max : 0;
    var stars = ratio >= 0.9 ? 3 : ratio >= 0.65 ? 2 : ratio >= 0.35 ? 1 : 0;
    var mode = null;
    for (var i = 0; i < MODES.length; i++) if (MODES[i].id === game.mode) mode = MODES[i];
    var coins = stars > 0 ? Math.round(mode.reward * stars / 3) : 2;

    var key = unitKey(game.subj, game.topic);
    if (!state.progress[key]) state.progress[key] = {};
    var oldBest = state.progress[key][game.mode] || 0;
    var badgesBefore = countBadges();
    if (stars > oldBest) state.progress[key][game.mode] = stars;
    state.coins += coins;
    saveState();
    var newBadge = countBadges() > badgesBefore;

    $("resultTitle").innerHTML = stars === 3 ? "XUẤT SẮC!" : stars === 2 ? "GIỎI LẮM!" : stars === 1 ? "HOÀN THÀNH!" : "CỐ LÊN NÀO!";
    var sh = "";
    for (var s = 0; s < 3; s++) sh += '<span class="' + (s < stars ? "" : "off") + '" style="-webkit-animation-delay:' + (0.2 + s * 0.25) + 's;animation-delay:' + (0.2 + s * 0.25) + 's">⭐</span>';
    $("resultStars").innerHTML = sh;
    $("resultScore").innerHTML = "Điểm: " + game.score + " / " + game.max + (newBadge ? "<br>🏅 Bé nhận được huy hiệu mới!" : "");
    $("resultCoins").innerHTML = "+" + coins + ' <i class="coin big"></i>';
    openOverlay("resultOverlay");
    if (stars >= 2) { Sound.fanfare(); confetti(26); } else { Sound.good(); }
    later(function () { Sound.coin(); }, 900);
    var msg = stars === 3 ? "Tuyệt vời! Bé đạt 3 sao!" : stars === 2 ? "Giỏi lắm! Bé đạt 2 sao!" : stars === 1 ? "Bé hoàn thành rồi! Chơi lại để được nhiều sao hơn nhé!" : "Không sao đâu, mình chơi lại nhé!";
    later(function () { if (state.autoRead) Sound.speak(msg, "vi-VN"); }, 1300);
  }

  function countBadges() {
    var ts = totalStars(), n = 0;
    for (var i = 0; i < BADGES.length; i++) if (ts >= BADGES[i].need) n++;
    return n;
  }

  // ---------------------------------------------------------
  // 10. HUY HIỆU / CỬA HÀNG / HƯỚNG DẪN / CÀI ĐẶT
  // ---------------------------------------------------------
  function openBadges() {
    var ts = totalStars();
    var html = '<div style="text-align:center;margin-bottom:12px;font-weight:800;color:#2a5aa0">Bé đã có <b>' + ts + "/" + maxTotalStars() + " ⭐</b></div><div class=\"grid-cards\">";
    for (var i = 0; i < BADGES.length; i++) {
      var b = BADGES[i], ok = ts >= b.need;
      html += '<div class="badge-card' + (ok ? "" : " locked") + '"><div class="badge-ic">' + b.icon + '</div><div class="badge-name">' + b.name + '</div><div class="badge-req">' + (ok ? "Đã đạt ✅" : "Cần " + b.need + " ⭐") + "</div></div>";
    }
    html += "</div>";
    $("infoTitle").innerHTML = "🏅 Bộ Sưu Tập Huy Hiệu";
    $("infoBody").innerHTML = html;
    openOverlay("infoOverlay");
  }

  function openShop() {
    var html = '<div style="text-align:center;margin-bottom:12px;font-weight:800;color:#2a5aa0">Bé đang có <b>' + state.coins + '</b> <i class="coin sm"></i> • Chạm để mua / chọn nhân vật</div><div class="grid-cards">';
    for (var i = 0; i < AVATARS.length; i++) {
      var a = AVATARS[i];
      var owned = state.owned.indexOf(a.id) > -1;
      var using = state.avatar === a.id;
      html += '<div class="shop-card' + (owned ? " owned" : "") + (using ? " using" : "") + '" data-id="' + a.id + '">' +
        '<div class="shop-ic">' + avatarHTML(a.id) + '</div><div class="shop-name">' + a.name + "</div>" +
        '<div class="shop-price">' + (using ? "Đang dùng ✅" : owned ? "Chọn" : a.price + ' <i class="coin sm"></i>') + "</div></div>";
    }
    html += "</div>";
    $("infoTitle").innerHTML = "🛒 Cửa Hàng Nhân Vật";
    $("infoBody").innerHTML = html;
    var cards = $("infoBody").querySelectorAll(".shop-card");
    for (var k = 0; k < cards.length; k++) {
      onTap(cards[k], function () {
        var a = getAvatar(this.getAttribute("data-id"));
        if (state.owned.indexOf(a.id) > -1) {
          state.avatar = a.id; Sound.click();
        } else if (state.coins >= a.price) {
          state.coins -= a.price; state.owned.push(a.id); state.avatar = a.id;
          Sound.coin(); confetti(14);
        } else {
          Sound.bad();
          this.querySelector(".shop-price").innerHTML = "Cần thêm " + (a.price - state.coins) + ' <i class="coin sm"></i>';
          return;
        }
        saveState(); renderHome(); openShop();
      });
    }
    openOverlay("infoOverlay");
  }

  function openGuide() {
    $("infoTitle").innerHTML = "❓ Hướng Dẫn";
    $("infoBody").innerHTML =
      '<div class="guide-item"><span class="gi-ic">🏝️</span><div>Chạm vào một <b>hòn đảo</b> (Toán, Tiếng Việt, Tiếng Anh) để vào bản đồ bài học.</div></div>' +
      '<div class="guide-item"><span class="gi-ic">🔒</span><div>Mỗi bài đạt ít nhất <b>1 ⭐</b> sẽ mở khóa bài tiếp theo.</div></div>' +
      '<div class="guide-item"><span class="gi-ic">📜</span><div><b>Phiến Đá Bí Ẩn:</b> chọn phiến đá có đáp án đúng. Sai lần đầu được chọn lại.</div></div>' +
      '<div class="guide-item"><span class="gi-ic">🃏</span><div><b>Lật Thẻ Thần Kỳ:</b> lật 2 thẻ để ghép cặp hình với đáp án.</div></div>' +
      '<div class="guide-item"><span class="gi-ic">🎈</span><div><b>Bóng Bay Tri Thức:</b> chạm quả bóng có đáp án đúng trước khi bóng bay mất.</div></div>' +
      '<div class="guide-item"><span class="gi-ic">🔊</span><div>Bấm nút <b>loa</b> để nghe đọc câu hỏi (Tiếng Anh đọc chuẩn giọng bản xứ).</div></div>' +
      '<div class="guide-item"><span class="gi-ic">🛒</span><div>Dùng <b>xu vàng</b> kiếm được để mua nhân vật mới trong Cửa hàng.</div></div>';
    openOverlay("infoOverlay");
  }

  function openSettings() {
    $("infoTitle").innerHTML = "⚙️ Cài Đặt (dành cho Bố Mẹ)";
    $("infoBody").innerHTML =
      '<div class="set-row"><span>👦 Tên bé: <b id="setName">' + esc(state.name) + '</b></span><button class="small-btn" id="renameBtn">Đổi tên</button></div>' +
      '<div class="set-row"><span>🔊 Âm thanh & giọng đọc</span><button class="toggle' + (state.sound ? " on" : "") + '" data-key="sound"></button></div>' +
      '<div class="set-row"><span>🗣️ Tự động đọc câu hỏi</span><button class="toggle' + (state.autoRead ? " on" : "") + '" data-key="autoRead"></button></div>' +
      '<div class="set-row"><span>🔓 Mở khóa tất cả bài</span><button class="toggle' + (state.unlockAll ? " on" : "") + '" data-key="unlockAll"></button></div>' +
      '<div class="set-row"><span>🗑️ Xóa toàn bộ tiến độ</span><button class="small-btn red" id="resetBtn">Xóa</button></div>';
    var toggles = $("infoBody").querySelectorAll(".toggle");
    for (var i = 0; i < toggles.length; i++) {
      onTap(toggles[i], function () {
        var k = this.getAttribute("data-key");
        state[k] = !state[k];
        if (state[k]) addClass(this, "on"); else removeClass(this, "on");
        saveState(); Sound.click();
      });
    }
    onTap($("renameBtn"), function () {
      var n = window.prompt("Nhập tên của bé:", state.name);
      if (n && n.replace(/\s/g, "").length) {
        state.name = n.substring(0, 18).toUpperCase();
        saveState(); renderHome();
        $("setName").innerHTML = esc(state.name);
      }
    });
    onTap($("resetBtn"), function () {
      if (window.confirm("Xóa toàn bộ sao, xu và nhân vật đã mua?")) {
        state.coins = 0; state.progress = {}; state.owned = ["hero"]; state.avatar = "hero";
        saveState(); renderHome(); closeOverlay("infoOverlay");
      }
    });
    openOverlay("infoOverlay");
  }

  // ---------------------------------------------------------
  // 11. GẮN SỰ KIỆN
  // ---------------------------------------------------------
  function bindEvents() {
    // Mở khóa âm thanh iOS ở lần chạm đầu tiên
    document.addEventListener("touchstart", function unlock() {
      Sound.init();
      document.removeEventListener("touchstart", unlock, false);
    }, false);

    onTap($("settingsBtn"), function () { Sound.click(); openSettings(); });
    onTap($("profileBtn"), function () { Sound.click(); openShop(); });
    onTap($("homeAvatar"), function () { Sound.click(); openShop(); });
    onTap($("badgeStrip"), function () { Sound.click(); openBadges(); });

    var navs = document.querySelectorAll(".nav-item");
    for (var i = 0; i < navs.length; i++) {
      onTap(navs[i], function () {
        Sound.click();
        var n = this.getAttribute("data-nav");
        if (n === "badges") openBadges();
        else if (n === "shop") openShop();
        else if (n === "guide") openGuide();
      });
    }

    onTap($("mapBackBtn"), function () { Sound.click(); renderHome(); showScreen("screenHome"); });

    onTap($("playBtn"), function () { Sound.click(); closeOverlay("modeOverlay"); startGame(); });

    var closers = document.querySelectorAll("[data-close]");
    for (var c = 0; c < closers.length; c++) {
      onTap(closers[c], function () { Sound.click(); closeOverlay(this.getAttribute("data-close")); });
    }
    // Chạm ra ngoài panel để đóng (trừ kết quả & tạm dừng)
    var ovs = ["modeOverlay", "infoOverlay"];
    for (var o = 0; o < ovs.length; o++) {
      (function (id) {
        onTap($(id), function (e) { if (e.target === $(id)) closeOverlay(id); });
      })(ovs[o]);
    }

    onTap($("speakBtn"), function () {
      Sound.click();
      if (!game) return;
      if (game.mode === "memory") { Sound.speak("Lật hai thẻ để tìm cặp đi cùng nhau", "vi-VN"); return; }
      var q = game.list[game.idx];
      if (!q) return;
      if (game.lang === "en-US") Sound.speak(q.speakText || q.answer, "en-US");
      else Sound.speak(q.prompt.replace(/\.\.\./g, " gì "), "vi-VN");
    });

    onTap($("pauseBtn"), function () {
      Sound.click();
      $("pauseMascot").innerHTML = mascotHTML();
      openOverlay("pauseOverlay");
    });
    onTap($("resumeBtn"), function () { Sound.click(); closeOverlay("pauseOverlay"); });
    onTap($("quitBtn"), function () {
      Sound.click(); clearTimers(); Sound.stopSpeak();
      closeOverlay("pauseOverlay");
      renderMap(); showScreen("screenMap");
    });

    onTap($("replayBtn"), function () { Sound.click(); closeOverlay("resultOverlay"); startGame(); });
    onTap($("toMapBtn"), function () {
      Sound.click(); closeOverlay("resultOverlay"); Sound.stopSpeak();
      renderMap(); showScreen("screenMap");
    });
  }

  // ---------------------------------------------------------
  // 12. KHỞI ĐỘNG
  // ---------------------------------------------------------
  loadState();
  bindEvents();
  renderHome();

  // Chế độ xem thử cho phụ huynh/kiểm thử: index.html#demo=map:math hoặc #demo=game:eng:0:balloon
  var demo = (location.hash.match(/demo=([^&]+)/) || [])[1];
  if (demo) {
    var parts = demo.split(":");
    if (parts[0] === "map") { openSubject(parts[1] || "math"); }
    if (parts[0] === "game") {
      curSubj = parts[1] || "math"; curUnitIdx = parseInt(parts[2] || "0", 10); curMode = parts[3] || "quiz";
      if (parts[4] === "pick") { renderMap(); showScreen("screenMap"); openModePicker(); } else { startGame(); }
    }
  }
})();
