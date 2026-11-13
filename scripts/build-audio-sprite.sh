#!/usr/bin/env bash
# Đóng gói các file lồng tiếng lẻ trong assets/audio/clips/*.mp3 (hoặc .wav)
# thành 1 file duy nhất assets/audio/core_sprite.mp3 (mono, 22050Hz, 32kbps)
# và tự động cập nhật timestamp vào js/audio-manifest.js.
# Yêu cầu: ffmpeg + ffprobe + python3

set -euo pipefail

CLIPS_DIR="assets/audio/clips"
OUT_MP3="assets/audio/core_sprite.mp3"
MANIFEST_JS="js/audio-manifest.js"

if ! command -v ffmpeg >/dev/null 2>&1 || ! command -v ffprobe >/dev/null 2>&1; then
  echo "Lỗi: Cần cài đặt ffmpeg và ffprobe."
  exit 1
fi

if [ ! -d "$CLIPS_DIR" ]; then
  mkdir -p "$CLIPS_DIR"
  echo "Đã tạo thư mục $CLIPS_DIR."
  echo "Hãy chép các file thu âm (ví dụ: vo_intro_welcome.mp3, vo_win_01.mp3, ...) vào $CLIPS_DIR rồi chạy lại script này."
  exit 0
fi

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

# Tạo khoảng nghỉ 50ms chuẩn 22050Hz mono
ffmpeg -y -f lavfi -i anullsrc=r=22050:cl=mono -t 0.05 -c:a pcm_s16le "$TMP_DIR/gap.wav" >/dev/null 2>&1

python3 - "$CLIPS_DIR" "$TMP_DIR" "$OUT_MP3" "$MANIFEST_JS" <<'PYEOF'
import os, sys, subprocess, json, glob

clips_dir, tmp_dir, out_mp3, manifest_js = sys.argv[1:5]
files = sorted(glob.glob(os.path.join(clips_dir, "*.mp3")) + glob.glob(os.path.join(clips_dir, "*.wav")))

if not files:
    print("Không tìm thấy file .mp3 hoặc .wav nào trong " + clips_dir)
    sys.exit(0)

concat_list = os.path.join(tmp_dir, "concat.txt")
sprite_map = {}
cursor = 0.0
gap_sec = 0.05

with open(concat_list, "w") as cf:
    for idx, fpath in enumerate(files):
        cue_id = os.path.splitext(os.path.basename(fpath))[0]
        norm_wav = os.path.join(tmp_dir, f"{idx:03d}_{cue_id}.wav")
        # Chuẩn hóa âm lượng -16 LUFS, mono, 22050Hz
        subprocess.run([
            "ffmpeg", "-y", "-i", fpath,
            "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
            "-ar", "22050", "-ac", "1", "-c:a", "pcm_s16le", norm_wav
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        dur_out = subprocess.check_output([
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1", norm_wav
        ]).decode().strip()
        dur = round(float(dur_out), 3)

        sprite_map[cue_id] = {"start": round(cursor, 3), "duration": dur}
        cf.write(f"file '{norm_wav}'\n")
        cf.write(f"file '{os.path.join(tmp_dir, 'gap.wav')}'\n")
        cursor += dur + gap_sec

subprocess.run([
    "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_list,
    "-ar", "22050", "-ac", "1", "-b:a", "32k", out_mp3
], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

# Cập nhật phần sprite trong js/audio-manifest.js
with open(manifest_js, "r", encoding="utf-8") as mf:
    content = mf.read()

start_marker = "  sprite: {"
end_marker = "  },\n  phraseMap:"
s_idx = content.find(start_marker)
e_idx = content.find(end_marker)
if s_idx != -1 and e_idx != -1:
    lines = ["  sprite: {"]
    items = list(sprite_map.items())
    for i, (k, v) in enumerate(items):
        comma = "," if i < len(items) - 1 else ""
        lines.append(f'    {k}: {{ start: {v["start"]:.3f}, duration: {v["duration"]:.3f} }}{comma}')
    new_content = content[:s_idx] + "\n".join(lines) + "\n" + content[e_idx:]
    with open(manifest_js, "w", encoding="utf-8") as mf:
        mf.write(new_content)

print(f"Đã đóng gói {len(files)} clips -> {out_mp3} ({round(os.path.getsize(out_mp3)/1024, 1)} KB)")
PYEOF
