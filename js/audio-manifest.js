/* js/audio-manifest.js - Audio Sprite Manifest chuẩn ES5 cho Safari iOS 12.5.8
   Khi bạn thu âm các file lẻ vào assets/audio/clips/<cue_id>.mp3 (hoặc .wav)
   và chạy ./scripts/build-audio-sprite.sh, file này sẽ tự động cập nhật timestamp chính xác. */
var AUDIO_SPRITE_CONFIG = {
  src: "assets/audio/core_sprite.mp3",
  codec: "mp3",
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
    vo_island_viet:   { start: 12.20, duration: 2.80 },
    vo_island_eng:    { start: 15.10, duration: 2.50 },

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
  },
  phraseMap: {
    "chào mừng bé đến vương quốc tri thức!": "vo_intro_welcome",
    "đến đảo số học thôi! cùng đếm nào!": "vo_island_math",
    "đảo tiếng việt đây rồi! mình cùng ghép vần nhé!": "vo_island_viet",
    "hello! let's play on english island!": "vo_island_en",
    "hoan hô! tuyệt đỉnh luôn!": "vo_win_01",
    "bé tính siêu quá!": "vo_win_02",
    "thông minh tuyệt vời!": "vo_win_03",
    "bé gần mở được rương vàng rồi!": "vo_win_04",
    "chính xác! bé giỏi lắm!": "vo_win_05",
    "quá đỉnh! thêm một ngôi sao nữa nè!": "vo_win_06",
    "đúng rồi! thỏ trắng vỗ tay khen bé!": "vo_win_07",
    "khè khè! dũng sĩ nhỏ cừ khôi quá!": "vo_win_08",
    "giỏi lắm! bé thử lại chút xíu nhé!": "vo_try_01"
  }
};
