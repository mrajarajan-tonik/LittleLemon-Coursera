import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ onPressProfile, isShowBack }) => {
  const backButton = "<-";
  const logoImageUri = require('./../assets/Logo.png');
  const profileImageUri = require('./../assets/Profile.png');

  return (
    <View style={styles.topContainer}>
     {isShowBack && <TouchableOpacity style={styles.backButtonContainer} onPress={onPressProfile}>
        <Text style={styles.backButtonText}>{backButton}</Text>
      </TouchableOpacity>
        }
      <Image source={logoImageUri} style={[styles.topImage, !isShowBack && styles.logoNoBack]} resizeMode="stretch" />
      <TouchableOpacity disabled={isShowBack} onPress={onPressProfile}>
        <Image source={profileImageUri} style={styles.profileIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    padding: 10,
    marginTop: "10%",
    flex: 0.08,
  },
  backButtonContainer: {
    width: "18%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    flex: 1,
    fontSize: 25,
    backgroundColor: "#495e57",
    width: 50,
    height: 50,
    borderRadius: 24,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  topImage: {
    width: "60%",
    height: "100%",
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: "4%",
    alignSelf: "center",
  },
  logoNoBack: {
    marginLeft: "20%"
}
});

export default Header;
