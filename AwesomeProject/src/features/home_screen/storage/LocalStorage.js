import AsyncStorage from '@react-native-async-storage/async-storage';

export const localStorageKeys = {
    HOME_NEWS_FEED : 'HOME_NEWS_FEED'
}

export const storeDataLocally = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    const jsonKey = JSON.stringify(key)
    await AsyncStorage.setItem(jsonKey, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getDataFromLocalStorage = async (key) => {
    try {
      const jsonKey = JSON.stringify(key)
      const jsonValue = await AsyncStorage.getItem(jsonKey);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
