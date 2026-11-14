#!/bin/sh
# Script tự động nhân bản (clone) bộ khung sườn KidsEdu sang một thư mục dự án mới
# Cách dùng: ./scripts/clone-new-project.sh /duong/dan/du-an-moi [storage_prefix]

set -e

TARGET_DIR="$1"
NEW_PREFIX="${2:-newapp}"

if [ -z "$TARGET_DIR" ]; then
  echo "Cách dùng: ./scripts/clone-new-project.sh <đường-dẫn-thư-mục-mới> [mã-dự-án-ngắn]"
  echo "Ví dụ:     ./scripts/clone-new-project.sh ../kidsedu-lop2 lop2"
  exit 1
fi

mkdir -p "$TARGET_DIR"
mkdir -p "$TARGET_DIR/sources"

echo "1. Đang sao chép bộ khung sườn chuẩn sang: $TARGET_DIR ..."
rsync -a \
  --exclude='.git' \
  --exclude='.DS_Store' \
  --exclude='sources/*' \
  ./ "$TARGET_DIR/"

echo "2. Đang cập nhật storagePrefix = '$NEW_PREFIX' trong js/project-config.js ..."
sed -i '' "s/storagePrefix: \"vqtt\"/storagePrefix: \"$NEW_PREFIX\"/g" "$TARGET_DIR/js/project-config.js"
sed -i '' "s/firebaseRoot: \"kidsedu_vqtt\"/firebaseRoot: \"kidsedu_$NEW_PREFIX\"/g" "$TARGET_DIR/js/project-config.js"

echo "3. Khởi tạo Git repository mới tại $TARGET_DIR ..."
cd "$TARGET_DIR"
git init -q

echo "✅ Hoàn tất dựng khung dự án mới tại: $TARGET_DIR"
echo "👉 Bước tiếp theo: Mở thư mục mới bằng Antigravity, bỏ tài liệu mới vào sources/ và bảo AI đọc docs/00_PROJECT_BLUEPRINT_AND_PLAYBOOK.md để nạp học liệu!"
