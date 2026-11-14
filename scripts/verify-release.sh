#!/bin/sh
set -e

echo "=== [1/3] Kiểm tra cú pháp JavaScript (node -c) ==="
node -c js/app.js
node -c js/data.js
node -c js/audio-manifest.js
node -c js/firebase-config.js
echo "✅ Cú pháp JS hợp lệ."

echo "=== [2/3] Kiểm tra chuẩn Strict ES5 (iPadOS 12.5.8 / Safari 12) ==="
node -e '
var fs = require("fs");
var files = ["js/app.js", "js/data.js", "js/audio-manifest.js", "js/firebase-config.js"];
var failed = false;
files.forEach(function(f) {
  var src = fs.readFileSync(f, "utf8");
  if (src.indexOf("`") !== -1) { console.error("❌ Backtick template literal in " + f); failed = true; }
  var stripped = src.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "").replace(/"(?:\\.|[^"\\])*"|\x27(?:\\.|[^\x27\\])*\x27/g, "\"\"");
  var lines = stripped.split("\n");
  lines.forEach(function(line, idx) {
    if (/\b(let|const)\b|=>/.test(line)) {
      console.error("❌ ES6+ syntax at " + f + ":" + (idx + 1) + ": " + line.trim());
      failed = true;
    }
  });
});
if (failed) process.exit(1);
'
echo "✅ 100% tương thích ES5."

echo "=== [3/3] Kiểm tra dung lượng hình ảnh trong assets/ (< 250KB) ==="
OVERSIZED=$(find assets -type f \( -name "*.jpg" -o -name "*.png" \) -size +250k)
if [ -n "$OVERSIZED" ]; then
  echo "⚠️ CẢNH BÁO: Có ảnh vượt quá 250KB (nên nén bằng sips -Z 900 hoặc sips -Z 400):"
  echo "$OVERSIZED"
  exit 1
fi
echo "✅ Dung lượng assets tối ưu (< 250KB/file)."
echo "🎉 TẤT CẢ KIỂM TRA ĐỀU ĐẠT! Sẵn sàng commit & push."
