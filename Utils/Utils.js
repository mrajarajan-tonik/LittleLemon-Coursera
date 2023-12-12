import AsyncStorage from '@react-native-async-storage/async-storage';

export const isValidEmail = (email) => {
    // Implement email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('userDetails', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetails');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  // removeItem
  export const removeData = async () => {
    try {
      await AsyncStorage.removeItem('userDetails');
      
    } catch (e) {
      // error reading value
    }
  };
