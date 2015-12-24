MY_DIRNAME=$(dirname $0)
cd $MY_DIRNAME

# Check arguments
if [ $# -ne 1 ]; then
  echo "Input an alias name as argument."
  exit 1
fi

# Set variables
ALIAS=$1
KEY_FILE=../$ALIAS.keystore
UNSIGNED_FILE=./platforms/android/ant-build/CordovaApp-release-unsigned.apk
SIGNED_FILE=../app.apk

# Build, Sign, Optimize
cordova build --release
jarsigner -verbose -tsa http://timestamp.digicert.com -keystore $KEY_FILE $UNSIGNED_FILE $ALIAS
/Applications/android-sdk-macosx/build-tools/21.1.1/zipalign -v 4 $UNSIGNED_FILE $SIGNED_FILE
