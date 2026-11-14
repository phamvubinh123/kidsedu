/* =========================================================
   VƯƠNG QUỐC TRI THỨC - Logic ứng dụng
   CHỈ dùng cú pháp ES5 (var, function) để chạy được trên Safari iPad cũ.
   ========================================================= */
(function () {
  "use strict";

  // ---------------------------------------------------------
  // 1. ÂM THANH (Web Audio API) & GIỌNG ĐỌC
  // ---------------------------------------------------------
  // Cache voice đã tìm được để không phải tìm lại nhiều lần
  var cachedVoiceVi = null;
  var cachedVoiceEn = null;
  function findBestVoices() {
    if (!("speechSynthesis" in window) || typeof window.speechSynthesis.getVoices !== "function") return;
    try {
      var voices = window.speechSynthesis.getVoices();
      if (!voices || !voices.length) return;
      var bestVi = null, bestEn = null;
      for (var i = 0; i < voices.length; i++) {
        var v = voices[i];
        var vlang = (v.lang || "").toLowerCase().replace(/_/g, "-");
        var vname = (v.name || "").toLowerCase();
        if (vlang.indexOf("vi") === 0 || vname.indexOf("vietnam") !== -1 || vname.indexOf("tiếng việt") !== -1) {
          if (!bestVi) {
            bestVi = v;
          } else {
            var isBetter = (vname.indexOf("enhanced") !== -1 || vname.indexOf("premium") !== -1 || vname.indexOf("natural") !== -1 || vname.indexOf("google") !== -1);
            if (isBetter) bestVi = v;
          }
        }
        if (vlang === "en-us" || vlang.indexOf("en") === 0) {
          if (!bestEn) {
            bestEn = v;
          } else {
            var isBetterEn = (vlang === "en-us" && (vname.indexOf("enhanced") !== -1 || vname.indexOf("natural") !== -1 || vname.indexOf("google") !== -1 || vname.indexOf("samantha") !== -1));
            if (isBetterEn) bestEn = v;
          }
        }
      }
      if (bestVi) cachedVoiceVi = bestVi;
      if (bestEn) cachedVoiceEn = bestEn;
    } catch (e) {}
  }
  if ("speechSynthesis" in window) {
    findBestVoices();
    if (typeof window.speechSynthesis.addEventListener === "function") {
      window.speechSynthesis.addEventListener("voiceschanged", findBestVoices);
    } else {
      window.speechSynthesis.onvoiceschanged = findBestVoices;
    }
  }

  // Trên iOS Safari, getVoices() thường trả về mảng rỗng cho tới khi có tương tác người dùng
  if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("touchstart", function () {
      if (!cachedVoiceVi || !cachedVoiceEn) findBestVoices();
    }, false);
    document.addEventListener("click", function () {
      if (!cachedVoiceVi || !cachedVoiceEn) findBestVoices();
    }, false);
  }

  // Hệ thống giọng đọc tự nhiên (Google Neural TTS trực tuyến làm chính, tự động dự phòng Web Speech API khi mất mạng)
  var ttsGen = 0;
  var ttsAudioUnlocked = false;
  var ttsWatchdog = null;

  function getTTSAudio() {
    var a = $("ttsAudio");
    if (!a) {
      a = document.createElement("audio");
      a.id = "ttsAudio";
      a.style.display = "none";
      document.body.appendChild(a);
    }
    return a;
  }

  function unlockTTSAudio() {
    if (ttsAudioUnlocked) return;
    ttsAudioUnlocked = true;
    try {
      var a = getTTSAudio();
      if (a && (!a.src || a.paused)) {
        a.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
        var p = a.play();
        if (p && typeof p.then === "function") {
          p.then(function () { try { a.pause(); a.currentTime = 0; } catch (e) {} }).catch(function () {});
        }
      }
    } catch (e) {}
  }

  function stopFallbackTTS() {
    if (ttsWatchdog) { clearTimeout(ttsWatchdog); ttsWatchdog = null; }
    try {
      var a = getTTSAudio();
      if (a) {
        a.onended = null;
        a.onerror = null;
        a.onplaying = null;
        a.pause();
        a.currentTime = 0;
      }
    } catch (e) {}
  }

  function splitTTSChunks(text, maxLen) {
    var limit = maxLen || 160;
    var s = String(text || "").replace(/\s+/g, " ").trim();
    if (!s) return [];
    if (s.length <= limit) return [s];
    var chunks = [];
    while (s.length > limit) {
      var slice = s.slice(0, limit);
      var cut = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("! "), slice.lastIndexOf("? "), slice.lastIndexOf(", "));
      if (cut < Math.floor(limit * 0.4)) cut = slice.lastIndexOf(" ");
      if (cut <= 0) cut = limit;
      chunks.push(s.slice(0, cut + 1).trim());
      s = s.slice(cut + 1).trim();
    }
    if (s) chunks.push(s);
    return chunks;
  }

  function playNaturalTTS(text, lang, rate, myGen, onFail) {
    if (!text || myGen !== ttsGen) return;
    var chunks = splitTTSChunks(text, 160);
    if (!chunks.length) return;
    var tl = lang || "vi";
    var playRate = rate || (tl === "en" ? 0.92 : 1.0);
    var idx = 0;

    function playNext() {
      if (myGen !== ttsGen || idx >= chunks.length) return;
      try {
        var a = getTTSAudio();
        var chunk = chunks[idx++];
        var started = false;
        if (ttsWatchdog) { clearTimeout(ttsWatchdog); ttsWatchdog = null; }

        a.onplaying = function () {
          started = true;
          if (ttsWatchdog) { clearTimeout(ttsWatchdog); ttsWatchdog = null; }
        };
        a.onended = function () {
          if (ttsWatchdog) { clearTimeout(ttsWatchdog); ttsWatchdog = null; }
          if (myGen === ttsGen && idx < chunks.length) {
            playNext();
          }
        };
        a.onerror = function () {
          if (ttsWatchdog) { clearTimeout(ttsWatchdog); ttsWatchdog = null; }
          if (myGen === ttsGen && !started && typeof onFail === "function") {
            onFail();
          }
        };

        a.src = "https://translate.google.com/translate_tts?ie=UTF-8&tl=" + tl + "&client=tw-ob&q=" + encodeURIComponent(chunk);
        try { a.playbackRate = playRate; } catch (e) {}

        ttsWatchdog = setTimeout(function () {
          if (myGen === ttsGen && !started) {
            stopFallbackTTS();
            if (typeof onFail === "function") onFail();
          }
        }, 1800);

        var p = a.play();
        if (p && typeof p.catch === "function") {
          p.catch(function () {
            if (ttsWatchdog) { clearTimeout(ttsWatchdog); ttsWatchdog = null; }
            if (myGen === ttsGen && !started && typeof onFail === "function") {
              onFail();
            }
          });
        }
      } catch (e) {
        if (typeof onFail === "function") onFail();
      }
    }

    playNext();
  }

  function speakWebSpeech(cleanText, targetLang, rate, myGen) {
    if (myGen !== ttsGen || !("speechSynthesis" in window)) return;
    var isVi = targetLang.indexOf("vi") === 0;
    if (isVi) {
      if (!cachedVoiceVi) findBestVoices();
      if (!cachedVoiceVi) return;
    } else if (targetLang.indexOf("en") === 0) {
      if (!cachedVoiceEn) findBestVoices();
      if (!cachedVoiceEn) return;
    }
    try {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      var u = new SpeechSynthesisUtterance(cleanText);
      u.lang = targetLang;
      u.rate = rate || (targetLang === "en-US" ? 0.85 : 0.96);
      u.pitch = 1.08;
      if (isVi && cachedVoiceVi) u.voice = cachedVoiceVi;
      else if (targetLang.indexOf("en") === 0 && cachedVoiceEn) u.voice = cachedVoiceEn;
      setTimeout(function () {
        if (myGen !== ttsGen) return;
        try { window.speechSynthesis.speak(u); } catch (e) {}
      }, 30);
    } catch (e) {}
  }

  // Chuẩn hóa phát âm Tiếng Việt lớp 1 cho Web Speech API
  function cleanVietnamesePhonetics(text) {
    if (!text) return "";
    var s = String(text).normalize ? String(text).normalize("NFC") : String(text);

    // 1. Loại bỏ emoji / icon biểu tượng để TTS không đọc tên tiếng Anh
    s = s.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, " ");
    s = s.replace(/[\u2600-\u27BF]/g, " ");

    // 2. Nếu là chữ cái, âm tiết hoặc vần đơn lẻ được yêu cầu phát âm:
    var trimmed = s.trim();
    var singleMap = {
      "c": "cờ", "k": "ca", "q": "quy", "qu": "quờ",
      "b": "bờ", "d": "dờ", "đ": "đờ", "g": "gờ",
      "gh": "gờ kép", "h": "hờ", "l": "lờ", "m": "mờ",
      "n": "nờ", "p": "pờ", "ph": "phờ", "r": "rờ",
      "s": "sờ", "t": "tờ", "th": "thờ", "tr": "trờ",
      "v": "vờ", "x": "xờ", "ch": "chờ", "kh": "khờ",
      "nh": "nhờ", "ng": "ngờ", "ngh": "ngờ kép", "gi": "giê",
      "ưa": "vần ưa", "ua": "vần ua", "ia": "vần ia",
      "an": "vần an", "ăn": "vần ăn", "ân": "vần ân",
      "on": "vần on", "ôn": "vần ôn", "ơn": "vần ơn",
      "en": "vần en", "ên": "vần ên", "in": "vần in", "un": "vần un",
      "am": "vần am", "ăm": "vần ăm", "âm": "vần âm",
      "om": "vần om", "ôm": "vần ôm", "ơm": "vần ơm",
      "ai": "vần ai", "ay": "vần ay", "ây": "vần ây",
      "ao": "vần ao", "eo": "vần eo",
      "anh": "vần anh", "ach": "vần ach",
      "ăng": "vần ăng", "ang": "vần ang", "ong": "vần ong", "ông": "vần ông",
      "iêu": "vần iêu", "uôi": "vần uôi", "ươm": "vần ươm",
      "oa": "vần oa", "oan": "vần oan", "uân": "vần uân", "uyên": "vần uyên"
    };
    if (singleMap.hasOwnProperty(trimmed.toLowerCase())) {
      return singleMap[trimmed.toLowerCase()];
    }

    // 3. Chuẩn hóa tên các âm chữ cái trong văn bản (chỉ khớp âm đứng độc lập, không đè từ như "âm bé", "âm thanh")
    var amList = [
      ["ngh", "âm ngờ kép"], ["gh", "âm gờ"], ["ph", "âm phờ"], ["qu", "âm quờ"],
      ["th", "âm thờ"], ["tr", "âm trờ"], ["ch", "âm chờ"], ["kh", "âm khờ"],
      ["nh", "âm nhờ"], ["ng", "âm ngờ"],
      ["c", "âm cờ"], ["k", "âm cờ"], ["b", "âm bờ"], ["d", "âm dờ"], ["đ", "âm đờ"],
      ["g", "âm gờ"], ["h", "âm hờ"], ["l", "âm lờ"], ["m", "âm mờ"], ["n", "âm nờ"],
      ["p", "âm pờ"], ["r", "âm rờ"], ["s", "âm sờ"], ["t", "âm tờ"], ["v", "âm vờ"], ["x", "âm xờ"]
    ];
    for (var ai = 0; ai < amList.length; ai++) {
      var reAm = new RegExp("(^|[\\s('\"“‘])(?:âm|bắt đầu bằng)\\s+['\"‘“]?" + amList[ai][0] + "['\"’”]?(?=[\\s.,!?;:)'\"”’]|$)", "gi");
      s = s.replace(reAm, function (m, p1) {
        return p1 + (m.toLowerCase().indexOf("bắt đầu bằng") !== -1 ? "bắt đầu bằng " : "") + amList[ai][1];
      });
    }

    // Chuẩn hóa chữ in hoa "BÉ" để TTS không đọc nhầm thành "bớ"
    s = s.replace(/(^|[\s('"“‘])BÉ(?=[\s.,!?;:)'"”’]|$)/g, "$1bé");

    s = s.replace(/['"‘“]?c['"’”]?\s+hay\s+['"‘“]?k['"’”]?/gi, "cờ hay ca");
    s = s.replace(/['"‘“]?g['"’”]?\s+hay\s+['"‘“]?gh['"’”]?/gi, "gờ đơn hay gờ kép");
    s = s.replace(/['"‘“]?ng['"’”]?\s+hay\s+['"‘“]?ngh['"’”]?/gi, "ngờ đơn hay ngờ kép");

    // Xóa dấu nháy đơn, ngoặc vuông toán học, dấu chấm lửng, ký tự phân tách
    s = s.replace(/\[\s*\?\s*\]/g, "mấy");
    s = s.replace(/\s*(\||->|=>|➡️)\s*/g, ", ");
    s = s.replace(/\s*\.\.\.\s*/g, " ");
    s = s.replace(/['"“”‘’]/g, " ");
    s = s.replace(/\s{2,}/g, " ").trim();
    return s;
  }

  var Sound = {
    ctx: null,
    bgmTimer: null,
    bgmPlaying: false,
    bgmStep: 0,
    init: function () {
      if (!this.ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (AC) { try { this.ctx = new AC(); } catch (e) {} }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        try { this.ctx.resume(); } catch (e) {}
      }
      if (this.ctx && !this._unlocked) {
        this._unlocked = true;
        try {
          var buf = this.ctx.createBuffer(1, 1, 22050);
          var src = this.ctx.createBufferSource();
          src.buffer = buf;
          src.connect(this.ctx.destination);
          if (typeof src.start === "function") { src.start(0); }
          else if (typeof src.noteOn === "function") { src.noteOn(0); }
        } catch (e) {}
      }
    },
    tone: function (freq, type, start, dur, vol, slideTo, destNode) {
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
      o.connect(g); g.connect(destNode || this.ctx.destination);
      o.onended = function () {
        try { o.disconnect(); g.disconnect(); } catch (e) {}
      };
      o.start(t); o.stop(t + dur + 0.02);
    },
    click: function () { this.tone(880, "sine", 0, 0.07, 0.15, 1200); },
    flip: function () { this.tone(500, "triangle", 0, 0.12, 0.18, 900); },
    pop: function () { this.tone(320, "square", 0, 0.08, 0.15, 1400); this.tone(1600, "sine", 0.03, 0.08, 0.1); },
    wordPop: function () {
      this.tone(680, "sine", 0, 0.07, 0.2, 1200);
      this.tone(1360, "triangle", 0.02, 0.06, 0.12);
    },
    coin: function () { this.tone(988, "square", 0, 0.08, 0.12); this.tone(1319, "square", 0.08, 0.22, 0.12); },
    countNote: function (n) {
      var scale = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50, 1174.66, 1318.51];
      var idx = Math.max(0, Math.min(scale.length - 1, (n || 1) - 1));
      var freq = scale[idx];
      this.tone(freq, "triangle", 0, 0.16, 0.22);
      this.tone(freq * 2, "sine", 0.01, 0.10, 0.09);
    },
    sparkle: function () {
      var notes = [783.99, 1046.50, 1318.51, 1567.98];
      for (var i = 0; i < notes.length; i++) {
        this.tone(notes[i], "sine", i * 0.055, 0.20, 0.16);
      }
    },
    good: function () {
      // Nhạc vui nhộn tươi sáng + chuông gió lấp lánh khi bé chọn đúng
      this.init();
      if (!this.ctx || !state.sound) return;
      var notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      var times = [0, 0.07, 0.14, 0.21, 0.30];
      for (var i = 0; i < notes.length; i++) {
        this.tone(notes[i], "triangle", times[i], i === notes.length - 1 ? 0.34 : 0.16, 0.24);
        this.tone(notes[i] * 1.5, "sine", times[i] + 0.02, 0.14, 0.09);
      }
      this.tone(1567.98, "sine", 0.36, 0.32, 0.20);
    },
    bad: function () {
      // Nhạc buồn đi xuống nhẹ nhàng (sad wah-wah) khi bé chọn sai
      this.init();
      if (!this.ctx || !state.sound) return;
      this.tone(392.00, "triangle", 0.00, 0.18, 0.22, 370.00);
      this.tone(349.23, "triangle", 0.18, 0.18, 0.22, 329.63);
      this.tone(311.13, "triangle", 0.36, 0.38, 0.24, 246.94);
      this.tone(196.00, "sine", 0.36, 0.38, 0.14, 164.81);
    },
    fanfare: function () {
      var n = [523.25, 523.25, 659.25, 783.99, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      var d = [0, 0.10, 0.20, 0.30, 0.42, 0.54, 0.68, 0.86, 1.10];
      for (var i = 0; i < n.length; i++) {
        this.tone(n[i], "triangle", d[i], i === n.length - 1 ? 0.8 : 0.18, 0.26);
        this.tone(n[i] / 2, "sine", d[i], 0.20, 0.14);
      }
    },
    startBGM: function () {
      if (!state.bgm || !state.sound || this.bgmPlaying) return;
      this.init();
      if (!this.ctx) return;
      if (this.bgmTimer) {
        clearInterval(this.bgmTimer);
        this.bgmTimer = null;
      }
      if (!this.bgmGain) {
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.value = 1;
        this.bgmGain.connect(this.ctx.destination);
      } else {
        try { this.bgmGain.gain.setValueAtTime(1, this.ctx.currentTime); } catch (e) {}
      }
      this.bgmPlaying = true;
      var self = this;

      // NHẠC NỀN CHILL BOSSA / ACOUSTIC ÊM DỊU (~107 BPM, Cmaj7 - Am7 - Fmaj7 - G6)
      // Giai điệu piano/guitar nhẹ nhàng, thư giãn giúp bé tập trung học lâu không bị chói tai
      var lead = [
        // Cmaj7
        659.25, 0, 783.99, 987.77, 0, 783.99, 659.25, 523.25,
        // Am7
        587.33, 0, 659.25, 783.99, 0, 659.25, 523.25, 440.00,
        // Fmaj7
        523.25, 0, 659.25, 880.00, 0, 783.99, 659.25, 523.25,
        // G6 -> G7
        587.33, 0, 659.25, 783.99, 659.25, 587.33, 493.88, 0
      ];

      // Đệm guitar rải hợp âm êm dịu
      var arp = [
        329.63, 392.00, 493.88, 392.00, 329.63, 392.00, 493.88, 392.00,
        261.63, 329.63, 392.00, 329.63, 261.63, 329.63, 392.00, 329.63,
        261.63, 349.23, 440.00, 349.23, 261.63, 349.23, 440.00, 349.23,
        293.66, 392.00, 493.88, 392.00, 293.66, 349.23, 392.00, 349.23
      ];

      // Bass bossa-nova ấm áp
      var bass = [
        130.81, 0, 0, 196.00, 130.81, 0, 196.00, 0,
        110.00, 0, 0, 164.81, 110.00, 0, 164.81, 0,
        87.31,  0, 0, 130.81, 87.31,  0, 130.81, 0,
        98.00,  0, 0, 146.83, 98.00,  0, 146.83, 0
      ];

      this.bgmStep = 0;
      this.bgmTimer = setInterval(function () {
        if (!state.bgm || !state.sound || !self.bgmPlaying) {
          self.stopBGM();
          return;
        }
        var step = self.bgmStep % lead.length;
        var l = lead[step];
        var a = arp[step];
        var b = bass[step];

        // 1. Giai điệu chính mềm mại (sine ấm + hài âm nhẹ)
        if (l > 0) {
          self.tone(l, "sine", 0, 0.42, 0.045, 0, self.bgmGain);
          self.tone(l * 2, "sine", 0.01, 0.20, 0.012, 0, self.bgmGain);
        }

        // 2. Hợp âm rải kiểu guitar/kalimba êm dịu
        if (a > 0) {
          self.tone(a, "triangle", 0, 0.28, 0.022, 0, self.bgmGain);
        }

        // 3. Tiếng bass bossa-nova ấm
        if (b > 0) {
          self.tone(b, "sine", 0, 0.36, 0.052, 0, self.bgmGain);
        }

        // 4. Nhịp gõ gỗ nhẹ (soft clave) ở phách 1 và 4
        if (step % 8 === 0 || step % 8 === 3) {
          self.tone(420, "sine", 0, 0.03, 0.014, 240, self.bgmGain);
        }

        self.bgmStep++;
      }, 280); // 280ms = ~107 BPM êm dịu, thư giãn
    },
    stopBGM: function () {
      this.bgmPlaying = false;
      if (this.bgmTimer) {
        clearInterval(this.bgmTimer);
        this.bgmTimer = null;
      }
      if (this.bgmGain && this.ctx) {
        try {
          this.bgmGain.gain.setValueAtTime(0, this.ctx.currentTime);
          this.bgmGain.disconnect();
        } catch (e) {}
        this.bgmGain = null;
      }
    },
    toggleBGM: function () {
      var next = !(state.bgm || state.sound);
      state.bgm = next;
      state.sound = next;
      saveState();
      updateBgmButtons();
      if (next) {
        this.startBGM();
      } else {
        this.stopBGM();
        this.stopSpeak();
      }
    },
    speak: function (text, lang, rate) {
      if (!state.sound || !text) return;
      this.init();
      var myGen = ++ttsGen;

      // Dừng âm thanh đọc cũ trước khi phát câu mới
      if (typeof this.stopCue === "function") this.stopCue();
      if ("speechSynthesis" in window) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
      stopFallbackTTS();

      // Ưu tiên phát giọng lồng tiếng thật 100% offline từ core_sprite.mp3 nếu có sẵn
      if (this.spriteBuffer && typeof this.playCue === "function" && typeof AUDIO_SPRITE_CONFIG !== "undefined" && AUDIO_SPRITE_CONFIG.phraseMap) {
        var normKey = String(text).replace(/\s+/g, " ").trim().toLowerCase();
        var cueId = AUDIO_SPRITE_CONFIG.phraseMap[normKey];
        if (cueId && this.playCue(cueId)) {
          return;
        }
      }

      var targetLang = lang || "vi-VN";
      var isVi = targetLang.indexOf("vi") === 0;
      var fbLang = isVi ? "vi" : "en";
      var cleanText = isVi
        ? cleanVietnamesePhonetics(text)
        : (String(text).normalize ? String(text).normalize("NFC") : String(text)).replace(/_/g, " ").replace(/\s{2,}/g, " ").trim();

      if (!cleanText) return;

      // Ưu tiên giọng Neural tự nhiên (Google TTS) khi có mạng để phát âm chuẩn ("bé", thanh điệu, ngữ điệu)
      // Tự động fallback về Web Speech API nếu thiết bị đang ngoại tuyến hoặc bị chặn mạng
      if (typeof navigator === "undefined" || navigator.onLine !== false) {
        playNaturalTTS(cleanText, fbLang, rate, myGen, function () {
          speakWebSpeech(cleanText, targetLang, rate, myGen);
        });
      } else {
        speakWebSpeech(cleanText, targetLang, rate, myGen);
      }
    },
    playCue: function (cueId) {
      if (!state.sound || !this.ctx || !this.spriteBuffer || typeof AUDIO_SPRITE_CONFIG === "undefined" || !AUDIO_SPRITE_CONFIG.sprite) return false;
      var cue = AUDIO_SPRITE_CONFIG.sprite[cueId];
      if (!cue) return false;
      this.stopCue();
      try {
        var src = this.ctx.createBufferSource();
        src.buffer = this.spriteBuffer;
        src.connect(this.ctx.destination);
        this.activeCueSource = src;
        src.start(0, cue.start, cue.duration);
        return true;
      } catch (e) {
        return false;
      }
    },
    stopCue: function () {
      if (this.activeCueSource) {
        try { this.activeCueSource.stop(0); } catch (e) {}
        try { this.activeCueSource.disconnect(); } catch (e) {}
        this.activeCueSource = null;
      }
    },
    stopSpeak: function () {
      ttsGen++;
      try {
        if (typeof this.stopCue === "function") this.stopCue();
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        stopFallbackTTS();
      } catch (e) {}
    }
  };

  // ---------------------------------------------------------
  // 2. DỮ LIỆU GAME: chế độ chơi, huy hiệu, nhân vật cửa hàng (Đọc từ PROJECT_CONFIG)
  // ---------------------------------------------------------
  var CFG = (typeof PROJECT_CONFIG !== "undefined" && PROJECT_CONFIG) ? PROJECT_CONFIG : {};
  var STORE_PREFIX = CFG.storagePrefix || "vqtt";

  var MODES = CFG.modes || [
    { id: "quiz", name: "Phiến Đá Bí Ẩn", icon: "📜", reward: 10, desc: "Chọn đáp án đúng" },
    { id: "match", name: "Ghép Đôi Nhanh", icon: "🧩", reward: 15, desc: "Chạm nối cặp đúng" },
    { id: "memory", name: "Lật Thẻ Thần Kỳ", icon: "🃏", reward: 15, desc: "Tìm cặp giống nhau" },
    { id: "balloon", name: "Bóng Bay Tri Thức", icon: "🎈", reward: 20, desc: "Bắn bóng đáp án" }
  ];

  var BADGES = CFG.badges || [
    { icon: "🌱", name: "Mầm Non", need: 4 },
    { icon: "🥉", name: "Huy Hiệu Đồng", need: 12 },
    { icon: "🥈", name: "Huy Hiệu Bạc", need: 22 },
    { icon: "🥇", name: "Huy Hiệu Vàng", need: 32 },
    { icon: "🏆", name: "Cúp Vô Địch", need: 42 },
    { icon: "👑", name: "Vua Tri Thức", need: 50 }
  ];

  var LEVELS = CFG.levels || ["Mầm Non Chăm Chỉ", "Bé Ngoan Hiếu Học", "Ong Nhỏ Thông Thái", "Nhà Thám Hiểm Nhí", "Ngôi Sao Lớp 1", "Kiện Tướng Tri Thức", "Siêu Trí Tuệ Nhí"];

  var AVATARS = CFG.avatars || [
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
  ];

  var PRAISE = CFG.praiseMessages || [
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
  ];
  var RETRY = CFG.retryMessages || [
    "Suýt đúng rồi, bé thử lại lần nữa nhé! 💪",
    "Đừng lo, có Rồng Con ở đây cùng bạn! 🐲",
    "Ồ, mình nhìn kỹ lại một chút nào! 👀",
    "Gần trúng rồi đó! Chọn lại xem sao! ✨",
    "Không sao đâu, bé đếm chậm lại chút nhé! 🐢",
    "Cố lên nào Dũng Sĩ Tí Hon! 🌟",
    "Nghe lại câu hỏi cùng Thỏ Trắng nhé! 🐰"
  ];

  // ---------------------------------------------------------
  // 3. TRẠNG THÁI, HỒ SƠ BÉ & ĐỒNG BỘ ĐÁM MÂY (Firebase)
  // ---------------------------------------------------------
  var OLD_STORE_KEY = STORE_PREFIX + "_state_v1";
  var PROFILES_KEY = STORE_PREFIX + "_profiles_v1";
  var ACTIVE_PROFILE_KEY = STORE_PREFIX + "_active_profile_v1";

  var profiles = CFG.defaultProfiles ? CFG.defaultProfiles.slice() : [
    { id: "hoanglong", name: "HOÀNG LONG", avatar: "hero" }
  ];
  var currentProfileId = CFG.defaultProfileId || "hoanglong";

  var DEFAULT_REAL_REWARDS = CFG.realRewards || [
    { id: "rw_icecream", icon: "🍦", img: "assets/rw-icecream.jpg", name: "Kem / Bánh kẹo", cost: 150 },
    { id: "rw_swim", icon: "🏊", name: "Đi bơi / Chơi nhà banh", cost: 450 },
    { id: "rw_car", icon: "🏎️", img: "assets/rw-car.jpg", name: "Xe đồ chơi", cost: 600 },
    { id: "rw_watch", icon: "⌚", img: "assets/rw-watch.jpg", name: "Đồng hồ trẻ em", cost: 1000 }
  ];
  var STREAK_MILESTONES = CFG.streakMilestones || [
    { days: 3, coins: 15, label: "3 ngày liên tiếp" },
    { days: 7, coins: 45, label: "7 ngày chăm chỉ" },
    { days: 14, coins: 60, label: "14 ngày siêu sao" },
    { days: 30, coins: 120, label: "30 ngày quán quân" }
  ];

  function cloneDefaultRewards() {
    var arr = [];
    for (var i = 0; i < DEFAULT_REAL_REWARDS.length; i++) {
      var r = DEFAULT_REAL_REWARDS[i];
      var item = { id: r.id, icon: r.icon, name: r.name, cost: r.cost };
      if (r.img) item.img = r.img;
      arr.push(item);
    }
    return arr;
  }

  function getTodayStr(offsetDays) {
    var d = new Date();
    if (offsetDays) d.setDate(d.getDate() + offsetDays);
    var m = d.getMonth() + 1;
    var day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (day < 10 ? "0" + day : day);
  }

  var state = {
    name: "HOÀNG LONG",
    coins: 0,
    avatar: "hero",
    owned: ["hero"],
    progress: {},      // "math|count" -> { quiz: 2, memory: 0, balloon: 3 }
    passages: {},      // "t7" -> 3
    lastSubj: "math",
    lastUnitIdx: 0,
    lastPassageIdx: 0,
    sound: true,
    bgm: true,         // Nhạc nền game
    autoRead: true,
    unlockAll: false,
    streak: { count: 0, lastDate: "", best: 0, claimedMilestones: {} },
    dailyQuest: { date: "", math: false, viet: false, eng: false, claimed: false, replayCoinsCount: 0 },
    realRewards: cloneDefaultRewards(),
    rewardsCustomized: false,
    pinnedRewardId: CFG.defaultPinnedRewardId || "rw_icecream",
    rewardTickets: [],
    telemetry: [],
    updatedAt: 0
  };

  function ensureGamificationState() {
    var today = getTodayStr(0);
    if (!state.streak || typeof state.streak !== "object") {
      state.streak = { count: 0, lastDate: "", best: 0, claimedMilestones: {} };
    }
    if (!state.streak.claimedMilestones) state.streak.claimedMilestones = {};
    if (!state.dailyQuest || state.dailyQuest.date !== today) {
      state.dailyQuest = { date: today, math: false, viet: false, eng: false, claimed: false, replayCoinsCount: 0 };
    }
    if (!Array.isArray(state.realRewards) || state.realRewards.length === 0) {
      if (!state.rewardsCustomized) state.realRewards = cloneDefaultRewards();
    } else if (!state.rewardsCustomized) {
      // Chỉ tự động nâng cấp bộ quà cũ (rw_tv/rw_book) khi bố mẹ chưa tự chỉnh sửa danh sách quà
      var oldLegacy = { rw_book: 1, rw_tv: 1, rw_sticker: 1 };
      var hasOldLegacy = false;
      var customRewards = [];
      for (var ri = 0; ri < state.realRewards.length; ri++) {
        var rw = state.realRewards[ri];
        if (rw && rw.id && oldLegacy[rw.id]) hasOldLegacy = true;
        else if (rw && rw.id && rw.id !== "rw_icecream" && rw.id !== "rw_swim" && rw.id !== "rw_car" && rw.id !== "rw_watch") customRewards.push(rw);
      }
      if (hasOldLegacy) {
        state.realRewards = cloneDefaultRewards().concat(customRewards);
      }
    }
    var pinnedExists = false;
    for (var pi = 0; pi < state.realRewards.length; pi++) {
      if (state.realRewards[pi].id === state.pinnedRewardId) { pinnedExists = true; break; }
    }
    if (!pinnedExists && state.realRewards.length > 0) {
      state.pinnedRewardId = state.realRewards[0].id;
    }
    if (!Array.isArray(state.rewardTickets)) state.rewardTickets = [];
    if (!Array.isArray(state.telemetry)) state.telemetry = [];

    // Đảm bảo avatar thuộc danh sách 12 hiệp sĩ hiện tại
    var validAvatar = false;
    for (var ai = 0; ai < AVATARS.length; ai++) {
      if (AVATARS[ai].id === state.avatar) { validAvatar = true; break; }
    }
    if (!validAvatar) state.avatar = "hero";
    if (!Array.isArray(state.owned)) state.owned = ["hero"];
    var cleanOwned = [];
    for (var oi = 0; oi < state.owned.length; oi++) {
      for (var aj = 0; aj < AVATARS.length; aj++) {
        if (AVATARS[aj].id === state.owned[oi]) { cleanOwned.push(state.owned[oi]); break; }
      }
    }
    if (cleanOwned.indexOf("hero") === -1) cleanOwned.unshift("hero");
    state.owned = cleanOwned;
  }

  function getPinnedReward() {
    ensureGamificationState();
    for (var i = 0; i < state.realRewards.length; i++) {
      if (state.realRewards[i].id === state.pinnedRewardId) return state.realRewards[i];
    }
    return state.realRewards[0] || null;
  }

  function recordDailyActivity(subj) {
    ensureGamificationState();
    var today = getTodayStr(0);
    var yesterday = getTodayStr(-1);
    var bonusCoins = 0;
    var bonusNotes = [];

    if (state.streak.lastDate !== today) {
      state.streak.count = (state.streak.lastDate === yesterday) ? (state.streak.count + 1) : 1;
      state.streak.lastDate = today;
      if (state.streak.count > (state.streak.best || 0)) state.streak.best = state.streak.count;
      for (var mi = 0; mi < STREAK_MILESTONES.length; mi++) {
        var ms = STREAK_MILESTONES[mi];
        if (state.streak.count === ms.days && !state.streak.claimedMilestones[String(ms.days)]) {
          state.streak.claimedMilestones[String(ms.days)] = true;
          bonusCoins += ms.coins;
          bonusNotes.push("🔥 Chuỗi " + ms.days + " ngày: +" + ms.coins + " xu!");
        }
      }
    }

    if (subj && (subj === "math" || subj === "viet" || subj === "eng") && !state.dailyQuest[subj]) {
      state.dailyQuest[subj] = true;
      bonusCoins += 5;
      bonusNotes.push("🎯 Nhiệm vụ ngày: +5 xu!");
    }
    if (bonusCoins > 0) state.coins += bonusCoins;
    return { bonusCoins: bonusCoins, bonusNotes: bonusNotes };
  }

  function profileStoreKey(pid) {
    return STORE_PREFIX + "_state_" + (pid || currentProfileId);
  }

  function getProfileState(pid) {
    if (pid === currentProfileId) return state;
    try {
      var raw = localStorage.getItem(profileStoreKey(pid));
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { name: pid, coins: 0, avatar: "hero", progress: {}, passages: {} };
  }

  function loadProfiles() {
    try {
      var rawP = localStorage.getItem(PROFILES_KEY);
      if (rawP) {
        var parsed = JSON.parse(rawP);
        if (Array.isArray(parsed) && parsed.length > 0) profiles = parsed;
      }
      var act = localStorage.getItem(ACTIVE_PROFILE_KEY);
      if (act) {
        for (var i = 0; i < profiles.length; i++) {
          if (profiles[i].id === act) { currentProfileId = act; break; }
        }
      }
    } catch (e) {}
  }

  function saveProfilesList() {
    try { localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles)); } catch (e) {}
    try { localStorage.setItem(ACTIVE_PROFILE_KEY, currentProfileId); } catch (e) {}
    CloudSync.saveProfileList();
  }

  function findProfileById(pid) {
    for (var i = 0; i < profiles.length; i++) {
      if (profiles[i].id === pid) return profiles[i];
    }
    return null;
  }

  function loadState() {
    loadProfiles();
    var prof = findProfileById(currentProfileId);
    var fallbackName = (prof && prof.name) ? prof.name : (currentProfileId === "hoanglong" ? "HOÀNG LONG" : currentProfileId.toUpperCase());
    try {
      var key = profileStoreKey(currentProfileId);
      var raw = localStorage.getItem(key);
      if (!raw && currentProfileId === "hoanglong") {
        // Tự động chuyển đổi tiến độ cũ sang tài khoản Hoàng Long để giữ nguyên điểm
        raw = localStorage.getItem(OLD_STORE_KEY);
      }
      if (raw) {
        var s = JSON.parse(raw);
        for (var k in s) { if (s.hasOwnProperty(k)) state[k] = s[k]; }
      } else {
        if (currentProfileId === "hoanglong") {
          var oldStars = parseInt(localStorage.getItem("edu1_stars"), 10);
          if (oldStars > 0) state.coins = oldStars;
        }
      }
      // Tên hiển thị luôn lấy theo hồ sơ đang chọn để không bao giờ bị lẫn tên bé khác
      state.name = fallbackName;
      ensureGamificationState();
    } catch (e) { ensureGamificationState(); }
  }

  function saveState() {
    state.updatedAt = Date.now();
    try { localStorage.setItem(profileStoreKey(currentProfileId), JSON.stringify(state)); } catch (e) {}
    // Tự động đẩy lên đám mây Firebase Realtime Database
    CloudSync.saveProfile(currentProfileId, state);
  }

  function resetStateForProfile(name, avatar) {
    state.name = name || "HOÀNG LONG";
    state.coins = 0;
    state.avatar = avatar || "hero";
    state.owned = ["hero"];
    state.progress = {};
    state.passages = {};
    state.lastSubj = "math";
    state.lastUnitIdx = 0;
    state.lastPassageIdx = 0;
    state.unlockAll = false;
    state.streak = { count: 0, lastDate: "", best: 0, claimedMilestones: {} };
    state.dailyQuest = { date: getTodayStr(0), math: false, viet: false, eng: false, claimed: false, replayCoinsCount: 0 };
    state.realRewards = cloneDefaultRewards();
    state.pinnedRewardId = "rw_car";
    state.rewardTickets = [];
    state.telemetry = [];
    state.updatedAt = 0;
  }

  function askParentalGate(actionLabel) {
    var a = 6 + Math.floor(Math.random() * 4); // 6..9
    var b = 7 + Math.floor(Math.random() * 3); // 7..9
    var ans = window.prompt("🔒 CỔNG BỐ MẸ (" + actionLabel + ")\nĐể tránh bé bấm nhầm, bố mẹ nhập kết quả phép nhân:\n" + a + " × " + b + " = ?");
    if (ans === null) return false;
    if (parseInt(ans, 10) === (a * b)) return true;
    window.alert("Kết quả chưa đúng. Thao tác đã được hủy để bảo vệ dữ liệu của bé!");
    return false;
  }

  function switchProfile(pid) {
    if (!pid || pid === currentProfileId) return;
    saveState();
    currentProfileId = pid;
    saveProfilesList();
    var prof = findProfileById(pid);
    // Đặt lại toàn bộ state mặc định (bao gồm cả Gamification) trước khi nạp hồ sơ mới
    resetStateForProfile((prof && prof.name) ? prof.name : pid.toUpperCase(), (prof && prof.avatar) ? prof.avatar : "hero");
    loadState();
    saveState();
    Sound.good();
    renderHome();
    CloudSync.listenCurrentProfile();
  }

  function addNewProfile(rawName) {
    if (!rawName) return;
    var name = String(rawName).trim().toUpperCase();
    if (!name.length) return;
    var cleanId = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!cleanId.length) cleanId = "be" + Date.now().toString(36);
    var baseId = cleanId;
    var counter = 1;
    while (true) {
      var exists = false;
      for (var i = 0; i < profiles.length; i++) {
        if (profiles[i].id === cleanId) { exists = true; break; }
      }
      if (!exists) break;
      cleanId = baseId + counter;
      counter++;
    }
    profiles.push({ id: cleanId, name: name, avatar: "hero" });
    saveProfilesList();
    switchProfile(cleanId);
  }

  function deleteProfile(pid) {
    if (!pid || profiles.length <= 1) return;
    var prof = findProfileById(pid);
    var label = prof ? prof.name : pid;
    if (!askParentalGate("Xóa hồ sơ " + label)) return;
    if (!window.confirm('Bạn có chắc muốn xóa hồ sơ bé "' + label + '"? Mọi sao và xu của hồ sơ này sẽ bị xóa vĩnh viễn.')) return;
    var nextList = [];
    for (var i = 0; i < profiles.length; i++) {
      if (profiles[i].id !== pid) nextList.push(profiles[i]);
    }
    if (!nextList.length) return;
    profiles = nextList;
    try { localStorage.removeItem(profileStoreKey(pid)); } catch (e) {}
    CloudSync.deleteProfile(pid);

    if (currentProfileId === pid) {
      currentProfileId = profiles[0].id;
      saveProfilesList();
      var nextProf = profiles[0];
      resetStateForProfile(nextProf.name, nextProf.avatar || "hero");
      loadState();
      renderHome();
      CloudSync.listenCurrentProfile();
    } else {
      saveProfilesList();
    }
    Sound.click();
    renderProfileCards();
  }

  // Bộ máy đồng bộ đám mây Firebase
  var CloudSync = {
    db: null,
    listenerRef: null,
    init: function () {
      if (typeof firebase === "undefined" || typeof FIREBASE_CONFIG === "undefined" || !FIREBASE_CONFIG.databaseURL) {
        this.updatePill("offline", "Lưu máy");
        return;
      }
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(FIREBASE_CONFIG);
        }
        this.db = firebase.database();
        var self = this;
        // Theo dõi trạng thái kết nối mạng thực tế của Firebase
        this.db.ref(".info/connected").on("value", function (snap) {
          if (snap.val() === true) {
            self.updatePill("online", "Đám mây");
          } else {
            self.updatePill("offline", "Ngoại tuyến");
          }
        });
        this.listenProfiles();
        this.listenCurrentProfile();
      } catch (e) {
        this.updatePill("offline", "Lưu máy");
      }
    },
    updatePill: function (status, label) {
      var dot = $("syncDot"), lbl = $("syncLabel");
      if (dot) dot.className = "sync-dot " + status;
      if (lbl) lbl.innerHTML = label;
    },
    saveProfile: function (pid, data) {
      if (!this.db || !pid) return;
      var self = this;
      this.updatePill("syncing", "Đang lưu...");
      try {
        var payload = {
          id: pid,
          name: data.name || "HOÀNG LONG",
          coins: parseInt(data.coins, 10) || 0,
          avatar: data.avatar || "hero",
          owned: Array.isArray(data.owned) ? data.owned : ["hero"],
          progress: data.progress || {},
          passages: data.passages || {},
          lastSubj: data.lastSubj || "math",
          lastUnitIdx: data.lastUnitIdx || 0,
          lastPassageIdx: data.lastPassageIdx || 0,
          unlockAll: !!data.unlockAll,
          streak: data.streak || { count: 0, lastDate: "", best: 0, claimedMilestones: {} },
          dailyQuest: data.dailyQuest || { date: getTodayStr(0), math: false, viet: false, eng: false, claimed: false, replayCoinsCount: 0 },
          realRewards: Array.isArray(data.realRewards) ? data.realRewards : cloneDefaultRewards(),
          rewardsCustomized: !!data.rewardsCustomized,
          pinnedRewardId: data.pinnedRewardId || "rw_car",
          rewardTickets: Array.isArray(data.rewardTickets) ? data.rewardTickets : [],
          telemetry: Array.isArray(data.telemetry) ? data.telemetry.slice(-80) : [],
          updatedAt: data.updatedAt || Date.now()
        };
        this.db.ref("kidsedu/profiles/" + pid).set(payload, function (err) {
          if (!err) {
            self.updatePill("online", "Đám mây");
          } else {
            self.updatePill("offline", "Lưu máy");
          }
        });
      } catch (e) {
        self.updatePill("offline", "Lưu máy");
      }
    },
    deleteProfile: function (pid) {
      if (!this.db || !pid) return;
      try { this.db.ref("kidsedu/profiles/" + pid).remove(); } catch (e) {}
    },
    listenCurrentProfile: function () {
      if (!this.db || !currentProfileId) return;
      var self = this;
      if (this.listenerRef) {
        try { this.listenerRef.off(); } catch (e) {}
      }
      this.listenerRef = this.db.ref("kidsedu/profiles/" + currentProfileId);
      this.listenerRef.on("value", function (snapshot) {
        var val = snapshot.val();
        if (val) {
          if (val.updatedAt && val.updatedAt > (state.updatedAt || 0)) {
            for (var k in val) {
              if (val.hasOwnProperty(k) && k !== "id") state[k] = val[k];
            }
            var prof = findProfileById(currentProfileId);
            if (prof && prof.name) state.name = prof.name;
            ensureGamificationState();
            try { localStorage.setItem(profileStoreKey(currentProfileId), JSON.stringify(state)); } catch (e) {}
            renderHome();
            self.updatePill("online", "Đám mây");
          }
        } else {
          // Lần đầu kết nối: tự động đẩy tiến độ hiện tại lên Firebase để lưu trữ
          self.saveProfile(currentProfileId, state);
        }
      });
    },
    listenProfiles: function () {
      if (!this.db) return;
      var self = this;
      this.db.ref("kidsedu/profile_list").on("value", function (snapshot) {
        var list = snapshot.val();
        if (list && Array.isArray(list) && list.length > 0) {
          profiles = list;
          try { localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles)); } catch (e) {}
        } else {
          // Lần đầu: đẩy danh sách hồ sơ lên Firebase
          self.saveProfileList();
        }
      });
    },
    saveProfileList: function () {
      if (!this.db) return;
      try { this.db.ref("kidsedu/profile_list").set(profiles); } catch (e) {}
    }
  };

  function calcTotalStars(pState) {
    if (!pState || !pState.progress) return 0;
    var t = 0;
    for (var s = 0; s < SUBJECTS.length; s++) {
      var sid = SUBJECTS[s].id;
      var units = UNITS[sid];
      for (var u = 0; u < units.length; u++) {
        var top = units[u].topic;
        if (top === "passages") {
          var count = 0;
          if (pState.passages) {
            for (var pk in pState.passages) {
              if (pState.passages.hasOwnProperty(pk) && pState.passages[pk] > 0) count++;
            }
          }
          t += count >= 12 ? 4 : count >= 7 ? 3 : count >= 3 ? 2 : count >= 1 ? 1 : 0;
        } else {
          var p = pState.progress[sid + "|" + top];
          if (p) {
            for (var mi = 0; mi < MODES.length; mi++) {
              if ((p[MODES[mi].id] || 0) >= 1) t++;
            }
          }
        }
      }
    }
    return t;
  }

  function unitKey(subj, topic) { return subj + "|" + topic; }
  function expectedModeTotal(subj, topic, modeId) {
    var qs = unitQuestions(subj, topic);
    if (modeId === "quiz") return Math.min(8, qs.length);
    if (modeId === "balloon") return Math.min(6, qs.length);
    var pairsLen = (typeof buildPairs === "function") ? buildPairs(qs).length : 0;
    if (pairsLen < 3 && typeof buildPairs === "function") {
      pairsLen = buildPairs(QUESTION_BANK[subj] || []).length;
    }
    var maxPairs = modeId === "match" ? 5 : 6;
    if (pairsLen <= 0) return maxPairs;
    return pairsLen >= maxPairs ? maxPairs : Math.min(4, pairsLen);
  }

  function stageStats(subj, topic) {
    var p = state.progress[unitKey(subj, topic)] || {};
    var stats = p.stats || {};
    var totalCorrect = 0;
    var totalQuestions = 0;
    for (var i = 0; i < MODES.length; i++) {
      var mId = MODES[i].id;
      var st = stats[mId];
      var expected = expectedModeTotal(subj, topic, mId);
      var mTotal = (st && st.total > 0) ? st.total : expected;
      var mCorrect = 0;
      if (st && typeof st.correct === "number") {
        mCorrect = Math.min(mTotal, Math.max(0, st.correct));
      } else if ((p[mId] || 0) > 0 && mTotal > 0) {
        // Tương thích dữ liệu cũ chưa lưu stats: quy đổi từ số sao đã đạt ở thẻ đó
        var oldS = p[mId];
        mCorrect = oldS >= 3 ? mTotal : oldS === 2 ? Math.round(mTotal * 0.7) : Math.round(mTotal * 0.4);
      }
      totalCorrect += mCorrect;
      totalQuestions += mTotal;
    }
    var ratio = totalQuestions > 0 ? (totalCorrect / totalQuestions) : 0;
    var stars = ratioToHalfStars(ratio);
    return { correct: totalCorrect, total: totalQuestions, ratio: ratio, stars: stars };
  }

  function ratioToHalfStars(ratio) {
    if (!ratio || ratio <= 0) return 0;
    if (ratio >= 0.9) return 3;
    var s = Math.round(ratio * 6) / 2;
    return s < 0.5 ? 0.5 : s;
  }

  function unitStars(subj, topic) {
    if (topic === "passages") {
      var count = 0;
      if (state.passages) {
        for (var k in state.passages) {
          if (state.passages.hasOwnProperty(k) && state.passages[k] > 0) count++;
        }
      }
      return ratioToHalfStars(Math.min(1, count / 45));
    }
    return stageStats(subj, topic).stars;
  }
  function subjectStars(subj) {
    var units = UNITS[subj], t = 0;
    for (var i = 0; i < units.length; i++) t += unitStars(subj, units[i].topic);
    return Math.round(t * 10) / 10;
  }
  function totalStars() {
    var t = 0;
    for (var i = 0; i < SUBJECTS.length; i++) t += subjectStars(SUBJECTS[i].id);
    return Math.round(t * 10) / 10;
  }
  function maxTotalStars() {
    var t = 0;
    for (var i = 0; i < SUBJECTS.length; i++) t += UNITS[SUBJECTS[i].id].length * 3;
    return t;
  }
  function unitGamesDone(subj, topic) {
    var p = state.progress[unitKey(subj, topic)];
    if (!p) return 0;
    var done = 0;
    for (var i = 0; i < MODES.length; i++) {
      if ((p[MODES[i].id] || 0) >= 1) done++;
    }
    return done;
  }
  function isUnlocked(subj, idx) {
    if (state.unlockAll || idx === 0) return true;
    var u = UNITS[subj][idx];
    if (u && u.topic === "passages") return true;
    var prevTopic = UNITS[subj][idx - 1].topic;
    if (prevTopic === "passages") return unitStars(subj, prevTopic) >= 0.5;
    return unitStars(subj, prevTopic) >= 1.5;
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
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
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
    if (document.body) {
      if (id === "screenHome") removeClass(document.body, "in-subscreen");
      else addClass(document.body, "in-subscreen");
    }
    window.scrollTo(0, 0);
  }
  function openOverlay(id) { addClass($(id), "open"); }
  function closeOverlay(id) { removeClass($(id), "open"); }

  // ---------------------------------------------------------
  // 6. MÀN HÌNH CHÍNH
  // ---------------------------------------------------------
  function currentBadge(ts) {
    var cur = null;
    for (var i = 0; i < BADGES.length; i++) {
      if (ts >= BADGES[i].need) cur = BADGES[i];
    }
    return cur;
  }

  function renderHome() {
    $("homeAvatar").innerHTML = avatarHTML(state.avatar);
    $("kidName").innerHTML = esc(state.name);
    $("coinCount").innerHTML = state.coins;
    var ts = totalStars();
    var b = currentBadge(ts);
    $("kidLevel").innerHTML = (b ? (b.icon + " " + b.name) : "🌟 Tân Binh") + " • " + ts + "⭐";

    // Cập nhật thanh Nhiệm Vụ Ngày & Mục Tiêu Quà Thật
    ensureGamificationState();
    var dq = state.dailyQuest;
    if ($("gqStreak")) $("gqStreak").innerHTML = state.streak.count || 0;
    if ($("gqQuestDots")) {
      var dotsHtml = '<span class="gq-dot' + (dq.math ? ' done' : '') + '">T</span>' +
        '<span class="gq-dot' + (dq.viet ? ' done' : '') + '">V</span>' +
        '<span class="gq-dot' + (dq.eng ? ' done' : '') + '">A</span>';
      $("gqQuestDots").innerHTML = dotsHtml;
    }
    var doneQ = (dq.math ? 1 : 0) + (dq.viet ? 1 : 0) + (dq.eng ? 1 : 0);
    var questSubEl = $("gqQuestSub");
    if (questSubEl) {
      if (doneQ >= 3 && !dq.claimed) {
        questSubEl.innerHTML = "🎁 Rương ngày sẵn sàng!";
        addClass(questSubEl, "ready");
      } else if (doneQ >= 3) {
        questSubEl.innerHTML = "✅ Đã xong 3/3 hôm nay";
        removeClass(questSubEl, "ready");
      } else {
        questSubEl.innerHTML = "Nhiệm vụ: " + doneQ + "/3 (+15 <i class='coin sm'></i>)";
        removeClass(questSubEl, "ready");
      }
    }
    var pinned = getPinnedReward();
    var goalBtn = $("gqGoalBtn");
    if (pinned && $("gqGoalName") && $("gqGoalNum") && $("gqGoalFill")) {
      var pct = Math.min(100, Math.round((state.coins / (pinned.cost || 1)) * 100));
      var goalVisual = pinned.img
        ? '<img class="gq-goal-thumb" src="' + esc(pinned.img) + '" alt="">'
        : esc(pinned.icon) + " ";
      $("gqGoalName").innerHTML = goalVisual + esc(pinned.name);
      $("gqGoalNum").innerHTML = state.coins + "/" + pinned.cost;
      $("gqGoalFill").style.width = pct + "%";
      if (goalBtn) {
        if (state.coins >= pinned.cost) addClass(goalBtn, "ready");
        else removeClass(goalBtn, "ready");
      }
    }

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

  var MAP_POINTS_BY_SUBJ = CFG.mapPointsBySubj || {
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
  };

  function getMapPoints(count, subj) {
    var preset = MAP_POINTS_BY_SUBJ[subj];
    if (preset && count <= preset.length) return preset.slice(0, count);
    var out = [];
    for (var i = 0; i < count; i++) {
      var t = i / (count - 1 || 1);
      var y = Math.round(28 + t * 50);
      var x = Math.round(50 + Math.sin(t * Math.PI * 2.2) * 18);
      out.push({ x: x, y: y });
    }
    return out;
  }

  var MAP_ORDER = ["math", "viet", "eng"];
  var MAP_PATH_IDS = { math: "unitPathMath", viet: "unitPathViet", eng: "unitPathEng" };
  var MAP_STRIP_STAR_IDS = { math: "stripStarsMath", viet: "stripStarsViet", eng: "stripStarsEng" };
  var mapControlsBound = false;

  function openSubject(subj) {
    curSubj = subj;
    renderMap(true);
    showScreen("screenMap");
  }

  function starsHTML(n) {
    var h = "";
    for (var i = 0; i < 3; i++) {
      if (n >= i + 1) h += '<span>⭐</span>';
      else if (n >= i + 0.5) h += '<span class="star-half"><span class="star-bg">⭐</span><span class="star-fg">⭐</span></span>';
      else h += '<span class="off">⭐</span>';
    }
    return h;
  }

  function slideToSubject(subj, instant) {
    var idx = MAP_ORDER.indexOf(subj);
    if (idx < 0) idx = 0;
    curSubj = MAP_ORDER[idx];

    var sj = subjectById(curSubj);
    var units = UNITS[curSubj];
    $("mapSubjName").innerHTML = "ĐẢO: " + sj.short;
    $("mapStars").innerHTML = subjectStars(curSubj) + "/" + (units.length * 3);

    var cards = document.querySelectorAll("#mapAccordion .map-card");
    for (var ci = 0; ci < cards.length; ci++) {
      var c = cards[ci];
      var cIdx = MAP_ORDER.indexOf(c.getAttribute("data-subj"));
      var diff = cIdx - idx;
      var targetCls = diff === 0 ? "pos-active" : (diff === -1 ? "pos-prev" : (diff === 1 ? "pos-next" : (diff < -1 ? "pos-far-prev" : "pos-far-next")));
      if (instant) addClass(c, "no-anim");
      removeClass(c, "pos-far-prev");
      removeClass(c, "pos-prev");
      removeClass(c, "pos-active");
      removeClass(c, "pos-next");
      removeClass(c, "pos-far-next");
      addClass(c, targetCls);
    }

    var acc = $("mapAccordion");
    if (acc) void acc.offsetWidth;
    setTimeout(function () {
      for (var ck = 0; ck < cards.length; ck++) removeClass(cards[ck], "no-anim");
    }, 30);
  }

  function renderSingleIslandMap(subj, pathEl) {
    if (!pathEl) return;
    var units = UNITS[subj];
    var pts = getMapPoints(units.length, subj);
    var html = "";

    var nextMarked = false;
    for (var i = 0; i < units.length; i++) {
      var u = units[i];
      var unlocked = isUnlocked(subj, i);
      var st = unitStars(subj, u.topic);
      var isBoss = (i === units.length - 1);
      var cls = "unit-node";
      if (!unlocked) cls += " locked";
      else if (st >= 4) cls += " done perfect";
      else if (st > 0) cls += " done";
      if (isBoss) cls += " is-boss";
      var isNext = false;
      if (unlocked && st === 0 && !nextMarked) {
        cls += " next";
        nextMarked = true;
        isNext = true;
      }
      html += '<div class="' + cls + '" data-subj="' + subj + '" data-idx="' + i + '" style="left:' + pts[i].x + '%;top:' + pts[i].y + '%;">' +
        (isNext ? '<div class="unit-here-tag">🚩 CHƠI NGAY</div>' : '') +
        '<div class="unit-circle">' +
          '<span class="unit-num">' + (i + 1) + '</span>' +
          (isBoss && unlocked ? '<span class="unit-boss-crown">👑</span>' : '') +
          (unlocked ? u.icon : "🔒") +
        '</div>' +
        (unlocked ? '<div class="unit-stars">' + starsHTML(st) + '</div><div class="unit-pill">' + esc(u.title) + '</div>' : '') +
        '</div>';
    }
    pathEl.innerHTML = html;

    var nodes = pathEl.querySelectorAll(".unit-node");
    for (var k = 0; k < nodes.length; k++) {
      onTap(nodes[k], function () {
        var nodeSubj = this.getAttribute("data-subj") || curSubj;
        var idx = parseInt(this.getAttribute("data-idx"), 10);
        if (nodeSubj !== curSubj) curSubj = nodeSubj;
        if (!isUnlocked(curSubj, idx)) {
          Sound.bad();
          addClass(this, "shake-it");
          var prevUnit = UNITS[curSubj][idx - 1];
          if (prevUnit && prevUnit.topic === "passages") {
            showToastBubble("Bé cần đọc ít nhất 1 bài ở chặng trước để mở khóa chặng này nhé!");
          } else {
            var doneCnt = prevUnit ? unitGamesDone(curSubj, prevUnit.topic) : 0;
            showToastBubble("Bé cần hoàn thành 3/4 trò chơi ở chặng trước (" + doneCnt + "/3) để mở khóa nhé!");
          }
          return;
        }
        Sound.click();
        curUnitIdx = idx;
        var u = UNITS[curSubj][curUnitIdx];
        if (u && u.topic === "passages") {
          readReturnScreen = "screenMap";
          openPassageReader();
        } else {
          openModePicker();
        }
      });
    }
  }

  function bindMapControlsOnce() {
    if (mapControlsBound) return;
    mapControlsBound = true;

    var cards = document.querySelectorAll("#mapAccordion .map-card");
    for (var ci = 0; ci < cards.length; ci++) {
      onTap(cards[ci], function () {
        var nextSubj = this.getAttribute("data-subj");
        if (nextSubj && nextSubj !== curSubj) {
          Sound.click();
          slideToSubject(nextSubj, false);
        }
      });
    }

    var accEl = $("mapAccordion");
    if (accEl) {
      var touchStartX = 0;
      var touchStartY = 0;
      accEl.addEventListener("touchstart", function (e) {
        if (!e.touches || !e.touches.length) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, false);
      accEl.addEventListener("touchend", function (e) {
        if (!e.changedTouches || !e.changedTouches.length) return;
        var dx = e.changedTouches[0].clientX - touchStartX;
        var dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
          var idx = MAP_ORDER.indexOf(curSubj);
          if (dx < 0 && idx < MAP_ORDER.length - 1) {
            Sound.click();
            slideToSubject(MAP_ORDER[idx + 1], false);
          } else if (dx > 0 && idx > 0) {
            Sound.click();
            slideToSubject(MAP_ORDER[idx - 1], false);
          }
        }
      }, false);
    }
  }

  function renderMap(instant) {
    for (var mi = 0; mi < MAP_ORDER.length; mi++) {
      var sId = MAP_ORDER[mi];
      renderSingleIslandMap(sId, $(MAP_PATH_IDS[sId]));
      var stripEl = $(MAP_STRIP_STAR_IDS[sId]);
      if (stripEl) stripEl.innerHTML = subjectStars(sId) + "/" + (UNITS[sId].length * 3) + " ⭐";
    }
    bindMapControlsOnce();
    slideToSubject(curSubj, !!instant);
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
    var stInfo = stageStats(curSubj, u.topic);
    $("modeTitle").innerHTML = "Bài " + (curUnitIdx + 1) + ": " + u.icon + " " + u.title +
      '<div style="font-size:12px;font-weight:700;color:#b45309;margin-top:2px">⭐ ' + stInfo.stars + '/3 sao • Đúng ' + stInfo.correct + '/' + stInfo.total + ' câu (' + Math.round(stInfo.ratio * 100) + '%)</div>';
    var p = state.progress[unitKey(curSubj, u.topic)] || {};
    var html = "";
    for (var i = 0; i < MODES.length; i++) {
      var m = MODES[i];
      html += '<div class="mode-card" data-mode="' + m.id + '">' +
        '<div class="mc-head"><div class="mc-name">' + m.name + '</div><div class="mc-best">' + starsMini(p[m.id] || 0) + "</div></div>" +
        '<div class="mc-body"><div class="mc-icon">' + m.icon + '</div><div class="mc-reward">x' + m.reward + ' <i class="coin sm"></i></div>' +
        '<div class="mc-desc">' + m.desc + "</div></div></div>";
    }
    $("modeCards").innerHTML = html;
    var cards = $("modeCards").querySelectorAll(".mode-card");
    for (var k = 0; k < cards.length; k++) {
      onTap(cards[k], function () {
        Sound.click();
        curMode = this.getAttribute("data-mode");
        closeOverlay("modeOverlay");
        startGame();
      });
    }
    openOverlay("modeOverlay");
  }
  function starsMini(n) {
    var h = "";
    for (var i = 0; i < 3; i++) {
      if (n >= i + 1) h += '<span class="st-on">★</span>';
      else if (n >= i + 0.5) h += '<span class="star-half"><span class="star-bg st-off">★</span><span class="star-fg st-on">★</span></span>';
      else h += '<span class="st-off">★</span>';
    }
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


  // ---------------------------------------------------------
  // 8B. QUẢN LÝ BGM & PHÒNG LUYỆN ĐỌC ĐOẠN VĂN
  // ---------------------------------------------------------
  var SPEAKER_ON_SVG = '<svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true">' +
    '<circle cx="24" cy="24" r="23" fill="#22b14c"/>' +
    '<rect x="9" y="18" width="6" height="12" rx="3" fill="#ffffff"/>' +
    '<polygon points="14,18 24,10 24,38 14,30" fill="#ffffff"/>' +
    '<path d="M28 17c3.2 3.2 3.2 10.8 0 14" fill="none" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M33 13c5.2 5.4 5.2 16.6 0 22" fill="none" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round"/>' +
  '</svg>';
  var SPEAKER_OFF_SVG = '<svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true">' +
    '<circle cx="24" cy="24" r="23" fill="#ed1c24"/>' +
    '<rect x="9" y="18" width="6" height="12" rx="3" fill="#ffffff"/>' +
    '<polygon points="14,18 24,10 24,38 14,30" fill="#ffffff"/>' +
    '<path d="M28 17c3.2 3.2 3.2 10.8 0 14" fill="none" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M33 13c5.2 5.4 5.2 16.6 0 22" fill="none" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round"/>' +
    '<line x1="12" y1="12" x2="36" y2="36" stroke="#ed1c24" stroke-width="5.5" stroke-linecap="round"/>' +
    '<line x1="12" y1="12" x2="36" y2="36" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round"/>' +
  '</svg>';

  function updateBgmButtons() {
    var btns = document.querySelectorAll(".bgm-btn");
    var isOn = !!(state.bgm || state.sound);
    for (var i = 0; i < btns.length; i++) {
      if (isOn) {
        btns[i].innerHTML = SPEAKER_ON_SVG;
        removeClass(btns[i], "off");
        addClass(btns[i], "on");
      } else {
        btns[i].innerHTML = SPEAKER_OFF_SVG;
        removeClass(btns[i], "on");
        addClass(btns[i], "off");
      }
    }
  }

  var curPassageIdx = 0;
  var readSpeed = 0.85; // 0.7: chậm, 0.85: vừa
  var isReadingSample = false;
  var readReturnScreen = "screenHome";
  var curWeekGroup = 0;
  var curWeekNum = 1;

  function getPassageWeekNum(p) {
    if (!p || !p.week) return 1;
    var m = p.week.match(/\d+/);
    return m ? parseInt(m[0], 10) : 1;
  }

  function firstPassageIdxOfWeek(wNum) {
    if (typeof READING_PASSAGES === "undefined") return 0;
    for (var i = 0; i < READING_PASSAGES.length; i++) {
      if (getPassageWeekNum(READING_PASSAGES[i]) === wNum) return i;
    }
    return 0;
  }

  function openPassageReader(idx) {
    if (typeof idx === "number") {
      curPassageIdx = idx;
    } else if (typeof state.lastPassageIdx === "number" && state.lastPassageIdx >= 0) {
      curPassageIdx = state.lastPassageIdx;
    } else {
      curPassageIdx = 0;
    }
    if (typeof READING_PASSAGES !== "undefined" && READING_PASSAGES.length > 0) {
      if (curPassageIdx >= READING_PASSAGES.length) curPassageIdx = READING_PASSAGES.length - 1;
      curWeekNum = getPassageWeekNum(READING_PASSAGES[curPassageIdx]);
      curWeekGroup = Math.floor((curWeekNum - 1) / 6);
    }
    state.lastSubj = "viet";
    state.lastUnitIdx = 4; // index của bài Luyện đọc đoạn văn
    state.lastPassageIdx = curPassageIdx;
    saveState();
    renderPassageScreen();
    showScreen("screenRead");
  }

  function renderPassageScreen() {
    if (typeof READING_PASSAGES === "undefined" || READING_PASSAGES.length === 0) return;
    if (curPassageIdx < 0) curPassageIdx = 0;
    if (curPassageIdx >= READING_PASSAGES.length) curPassageIdx = READING_PASSAGES.length - 1;

    var p = READING_PASSAGES[curPassageIdx];
    curWeekNum = getPassageWeekNum(p);
    curWeekGroup = Math.floor((curWeekNum - 1) / 6);
    $("readWeekTag").innerHTML = esc(p.week);
    $("readLessonTitle").innerHTML = esc(p.title);

    // 1. Bộ lọc 3 cụm tuần (Tuần 1-6, 7-12, 13-18) -> Tuần lẻ -> Các bài trong tuần
    var groupLabels = ["Tuần 1–6", "Tuần 7–12", "Tuần 13–18"];
    var grpEl = $("weekGroupTabs");
    if (grpEl) {
      var grpHtml = "";
      for (var g = 0; g < 3; g++) {
        grpHtml += '<button class="week-group-btn' + (g === curWeekGroup ? " active" : "") + '" data-wgrp="' + g + '">' + esc(groupLabels[g]) + '</button>';
      }
      grpEl.innerHTML = grpHtml;
      var gBtns = grpEl.querySelectorAll(".week-group-btn");
      for (var gb = 0; gb < gBtns.length; gb++) {
        onTap(gBtns[gb], function () {
          Sound.click();
          stopSampleReading();
          curWeekGroup = parseInt(this.getAttribute("data-wgrp"), 10) || 0;
          var targetWeek = curWeekGroup * 6 + 1;
          curPassageIdx = firstPassageIdxOfWeek(targetWeek);
          state.lastPassageIdx = curPassageIdx;
          saveState();
          renderPassageScreen();
        });
      }
    }

    var subEl = $("weekSubTabs");
    if (subEl) {
      var wStart = curWeekGroup * 6 + 1;
      var wEnd = Math.min(18, wStart + 5);
      var subHtml = "";
      for (var wn = wStart; wn <= wEnd; wn++) {
        var wAllDone = true, wHasAny = false;
        for (var wi = 0; wi < READING_PASSAGES.length; wi++) {
          if (getPassageWeekNum(READING_PASSAGES[wi]) === wn) {
            wHasAny = true;
            if (!(state.passages && state.passages[READING_PASSAGES[wi].id] > 0)) wAllDone = false;
          }
        }
        subHtml += '<button class="week-group-btn' + (wn === curWeekNum ? " active" : "") + '" data-wnum="' + wn + '">T' + wn + (wHasAny && wAllDone ? " ⭐" : "") + '</button>';
      }
      subEl.innerHTML = subHtml;
      var sBtns = subEl.querySelectorAll(".week-group-btn");
      for (var sb = 0; sb < sBtns.length; sb++) {
        onTap(sBtns[sb], function () {
          Sound.click();
          stopSampleReading();
          var targetW = parseInt(this.getAttribute("data-wnum"), 10) || 1;
          curPassageIdx = firstPassageIdxOfWeek(targetW);
          state.lastPassageIdx = curPassageIdx;
          saveState();
          renderPassageScreen();
        });
      }
    }

    var carHtml = "";
    for (var i = 0; i < READING_PASSAGES.length; i++) {
      var item = READING_PASSAGES[i];
      if (getPassageWeekNum(item) !== curWeekNum) continue;
      var isDone = state.passages && state.passages[item.id] > 0;
      var activeCls = i === curPassageIdx ? " active" : "";
      var shortTitle = item.title.split(":")[0];
      carHtml += '<button class="week-tab' + activeCls + '" data-pidx="' + i + '">' +
        esc(shortTitle) + (isDone ? " ⭐" : "") + "</button>";
    }
    $("weekCarousel").innerHTML = carHtml;
    var wTabs = $("weekCarousel").querySelectorAll(".week-tab");
    for (var j = 0; j < wTabs.length; j++) {
      onTap(wTabs[j], function () {
        Sound.click();
        stopSampleReading();
        curPassageIdx = parseInt(this.getAttribute("data-pidx"), 10);
        state.lastPassageIdx = curPassageIdx;
        saveState();
        renderPassageScreen();
      });
    }

    // 2. Từ ngữ ứng dụng (chạm từ nào đọc từ đó)
    var wordHtml = "";
    for (var w = 0; w < p.words.length; w++) {
      wordHtml += '<button class="word-chip" data-word="' + esc(p.words[w]) + '">' + esc(p.words[w]) + '</button>';
    }
    $("readWordChips").innerHTML = wordHtml;
    var chips = $("readWordChips").querySelectorAll(".word-chip");
    for (var c = 0; c < chips.length; c++) {
      onTap(chips[c], function () {
        var word = this.getAttribute("data-word");
        Sound.wordPop();
        addClass(this, "active");
        var self = this;
        setTimeout(function () { removeClass(self, "active"); }, 400);
        Sound.speak(word, "vi-VN", readSpeed);
      });
    }

    // 3. Câu ứng dụng
    var sentHtml = "";
    for (var s = 0; s < p.sentences.length; s++) {
      var sText = p.sentences[s];
      var wordsInS = sText.split(" ");
      var wordsMarkup = "";
      for (var sw = 0; sw < wordsInS.length; sw++) {
        var cleanW = wordsInS[sw].replace(/[.,!?;:]/g, "");
        wordsMarkup += '<span class="s-word" data-word="' + esc(cleanW) + '">' + esc(wordsInS[sw]) + '</span> ';
      }
      sentHtml += '<div class="sentence-card" id="sentCard_' + s + '">' +
        '<button class="s-speaker" data-sidx="' + s + '" title="Nghe câu này">🔊</button>' +
        '<div class="s-text">' + wordsMarkup + '</div>' +
        '</div>';
    }
    $("readSentences").innerHTML = sentHtml;
    var sSpeakers = $("readSentences").querySelectorAll(".s-speaker");
    for (var sp = 0; sp < sSpeakers.length; sp++) {
      onTap(sSpeakers[sp], function (e) {
        e.stopPropagation();
        var sidx = parseInt(this.getAttribute("data-sidx"), 10);
        playSentence(sidx, p.sentences[sidx]);
      });
    }
    var sWords = $("readSentences").querySelectorAll(".s-word");
    for (var swi = 0; swi < sWords.length; swi++) {
      onTap(sWords[swi], function () {
        var word = this.getAttribute("data-word");
        Sound.wordPop();
        addClass(this, "speaking");
        var self = this;
        setTimeout(function () { removeClass(self, "speaking"); }, 350);
        Sound.speak(word, "vi-VN", readSpeed);
      });
    }

    // 4. Đoạn văn hoàn chỉnh (chạm bất kỳ chữ nào đọc chữ đó, giữ xuống dòng thơ/hội thoại)
    var pLines = p.paragraph.split("\n");
    var pMarkup = "";
    for (var pl = 0; pl < pLines.length; pl++) {
      var pWords = pLines[pl].split(" ");
      for (var pw = 0; pw < pWords.length; pw++) {
        if (!pWords[pw]) continue;
        var cleanPW = pWords[pw].replace(/[.,!?;:"()–]/g, "");
        pMarkup += '<span class="p-word" data-word="' + esc(cleanPW) + '">' + esc(pWords[pw]) + '</span> ';
      }
      if (pl < pLines.length - 1) pMarkup += "<br>";
    }
    $("readParagraph").innerHTML = pMarkup;
    var pwEls = $("readParagraph").querySelectorAll(".p-word");
    for (var pwi = 0; pwi < pwEls.length; pwi++) {
      onTap(pwEls[pwi], function () {
        var word = this.getAttribute("data-word");
        Sound.wordPop();
        addClass(this, "speaking");
        var self = this;
        setTimeout(function () { removeClass(self, "speaking"); }, 350);
        Sound.speak(word, "vi-VN", readSpeed);
      });
    }

    stopSampleReading();
  }

  function playSentence(idx, text) {
    Sound.click();
    var card = $("sentCard_" + idx);
    if (card) {
      addClass(card, "speaking");
      setTimeout(function () { removeClass(card, "speaking"); }, 3000);
    }
    Sound.speak(text, "vi-VN", readSpeed);
  }

  function startSampleReading() {
    if (typeof READING_PASSAGES === "undefined") return;
    var p = READING_PASSAGES[curPassageIdx];
    if (!p) return;
    Sound.click();
    isReadingSample = true;
    $("btnPlayAll").style.display = "none";
    $("btnStopRead").style.display = "inline-block";

    Sound.speak(p.paragraph, "vi-VN", readSpeed);

    var wordCount = p.paragraph.split(" ").length;
    var approxMs = (wordCount * 450) / readSpeed;
    setTimeout(function () {
      if (isReadingSample) stopSampleReading();
    }, approxMs);
  }

  function stopSampleReading() {
    isReadingSample = false;
    Sound.stopSpeak();
    if ($("btnPlayAll")) $("btnPlayAll").style.display = "inline-block";
    if ($("btnStopRead")) $("btnStopRead").style.display = "none";
  }

  function finishPassageReading() {
    if (typeof READING_PASSAGES === "undefined") return;
    var p = READING_PASSAGES[curPassageIdx];
    if (!p) return;
    stopSampleReading();
    if (!askParentalGate("Xác nhận bé đã đọc xong " + p.title)) return;

    Sound.fanfare();
    confetti(30);

    ensureGamificationState();
    if (!state.passages) state.passages = {};
    var isFirstTime = !state.passages[p.id];
    state.passages[p.id] = 3;
    var rewardCoins = isFirstTime ? (parseInt(p.reward, 10) || 15) : 5;
    var replayNote = "";
    if (!isFirstTime) {
      if ((state.dailyQuest.replayCoinsCount || 0) < 5) {
        state.dailyQuest.replayCoinsCount = (state.dailyQuest.replayCoinsCount || 0) + 1;
      } else {
        rewardCoins = 0;
        replayNote = "<br><small style='color:#d97706'>Hôm nay bé nhận đủ 5 lượt xu ôn bài rồi, thử bài mới nhé!</small>";
      }
    }
    state.coins += rewardCoins;
    var actRes = recordDailyActivity("viet");
    saveState();
    renderHome();

    var totalEarned = rewardCoins + (actRes.bonusCoins || 0);
    if (totalEarned > 0) {
      floatPoints("+" + totalEarned + " <i class='coin sm'></i>", $("btnReadFinish"));
      setTimeout(function () { Sound.coin(); }, 900);
    }

    var bonusHtml = actRes.bonusNotes && actRes.bonusNotes.length
      ? "<br><small style='color:#15803d;font-weight:800'>" + actRes.bonusNotes.join(" • ") + "</small>"
      : "";

    $("infoTitle").innerHTML = "🎉 XUẤT SẮC LẮM!";
    $("infoBody").innerHTML =
      '<div style="text-align:center;padding:10px 0">' +
      '<div style="font-size:54px;margin-bottom:8px">⭐ ⭐ ⭐</div>' +
      '<div style="font-size:22px;font-weight:800;color:#15803d;margin-bottom:8px">Bé đã đọc xong ' + esc(p.week + " — " + p.title) + '!</div>' +
      '<div style="font-size:17px;color:#4a3520;margin-bottom:12px">Bé đọc rất to, rõ ràng và truyền cảm.<br>' +
      (totalEarned > 0 ? 'Thưởng cho bé <b>+' + totalEarned + ' xu vàng</b> nhé!' : 'Bé chăm chỉ quá!') +
      bonusHtml + replayNote + '</div>' +
      '</div>';
    openOverlay("infoOverlay");
    renderPassageScreen();
  }

  function startGame() {
    clearTimers();
    Sound.stopSpeak();
    var u = UNITS[curSubj][curUnitIdx];
    var qs = shuffle(unitQuestions(curSubj, u.topic).slice());
    // Điều chỉnh thứ tự câu hỏi thích ứng (ZPD): nếu bé đang gặp khó, xếp câu ngắn/dễ lên đầu; nếu quá dễ, ưu tiên câu dài hơn
    if (typeof analyzeSubjectZPD === "function" && qs.length > 3) {
      var zpd = analyzeSubjectZPD(curSubj);
      if (zpd.status === "hard") {
        qs.sort(function (a, b) { return String(a.prompt || "").length - String(b.prompt || "").length; });
      } else if (zpd.status === "easy") {
        qs.sort(function (a, b) { return String(b.prompt || "").length - String(a.prompt || "").length; });
      }
    }
    game = {
      subj: curSubj, topic: u.topic, mode: curMode, score: 0, max: 0, idx: 0, list: [], tries: 0, locked: false,
      lang: curSubj === "eng" ? "en-US" : "vi-VN",
      startTs: Date.now(), qStartTs: Date.now(), totalRtMs: 0, rtCount: 0, fastGuessCount: 0, audioReplays: 0, correctCount: 0, finalized: false
    };

    $("mascotImg").innerHTML = mascotHTML();
    $("hudScore").innerHTML = "0";
    $("hudBar").style.width = "0%";
    $("boardLesson").innerHTML = u.icon + " " + u.title;

    if (curMode === "memory" || curMode === "match") {
      var pairs = buildPairs(qs);
      if (pairs.length < 3) {
        // Không đủ cặp trong bài -> lấy thêm từ cả môn
        pairs = buildPairs(shuffle((QUESTION_BANK[curSubj] || []).slice()));
      }
      var maxPairs = curMode === "match" ? 5 : 6;
      game.pairs = pairs.slice(0, pairs.length >= maxPairs ? maxPairs : Math.min(4, pairs.length));
      game.max = game.pairs.length * 10;
      showScreen("screenGame");
      if (curMode === "match") renderMatch(); else renderMemory();
    } else {
      game.list = qs.slice(0, curMode === "balloon" ? 6 : 8);
      game.max = game.list.length * 10;
      state.lastSubj = curSubj;
      state.lastUnitIdx = curUnitIdx;
      state.lastMode = curMode;
      saveState();
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
      var textToSpeak = q.readPrompt || q.prompt;
      if (q.visualType === "formula" && q.visual && /[+\-=]/.test(q.visual) && q.visual.indexOf("?") !== -1) {
        var mathExpr = q.visual.replace(/\?/g, "mấy").replace(/\+/g, " cộng ").replace(/\-/g, " trừ ").replace(/=/g, " bằng ");
        if (textToSpeak.indexOf("+") === -1 && textToSpeak.indexOf("-") === -1) {
          textToSpeak = textToSpeak + ": " + mathExpr;
        }
      }
      Sound.speak(textToSpeak, "vi-VN");
    }
  }

  // ----- Hiển thị minh họa câu hỏi -----
  function visualHTML(q, compact) {
    if (q.visualType === "icons") {
      if (!compact && q.topic === "count") {
        var tapIcons = extractEmojiList(q.visual);
        if (tapIcons && tapIcons.length >= 2 && tapIcons.length <= 12) {
          var th = '<div class="tap-count-wrap">' +
            '<div class="tap-count-bar"><span class="tap-count-label" id="tapCountLabel">👆 Chạm từng hình để đếm: <b>0</b></span>' +
            '<button type="button" class="tap-reset-btn" id="tapResetBtn">Đếm lại ↺</button></div>' +
            '<div class="tap-count-grid">';
          for (var ti = 0; ti < tapIcons.length; ti++) {
            th += '<button type="button" class="tap-item" data-counted="0">' + esc(tapIcons[ti]) + '</button>';
          }
          th += '</div></div>';
          return th;
        }
      }
      return '<div class="v-icons">' + esc(q.visual) + "</div>";
    }
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
    game.qStartTs = Date.now();
    $("boardHead").innerHTML = "Câu " + (game.idx + 1) + "/" + game.list.length;
    $("boardPrompt").innerHTML = esc(q.prompt);
    if (game.mode === "balloon") renderBalloon(q); else renderQuiz(q);
    readPrompt(q);
  }

  // ===== CHẾ ĐỘ 1: PHIẾN ĐÁ BÍ ẨN (trắc nghiệm) =====
  function renderQuiz(q) {
    say(game.idx === 0 ? "Bé chọn phiến đá có đáp án đúng nhé! Mỗi câu chỉ được chọn 1 lần thôi nha! 🌟" : pick(["Câu tiếp theo nè!", "Suy nghĩ kỹ rồi hãy chọn nhé! 🧐", "Bé làm được mà! 😊"]));
    var opts = shuffle(q.options.slice());
    var html = '<div class="visual-card">' + visualHTML(q) + '</div><div class="stone-grid">';
    for (var i = 0; i < opts.length; i++) {
      var longCls = String(opts[i]).length > 9 ? " long" : "";
      html += '<button class="stone' + longCls + '" style="-webkit-animation-delay:' + (i * 0.06) + 's;animation-delay:' + (i * 0.06) + 's" data-val="' + esc(opts[i]) + '">' + esc(opts[i]) + "</button>";
    }
    html += "</div>";
    $("gameStage").innerHTML = html;
    bindTapCount();
    var stones = $("gameStage").querySelectorAll(".stone");
    for (var k = 0; k < stones.length; k++) {
      onTap(stones[k], function () { answerQuiz(this, q); });
    }
  }

  function bindTapCount() {
    var items = $("gameStage").querySelectorAll(".tap-item");
    if (!items || !items.length) return;
    var count = 0;
    var total = items.length;
    var label = $("tapCountLabel");
    var resetBtn = $("tapResetBtn");

    function updateLabel() {
      if (label) label.innerHTML = "👆 Chạm từng hình để đếm: <b>" + count + "</b>";
    }

    for (var i = 0; i < items.length; i++) {
      onTap(items[i], function () {
        if (game.locked || this.getAttribute("data-counted") === "1") return;
        this.setAttribute("data-counted", "1");
        count++;
        addClass(this, "counted");
        var badge = document.createElement("span");
        badge.className = "tap-badge";
        badge.innerHTML = String(count);
        this.appendChild(badge);
        updateLabel();
        Sound.countNote(count);
        if (count === total) later(function () { Sound.sparkle(); }, 180);
        if (state.sound) Sound.speak(String(count), "vi-VN");
      });
    }

    if (resetBtn) {
      onTap(resetBtn, function () {
        Sound.click();
        count = 0;
        updateLabel();
        for (var j = 0; j < items.length; j++) {
          items[j].setAttribute("data-counted", "0");
          removeClass(items[j], "counted");
          var b = items[j].querySelector(".tap-badge");
          if (b) b.parentNode.removeChild(b);
        }
      });
    }
  }

  function flashFeedback(isGood) {
    var st = $("gameStage");
    if (!st) return;
    removeClass(st, "flash-good");
    removeClass(st, "flash-bad");
    void st.offsetWidth;
    addClass(st, isGood ? "flash-good" : "flash-bad");
    setTimeout(function () {
      removeClass(st, "flash-good");
      removeClass(st, "flash-bad");
    }, 650);
  }

  function answerQuiz(btn, q) {
    if (game.locked || hasClass(btn, "disabled")) return;
    game.locked = true; // Chỉ 1 cơ hội duy nhất, khóa ngay lập tức!
    var val = btn.getAttribute("data-val");
    var rt = Math.min(60000, Math.max(200, Date.now() - (game.qStartTs || game.startTs || Date.now())));
    game.totalRtMs = (game.totalRtMs || 0) + rt;
    game.rtCount = (game.rtCount || 0) + 1;
    if (val === q.answer) {
      game.correctCount = (game.correctCount || 0) + 1;
      addClass(btn, "correct");
      flashFeedback(true);
      var pts = 10;
      game.score += pts;
      updateHud();
      floatPoints("+" + pts, btn);
      Sound.good();
      var toSpeak = q.speakText || (game.lang === "en-US" ? q.answer : null);
      if (toSpeak) later(function () { Sound.speak(toSpeak, game.lang); }, 450);
      say(pick(PRAISE), "good");
      if (Math.random() < 0.35) confetti(8);
      later(function () { game.idx++; nextQuestion(); }, 1500);
    } else {
      // CHỌN SAI -> FAILED NGAY LẬP TỨC!
      if (rt < 1200) game.fastGuessCount = (game.fastGuessCount || 0) + 1;
      addClass(btn, "wrong");
      flashFeedback(false);
      Sound.bad();
      var all = $("gameStage").querySelectorAll(".stone");
      for (var i = 0; i < all.length; i++) {
        if (all[i].getAttribute("data-val") === q.answer) {
          addClass(all[i], "correct");
        } else {
          addClass(all[i], "disabled");
        }
      }
      var wrongMsg = pick([
        "Tiếc quá, chưa đúng rồi! Đáp án đúng là: <b>" + esc(q.answer) + "</b>",
        "Chưa đúng rồi nè! Đáp án đúng là: <b>" + esc(q.answer) + "</b>",
        "Ối, sai mất rồi! Đáp án đúng là: <b>" + esc(q.answer) + "</b>. Lần sau bé chú ý nhé! 💪"
      ]);
      say(wrongMsg, "bad");
      var toSpeakWrong = q.speakText || (game.lang === "en-US" ? q.answer : q.answer);
      if (toSpeakWrong) {
        later(function () { Sound.speak("Đáp án đúng là " + toSpeakWrong, game.lang); }, 500);
      }
      later(function () { game.idx++; nextQuestion(); }, 2500);
    }
  }

  // ===== CHẾ ĐỘ 2: BÓNG BAY TRI THỨC =====
  var BALLOON_COLORS = ["b-red", "b-blue", "b-green", "b-purple", "b-orange"];
  function renderBalloon(q) {
    say(game.idx === 0 ? "Chạm vào quả bóng đúng nhé! Chỉ được chọn 1 lần thôi! 🎈" : "Bóng đang bay lên kìa! Nhìn kỹ rồi chạm nhé!");
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
    // Nếu bóng đúng bay mất mà bé chưa bắn -> FAILED ngay, không cho chọn lại!
    later(function () {
      if (game.locked) return;
      game.locked = true;
      say("Bóng bay mất rồi! Đáp án đúng là: <b>" + esc(q.answer) + "</b> 😉", "bad");
      Sound.bad();
      var toSpeakEnd = q.speakText || (game.lang === "en-US" ? q.answer : q.answer);
      if (toSpeakEnd) {
        later(function () { Sound.speak("Đáp án đúng là " + toSpeakEnd, game.lang); }, 400);
      }
      later(function () { game.idx++; nextQuestion(); }, 2400);
    }, correctEnd + 200);
  }

  function answerBalloon(el, q) {
    if (game.locked || hasClass(el, "popped")) return;
    game.locked = true; // Chỉ 1 cơ hội duy nhất, khóa ngay lập tức!
    var val = el.getAttribute("data-val");
    var rt = Math.min(60000, Math.max(200, Date.now() - (game.qStartTs || game.startTs || Date.now())));
    game.totalRtMs = (game.totalRtMs || 0) + rt;
    game.rtCount = (game.rtCount || 0) + 1;
    var arena = $("arena");
    var r = el.getBoundingClientRect(), ar = arena.getBoundingClientRect();
    var star = document.createElement("div");
    star.className = "pop-star";
    star.style.left = (r.left - ar.left + r.width / 2 - 20) + "px";
    star.style.top = (r.top - ar.top + 20) + "px";
    if (val === q.answer) {
      game.correctCount = (game.correctCount || 0) + 1;
      star.innerHTML = "🌟";
      arena.appendChild(star);
      addClass(el, "ok");
      flashFeedback(true);
      Sound.pop();
      later(function () { addClass(el, "popped"); Sound.good(); }, 150);
      var pts = 10;
      game.score += pts;
      updateHud();
      floatPoints("+" + pts, el);
      say(pick(PRAISE), "good");
      var toSpeak = q.speakText || (game.lang === "en-US" ? q.answer : null);
      if (toSpeak) later(function () { Sound.speak(toSpeak, game.lang); }, 500);
      later(function () { game.idx++; nextQuestion(); }, 1600);
    } else {
      // BẮN SAI BÓNG -> FAILED NGAY LẬP TỨC!
      if (rt < 1200) game.fastGuessCount = (game.fastGuessCount || 0) + 1;
      star.innerHTML = "💨";
      arena.appendChild(star);
      addClass(el, "popped");
      flashFeedback(false);
      Sound.pop();
      later(function () { Sound.bad(); }, 100);
      say("Chưa đúng rồi! Đáp án đúng là: <b>" + esc(q.answer) + "</b> 🎈", "bad");
      var toSpeakWrong = q.speakText || (game.lang === "en-US" ? q.answer : q.answer);
      if (toSpeakWrong) {
        later(function () { Sound.speak("Đáp án đúng là " + toSpeakWrong, game.lang); }, 500);
      }
      later(function () { game.idx++; nextQuestion(); }, 2500);
    }
  }

  // ===== CHẾ ĐỘ 3: LẬT THẺ THẦN KỲ =====
  function isEmojiOnly(s) { return !/[A-Za-z0-9À-ỹ]/.test(s); }

  function extractEmojiList(s) {
    var str = String(s || "").trim();
    if (/[A-Za-z0-9À-ỹ]/.test(str)) return null;
    var clean = str.replace(/[\s\r\n]+/g, "");
    if (!clean) return null;
    var icons = [];
    for (var i = 0; i < clean.length; i++) {
      var c = clean.charCodeAt(i);
      if (c >= 0xD800 && c <= 0xDBFF && i + 1 < clean.length) {
        icons.push(clean.charAt(i) + clean.charAt(i + 1));
        i++;
      } else {
        icons.push(clean.charAt(i));
      }
    }
    return icons.length > 0 ? icons : null;
  }

  function renderCardFront(text) {
    var str = String(text != null ? text : "");
    var icList = extractEmojiList(str);
    if (icList && icList.length > 0) {
      if (icList.length === 1) {
        return '<div class="mface front emo emo-single">' + esc(icList[0]) + '</div>';
      }
      var count = icList.length;
      var cClass = count <= 10 ? " c-" + count : " c-many";
      var html = '<div class="mface front emo"><div class="m-icon-grid' + cClass + '">';
      for (var m = 0; m < icList.length; m++) {
        html += '<span class="m-ic">' + esc(icList[m]) + '</span>';
      }
      html += '</div></div>';
      return html;
    }
    var isShort = str.length <= 4;
    var cls = isShort ? " front short-txt" : " front";
    return '<div class="mface' + cls + '">' + esc(str) + '</div>';
  }

  function buildPairs(qs) {
    var pairs = [], usedA = {}, usedL = {};
    for (var i = 0; i < qs.length; i++) {
      var q = qs[i], left = null, right = q.pairAnswer || q.answer;
      if (q.visualType === "word" || q.visualType === "eng") {
        left = String(q.visual).split(" ")[0];
      } else if (q.visualType === "formula") {
        var f = String(q.visual).replace(/\s*=\s*\?\s*$/, "");
        if (f.indexOf("?") === -1 && f.length <= 11 && /[+\-]/.test(f)) left = f;
      } else if (q.visualType === "icons") {
        var v = String(q.visual).replace(/[\r\n]+/g, " ").trim();
        if (/^\d+$/.test(String(q.answer).trim())) {
          var icList = extractEmojiList(v);
          if (icList && icList.length >= 1 && icList.length <= 10) left = v;
        }
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
      html += '<div class="mcard" data-id="' + cards[k].id + '"><div class="mcard-inner">' +
        '<div class="mface back">✦</div>' + renderCardFront(cards[k].text) + "</div></div>";
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
        flashFeedback(true);
        game.matched++;
        game.score += 10;
        updateHud();
        floatPoints("+10", b);
        Sound.good();
        var p = game.pairs[parseInt(a.getAttribute("data-id"), 10)];
        if (p && p.speak) {
          later(function () { Sound.speak(p.speak, game.lang); }, 400);
        }
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
      flashFeedback(false);
      later(function () {
        Sound.bad();
        say(pick(["Chưa khớp rồi! Thử lại nha 🙂", "Nhớ vị trí thẻ nhé bé!", "Gần đúng rồi đó! 💪"]), "bad");
        removeClass(a, "flipped"); removeClass(b, "flipped");
        game.flipped = []; game.locked = false;
      }, 1000);
    }
  }

  // ===== CHẾ ĐỘ 4: GHÉP ĐÔI NHANH (Tap-to-Match) =====
  function renderMatch() {
    clearTimers();
    var pairs = game.pairs;
    game.matched = 0; game.misses = 0; game.locked = false;
    game.selLeft = null; game.selRight = null;
    $("boardHead").innerHTML = "Ghép đôi";
    $("boardPrompt").innerHTML = "Chạm 1 thẻ bên <b>trái</b> và 1 thẻ bên <b>phải</b> để ghép thành cặp đúng!";
    say("Bé chạm nối từng cặp hình và đáp án nhé! 🧩");

    var leftList = [], rightList = [];
    for (var i = 0; i < pairs.length; i++) {
      leftList.push({ id: i, text: pairs[i].a });
      rightList.push({ id: i, text: pairs[i].b });
    }
    shuffle(leftList);
    shuffle(rightList);

    var html = '<div class="match-board"><div class="match-col"><div class="match-col-title">🖼️ Hình / Câu hỏi</div>';
    for (var l = 0; l < leftList.length; l++) {
      var lEmo = isEmojiOnly(leftList[l].text) ? " emo" : "";
      html += '<button type="button" class="match-card' + lEmo + '" data-side="left" data-id="' + leftList[l].id + '">' + esc(leftList[l].text) + "</button>";
    }
    html += '</div><div class="match-col"><div class="match-col-title">✨ Đáp án</div>';
    for (var r = 0; r < rightList.length; r++) {
      var rEmo = isEmojiOnly(rightList[r].text) ? " emo" : "";
      html += '<button type="button" class="match-card' + rEmo + '" data-side="right" data-id="' + rightList[r].id + '">' + esc(rightList[r].text) + "</button>";
    }
    html += "</div></div>";

    $("gameStage").innerHTML = html;
    var cards = $("gameStage").querySelectorAll(".match-card");
    for (var k = 0; k < cards.length; k++) {
      onTap(cards[k], function () { pickMatchCard(this); });
    }
    if (state.autoRead) Sound.speak("Chạm một thẻ bên trái và một thẻ bên phải để ghép thành cặp đúng", "vi-VN");
  }

  function pickMatchCard(el) {
    if (game.locked || hasClass(el, "matched")) return;
    var side = el.getAttribute("data-side");
    Sound.flip();

    if (side === "left") {
      if (game.selLeft) removeClass(game.selLeft, "selected");
      game.selLeft = el;
      addClass(el, "selected");
    } else {
      if (game.selRight) removeClass(game.selRight, "selected");
      game.selRight = el;
      addClass(el, "selected");
    }

    if (!game.selLeft || !game.selRight) return;
    game.locked = true;
    var leftEl = game.selLeft, rightEl = game.selRight;
    var leftId = leftEl.getAttribute("data-id"), rightId = rightEl.getAttribute("data-id");

    if (leftId === rightId) {
      removeClass(leftEl, "selected"); removeClass(rightEl, "selected");
      addClass(leftEl, "matched"); addClass(rightEl, "matched");
      flashFeedback(true);
      game.matched++;
      game.score += 10;
      updateHud();
      floatPoints("+10", rightEl);
      Sound.good();
      var p = game.pairs[parseInt(leftId, 10)];
      if (p && p.speak) later(function () { Sound.speak(p.speak, game.lang); }, 350);
      say(pick(PRAISE), "good");
      game.selLeft = null; game.selRight = null; game.locked = false;

      if (game.matched >= game.pairs.length) {
        later(function () {
          game.score = Math.max(Math.round(game.max * 0.4), game.score - Math.max(0, game.misses) * 2);
          finishGame();
        }, 1000);
      }
    } else {
      game.misses++;
      flashFeedback(false);
      Sound.bad();
      addClass(leftEl, "wrong"); addClass(rightEl, "wrong");
      say(pick(["Chưa khớp rồi! Bé chọn cặp khác nhé 🙂", "Gần đúng rồi, thử lại nha! 💪"]), "bad");
      later(function () {
        removeClass(leftEl, "selected"); removeClass(rightEl, "selected");
        removeClass(leftEl, "wrong"); removeClass(rightEl, "wrong");
        game.selLeft = null; game.selRight = null; game.locked = false;
      }, 550);
    }
  }

  // ===== KẾT THÚC & PHẦN THƯỞNG =====
  function finishGame() {
    clearTimers();
    if (game) game.finalized = true;
    var ratio = game.max ? game.score / game.max : 0;
    var stars = ratioToHalfStars(ratio);
    var mode = null;
    for (var i = 0; i < MODES.length; i++) if (MODES[i].id === game.mode) mode = MODES[i];
    var coins = stars > 0 ? Math.max(2, Math.round(mode.reward * stars / 3)) : 2;

    var key = unitKey(game.subj, game.topic);
    if (!state.progress[key]) state.progress[key] = {};
    if (!state.progress[key].stats) state.progress[key].stats = {};
    var modeTotal = (game.mode === "match" || game.mode === "memory") ? (game.pairs ? game.pairs.length : 0) : (game.list ? game.list.length : 0);
    if (modeTotal > 0) {
      var modeCorrect = Math.min(modeTotal, Math.max(0, Math.round(ratio * modeTotal)));
      var prevStat = state.progress[key].stats[game.mode];
      var bestCorrect = (prevStat && typeof prevStat.correct === "number") ? Math.max(prevStat.correct, modeCorrect) : modeCorrect;
      state.progress[key].stats[game.mode] = { correct: bestCorrect, total: modeTotal };
    }
    var oldBest = state.progress[key][game.mode] || 0;
    var badgesBefore = countBadges();
    if (stars > oldBest) state.progress[key][game.mode] = stars;

    ensureGamificationState();
    var replayNote = "";
    if (oldBest >= 3 && stars > 0) {
      if ((state.dailyQuest.replayCoinsCount || 0) < 5) {
        coins = Math.max(3, Math.round(coins * 0.3));
        state.dailyQuest.replayCoinsCount = (state.dailyQuest.replayCoinsCount || 0) + 1;
      } else {
        coins = 0;
        replayNote = "<br><small style='color:#d97706'>Hôm nay bé nhận đủ 5 lượt xu ôn bài rồi, thử bài mới nhé!</small>";
      }
    }
    state.coins += coins;
    var actRes = stars > 0 ? recordDailyActivity(game.subj) : { bonusCoins: 0, bonusNotes: [] };
    if (typeof recordTelemetry === "function") recordTelemetry(true);
    saveState();
    var newBadge = countBadges() > badgesBefore;

    $("resultTitle").innerHTML = stars >= 3 ? "XUẤT SẮC!" : stars >= 2 ? "GIỎI LẮM!" : stars >= 1 ? "HOÀN THÀNH!" : "CỐ LÊN NÀO!";
    var sh = "";
    for (var s = 0; s < 3; s++) {
      var delay = 'style="-webkit-animation-delay:' + (0.2 + s * 0.25) + 's;animation-delay:' + (0.2 + s * 0.25) + 's"';
      if (stars >= s + 1) sh += '<span ' + delay + '>⭐</span>';
      else if (stars >= s + 0.5) sh += '<span class="star-half" ' + delay + '><span class="star-bg">⭐</span><span class="star-fg">⭐</span></span>';
      else sh += '<span class="off" ' + delay + '>⭐</span>';
    }
    $("resultStars").innerHTML = sh;
    var bonusHtml = actRes.bonusNotes.length ? "<br><small style='color:#15803d;font-weight:800'>" + actRes.bonusNotes.join(" • ") + "</small>" : "";
    $("resultScore").innerHTML = "Điểm: " + game.score + " / " + game.max + " (" + stars + "/3 ⭐)" + (newBadge ? "<br>🏅 Bé nhận được huy hiệu mới!" : "") + bonusHtml + replayNote;
    $("resultCoins").innerHTML = "+" + (coins + actRes.bonusCoins) + ' <i class="coin big"></i>';
    openOverlay("resultOverlay");
    if (stars >= 2) { Sound.fanfare(); confetti(26); } else { Sound.good(); }
    later(function () { Sound.coin(); }, 900);
    var starText = String(stars).replace(".", " phẩy ");
    var msg = stars >= 3 ? "Tuyệt vời! Bé đạt 3 sao!" : stars >= 1.5 ? ("Giỏi lắm! Bé đạt " + starText + " sao!") : stars > 0 ? ("Bé đạt " + starText + " sao! Chơi lại để được nhiều sao hơn nhé!") : "Không sao đâu, mình chơi lại nhé!";
    later(function () { if (state.autoRead) Sound.speak(msg, "vi-VN"); }, 1300);
  }

  function countBadges() {
    var ts = totalStars(), n = 0;
    for (var i = 0; i < BADGES.length; i++) if (ts >= BADGES[i].need) n++;
    return n;
  }

  // ---------------------------------------------------------
  // 10A. HỆ THỐNG AI TRACKING HÀNH VI & PHÂN TÍCH ĐỘ KHÓ (PHA 1 + PHA 2)
  // ---------------------------------------------------------
  function recordTelemetry(completed) {
    if (!game) return;
    if (!Array.isArray(state.telemetry)) state.telemetry = [];
    var totalQ = (game.mode === "match" || game.mode === "memory")
      ? (game.pairs ? game.pairs.length : 0)
      : (game.list ? game.list.length : 0);
    if (!totalQ) totalQ = 1;
    var ratio = game.max ? Math.min(1, Math.max(0, game.score / game.max)) : 0;
    var correct = (game.mode === "quiz" || game.mode === "balloon")
      ? (game.correctCount || Math.round(ratio * totalQ))
      : Math.round(ratio * totalQ);
    var avgMs = game.rtCount > 0
      ? Math.round(game.totalRtMs / game.rtCount)
      : Math.round((Date.now() - (game.startTs || Date.now())) / totalQ);
    avgMs = Math.min(45000, Math.max(300, avgMs));

    state.telemetry.push({
      ts: Date.now(),
      subj: game.subj,
      topic: game.topic,
      mode: game.mode,
      correct: Math.min(totalQ, Math.max(0, correct)),
      total: totalQ,
      avgMs: avgMs,
      fastGuessCount: game.fastGuessCount || 0,
      audioReplays: game.audioReplays || 0,
      completed: !!completed
    });
    if (state.telemetry.length > 80) {
      state.telemetry = state.telemetry.slice(state.telemetry.length - 80);
    }
  }

  function analyzeSubjectZPD(subj) {
    var list = [];
    var raw = Array.isArray(state.telemetry) ? state.telemetry : [];
    for (var i = 0; i < raw.length; i++) {
      if (raw[i] && raw[i].subj === subj) list.push(raw[i]);
    }
    if (list.length === 0) {
      return {
        subj: subj, status: "nodata", label: "⚪ Chưa đủ dữ liệu", cls: "nodata",
        avgAcc: 0, avgSec: 0, sessions: 0, fastGuesses: 0, replays: 0, abandons: 0,
        advice: "Bé hãy chơi thêm 1–2 ván để AI đo tốc độ & độ phù hợp."
      };
    }
    var recent = list.slice(-8);
    var sumC = 0, sumT = 0, sumMs = 0, fastG = 0, rep = 0, aban = 0;
    for (var j = 0; j < recent.length; j++) {
      var r = recent[j];
      sumC += (r.correct || 0);
      sumT += (r.total || 1);
      sumMs += (r.avgMs || 4000);
      fastG += (r.fastGuessCount || 0);
      rep += (r.audioReplays || 0);
      if (!r.completed) aban++;
    }
    var avgAcc = sumT > 0 ? Math.round((sumC / sumT) * 100) : 0;
    var avgMs = Math.round(sumMs / recent.length);
    var avgSec = Math.round(avgMs / 100) / 10;

    var status = "optimal";
    var label = "🟡 Vừa sức (Tối ưu)";
    var cls = "optimal";
    var advice = "Độ khó đang rất phù hợp! Duy trì nhịp học hiện tại.";

    if (avgAcc < 50 && fastG >= 3) {
      status = "guessing";
      label = "⚠️ Bấm nhanh đoán mò";
      cls = "warn";
      advice = "Bé bấm nhanh (" + avgSec + "s/câu) khi chưa nghe hết đề. Ba mẹ nhắc bé nghe hết loa rồi chọn nhé!";
    } else if (avgAcc < 58 || avgMs > 12000 || (aban / recent.length) > 0.3) {
      status = "hard";
      label = "🔴 Hơi khó • Cần GIẢM";
      cls = "hard";
      advice = "Đúng " + avgAcc + "% (" + avgSec + "s/câu). Nên ôn lại chặng nền & dùng Phiến Đá trước khi qua Bóng Bay.";
    } else if (avgAcc >= 90 && avgMs <= 3800 && recent.length >= 2) {
      status = "easy";
      label = "🟢 Quá dễ • Nên TĂNG";
      cls = "easy";
      advice = "Đúng tới " + avgAcc + "% chỉ trong " + avgSec + "s/câu! Nên cho bé nhảy chặng hoặc chơi Bóng Bay tăng tốc.";
    }

    return {
      subj: subj, status: status, label: label, cls: cls,
      avgAcc: avgAcc, avgSec: avgSec, sessions: recent.length,
      fastGuesses: fastG, replays: rep, abandons: aban, advice: advice
    };
  }

  function analyzeLearningBehavior() {
    var zpdMap = {
      math: analyzeSubjectZPD("math"),
      viet: analyzeSubjectZPD("viet"),
      eng: analyzeSubjectZPD("eng")
    };

    var raw = Array.isArray(state.telemetry) ? state.telemetry : [];
    var buckets = {
      morning: { label: "Buổi sáng (6h–11h)", c: 0, t: 0, n: 0 },
      afternoon: { label: "Buổi trưa/chiều (12h–17h)", c: 0, t: 0, n: 0 },
      evening: { label: "Buổi tối (18h–22h)", c: 0, t: 0, n: 0 }
    };
    var totalFast = 0, totalRep = 0;
    for (var i = 0; i < raw.length; i++) {
      var r = raw[i];
      totalFast += (r.fastGuessCount || 0);
      totalRep += (r.audioReplays || 0);
      var hr = new Date(r.ts || Date.now()).getHours();
      var bk = (hr >= 6 && hr < 12) ? buckets.morning : (hr >= 12 && hr < 18) ? buckets.afternoon : buckets.evening;
      bk.c += (r.correct || 0);
      bk.t += (r.total || 0);
      bk.n++;
    }
    var bestWindow = null, bestAcc = -1;
    var bKeys = ["morning", "afternoon", "evening"];
    for (var bi = 0; bi < bKeys.length; bi++) {
      var b = buckets[bKeys[bi]];
      if (b.n >= 2 && b.t > 0) {
        var acc = Math.round((b.c / b.t) * 100);
        if (acc > bestAcc) { bestAcc = acc; bestWindow = b.label + " (" + acc + "% đúng)"; }
      }
    }

    return {
      zpd: zpdMap,
      totalSessions: raw.length,
      bestWindow: bestWindow,
      totalFastGuesses: totalFast,
      totalAudioReplays: totalRep
    };
  }

  function aiConfigStoreKey() { return STORE_PREFIX + "_ai_coach_v1"; }
  function aiCacheStoreKey() { return STORE_PREFIX + "_ai_last_" + currentProfileId; }

  function getAIConfig() {
    try {
      var raw = localStorage.getItem(aiConfigStoreKey());
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { apiKey: "", proxyUrl: "" };
  }
  function saveAIConfig(cfg) {
    try { localStorage.setItem(aiConfigStoreKey(), JSON.stringify(cfg || {})); } catch (e) {}
  }

  function openAIConfigModal() {
    var cfg = getAIConfig();
    var masked = cfg.apiKey ? (cfg.apiKey.slice(0, 6) + "••••••" + cfg.apiKey.slice(-4)) : "Chưa cài đặt";
    var html = '<div style="margin-bottom:10px;"><button class="small-btn" id="backToSetFromAiBtn">‹ Quay lại Cài đặt</button></div>' +
      '<div class="guide-item"><span class="gi-ic">🔐</span><div>Key AI chỉ lưu <b>riêng trên máy Ba Mẹ</b> (không đẩy lên GitHub hay máy khác). Ba Mẹ có thể lấy Gemini API Key miễn phí tại <b>aistudio.google.com</b> hoặc dùng Cloudflare Worker Proxy.</div></div>' +
      '<div class="set-section-title" style="margin-top:10px;">🤖 Gemini API Key (Trạng thái: ' + esc(masked) + ')</div>' +
      '<input class="parent-rw-input" id="aiKeyInput" type="password" style="width:100%;margin-bottom:10px;" placeholder="Dán Gemini API Key (AIza...) nếu muốn đổi mới">' +
      '<div class="set-section-title">🌐 Hoặc Proxy URL (Tùy chọn)</div>' +
      '<input class="parent-rw-input" id="aiProxyInput" type="url" style="width:100%;margin-bottom:12px;" value="' + esc(cfg.proxyUrl || "") + '" placeholder="https://your-worker.workers.dev">' +
      '<div style="display:-webkit-flex;display:flex;gap:8px;">' +
        '<button type="button" class="small-btn" id="saveAiCfgBtn" style="flex:1;height:40px;">💾 Lưu cấu hình AI</button>' +
        '<button type="button" class="small-btn red" id="clearAiCfgBtn" style="height:40px;">🗑️ Xóa Key</button>' +
      '</div>';

    $("infoTitle").innerHTML = "🤖 Cấu Hình Trợ Lý AI";
    $("infoBody").innerHTML = html;

    onTap($("backToSetFromAiBtn"), function () { Sound.click(); openSettings(); });
    onTap($("saveAiCfgBtn"), function () {
      var nextKey = ($("aiKeyInput").value || "").trim();
      var nextProxy = ($("aiProxyInput").value || "").trim();
      var cur = getAIConfig();
      saveAIConfig({
        apiKey: nextKey ? nextKey : (cur.apiKey || ""),
        proxyUrl: nextProxy
      });
      Sound.good();
      window.alert("✅ Đã lưu cấu hình Trợ lý AI! Ba Mẹ có thể vào mục Báo Cáo để bấm 'AI Tư Vấn Sâu'.");
      openSettings();
    });
    onTap($("clearAiCfgBtn"), function () {
      saveAIConfig({ apiKey: "", proxyUrl: "" });
      Sound.click();
      window.alert("Đã xóa API Key khỏi máy.");
      openAIConfigModal();
    });
    openOverlay("infoOverlay");
  }

  function callAICoach(outputEl, btnEl, needWorkList) {
    var cfg = getAIConfig();
    if (!cfg.apiKey && !cfg.proxyUrl) {
      outputEl.innerHTML = '<div style="color:#b45309;font-size:13px;line-height:1.5">' +
        '🔑 <b>Chưa gắn Gemini API Key.</b> Ba Mẹ vào <b>Cài đặt ➜ Trợ lý AI Phân tích (Gemini)</b> để dán Key miễn phí từ Google AI Studio nhé!</div>';
      return;
    }

    var behavior = analyzeLearningBehavior();
    var weakNames = [];
    for (var i = 0; i < Math.min(5, (needWorkList || []).length); i++) {
      weakNames.push(needWorkList[i].subjName + ": " + needWorkList[i].title + " (" + needWorkList[i].stars + "/3 sao)");
    }

    var promptText = "Bạn là chuyên gia sư phạm Tiểu học (Lớp 1, chương trình Kết Nối Tri Thức 2026). " +
      "Hãy phân tích dữ liệu học tập ẩn danh dưới đây của bé 6 tuổi và trả lời ngắn gọn bằng tiếng Việt (tối đa 160 chữ), chia 3 gạch đầu dòng rõ ràng:\n" +
      "1) Độ khó hiện tại (môn nào cần TĂNG, môn nào cần GIẢM, môn nào vừa sức)\n" +
      "2) Thói quen học (tốc độ phản hồi, đoán mò hay tập trung)\n" +
      "3) Gợi ý 1 hoạt động 5 phút tối nay để ba mẹ kèm con tại nhà.\n\n" +
      "Dữ liệu JSON: " + JSON.stringify({
        subjectStars: {
          math: subjectStars("math") + "/" + (UNITS.math.length * 3),
          viet: subjectStars("viet") + "/" + (UNITS.viet.length * 3),
          eng: subjectStars("eng") + "/" + (UNITS.eng.length * 3)
        },
        zpd: behavior.zpd,
        bestWindow: behavior.bestWindow,
        totalSessions: behavior.totalSessions,
        totalFastGuesses: behavior.totalFastGuesses,
        totalAudioReplays: behavior.totalAudioReplays,
        weakTopics: weakNames
      });

    btnEl.disabled = true;
    btnEl.innerHTML = "⏳ AI đang phân tích...";
    outputEl.innerHTML = '<div style="color:#475569;font-size:13px;">🤖 Đang tổng hợp hành vi học tập của bé...</div>';

    var payloadBase = {
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: {
        maxOutputTokens: 600,
        temperature: 0.7
      }
    };
    var payloadNoThink = JSON.stringify(payloadBase);
    var payloadFastThink = JSON.stringify({
      contents: payloadBase.contents,
      generationConfig: {
        maxOutputTokens: 600,
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    function showAIError(status, respText) {
      btnEl.disabled = false;
      btnEl.innerHTML = "🤖 AI Tư Vấn Sâu Cho Ba Mẹ";
      var detail = "";
      try {
        var er = JSON.parse(respText || "{}");
        if (er && er.error && er.error.message) detail = "<br><small>" + esc(er.error.message) + "</small>";
      } catch (e) {}
      outputEl.innerHTML = '<div style="color:#dc2626;font-size:13px;">⚠️ Lỗi kết nối AI (Mã ' + status + '). Ba mẹ kiểm tra lại API Key hoặc mạng nhé.' + detail + '</div>';
    }

    function handleAISuccess(respText) {
      btnEl.disabled = false;
      btnEl.innerHTML = "🤖 AI Tư Vấn Sâu Cho Ba Mẹ";
      try {
        var res = JSON.parse(respText);
        var txt = "";
        if (res && res.candidates && res.candidates[0] && res.candidates[0].content && res.candidates[0].content.parts) {
          txt = res.candidates[0].content.parts[0].text || "";
        } else if (res && res.reply) {
          txt = res.reply;
        }
        if (!txt) throw new Error("Empty AI reply");
        var formatted = esc(txt).replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
        try { localStorage.setItem(aiCacheStoreKey(), formatted); } catch (e) {}
        outputEl.innerHTML = '<div class="ai-coach-reply">' + formatted + '</div>';
        Sound.good();
      } catch (err) {
        outputEl.innerHTML = '<div style="color:#dc2626;font-size:13px;">⚠️ Không đọc được phản hồi từ AI. Vui lòng thử lại.</div>';
      }
    }

    function postToEndpoint(url, onFallback, labelName, allowThinkZero) {
      if (labelName) {
        outputEl.innerHTML = '<div style="color:#475569;font-size:13px;">🤖 Đang kết nối ' + esc(labelName) + '...</div>';
      }
      var useFast = !!allowThinkZero;
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.timeout = 35000;
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {
          handleAISuccess(xhr.responseText);
        } else if (xhr.status === 400 && useFast) {
          // Nếu model không hỗ trợ thinkingConfig, gửi lại bằng payload chuẩn
          postToEndpoint(url, onFallback, labelName, false);
        } else if ((xhr.status === 404 || xhr.status === 503 || xhr.status === 429) && typeof onFallback === "function") {
          onFallback();
        } else {
          showAIError(xhr.status, xhr.responseText);
        }
      };
      xhr.ontimeout = function () {
        if (typeof onFallback === "function") {
          onFallback();
          return;
        }
        btnEl.disabled = false;
        btnEl.innerHTML = "🤖 AI Tư Vấn Sâu Cho Ba Mẹ";
        outputEl.innerHTML = '<div style="color:#dc2626;font-size:13px;">⏳ Kết nối AI quá thời gian. Vui lòng thử lại!</div>';
      };
      xhr.send(useFast ? payloadFastThink : payloadNoThink);
    }

    if (cfg.proxyUrl) {
      postToEndpoint(cfg.proxyUrl, null, "Proxy AI", false);
      return;
    }

    var models = ["gemini-3.8-flash", "gemini-3.8-flash-lite", "gemini-3.5-flash", "gemini-3.0-flash", "gemini-flash-latest", "gemini-2.5-flash", "gemini-2.0-flash"];
    var mIdx = 0;

    function discoverAndCallModel() {
      var listUrl = "https://generativelanguage.googleapis.com/v1beta/models?key=" + encodeURIComponent(cfg.apiKey);
      var gx = new XMLHttpRequest();
      gx.open("GET", listUrl, true);
      gx.timeout = 15000;
      gx.onreadystatechange = function () {
        if (gx.readyState !== 4) return;
        if (gx.status >= 200 && gx.status < 300) {
          try {
            var data = JSON.parse(gx.responseText);
            var arr = (data && data.models) ? data.models : [];
            var candidates = [];
            for (var i = 0; i < arr.length; i++) {
              var m = arr[i];
              var methods = m.supportedGenerationMethods || [];
              if (methods.indexOf("generateContent") > -1 && m.name && m.name.indexOf("embedding") === -1) {
                if (m.name.indexOf("flash") > -1) candidates.unshift(m.name);
                else candidates.push(m.name);
              }
            }
            var dIdx = 0;
            function tryDiscovered() {
              if (dIdx >= candidates.length) {
                showAIError(404, gx.responseText);
                return;
              }
              var mFull = candidates[dIdx++];
              var u = "https://generativelanguage.googleapis.com/v1beta/" + mFull + ":generateContent?key=" + encodeURIComponent(cfg.apiKey);
              postToEndpoint(u, tryDiscovered, mFull.replace("models/", ""), mFull.indexOf("2.5") > -1 || mFull.indexOf("3.") > -1);
            }
            if (candidates.length > 0) {
              tryDiscovered();
              return;
            }
          } catch (e) {}
        }
        showAIError(gx.status || 404, gx.responseText);
      };
      gx.ontimeout = function () { showAIError(408, ""); };
      gx.send();
    }

    function tryNextModel() {
      if (mIdx >= models.length) {
        discoverAndCallModel();
        return;
      }
      var mName = models[mIdx++];
      var url = "https://generativelanguage.googleapis.com/v1beta/models/" + mName + ":generateContent?key=" + encodeURIComponent(cfg.apiKey);
      postToEndpoint(url, tryNextModel, mName, mName.indexOf("2.5") > -1 || mName.indexOf("3.") > -1);
    }

    tryNextModel();
  }

  // ---------------------------------------------------------
  // 10. BÁO CÁO HỌC TẬP, HUY HIỆU, CỬA HÀNG, CÀI ĐẶT
  // ---------------------------------------------------------
  function buildReportHTML() {
    var ts = totalStars();
    var maxS = maxTotalStars();
    var mathS = subjectStars("math"), mathMax = UNITS.math.length * 3;
    var vietS = subjectStars("viet"), vietMax = UNITS.viet.length * 3;
    var engS = subjectStars("eng"), engMax = UNITS.eng.length * 3;

    var mathPct = Math.round(mathS / mathMax * 100);
    var vietPct = Math.round(vietS / vietMax * 100);
    var engPct = Math.round(engS / engMax * 100);

    // Thu thập danh sách bài cần ôn tập (0-2 sao) và bài đã thành thạo (3-4 sao)
    var needWork = [];
    var mastered = [];

    for (var s = 0; s < SUBJECTS.length; s++) {
      var subj = SUBJECTS[s];
      var units = UNITS[subj.id];
      for (var u = 0; u < units.length; u++) {
        var unit = units[u];
        var stars = unitStars(subj.id, unit.topic);
        var itemData = {
          subjId: subj.id,
          subjName: subj.short,
          unitIdx: u,
          topic: unit.topic,
          title: unit.title,
          icon: unit.icon,
          stars: stars
        };
        if (stars <= 1) {
          needWork.push(itemData);
        } else {
          mastered.push(itemData);
        }
      }
    }

    var html = '<div class="report-summary-card">' +
      '<div style="display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:space-between;justify-content:space-between">' +
        '<div><b style="font-size:18px;color:#1e3a8a">👦 ' + esc(state.name) + '</b><div style="font-size:12px;color:#64748b;margin-top:2px">Học lực: ' + (ts >= 55 ? 'Xuất sắc 🌟' : ts >= 28 ? 'Khá tốt 👍' : 'Đang rèn luyện 🌱') + '</div></div>' +
        '<div style="text-align:right"><b style="font-size:20px;color:#d97706">⭐ ' + ts + '/' + maxS + '</b><div style="font-size:11px;color:#64748b">Tổng số sao</div></div>' +
      '</div>' +
      '<div class="report-subj-grid">' +
        '<div class="report-subj-box">' +
          '<div class="report-subj-title">🏰 Toán 1</div>' +
          '<div class="report-subj-stars">' + mathS + '/' + mathMax + ' ⭐</div>' +
          '<div class="report-subj-bar"><div class="report-subj-fill" style="width:' + mathPct + '%"></div></div>' +
          '<div style="font-size:11px;color:#64748b;margin-top:4px">' + mathPct + '%</div>' +
        '</div>' +
        '<div class="report-subj-box viet">' +
          '<div class="report-subj-title">📚 T.Việt 1</div>' +
          '<div class="report-subj-stars">' + vietS + '/' + vietMax + ' ⭐</div>' +
          '<div class="report-subj-bar"><div class="report-subj-fill" style="width:' + vietPct + '%"></div></div>' +
          '<div style="font-size:11px;color:#64748b;margin-top:4px">' + vietPct + '%</div>' +
        '</div>' +
        '<div class="report-subj-box eng">' +
          '<div class="report-subj-title">🎈 T.Anh 1</div>' +
          '<div class="report-subj-stars">' + engS + '/' + engMax + ' ⭐</div>' +
          '<div class="report-subj-bar"><div class="report-subj-fill" style="width:' + engPct + '%"></div></div>' +
          '<div style="font-size:11px;color:#64748b;margin-top:4px">' + engPct + '%</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    // Phần AI Phân Tích Hành Vi & Độ Khó (Pha 1 + Pha 2)
    var behavior = analyzeLearningBehavior();
    var cachedAI = "";
    try { cachedAI = localStorage.getItem(aiCacheStoreKey()) || ""; } catch (e) {}
    html += '<div class="ai-insight-card">' +
      '<div class="ai-insight-head"><span>🤖 AI Theo Dõi Hành Vi & Độ Khó (ZPD)</span><small>' + behavior.totalSessions + ' phiên đã đo</small></div>' +
      '<div class="ai-zpd-grid">';
    var sList = [{ id: "math", name: "🏰 Toán" }, { id: "viet", name: "📚 T.Việt" }, { id: "eng", name: "🎈 T.Anh" }];
    for (var si = 0; si < sList.length; si++) {
      var z = behavior.zpd[sList[si].id];
      html += '<div class="ai-zpd-item ' + z.cls + '">' +
        '<div class="ai-zpd-top"><b>' + sList[si].name + '</b><span>' + z.label + '</span></div>' +
        '<div class="ai-zpd-adv">' + esc(z.advice) + '</div>' +
      '</div>';
    }
    html += '</div>';
    if (behavior.bestWindow) {
      html += '<div class="ai-meta-line">⏰ <b>Khung giờ vàng:</b> ' + esc(behavior.bestWindow) + '</div>';
    }
    if (behavior.totalAudioReplays >= 5) {
      html += '<div class="ai-meta-line">🔊 Bé bấm nghe lại câu hỏi ' + behavior.totalAudioReplays + ' lần — có thể bật tốc độ đọc chậm hơn hoặc ngồi nghe cùng bé.</div>';
    }
    html += '<div class="ai-coach-actions">' +
      '<button type="button" class="ai-coach-btn" id="aiCoachBtn">🤖 AI Tư Vấn Sâu Cho Ba Mẹ</button>' +
      '</div>' +
      '<div id="aiCoachOutput" class="ai-coach-output">' + (cachedAI ? ('<div class="ai-coach-reply">' + cachedAI + '</div>') : '') + '</div>' +
    '</div>';

    // Phần 1: Cần ôn tập bổ sung
    html += '<div class="report-section-title">⚠️ Phần Bé Cần Luyện Tập Thêm (' + needWork.length + ' bài)</div>';
    if (needWork.length === 0) {
      html += '<div style="background:#f0fdf4;padding:12px;border-radius:14px;color:#166534;font-size:13px;font-weight:700">🎉 Tuyệt vời! Bé đã nắm vững toàn bộ các bài học, không có bài nào dưới 3 sao!</div>';
    } else {
      html += '<div class="report-list">';
      for (var nw = 0; nw < needWork.length; nw++) {
        var it = needWork[nw];
        var starStr = it.stars > 0 ? (it.stars + '/4 ⭐ (Cần củng cố)') : 'Chưa học / Chưa đạt';
        html += '<div class="report-item warn">' +
          '<div class="report-item-ic">' + it.icon + '</div>' +
          '<div class="report-item-info">' +
            '<div class="report-item-name">' + esc(it.title) + '</div>' +
            '<div class="report-item-sub">[' + esc(it.subjName) + '] • ' + starStr + '</div>' +
          '</div>' +
          '<button class="report-item-btn" data-subj="' + it.subjId + '" data-idx="' + it.unitIdx + '">Ôn ngay ➜</button>' +
        '</div>';
      }
      html += '</div>';
    }

    // Phần 2: Đã thành thạo
    if (mastered.length > 0) {
      html += '<div class="report-section-title" style="margin-top:16px">🌟 Phần Bé Đã Thành Thạo (' + mastered.length + ' bài)</div>';
      html += '<div class="report-list">';
      for (var ms = 0; ms < mastered.length; ms++) {
        var mItem = mastered[ms];
        var mStarStr = mItem.stars >= 4 ? '⭐⭐⭐⭐ (Xuất sắc)' : '⭐⭐⭐ (Khá tốt)';
        html += '<div class="report-item good">' +
          '<div class="report-item-ic">' + mItem.icon + '</div>' +
          '<div class="report-item-info">' +
            '<div class="report-item-name">' + esc(mItem.title) + '</div>' +
            '<div class="report-item-sub">[' + esc(mItem.subjName) + '] • ' + mStarStr + '</div>' +
          '</div>' +
        '</div>';
      }
      html += '</div>';
    }

    return html;
  }

  function renderBadgesHTML() {
    var ts = totalStars();
    var html = '<div style="text-align:center;margin-bottom:12px;font-weight:800;color:#2a5aa0">Bé đã có <b>' + ts + "/" + maxTotalStars() + " ⭐</b></div><div class=\"grid-cards\">";
    for (var i = 0; i < BADGES.length; i++) {
      var b = BADGES[i], ok = ts >= b.need;
      html += '<div class="badge-card' + (ok ? "" : " locked") + '"><div class="badge-ic">' + b.icon + '</div><div class="badge-name">' + b.name + '</div><div class="badge-req">' + (ok ? "Đã đạt ✅" : "Cần " + b.need + " ⭐") + "</div></div>";
    }
    html += "</div>";
    return html;
  }

  function openAchievements() {
    var body = $("reportBody");
    if (!body) return;
    body.innerHTML = buildReportHTML();

    // Gắn sự kiện "Ôn ngay" từ tab Tiến độ
    var actionBtns = body.querySelectorAll(".report-item-btn");
    for (var b = 0; b < actionBtns.length; b++) {
      onTap(actionBtns[b], function () {
        Sound.click();
        var sId = this.getAttribute("data-subj");
        var uIdx = parseInt(this.getAttribute("data-idx"), 10);
        closeOverlay("reportOverlay");
        curSubj = sId;
        curUnitIdx = uIdx;
        var uList = UNITS[curSubj];
        if (uList && uList[curUnitIdx]) {
          if (uList[curUnitIdx].topic === "passages") {
            readReturnScreen = "screenMap";
            openPassageReader();
          } else {
            renderMap();
            showScreen("screenMap");
            openModePicker();
          }
        }
      });
    }

    // Gắn sự kiện nút "AI Tư Vấn Sâu Cho Ba Mẹ"
    var aiBtn = $("aiCoachBtn");
    if (aiBtn) {
      onTap(aiBtn, function () {
        Sound.click();
        var needWork = [];
        for (var s = 0; s < SUBJECTS.length; s++) {
          var sj = SUBJECTS[s], units = UNITS[sj.id];
          for (var u = 0; u < units.length; u++) {
            var st = unitStars(sj.id, units[u].topic);
            if (st <= 1) needWork.push({ subjName: sj.short, title: units[u].title, stars: st });
          }
        }
        callAICoach($("aiCoachOutput"), aiBtn, needWork);
      });
    }

    openOverlay("reportOverlay");
  }

  function openReport() {
    Sound.click();
    openAchievements("report");
  }

  function openBadges() {
    Sound.click();
    openShop("badges");
  }

  function openDailyQuestModal() {
    ensureGamificationState();
    var dq = state.dailyQuest;
    var doneQ = (dq.math ? 1 : 0) + (dq.viet ? 1 : 0) + (dq.eng ? 1 : 0);
    var html = '<div style="text-align:center;margin-bottom:12px;font-weight:800;color:#d97706;font-size:16px">🔥 Chuỗi học liên tiếp: <b>' + (state.streak.count || 0) + '</b> ngày (Kỷ lục: ' + (state.streak.best || 0) + ')</div>';
    html += '<div class="quest-row' + (dq.math ? ' done' : '') + '"><span>' + (dq.math ? '✅' : '🧮') + ' Chơi 1 lượt Toán 1</span><span class="quest-reward">' + (dq.math ? 'Đã nhận +5 <i class="coin sm"></i>' : '+5 <i class="coin sm"></i>') + '</span></div>';
    html += '<div class="quest-row' + (dq.viet ? ' done' : '') + '"><span>' + (dq.viet ? '✅' : '📖') + ' Chơi / Đọc 1 bài Tiếng Việt</span><span class="quest-reward">' + (dq.viet ? 'Đã nhận +5 <i class="coin sm"></i>' : '+5 <i class="coin sm"></i>') + '</span></div>';
    html += '<div class="quest-row' + (dq.eng ? ' done' : '') + '"><span>' + (dq.eng ? '✅' : '🌍') + ' Chơi 1 lượt Tiếng Anh</span><span class="quest-reward">' + (dq.eng ? 'Đã nhận +5 <i class="coin sm"></i>' : '+5 <i class="coin sm"></i>') + '</span></div>';

    html += '<div style="text-align:center;margin-top:14px;">';
    if (doneQ >= 3 && !dq.claimed) {
      html += '<button class="btn-green" id="claimDailyChestBtn">🎁 Mở Rương Ngày (+15 <i class="coin sm"></i>)</button>';
    } else if (dq.claimed) {
      html += '<div style="font-weight:800;color:#15803d;padding:10px;background:#dcfce7;border-radius:14px;">🎉 Bé đã mở Rương Ngày hôm nay rồi!</div>';
    } else {
      html += '<div style="font-weight:700;color:#475569;font-size:13px;">Hoàn thành cả 3 nhiệm vụ (' + doneQ + '/3) để mở Rương Ngày nhận thêm <b>+15 <i class="coin sm"></i></b>!</div>';
    }
    html += '</div>';

    html += '<div class="set-section-title" style="margin-top:16px;">🏆 Thưởng Chuỗi Ngày Học</div>';
    for (var mi = 0; mi < STREAK_MILESTONES.length; mi++) {
      var ms = STREAK_MILESTONES[mi];
      var got = !!(state.streak.claimedMilestones && state.streak.claimedMilestones[String(ms.days)]);
      html += '<div class="quest-row' + (got ? ' done' : '') + '"><span>' + (got ? '✅' : '🔥') + ' ' + ms.label + '</span><span class="quest-reward">+' + ms.coins + ' <i class="coin sm"></i></span></div>';
    }

    $("infoTitle").innerHTML = "🎯 Nhiệm Vụ & Chuỗi Ngày";
    $("infoBody").innerHTML = html;
    if ($("claimDailyChestBtn")) {
      onTap($("claimDailyChestBtn"), function () {
        state.dailyQuest.claimed = true;
        state.coins += 15;
        Sound.fanfare();
        Sound.coin();
        confetti(30);
        saveState();
        renderHome();
        openDailyQuestModal();
      });
    }
    openOverlay("infoOverlay");
  }

  var curShopTab = "rewards";
  function openShop(tab) {
    ensureGamificationState();
    if (tab === "rewards" || tab === "avatars" || tab === "badges") curShopTab = tab;
    var html = '<div class="shop-tabs">' +
      '<button type="button" class="shop-tab' + (curShopTab === "rewards" ? " active" : "") + '" data-stab="rewards">🎁 Quà Của Bé</button>' +
      '<button type="button" class="shop-tab' + (curShopTab === "avatars" ? " active" : "") + '" data-stab="avatars">🦸 Nhân Vật</button>' +
      '<button type="button" class="shop-tab' + (curShopTab === "badges" ? " active" : "") + '" data-stab="badges">🏅 Huy Hiệu</button>' +
      '</div>';
    if (curShopTab !== "badges") {
      html += '<div style="text-align:center;margin-bottom:12px;font-weight:800;color:#2a5aa0">Bé đang có <b>' + state.coins + '</b> <i class="coin sm"></i></div>';
    }

    if (curShopTab === "rewards") {
      html += '<div class="reward-list">';
      for (var ri = 0; ri < state.realRewards.length; ri++) {
        var r = state.realRewards[ri];
        var isPinned = r.id === state.pinnedRewardId;
        var canBuy = state.coins >= r.cost;
        var pct = Math.min(100, Math.round((state.coins / (r.cost || 1)) * 100));
        var needMore = Math.max(0, r.cost - state.coins);
        var rwIconHtml = r.img
          ? '<img class="rw-thumb" src="' + esc(r.img) + '" alt="" onerror="this.parentNode.innerHTML=\'' + esc(r.icon || "🎁") + '\'">'
          : esc(r.icon || "🎁");
        html += '<div class="reward-card' + (canBuy ? ' can-buy' : (isPinned ? ' pinned' : '')) + '">' +
          '<div class="rw-ic">' + rwIconHtml + '</div>' +
          '<div class="rw-mid">' +
            '<div class="rw-name">' + esc(r.name) + '</div>' +
            '<div class="rw-meta">' + r.cost + ' <i class="coin sm"></i> · ' + (canBuy ? 'Đủ xu đổi rồi! 🎉' : 'Còn thiếu ' + needMore + ' xu') + '</div>' +
            '<div class="rw-bar"><div class="rw-bar-fill" style="width:' + pct + '%"></div></div>' +
          '</div>' +
          '<div class="rw-actions">' +
            '<button type="button" class="rw-btn pin' + (isPinned ? ' on' : '') + '" data-pin="' + esc(r.id) + '">' + (isPinned ? '🎯 Đang nhắm' : 'Nhắm tới') + '</button>' +
            '<button type="button" class="rw-btn buy" data-buy="' + esc(r.id) + '"' + (canBuy ? '' : ' disabled') + '>🎁 Đổi quà</button>' +
          '</div></div>';
      }
      html += '</div>';

      if (state.rewardTickets.length > 0) {
        html += '<div class="set-section-title">🎟️ Phiếu Quà Đã Đổi</div>';
        for (var ti = state.rewardTickets.length - 1; ti >= 0; ti--) {
          var tk = state.rewardTickets[ti];
          var stCls = tk.status === "delivered" ? "delivered" : "pending";
          var stTxt = tk.status === "delivered" ? "✅ Đã nhận" : "⏳ Chờ Ba Mẹ";
          html += '<div class="ticket-row"><span>' + esc(tk.icon || "🎁") + ' <b>' + esc(tk.rewardName) + '</b> (' + tk.cost + ' <i class="coin sm"></i> · ' + esc(tk.date || "") + ')</span>' +
            '<span class="ticket-status ' + stCls + '">' + stTxt + '</span></div>';
        }
      }
      $("infoTitle").innerHTML = "🎁 Đổi Quà Thật";
    } else if (curShopTab === "badges") {
      html += renderBadgesHTML();
      $("infoTitle").innerHTML = "🏅 Huy Hiệu Của Bé";
    } else {
      html += '<div class="grid-cards">';
      for (var i = 0; i < AVATARS.length; i++) {
        var a = AVATARS[i];
        var owned = state.owned.indexOf(a.id) > -1;
        var using = state.avatar === a.id;
        html += '<div class="shop-card' + (owned ? " owned" : "") + (using ? " using" : "") + '" data-id="' + a.id + '">' +
          '<div class="shop-ic">' + avatarHTML(a.id) + '</div><div class="shop-name">' + a.name + "</div>" +
          '<div class="shop-price">' + (using ? "Đang dùng ✅" : owned ? "Chọn" : a.price + ' <i class="coin sm"></i>') + "</div></div>";
      }
      html += "</div>";
      $("infoTitle").innerHTML = "🦸 Cửa Hàng Nhân Vật";
    }

    $("infoBody").innerHTML = html;

    var tabBtns = $("infoBody").querySelectorAll(".shop-tab");
    for (var sb = 0; sb < tabBtns.length; sb++) {
      onTap(tabBtns[sb], function () {
        Sound.click();
        openShop(this.getAttribute("data-stab"));
      });
    }

    if (curShopTab === "rewards") {
      var pinBtns = $("infoBody").querySelectorAll(".rw-btn.pin");
      for (var pi = 0; pi < pinBtns.length; pi++) {
        onTap(pinBtns[pi], function () {
          Sound.click();
          state.pinnedRewardId = this.getAttribute("data-pin");
          saveState();
          renderHome();
          openShop("rewards");
        });
      }
      var buyBtns = $("infoBody").querySelectorAll(".rw-btn.buy");
      for (var bi = 0; bi < buyBtns.length; bi++) {
        onTap(buyBtns[bi], function () {
          var rid = this.getAttribute("data-buy");
          var reward = null;
          for (var x = 0; x < state.realRewards.length; x++) {
            if (state.realRewards[x].id === rid) { reward = state.realRewards[x]; break; }
          }
          if (!reward || state.coins < reward.cost) { Sound.bad(); return; }
          if (!askParentalGate("Đổi quà " + reward.name + " (" + reward.cost + " xu)")) return;
          state.coins -= reward.cost;
          state.rewardTickets.push({
            id: "tk_" + Date.now(),
            rewardName: reward.name,
            icon: reward.icon,
            cost: reward.cost,
            status: "pending",
            date: getTodayStr(0)
          });
          Sound.fanfare();
          Sound.coin();
          confetti(28);
          saveState();
          renderHome();
          openShop("rewards");
        });
      }
    } else if (curShopTab === "avatars") {
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
          saveState(); renderHome(); openShop("avatars");
        });
      }
    }
    openOverlay("infoOverlay");
  }

  function openGuide() {
    openSettings();
  }

  function openProfileModal() {
    Sound.click();
    renderProfileCards();
    openOverlay("profileOverlay");
  }

  function renderProfileCards() {
    var c = $("profileCards");
    if (!c) return;
    var html = "";
    for (var i = 0; i < profiles.length; i++) {
      var p = profiles[i];
      var isActive = p.id === currentProfileId;
      var pState = getProfileState(p.id);
      var stars = calcTotalStars(pState);
      var coins = pState.coins || 0;
      var av = getAvatar(pState.avatar || p.avatar || "hero");
      var avHTML = av.img ? '<img src="' + av.img + '">' : av.emoji;
      html += '<div class="profile-card' + (isActive ? ' active' : '') + '" data-pid="' + esc(p.id) + '">' +
        '<div class="profile-avatar">' + avHTML + '</div>' +
        '<div class="profile-info">' +
          '<div class="profile-name">' + esc(p.name) + '</div>' +
          '<div class="profile-meta">⭐ ' + stars + ' sao • <i class="coin sm"></i> ' + coins + ' xu</div>' +
        '</div>' +
        '<div class="profile-tag">' + (isActive ? 'Đang học ✅' : 'Chọn') + '</div>' +
        (profiles.length > 1 ? '<button type="button" class="profile-del" data-del-pid="' + esc(p.id) + '" title="Xóa hồ sơ">🗑️</button>' : '') +
      '</div>';
    }
    c.innerHTML = html;
    var delBtns = c.querySelectorAll(".profile-del");
    for (var d = 0; d < delBtns.length; d++) {
      onTap(delBtns[d], function (e) {
        if (e && e.stopPropagation) e.stopPropagation();
        deleteProfile(this.getAttribute("data-del-pid"));
      });
    }
    var cards = c.querySelectorAll(".profile-card");
    for (var j = 0; j < cards.length; j++) {
      onTap(cards[j], function () {
        var pid = this.getAttribute("data-pid");
        switchProfile(pid);
        closeOverlay("profileOverlay");
      });
    }
  }

  function openParentRewardsModal() {
    ensureGamificationState();
    var html = '<div style="margin-bottom:10px;"><button class="small-btn" id="backToSetBtn">‹ Quay lại Cài đặt</button></div>';

    var pendingList = [];
    var deliveredList = [];
    for (var ti = state.rewardTickets.length - 1; ti >= 0; ti--) {
      if (state.rewardTickets[ti].status === "pending") pendingList.push({ idx: ti, tk: state.rewardTickets[ti] });
      else deliveredList.push({ idx: ti, tk: state.rewardTickets[ti] });
    }
    html += '<div class="set-section-title">🎟️ Phiếu Quà Chờ Ba Mẹ Duyệt (' + pendingList.length + ')</div>';
    if (pendingList.length === 0) {
      html += '<div style="font-size:13px;color:#64748b;margin-bottom:10px;">Hiện chưa có phiếu quà nào chờ duyệt.</div>';
    } else {
      for (var pi = 0; pi < pendingList.length; pi++) {
        var item = pendingList[pi];
        html += '<div class="ticket-row">' +
          '<span>' + esc(item.tk.icon || "🎁") + ' <b>' + esc(item.tk.rewardName) + '</b> (' + item.tk.cost + ' <i class="coin sm"></i> · ' + esc(item.tk.date || "") + ')</span>' +
          '<span><button type="button" class="small-btn" data-deliver="' + item.idx + '">✅ Duyệt trao</button> ' +
          '<button type="button" class="small-btn red" data-refund="' + item.idx + '">↩️ Hoàn xu</button></span></div>';
      }
    }
    if (deliveredList.length > 0) {
      html += '<div class="set-section-title" style="margin-top:10px;">✅ Quà Đã Duyệt & Trao (' + deliveredList.length + ')</div>';
      for (var li = 0; li < Math.min(5, deliveredList.length); li++) {
        var dItem = deliveredList[li];
        html += '<div class="ticket-row"><span>' + esc(dItem.tk.icon || "🎁") + ' <b>' + esc(dItem.tk.rewardName) + '</b> (' + esc(dItem.tk.date || "") + ')</span>' +
          '<span class="ticket-status delivered">✅ Đã duyệt</span></div>';
      }
    }

    var REWARD_ICONS = ["🎁", "🍦", "🏊", "🏎️", "⌚", "🎮", "🧸", "🚲", "📚", "🍕", "🎨", "⚽", "🦕", "🚀", "👑", "🧁"];
    function iconSelectHTML(selId, curIcon, attrName) {
      var opts = REWARD_ICONS.slice();
      if (curIcon && opts.indexOf(curIcon) === -1) opts.unshift(curIcon);
      var s = '<select class="parent-rw-input" ' + (selId ? 'id="' + selId + '" ' : '') + (attrName ? attrName + ' ' : '') + 'style="width:60px;text-align:center;font-size:18px;padding:4px;">';
      for (var oi = 0; oi < opts.length; oi++) {
        s += '<option value="' + esc(opts[oi]) + '"' + (opts[oi] === curIcon ? ' selected' : '') + '>' + esc(opts[oi]) + '</option>';
      }
      s += '</select>';
      return s;
    }

    html += '<div class="set-section-title" style="margin-top:12px;display:-webkit-flex;display:flex;-webkit-justify-content:space-between;justify-content:space-between;-webkit-align-items:center;align-items:center;">' +
      '<span>🎁 Danh Sách Quà Thật (Sửa trực tiếp)</span>' +
      '<button type="button" class="small-btn" id="resetRwDefaultBtn" style="font-size:11px;padding:3px 8px;">↺ Mặc định</button>' +
    '</div>';
    for (var ri = 0; ri < state.realRewards.length; ri++) {
      var r = state.realRewards[ri];
      html += '<div class="parent-rw-form" style="margin-bottom:6px;background:#f8fafc;padding:6px;border-radius:12px;border:1px solid #e2e8f0;">' +
        iconSelectHTML("", r.icon || "🎁", 'data-edit-icon="' + esc(r.id) + '"') +
        '<input class="parent-rw-input" data-edit-name="' + esc(r.id) + '" style="flex:1;min-width:110px;" value="' + esc(r.name) + '" placeholder="Tên quà">' +
        '<input class="parent-rw-input" data-edit-cost="' + esc(r.id) + '" type="number" min="10" step="10" value="' + (r.cost || 100) + '" style="width:74px;" placeholder="Xu">' +
        '<button type="button" class="small-btn" data-saverw="' + esc(r.id) + '" title="Lưu thay đổi">💾</button>' +
        '<button type="button" class="small-btn red" data-delrw="' + esc(r.id) + '" title="Xóa quà">🗑️</button>' +
      '</div>';
    }

    html += '<div class="set-section-title" style="margin-top:10px;">➕ Thêm Quà Mới</div>' +
      '<div class="parent-rw-form">' +
      iconSelectHTML("rwIconIn", "🎁", "") +
      '<input class="parent-rw-input" id="rwNameIn" style="flex:1;min-width:120px;" placeholder="Tên quà (vd: Gấu bông...)">' +
      '<input class="parent-rw-input" id="rwCostIn" type="number" min="10" step="10" value="300" style="width:78px;" placeholder="Xu">' +
      '<button type="button" class="small-btn" id="addRwBtn" style="height:36px;">+ Thêm</button>' +
      '</div>';

    $("infoTitle").innerHTML = "🎁 Quản Lý Quà Thật";
    $("infoBody").innerHTML = html;

    onTap($("backToSetBtn"), function () { Sound.click(); openSettings(); });
    var delivBtns = $("infoBody").querySelectorAll("[data-deliver]");
    for (var di = 0; di < delivBtns.length; di++) {
      onTap(delivBtns[di], function () {
        var idx = parseInt(this.getAttribute("data-deliver"), 10);
        if (state.rewardTickets[idx]) {
          state.rewardTickets[idx].status = "delivered";
          Sound.good();
          saveState();
          openParentRewardsModal();
        }
      });
    }
    var refBtns = $("infoBody").querySelectorAll("[data-refund]");
    for (var fi = 0; fi < refBtns.length; fi++) {
      onTap(refBtns[fi], function () {
        var idx = parseInt(this.getAttribute("data-refund"), 10);
        var tk = state.rewardTickets[idx];
        if (tk) {
          state.coins += (tk.cost || 0);
          state.rewardTickets.splice(idx, 1);
          Sound.click();
          saveState();
          renderHome();
          openParentRewardsModal();
        }
      });
    }
    var saveRwBtns = $("infoBody").querySelectorAll("[data-saverw]");
    for (var si = 0; si < saveRwBtns.length; si++) {
      onTap(saveRwBtns[si], function () {
        var rid = this.getAttribute("data-saverw");
        var icEl = $("infoBody").querySelector('[data-edit-icon="' + rid + '"]');
        var nmEl = $("infoBody").querySelector('[data-edit-name="' + rid + '"]');
        var csEl = $("infoBody").querySelector('[data-edit-cost="' + rid + '"]');
        var newIcon = icEl ? icEl.value : "🎁";
        var newName = nmEl ? nmEl.value.trim() : "";
        var newCost = csEl ? parseInt(csEl.value, 10) : 0;
        if (!newName || !(newCost > 0)) { Sound.bad(); return; }
        for (var k = 0; k < state.realRewards.length; k++) {
          if (state.realRewards[k].id === rid) {
            if (state.realRewards[k].icon !== newIcon && state.realRewards[k].img) {
              delete state.realRewards[k].img;
            }
            state.realRewards[k].icon = newIcon;
            state.realRewards[k].name = newName;
            state.realRewards[k].cost = newCost;
            break;
          }
        }
        state.rewardsCustomized = true;
        Sound.good();
        saveState();
        renderHome();
        openParentRewardsModal();
      });
    }
    var delRwBtns = $("infoBody").querySelectorAll("[data-delrw]");
    for (var xi = 0; xi < delRwBtns.length; xi++) {
      onTap(delRwBtns[xi], function () {
        var rid = this.getAttribute("data-delrw");
        for (var k = 0; k < state.realRewards.length; k++) {
          if (state.realRewards[k].id === rid) { state.realRewards.splice(k, 1); break; }
        }
        if (state.pinnedRewardId === rid && state.realRewards.length > 0) state.pinnedRewardId = state.realRewards[0].id;
        state.rewardsCustomized = true;
        Sound.click();
        saveState();
        renderHome();
        openParentRewardsModal();
      });
    }
    if ($("resetRwDefaultBtn")) {
      onTap($("resetRwDefaultBtn"), function () {
        if (!window.confirm("Khôi phục lại 4 món quà mặc định ban đầu?")) return;
        state.realRewards = cloneDefaultRewards();
        state.rewardsCustomized = false;
        state.pinnedRewardId = state.realRewards[0].id;
        Sound.click();
        saveState();
        renderHome();
        openParentRewardsModal();
      });
    }
    onTap($("addRwBtn"), function () {
      var ic = ($("rwIconIn").value || "🎁").trim();
      var nm = ($("rwNameIn").value || "").trim();
      var cs = parseInt($("rwCostIn").value, 10);
      if (!nm || !(cs > 0)) { Sound.bad(); return; }
      state.realRewards.push({ id: "rw_" + Date.now(), icon: ic, name: nm, cost: cs });
      state.rewardsCustomized = true;
      Sound.good();
      saveState();
      renderHome();
      openParentRewardsModal();
    });
    openOverlay("infoOverlay");
  }

  function openSettings() {
    ensureGamificationState();
    var pendingCnt = 0;
    for (var ti = 0; ti < state.rewardTickets.length; ti++) {
      if (state.rewardTickets[ti].status === "pending") pendingCnt++;
    }
    $("infoTitle").innerHTML = "⚙️ Cài Đặt & Hướng Dẫn";
    var html = "";

    // 1. ÂM THANH & GIỌNG ĐỌC
    html += '<div class="set-section-title">🎵 Âm Thanh & Nhạc Nền</div>';
    html += '<div class="set-row"><span>🎵 Nhạc nền game (BGM)</span><button class="toggle' + (state.bgm ? " on" : "") + '" data-key="bgm"></button></div>';
    html += '<div class="set-row"><span>🔊 Âm thanh & giọng đọc</span><button class="toggle' + (state.sound ? " on" : "") + '" data-key="sound"></button></div>';
    html += '<div class="set-row"><span>🗣️ Tự động đọc câu hỏi</span><button class="toggle' + (state.autoRead ? " on" : "") + '" data-key="autoRead"></button></div>';

    // 2. CÀI ĐẶT CHO PHỤ HUYNH
    html += '<div class="set-section-title">👨‍👩‍👧 Cài Đặt Dành Cho Bố Mẹ</div>';
    html += '<div class="set-row"><span>🎟️ Duyệt phiếu quà đã đổi' + (pendingCnt ? ' <b style="color:#dc2626">(' + pendingCnt + ' chờ duyệt)</b>' : '') + '</span><button class="small-btn" id="manageRewardsBtn">' + (pendingCnt ? 'Duyệt ngay' : 'Quản lý') + '</button></div>';
    var aiCfgNow = getAIConfig();
    html += '<div class="set-row"><span>🤖 Trợ lý AI Phân tích (Gemini): <b>' + ((aiCfgNow.apiKey || aiCfgNow.proxyUrl) ? 'Đã gắn' : 'Chưa gắn') + '</b></span><button class="small-btn" id="configAiBtn">Cấu hình</button></div>';
    html += '<div class="set-row"><span>☁️ Đồng bộ đám mây: <b id="setCloudStatus">' + (CloudSync.db ? 'Đã kết nối' : 'Lưu trên máy') + '</b></span><button class="small-btn" id="setCloudBtn">Xem</button></div>';
    html += '<div class="set-row"><span>🔓 Mở khóa tất cả bài</span><button class="toggle' + (state.unlockAll ? " on" : "") + '" data-key="unlockAll"></button></div>';
    html += '<div class="set-row"><span>📋 Sao lưu mã tiến độ</span><button class="small-btn" id="exportBtn">Lấy mã</button></div>';
    html += '<div class="set-row"><span>📥 Khôi phục từ mã</span><button class="small-btn" id="importBtn">Nhập mã</button></div>';
    html += '<div class="set-row"><span>🗑️ Xóa làm lại từ đầu</span><button class="small-btn red" id="resetBtn">Xóa</button></div>';

    // 3. HƯỚNG DẪN (Gom gọn vào 1 mục, bấm Xem kỹ để mở chi tiết)
    html += '<div class="set-section-title">❓ Hướng Dẫn & Thông Tin</div>';
    html += '<div class="set-row"><span>📖 Hướng dẫn cách học & mẹo iPad</span><button class="small-btn" id="toggleGuideBtn">Xem kỹ</button></div>';
    html += '<div id="guideDetailBox" style="display:none; margin-top:8px;">';
    html += '<div class="guide-item"><span class="gi-ic">🏝️</span><div>Chạm vào một <b>hòn đảo</b> (Toán, Tiếng Việt, Tiếng Anh) để vào bản đồ bài học. Mỗi chặng cần hoàn thành ít nhất <b>3/4 trò chơi</b> để mở khóa chặng tiếp theo.</div></div>';
    html += '<div class="guide-item"><span class="gi-ic">📜</span><div><b>Phiến Đá Bí Ẩn:</b> chạm từng hình để đếm (bài đếm số) rồi chọn phiến đá đáp án đúng.</div></div>';
    html += '<div class="guide-item"><span class="gi-ic">🧩</span><div><b>Ghép Đôi Nhanh & Lật Thẻ:</b> chạm ghép cặp hình/câu hỏi và đáp án đi cùng nhau.</div></div>';
    html += '<div class="guide-item"><span class="gi-ic">🎈</span><div><b>Bóng Bay Tri Thức:</b> chạm quả bóng có đáp án đúng trước khi bóng bay mất.</div></div>';
    html += '<div class="guide-item"><span class="gi-ic">🔊</span><div>Bấm nút <b>loa</b> để nghe đọc câu hỏi; dùng <b>xu vàng</b> để mua nhân vật mới trong Cửa hàng.</div></div>';
    html += '<div class="guide-item"><span class="gi-ic">💡</span><div><b>Mẹo cho iPad & iPhone cũ:</b> Vào <b>Cài đặt máy ➜ Trợ năng ➜ Nội dung được đọc ➜ Giọng nói ➜ Tiếng Việt</b> tải giọng Linh về máy; bấm Chia sẻ Safari ➜ <b>Thêm vào MH chính</b> để chơi toàn màn hình.</div></div>';
    html += '</div>';

    html += '<div class="guide-item" style="margin-top:8px;"><span class="gi-ic">🏷️</span><div><b>Phiên bản:</b> ' + esc(CFG.appVersion || "v45 (14/11/2026) · SGK: Kết Nối Tri Thức 2026 — Đảo Tri Thức") + '</div></div>';

    $("infoBody").innerHTML = html;

    var toggles = $("infoBody").querySelectorAll(".toggle");
    for (var i = 0; i < toggles.length; i++) {
      onTap(toggles[i], function () {
        var k = this.getAttribute("data-key");
        if (k === "unlockAll" && !state.unlockAll) {
          if (!askParentalGate("Mở khóa tất cả bài")) return;
        }
        state[k] = !state[k];
        if (state[k]) addClass(this, "on"); else removeClass(this, "on");
        if (k === "bgm") {
          if (state.bgm) Sound.startBGM(); else Sound.stopBGM();
          updateBgmButtons();
        } else if (k === "sound") {
          if (!state.sound) Sound.stopSpeak();
          updateBgmButtons();
        }
        saveState(); Sound.click();
      });
    }
    onTap($("toggleGuideBtn"), function () {
      Sound.click();
      var box = $("guideDetailBox");
      if (!box) return;
      var open = box.style.display !== "none";
      box.style.display = open ? "none" : "block";
      this.innerHTML = open ? "Xem kỹ" : "Thu gọn";
    });
    onTap($("manageRewardsBtn"), function () {
      Sound.click();
      if (!askParentalGate("Quản lý Quà Thật & Duyệt Phiếu")) return;
      openParentRewardsModal();
    });
    if ($("configAiBtn")) {
      onTap($("configAiBtn"), function () {
        Sound.click();
        if (!askParentalGate("Cấu hình Trợ lý AI")) return;
        openAIConfigModal();
      });
    }
    onTap($("setCloudBtn"), function () {
      Sound.click();
      if (CloudSync.db) {
        window.alert("🟢 Đã kết nối Firebase thành công!\nMọi tiến độ của bé Hoàng Long và các bé khác sẽ tự động đồng bộ giữa iPad và iPhone.");
      } else {
        window.alert("💾 Trạng thái: Lưu cục bộ trên máy.\nĐể bật đồng bộ đám mây giữa các thiết bị, bạn hãy tạo Firebase Project miễn phí và điền vào file js/firebase-config.js nhé!");
      }
    });
    onTap($("exportBtn"), function () {
      Sound.click();
      try {
        var str = btoa(encodeURIComponent(JSON.stringify(state)));
        window.prompt("Sao chép mã lưu tiến độ của bé (dùng để chuyển sang máy khác):", str);
      } catch (e) {
        window.alert("Không thể tạo mã lưu!");
      }
    });

    onTap($("importBtn"), function () {
      Sound.click();
      if (!askParentalGate("Khôi phục dữ liệu")) return;
      var input = window.prompt("Dán mã lưu tiến độ vào đây để khôi phục:");
      if (input && input.replace(/\s/g, "").length > 5) {
        try {
          var restored = JSON.parse(decodeURIComponent(atob(input.trim())));
          if (!restored || typeof restored !== "object") throw new Error("Invalid state");
          for (var k in restored) {
            if (restored.hasOwnProperty(k)) state[k] = restored[k];
          }
          state.coins = Math.max(0, parseInt(state.coins, 10) || 0);
          ensureGamificationState();
          saveState();
          renderHome();
          closeOverlay("infoOverlay");
          Sound.fanfare();
          window.alert("Khôi phục tiến độ học tập thành công!");
        } catch (e) {
          window.alert("Mã tiến độ không hợp lệ. Vui lòng kiểm tra lại!");
        }
      }
    });
    onTap($("resetBtn"), function () {
      Sound.click();
      if (!askParentalGate("Xóa làm lại từ đầu")) return;
      if (window.confirm("Xác nhận lần cuối: Xóa toàn bộ sao, xu và nhân vật đã mua?")) {
        var keepName = state.name;
        resetStateForProfile(keepName, "hero");
        saveState(); renderHome(); closeOverlay("infoOverlay");
      }
    });
    openOverlay("infoOverlay");
  }

  // ---------------------------------------------------------
  // 11. GẮN SỰ KIỆN
  // ---------------------------------------------------------
  function bindEvents() {
    // Khóa cử chỉ đa điểm Safari iPad cũ (tránh trẻ tì lòng bàn tay làm zoom/cuộn trang)
    var supportsPassive = false;
    try {
      var opts = Object.defineProperty({}, "passive", {
        get: function () { supportsPassive = true; return false; }
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {}

    document.addEventListener("gesturestart", function (e) {
      e.preventDefault();
    }, false);
    document.addEventListener("touchmove", function (e) {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    }, supportsPassive ? { passive: false } : false);

    // Mở khóa âm thanh iOS & tự động bật BGM ở lần chạm đầu tiên
    function isBgmBtnTarget(node) {
      while (node && node !== document) {
        if (node.className && String(node.className).indexOf("bgm-btn") > -1) return true;
        node = node.parentNode;
      }
      return false;
    }
    function unlockAudio(e) {
      Sound.init();
      unlockTTSAudio();
      if (state.bgm && !Sound.bgmPlaying && !(e && isBgmBtnTarget(e.target))) {
        Sound.startBGM();
      }
      document.removeEventListener("touchstart", unlockAudio, false);
      document.removeEventListener("click", unlockAudio, false);
    }
    document.addEventListener("touchstart", unlockAudio, false);
    document.addEventListener("click", unlockAudio, false);

    // Gắn sự kiện các nút BGM
    var bgmBtns = document.querySelectorAll(".bgm-btn");
    for (var b = 0; b < bgmBtns.length; b++) {
      onTap(bgmBtns[b], function (e) {
        if (e && e.stopPropagation) e.stopPropagation();
        Sound.toggleBGM();
      });
    }

    // Sự kiện Phòng Luyện Đọc
    onTap($("readBackBtn"), function () {
      Sound.click();
      stopSampleReading();
      if (readReturnScreen === "screenMap") {
        renderMap();
        showScreen("screenMap");
      } else {
        renderHome();
        showScreen("screenHome");
      }
    });
    onTap($("btnPlayAll"), function () {
      startSampleReading();
    });
    onTap($("btnStopRead"), function () {
      stopSampleReading();
    });
    onTap($("btnToggleSpeed"), function () {
      Sound.click();
      if (readSpeed >= 0.85) {
        readSpeed = 0.7;
        this.innerHTML = "🐢 Chậm";
      } else {
        readSpeed = 0.95;
        this.innerHTML = "🐰 Vừa";
      }
    });
    onTap($("btnReadFinish"), function () {
      finishPassageReading();
    });

    if ($("gqQuestBtn")) onTap($("gqQuestBtn"), function () { Sound.click(); openDailyQuestModal(); });
    if ($("gqGoalBtn")) onTap($("gqGoalBtn"), function () { Sound.click(); openShop("rewards"); });

    if ($("settingsBtn")) onTap($("settingsBtn"), function () { Sound.click(); openSettings(); });
    onTap($("profileBtn"), function () { openProfileModal(); });
    onTap($("homeAvatar"), function () { openProfileModal(); });
    if ($("topReportBtn")) onTap($("topReportBtn"), function () { openReport(); });
    if ($("syncPill")) onTap($("syncPill"), function () {
      Sound.click();
      if (CloudSync.db) {
        window.alert("🟢 Trạng thái: Đã kết nối đám mây Firebase!\nMọi tiến độ của bé Hoàng Long và các bé khác sẽ tự động đồng bộ giữa iPad và iPhone.");
      } else {
        window.alert("💾 Trạng thái: Lưu trên máy.\nĐể đồng bộ dữ liệu giữa iPad và iPhone, bạn hãy tạo Firebase Project miễn phí và dán cấu hình vào file js/firebase-config.js nhé!");
      }
    });
    onTap($("addKidBtn"), function () {
      Sound.click();
      var n = window.prompt("Nhập tên bé mới (ví dụ: Bảo An):");
      if (n && n.replace(/\s/g, "").length) {
        addNewProfile(n);
        closeOverlay("profileOverlay");
      }
    });
    if ($("badgeStrip")) onTap($("badgeStrip"), function () { Sound.click(); openBadges(); });

    var navs = document.querySelectorAll(".nav-item");
    for (var i = 0; i < navs.length; i++) {
      onTap(navs[i], function () {
        Sound.click();
        var n = this.getAttribute("data-nav");
        if (n === "read") { readReturnScreen = "screenHome"; openPassageReader(); }
        else if (n === "achieve") openAchievements("report");
        else if (n === "report") openReport();
        else if (n === "badges") openBadges();
        else if (n === "shop") openShop();
        else if (n === "guide" || n === "settings") openSettings();
      });
    }

    onTap($("mapBackBtn"), function () { Sound.click(); renderHome(); showScreen("screenHome"); });

    if ($("playBtn")) onTap($("playBtn"), function () { Sound.click(); closeOverlay("modeOverlay"); startGame(); });

    var closers = document.querySelectorAll("[data-close]");
    for (var c = 0; c < closers.length; c++) {
      onTap(closers[c], function () { Sound.click(); closeOverlay(this.getAttribute("data-close")); });
    }
    // Chạm ra ngoài panel để đóng (trừ kết quả & tạm dừng)
    var ovs = ["modeOverlay", "infoOverlay", "profileOverlay", "reportOverlay"];
    for (var o = 0; o < ovs.length; o++) {
      (function (id) {
        onTap($(id), function (e) { if (e.target === $(id)) closeOverlay(id); });
      })(ovs[o]);
    }

    onTap($("speakBtn"), function () {
      Sound.click();
      if (!game) return;
      game.audioReplays = (game.audioReplays || 0) + 1;
      if (game.mode === "memory") { Sound.speak("Lật hai thẻ để tìm cặp đi cùng nhau", "vi-VN"); return; }
      if (game.mode === "match") { Sound.speak("Chạm một thẻ bên trái và một thẻ bên phải để ghép thành cặp đúng", "vi-VN"); return; }
      var q = game.list[game.idx];
      if (!q) return;
      readPrompt(q);
    });

    onTap($("pauseBtn"), function () {
      Sound.click();
      if (game && game.mode === "balloon" && !game.locked) {
        clearTimers();
        var arena = $("arena");
        if (arena) {
          var bls = arena.querySelectorAll(".balloon");
          for (var bi = 0; bi < bls.length; bi++) {
            setTransition(bls[bi], "none");
          }
        }
      }
      $("pauseMascot").innerHTML = mascotHTML();
      openOverlay("pauseOverlay");
    });
    onTap($("resumeBtn"), function () {
      Sound.click();
      closeOverlay("pauseOverlay");
      if (game && game.mode === "balloon" && !game.locked && game.list && game.list[game.idx]) {
        renderBalloon(game.list[game.idx]);
      }
    });
    onTap($("quitBtn"), function () {
      Sound.click(); clearTimers(); Sound.stopSpeak();
      if (game && !game.finalized && (game.rtCount > 0 || (Date.now() - (game.startTs || Date.now())) > 4000)) {
        game.finalized = true;
        if (typeof recordTelemetry === "function") { recordTelemetry(false); saveState(); }
      }
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
  updateBgmButtons();
  renderHome();
  CloudSync.init();

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
