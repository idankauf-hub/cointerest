import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

let val;

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear().then(alert(cleared));

    //alert("cleard")
  } catch (e) {
    // error reading value
    alert("NoT!!");
  }
};

const dataToConsole = () => {
  getData().then((res) => {
    val = res;
  });
  console.log("the val", val);
};

const clearAllData = () => {
  alert("1");
  try {
    alert("2");
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() => alert("success"));
  } catch (e) {
    // error reading value
    alert("NoT!!");
  }
};

const pressMe = () => {
  clearAsyncStorage();
};

//START OF THE HOME PAGE
const HomePage = ({ route, navigation }) => {
  const [user, setUser] = useState();

  const getData = async () => {
    try {
      //const jsonValue = await AsyncStorage.getItem('@loggedInUser')
      const jsonVal = await AsyncStorage.getItem("loggedInUserEmail");
      console.log("Home Page ", jsonVal["Username"]);
      //return jsonValue != null ? await JSON.parse(jsonValue) : null;
      //return  jsonVal;
      setUser(await AsyncStorage.getItem("loggedInUserEmail"));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    console.log("after render ", user);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <View style={styles.welcome}>
      <Text onPress={getData} style={{color:"#A7A7A7",fontWeight:'bold',fontSize:20}}>Welcome,</Text>
      <Text onPress={getData} style={styles.text}>idan the king</Text>
      </View>
      <View style={styles.profileIcon}>
      <MaterialCommunityIcons
                name="camera-plus-outline"
                color={"white"}
                size={30}
              />
      </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: '#1A1A1A'
  },
  header: {
    height:80,
    marginTop: 60,
    flexDirection: "row",
  },
  text:{
    
    color:"white",
    fontWeight:'bold',
    fontSize:20
  },
  welcome:{
    justifyContent:"flex-start",
    left:20,
    flexDirection: "column",
  },
  profileIcon:{
    flexDirection: "column",
    marginLeft:180,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 1.5,
  },
});
