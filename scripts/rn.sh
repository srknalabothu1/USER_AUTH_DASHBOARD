#!/usr/bin/env bash
set -euo pipefail

# Ensure Android SDK tools are available for `run-android`.
ANDROID_SDK_CANDIDATES=("$HOME/Library/Android/sdk" "$HOME/Android/Sdk")
for sdk in "${ANDROID_SDK_CANDIDATES[@]}"; do
  if [ -d "$sdk" ]; then
    export ANDROID_SDK_ROOT="$sdk"
    export ANDROID_HOME="$sdk"
    export PATH="$sdk/platform-tools:$sdk/emulator:$sdk/tools:$sdk/tools/bin:$PATH"
    break
  fi
done

# Prefer Android Studio's bundled JDK on macOS if JAVA_HOME isn't set.
# This keeps Android builds working even if system Java is older.
if [ -z "${JAVA_HOME:-}" ] && [ -d "/Applications/Android Studio.app/Contents/jbr/Contents/Home" ]; then
  export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
  export PATH="$JAVA_HOME/bin:$PATH"
fi

if command -v nvm >/dev/null 2>&1; then
  :
else
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    # shellcheck disable=SC1090
    . "$NVM_DIR/nvm.sh"
  fi
fi

if command -v nvm >/dev/null 2>&1; then
  if [ -f ".nvmrc" ]; then
    nvm use >/dev/null 2>&1 || nvm install
    nvm use
  fi
fi

if [ -x "./node_modules/.bin/react-native" ]; then
  exec ./node_modules/.bin/react-native "$@"
fi

exec npx react-native "$@"
