import React, { useEffect,useState } from 'react';
import { View, Text,Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import Profile from './screens/Profile';
import { getData } from './Utils/Utils';

const Stack = createNativeStackNavigator();

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Check if user details are present in AsyncStorage
    const checkUserDetails = async () => {
      try {
        let userDetails = await getData();
        console.log("userDetails ======>",userDetails)
        
        if (userDetails && userDetails.name && userDetails.email) {
          // User details are present, navigate to the 'Home' screen
          console.log("userDetails ======>sd",userDetails)

          setUserDetails(userDetails);
        }
      } catch (error) {
        console.error('Error checking user details:', error);
      }
      finally {
        setLoading(false);
      }
    };

    checkUserDetails();
  }, []); 

  if (loading) {
    // Render loading state or a splash screen
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
 return (

<NavigationContainer>
  {userDetails ? console.log("Render Home") : console.log("Render Onboarding")}
      <Stack.Navigator initialRouteName={userDetails ? 'Home' : 'Onboarding'} headerMode="none">
        <Stack.Screen name="Onboarding" component={Onboarding}
        options={{
                headerShown: false, // Hide the header
              }}  />
        <Stack.Screen name="Home" component={Home} 
        options={{
                headerShown: false, // Hide the header
              }} />
        <Stack.Screen name="Profile" component={Profile} 
        options={{
                headerShown: false, // Hide the header
              }} />
      </Stack.Navigator>
    </NavigationContainer>
 );
}

export default App;
