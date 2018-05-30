import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Button, TextInput } from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import {createStackNavigator} from "react-navigation";
import {TabNavigator} from "react-navigation";

import Login from "./screens/Login";
import Home from "./screens/Home";
import EventCard from "./components/EventCard";
import SearchResult from "./screens/SearchResult";

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDKN9l-DW6jN0eh1CpSYBdtID8GQdUYY3M",
  authDomain: "lap2-prj.firebaseapp.com",
  databaseURL: "https://lap2-prj.firebaseio.com",
  projectId: "lap2-prj",
  storageBucket: "lap2-prj.appspot.com",
  messagingSenderId: "768098535379"
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
    },
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
