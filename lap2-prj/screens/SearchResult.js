import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableHighlight,
  TextInput
} from "react-native";
import { Permissions, Location } from "expo";

import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";

import { SearchBar, Button } from "react-native-elements";

import * as firebase from "firebase";

const TINT_COLOR = "rgb(4, 159, 239)";

export default class Home extends React.Component {
  state = {
    request: "",
  };

  async componentWillMount(){
    let item = this.props.navigation.state.params.request;
      console.log(item);
      if (item) {
        this.setState({request: item});
      }
  }


  render() {
    return (
      <ScrollView>
        <View style={styles.searchContainer}>
          
          <Text>{this.state.request}</Text>
        </View>
      </ScrollView>
    );
  }   
}

Home.navigationOptions = ({ navigation }) => {
  return {
    title: "SearchResult",
    headerStyle: {}
  };
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    marginTop: 150,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  searchBar: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white"
  }
});
