## News Headline App Documentation

### About

The News App shows top headlines and gives user to pin and delete the header through swiping the news

The app is built using React Native and consists of multiple components and utility files.

### Installation and Usage

To use the News app, follow these steps:

1. Ensure you have React Native and its dependencies set up on your development machine.
2. Clone the project repository and navigate to the project directory.
3. Run `npm install` or `yarn` to install the required dependencies.
4. Connect a device or start an emulator/simulator.
5. Run `yarn start` or `npm start`
6. Run `npx react-native run-android` or `yarn react-native run-android` (for Android) or `npx react-native run-ios` or `yarn react-native run-ios`(for iOS) to launch the app.


### Components

The app is composed of the following components:

1. **App**: The root component of the app. It is the entry point of the app.
2. **HomeScreen** : this screen shows 
3. **NewsCard**: Individual news card item is configured through this.
4. **NewsPinnedCard**: Individual Pinned news card item is configured through this

### Utility Files

The app also includes the following utility files:
0. **feature/feature_name** : here its home_card
      1. **network**: Contains data source (api functions).
      2. **UI**: All feature UI goes here.
      3. **storage**: Defines local storage of the app.
      4. **hooks**: contains the custom hook to manage the business logic for the UI.


### Libraries used :

1. **@react-native-async-storage/async-storage** : local storage for the app.
2. **react-native-splash-screen** : handing for splash screen
3. **react-native-gesture-handler** : handling gestures(in case of swipe to delete).


###  Video


## Conclusion

Use this information as a guide to understand and make modifications to the app according to your needs.