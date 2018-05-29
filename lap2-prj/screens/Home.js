import React from 'react';
import { StyleSheet,
        Text,
        ScrollView,
        View, FlatList,
        TouchableHighlight,
        Button,
        TextInput } from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import {StackNavigator} from "react-navigation";
import {TabNavigator} from "react-navigation";

import * as firebase from "firebase";

const TINT_COLOR = "rgb(4, 159, 239)";

export default class Home extends React.Component {
    render() {
      return (
        <ScrollView>
         <Button
            title="Trova Escursioni"

         />
        </ScrollView>
      );
    }
  }

  Home.navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
      headerStyle: {
        
      },
    };
  };