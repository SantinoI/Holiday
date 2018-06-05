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
import { createStackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation";

import Login from "./screens/Login";
import Home from "./screens/Home";
import EventCard from "./components/EventCard";
import SearchResult from "./screens/SearchResult";

import * as firebase from "firebase";

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
    SearchResult: {
      screen: SearchResult
    }
    /*EventCard: {
      screen: EventCard
    },*/
  },
  {
    initialRouteName: "Home",
    mode: "modal"
  }
);

export default App;
