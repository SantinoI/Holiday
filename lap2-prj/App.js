import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Button,
  TextInput
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation";

import Login from "./screens/Login";
import Home from "./screens/Home";
import EventPage from "./screens/EventPage";
import Favorites from "./screens/Favorites";
import RegisterPage from "./screens/RegisterPage";
import SearchResult from "./screens/SearchResult";

import * as firebase from "firebase";

const TINT_COLOR = "#39b9c3";

var config = {
  apiKey: "AIzaSyDo22G7nwFINeNlUOY4ATAHoE3l99uLhqo",
  authDomain: "lap2-prj-v2.firebaseapp.com",
  databaseURL: "https://lap2-prj-v2.firebaseio.com",
  projectId: "lap2-prj-v2",
  storageBucket: "",
  messagingSenderId: "565592150962"
};
firebase.initializeApp(config);

!firebase.apps.length ? firebase.initializeApp(config) : null;


const App = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Login: {
      screen: Login
    },
    RegisterPage: {
      screen: RegisterPage
    },
    SearchResult: {
      screen: SearchResult
    },
    EventPage: {
      screen: EventPage
    },
  },
  {
    initialRouteName: "Home",
    mode: "modal"
  }
);

const Favorite = createStackNavigator(
  {
    Favorites: {
      screen: Favorites
    }
  }
)

export default createBottomTabNavigator(
  {
    Home: { screen: App},
    Favorites: {screen: Favorite} // searchResult andrà sostituito con la screen FAVORITES
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home${focused ? '' : '-outline'}`;
          return <MaterialCommunityIcons name={iconName} size={30} color={TINT_COLOR} />;
        } else if (routeName === 'Favorites') {
          iconName = `heart${focused ? '' : '-outline'}`;
          return <MaterialCommunityIcons name={iconName} size={30} color={TINT_COLOR} />;
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: TINT_COLOR,
      inactiveTintColor: 'gray',
    },
  }
);

//export default App;
//return <MaterialCommunityIcons name={"home-outline"} size={40} color={TINT_COLOR} />;
//return <Entypo name={"heart-outlined"} size={25} color={tintColor} />