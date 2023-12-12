// HomeScreen.js

import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, BackHandler } from 'react-native';
import Header from '../Components/Header';

const Home = ({ navigation }) => {
  const [menuData, setMenuData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [catIndex, setCatIndex] = useState(0);

  const [mainCategories, setMainCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
//   const [categories,setCategories] = useState(["starters","mains","desserts"]);
  const  [selectedCategoryItem,setSelectedCategoryItem] = useState("starters")
  const [loading, setLoading] = useState(true);

  const title = "Little Lemon"
  const subTitle = "Chicago"
  const description = "We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist"

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
        const data = await response.json();
        const uniqueCategories = [...new Set(data.menu.map(item => item.category))];
        setMenuData(data.menu);
        setMainCategories(uniqueCategories)
        filterMenuByCategory(uniqueCategories[0],data.menu)

        
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchMenuData();

    BackHandler.addEventListener("hardwareBackPress", backPressed);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backPressed);
          };
  }, []);

  const backPressed = () => {
    BackHandler.exitApp();
    return true;
};

  const filterMenuBySearchText = (searchText) => {
   if (searchText)
   {
    const fileteredData = itemData.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    console.log(searchText,"fileteredData =======>",fileteredData)
    setItemData(fileteredData)
   }
   else{
    console.log(searchText,"fileteredData ddf =======>",menuData)

    filterMenuByCategory(selectedCategoryItem,menuData)
   }
  };

  const filterMenuByCategory = (categoryItem,menuData) => {
    setSelectedCategoryItem(categoryItem)
    console.log(categoryItem,"fileteredData =======>",menuData)
    const fileteredData = menuData.filter(item => item.category.toLowerCase().includes(categoryItem.toLowerCase()))
    console.log(categoryItem,"fileteredData =======>",fileteredData)
    setItemData(fileteredData)
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemDetails}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <Image source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }} style={styles.menuItemImage} />
    </View>
  );

  const renderCategoryItem = ({ item,index }) => (
    <TouchableOpacity style={{width:120,padding: 10,alignSelf: "center",alignContent: "center",justifyContent: "center"}} onPress={()=>{
        setCatIndex(index)
        filterMenuByCategory(item,menuData)
        setSearchText("")
    }}
         >
        <Text style={[{ fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    height: "100%",width:"97%",textAlignVertical: "center",textAlign: "center",borderRadius: 25,marginTop: 10}, index === catIndex ? {backgroundColor: "#F4D00C"} : {backgroundColor: "#edefee"}]}>{item}</Text>
    </TouchableOpacity>
  );
  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const onPressProfile = () => {
    navigation.navigate('Profile')
    console.log('Profile icon pressed')
  }

  return (
    <View style={styles.container}>
      <Header isShowBack={false} onPressProfile={onPressProfile}></Header>
     {/* <View style={styles.topContainer}>
        <Image source={require('./../assets/Logo.png')} style={styles.topImage} resizeMode="stretch" />
        <TouchableOpacity onPress={() => {
          navigation.navigate('Profile')
          console.log('Profile icon pressed')}}>
          <Image source={require('./../assets/Profile.png')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View> */}
    <ScrollView style={{flex: 0.92}}>
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
          <Image source={require('./../assets/Heroimage.png')} style={styles.image} />
        </View>
        
        </View>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a dish"
          value={searchText}
          onChangeText={(text)=>{
    
            setSearchText(text)
            filterMenuBySearchText(text)
          }}
          placeholderTextColor="white" 

        />
      </View>
      {itemData &&
      <>
      <View style={styles.categoriesContainer}>
        <Text style={{marginLeft: "3%",fontSize: 28,fontWeight: "bold",height: "40%",width:"100%"}} >Order for delivery!</Text>
        <FlatList
          horizontal
          data={mainCategories}
          keyExtractor={(item) => item.name}
          renderItem={renderCategoryItem}
          style={{height: "60%",width:"100%"}}
        />
      </View>

     <FlatList
        data={itemData}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        ItemSeparatorComponent={renderSeparator}
        style={{flex: 0.45
        }}
      />
      </>
    }
      {itemData.length === 0 && <Text  style={{flex: 0.45,fontSize: 25,fontWeight: "bold",alignSelf: "center",marginTop: "10%"}}> {loading ? "Loading...": "OOPS! No Food found"}</Text>}
      {/* <View style={{height: "5%",width: "100%", backgroundColor: 'red', opacity: 0 // 0.5 alpha for 50% transparency
}}/> */}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    padding: 10,
    marginTop: "10%",
    flex: 0.08
    // height: "10%"
  },
  topImage: {
    width: "70%",
    height: "100%",
    marginLeft: "10%",
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: "1%",
    alignSelf: "center"
  },
  middleContainer: {
    height: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchBar: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    paddingLeft: 10,
    marginTop: "1%",
    marginBottom: "3%",
    color: "white"

  },
  categoriesContainer: {
    // height: '10%',
    flex: 0.1
    // marginBottom: 10,
    // backgroundColor: "green"

  },
  menuItem: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    // borderColor: '#ddd',
    // borderWidth: 1,
    // borderRadius: 5,
    padding: 10,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "black"
  },
  menuItemDetails: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  menuItemDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  titleContainer: {
    // height: '30%',
    // width: '100%',
    flex: 0.4,
    backgroundColor: '#495e57',
  },
  title: {
    height: '15%',
    width: '100%',
    marginTop: '1%',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F4D00C',
    marginLeft: '3%',
  },
  description: {
    height: '60%',
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: "yellow"
  },
  descriptionText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: '5%',
  },
  descriptionTextSmall: {
    fontSize: 16,
    color: 'white',
    marginLeft: '5%',
    marginTop: '2%',
  },
  imageContainer: {
    flex: 0.4,
  },
  image: {
    height: '90%',
    width: '90%',
    borderRadius: 18,
    marginRight: '4%',
    marginTop: "8%"
  },
  textContainer: {
    flex: 0.6
  },
  separator: {
    height: 1,
    width: '90%',
    backgroundColor: '#dbdbdb', // You can change the color of the divider
    marginHorizontal: "5%"
  },
});

export default Home;
