import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import Header from '../Components/Header';
import { getData, removeData, storeData } from '../Utils/Utils';

const Profile = ({navigation}) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [notificationData, setNotificationData] = useState([
    { key: 'Order status', value: false, setter: (val) => handleNotificationChange('Order status', val) },
    { key: 'Password changes', value: false, setter: (val) => handleNotificationChange('Password changes', val) },
    { key: 'Special offers', value: false, setter: (val) => handleNotificationChange('Special offers', val) },
    { key: 'Newsletters', value: false, setter: (val) => handleNotificationChange('Newsletters', val) },
  ]);
  const profileImageUri = require('./../assets/Profile.png');

  useEffect(() => {
    // Check if user details are present in AsyncStorage
    const checkUserDetails = async () => {
      try {
        let userDetails = await getData();
        console.log("userDetails ======>",userDetails)
        
        if (userDetails && userDetails.name && userDetails.email) {
          // User details are present, navigate to the 'Home' screen
          console.log("userDetails ======>sd",userDetails)

          setName(userDetails.name);
          setEmail(userDetails.email);
          userDetails.phone && setPhoneNumber(userDetails.phoneNumber);
          userDetails.lastName && setLastName(userDetails.lastName);

        }
      } catch (error) {
        console.error('Error checking user details:', error);
      }
    };

    checkUserDetails();
  }, []); 

  const handleNotificationChange = (key, value) => {
    setNotificationData((prevData) =>
      prevData.map((item) => (item.key === key ? { ...item, value } : item))
    );
  };

  const handleSaveChanges = async() => {
    // Add logic to save changes
    const userDetails = {
      name,
      lastName,
      phoneNumber,
      email,
    };
    console.log("userDetails ======>Profile",userDetails)
    // Store user details in AsyncStorage
    await storeData(userDetails);
    navigation?.goBack()
  };

  const handleDiscardChanges = () => {
    // Add logic to discard changes
    navigation?.goBack()
  };

  const handleLogout = async() => {
    // Add logic to logout
   await removeData()    
   navigation?.push('Onboarding')
  }

  const backPressed = () => {
    console.log("backPressed ======>Profile")
    navigation?.goBack()
    return true;  
}
  return (
    <View style={styles.baseContainer}>
        <Header isShowBack={true} onPressProfile={backPressed}></Header>
        <ScrollView style={styles.container}>
          <View style={{flex: 1,marginHorizontal: "4%",borderWidth: 0.6,borderColor: "grey",borderRadius: 10}}>
      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.title}>Personal Information</Text>
        <View style={styles.profileContainer}>
          <Image
            source={profileImageUri}
            style={styles.profileImage}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.profileButton,styles.buttonGreen]}>
              <Text style={[styles.profileButtonTxt,styles.whiteText]}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.profileButton,styles.buttonGreenBorder]}>
              <Text style={[styles.profileButtonTxt,styles.greyText]}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Text Inputs */}
      <View style={styles.section}>
        <Text style={styles.header}>First Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.header}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.header}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text style={styles.header}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Email Notification */}
      <View style={styles.section}>
        <Text style={styles.header}>Email Notification</Text>
        <FlatList
          data={notificationData}
          renderItem={({ item }) => (
            <View style={styles.checkboxContainer}>
               {/* <CheckBox
                value={item.value}
                onValueChange={(val) => item.setter(val)}
              /> */}
              <Checkbox
          value={item.value}
          onValueChange={(val) => item.setter(val)}
          color={item.value ? '#495e57' : undefined}
        />
              <Text style={{marginLeft: "3%"}}>{item.key}</Text>
            </View>
          )}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.profileButtonTxt}>Logout</Text>
      </TouchableOpacity>

      {/* Save and Discard Changes Buttons */}
      <View style={styles.buttonContainerBottom}>
        <TouchableOpacity style={[styles.bottomButton,styles.buttonGreen]} onPress={handleDiscardChanges}>
          <Text style={[styles.profileButtonTxt,styles.whiteText]}>Discard Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottomButton,styles.buttonGreenBorder]} onPress={handleSaveChanges}>
          <Text style={[styles.profileButtonTxt,styles.greyText]}>Save Changes</Text>
        </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    baseContainer: {
      flex: 1,
    },
    container: {
        flex: 1,
      },
      section: {
        marginBottom: 16,
        marginHorizontal: "3%"
        // backgroundColor: "pink"
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
      },
      profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
        backgroundColor: "black"
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        // backgroundColor: "blue",
        width: "50%",
        height: "60%"
      },
      buttonContainerBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: "10%",
        width: "90%",
        marginLeft: "5%",
        height: "6%"

      },
      profileButton: {
        borderRadius: 8,
        height: "100%",
        width: "65%",
        marginRight: "10%",
        alignItems: "center",
      },
      buttonGreen:{
        backgroundColor:"#495e57"
      },
      whiteText:{
        color: "white"
      },
      greyText:{
        color: "grey"
      },
      buttonGreenBorder:{
        borderWidth: 1,
        borderColor: "#495e57"
      },
      bottomButton: {
        padding: 8,
        borderRadius: 8,
        width: "45%",
        alignItems: "center"

      },
      button: {
        borderRadius: 8,
        height: 50,
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "#F4D00C",
        borderWidth: 0.5,
        borderColor: "brown"
      },
      header: {
        fontWeight: 'bold',
        marginBottom: 4
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 18,
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingVertical: "2%"

      },
      profileButtonTxt:{
        flex: 1,
        textAlignVertical: "center",
        fontSize: 15}
    });

export default Profile;
