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

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation";

import Login from "./screens/Login";
import BookingPage from "./screens/BookingPage";
import Home from "./screens/Home";
import ManagerPage from "./screens/ManagerPage";
import EventPage from "./screens/EventPage";
import Favorites from "./screens/Favorites";
import Profile from "./screens/Profile";
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
    SearchResult: {
      screen: SearchResult
    },
    EventPage: {
      screen: EventPage
    },
    BookingPage: {
      screen: BookingPage
    },
    ManagerPage: {
      screen: ManagerPage
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
    },
    EventPage: {        // aggiunto anche su favoriti per specificare la navigazione dai preferiti.
      screen: EventPage
    },
    ManagerPage: {
      screen: ManagerPage
    },
  }
)

const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: Profile
    },
    Login: {
      screen: Login
    },
    RegisterPage: {
      screen: RegisterPage
    },
  }
)

export default createBottomTabNavigator(
  {
    Home: { screen: App},
    Favorites: {screen: Favorite},
    Profile: {screen: ProfileNavigator},
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
        else if (routeName === 'Profile') {
          iconName = `account${focused ? '' : '-outline'}`;
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