#!/usr/bin/env bash
# UstaTop — PocketBase o'rnatish (Ubuntu 22.04, amd64)
# Ishlatish:  sudo bash server/setup.sh
set -euo pipefail

APP_DIR=/root/projects/ustatop
PB_DIR=$APP_DIR/pb
PORT=8090

echo "==> 1/5  Kerakli paketlar"
apt-get update -qq
apt-get install -y -qq curl unzip jq >/dev/null

echo "==> 2/5  PocketBase'ning oxirgi versiyasini aniqlash"
VER=$(curl -fsSL https://api.github.com/repos/pocketbase/pocketbase/releases/latest | jq -r .tag_name)
VER=${VER#v}
echo "    versiya: $VER"

echo "==> 3/5  Yuklab olish va o'rnatish"
mkdir -p "$PB_DIR"
cd "$PB_DIR"
curl -fsSL -o pb.zip \
  "https://github.com/pocketbase/pocketbase/releases/download/v${VER}/pocketbase_${VER}_linux_amd64.zip"
unzip -oq pb.zip pocketbase
rm -f pb.zip
chmod +x pocketbase
echo "$VER" > VERSION          # versiya qotirildi — avtomatik yangilanmaydi

echo "==> 4/5  systemd xizmati"
cp "$APP_DIR/server/pocketbase.service" /etc/systemd/system/ustatop-pb.service
systemctl daemon-reload
systemctl enable --now ustatop-pb
sleep 2
systemctl --no-pager --lines=5 status ustatop-pb || true

echo "==> 5/5  Tekshiruv"
curl -fsS "http://127.0.0.1:${PORT}/api/health" && echo

cat <<EOF

================================================================
PocketBase ishga tushdi — port ${PORT}
Ma'lumotlar: ${PB_DIR}/pb_data   (zaxira nusxa shu papkadan olinadi)

KEYINGI QADAM — nginx:
  cp ${APP_DIR}/server/nginx-ustatop.conf /etc/nginx/sites-available/ustatop
  ln -sf /etc/nginx/sites-available/ustatop /etc/nginx/sites-enabled/ustatop
  nginx -t && systemctl reload nginx

Keyin brauzerda admin panelni oching va birinchi admin akkauntni yarating:
  https://ustatop.duckdns.org/_/
================================================================
EOF
