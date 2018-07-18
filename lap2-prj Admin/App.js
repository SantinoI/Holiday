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
import { createBottomTabNavigator } from "react-navigation";


import Login from "./screens/Login";
import EventPage from "./screens/EventPage";
import NewEventPage from "./screens/NewEventPage";
import Profile from "./screens/Profile";
import RegisterPage from "./screens/RegisterPage";
import BookingList from "./screens/BookingList";

import store from "./reducers"

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

const ProfileNavigator = createStackNavigator(
  {
    Profile: {screen: Profile},
    EventPage: {screen: EventPage},
    NewEventPage: {screen: NewEventPage},
  },
)

const TabNav = createBottomTabNavigator(
  {
    ProfileNavigator: {screen: ProfileNavigator},
    BookingList: {screen: BookingList},
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'ProfileNavigator') {
          iconName = `home${focused ? '' : '-outline'}`;
          return <MaterialCommunityIcons name={iconName} size={30} color={TINT_COLOR} />;
        } else if (routeName === 'BookingList') {
          iconName = `pencil-box${focused ? '' : '-outline'}`;
          return <MaterialCommunityIcons name={iconName} size={30} color={TINT_COLOR} />;
        }
        
      }
    }),
    tabBarOptions: {
      activeTintColor: TINT_COLOR,
      inactiveTintColor: 'gray',
    },
  } 
)

const RootNav = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    RegisterPage: {
      screen: RegisterPage
    },
    TabNav: {
      screen: TabNav
    },
    // ProfileNavigator: {
    //   screen: ProfileNavigator
    // },
    // Profile: {
    //   screen: Profile
    // },
    // EventPage: {
    //   screen: EventPage
    // },
    // NewEventPage: {
    //   screen: NewEventPage
    // },
  },
  {
    headerMode:'none',
    //initialRouteName: "none",
    mode: "modal"
  }
);




export default class App extends React.Component {
  state= {
    logged:""
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.setState({logged: true})
      }
      else {
        this.setState({logged: false})
      }
    })

  }

  render() {
    return (
      this.state.logged ? (<TabNav/>) : (<RootNav/>)
    )
  }

  // render() {
  //   return (
  //     <RootNav/>
  //   )
  // }
}

