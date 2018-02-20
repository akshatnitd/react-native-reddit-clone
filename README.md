# Carousell 

### Screenshots
<img src="https://i.imgur.com/wLquQe7.png" width="200" />
<img src="https://i.imgur.com/aozTA0s.png" width="200" />




### How to Build (Android)
You can skip to step 5 if you have setup the environment before.
1. Run the following command in a Command Prompt or shell:
  ```npm install -g react-native-cli```
1. Download and install JDK 8 or newer if not yet installed (required).
1. Download and install [Android Studio](https://developer.android.com/studio/index.html) and make sure the following are also installed:
    - Android SDK
    - Android SDK Platform
    - Android Virtual Device
1. Run Android Studio. In "Welcome to Android Studio" screen, click "Configure", then select "SDK Manager". Select "SDK Platforms" tab, then check the boxes for:
    - Google APIs
    - Android SDK Platform 23
    - Intel x86 Atom_64 System Image
    - Google APIs Intel x86 Atom_64 System Image
5. Prepare your device for app install.
    - If you use physical device, plug your device, enable USB Debugging, and set USB option to something like "Transfer files".
    - If you use virtual device, run it using "AVD Manager" from Android Studio.
1. Run ```yarn``` at project root directory to install any dependencies.
1. Run ```yarn android``` to install and run the app on Android.
1. Alternatively, run ```react-native run-android --variant=release``` to install and run the signed APK on Android. Make sure you have uninstalled the previous same app before doing this.


### How to Install (Android)
Copy `build/app-release.apk` to your Android device and install it.

### Stack
The app was originally built using [Create React Native App (CRNA)](https://github.com/react-community/create-react-native-app) project. The latest build of the app uses the following stack:
- React Native
- React Native Navigation: for cross-platform Navigator
- React Native Typography: for standardized font styling
- Redux: for state management
- Jest: for testing

The codes are formatted with [Prettier](https://github.com/prettier/prettier).

### Implementation of Functionalities
Functionalities that are present in the app:
- Maintain a list of topics and its upvotes/downvotes
  - upvote means increase "vote" count, downvote means decrease it.
- Allow the user to submit topics. A “topic” is simply a string that does
not exceed 255 characters
  - Implemented by limiting user input to 255 chars
- Allow the user to upvote or downvote a topic. The user may upvote or
downvote the same topic multiple times
  - Self-explanatory
- Always return a list of top 20 topics (sorted by upvotes, descending) on the homepage
  - There is only a single screen in the app, which is homepage.
- In-memory: Design an in-memory data structure (shared by the same process as your
application) that will allow you to keep the topics in memory without using data
persistence. It is okay for the topics to disappear after the application restarts. You may
use data structures provided by your language’s standard library to build your data
structure.
  - In-memory means in-app data. The implementation can be seen in `src/backend/index.js`. Since it is in-app data, no async fetch needed.
- Tests are an essential part of our software engineering practices here and we’ll like you
to include them as part of your submission.
  - Jest is used for testing. All tests can be seen in `__tests__` directory throughout the project.

### Testing
Jest is used for testing the whole application, including reducers, components, in-memory data interface.
- Run the tests using: ```yarn test```
- See test coverage using: ```yarn test --coverage```
