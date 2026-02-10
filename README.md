
# User Auth Dashboard (React Native)

React Native app implementing Login/Signup/Home authentication flow using React Context API + React Navigation, with optional persistence via AsyncStorage.

## Prerequisites

- Node `>= 20.19.4` (React Native `0.83.1` requires Node `>= 20.19.4`)
- Android (macOS/Windows/Linux): Android Studio + Android SDK + an emulator/device
- iOS (macOS only): Xcode + CocoaPods
- Java JDK 17+ (Android builds)

This repo includes `./scripts/rn.sh` and `.nvmrc` to help ensure the correct Node version is used.

## Quick Start (any machine)

1) Install Node `20.19.4` (recommended via `nvm`) and Android Studio/Xcode as needed.

2) Install JS dependencies:

```zsh
cd USER_AUTH_DASHBOARD
nvm use 20.19.4
npm install
```

3) Start Metro (dev server):

```zsh
npm run start
```

4) Run on a platform:

Android:

```zsh
npm run android
```

iOS (macOS only):

```zsh
npm run ios
```

## Install

```zsh
nvm use 20.19.4
npm install
```

## Start Metro

Default:

```zsh
npm run start
```

If port `8081` is busy, run Metro on `8082`:

```zsh
npm run start -- --port 8082 --reset-cache
```

## Run

### Android

With Metro on the default port:

```zsh
npm run android
```

With Metro on `8082`:

```zsh
npm run android -- --port 8082
```

Note: this project is configured to build Android using Android Studio's bundled JDK via `android/gradle.properties` (`org.gradle.java.home=...`).

If you hit a Java/Gradle error on another machine, ensure a JDK 17+ is installed and `JAVA_HOME` points to it.

### iOS

First-time pods install:

```zsh
pod install
```

Run:

```zsh
npm run ios
```

## Implemented Features

- Authentication state via React Context (`src/context/AuthContext.js`): `user`, `login`, `signup`, `logout`
- Navigation via React Navigation stack (`src/navigation/AppNavigator.js`):
	- Logged out: `Login` → `Signup`
	- Logged in: `Home`
- AsyncStorage persistence (optional requirement):
	- Saves `registeredUser` and `activeUser`
	- Restores `activeUser` on app start
- Form handling + validation:
	- Login: required fields + email format + password min length + incorrect credentials message
	- Signup: required fields + email format + password min length + confirm password match
- Password visibility toggle on both Login and Signup password fields
- Home screen shows logged-in user's name and email + Logout

## What to Commit to GitHub

Commit these:
- `package.json` and `package-lock.json`
- `App.js`, `index.js`, `app.json`
- `src/` (all app code)
- `android/` and `ios/` (native projects)
- `babel.config.js`, `metro.config.js`
- `.nvmrc`, `scripts/rn.sh`, `README.md`

Do NOT commit these (they are machine-specific or generated):
- `node_modules/`
- `android/local.properties` (has your local SDK path)
- `android/**/build/`, `ios/build/`, `ios/Pods/`
- `.idea/`, `.vscode/`, `.DS_Store/`
- `.rn_tmp/` (template scaffolding folder)

After cloning, others should be able to run `npm install` and then run the app (with the required platform tools installed).

