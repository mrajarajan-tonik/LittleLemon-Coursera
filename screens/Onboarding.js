// OnboardingScreen.js

import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, StyleSheet, SafeAreaViewBase, SafeAreaView, Platform } from 'react-native';
import { getData, isValidEmail, storeData } from '../Utils/Utils';
import AndroidKeyboardAdjust from "react-native-android-keyboard-adjust";

const Onboarding = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const title = "Little Lemon"
  const subTitle = "Chicago"
  const description = "We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist"

  useEffect(() => {
    
    if (Platform.OS === "android"&& AndroidKeyboardAdjust) {
      AndroidKeyboardAdjust.setAdjustResize();
      }
    
}, [])

  const isFormValid = () => {
    return name.trim() !== '' && email.trim() !== '';
  };

  const handleNextPress = async() => {
    if (isFormValid()) {
      console.log('Form is valid!');
      const userDetails = {
        name,
        email,
      };
      // Store user details in AsyncStorage
      await storeData(userDetails);
      navigation.navigate('Home');

      // Navigate to the next screen or perform any other action
      // For example, you can use navigation.navigate('NextScreen');
    } else {
      console.log('Invalid form! Please check your inputs.');
      // Display an error or alert for invalid form
    }
  };


  return (
   
    <SafeAreaView style={styles.baseContainer}>
      
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('./../assets/Logo.png')} style={styles.logo} />

      {/* Title and Description */}
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.description}>
          <View style={styles.textContainer}> 
          <Text style={styles.descriptionText}>{subTitle}</Text>
          <Text style={styles.descriptionTextSmall}>{description}</Text>
          </View>
        <View style={styles.imageContainer}>
          <Image source={require('./../assets/Pasta.png')} style={styles.image} />
        </View>
        </View>

      </View>

      {/* Name and Email Inputs */}
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={[styles.input, styles.inputMargin]}
      />

      {/* Next Button */}
      <TouchableOpacity
        title="Next"
        onPress={handleNextPress}
        disabled={!isFormValid()}
        style={[styles.button]}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: '90%',
    height: '10%',
    marginBottom: '10%',
    marginTop: '25%',
  },
  titleContainer: {
    height: '30%',
    width: '90%',
    backgroundColor: '#495e57',
    marginBottom: '10%',
    borderRadius: 10,
  },
  title: {
    height: '22%',
    width: '100%',
    marginTop: '2%',
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#F4D00C',
    marginLeft: '5%',
  },
  description: {
    height: '75%',
    width: '100%',
    flexDirection: 'row',
  },
  descriptionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: '5%',
  },
  descriptionTextSmall: {
    fontSize: 16,
    color: 'white',
    marginLeft: '5%',
    marginTop: '4%',
  },
  imageContainer: {
    flex: 0.4,
  },
  image: {
    flex: 1,
    height: '90%',
    width: '90%',
    borderRadius: 18,
    marginBottom: '15%',
    marginRight: '4%',
    backgroundColor: 'white',
  },
  input: {
    height: '7%',
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  inputMargin: {
    marginTop: '3%',
  },
  button: {
    height: '7%',
    width: '90%',
    marginTop: '8%',
    backgroundColor: '#F4D00C',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#495e57',
    marginBottom: 5,
  },
  textContainer: {
    flex: 0.6
  },
  buttonDisabled: { 
    backgroundColor: 'gray'
  }
});

export default Onboarding;
