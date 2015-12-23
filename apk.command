MY_DIRNAME=$(dirname $0)
cd $MY_DIRNAME

# 引数チェック
if [ $# -ne 1 ]; then
  echo "引数にエイリアス名を指定してください。"
  exit 1
fi

# 変数設定
ALIAS=$1
KEY_FILE=../$ALIAS.keystore
UNSIGNED_FILE=./platforms/android/ant-build/CordovaApp-release-unsigned.apk
SIGNED_FILE=../app.apk

# ビルド、署名、最適化
cordova build --release
jarsigner -verbose -keystore $KEY_FILE $UNSIGNED_FILE $ALIAS
/Applications/android-sdk-macosx/build-tools/21.1.1/zipalign -v 4 $UNSIGNED_FILE $SIGNED_FILE
