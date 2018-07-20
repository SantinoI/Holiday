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

import { Permissions, Notifications } from 'expo';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation";

import Login from "./screens/Login";
import BookingPage from "./screens/BookingPage";
import Bookings from "./screens/Bookings";
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
  storageBucket: "lap2-prj-v2.appspot.com",
  messagingSenderId: "565592150962"
};
firebase.initializeApp(config);


const Main = createStackNavigator(
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
    Bookings: {
      screen: Bookings
    },
    EventPage: {
      screen: EventPage
    },
    Login: {
      screen: Login
    },
    RegisterPage: {
      screen: RegisterPage
    },
  }
)

const TabNav = createBottomTabNavigator(
  {
    Home: { screen: Main},
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

export default class App extends React.Component {

  state= {
    token: "",
  };

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      console.log("ciao")
      return;
    }
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    this.setState({token})
  } 

  componentWillMount() {
    this.registerForPushNotificationsAsync();
  }

  
  render() {
    return (
      <TabNav/>
    )
  }

}
