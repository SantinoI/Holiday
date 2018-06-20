import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";

import { Permissions, Location } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import { TabNavigator } from "react-navigation";
import { SearchBar, Button } from "react-native-elements";

import EventCard from "../components/EventCard";

import * as firebase from "firebase";

const TINT_COLOR = "#39b9c3";
const BACKGROUND_COLOR = "#d7e4e5";

export default class EventPage extends React.Component {

  render() {
    return (
    <View style={{backgroundColor:BACKGROUND_COLOR, paddingBottom: (80*110)/100, flex:1}}>
      <Text>Ciao</Text>
    </View>

    );
  }   
}

EventPage.navigationOptions = ({ navigation }) => {
  return {
    title: "EventPage",
    headerStyle: {
      backgroundColor: BACKGROUND_COLOR,
      borderBottomWidth: 0
    },
    headerRight: (
      <TouchableOpacity>
        <FontAwesome
          style={{ paddingHorizontal: 15 }}
          name="user-circle"
          size={34}
          color={TINT_COLOR}
        />
    </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
 
});
